// challange 1 : Black jack



function blackjackHit(){

    if (blackjackGame['isStand'] === false){

   
    let card = randomCard();

        //console.log(card);
        showCard(card,YOU);
        updateScore(card,YOU);
        ShowScore(YOU);
        console.log(YOU['score']);
     
    }   
}

function randomCard() {

    let randomIndex = Math.floor(Math.random() * 13 );

    return blackjackGame['cards'][randomIndex];

}

function showCard(card,activePlayer){

    if ( activePlayer ['score'] <= 21 ) {

         let cardImage = document.createElement('img');
         cardImage.src =`${card}.png`;
         document.querySelector(activePlayer['div']).appendChild(cardImage);
         hitSound.play();

    }
}

function blackjackDeal(){



   if(blackjackGame['turnsOver'] === true){

    blackjackGame['isStand'] = false;

//    let winner = computeWinner();   
                                      // and  showResult(computeWinner()); are the somethings with different coding
 //   showResult(winner);   

    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
    
    //console.log(yourImages);
   // yourImages[0].remove();

    for (let i =0; i< yourImages.length;  i++) {
       yourImages[i].remove();
    }
        
    for (let i =0; i<dealerImages.length;  i++) {
        dealerImages[i].remove();
        
     }

    YOU['score'] = 0;
    DEALER['score'] =0;

    document.querySelector('#your-blackjack-result').textContent = 0;
    document.querySelector('#dealer-blackjack-result').textContent = 0;

    document.querySelector('#your-blackjack-result').style.color = '#ffffff';
    document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';

    document.querySelector('#blackjack-result').textContent = "let's play";
    document.querySelector('#blackjack-result').style.color = 'black';

    blackjackGame['turnsOver'] = true;
  
 }

} 


 function updateScore(card, activePlayer){

    if (card === 'A') {
    // if adding 11 keeps me below 21, add 11. otherwise, add 1. 

     if (activePlayer['score']+ blackjackGame['cardsMap'][card] [1] <= 21){

        activePlayer['score'] += blackjackGame['cardsMap'][card] [1];
       }

      else  {
       
        activePlayer['score'] += blackjackGame['cardsMap'][card] [0];
      } 


       }

    else {
    activePlayer['score'] += blackjackGame['cardsMap'][card];
    
    }
}

function ShowScore(activePlayer){
    if(activePlayer['score'] > 21 ){
        document.querySelector(activePlayer['scoreSpan']).textContent ='BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color ='red';
    }
    else{

    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score']

    }
}

function sleep(ns) {

    return new Promise(resolve => setTimeout(resolve,ns));

}

 async function dealerLogic() {

    blackjackGame['isStand'] = true;
while(DEALER['score'] < 16 && blackjackGame['isStand'] === true){
    let card = randomCard();
    showCard(card,DEALER);
    updateScore(card,DEALER);
    ShowScore(DEALER);
   // showResult(computeWinner());
   // computeWinner();
   await sleep(1000);
}  
 //  if (DEALER['score'] > 15) {

    blackjackGame['turnsOver'] = true;
    let winner =computeWinner();
    showResult(winner);
    console.log(blackjackGame['turnsOver']);

 //  }

}


// compute winner and return who just won
// update the wins, draws, losses

function computeWinner() {

    let winner;

    if (YOU['score'] <= 21) {

        // condition: higher score than dealer or when dealer busts but you're 21 or under

        if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)){
            blackjackGame['wins']++;
           // console.log('you won!');
            winner = YOU;
        }

        else if (YOU['score'] < DEALER['score']) {
            blackjackGame['losses']++;
            // console.log('you lost!');
            winner = DEALER;

        }

         else if (YOU['score'] === DEALER['score']) {
             blackjackGame['draws']++;
            // console.log('you drew!');
         }

         
    }

    // condition: when user busts but dealer doesn't

         else if (YOU['score'] > 21 && DEALER['score'] <= 21 ) {
             blackjackGame['losses']++;
            // console.log('you lost!');
             winner= DEALER;
       }

    // when you and the dealer busts 

         else if (YOU['score'] > 21 && DEALER['score'] > 21 ){
            blackjackGame['draws']++;
            // console.log('you drew!');
        }
       // console.log('Winner is', winner);
        console.log(blackjackGame);
        return winner;
    }


 function showResult(winner) {

    let message , messageColor;

    if(blackjackGame['turnsOver'] === true){

     if (winner === YOU) {
         document.querySelector('#wins').textContent = blackjackGame['wins'];
         message = 'you won!';
         messageColor = 'green';
         winSound.play();
     }

     else if (winner === DEALER) {
        document.querySelector('#losses').textContent = blackjackGame['losses'];
        message = 'you lost!';
        messageColor = 'red';
        lossSound.play();
    }

    else  {
        document.querySelector('#draws').textContent = blackjackGame['draws'];
        message = 'you drew!';
        messageColor = 'black';
       
    }


     document.querySelector('#blackjack-result').textContent = message;
     document.querySelector('#blackjack-result').style.color = messageColor;

    }
}