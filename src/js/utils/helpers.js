function showLoading() {
    // Create loading overlay if it doesn't exist
    let loadingOverlay = document.querySelector('.loading-overlay');
    
    if (!loadingOverlay) {
      loadingOverlay = document.createElement('div');
      loadingOverlay.className = 'loading-overlay';
      loadingOverlay.innerHTML = `
        <div class="loading-spinner">
          <i class="fas fa-spinner fa-spin"></i>
          <span>Đang xử lý...</span>
        </div>
      `;
      document.body.appendChild(loadingOverlay);
      
      // Add necessary styles
      loadingOverlay.style.position = 'fixed';
      loadingOverlay.style.top = '0';
      loadingOverlay.style.left = '0';
      loadingOverlay.style.width = '100%';
      loadingOverlay.style.height = '100%';
      loadingOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      loadingOverlay.style.display = 'flex';
      loadingOverlay.style.justifyContent = 'center';
      loadingOverlay.style.alignItems = 'center';
      loadingOverlay.style.zIndex = '9999';
      loadingOverlay.style.color = 'white';
    }
    
    loadingOverlay.style.display = 'flex';
}

function hideLoading() {
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay) {
      loadingOverlay.style.display = 'none';
    }
}

function showLoadingInventory() {
    let loadingOverlay = document.getElementById('loadingOverlay');
    if (!loadingOverlay) {
        loadingOverlay = document.createElement('div');
        loadingOverlay.id = 'loadingOverlay';
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = `
            <div class="spinner"></div>
        `;
        
        // Add styles for loading overlay
        const loadingStyles = `
            .loading-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2000;
            }
            
            .spinner {
                width: 50px;
                height: 50px;
                border: 5px solid #f3f3f3;
                border-top: 5px solid var(--primary-color);
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        
        if (!document.getElementById('loadingStyles')) {
            const styleEl = document.createElement('style');
            styleEl.id = 'loadingStyles';
            styleEl.textContent = loadingStyles;
            document.head.appendChild(styleEl);
        }
        
        document.body.appendChild(loadingOverlay);
    }
    
    loadingOverlay.style.display = 'flex';
}

function hideLoadingInventory() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = 'none';
    }
}
