document.addEventListener('DOMContentLoaded', function() {
  // Tab switching functionality
  setupTabs();
  
  // Password visibility toggle
  setupPasswordToggles();
  
  // Form submissions
  setupFormSubmissions();
});

// Setup tab switching
function setupTabs() {
  const tabs = document.querySelectorAll('.auth-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs and forms
      document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
      
      // Add active class to clicked tab and corresponding form
      this.classList.add('active');
      const tabName = this.getAttribute('data-tab');
      document.getElementById(tabName).classList.add('active');
    });
  });
}

// Setup password visibility toggles
function setupPasswordToggles() {
  const toggles = document.querySelectorAll('.toggle-password');
  toggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const input = this.parentElement.querySelector('input');
      const type = input.getAttribute('type');
      input.setAttribute('type', type === 'password' ? 'text' : 'password');
      
      // Toggle eye/eye-slash icon
      const icon = this.querySelector('i');
      icon.classList.toggle('fa-eye');
      icon.classList.toggle('fa-eye-slash');
    });
  });
}

// Setup form submissions
function setupFormSubmissions() {
  // Login form submission
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const remember = document.getElementById('remember').checked;
      
      // Call to your backend API
      login(username, password, remember);
    });
  }
  
  // Register form submission
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const fullname = document.getElementById('fullname').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('new-password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
      
      if (password !== confirmPassword) {
        showError('Mật khẩu xác nhận không khớp');
        return;
      }
      
      // Call to your backend API
      register(fullname, email, password);
    });
  }
}

// Login API call
function login(username, password, remember) {
  // Replace with your actual API endpoint
  fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // Save auth token in cookie
      const days = remember ? 30 : 1;
      setCookie('auth_token', data.token, days);
      setCookie('user_name', data.user.name, days);
      setCookie('user_email', data.user.email, days);
      
      // Redirect to dashboard
      window.location.href = '/dashboard.html';
    } else {
      showError(data.message || 'Đăng nhập thất bại. Vui lòng kiểm tra thông tin đăng nhập.');
    }
  })
  .catch(error => {
    console.error('Error during login:', error);
    showError('Lỗi kết nối đến máy chủ. Vui lòng thử lại sau.');
  });
}

// Register API call
function register(fullname, email, password) {
  // Replace with your actual API endpoint
  fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fullname: fullname,
      email: email,
      password: password
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // Show success message
      showSuccess('Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.');
      
      // Switch to login tab
      document.querySelector('[data-tab="login"]').click();
      
      // Pre-fill username field with email
      document.getElementById('username').value = email;
    } else {
      showError(data.message || 'Đăng ký thất bại. Vui lòng thử lại.');
    }
  })
  .catch(error => {
    console.error('Error during registration:', error);
    showError('Lỗi kết nối đến máy chủ. Vui lòng thử lại sau.');
  });
}

// Cookie functions
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  const cookieName = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return "";
}

function deleteCookie(name) {
  document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
}

// Helper functions for UI feedback
function showError(message) {
  // Create error element if it doesn't exist
  let errorElement = document.querySelector('.auth-error');
  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.className = 'auth-error';
    const activeForm = document.querySelector('.auth-form.active');
    activeForm.insertBefore(errorElement, activeForm.firstChild);
  }
  
  errorElement.textContent = message;
  errorElement.style.display = 'block';
  
  // Hide after 5 seconds
  setTimeout(() => {
    errorElement.style.display = 'none';
  }, 5000);
}

function showSuccess(message) {
  // Create success element if it doesn't exist
  let successElement = document.querySelector('.auth-success');
  if (!successElement) {
    successElement = document.createElement('div');
    successElement.className = 'auth-success';
    const activeForm = document.querySelector('.auth-form.active');
    activeForm.insertBefore(successElement, activeForm.firstChild);
  }
  
  successElement.textContent = message;
  successElement.style.display = 'block';
  
  // Hide after 5 seconds
  setTimeout(() => {
    successElement.style.display = 'none';
  }, 5000);
}