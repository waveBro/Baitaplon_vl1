# Hệ thống quản lý kho hàng trung chuyển

## Cấu trúc thư mục

```
g:\PTTK\
├── src/              # Source code - Chứa mã nguồn chính của ứng dụng
│   ├── js/           # JavaScript - Chứa mã xử lý, logic của ứng dụng
│   │   ├── core/     # Core - Chứa các chức năng cốt lõi, nền tảng
│   │   ├── modules/  # Modules - Chứa các module chức năng riêng biệt
│   │   ├── utils/    # Utilities - Chứa các hàm tiện ích dùng chung
│   ├── css/          # Stylesheets - Chứa các file định dạng giao diện
│   └── pages/        # Pages - Chứa các trang HTML của ứng dụng
├── docs/             # Documentation - Chứa tài liệu hướng dẫn, tham khảo
├── tests/            # Tests - Chứa các file kiểm thử
└── README.md         # Tài liệu mô tả dự án
```

## Các module chính

### Core Modules
- **Authentication (auth.js):** Quản lý xác thực người dùng, bao gồm đăng nhập và đăng ký.
- **Logistics Management (logistics.js):** Theo dõi trạng thái vận chuyển và quản lý kho hàng.
- **Inventory Tracking (inventory.js):** Quản lý sản phẩm, tồn kho và các thao tác liên quan.
- **Reporting (reports.js):** Tạo báo cáo thống kê và phân tích dữ liệu.

### Modules
- **Dashboard (dashboard.js):** Hiển thị thông tin tổng quan về hệ thống.
- **Profile (profile.js):** Quản lý thông tin cá nhân của người dùng.
- **Modal (modal.js):** Xử lý các cửa sổ modal trong giao diện.

### Utilities
- **Helpers (helpers.js):** Các hàm tiện ích như hiển thị loading, xử lý chuỗi.
- **Product Code (productCode.js):** Tạo và phân tích mã sản phẩm.
- **Logistics (logistics.js):** Quản lý trạng thái vận chuyển và địa điểm.

## Tính năng chính
- Quản lý nhập/xuất kho.
- Theo dõi vận chuyển và trạng thái đơn hàng.
- Quản lý lô hàng và sản phẩm.
- Báo cáo thống kê chi tiết.
- Quản lý người dùng và phân quyền.