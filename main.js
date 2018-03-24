var bgm = new Audio('clashRoyale.mp3');

$(document).ready(function() {





  initializeApp()
  createCards(imageArray);
  // bgm.play();

  // // duration();
});



function initializeApp() {
  $("#game-area").on('click', ".card", handleClick);
  $('.btn-1').on('click', resetGame);
  console.log('card has been clicked');
  console.log('the dom is loaded');
}
function duration()
{
    var audio = document.getElementById("audio-element");
    if(audio.readyState > 0)
    {
        var minutes = parseInt(audio.duration / 60, 10);
        var seconds = parseInt(audio.duration % 60);

        alert(minutes+":"+seconds);
    }
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
  // $(this).find(".back").hide();
  // console.log('card clicked', this);
  hideCard(this);


  console.log("card was clicked");

  if (firstCardClicked === null) {
    // get the first card clicked
    // store the refrence of the clicked card
    firstCardClicked = this;
    $(firstCardClicked).addClass('unclickable');
  } else {
    // we're on our secound card click
    // store refrence
    secondCardClicked = this;
    attempts++;

    displayAttempts();

    var second_img_name = imageCardName(this);
    var first_img_name = imageCardName(firstCardClicked);


    if (first_img_name === second_img_name) {
      $(secondCardClicked).addClass('unclickable');
      match_counter++;
      accuracy = match_counter / attempts;
      console.log("match counter:", match_counter);
      removeImg();

      resetCards();
      if (match_counter === total_possible_match) {
        setTimeout(winAlert, 1000);
        // resetGame()
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
  accuracy = parseFloat(accuracy*100).toFixed(2);
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

// reseting the cards
function resetCards() {
  firstCardClicked = null;
  secondCardClicked = null;
}
//storing the img source
function imageCardName(card) {
  var src = $(card)
  var src = $(card).find(".front  img").attr('src');
  var index = src.indexOf("/");
  var dotIndex = src.indexOf(".");
  var name = src.substring(index + 1, dotIndex);
  return name;
}
// function replayAudio() {
//     var 
// }

function hideCard(card) {
  $(card).addClass("hidden");
}

function showCardBack(card) {
  $(card).removeClass("hidden");
}
//
function winAlert() {
  alert('you win');
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
  // location.reload(true);
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

function playAudio() {
  $('.clashOfRoyale-theme').on('click', )
}

var imageArray = [
  'clashOfRoyale/card1.png',
  'clashOfRoyale/card2.png',
  'clashOfRoyale/card3.png',
  'clashOfRoyale/card4.png',
  'clashOfRoyale/card5.png',
  'clashOfRoyale/card6.png',
  'clashOfRoyale/card7.png',
  'clashOfRoyale/card8.png',
  'clashOfRoyale/card9.png'
];

var cards = [];

//create cards dynamically
function createCards(images) {
  console.log('card created');
  images = images.concat(images);
  for (var i = 0; i < images.length; i++) {
    var newCard = $('<div>').addClass('card');
    var frontDiv = $('<div>').addClass('front');
    // could we add image then the back div if not why not
    var backDiv = $('<div>').addClass('back');
    var frontImgSrc = images[i];
    var frontImg = $('<img>').attr('src', frontImgSrc);
    var backImg = $('<img>').attr('src', 'clashOfRoyale/cardBack.png');
    $(backDiv).append(backImg);
    $(frontDiv).append(frontImg);
    $(newCard).append(frontDiv, backDiv);
    $('#game-area').append(newCard);
    cards.push(newCard)
  }
  shuffleCards(cards);
}
// adding cards to game area randomly
function shuffleCards(cards) {
  while (cards.length > 0) {
    var randomCardNum = Math.floor(Math.random() * cards.length);
    $('#game-area').append(cards[randomCardNum]);
    cards.splice(randomCardNum, 1);
  }
}
