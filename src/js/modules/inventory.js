import { showLoadingInventory, hideLoadingInventory } from '../utils/helpers.js';

document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.querySelector('.search-container input');
    const searchButton = document.querySelector('.btn-search');
    const tableRows = document.querySelectorAll('.data-table tbody tr');
    
    if (searchInput && searchButton) {
      const performSearch = function() {
        const searchTerm = searchInput.value.toLowerCase();
        
        tableRows.forEach(row => {
          const text = row.textContent.toLowerCase();
          if (text.includes(searchTerm)) {
            row.style.display = '';
          } else {
            row.style.display = 'none';
          }
        });
      };
      
      searchButton.addEventListener('click', performSearch);
      searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          performSearch();
        }
      });
    }
    
    // Add new product button
    const addProductBtn = document.querySelector('.btn-primary');
    if (addProductBtn) {
      addProductBtn.addEventListener('click', function() {
        showProductModal();
      });
    }
    
    // Action buttons in the table
    const actionButtons = document.querySelectorAll('.data-table .actions button');
    actionButtons.forEach(button => {
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
    
    function showProductModal(product = null) {
        // Create modal if it doesn't exist
        let modal = document.getElementById('productModal');
        
        if (!modal) {
          modal = document.createElement('div');
          modal.id = 'productModal';
          modal.className = 'modal';
          modal.innerHTML = `
            <div class="modal-content">
              <div class="modal-header">
                <h3>${product ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</h3>
                <button class="close-modal">&times;</button>
              </div>
              <div class="modal-body">
                <form id="productForm">
                  <div class="form-group">
                    <label for="productId">Mã sản phẩm</label>
                    <input type="text" id="productId" ${product ? 'readonly' : ''} value="${product ? product.id : ''}">
                  </div>
                  <div class="form-group">
                    <label for="productName">Tên sản phẩm</label>
                    <input type="text" id="productName" value="${product ? product.name : ''}">
                  </div>
                  <div class="form-group">
                    <label for="productCategory">Danh mục</label>
                    <select id="productCategory">
                      <option value="">-- Chọn danh mục --</option>
                      <option value="1" ${product && product.category === 'Điện tử' ? 'selected' : ''}>Điện tử</option>
                      <option value="2" ${product && product.category === 'Gia dụng' ? 'selected' : ''}>Gia dụng</option>
                      <option value="3" ${product && product.category === 'Thời trang' ? 'selected' : ''}>Thời trang</option>
                      <option value="4" ${product && product.category === 'Thực phẩm' ? 'selected' : ''}>Thực phẩm</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="productStock">Số lượng tồn kho</label>
                    <input type="number" id="productStock" value="${product ? product.stock : 0}" min="0">
                  </div>
                  <div class="form-group">
                    <label for="productPrice">Đơn giá</label>
                    <div class="input-icon">
                      <input type="number" id="productPrice" value="${product ? product.price : 0}" min="0" step="1000">
                      <span class="input-suffix">₫</span>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="productDescription">Mô tả</label>
                    <textarea id="productDescription" rows="3">${product ? product.description : ''}</textarea>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button class="btn-secondary" id="cancelProduct">Hủy</button>
                <button class="btn-primary" id="saveProduct">${product ? 'Cập nhật' : 'Thêm'}</button>
              </div>
            </div>
          `;
          document.body.appendChild(modal);
          
          // Add event listeners to modal buttons
          const closeBtn = modal.querySelector('.close-modal');
          const cancelBtn = modal.querySelector('#cancelProduct');
          const saveBtn = modal.querySelector('#saveProduct');
          
          closeBtn.addEventListener('click', closeModal);
          cancelBtn.addEventListener('click', closeModal);
          
          saveBtn.addEventListener('click', function() {
            saveProduct(product);
          });
          
          // Add modal styles if not already in CSS
          const modalStyles = `
            .modal {
              display: none;
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, 0.5);
              z-index: 1000;
              justify-content: center;
              align-items: center;
            }
            
            .modal-content {
              background-color: white;
              width: 100%;
              max-width: 500px;
              border-radius: var(--border-radius);
              box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
              animation: slideIn 0.3s ease;
            }
            
            .modal-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 1rem 1.5rem;
              border-bottom: 1px solid var(--border-color);
            }
            
            .modal-header h3 {
              margin: 0;
            }
            
            .close-modal {
              background: none;
              border: none;
              font-size: 1.5rem;
              cursor: pointer;
              color: var(--text-lighter);
            }
            
            .modal-body {
              padding: 1.5rem;
              max-height: calc(100vh - 200px);
              overflow-y: auto;
            }
            
            .modal-footer {
              padding: 1rem 1.5rem;
              border-top: 1px solid var(--border-color);
              display: flex;
              justify-content: flex-end;
              gap: 1rem;
            }
            
            .input-suffix {
              position: absolute;
              right: 1rem;
              top: 50%;
              transform: translateY(-50%);
              color: var(--text-lighter);
            }
            
            @keyframes slideIn {
              from {
                transform: translateY(-50px);
                opacity: 0;
              }
              to {
                transform: translateY(0);
              opacity: 1;
            }
          }
          `;
          
          // Add styles to head if not already exists
          if (!document.getElementById('modalStyles')) {
            const styleEl = document.createElement('style');
            styleEl.id = 'modalStyles';
            styleEl.textContent = modalStyles;
            document.head.appendChild(styleEl);
          }
        } else {
          // Update modal title if it already exists
          const modalTitle = modal.querySelector('.modal-header h3');
          if (modalTitle) {
            modalTitle.textContent = product ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới';
          }
          
          // Update form values if product is provided
          if (product) {
            modal.querySelector('#productId').value = product.id;
            modal.querySelector('#productId').readOnly = true;
            modal.querySelector('#productName').value = product.name;
            
            const categorySelect = modal.querySelector('#productCategory');
            for (let i = 0; i < categorySelect.options.length; i++) {
              if (categorySelect.options[i].text === product.category) {
                categorySelect.selectedIndex = i;
                break;
              }
            }
            
            modal.querySelector('#productStock').value = product.stock;
            modal.querySelector('#productPrice').value = product.price;
            modal.querySelector('#productDescription').value = product.description || '';
            
            // Update button text
            modal.querySelector('#saveProduct').textContent = 'Cập nhật';
          } else {
            // Reset form for new product
            modal.querySelector('#productForm').reset();
            modal.querySelector('#productId').readOnly = false;
            
            // Update button text
            modal.querySelector('#saveProduct').textContent = 'Thêm';
          }
        }
        
        // Show modal
        modal.style.display = 'flex';
        
        // Focus on first input
        setTimeout(() => {
          const firstInput = modal.querySelector('input:not([readonly])');
          if (firstInput) {
            firstInput.focus();
          }
        }, 100);
      }
      
      function closeModal() {
        const modal = document.getElementById('productModal');
        if (modal) {
          modal.style.display = 'none';
        }
      }
      
      function saveProduct(product) {
        try {
          // Get form values
          const productId = document.getElementById('productId').value;
          const productName = document.getElementById('productName').value;
          const categorySelect = document.getElementById('productCategory');
          const category = categorySelect.options[categorySelect.selectedIndex]?.text;
          const stock = document.getElementById('productStock').value;
          const price = document.getElementById('productPrice').value;
          const description = document.getElementById('productDescription').value;
          
          // Simple validation
          if (!productId || !productName || !category || stock === '' || price === '') {
            alert('Vui lòng nhập đầy đủ thông tin sản phẩm.');
            return;
          }
          
          // Show loading indicator
          showLoadingInventory();
          
          // Simulate API call
          setTimeout(() => {
            hideLoadingInventory();
            
            if (product) {
              // Update existing product in table
              alert(`Đã cập nhật sản phẩm: ${productName}`);
            } else {
              // Add new product to table
              const tableBody = document.querySelector('.data-table tbody');
              
              if (tableBody) {
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                  <td>${productId}</td>
                  <td>${productName}</td>
                  <td>${category}</td>
                  <td>${stock}</td>
                  <td>${parseInt(price).toLocaleString()}₫</td>
                  <td class="actions">
                    <button class="btn-icon" aria-label="Xem"><i class="fas fa-eye"></i></button>
                    <button class="btn-icon" aria-label="Sửa"><i class="fas fa-edit"></i></button>
                    <button class="btn-icon danger" aria-label="Xóa"><i class="fas fa-trash"></i></button>
                  </td>
                `;
                
                // Add event listeners to new row buttons
                const actionButtons = newRow.querySelectorAll('.actions button');
                actionButtons.forEach(button => {
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
                
                tableBody.appendChild(newRow);
                alert(`Đã thêm sản phẩm mới: ${productName}`);
              }
            }
            
            // Close modal
            closeModal();
          }, 1000);
        } catch (error) {
          console.error('Lỗi khi lưu sản phẩm:', error);
          alert('Có lỗi xảy ra khi lưu sản phẩm');
          hideLoadingInventory();
        }
      }
      
      function showProductDetails(productId) {
        try {
          // For demo purposes, we'll create a simulated product object
          const product = {
            id: productId,
            name: 'Sản phẩm mẫu ' + productId.substr(-1),
            category: productId === 'SP001' ? 'Điện tử' : 'Gia dụng',
            stock: productId === 'SP001' ? 150 : 85,
            price: productId === 'SP001' ? 1500000 : 750000,
            description: 'Mô tả chi tiết cho sản phẩm ' + productId,
            createdDate: '15/02/2023',
            lastUpdated: '10/03/2023'
          };
          
          // Create modal for product details
          let modal = document.getElementById('productDetailsModal');
          
          if (!modal) {
            modal = document.createElement('div');
            modal.id = 'productDetailsModal';
            modal.className = 'modal';
            modal.innerHTML = `
              <div class="modal-content">
                <div class="modal-header">
                  <h3>Chi tiết sản phẩm</h3>
                  <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                  <div class="product-details">
                    <div class="detail-item">
                      <strong>Mã sản phẩm:</strong>
                      <span>${product.id}</span>
                    </div>
                    <div class="detail-item">
                      <strong>Tên sản phẩm:</strong>
                      <span>${product.name}</span>
                    </div>
                    <div class="detail-item">
                      <strong>Danh mục:</strong>
                      <span>${product.category}</span>
                    </div>
                    <div class="detail-item">
                      <strong>Số lượng tồn kho:</strong>
                      <span>${product.stock}</span>
                    </div>
                    <div class="detail-item">
                      <strong>Đơn giá:</strong>
                      <span>${product.price.toLocaleString()}₫</span>
                    </div>
                    <div class="detail-item">
                      <strong>Mô tả:</strong>
                      <p>${product.description}</p>
                    </div>
                    <div class="detail-item">
                      <strong>Ngày tạo:</strong>
                      <span>${product.createdDate}</span>
                    </div>
                    <div class="detail-item">
                      <strong>Cập nhật lần cuối:</strong>
                      <span>${product.lastUpdated}</span>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button class="btn-secondary close-details">Đóng</button>
                  <button class="btn-primary" onclick="editProduct('${product.id}')">Chỉnh sửa</button>
                </div>
              </div>
            `;
            document.body.appendChild(modal);
            
            // Add event listeners
            const closeButtons = modal.querySelectorAll('.close-modal, .close-details');
            closeButtons.forEach(btn => {
              btn.addEventListener('click', function() {
                modal.style.display = 'none';
              });
            });
            
            // Add styles for product details
            const detailStyles = `
              .product-details {
                display: grid;
                gap: 1rem;
              }
              
              .detail-item {
                display: grid;
                grid-template-columns: 150px 1fr;
                gap: 1rem;
              }
              
              @media (max-width: 576px) {
                .detail-item {
                  grid-template-columns: 1fr;
                  gap: 0.25rem;
                }
              }
            `;
            
            // Add styles to head if not already exists
            if (!document.getElementById('detailStyles')) {
              const styleEl = document.createElement('style');
              styleEl.id = 'detailStyles';
              styleEl.textContent = detailStyles;
              document.head.appendChild(styleEl);
            }
          } else {
            // Update modal content with current product
            const detailItems = modal.querySelectorAll('.detail-item span, .detail-item p');
            if (detailItems.length >= 8) {
              detailItems[0].textContent = product.id;
              detailItems[1].textContent = product.name;
              detailItems[2].textContent = product.category;
              detailItems[3].textContent = product.stock;
              detailItems[4].textContent = product.price.toLocaleString() + '₫';
              detailItems[5].textContent = product.description;
              detailItems[6].textContent = product.createdDate;
              detailItems[7].textContent = product.lastUpdated;
            } else {
              console.error('Missing detail items in modal');
            }
            
            // Update the edit button event handler
            const editButton = modal.querySelector('.btn-primary');
            editButton.onclick = function() {
              editProduct(product.id);
              modal.style.display = 'none';
            };
          }
          
          // Show the modal
          modal.style.display = 'flex';
        } catch (error) {
          console.error('Lỗi khi hiển thị chi tiết sản phẩm:', error);
          alert('Có lỗi xảy ra khi hiển thị chi tiết sản phẩm');
        }
      }
      
      function editProduct(productId) {
        // Get product details - in a real app, this would fetch from API
        const product = {
          id: productId,
          name: 'Sản phẩm mẫu ' + productId.substr(-1),
          category: productId === 'SP001' ? 'Điện tử' : 'Gia dụng',
          stock: productId === 'SP001' ? 150 : 85,
          price: productId === 'SP001' ? 1500000 : 750000,
          description: 'Mô tả chi tiết cho sản phẩm ' + productId
        };
        
        // Show edit modal with product data
        showProductModal(product);
      }
      
      function confirmDeleteProduct(productId, productName) {
        if (confirm(`Bạn có chắc muốn xóa sản phẩm "${productName}" không?`)) {
          showLoadingInventory();
          
          setTimeout(() => {
            try {
              hideLoading();
              const row = document.querySelector(`.data-table tbody tr td[data-id="${productId}"]`).parentElement;
              if (row) {
                row.remove();
                alert(`Đã xóa sản phẩm: ${productName}`);
              }
            } catch (error) {
              console.error('Lỗi khi xóa sản phẩm:', error);
              alert('Có lỗi xảy ra khi xóa sản phẩm');
            }
          }, 1000);
        }
      }
});