// Creation du canvas
const cvs = document.getElementById("game");
const ctx = cvs.getContext("2d");

// Definition des images
const background = new Image();
background.src = "sprites/background.png";
const appleImg = new Image();
appleImg.src = "sprites/apple.png";


// Definition du serpent
let snake = [];

snake[0] = {
    y : 10 * 32,
    x : 9 * 32
};

// Definition des pommes et de leur emplacement aleatoire
let apple = {
    y : Math.floor(Math.random()*15+3) * 32, // Eviter que les pommes apparaissent hors du quadrillage
    x : Math.floor(Math.random()*17+1) * 32
}

// Definition du score
let score = 0;

// Definition de la collision
function collision(headSnake,array){
for (let i = 0; i < array.length; i+=2) {
if (headSnake.x == array[i].x & headSnake.y == array[i].y) {
    return true;
}}
    return false;
}

// Definition des controles du serpent (Avec les fleches et avec ZQSD -> normalement fonctionnel, je suis en qwerty avec un clavier TKL)
let control;
document.addEventListener("keydown",direction);
function direction(event){
let key = event.keyCode;
if (key == 37 | key == 68 & control != "RIGHT") {
    control = "LEFT";
    } else if (key == 38 | key == 83 & control != "DOWN") {
    control = "UP";
    } else if (key == 39 | key == 81 & control != "LEFT") {
    control = "RIGHT";
    } else if (key == 40 | key == 90 & control != "UP") {
    control = "DOWN";
    }
}

// Executer l'affichage des differents elements du canvas
function draw(){

// Definition du fond du jeu
ctx.drawImage(background,0,0);

// Definition du serpent dans le canvas
for (let i = 0; i < snake.length ; i++){
    ctx.fillStyle = ( i == 0 ) ? "#FF8C00" : "#FFAF4F";
    ctx.fillRect(snake[i].x,snake[i].y,32,32);
}

// Definition de la position de la pomme
ctx.drawImage(appleImg, apple.x, apple.y);

// Definition de la position actuelle de la tete du serpent
let positionX = snake[0].x;
let positionY = snake[0].y;

// Definition de la direction du corps du serpent
if (control == "LEFT") {
    positionX -= 32;
}
if (control == "UP") {
    positionY -= 32;
}
if (control == "RIGHT") {
    positionX += 32;
}
if (control == "DOWN") {
    positionY += 32;
}

// Definition du score ainsi que de la position aleatoire de la pomme une fois mangee par le serpent
// Definition egalement de la position de la queue du serpent (derniere case) afin qu'elle reste si une pomme est mangee ou si elle disparait
if (positionX == apple.x & positionY == apple.y){
    score++;
    apple = {
    x : Math.floor(Math.random()*17+1) * 32,
    y : Math.floor(Math.random()*15+3) * 32,
    }
    } else {
    snake.splice(-1, 1);
}

// Definition des qualites a afficher lorsque l'on atteint un certain score
if (score == 2) {
    ctx.font = "50px Sans-serif";
    ctx.fillStyle = "#FFFFFF"
    ctx.fillText("Node.JS", 200, 56);
}

if (score == 4) {
    ctx.font = "50px Sans-serif";
    ctx.fillStyle = "#FFFFFF"
    ctx.fillText("Angular.JS", 200, 56);
}

if (score == 6) {
    ctx.font = "50px Sans-serif";
    ctx.fillStyle = "#FFFFFF"
    ctx.fillText("Express.JS", 200, 56);
}

if (score == 8) {
    ctx.font = "50px Sans-serif";
    ctx.fillStyle = "#FFFFFF"
    ctx.fillText("Ruby on Rails", 200, 56);
}

// Definition de l'ouverture dans un nouvel onglet du CV lorsque l'on a atteint 10 en score
if(score == 10) {
    window.open("https://drive.google.com/file/d/1HKCcUXgk2fv1tJz6_SheO3n8DNREAUSj/view", '_blank');
    clearInterval(game);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("You won !!!", 200, 56);
    setInterval(function () {window.location.reload()}, 15000);
    snake.unshift(newStart);
    ctx.font = "80px Sans-serif";
    ctx.fillText(score,2*32,1.6*32);
}

// Definition de la nouvelle tete du serpent en cas de win ou game over
let newStart = {
    x : positionX,
    y : positionY
}

// Definition du game over et reload de la partie pour recommencer
if(positionX < 32 | positionX > 17 * 32 | positionY < 3*32 | positionY > 17*32 | collision(newStart,snake)){
    clearInterval(game);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Game over", 175, 320);
    ctx.font = "100px Sans-serif";
    setInterval(function () {window.location.reload()}, 2000);
    }
    snake.unshift(newStart);
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "50px Sans-serif";
    ctx.fillText(score,2*32,1.6*32);
}

// Definition de la vitesse du jeu
let game = setInterval(draw,120);