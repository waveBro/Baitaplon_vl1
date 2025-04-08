import './modules/navigation.js';
import './modules/dashboard.js';
import './core/auth.js';
import './modules/inventory.js';

document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileMenuBtn && mainNav) {
      mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
      });
    }
    
    // Add event listeners for authentication tabs
    const authTabs = document.querySelectorAll('.auth-tab');
    if (authTabs.length > 0) {
      authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
          const tabId = this.getAttribute('data-tab');
          
          // Hide all forms
          document.querySelectorAll('.auth-form').forEach(form => {
            form.classList.remove('active');
          });
          
          // Remove active class from all tabs
          document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.classList.remove('active');
          });
          
          // Show selected form
          document.getElementById(tabId).classList.add('active');
          
          // Set active class on clicked tab
          this.classList.add('active');
        });
      });
      
      // Toggle password visibility
      const toggleBtns = document.querySelectorAll('.toggle-password');
      toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          const input = this.previousElementSibling;
          const icon = this.querySelector('i');
          
          if (input.type === 'password') {
            input.type = 'text';
            icon.className = 'fas fa-eye-slash';
          } else {
            input.type = 'password';
            icon.className = 'fas fa-eye';
          }
        });
      });
    }
    
    // Setup product management buttons
    const addProductBtn = document.querySelector('#inventory .btn-primary');
    if (addProductBtn) {
      addProductBtn.addEventListener('click', function() {
        showProductModal();
      });
    }
    
    // Setup edit and delete buttons for existing products
    const productActionButtons = document.querySelectorAll('.data-table .actions button');
    if (productActionButtons.length > 0) {
      productActionButtons.forEach(button => {
        button.addEventListener('click', function() {
          const action = this.getAttribute('aria-label');
          const row = this.closest('tr');
          const productId = row.querySelector('td:first-child').textContent;
          const productName = row.querySelector('td:nth-child(2)').textContent;
          
          if (action === 'Xem') {
            showProductDetails(productId);
          } else if (action === 'Sửa') {
            editProduct(productId);
          } else if (action === 'Xóa') {
            confirmDeleteProduct(productId, productName);
          }
        });
      });
    }
    
    // Setup refresh button
    const refreshBtn = document.querySelector('.btn-refresh');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', function() {
        this.querySelector('i').classList.add('fa-spin');
        
        setTimeout(() => {
          this.querySelector('i').classList.remove('fa-spin');
          alert('Dữ liệu đã được làm mới!');
        }, 1000);
      });
    }
    
    // Simulated chart for the dashboard (can be expanded with Chart.js or similar)
    const setupDashboardCharts = () => {
      // Implementation can be added later with a charting library
      console.log('Dashboard charts initialized');
    };
    
    // Call dashboard chart setup if on dashboard page
    setupDashboardCharts();
    
    // Set up form submissions
    const setupFormSubmissions = () => {
      // Login form
      const loginForm = document.getElementById('loginForm');
      if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
          e.preventDefault();
          window.location.href = 'main.html';
        });
      }
      
      // Register form
      const registerForm = document.getElementById('registerForm');
      if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
          e.preventDefault();
          alert('Đăng ký thành công! Vui lòng đăng nhập.');
          
          // Switch to login tab
          document.querySelector('[data-tab="login"]').click();
        });
      }
    };
    
    // Call form submission setup
    setupFormSubmissions();
});
