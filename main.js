$(document).ready(initializeApp);


function initializeApp() {
  console.log('the dom is loaded');




  attachClickHandlers();
}

function attachClickHandlers() {
  $('.card').on('click', checkCard);
  console.log('was the card clicked');
}

function checkCard() {
  $(this).addClass(card);
}
