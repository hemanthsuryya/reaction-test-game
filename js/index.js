const gameTime = 5;
let prevResponseTime = 0;
reactionTime = [];
let averageRespTime = 0;
let bestRespTime = 0;

const init = () => {
    showElement(playMenu);
    hideElement(targetRing);
    hideElement(scoreCard);
}

const timer = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
gameMode = async () => {
    hideElement(playMenu);
    showElement(targetRing);
    hideElement(scoreCard);
    gameOver();
}

gameOver = async () => {
    await timer(gameTime*1000);
    scoreCalculation();
    hideElement(playMenu);
    hideElement(targetRing);
    
}

scoreCalculation = async () => {
    reactionTime.shift();
    const average = reactionTime => reactionTime.reduce( ( p, c ) => p + c, 0 ) / reactionTime.length;
    averageRespTime = average(reactionTime);
    reactionTime.sort(function(a, b) {
        return a - b;
    });
    bestRespTime = reactionTime[0];
    console.log('best: ', bestRespTime, ' avg: ', averageRespTime);
    document.getElementById('avg-res-time').innerHTML = averageRespTime;
    document.getElementById('best-res-time').innerHTML = bestRespTime;
    showElement(scoreCard);
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; // max & min both included 
}
recordTime = async (resTime) => {
    let value = resTime-prevResponseTime;
    prevResponseTime = resTime;
    var date = new Date(value);
    var sec = date.getSeconds();
    var ms = date.getMilliseconds();
    console.log(`here:  ${sec}, ${ms}`);
    reactionTime.push(value);

}
changeRingPosition = async() => {
    console.log(reactionTime);
    responseTime = Date.now();
    console.log(responseTime);
    recordTime(responseTime);
    targetRing.style.position="relative";
    targetRing.style.top= getRandomIntInclusive(0,100)+`%`;
    targetRing.style.left= getRandomIntInclusive(0,100)+`%`;
    // targetRing.style.top= 100+`%`;
    // targetRing.style.left= 100+`%`;     
}

hideElement = (element) => element.style.display  = "none";
showElement = (element) => element.style.display  = "block";

// document.getElementById("image").style.top=2000; 
const targetRing = document.getElementById("targetRing");
targetRing.onclick = changeRingPosition;
const scoreCard = document.getElementById("score-card");

const playMenu = document.getElementById("play-menu");
document.getElementById('play-button').onclick = gameMode;
document.getElementById('replay-button').onclick = gameMode;
init();
