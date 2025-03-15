class LogisticsManager {
    static shipmentStatus = {
        'pending': 'Chờ xử lý',
        'in_transit': 'Đang vận chuyển',
        'in_warehouse': 'Trong kho',
        'delivered': 'Đã giao',
        'returned': 'Hoàn trả'
    };

    static carriers = {
        'ghtk': 'Giao Hàng Tiết Kiệm',
        'ghn': 'Giao Hàng Nhanh',
        'vnpost': 'VN Post',
        'dhl': 'DHL',
        'fedex': 'FedEx'
    };

    static locations = {
        warehouses: [
            {id: 'HN', name: 'Kho Hà Nội'},
            {id: 'HCM', name: 'Kho Hồ Chí Minh'},
            {id: 'DN', name: 'Kho Đà Nẵng'}
        ],
        zones: [
            {id: 'A1', name: 'Khu vực A1'},
            {id: 'A2', name: 'Khu vực A2'},
            {id: 'B1', name: 'Khu vực B1'},
            {id: 'B2', name: 'Khu vực B2'}
        ]
    };

    static validateTransfer(source, destination, items) {
        // Kiểm tra tính hợp lệ của việc chuyển hàng
        return {
            valid: true,
            message: 'OK'
        };
    }
}
