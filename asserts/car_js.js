// i am build a game car and under code is car game programe 
// initialize all variable 
const score = document.querySelector(".score"),
      startScreen = document.querySelector(".start_screen"),
      gameScreen = document.querySelector(".game_screen");

let keys = {
    ArrowUp: false,
    ArrowRight: false,
    ArrowDown: false,
    ArrowLeft: false
};
let player = {speed: 5 , start:false,lineSpeed:5, score: 0};
      
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function keyDown(e){
    e.preventDefault();
    keys[e.key] = true;
}
function keyUp(e){
    e.preventDefault();
    keys[e.key] = false;
}

function isCollide(a,b){
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right) )
}

// moveLines is working for road line moveing in infinitely
function moveLines(){
    let lines = document.querySelectorAll(".lines");
    lines.forEach((line)=>{
        if(line.y >= 700){
            line.y -= 750
        }
        line.y += player.lineSpeed;
        line.style.top = line.y+ "px";
    })
}
function moveOtherCar(car){
    let otherCars = document.querySelectorAll(".other_car");
    otherCars.forEach((line,i)=>{
        if(isCollide(car,line)){
            endGame();
        }
        if(line.y >= 700){
            line.y = -300
            line.style.left = Math.floor(Math.random() * 350) + "px";
        };
        if(player.score <= 500){
            // line.y += player.speed-2;
            line.y += 3;
        }else if(player.score > 500 && player.score < 1000){
            line.y += 5 ;
        }else if(player.score > 1000 && player.score < 1500){
            line.y += 7;
        }else if(player.score > 1500 && player.score < 2000){
            line.y += 9;
        }else if(player.score > 2000 && player.score < 2500){
            line.y += 11;
        }else if(player.score > 2500 && player.score < 3000){
            line.y += 13;
        }else if(player.score > 3000 && player.score < 3500){
            line.y += 14;
        }else if(player.score > 3500 && player.score < 4000){
            line.y += 15;
        }else if(player.score > 4000 && player.score < 4500){
            line.y += 16;
        }else if(player.score > 4500 ){
            line.y += 17;
        };
        line.style.top = line.y+ "px";
    })
}

// if isCollide is ture game end function is run 
function endGame(){
    player.start = false;
    startScreen.classList.remove("hide");
    startScreen.innerHTML = `<p>
                                Game over <br>
                                Your final score ${player.score} <br>
                                press here to restart to again
                            </p>`
}

// if user click start screen then run a funtion which name is game play 
function gamePlay(){
    let car = document.querySelector(".car");
    let road = gameScreen.getBoundingClientRect();
    let carAll = car.getBoundingClientRect();
    if(player.start){
        // under function is road line moveing in infinite 
        moveLines();
        moveOtherCar(car);

        if(keys.ArrowUp && player.y > road.top + 70){ player.y -= player.speed + 3;};
        if(keys.ArrowDown && player.y < (road.bottom - carAll.height) ){ player.y += player.speed + 3};
        if(keys.ArrowLeft && player.x > 0){ player.x -= player.speed + 3};
        if(keys.ArrowRight && player.x < (road.width - carAll.width - 13)){ player.x += player.speed + 3};
        
        if(player.score > 1000 && player.score < 2000 ){
            player.speed = 7;
        }else if(player.score > 2000 && player.score < 3000){
            player.speed = 9;
        }else if(player.score > 3000 && player.score < 4000){
            player.speed = 11;
        }else if(player.score > 4000 && player.score < 5000){
            player.speed = 13;
        }
            

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";

        window.requestAnimationFrame(gamePlay);

        player.score++;
        let playerScore = player.score - 1;
        score.innerText = "Score:- " + playerScore;
    }
}

// starter screen click to start game-----

function dd(){
    // gameScreen.classList.remove("hide");
    startScreen.classList.add("hide");
    gameScreen.innerHTML = "";
    player.speed = 5;
    let car = document.createElement("div");
    car.setAttribute("class", "car");
    gameScreen.appendChild(car);
    
    player.x = car.offsetLeft;
    player.y = car.offsetTop;
    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);

    for(i=0; i<5; i++){
        let roadline = document.createElement("div");
        roadline.setAttribute("class", "lines");
        roadline.y = (i*150);
        roadline.style.top = roadline.y+ "px";
        gameScreen.appendChild(roadline);
    }

    for(i=0; i<3; i++){
        let enemiCar = document.createElement("div");
        enemiCar.setAttribute("class", `other_car other_car${i+1}`);
        enemiCar.y = ((i+1) * 350) * -1;
        enemiCar.style.top = enemiCar.y+ "px";
        enemiCar.style.left = Math.floor(Math.random() * 350) + "px";
        // enemiCar.style.backgroundColor = randonColor();
        // enemiCar.style.backgroundImage = url('enemi_1.png');
        gameScreen.appendChild(enemiCar);
    }
}


startScreen.addEventListener("click",dd);
