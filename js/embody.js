$(document).ready(function() {
  const lightboxOverlay = document.getElementById('my-embody-lightbox-overlay');
  const lightboxContainer = document.getElementById('my-embody-lightbox-container');
  const lightboxImage = document.getElementById('my-embody-lightbox-image');

  $('.artist-image').on('click', (event) => {
    event.stopPropagation();
    event.stopImmediatePropagation();
    lightboxOverlay.classList.add('show');
    lightboxImage.style.backgroundImage = event.target.style.backgroundImage;
  });

  lightboxOverlay.addEventListener('click', () => {
    lightboxOverlay.classList.remove('show');
  });

  lightboxContainer.addEventListener('click', (e) => {
    const event = e || window.event;
    event.stopPropagation();
  });
});
