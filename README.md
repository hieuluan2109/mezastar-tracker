# ⚡ MEZASTAR DEX — Pokémon Mezastar Collection Tracker

**MEZASTAR DEX** là ứng dụng web cá nhân để theo dõi, quản lý và ghi chú số lượng thẻ game **Pokémon Mezastar** đã sưu tầm được. Thiết kế hiện đại với Glassmorphism, hỗ trợ theo dõi theo mùa (Season), phân loại độ hiếm (Superstar ★6 / Star ★5 / Normal ★2-4), và cho phép thêm thẻ custom, event, promo thủ công.

> 🎯 **Mục tiêu:** Thay thế sổ tay giấy — ghi chép nhanh số lượng thẻ, nơi săn được, ghi chú sự kiện, tất cả trong một giao diện đẹp mắt.

---

## ✨ Tính năng chính

| Tính năng | Mô tả |
|-----------|-------|
| 📇 **Dex Grid** | Hiển thị thẻ dạng lưới với ảnh Pokémon chính thức, mã thẻ, tên, hệ, độ hiếm |
| 🔍 **Bộ lọc đa chiều** | Tìm kiếm theo tên/số thẻ, lọc theo mùa, hệ, độ hiếm, trạng thái sở hữu |
| 📊 **Dashboard thống kê** | Progress bar, tỷ lệ hoàn thành theo từng độ hiếm |
| 📝 **Ghi chú sưu tập** | Ghi lại địa điểm, ngày săn thẻ, sự kiện cho từng thẻ |
| 🎨 **Theme sáng/tối** | Chuyển đổi giao diện với CSS variables, lưu preference |
| ✨ **Hiệu ứng động** | Staggered card entrance, Superstar shimmer sweep, border glow, sparkle particles |
| 💾 **Sao lưu JSON** | Export/Import toàn bộ dữ liệu dạng file JSON |
| ♿ **Accessibility** | `aria-label`, role dialog, focus-visible rings, prefers-reduced-motion |
| 🚀 **Tối ưu hiệu năng** | React.memo, lazy-load modals, code splitting, Context API |

---

## 🧱 Tech Stack

| Công nghệ | Mục đích |
|-----------|----------|
| **React 19** + TypeScript | UI framework |
| **Vite 8** | Build tool |
| **Tailwind CSS v4** | Styling + design system |
| **Lucide React** | Icon library |
| **localStorage** | Client-side data persistence |

---

## 🚀 Hướng dẫn chạy

```bash
# Clone repo
git clone <repo-url>
cd mezastar-tracker

# Install dependencies
npm install

# Dev server (http://localhost:5173)
npm run dev

---

## 📦 Dữ liệu thẻ

### Season 1 — StarDust Version 1 (May 2026)
- **70 thẻ** với ảnh chính thức từ trang chủ Pokémon Mezastar
- 10 Superstar ★6, 15 Star ★5, 45 Normal ★2-4

### Season 2 — StarDust Version 2 (tạm ẩn)
- **73 thẻ** (70 chính + 3 Regular Tags)
- Dữ liệu đã được nhập nhưng tạm ẩn do chưa có ảnh chính thức
- Kích hoạt: bỏ comment dòng `season-2` trong `src/data/defaultTags.ts`

### Thẻ Đặc Biệt (Event & Promo)
- Promo, Event, Custom tags do người dùng tự thêm
- Regular Tags từ Season 2 (R-2-1 Pikachu, R-2-2 Charizard, R-2-3 Gengar)

---

## ♿ Accessibility

- `aria-label` trên tất cả icon-only buttons
- `role="dialog"` + `aria-modal` trên modals
- Escape key đóng modal
- `focus-visible:ring` trên interactive elements
- `prefers-reduced-motion` media query
- `color-scheme` hỗ trợ dark/light mode

---

## 📄 License

MIT — sử dụng tự do cho mục đích cá nhân.
