
(() => {
 
  const openModalBtn = document.querySelector('[data-feedback-modal-open]');
  const closeModalBtn = document.querySelector('[data-feedback-modal-close]');
  const modal = document.querySelector('[data-feedback-modal]');
  const body = document.querySelector('body');
  const form = document.querySelector('.js-feedback-form');

 
  if (openModalBtn) {
    openModalBtn.addEventListener('click', toggleModal);
  }
  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', toggleModal);
    modal.addEventListener('click', handleBackdropClick);
  }
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }

 
  function toggleModal() {
    if (!modal) return;

    modal.classList.toggle('is-hidden');

    if (!modal.classList.contains('is-hidden')) {
      body.classList.add('no-scroll');
      window.addEventListener('keydown', handleEscKeyPress);
    } else {
      body.classList.remove('no-scroll');
      window.removeEventListener('keydown', handleEscKeyPress);
    }
  }

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      toggleModal();
    }
  }

  function handleEscKeyPress(event) {
    if (event.code === 'Escape') {
      toggleModal();
    }
  }

  
  async function handleFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get('name').trim(),
      rating: parseFloat(formData.get('rating')),
      descr: formData.get('message').trim(),
    };

    if (!data.name || !data.descr || !data.rating) {
      alert('Будь ласка, заповніть всі поля!');
      return;
    }
    if (data.name.length < 2 || data.name.length > 16) {
      alert('Ім\'я повинно містити від 2 до 16 символів.');
      return;
    }
    if (data.descr.length < 10 || data.descr.length > 512) {
      alert('Повідомлення повинно містити від 10 до 512 символів.');
      return;
    }

    const submitBtn = event.currentTarget.querySelector('button[type="submit"]');
    try {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      const response = await fetch(
        'https://sound-wave.b.goit.study/api/feedbacks',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      
      if (response.status !== 201) {
        let errorDetails = `Status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorDetails = JSON.stringify(errorData);
        } catch (jsonError) {
          errorDetails = await response.text();
        }
        throw new Error(`Server responded with an error. Details: ${errorDetails}`);
      }

      alert('Thank you for your feedback!');
      form.reset();
      toggleModal();
      
    } catch (error) {
      console.error('Submit error:', error);
      alert('Something went wrong. Please try again later.');

    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit';
    }
  }
})();