---
name: lamborghini-debug
description: Quy trình debug và các bẫy đã biết của dự án Lamborghini (Spring Boot + MariaDB + React Query). Dùng skill này khi người dùng báo lỗi, màn hình trống hoặc hiển thị dữ liệu sai, API trả 404/500, test backend fail, build frontend lỗi, hoặc nói "không chạy", "bị lỗi", "debug giúp", "sao không hiện".
---

# Debug dự án Lamborghini

## Quy trình
1. **Tái hiện** lỗi trước: chạy lệnh hoặc mở đúng trang gây lỗi, lấy log/thông báo lỗi đầy đủ. Không đoán.
2. **Xác định tầng lỗi** (frontend, proxy, backend, database) bằng cách gọi thẳng API: `curl http://localhost:8080/api/...`. Nếu API đúng mà UI sai, lỗi ở frontend; nếu API sai, xem log backend.
3. Nêu giả thuyết rồi kiểm chứng bằng log hoặc một thay đổi nhỏ.
4. **Sửa nhỏ nhất có thể**, không refactor ngoài phạm vi.
5. Chạy lại đúng lệnh đã gây lỗi, rồi chạy `npm run build` / `./mvnw test` để chắc không hỏng chỗ khác.
6. Tóm tắt nguyên nhân gốc và cách sửa.

## Bẫy đã biết của dự án này

**1. Frontend nuốt lỗi API bằng dữ liệu dự phòng.** Trong `src/features/configurator/hooks.ts`, các hook bắt lỗi rồi trả `FALLBACK_COLORS`, `FALLBACK_WHEELS`, `FALLBACK_TIRES`, và `useXeConfigurator` có `placeholderData` cứng (Revuelto). Hệ quả: backend hỏng nhưng giao diện vẫn trông bình thường. Khi debug configurator, luôn kiểm tra tab Network hoặc gọi API trực tiếp, đừng tin vào những gì đang hiển thị. Không xóa fallback nếu chưa được yêu cầu, nhưng nên ghi log (`console.error`) khi rơi vào fallback.

**2. Hàm `http()` chỉ báo mã lỗi.** `src/api/http.ts` ném `Lỗi HTTP <status>`, không kèm nội dung phản hồi. Cần thêm thông tin thì sửa ở đây, không rải `try/catch` khắp component.

**3. Test backend phụ thuộc DB thật.** `BackendApplicationTests` dùng `@SpringBootTest` nên cần kết nối tới MariaDB cấu hình trong `application.properties`. Nếu test fail với lỗi kết nối/datasource, đó là vấn đề môi trường, chưa chắc code sai. Báo rõ điều này thay vì sửa code.

**4. Native query và tên cột.** `TuyChonCauHinhRepository` dùng `nativeQuery = true` với `SELECT t.*`. Một query còn chọn thêm `xt.ma_xe`. Sửa tên cột/bảng thì phải sửa cả entity và query. Lỗi dạng "Unknown column" thường do lệch giữa schema DB và entity.

**5. Quan hệ lazy bị ẩn khỏi JSON.** `Xe.dongXe`, `Xe.danhSachTuyChon`, `Xe.danhSachPhuTung` đều `@JsonIgnore`. Nếu frontend thiếu trường liên quan, đừng bỏ `@JsonIgnore` một cách vội vàng (có thể gây vòng lặp hoặc lỗi lazy loading); thêm vào DTO ở `dto/response`.

**6. Controller trả entity trực tiếp.** Nhiều endpoint trả thẳng entity. Khi thêm trường nhạy cảm vào entity, nó sẽ lộ ra API. Ưu tiên DTO cho dữ liệu mới.

**7. Cổng và proxy.** Frontend gọi `/api` qua proxy của Vite tới `localhost:8080`. Lỗi 404/ECONNREFUSED ở `/api` thường là do backend chưa chạy hoặc chạy cổng khác.

**8. TypeScript nghiêm ngặt.** `tsconfig.app.json` bật `noUnusedLocals` và `noUnusedParameters`, nên import hoặc biến thừa sẽ làm `npm run build` fail.

## Bảo mật: vấn đề cần báo cho người dùng
- `backend/src/main/resources/application.properties` đang chứa **mật khẩu DB ghi cứng**, dùng tài khoản `root`, trỏ tới máy chủ DB trên mạng. Không in lại mật khẩu này vào câu trả lời, log hay commit mới.
- Khuyến nghị: đổi mật khẩu ngay (vì file có thể đã nằm trong git/được chia sẻ), tạo user DB riêng quyền hạn tối thiểu, và đọc cấu hình từ biến môi trường, ví dụ `spring.datasource.password=${DB_PASSWORD}`. Thêm file cấu hình cục bộ vào `.gitignore`.
- `SecurityConfig` hiện rỗng và chưa có Spring Security. Mọi API công khai. Chấp nhận được nếu chỉ là API đọc, nhưng cần xem lại trước khi thêm API ghi hay dữ liệu người dùng.
- Chưa có cấu hình CORS trong backend (đang dựa vào proxy của Vite). Cần thêm khi triển khai frontend và backend ở hai tên miền khác nhau.
