'use strict';
//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
// const dice2 = document.getElementsByClassName('dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
// console.log(diceEl);
// console.log(score1El);

//Starting conditions
let scores,currentScore,activePlayer,playing;

const init = function(){
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    scores = [0,0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
}

init();

diceEl.classList.add('hidden');

const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;//querySelector doesn't work here
        activePlayer = activePlayer === 0 ? 1 : 0;
        currentScore = 0;
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');
}

//Rolling dice funcitionality
btnRoll.addEventListener('click',function() {
    if(playing){
        const dice = Math.trunc(Math.random() * 6 + 1);
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        if(dice !== 1){
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;//querySelector doesn't work here
        }
        else{
            switchPlayer();
        }
    }
})

btnHold.addEventListener('click',function() {
    if(playing){
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        if(scores[activePlayer] >= 100){
            playing = false;
            diceEl.classList.add('hidden')
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } 
        else{
            switchPlayer();
        }
    }
})

btnNew.addEventListener('click',function() {
    // document.getElementById(`score--${activePlayer}`).textContent = 0;
    // document.getElementById(`current--${activePlayer}`).textContent = 0;
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    document.querySelector(`.player--0`).classList.add('player--active');
    init();
});
