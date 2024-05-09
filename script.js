let yourPlayer,opponent,gameOver,score = 0;
yourPlayer=document.querySelector("#yourPlayer");
opponent = document.querySelector("#opponent");
gameOver = document.querySelector(".gameOver");
// score = document.querySelector('.score');
let bgMusic = new Audio('content/bgMusic.mp3')
setTimeout(() => {
    bgMusic.play();
}, 1000);
let gOver = new Audio('content/loinRoar.mp3')
let flag = true;
document.onkeydown = (e)=>{
    if (e.keyCode == 38) {
        yourPlayer.classList.add('goatAni')
    }
    setTimeout(() => {
        yourPlayer.classList.remove('goatAni')
    }, 300);
    if (e.keyCode == 39) {
        yourPlayer.style.left = `${parseInt(window.getComputedStyle(yourPlayer, null).getPropertyValue('left'))+100}px`
    }
    if (e.keyCode == 37) {
        yourPlayer.style.left = `${parseInt(window.getComputedStyle(yourPlayer, null).getPropertyValue('left'))-100}px`
    }
    setInterval(() => {
        gx = parseInt(window.getComputedStyle(yourPlayer, null).getPropertyValue('left'))
        gy = parseInt(window.getComputedStyle(yourPlayer, null).getPropertyValue('top'))
        lx = parseInt(window.getComputedStyle(opponent, null).getPropertyValue('left'))
        ly = parseInt(window.getComputedStyle(opponent, null).getPropertyValue('top'))

        overValueX = Math.abs(gx - lx)
        overValuey = Math.abs(gy - ly)

        if (overValueX < 50 && overValuey < 40) {
            gameOver.style.visibility = 'visible'
            document.querySelector('.welcome').style.visibility = 'hidden'
            opponent.classList.remove('opponentAni')
            // ppp var will store x value of loin and place the loin in x value place
            ppp = parseInt(window.getComputedStyle(opponent, null).getPropertyValue('left'))
            opponent.style.left = `${ppp}px`;
            bgMusic.pause();
            gOver.play();
            setTimeout(() => {
                gOver.pause();
            }, 1200);
        }else if (overValueX < 144 && flag) {
            score += 10;
            flag = false;
            ubdateScore(score)
            setTimeout(() => {
                flag = true
            }, 1000);
            setTimeout(() => {
                let speed = (parseFloat(window.getComputedStyle(opponent, null).getPropertyValue('animation-duration'))) - .15;
                opponent.style.animationDuration = `${speed}s`
            }, 500);
        }
    }, 10);
}
function ubdateScore(credits){
    document.querySelector('.score').innerHTML = `Your score : ${credits}`;
}
