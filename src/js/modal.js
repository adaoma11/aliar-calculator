document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modalOverlay');
  const openBtn = document.getElementById('openModalBtn');
  const closeBtn = document.querySelector('.close-modal');

  const openModal = () => {
    modal.style.display = 'flex';
  };

  openModal();

  const closeModal = () => {
    modal.style.display = 'none';
    localStorage.setItem('modalShown', 'true');
  };

  openBtn.addEventListener('click', openModal);

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  if (!localStorage.getItem('modalShown')) {
    openModal();
  }
});
