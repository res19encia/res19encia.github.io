$(document).ready(function() {
  const lightboxOverlay = document.getElementById('my-frame-lightbox-overlay');
  const lightboxContainer = document.getElementById('my-frame-lightbox-container');
  const lightboxImage = document.getElementById('my-frame-lightbox-image');

  const mainImagePadilha = document.getElementById('eduardo-padilha-showcase-main-image');
  const mainImageArtur = [
    document.getElementById('artur-ched-showcase-main-image-0'),
    document.getElementById('artur-ched-showcase-main-image-1')
  ];

  lightboxOverlay.addEventListener('click', () => {
    lightboxOverlay.classList.remove('show');
  });

  lightboxContainer.addEventListener('click', (e) => {
    const event = e || window.event;
    event.stopPropagation();
  });

  $('.curators-note-image').on('click', (event) => {
    event.stopPropagation();
    event.stopImmediatePropagation();
    lightboxOverlay.classList.add('show');
    lightboxImage.style.backgroundImage = event.target.style.backgroundImage;
  });

  $(".eduardo-padilha-showcase-image").on('click', (event) => {
    event.stopPropagation();
    event.stopImmediatePropagation();

    const mainImageUrl = mainImagePadilha.style.backgroundImage;
    mainImagePadilha.style.backgroundImage = event.target.style.backgroundImage;
    event.target.style.backgroundImage = mainImageUrl;
  });

  $(".artur-ched-showcase-image").on('click', (event) => {
    event.stopPropagation();
    event.stopImmediatePropagation();

    const pairImage = [
      event.target,
      event.target.nextElementSibling
    ];
    const mainImageUrl = mainImageArtur.map(e => e.style.backgroundImage);
    const pairImageUrl = pairImage.map(e => e.style.backgroundImage);

    mainImageArtur.forEach((e, i) => {
      e.style.backgroundImage = pairImageUrl[i];
      e.parentElement.setAttribute('href', pairImageUrl[i].match(/url\(\"(.*)\"\)/)[1]);
    });
    
    pairImage.forEach((e, i) => {
      e.style.backgroundImage = mainImageUrl[i];
    });
  });
});
