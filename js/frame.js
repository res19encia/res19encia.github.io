$(document).ready(function() {
  localStorage.setItem('fromMenu', true);

  const lightboxOverlay = document.getElementById('my-frame-lightbox-overlay');
  const lightboxContainer = document.getElementById('my-frame-lightbox-container');
  const lightboxImage = document.getElementById('my-frame-lightbox-image');

  const mainImagePadilha = document.getElementById('eduardo-padilha-showcase-main-image');

  const subtitleArtur = document.getElementById('artur-ched-showcase-subtitle');
  const mainImageArtur = [
    document.getElementById('artur-ched-showcase-main-image-0'),
    document.getElementById('artur-ched-showcase-main-image-1')
  ];

  lightboxOverlay.addEventListener('click', () => {
    lightboxOverlay.classList.remove('show');
  });

  lightboxImage.addEventListener('click', (e) => {
    const event = e || window.event;
    event.stopPropagation();
  });

  $('.frame-lightbox-thumbnail').on('click', (event) => {
    event.stopPropagation();
    event.stopImmediatePropagation();
    lightboxOverlay.classList.add('show');
    lightboxImage.style.backgroundImage = event.target.style.backgroundImage;
    lightboxImage.style.paddingBottom = event.target.style.paddingBottom;

    if(event.target.offsetWidth > event.target.offsetHeight) {
      lightboxImage.style.width = '100%';
      lightboxImage.style.paddingBottom = event.target.style.paddingBottom;
    } else {
      const mRatio = event.target.offsetWidth / event.target.offsetHeight;
      lightboxImage.style.paddingBottom = '0px';
      lightboxImage.style.height = '95vh';
      lightboxImage.style.width = `${95 * mRatio}vh`;
    }
  });

  $('.eduardo-padilha-showcase-image').on('click', (event) => {
    event.stopPropagation();
    event.stopImmediatePropagation();

    const mainImageUrl = mainImagePadilha.style.backgroundImage;
    mainImagePadilha.style.backgroundImage = event.target.style.backgroundImage;
    event.target.style.backgroundImage = mainImageUrl;
  });

  $('.artur-ched-showcase-image').on('click', (event) => {
    event.stopPropagation();
    event.stopImmediatePropagation();

    const pairImage = [
      event.target,
      event.target.nextElementSibling
    ];
    const mainImageUrl = mainImageArtur.map(e => e.style.backgroundImage);
    const mainImageSteps = mainImageArtur.map(e => e.getAttribute('data-steps'));
    const mainImageIndex = mainImageArtur.map(e => e.getAttribute('data-blueprint-index'));

    const pairImageUrl = pairImage.map(e => e.style.backgroundImage);
    const pairImageSteps = pairImage.map(e => e.getAttribute('data-steps'));
    const pairImageIndex = pairImage.map(e => e.getAttribute('data-blueprint-index'));

    if (window.location.href.includes('pt')) {
      subtitleArtur.innerHTML = `Planta baixa ${pairImageIndex[0]} | Desenho digital | ${pairImageSteps[0]} passos | 2020`;
    } else {
      subtitleArtur.innerHTML = `Blueprint ${pairImageIndex[0]} | Digital Drawing | ${pairImageSteps[0]} steps | 2020`;
    }

    mainImageArtur.forEach((e, i) => {
      e.style.backgroundImage = pairImageUrl[i];
      e.setAttribute('data-steps', pairImageSteps[i]);
      e.setAttribute('data-blueprint-index', pairImageIndex[i]);
      e.parentElement.setAttribute('href', pairImageUrl[i].match(/url\(\"(.*)\"\)/)[1]);
    });

    pairImage.forEach((e, i) => {
      e.style.backgroundImage = mainImageUrl[i];
      e.setAttribute('data-steps', mainImageSteps[i]);
      e.setAttribute('data-blueprint-index', mainImageIndex[i]);
    });
  });
});
