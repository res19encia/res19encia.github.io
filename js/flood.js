$(document).ready(function() {
  const lightboxOverlay = document.getElementById('my-flood-lightbox-overlay');
  const lightboxContainer = document.getElementById('my-flood-lightbox-container');
  const lightboxImage = document.getElementById('my-flood-lightbox-image');


  $(".flood-image").on('click', (event) => {
    event.stopPropagation();
    event.stopImmediatePropagation();
    lightboxOverlay.classList.add('show');
    lightboxImage.style.backgroundImage = event.target.style.backgroundImage;
  });

  lightboxOverlay.addEventListener('click', () => {
    lightboxOverlay.classList.remove('show');
  });

  lightboxImage.addEventListener('click', (e) => {
    const event = e || window.event;
    event.stopPropagation();
  });
});
