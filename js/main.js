document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const hamburgerIcon = document.getElementById('hamburgerIcon');
  const closeIcon = document.getElementById('closeIcon');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      hamburgerIcon.classList.toggle('hidden');
      closeIcon.classList.toggle('hidden');
    });
  }

  // 2. Booking Modal
  const bookingModal = document.getElementById('bookingModal');
  const openModalBtn = document.getElementById('openModalBtn');
  const openModalMobileBtn = document.getElementById('openModalMobileBtn');
  const heroBookingBtn = document.getElementById('heroBookingBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const pricingButtons = document.querySelectorAll('.pricing-book-btn');
  const modalPlanSelect = document.getElementById('modalPlanSelect');

  const openBookingModal = () => {
    if (!bookingModal) return;
    bookingModal.classList.remove('hidden');
    bookingModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  };

  const closeBookingModal = () => {
    if (!bookingModal) return;
    bookingModal.classList.add('hidden');
    bookingModal.classList.remove('flex');
    document.body.style.overflow = '';
  };

  [openModalBtn, openModalMobileBtn, heroBookingBtn].forEach(btn => {
    if (btn) btn.addEventListener('click', openBookingModal);
  });

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeBookingModal);

  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) closeBookingModal();
    });
  }

  // Set plan in modal from pricing cards
  pricingButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      openBookingModal();
      const planTitle = e.target.closest('div')?.querySelector('h4')?.textContent.trim();
      if (modalPlanSelect && planTitle) {
        for (let option of modalPlanSelect.options) {
          if (option.text.includes(planTitle)) {
            modalPlanSelect.value = option.value;
            break;
          }
        }
      }
    });
  });

  // Booking Form submit
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you! Your pass is confirmed. We will reach out shortly.');
      bookingForm.reset();
      closeBookingModal();
    });
  }

  // 3. Opt-in Form (index.html)
  const optInForm = document.getElementById('optInForm');
  const optInMessage = document.getElementById('optInMessage');

  if (optInForm) {
    optInForm.addEventListener('submit', (e) => {
      e.preventDefault();
      optInForm.reset();
      optInMessage.classList.remove('hidden');
      setTimeout(() => {
        optInMessage.classList.add('hidden');
      }, 4000);
    });
  }

  // 4. Gallery Category Filtering
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-orange-500', 'text-white', 'shadow-md', 'shadow-orange-500/20');
        b.classList.add('bg-neutral-900', 'text-neutral-400', 'border', 'border-neutral-800');
      });

      btn.classList.add('bg-orange-500', 'text-white', 'shadow-md', 'shadow-orange-500/20');
      btn.classList.remove('bg-neutral-900', 'text-neutral-400', 'border', 'border-neutral-800');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filter === 'all' || itemCategory === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // 5. Lightbox Modal
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeLightboxBtn = document.getElementById('closeLightboxBtn');

  const closeLightbox = () => {
    if (!lightboxModal) return;
    lightboxModal.classList.add('hidden');
    lightboxModal.classList.remove('flex');
    document.body.style.overflow = '';
  };

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('h4')?.textContent || '';

      if (img && lightboxModal && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = title;
        if (lightboxCaption) lightboxCaption.textContent = title;

        lightboxModal.classList.remove('hidden');
        lightboxModal.classList.add('flex');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeLightboxBtn) closeLightboxBtn.addEventListener('click', closeLightbox);

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  // Global ESC Key handler for both modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (bookingModal && !bookingModal.classList.contains('hidden')) closeBookingModal();
      if (lightboxModal && !lightboxModal.classList.contains('hidden')) closeLightbox();
    }
  });
});