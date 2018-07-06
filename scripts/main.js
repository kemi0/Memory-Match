$(document).ready(function() {


  
  initializeApp()
  createCards(imageArray);
});


function initializeApp() {
  $("#game-area").on('click', ".card", handleClick);
  $('.btn-1').on('click', resetGame);
  // $('#music').on('click', musicControl)
}


var firstCardClicked = null;
var secondCardClicked = null;
var total_possible_match = 9;
var match_counter = 0;
var attempts = 0;
var accuracy = 0;
var game_played = 0;
var counter = 0;



function handleClick() {

  hideCard(this);

  if (firstCardClicked === null) {

    firstCardClicked = this;
    $(firstCardClicked).addClass('unclickable');
  } else {

    secondCardClicked = this;
    attempts++;
  
    displayAttempts();

    var second_img_name = imageCardName(this);
    var first_img_name = imageCardName(firstCardClicked);

    if (first_img_name === second_img_name) {
      $(secondCardClicked).addClass('unclickable');
      match_counter++;
      accuracy = match_counter / attempts;
      removeImg();
      resetCards();

      if (match_counter === total_possible_match) {
        setTimeout(winModal, 1000);
      }
    } else {
      accuracy = match_counter / attempts;
      $(".card").addClass("unclickableAll")
      setTimeout(flippedCard, 500);

    }
    displayAccuracy();
  }
}

function displayAccuracy() {
  accuracy = parseFloat(accuracy*100).toFixed(0);
  $('.accuracy .value').text(accuracy+"%");
}

function flippedCard() {
  showCardBack(firstCardClicked);
  showCardBack(secondCardClicked);
  $(firstCardClicked).removeClass("unclickable");
  $('.card').removeClass('unclickableAll')
  resetCards();
}

function disableClick(card) {
  $('#game-area').click(false);
}

function resetCards() {
  firstCardClicked = null;
  secondCardClicked = null;
}
function imageCardName(card) {
  var src = $(card)
  var src = $(card).find(".front  img").attr('src');
  var index = src.indexOf("/");
  var dotIndex = src.indexOf(".");
  var name = src.substring(index + 1, dotIndex);
  return name;
}
function playAudio() {
  var audio = document.getElementById("audio");
  audio.loop = true;
  if(audio.paused !== false) {
    audio.play();
  }else {
    audio.currentTime = 0
  }
}
function hideCard(card) {
  $(card).addClass("hidden");
}

function showCardBack(card) {
  $(card).removeClass("hidden");
}

function resetCard() {
  var cards = $('.card');
  for (var i = 0; i < cards.length; i++) {
    showCardBack(cards[i]);
  }
}
function resetGame() {
  game_played++;
  resetCards()
  resetCard();
  reset_stats();
  playAudio();
}

function removeImg() {
  $(firstCardClicked).find(".front img").fadeOut(1000);
  $(firstCardClicked).find(".back img").css("visibility", "hidden");
  $(secondCardClicked).find(".front img").fadeOut(1000);
  $(secondCardClicked).find(".back img").css("visibility", "hidden");
}

function changeStats() {
  $(".games-played .value").text(games_played);
  $(".attempts .value").text(attempts);
  $(".matched .value").text(matched);


  if (attempts === 0) {
    accuracy_percentage = '0';
  } else {
    accuracy_percentage = ((matched / attempts) * 100).toFixed(2);
  }
  $(".accuracy.value").text(accuracy_percentage + '%');
  }

function reset_stats() {
   accuracy = 0;
   match_counter = 0;
   attempts = 0;
   displayAttempts();
   displayAccuracy();
   $('.card').remove();
   createCards(imageArray);
   counter = 0;
}
function displayAttempts() {
$(".attempts .value").text(attempts)
}

function winModal() {
  var modal = $('#id01')[0];
  modal.style.display = "block";

  $('.modal-content').css('background-image', 'url("./assets/giphy.gif")');
  $('.modal-footer').text('');
   
  var btn = $("<button>")
      .text("Restart Game")
      .addClass("close");
  $('.modal-footer').append(btn);
  $('.modal-footer').on("click", btn, function() {
      location.reload();
  });
}

var imageArray = [
  'assets/cards/clashOfRoyale/card1.png',
  'assets/cards/clashOfRoyale/card2.png',
  'assets/cards/clashOfRoyale/card3.png',
  'assets/cards/clashOfRoyale/card4.png',
  'assets/cards/clashOfRoyale/card5.png',
  'assets/cards/clashOfRoyale/card6.png',
  'assets/cards/clashOfRoyale/card7.png',
  'assets/cards/clashOfRoyale/card8.png',
  'assets/cards/clashOfRoyale/card9.png'
];

var cards = [];

function createCards(images) {
  images = images.concat(images);
  for (var i = 0; i < images.length; i++) {
    var newCard = $('<div>').addClass('card');
    var frontDiv = $('<div>').addClass('front');
    var backDiv = $('<div>').addClass('back');
    var frontImgSrc = images[i];
    var frontImg = $('<img>').attr('src', frontImgSrc);
    var backImg = $('<img>').attr('src', 'assets/cards/clashOfRoyale/cardBack.png');
    $(backDiv).append(backImg);
    $(frontDiv).append(frontImg);
    $(newCard).append(frontDiv, backDiv);
    $('#game-area').append(newCard);
    cards.push(newCard)
  }
  shuffleCards(cards);
}

function shuffleCards(cards) {
  while (cards.length > 0) {
    var randomCardNum = Math.floor(Math.random() * cards.length);
    $('#game-area').append(cards[randomCardNum]);
    cards.splice(randomCardNum, 1);
  }
}
