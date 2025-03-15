const CONFIG = {
    API_URL: 'http://api.example.com',
    WAREHOUSES: {
        HN: 'Hà Nội',
        HCM: 'Hồ Chí Minh',
        DN: 'Đà Nẵng'
    },
    CARRIERS: {
        GHTK: 'Giao Hàng Tiết Kiệm',
        GHN: 'Giao Hàng Nhanh',
        VNP: 'Vietnam Post'
    },
    STATUSES: {
        PENDING: 'Chờ xử lý',
        IN_TRANSIT: 'Đang vận chuyển',
        DELIVERED: 'Đã giao',
        RETURNED: 'Hoàn trả'
    },
    LOGIN_PATH: 'login.html'
};

// Export config
//window.CONFIG = CONFIG;
console.log('CONFIG loaded:', CONFIG);

// Override config with query parameters
const urlParams = new URLSearchParams(window.location.search);
const loginPath = urlParams.get('loginPath');
if (loginPath) {
  CONFIG.LOGIN_PATH = loginPath;
  console.log('LOGIN_PATH overridden by query parameter:', loginPath);
}

export { CONFIG };
