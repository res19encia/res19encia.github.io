$(document).ready(function() {
  const backgroundText = document.getElementById('flux-background-text');
  let v = 1501;

  setInterval(() => {
    for(let i = 0; i < 10; i++) {
      backgroundText.innerHTML += `${v++},`;

      if(Math.random() < 0.0005) {
        backgroundText.innerHTML += ' ';
      }
    }
    backgroundText.innerHTML = backgroundText.innerHTML.replace(/^\s*([0-9]+,[ ]?){10}/,'');
  }, 50);
});
