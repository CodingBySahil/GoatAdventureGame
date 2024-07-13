document.addEventListener("DOMContentLoaded", () => {
    let yourPlayer = document.querySelector("#yourPlayer");
    let opponent = document.querySelector("#opponent");
    let gameOver = document.querySelector(".gameOver");
    let scoreElement = document.querySelector(".score");
    let score = 0;
    let flag = true;

    const bgMusic = new Audio('content/bgMusic.mp3');
    const gOver = new Audio('content/loinRoar.mp3');

    setTimeout(() => {
        bgMusic.play();
    }, 1000);

    document.addEventListener("keydown", handleKeyDown);

    function handleKeyDown(e) {
        switch (e.keyCode) {
            case 38:
                jump();
                break;
            case 39:
                moveRight();
                break;
            case 37:
                moveLeft();
                break;
        }
    }

    function jump() {
        yourPlayer.classList.add('goatAni');
        setTimeout(() => {
            yourPlayer.classList.remove('goatAni');
        }, 300);
    }

    function moveRight() {
        yourPlayer.style.left = `${parseInt(getComputedStyle(yourPlayer).left) + 100}px`;
    }

    function moveLeft() {
        yourPlayer.style.left = `${parseInt(getComputedStyle(yourPlayer).left) - 100}px`;
    }

    setInterval(checkCollision, 10);

    function checkCollision() {
        const gx = parseInt(getComputedStyle(yourPlayer).left);
        const gy = parseInt(getComputedStyle(yourPlayer).top);
        const lx = parseInt(getComputedStyle(opponent).left);
        const ly = parseInt(getComputedStyle(opponent).top);

        const overValueX = Math.abs(gx - lx);
        const overValueY = Math.abs(gy - ly);

        if (overValueX < 50 && overValueY < 40) {
            endGame();
        } else if (overValueX < 144 && flag) {
            score += 10;
            flag = false;
            updateScore(score);
            setTimeout(() => {
                flag = true;
            }, 1000);
            setTimeout(increaseSpeed, 500);
        }
    }

    function endGame() {
        gameOver.style.visibility = 'visible';
        document.querySelector('.welcome').style.visibility = 'hidden';
        opponent.classList.remove('opponentAni');
        opponent.style.left = `${parseInt(getComputedStyle(opponent).left)}px`;
        bgMusic.pause();
        gOver.play();
        setTimeout(() => {
            gOver.pause();
        }, 1200);
    }

    function updateScore(score) {
        scoreElement.innerHTML = `Your score : ${score}`;
    }

    function increaseSpeed() {
        const speed = parseFloat(getComputedStyle(opponent).animationDuration) - 0.15;
        opponent.style.animationDuration = `${speed}s`;
    }
});
