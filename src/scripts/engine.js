const state = {
    view:{
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score'),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0, 
        currentTime: 60,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime === 0) {
        clearInterval(state.actions.timerId);
        clearInterval(state.actions.countDownTimerId);
        alert('GAME OVER! Your final score is ' + state.values.result);
    }
}

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.1;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach(square => {
        square.classList.remove('enemy');
    });

    const squares = state.view.squares;
    const randomPosition = Math.floor(Math.random() * 9);
    const square = squares[randomPosition];

    square.classList.add('enemy');

    state.values.hitPosition = square.id;
}


function addListenerHitBox() {
    state.view.squares.forEach(square => {
        square.addEventListener('mousedown', () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound('hit');
            }
        });
    });
}

function init() {
    addListenerHitBox();
}

init();