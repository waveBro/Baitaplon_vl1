document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    // Handle tab switching
    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');
        
        // Update active tab
        tabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        // Show active form
        forms.forEach(form => {
          form.classList.remove('active');
          if (form.id === tabId) {
            form.classList.add('active');
          }
        });
      });
    });
    
    // Toggle password visibility
    togglePasswordButtons.forEach(button => {
      button.addEventListener('click', function() {
        const passwordInput = this.parentElement.querySelector('input');
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
    
    // Login form validation 
    if (loginForm) {
      loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        clearErrors();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        
        // Enhanced validation
        if (!username || !password) {
          showError('username', 'Vui lòng nhập đầy đủ thông tin');
          return;
        }
  
        try {
          // Show loading using helper
          showLoading();
          
          // Simulate API login
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Store login state
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('username', username);
          
          // Redirect to main page
          window.location.href = '../pages/main.html';
          
        } catch (error) {
          showError('username', 'Có lỗi xảy ra khi đăng nhập');
        } finally {
          hideLoading();
        }
      });
    }
    
    // Register form validation with improved error handling
    if (registerForm) {
      registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        clearErrors();
        
        // Get form values
        const fullname = document.getElementById('fullname').value.trim();
        const email = document.getElementById('email').value.trim();
        const newPassword = document.getElementById('new-password').value.trim();
        const confirmPassword = document.getElementById('confirm-password').value.trim();
        
        // Basic validation
        if (!fullname) {
          showError('fullname', 'Vui lòng nhập họ và tên');
          return;
        }
        
        if (!email) {
          showError('email', 'Vui lòng nhập email');
          return;
        } else if (!isValidEmail(email)) {
          showError('email', 'Email không hợp lệ');
          return;
        }
        
        if (!newPassword) {
          showError('new-password', 'Vui lòng nhập mật khẩu');
          return;
        } else if (newPassword.length < 8) {
          showError('new-password', 'Mật khẩu phải có ít nhất 8 ký tự');
          return;
        }
        
        if (newPassword !== confirmPassword) {
          showError('confirm-password', 'Mật khẩu xác nhận không khớp');
          return;
        }
  
        try {
          showLoading();
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const message = document.createElement('div');
          message.className = 'success-message';
          message.textContent = 'Đăng ký thành công! Bạn có thể đăng nhập ngay.';
          registerForm.prepend(message);
          
          registerForm.reset();
          setTimeout(() => {
            document.querySelector('[data-tab="login"]').click();
            message.remove();
          }, 2000);
          
        } catch (error) {
          showError('email', 'Có lỗi xảy ra khi đăng ký');  
        } finally {
          hideLoading();
        }
      });
    }
    
    // Helper functions
    function showError(fieldId, message) {
      const errorElement = document.getElementById(`${fieldId}-error`) || 
                           document.createElement('span');
      
      if (!errorElement.id) {
        errorElement.id = `${fieldId}-error`;
        errorElement.className = 'error-message';
        document.getElementById(fieldId).parentElement.after(errorElement);
      }
      
      errorElement.textContent = message;
      document.getElementById(fieldId).setAttribute('aria-invalid', 'true');
    }
    
    function clearErrors() {
      const errorMessages = document.querySelectorAll('.error-message');
      errorMessages.forEach(error => {
        error.textContent = '';
      });
      
      const inputs = document.querySelectorAll('input');
      inputs.forEach(input => {
        input.setAttribute('aria-invalid', 'false');
      });
    }
    
    function isValidEmail(email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    }
    
    // Theme toggle functionality (if present in your design)
    const toggleTheme = document.querySelector('.toggle-theme');
    if (toggleTheme) {
      toggleTheme.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
      });
    }
    
    // Set theme from local storage on page load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }

    // Add Google OAuth configuration
    const googleConfig = {
      client_id: '698773466958-s0aa126m3nbb0165d6qlego15pkhedcj.apps.googleusercontent.com',
      scope: 'email profile',
      redirect_uri: 'http://127.0.0.1:8000/main.html'
    };

    // Initialize Google Sign-In
    function initGoogleSignIn() {
      gapi.load('auth2', function() {
        gapi.auth2.init(googleConfig).then(
          function(auth2) {
            attachSignin(document.getElementById('googleSignIn'));
          },
          function(error) {
            console.error('Google Sign-In error:', error);
          }
        );
      });
    }

    // Attach click handler to Google Sign-In button
    function attachSignin(element) {
      const auth2 = gapi.auth2.getAuthInstance();
      element.addEventListener('click', function() {
        showLoading();
        auth2.signIn().then(
          function(googleUser) {
            const profile = googleUser.getBasicProfile();
            // Store user info
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', profile.getName());
            localStorage.setItem('email', profile.getEmail());
            localStorage.setItem('avatar', profile.getImageUrl());
            
            // Redirect to main page
            window.location.href = '../pages/main.html';
          },
          function(error) {
            hideLoading();
            showError('login', 'Đăng nhập Google thất bại');
          }
        );
      });
    }

    // Load Google Platform Library
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.onload = initGoogleSignIn;
    document.head.appendChild(script);
  });
  
  // Theme improvements
  function toggleTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update icons
    const icon = document.querySelector('.toggle-theme i');
    if (icon) {
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }
  
  // Initialize theme
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
  toggleTheme(savedTheme);