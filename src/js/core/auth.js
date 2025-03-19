import { CONFIG } from './config.js';

// Class quản lý đăng nhập bằng Google 
class GoogleAuth {
  constructor() {
    this.loadGoogleScript();
  }

  // Tải script Google SDK
  loadGoogleScript() {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => this.initGoogle();
    document.head.appendChild(script);
  }

  // Khởi tạo Google SDK
  initGoogle() {
    google.accounts.id.initialize({
      client_id: CONFIG.AUTH.GOOGLE_CLIENT_ID,
      callback: this.handleSignIn,
    });

    // Tạo nút đăng nhập Google
    const loginBtn = document.getElementById('googleSignInBtn');
    if (loginBtn) {
      google.accounts.id.renderButton(loginBtn, {
        theme: 'outline',
        size: 'large', 
        text: 'signin_with'
      });
    }
  }

  // Xử lý khi đăng nhập thành công
  handleSignIn = async (response) => {
    try {
      // Lưu thông tin và chuyển trang
      localStorage.setItem('google_token', response.credential);
      window.location.href = 'main.html';

    } catch (error) {
      console.error('Lỗi:', error);
      alert('Đăng nhập thất bại!');
    }
  }
}

// Khởi tạo khi trang load xong
document.addEventListener('DOMContentLoaded', () => {
  new GoogleAuth();
});

export default GoogleAuth;
