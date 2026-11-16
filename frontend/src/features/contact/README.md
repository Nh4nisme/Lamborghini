# Contact Feature

## Cấu trúc

Feature Contact được tổ chức theo pattern chuẩn của dự án Lamborghini:

```
src/features/contact/
├── components/           # Contact-specific components
│   ├── ContactHero.tsx
│   ├── ContactIntroduction.tsx
│   ├── HeadquartersSection.tsx
│   ├── ContactPathwaysSection.tsx
│   ├── EnquiryFormSection.tsx
│   ├── CultureResourcesSection.tsx
│   ├── ContactFAQSection.tsx
│   └── index.ts
├── data.ts              # Static data (pathways, resources, FAQs)
└── index.ts             # Feature exports
```

## Components

### ContactHero
Hero section với background image, tiêu đề chính và CTA "Make an enquiry".

### ContactIntroduction
Section giới thiệu về dịch vụ contact và customer care.

### HeadquartersSection
Hiển thị thông tin địa chỉ trụ sở chính tại Sant'Agata Bolognese.

### ContactPathwaysSection
Grid 3 cột hiển thị các pathways: Customer Care, Showroom, Privacy & Personal Data.
Sử dụng `PathwayCard` từ `components/ui`.

### EnquiryFormSection
Form liên hệ với các trường:
- Inquiry category (required)
- Model of interest (optional)
- Full name (required)
- Email (required)
- Country/Region (required)
- Message (required)
- Privacy consent checkbox (required)
- Newsletter opt-in (optional)

### CultureResourcesSection
Grid 3 cột hiển thị Museum, Polo Storico, Unica.

### ContactFAQSection
FAQ accordion với 3 câu hỏi thường gặp về showroom consultation, specifications, privacy request.

## Shared UI Components

Feature này sử dụng các reusable components từ `src/components/ui/`:
- **Eyebrow** - Label nhỏ trên đầu section
- **SectionHeading** - Tiêu đề section với font Barlow Condensed
- **PathwayCard** - Card hiển thị pathway/resource với icon, title, description, action button
- **Field** - Wrapper cho form field với label, hint, error
- **Input, Textarea, Select** - Form controls với styling nhất quán
- **FAQAccordion** - Collapsible FAQ list
- **PrimaryButton** - Primary action button

## Data

File `data.ts` chứa:
- `pathways` - Danh sách 3 contact pathways
- `cultureResources` - Danh sách 3 culture resources
- `faqs` - Danh sách 3 câu hỏi thường gặp

## Usage

```tsx
import { ContactPage } from './pages/ContactPage'

// ContactPage tự động import tất cả sections từ feature
export default function ContactPage() {
  return (
    <div className="font-sans" style={{ fontFamily: 'Barlow, sans-serif' }}>
      <ContactHero />
      <ContactIntroduction />
      <HeadquartersSection />
      <ContactPathwaysSection />
      <EnquiryFormSection />
      <CultureResourcesSection />
      <ContactFAQSection />
    </div>
  )
}
```

## Navigation

Contact được truy cập qua:
1. **Navbar** > About dropdown > Contact
2. **Footer** > Ownership section > Contact
3. **Footer** > Bottom legal links > Contact
4. Direct URL: `/contact`

## Notes

- Form là illustrative only, không submit data thật
- Tất cả external links (Museum, Polo Storico, etc.) là placeholders
- Headquarters information chỉ là reference cho design study
- Tuân thủ design system: nền đen (#040404), text vàng (#d8a016), font Barlow/Barlow Condensed
