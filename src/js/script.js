document.addEventListener('DOMContentLoaded', () => {
  const profileButton = document.getElementById('profileButton');
  const profileDropdown = document.getElementById('profileDropdown');

  if (profileButton && profileDropdown) {
    profileButton.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent the click from closing the dropdown immediately
      profileDropdown.classList.toggle('show');
    });

    // Close the dropdown when clicking outside
    document.addEventListener('click', (event) => {
      if (!profileDropdown.contains(event.target) && profileDropdown.classList.contains('show')) {
        profileDropdown.classList.remove('show');
      }
    });
  }
});