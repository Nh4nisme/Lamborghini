---
name: lamborghini-ui
description: Hướng dẫn thiết kế giao diện cho web Lamborghini (nền đen, điểm nhấn vàng, Tailwind v4). Dùng skill này khi tạo hoặc sửa bất kỳ trang, section, component, màu sắc, bố cục, hiệu ứng, trạng thái loading/lỗi hoặc responsive nào, kể cả khi người dùng chỉ nói "làm đẹp hơn", "thêm section", "sửa giao diện", "làm trang mới".
---

# Giao diện Lamborghini

Giữ ngôn ngữ thị giác sẵn có của dự án. Không thêm màu, font hay phong cách mới nếu chưa được yêu cầu.

## Nguồn sự thật
- Token màu và font nằm trong `frontend/src/index.css` (khối `@theme`). Hướng dẫn dùng màu: `frontend/COLOR_PALETTE_GUIDE.md`. Đọc hai file này trước khi sửa giao diện.
- Dùng class Tailwind của dự án: `bg-lambo-primary`, `hover:bg-lambo-hover`, `active:bg-lambo-pressed`, `text-lambo-secondary`, `bg-lambo-bold-black`, `bg-lambo-dark`, `bg-lambo-dark-light`, `border-lambo-primary`... Không viết mã hex mới trong component (đã có sẵn vài hex trong `configurator/constants.ts` cho ô màu sơn, đó là ngoại lệ vì là màu sản phẩm).
- Font: `Barlow Condensed` (`font-family-barlow`) cho tiêu đề/nhãn kiểu hãng xe, `Inter` cho nội dung.
- Nền tối (`color-scheme: dark`), nền chính `#040404`, chữ `#e5e5e5`.

## Nguyên tắc
1. **Tái sử dụng trước**: xem `src/components/` và `src/features/*/components/` có component phù hợp chưa trước khi tạo mới. Component mới đặt đúng feature.
2. **Mỗi màn hình một việc chính**, một hành động rõ nhất (nút vàng). Nút phụ dùng viền trắng hoặc viền vàng như trong COLOR_PALETTE_GUIDE.
3. **Chỉ thêm thứ có công dụng**: không thêm tiêu đề lặp lại tên menu, mô tả thừa, hay trang trí không phục vụ sản phẩm. Ảnh/video phải phục vụ việc giới thiệu xe.
4. **Đủ các trạng thái**: đang tải (skeleton đúng hình dạng nội dung), rỗng, lỗi, thành công. Lưu ý lỗi API đang bị fallback che (xem `lamborghini-debug`), nên không giả định "không thấy lỗi nghĩa là API tốt".
5. **Phản hồi tức thì**: nút/lựa chọn đổi trạng thái ngay khi bấm. Hiệu ứng chuyển động ngắn (opacity/transform), tôn trọng `prefers-reduced-motion`, không làm chậm nội dung chỉ để lấy hiệu ứng.
6. **Truy cập được**: điều khiển bằng bàn phím, focus nhìn thấy được, `alt` cho ảnh có nghĩa, `aria-label` cho nút chỉ có icon (dự án dùng `lucide-react`), độ tương phản chữ vàng trên nền đen đạt yêu cầu. Video/âm thanh (`soundEngine.ts`, file `sound.mp3`) không tự phát âm thanh khi chưa có thao tác của người dùng.
7. **Responsive**: kiểm tra màn hình hẹp. Văn bản và nút không tràn container; bố cục configurator giữ kích thước ổn định.
8. Trang configurator (`/configurator/:maXe`) hiển thị riêng, không có Navbar/Footer (xem `App.tsx`). Giữ nguyên hành vi này.

## Kiểm tra trước khi báo xong
Chạy `npm run build` và `npm run lint`. Nếu có thể, mở `npm run dev` và xem các trạng thái mặc định, loading, lỗi, và màn hình hẹp. Nói rõ phần nào bạn chưa kiểm tra được bằng mắt.
