package com.lamborghini.ai;

import com.lamborghini.enums.TrangThaiShowroom;
import com.lamborghini.enums.TrangThaiXe;
import com.lamborghini.repository.ShowroomRepository;
import com.lamborghini.repository.XeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.tool.annotation.Tool;
import org.springframework.ai.tool.annotation.ToolParam;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;
import java.util.Locale;

@Component
@RequiredArgsConstructor

public class LamborghiniTools {
    public record XeInfo(String tenPhienBan, String gia, String congSuat, String tocDoToiDa) {}
    public record ShowroomInfo(String ten, String diaChi, String soDienThoai) {}

    private final XeRepository xeRepository;
    private final ShowroomRepository showroomRepository;

    @Tool(description = "Tìm các phiên bản xe Lamborghini theo từ khóa tên và khoảng giá (VNĐ)")
    public List<XeInfo> searchCars(
            @ToolParam(description = "Từ khóa tên phiên bản", required = false) String keyword,
            @ToolParam(description = "Giá tối thiểu (VNĐ)", required = false) Long minPrice,
            @ToolParam(description = "Giá tối đa (VNĐ)", required = false) Long maxPrice) {
        String k = keyword == null ? "" : keyword.toLowerCase(Locale.ROOT);
        return xeRepository.findByTrangThai(TrangThaiXe.DANG_BAN).stream()
                .filter(x -> x.getTenPhienBan() != null
                        && x.getTenPhienBan().toLowerCase(Locale.ROOT).contains(k))
                .filter(x -> inRange(x.getGiaKhoiDiem(), minPrice, maxPrice))
                .limit(10)
                .map(x -> new XeInfo(x.getTenPhienBan(), String.valueOf(x.getGiaKhoiDiem()),
                        String.valueOf(x.getCongSuat()), String.valueOf(x.getTocDoToiDa())))
                .toList();
    }

    @Tool(description = "Tìm showroom Lamborghini theo khu vực hoặc địa chỉ")
    public List<ShowroomInfo> findShowroomByArea(
            @ToolParam(description = "Tên khu vực, ví dụ: Hà Nội, TP.HCM") String khuVuc) {
        String k = khuVuc == null ? "" : khuVuc.toLowerCase(Locale.ROOT);
        return showroomRepository.findByTrangThai(TrangThaiShowroom.HOAT_DONG).stream()
                .filter(s -> String.valueOf(s.getKhuVuc()).toLowerCase(Locale.ROOT).contains(k)
                        || String.valueOf(s.getDiaChi()).toLowerCase(Locale.ROOT).contains(k))
                .map(s -> new ShowroomInfo(s.getTenShowroom(), s.getDiaChi(), s.getSoDienThoai()))
                .toList();
    }

    // Giá có thể là Long, BigDecimal hoặc kiểu số khác nên chuyển qua BigDecimal để so sánh
    private static boolean inRange(Object gia, Long min, Long max) {
        if (gia == null) return min == null && max == null;
        BigDecimal v = new BigDecimal(String.valueOf(gia));
        if (min != null && v.compareTo(BigDecimal.valueOf(min)) < 0) return false;
        return max == null || v.compareTo(BigDecimal.valueOf(max)) <= 0;
    }
}
