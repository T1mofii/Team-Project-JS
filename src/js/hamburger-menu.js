(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-menu-open]'),
    closeModalBtn: document.querySelector('[data-menu-close]'),
    modal: document.querySelector('[data-menu]'),
    header: document.querySelector('.header'),
  };

  const scrollLinks = document.querySelectorAll('.mob-menu-link, .nav-link, .footer-nav');

  function toggleModal() {
    refs.modal.classList.toggle('mob-is-open');
    document.body.classList.add('no-scroll');
  }

  if (refs.openModalBtn)
    refs.openModalBtn.addEventListener('click', toggleModal);
  if (refs.closeModalBtn)
    refs.closeModalBtn.addEventListener('click', toggleModal);

  scrollLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();

      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;

      const headerOffset = refs.header.offsetHeight;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      if (link.classList.contains('mob-menu-link')) {
        refs.modal.classList.remove('mob-is-open');
      }
    });
  });
})();
