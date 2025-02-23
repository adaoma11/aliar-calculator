document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modalOverlay');
  const openBtn = document.getElementById('openModalBtn');
  const closeBtn = document.querySelector('.close-modal');

  const openModal = () => {
    modal.style.display = 'flex';
  };

  const closeModal = () => {
    modal.style.display = 'none';
  };

  openBtn.addEventListener('click', openModal);

  // closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target === closeBtn) closeModal();
  });

  openModal();
});
