import { CONFIG } from './config.js';

class LoginForm {
  constructor() {
    this.form = document.getElementById('loginForm');
    this.forgotPasswordLink = document.getElementById('forgotPasswordLink');
    this.forgotPasswordForm = document.getElementById('forgotPasswordForm');
    this.cancelForgotPassword = document.getElementById('cancelForgotPassword');
    this.submitForgotPassword = document.getElementById('submitForgotPassword');
    this.setup();
  }

  setup() {
    // Xử lý đăng nhập form
    this.form?.addEventListener('submit', this.handleLogin.bind(this));

    // Xử lý đăng nhập Google
    const googleBtn = document.getElementById('googleLoginBtn');
    googleBtn?.addEventListener('click', this.handleGoogleLogin.bind(this));

    // Xử lý hiện/ẩn mật khẩu
    const passInput = document.getElementById('password');
    const toggleBtn = document.createElement('i');
    toggleBtn.className = 'fas fa-eye password-toggle';
    passInput?.parentElement?.appendChild(toggleBtn);

    toggleBtn.onclick = () => {
      if (passInput.type === 'password') {
        passInput.type = 'text';
        toggleBtn.className = 'fas fa-eye-slash password-toggle';
      } else {
        passInput.type = 'password';
        toggleBtn.className = 'fas fa-eye password-toggle';
      }
    };
    this.forgotPasswordLink?.addEventListener('click', this.showForgotPasswordForm.bind(this));
    this.cancelForgotPassword?.addEventListener('click', this.hideForgotPasswordForm.bind(this));
    this.submitForgotPassword?.addEventListener('click', this.handleForgotPassword.bind(this));
  }

  async handleLogin(e) {
    e.preventDefault();
    const username = this.form.username.value;
    const password = this.form.password.value;

    if (!username || !password) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    try {
      // TODO: Call login API
      console.log('Đăng nhập với:', {username, password});
      window.location.href = 'main.html';
    } catch (err) {
      alert('Có lỗi khi đăng nhập!');
      console.error(err);
    }
  }

  async handleGoogleLogin() {
    try {
      // Load Google SDK
      await this.loadGoogleSDK();

      // Initialize Google Sign In
      google.accounts.id.initialize({
        client_id: CONFIG.AUTH.GOOGLE_CLIENT_ID,
        callback: this.handleGoogleCallback.bind(this)
      });

      // Prompt Google Sign In
      google.accounts.id.prompt();

    } catch (err) {
      alert('Lỗi đăng nhập Google!');
      console.error(err);
    }
  }

  async handleGoogleLogin() {
    try {
      await this.loadGoogleSDK();
      google.accounts.id.initialize({
        client_id: CONFIG.AUTH.GOOGLE_CLIENT_ID,
        callback: this.handleGoogleCallback.bind(this)
      });
      google.accounts.id.prompt();
    } catch (err) {
      alert('Lỗi đăng nhập Google!');
      console.error(err);
    }
  }

  async handleGoogleCallback(response) {
    try {
      console.log('Google token:', response.credential);
      window.location.href = 'main.html';
    } catch (err) {
      alert('Lỗi xác thực Google!');
      console.error(err);
    }
  }

  // Hiển thị form quên mật khẩu
  showForgotPasswordForm() {
    this.form.style.display = 'none'; // Ẩn form đăng nhập
    this.forgotPasswordForm.style.display = 'block'; // Hiển thị form quên mật khẩu
  }

  // Ẩn form quên mật khẩu và quay lại form đăng nhập
  hideForgotPasswordForm() {
    this.forgotPasswordForm.style.display = 'none'; // Ẩn form quên mật khẩu
    this.form.style.display = 'block'; // Hiển thị lại form đăng nhập
  }

  // Xử lý yêu cầu khôi phục mật khẩu
  async handleForgotPassword() {
    const email = document.getElementById('email').value;

    if (!email) {
      alert('Vui lòng nhập địa chỉ email!');
      return;
    }

    try {
      // TODO: Call API để gửi yêu cầu khôi phục mật khẩu
      console.log('Gửi yêu cầu khôi phục mật khẩu cho email:', email);
      alert('Đã gửi yêu cầu khôi phục mật khẩu! Vui lòng kiểm tra email.');
      
      // Quay lại form đăng nhập sau khi gửi yêu cầu
      this.hideForgotPasswordForm();
    } catch (err) {
      alert('Có lỗi khi gửi yêu cầu khôi phục mật khẩu!');
      console.error(err);
    }
  }

  async loadGoogleSDK() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
}

// Khởi tạo form khi DOM đã tải xong
document.addEventListener('DOMContentLoaded', () => {
  new LoginForm();
});