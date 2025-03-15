console.log("Auth module loaded.");
import { showLoading, hideLoading } from '../utils/helpers.js';

const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_USER_KEY = 'auth_user';

class AuthService {
    static init() {
        gapi.load('auth2', () => {
            gapi.auth2.init({
                client_id: '698773466958-s0aa126m3nbb0165d6qlego15pkhedcj.apps.googleusercontent.com'
            }).then(auth2 => {
                const googleBtn = document.querySelector('.btn-google');
                if (googleBtn) {
                    googleBtn.addEventListener('click', () => this.handleGoogleSignIn(auth2));
                }
            });
        });
    }

    static async handleGoogleSignIn(auth2) {
        try {
            const googleUser = await auth2.signIn();
            const token = googleUser.getAuthResponse().id_token;
            const profile = googleUser.getBasicProfile();
            
            const user = {
                id: profile.getId(),
                email: profile.getEmail(),
                name: profile.getName(),
                avatar: profile.getImageUrl()
            };

            this.setToken(token);
            this.setUser(user);

            // Redirect to dashboard after successful login
            window.location.href = '/dashboard';
        } catch (error) {
            console.error('Google Sign-in Error:', error);
            alert('Đăng nhập thất bại. Vui lòng thử lại.');
        }
    }

    static setToken(token) {
        localStorage.setItem(AUTH_TOKEN_KEY, token);
    }

    static getToken() {
        return localStorage.getItem(AUTH_TOKEN_KEY);
    }

    static setUser(user) {
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    }

    static getUser() {
        const user = localStorage.getItem(AUTH_USER_KEY);
        return user ? JSON.parse(user) : null;
    }

    static logout() {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(AUTH_USER_KEY);
        window.location.href = '/login';
    }

    static isAuthenticated() {
        return !!this.getToken();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Tab switching on authentication page
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    
    if (authTabs.length > 0) {
      authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
                    console.log('Authentication tab clicked');
                    // Remove active class from all tabs and forms
                    authTabs.forEach(t => t.classList.remove('active'));
                    authForms.forEach(f => f.classList.remove('active'));
                    
                    // Add active class to clicked tab and corresponding form
                    this.classList.add('active');
                    const formId = this.getAttribute('data-tab');
                    console.log('Form ID:', formId);
                    document.getElementById(formId).classList.add('active');
                  });
      });
      
      // Toggle password visibility
      const togglePasswordBtns = document.querySelectorAll('.toggle-password');
      togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          const passwordInput = this.previousElementSibling;
          const icon = this.querySelector('i');
          
          if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
          } else {
            passwordInput.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
          }
        });
      });
      
      // Form submission handlers
      const loginForm = document.getElementById('loginForm');
      if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Get form values
          const username = document.getElementById('username').value;
          const password = document.getElementById('password').value;
          const remember = document.getElementById('remember').checked;
          
          // Simple validation
          if (!username || !password) {
            alert('Vui lòng nhập đầy đủ thông tin đăng nhập.');
            return;
          }
          
          // Simulate login API call
          simulateLogin(username, password, remember);
        });
      }
      
      const registerForm = document.getElementById('registerForm');
      if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Get form values
          const fullname = document.getElementById('fullname').value;
          const email = document.getElementById('email').value;
          const password = document.getElementById('new-password').value;
          const confirmPassword = document.getElementById('confirm-password').value;
          
          // Simple validation
          if (!fullname || !email || !password || !confirmPassword) {
            alert('Vui lòng nhập đầy đủ thông tin đăng ký.');
            return;
          }
          
          if (password !== confirmPassword) {
            alert('Mật khẩu xác nhận không khớp.');
            return;
          }
          
          // Email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            alert('Email không hợp lệ.');
          return;
          }
          
          // Simulate register API call
          simulateRegister(fullname, email, password);
        });
      }
    }
    
    function simulateLogin(username, password, remember) {
      // Simulate API call delay
      showLoading();
      
      setTimeout(() => {
        // For demo purposes, accept any login
        window.location.href = 'main.html';
        hideLoading();
      }, 1500);
    }
    
    function simulateRegister(fullname, email, password) {
      // Simulate API call delay
      showLoading();
      
      setTimeout(() => {
        // Show success message
        alert('Đăng ký thành công! Vui lòng đăng nhập.');
        
        // Switch to login tab
        document.querySelector('[data-tab="login"]').click();
        
        // Pre-fill email in login form if available
        const usernameInput = document.getElementById('username');
        if (usernameInput) {
          usernameInput.value = email;
        }
        
        hideLoading();
      }, 1500);
    }

    // Initialize Google Sign-in
    AuthService.init();
});
