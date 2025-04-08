class ModalManager {
    constructor() {
        this.init();
    }

    init() {
        // Setup click listeners for footer links
        document.querySelectorAll('[data-modal]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = `${link.dataset.modal}Modal`;
                this.openModal(modalId);
            });
        });

        // Setup close buttons
        document.querySelectorAll('.modal-close').forEach(button => {
            button.addEventListener('click', () => {
                const modal = button.closest('.modal-container');
                this.closeModal(modal.id);
            });
        });

        // Close modal when clicking outside
        document.querySelectorAll('.modal-container').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal.id);
                }
            });
        });

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const activeModal = document.querySelector('.modal-container.active');
                if (activeModal) {
                    this.closeModal(activeModal.id);
                }
            }
        });
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const modalManager = new ModalManager();
});
