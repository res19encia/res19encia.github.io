$(document).ready(function() {
  const mainImagePadilha = document.getElementById('eduardo-padilha-showcase-main-image');
  const mainImageArtur = [
    document.getElementById('artur-ched-showcase-main-image-0'),
    document.getElementById('artur-ched-showcase-main-image-1')
  ];

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
