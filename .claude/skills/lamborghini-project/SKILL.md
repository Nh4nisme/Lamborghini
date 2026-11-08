---
name: lamborghini-project
description: Quy ước và cấu trúc của dự án web Lamborghini (React + Vite + TypeScript ở frontend, Spring Boot + MariaDB ở backend). Dùng skill này mỗi khi thêm hoặc sửa tính năng, tạo API, entity, trang, component, hook, hoặc khi cần biết lệnh chạy/build/test, ngay cả khi người dùng chỉ nói "thêm trang", "thêm API", "sửa model", "sửa configurator" mà không nhắc tên dự án.
---

# Dự án Lamborghini

## Công nghệ
- **Frontend** (`frontend/`): React 19, TypeScript, Vite, Tailwind CSS v4, React Router 7, TanStack Query 5, Leaflet.
- **Backend** (`backend/`): Spring Boot, Java 21, Spring Data JPA, MariaDB, Lombok, Maven (`mvnw`).
- Vite proxy: `/api` và `/images` chuyển tới `http://localhost:8080`, nên frontend luôn gọi đường dẫn tương đối `/api/...`.

## Lệnh thường dùng
| Việc | Lệnh | Chạy ở |
|---|---|---|
| Chạy backend | `./mvnw spring-boot:run` | `backend/` |
| Test backend | `./mvnw test` | `backend/` |
| Chạy frontend | `npm run dev` | `frontend/` |
| Kiểm tra kiểu + build | `npm run build` | `frontend/` |
| Lint | `npm run lint` | `frontend/` |

Có cả `package-lock.json` và `pnpm-lock.yaml`. Dùng `npm` cho đồng nhất, không tự ý đổi trình quản lý gói.

## Cấu trúc
- Backend theo lớp: `controller` -> `service` -> `repository` -> `entity`, kèm `dto/response`, `enums`, `exception`.
- Frontend theo tính năng: `src/features/<tên>/{api.ts, hooks.ts, types.ts, components/}`. Các tính năng hiện có: `home`, `model`, `configurator`, `showroom`.
- Trang nằm ở `src/pages/`, gọi hook của feature. Hàm gọi HTTP chung ở `src/api/http.ts`.
- Đặt tên theo tiếng Việt không dấu, nhất quán với code cũ (`DongXe`, `TuyChonCauHinh`, `maXe`, `getDanhSach...`). Không đổi tên cũ trừ khi được yêu cầu.

## API hiện có
- `GET /api/home?soDongXe=&soTinTuc=`, `/api/home/dongxe/{limit}`, `/api/home/tintuc/{limit}`
- `GET /api/model/getAllDongXe`, `/api/model/{maDongXe}/modeldetail`
- `GET /api/configurator/{maXe}`, `/{maXe}/color?loaiMau=`, `/{maXe}/options?maNhomTuyChon=`
- `GET /api/showroom`

## Quy tắc khi thêm tính năng
1. **Backend trước, theo đúng lớp**: entity/enum -> repository -> service -> controller. Không đặt logic trong controller.
2. **Frontend**: thêm hàm trong `api.ts`, bọc bằng `useQuery` trong `hooks.ts`, kiểu dữ liệu trong `types.ts`. Component không gọi `fetch` trực tiếp.
3. Lỗi "không tìm thấy" dùng `NotFoundException` (đã map sang HTTP 404).
4. Đặt `queryKey` rõ ràng, có kèm tham số (ví dụ `['configurator-colors', maXe, loaiMau]`).
5. Giữ comment mã use case (`UC003`, `UC004`...) khi sửa code đã có.
6. Mã nhóm tùy chọn đang hard-code: `1` = màu sơn, `2` = mâm xe, `6` = lốp/ngoại thất. Khi dùng thì chú thích rõ, ưu tiên đưa vào hằng số có tên.
7. Không sửa `frontend/dist/` và `backend/target/` (đây là file build sinh ra).
8. Không hard-code mật khẩu, khóa API hay địa chỉ DB vào code hay commit (xem skill `lamborghini-debug`, mục bảo mật).

## Kiểm tra sau khi sửa
Chạy `npm run build` (và `npm run lint`) cho frontend, `./mvnw test` cho backend nếu có thể. Chỉ báo "đã kiểm tra" với lệnh bạn thực sự chạy được. Nếu không chạy được (ví dụ thiếu kết nối DB), nói rõ.
