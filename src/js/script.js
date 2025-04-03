document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mainNav.classList.toggle('active');
    });

    document.addEventListener('click', (event) => {
      if (!mainNav.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
        mainNav.classList.remove('active');
      }
    });
  }
});