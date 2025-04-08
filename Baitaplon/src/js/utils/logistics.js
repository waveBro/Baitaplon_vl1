class QuanLyLogistics {
    static trangThaiVanChuyen = {
        'choXuLy': 'Chờ xử lý',
        'dangVanChuyen': 'Đang vận chuyển',
        'trongKho': 'Trong kho',
        'daGiao': 'Đã giao',
        'hoanTra': 'Hoàn trả'
    };

    static donViVanChuyen = {
        'ghtk': 'Giao Hàng Tiết Kiệm',
        'ghn': 'Giao Hàng Nhanh',
        'vnpost': 'Bưu Điện Việt Nam',
        'dhl': 'DHL',
        'fedex': 'FedEx'
    };

    static diaDiem = {
        kho: [
            {id: 'HN', ten: 'Kho Hà Nội'},
            {id: 'HCM', ten: 'Kho Hồ Chí Minh'},
            {id: 'DN', ten: 'Kho Đà Nẵng'}
        ],
        khuVuc: [
            {id: 'A1', ten: 'Khu vực A1'},
            {id: 'A2', ten: 'Khu vực A2'},
            {id: 'B1', ten: 'Khu vực B1'},
            {id: 'B2', ten: 'Khu vực B2'}
        ]
    };

    static kiemTraChuyenHang(nguon, dichDen, dsSanPham) {
        return {
            hopLe: true,
            thongBao: 'Thành công'
        };
    }
}
