const btnclr = ["green", "red", "yellow", "blue"];

let gamepattern = [];

let userclikedpattern = [];

let started = false;

let level = 0;

document.addEventListener("keypress", () => {

    if (started == false) {
        document.getElementById("level-title").innerText = `Level ${level}`;
        started = true;
        nextsequence();
    }
});

function nextsequence() {
    userclikedpattern = [];
    level++;
    document.getElementById("level-title").innerText = `Level ${level}`;
    let randomnumber = Math.floor(Math.random() * 4);
    let randomcolor = btnclr[randomnumber];
    gamepattern.push(randomcolor);



    fadein(200, randomcolor);
    fadeout(400, randomcolor);
    sound(randomcolor);
};

function sound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function fadein(time, id) {
    let fade = document.getElementById(id);
    setTimeout(() => {
        fade.style.opacity = 0.1;
    }, time);
}

function fadeout(time, id) {
    let fade = document.getElementById(id);
    setTimeout(() => {
        fade.style.opacity = 1;
    }, time);
}

document.querySelectorAll(".btn").forEach((item) => {
    item.addEventListener("click", (event) => {
        let userchoosecolor = event.target.id;
        userclikedpattern.push(userchoosecolor);
        animinate(userchoosecolor);
        sound(userchoosecolor);

        checkanswer(userclikedpattern.length - 1);

    });
});

function animinate(color) {
    document.getElementById(color).classList.add("press");

    setTimeout(() => {
        document.getElementById(color).classList.remove("press");
    }, 200);
}

function checkanswer(ansvalue) {
    if (gamepattern[ansvalue] === userclikedpattern[ansvalue]) {
        if (gamepattern.length === userclikedpattern.length) {
            setTimeout(() => {
                nextsequence();
            }, 1000)
        }
    }
    else {
        sound("wrong");
        document.getElementById("level-title").innerText = "Game Over. Press any key to Restart the Game!";
        document.querySelector("body").classList.add("wrong");

        setTimeout(() => {
            document.querySelector("body").classList.remove("wrong");
        }, 200);

        gameover();
    }
}

function gameover() {
    level = 0;
    gamepattern = [];
    started = false;
}