document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileMenuBtn && mainNav) {
      mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
      });
    }
    
    // Section navigation and active state
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Close mobile menu after click
        if (mainNav.classList.contains('active')) {
          mainNav.classList.remove('active');
        }
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Update active navigation on scroll
    window.addEventListener('scroll', function() {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
          link.setAttribute('aria-current', 'page');
        }
      });
    });
});