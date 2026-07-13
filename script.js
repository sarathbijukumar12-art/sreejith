document.addEventListener('DOMContentLoaded', () => {
  
  /* ==========================================================================
     THEME TOGGLE SYSTEM
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Retrieve existing theme preference or fallback to system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
  } else {
    htmlElement.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light');
  }

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  /* ==========================================================================
     MOBILE DRAWER NAVIGATION
     ========================================================================== */
  const menuToggleBtn = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerLinks = document.querySelectorAll('.drawer-link');
  const menuOpenIcon = document.querySelector('.menu-open-icon');
  const menuCloseIcon = document.querySelector('.menu-close-icon');

  function toggleDrawer() {
    const isOpen = mobileDrawer.classList.toggle('open');
    if (isOpen) {
      menuOpenIcon.style.display = 'none';
      menuCloseIcon.style.display = 'block';
      document.body.style.overflow = 'hidden'; // Stop background scroll
    } else {
      menuOpenIcon.style.display = 'block';
      menuCloseIcon.style.display = 'none';
      document.body.style.overflow = ''; // Resume background scroll
    }
  }

  menuToggleBtn.addEventListener('click', toggleDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Close drawer upon clicking any link
      mobileDrawer.classList.remove('open');
      menuOpenIcon.style.display = 'block';
      menuCloseIcon.style.display = 'none';
      document.body.style.overflow = '';
    });
  });

  /* ==========================================================================
     INTERACTIVE CLINICAL EXPERIENCE TABS
     ========================================================================== */
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-content-panel');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetPanelId = button.getAttribute('data-tab');

      // Update button active state
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      // Update panel active state with entry animation
      tabPanels.forEach(panel => {
        panel.classList.remove('active');
      });
      
      const targetPanel = document.getElementById(targetPanelId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  /* ==========================================================================
     SCROLL REVEAL (INTERSECTION OBSERVER)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.scroll-reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Stop observing once revealed to maintain state
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ==========================================================================
     CONTACT FORM HANDLING (MOCK)
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const submitButton = contactForm.querySelector('.btn-submit');
  const submitBtnText = submitButton.querySelector('span');
  const submitBtnIcon = submitButton.querySelector('i');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Set loading state
    submitButton.disabled = true;
    submitBtnText.textContent = 'Sending Message...';
    if (submitBtnIcon) submitBtnIcon.style.opacity = '0.5';
    
    formFeedback.classList.add('hidden');
    formFeedback.className = 'form-feedback'; // Reset classes

    // Simulate API request timeout (1.5 seconds)
    setTimeout(() => {
      try {
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        
        // Mock successful validation/send
        formFeedback.textContent = `Thank you, ${name}! Your message has been sent successfully. I will get back to you shortly.`;
        formFeedback.classList.add('success');
        formFeedback.classList.remove('hidden');
        
        // Reset form
        contactForm.reset();
      } catch (err) {
        formFeedback.textContent = 'Oops! Something went wrong. Please try again directly via email.';
        formFeedback.classList.add('error');
        formFeedback.classList.remove('hidden');
      } finally {
        // Reset button state
        submitButton.disabled = false;
        submitBtnText.textContent = 'Send Message';
        if (submitBtnIcon) submitBtnIcon.style.opacity = '1';
      }
    }, 1500);
  });

  /* ==========================================================================
     NAVBAR DYNAMIC STICKY STATE
     ========================================================================== */
  const navbar = document.querySelector('.navbar');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.1)';
      navbar.style.padding = '0.75rem 0';
    } else {
      navbar.style.boxShadow = 'none';
      navbar.style.padding = '';
    }
    
    // Auto hide/show nav on mobile scroll down/up
    if (window.innerWidth <= 768) {
      if (window.scrollY > lastScrollY && window.scrollY > 150) {
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }
    }
    lastScrollY = window.scrollY;
  });

});
