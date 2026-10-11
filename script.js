/**
 * NovaCare Health System - Interactive Script
 * Handles Theme Toggle, Navigation, Booking Modal, and Portal Interactions
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Toggle Management
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const currentTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (themeIcon) {
        themeIcon.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>`;
      }
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (themeIcon) {
        themeIcon.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>`;
      }
    }
    localStorage.setItem('theme', theme);
  }

  applyTheme(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      applyTheme(isDark ? 'light' : 'dark');
      showToast(`Switched to ${isDark ? 'Light' : 'Dark'} mode`);
    });
  }

  // 2. Mobile Navigation Menu

  }

  // 3. Appointment Modal Controls
  const appointmentModal = document.getElementById('appointmentModal');
  const openModalBtns = document.querySelectorAll('[data-open-modal="appointment"]');
  const closeModalBtns = document.querySelectorAll('[data-close-modal]');
  const appointmentForm = document.getElementById('appointmentForm');

  function openModal() {
    if (appointmentModal) {
      appointmentModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      const firstInput = appointmentModal.querySelector('input, select');
      if (firstInput) firstInput.focus();
    }
  }

  function closeModal() {
    if (appointmentModal) {
      appointmentModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  openModalBtns.forEach(btn => btn.addEventListener('click', openModal));
  closeModalBtns.forEach(btn => btn.addEventListener('click', closeModal));

  // Close modal when clicking on backdrop
  if (appointmentModal) {
    appointmentModal.addEventListener('click', (e) => {
      if (e.target === appointmentModal) closeModal();
    });
  }

  // Escape key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && appointmentModal && appointmentModal.classList.contains('active')) {
      closeModal();
    }
  });

  // Handle appointment form submission
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const patientName = document.getElementById('patientName')?.value || 'Patient';
      const department = document.getElementById('departmentSelect')?.value || 'Department';
      closeModal();
      showToast(`Appointment scheduled for ${patientName} (${department})!`);
      appointmentForm.reset();
    });
  }

  // 4. Portal Access Buttons Simulation
  const portalBtns = document.querySelectorAll('[data-portal-role]');
  portalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const role = btn.getAttribute('data-portal-role');
      showToast(`Accessing ${role} Portal authentication...`);
    });
  });

  // 5. Toast Notification System
  const toast = document.getElementById('toastNotice');
  let toastTimeout;

  function showToast(message) {
    if (!toast) return;
    const toastText = toast.querySelector('.toast-text');
    if (toastText) toastText.textContent = message;
    
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  // 6. Active Nav Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});
