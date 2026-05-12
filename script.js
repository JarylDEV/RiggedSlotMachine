const symbols = [
    "images/banana.webp",
    "images/bell.png",
    "images/jpg logo.png",
];

const reel1 = document.getElementById("slot1");
const reel2 = document.getElementById("slot2");
const reel3 = document.getElementById("slot3");
const reel = document.querySelectorAll(".machine");

const spinBtn = document.getElementById("start_game");

let alwaysLose = true;
let winChance = 0.25;


spinBtn.addEventListener("click", spin);

function spin() {

    spinBtn.disabled = true;

        let final1;
        let final2;
        let final3;

        if (alwaysLose) {
            final1 = randomSymbol();

            do {
                final2 = randomSymbol();
            } while (final2 === final1);

            do {
                final3 = randomSymbol();
            } while (
                final3 === final1 ||
                final3 === final2
            );
        }
        else {
            if (Math.random() < winChance) {
                const winningSymbol = randomSymbol();
                final1 = winningSymbol;
                final2 = winningSymbol;
                final3 = winningSymbol;
            }
            else {
                final1 = randomSymbol();
                final2 = randomSymbol();
                final3 = randomSymbol();
            }
        }

        let time = 0;

        const spinning = setInterval(() => {
        time++;
        animation(reel1, final1, time);
        animation(reel2, final2, time);
        animation(reel3, final3, time);
    }, 100);

    setTimeout(() => {

        clearInterval(spinning);

        reel1.src = final1;
        reel2.src = final2;
        reel3.src = final3;

        spinBtn.disabled = false;
    }, 2000);
}

function randomSymbol() {
    const index = Math.floor(Math.random() * symbols.length);
    return symbols[index];
}

function animation(reel, finalSymbol, time){
    reel.style.transform = "translateY(100%)";

    let showFinal = 0;

    setTimeout(() => {

        if (time > 10) showFinal = 0.2;
        if (time > 15) showFinal = 0.5;
        if (time > 18) showFinal = 0.8;

        const useFinal = Math.random() < showFinal;
        reel.src = useFinal ? finalSymbol : randomSymbol();

        reel.style.transition = "none";
        reel.style.transform = "translateY(-100%)";
        reel.offsetHeight;
        reel.style.transition = "transform 0.1s linear";
        reel.style.transform = "translateY(0%)";
    }, 50)
}