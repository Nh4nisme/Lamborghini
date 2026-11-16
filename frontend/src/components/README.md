# Components Structure

Cấu trúc thư mục components đã được tái tổ chức theo nhóm chức năng:

## 📁 layout/
Components liên quan đến bố cục và điều hướng chính của website:
- `Navbar.tsx` - Thanh điều hướng chính
- `SubNavigation.tsx` - Thanh điều hướng phụ
- `Footer.tsx` - Footer website
- `Breadcrumb.tsx` - Breadcrumb navigation

**Import:**
```typescript
import { Navbar, Footer, Breadcrumb } from '@/components/layout'
```

## 📁 sections/
Components cho các section/banner lớn trong trang:
- `AnimatedSection.tsx` - Wrapper cho section với animation
- `InfoBanner.tsx` - Banner thông tin
- `FeaturedModelsCarousel.tsx` - Carousel hiển thị các model nổi bật
- `NextChapterCTA.tsx` - Call-to-action cho phần tiếp theo

**Import:**
```typescript
import { AnimatedSection, InfoBanner, FeaturedModelsCarousel, NextChapterCTA } from '@/components/sections'
```

## 📁 feedback/
Components cho feedback người dùng và utilities:
- `LoadingScreen.tsx` - Màn hình loading với logo animation
- `ScrollToTop.tsx` - Button scroll to top
- `Chatbot.tsx` - Chatbot component
- `Chatbot.README.md` - Hướng dẫn sử dụng Chatbot

**Import:**
```typescript
import { LoadingScreen, ScrollToTop, Chatbot } from '@/components/feedback'
```

## 📁 ui/
UI components nhỏ, có thể tái sử dụng (giữ nguyên cấu trúc cũ):
- `Button.tsx`
- `Eyebrow.tsx`
- `FAQAccordion.tsx`
- `FormField.tsx`
- `PathwayCard.tsx`
- `SectionHeading.tsx`

**Import:**
```typescript
import { Button, Eyebrow, FAQAccordion } from '@/components/ui'
```

## 🎯 Import Pattern

Tất cả các thư mục con đều có file `index.ts` để re-export, cho phép import gọn gàng:

```typescript
// ✅ Cách import mới (khuyến nghị)
import { Navbar, Footer } from '@/components/layout'
import { LoadingScreen, ScrollToTop } from '@/components/feedback'
import { AnimatedSection, NextChapterCTA } from '@/components/sections'
import { Button, SectionHeading } from '@/components/ui'

// ❌ Cách import cũ (không dùng nữa)
import { Navbar } from '@/components/Navbar'
import { LoadingScreen } from '@/components/LoadingScreen'
```

## 📝 Notes

- Tất cả relative imports trong các component đã được cập nhật để phù hợp với cấu trúc mới
- Build đã được verify và hoạt động bình thường
- Cấu trúc này giúp dễ quản lý và mở rộng hơn khi dự án phát triển
