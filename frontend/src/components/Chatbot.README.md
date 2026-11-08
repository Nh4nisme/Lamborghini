# Chatbot Component

## Mô tả
Component chatbot sang trọng theo phong cách Lamborghini, được thiết kế để hỗ trợ người dùng với các câu hỏi về sản phẩm, showroom, và dịch vụ.

## Vị trí
- Chatbot nằm ở góc dưới bên phải màn hình
- Hiển thị sau khi scroll xuống 400px (mặc định)
- Nằm **phía trên** nút ScrollToTop (z-index: 50 vs 40)

## Thiết kế

### Màu sắc
- Nền: `bg-lambo-dark-light` (#0a0a0a)
- Viền: `border-lambo-primary/40` với hiệu ứng glow
- Nút chính: `bg-lambo-primary` (#D8A016)
- Tin nhắn user: `bg-lambo-primary` với text đen
- Tin nhắn bot: `bg-lambo-dark` với viền vàng mờ

### Kiểu dáng
- Floating button với icon MessageCircle và badge thông báo đỏ
- Chat window: 380x520px với border-radius 2xl
- Hiệu ứng glow vàng xung quanh
- Animation fadeIn khi hiển thị
- Custom scrollbar theo theme Lamborghini

### Typography
- Header: `font-family-barlow` (Barlow Condensed) - uppercase, tracking-wider
- Messages: Inter font, 14px
- Timestamp: 10px, opacity 60%

## Tính năng

### Trạng thái
- **Closed**: Chỉ hiển thị floating button
- **Open**: Hiển thị chat window đầy đủ
- **Minimized**: Chỉ hiển thị header của chat window

### Chức năng
- Gửi tin nhắn bằng nút Send hoặc phím Enter
- Bot trả lời tự động sau ~1.5s
- Typing indicator khi bot đang trả lời
- Auto-scroll đến tin nhắn mới nhất
- Hiển thị timestamp cho mỗi tin nhắn

### Bot Responses
Bot có thể trả lời các câu hỏi về:
- Giá xe
- Showroom/đại lý
- Các dòng xe (models)
- Configurator/tùy chỉnh
- Lái thử/test drive

## Props

```typescript
interface ChatbotProps {
  showAfter?: number; // Số pixel scroll trước khi hiện (default: 400)
}
```

## Sử dụng

```tsx
import { Chatbot } from './components/Chatbot'

function App() {
  return (
    <div>
      {/* Your content */}
      <Chatbot />
    </div>
  )
}
```

## Accessibility
- ✓ Tất cả nút có `aria-label`
- ✓ Input có `aria-label`
- ✓ Keyboard navigation (Enter để gửi tin nhắn)
- ✓ Focus states rõ ràng
- ✓ Disabled state cho nút Send khi input rỗng

## Responsive
- Mobile: Chat window tự động thu nhỏ phù hợp với màn hình
- Width: 380px (có thể điều chỉnh cho mobile)
- Position: Fixed với right-8, bottom-24

## Animation
- `animate-fadeIn`: Khi component xuất hiện
- `animate-pulse`: Typing indicator và notification badge
- Smooth transitions cho tất cả hover/active states
- Smooth scroll trong messages area

## Tương lai
Có thể tích hợp:
- API backend thật cho AI chatbot
- WebSocket cho real-time messaging
- Lưu lịch sử chat trong localStorage
- Multi-language support
- Upload hình ảnh
- Quick replies/suggested questions
- Integration với CRM/ticketing system
