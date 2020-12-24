/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


let scores, roundScore, activePlayer, gamePlaying, totalScore;
let dice_0, dice_1, dice_2, dice, latestDice, lastDice;
totalScore = document.querySelector('.totalScore-input');
dice_0 = document.querySelector('.dice-0');
dice_1 = document.querySelector('.dice-1');
dice_2 = document.querySelector('.dice-2');


init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        dice = Math.floor(Math.random() * 6) + 1;
        let diceDom = document.querySelector('.dice-' + activePlayer);
        latestDice.push(dice);
        // console.log(latestDice[latestDice.length-2]);
        
        dice_2.src = 'dice-' + latestDice[latestDice.length-2] + '.png';
        

        

        if (activePlayer === 0) {
            dice_0.style.display = 'block';
            dice_1.style.display = 'none';
        } else {
            dice_0.style.display = 'none';
            dice_1.style.display = 'block';
        }
        dice_2.style.display = "block";
        diceDom.src = 'dice-' + dice + '.png';

        if(lastDice===6 && dice===6){
            console.log(" 2 dene 6 geldi")
            scores[activePlayer] = 0;
            document.querySelector('#score-'+activePlayer).textContent = '0';
            nextPlayer();
        }else if (dice !== 1 ) {
            //Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }else {
            //Next player
            nextPlayer();
        }
        lastDice=dice;

    }

});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        //Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;


        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        let winningScore;
        if(totalScore){
            winningScore = totalScore;
        }else{
            winningScore = 15;
        }


        //Check if player won the game
        if (scores[activePlayer] >= totalScore.value) {

            totalScore.value = "";
            document.querySelector('#name-' + activePlayer).textContent = 'Winner !!!';
            document.querySelector('.dice-' + activePlayer).style.display = 'none';


            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();

        }
    }



});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;


    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';

};

document.querySelector('.btn-new').addEventListener('click', init);


function init() {

    if (totalScore.value > 9) {
        scores = [0, 0];
        roundScore = 0;
        activePlayer = 0;
        latestDice = [1];

        gamePlaying = true;
        
        dice_0.style.display = 'none';
        dice_1.style.display = 'none';
        dice_2.style.display = 'none';

        document.getElementById('score-0').textContent = '0';
        document.getElementById('score-1').textContent = '0';

        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        document.getElementById('name-0').textContent = 'Player 1';
        document.getElementById('name-1').textContent = 'Player 2';

        document.querySelector('.player-0-panel').classList.remove('winner');
        document.querySelector('.player-1-panel').classList.remove('winner');

        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.remove('active');

        document.querySelector('.player-0-panel').classList.add('active');
    } 



}