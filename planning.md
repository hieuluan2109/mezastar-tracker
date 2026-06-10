Kế hoạch triển khai: Ứng dụng Mezastar Collector Dex
Ứng dụng web cá nhân để theo dõi, quản lý và ghi chú số lượng thẻ game Pokémon Mezastar đã sưu tầm được. Thiết kế hiện đại, trực quan, dễ sử dụng, phân loại theo Season và hỗ trợ thêm các thẻ custom/event thủ công.

Tóm tắt Công nghệ & Thiết kế
Frontend: React (TypeScript) + Vite
Styling: Tailwind CSS với thiết kế Glassmorphism hiện đại, hiệu ứng hover mượt mà và màu sắc rực rỡ tương ứng với độ hiếm (Superstar, Star, Normal).
Lưu trữ dữ liệu: LocalStorage (client-side) giúp lưu trữ số lượng thẻ sở hữu và các thẻ custom mà không cần Database.
Tính năng đặc biệt:
Đã nạp sẵn danh sách đầy đủ 70 thẻ của StarDust Season 1 (Version 1) kèm link ảnh chính thức.
Cho phép người dùng thêm mùa sưu tầm mới (Custom Season).
Cho phép người dùng thêm thẻ thủ công (Custom / Event / Promo) vào bất kỳ Season nào hoặc vào tab Đặc biệt.
Thống kê tỷ lệ hoàn thành (Progress Dashboard) trực quan theo từng mùa và từng cấp độ hiếm.
Chức năng Export/Import dữ liệu dạng JSON để sao lưu hoặc chuyển đổi thiết bị.
Các Tính năng Chính
1. Dashboard Thống kê & Bộ lọc
Thống kê tổng số lượng thẻ đã thu thập trên tổng số thẻ của mùa (ví dụ: 25/70 thẻ - 35.7%).
Biểu đồ tiến độ (Progress Bar/Circle) đẹp mắt, có hiệu ứng chuyển động.
Thanh tìm kiếm theo tên hoặc mã thẻ (ví dụ: Mewtwo hoặc 1-1-001).
Bộ lọc theo:
Mùa (Season 1, Season 2, Custom Seasons, Event/Promo).
Độ hiếm (Superstar ★6, Star ★5, Normal ★2~4, Custom/Promo).
Hệ Pokémon (Hỏa, Thủy, Thảo, Lôi, v.v.).
Trạng thái sở hữu (Tất cả, Đã sở hữu, Chưa sở hữu).
2. Danh sách Thẻ (Dex Grid) dưới dạng Grid trực quan
Các thẻ hiển thị hình ảnh Pokémon chính thức (cho Season 1), mã số thẻ, tên, hệ và độ hiếm.
Border của thẻ có hiệu ứng gradient phát sáng tùy theo độ hiếm:
Superstar (★6): Màu đỏ/tím/vàng gold sang trọng kèm hiệu ứng lấp lánh (sparkle transition).
Star (★5): Màu tím/neon lôi cuốn.
Normal (★2~4): Màu xám/xanh lá/vàng đơn giản thanh lịch.
Nút tăng/giảm số lượng thẻ sở hữu (- và +) ngay trên thẻ, hoặc người dùng nhập số trực tiếp.
Click vào thẻ sẽ mở Modal chi tiết thẻ, cho phép thêm ghi chú (ví dụ: "Thẻ này săn được ở TTTM Aeon Mall Long Biên").
3. Quản lý Thẻ Custom / Event / Promo
Người dùng có thể nhấn nút "Thêm thẻ thủ công" để mở form nhập:
Tên Pokémon
Mã số thẻ (Ví dụ: Promo-001)
Độ hiếm (Superstar, Star, Normal, Promo, Event, Custom)
Hệ Pokémon
Chọn Season muốn thêm vào (mặc định có sẵn tab "Thẻ Đặc Biệt / Event")
Đường dẫn ảnh (nếu có, nếu không sẽ dùng placeholder tuyệt đẹp dạng thẻ bài Mezastar)
Số lượng ban đầu
Ghi chú/Sự kiện
Hỗ trợ sửa/xóa đối với thẻ tự thêm.
4. Quản lý Season mới
Cho phép người dùng tạo thêm các Season tùy chọn (ví dụ: StarDust Season 2, Double Chain 1) để tự bổ sung danh sách thẻ sau này.
Thiết kế Giao diện (Mockup & UI)
Background: Tông màu tối sâu (Deep dark slate/indigo #0f172a hoặc #0b0f19) tạo độ tương phản cao với các thẻ bài Mezastar rực rỡ.
Glassmorphism: Các card và bảng điều khiển sử dụng nền mờ backdrop-blur-md bg-white/5 border border-white/10 kết hợp đổ bóng mềm.
Card Design:
Tỷ lệ thẻ Mezastar chuẩn (dạng chữ nhật bo góc đứng hoặc ngang).
Ảnh Pokémon nổi bật ở giữa.
Tên và ID thẻ sắc nét, font chữ hiện đại (Roboto/Outfit/Inter).
Cấu trúc Thư mục Dự án
text

/mezastar-tracker
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── /src
    ├── main.tsx
    ├── index.css          # Định nghĩa Design System, biến màu HSL, hiệu ứng lấp lánh
    ├── types.ts           # Định nghĩa MezastarTag, Season
    ├── /data
    │   └── defaultTags.ts # Nạp sẵn 70 thẻ Season 1 và cấu trúc Season mẫu
    ├── /components
    │   ├── Navbar.tsx
    │   ├── StatsDashboard.tsx
    │   ├── FilterBar.tsx
    │   ├── TagCard.tsx
    │   ├── TagDetailModal.tsx
    │   ├── AddTagModal.tsx
    │   └── AddSeasonModal.tsx
    └── App.tsx
Kế hoạch Xác minh & Kiểm thử (Verification Plan)
Kiểm thử Thủ công
Khởi tạo dữ liệu: Mở trang web lần đầu, xác nhận 70 thẻ của Season 1 hiển thị đầy đủ hình ảnh chính xác và số lượng mặc định bằng 0.
Tính năng note số lượng: Tăng giảm số lượng thẻ Mewtwo lên 3, tải lại trang (F5) và xác nhận số lượng vẫn lưu là 3.
Bộ lọc & Tìm kiếm:
Gõ "Mew" -> hiển thị Mew và Mewtwo.
Chọn lọc "Superstar" -> chỉ hiển thị 10 thẻ Superstar.
Chọn lọc "Chưa sở hữu" -> hiển thị các thẻ có số lượng = 0.
Thêm thẻ thủ công: Thêm thẻ Promo Pikachu mã P-001, hệ Điện, số lượng 1. Xác nhận thẻ xuất hiện ở Tab "Thẻ Đặc Biệt" với viền màu cam/vàng đặc trưng cho Promo.
Thêm Season mới: Thêm Season tên "Mùa 2 thử nghiệm". Xác nhận dropdown Season xuất hiện lựa chọn này, và có thể thêm thẻ mới vào mùa này.
Backup & Restore:
Nhấn "Export dữ liệu" -> tải file JSON về máy.
Thay đổi số lượng thẻ trên web, sau đó nhấn "Import dữ liệu" và chọn file JSON vừa tải -> xác nhận số lượng thẻ được khôi phục về trạng thái cũ.
Responsive: Đảm bảo hiển thị đẹp mắt và mượt mà trên cả Mobile (dọc) và Desktop (màn hình rộng).