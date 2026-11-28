package com.lamborghini.service.AIAssistant;

import com.lamborghini.entity.DongXe;
import com.lamborghini.entity.Showroom;
import com.lamborghini.entity.TinTuc;
import com.lamborghini.entity.Xe;
import com.lamborghini.enums.TrangThaiDongXe;
import com.lamborghini.enums.TrangThaiShowroom;
import com.lamborghini.enums.TrangThaiTinTuc;
import com.lamborghini.enums.TrangThaiXe;
import com.lamborghini.repository.DongXeRepository;
import com.lamborghini.repository.ShowroomRepository;
import com.lamborghini.repository.TinTucRepository;
import com.lamborghini.repository.XeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class AIIndexService {
    // Giới hạn độ dài nội dung tin tức khi tạo embedding (tránh vượt giới hạn đầu vào của model)
    private static final int MAX_NEWS_CHARS = 1500;

    private final VectorStore vectorStore;
    private final JdbcTemplate jdbcTemplate;
    private final DongXeRepository dongXeRepository;
    private final XeRepository xeRepository;
    private final TinTucRepository tinTucRepository;
    private final ShowroomRepository showroomRepository;

    @Value("${app.ai.index-on-startup:true}")
    private boolean indexOnStartup;

    // Tên bảng lấy từ cấu hình của ứng dụng
    @Value("${spring.ai.vectorstore.mariadb.table-name:vector_store}")
    private String tableName;

    // Khi khởi động: nếu Vector Store còn trống thì lập chỉ mục từ database
    @EventListener(ApplicationReadyEvent.class)
    public void onStartup() {
        if (!indexOnStartup) {
            return;
        }
        try {
            Long count = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM " + tableName, Long.class);
            if (count == null || count == 0) {
                reindexAll();
            } else {
                log.info("Vector store đã có {} documents, bỏ qua lập chỉ mục khi khởi động", count);
            }
        } catch (Exception e) {
            // Không làm ứng dụng dừng; gọi POST /api/ai-assistant/reindex để thử lại
            log.error("Không thể lập chỉ mục khi khởi động", e);
        }
    }

    // Xóa toàn bộ dữ liệu vector cũ rồi lập chỉ mục lại từ database (tránh trùng lặp và dữ liệu đã ẩn)
    public synchronized int reindexAll() {
        List<Document> documents = new ArrayList<>();

        for (DongXe dx : dongXeRepository.findByTrangThai(TrangThaiDongXe.HIEN_THI)) {
            documents.add(new Document(
                    String.format("Dòng xe: %s. Danh mục: %s. Mô tả: %s",
                            nz(dx.getTenDongXe()), nz(dx.getDanhMuc()), nz(dx.getMoTa())),
                    Map.of("id", dx.getMaDongXe(), "type", "dongxe",
                            "ten", nz(dx.getTenDongXe()),
                            "moTa", nz(dx.getMoTa()),
                            "hinhAnh", nz(dx.getHinhAnh()))));
        }

        for (Xe xe : xeRepository.findByTrangThai(TrangThaiXe.DANG_BAN)) {
            documents.add(new Document(
                    String.format("Phiên bản: %s. Giá: %s VNĐ. Động cơ: %s. Công suất: %s HP. "
                                    + "Tốc độ tối đa: %s km/h. Mô tả: %s",
                            nz(xe.getTenPhienBan()), nz(xe.getGiaKhoiDiem()), nz(xe.getDongCo()),
                            nz(xe.getCongSuat()), nz(xe.getTocDoToiDa()), nz(xe.getMoTa())),
                    Map.of("id", xe.getMaXe(), "type", "xe",
                            "ten", nz(xe.getTenPhienBan()),
                            "moTa", nz(xe.getMoTa()),
                            "hinhAnh", nz(xe.getHinhAnh()))));
        }

        for (TinTuc tt : tinTucRepository.findByTrangThai(TrangThaiTinTuc.HIEN_THI)) {
            documents.add(new Document(
                    String.format("Tin tức: %s. Nội dung: %s. Ngày đăng: %s",
                            nz(tt.getTieuDe()), cut(tt.getNoiDung(), MAX_NEWS_CHARS),
                            tt.getNgayDang().toLocalDate()),
                    Map.of("id", tt.getMaTinTuc(), "type", "tintuc",
                            "ten", nz(tt.getTieuDe()),
                            "moTa", cut(tt.getNoiDung(), 100),
                            "hinhAnh", nz(tt.getHinhAnh()))));
        }

        for (Showroom sr : showroomRepository.findByTrangThai(TrangThaiShowroom.HOAT_DONG)) {
            documents.add(new Document(
                    String.format("Showroom: %s. Địa chỉ: %s, %s. Giờ mở cửa: %s - %s. Số điện thoại: %s",
                            nz(sr.getTenShowroom()), nz(sr.getDiaChi()), nz(sr.getKhuVuc()),
                            nz(sr.getGioMoCua()), nz(sr.getGioDongCua()), nz(sr.getSoDienThoai())),
                    Map.of("id", sr.getMaShowroom(), "type", "showroom",
                            "ten", nz(sr.getTenShowroom()),
                            "moTa", "",
                            "hinhAnh", "")));
        }

        jdbcTemplate.update("DELETE FROM " + tableName);
        if (!documents.isEmpty()) {
            vectorStore.add(documents);
        }
        log.info("Đã index {} documents vào vector store", documents.size());
        return documents.size();
    }

    private static String nz(Object value) {
        return value == null ? "" : String.valueOf(value);
    }

    private static String cut(String text, int max) {
        if (text == null) return "";
        return text.length() <= max ? text : text.substring(0, max);
    }
}
