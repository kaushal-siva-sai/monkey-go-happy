var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running , go;

var banana ,bananaimg;

var obstacle, obstacleimg;

var foodg, obstacleg;

var land , reset;

var invisible;

var survival = 0;

function preload(){
  
monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
bananaimg = loadImage("banana.png");
obstacleimg = loadImage("obstacle.png");
 
}

function setup() {
  
 monkey = createSprite(80,320,10,10);
 monkey.addAnimation("monkeys",monkey_running);
 monkey.scale = 0.2;
  
 land = createSprite(300,390,1000,20);
 land.velocityX = -4;
 land.x = land.width/2;
  
 obstacleg = createGroup();
 foodg = createGroup();
  
}

function draw() {
  
   createCanvas(500,400);
  background("cyan");

 if(gameState === PLAY){
    
    bananag();
    obstacles();
    
  if (keyDown("space")&& monkey.y >= 100) {
    monkey.velocityY = -17;
     }
   
  if (land.x < 0){
   land.x = land.width/2;
    }
   
    console.log(monkey.y);
    monkey.velocityY = monkey.velocityY + 0.7;
   
  if(monkey.isTouching(foodg)){ 
    foodg.destroyEach();
    survival = survival+1;
     }
   
  if (monkey.isTouching(obstacleg)) {
    gameState = END;
    obstacle.velocityX = 0;
    banana.velocityX = 0;
}
   
  }
   else if(gameState === END){
     
    obstacleg.setVelocityXEach(0);
    obstacleg.setLifetimeEach(-2);
     
 reset();
   }
   
    textSize(25);
    textFont("magneto");
    fill("black");
    stroke("grey");
    text("Survival Time : "+survival,300-50,40);
    monkey.collide(land);
  
    drawSprites();
  
}

function bananag(){
  
if(frameCount%63===0){
    banana = createSprite(500,205,20,20);
    banana.addImage(bananaimg);
    banana.velocityX=-6;
    banana.scale = 0.08;
    foodg.add(banana);
 }
}

function obstacles() {

  if (frameCount % 180 === 0) {
    obstacle = createSprite(500,560,20,20);
    obstacle.y = Math.round(random(320,390));
    obstacle.addImage(obstacleimg);
    obstacle.scale = 0.3;
    obstacle.velocityX = -3;
    obstacle.lifetime = 300;
    obstacleg.add(obstacle);
    
    }
}

function reset() {
  gameState = PLAY;
  survival = 0;
  foodg.destroyEach();
  monkey.changeAnimation("sprite",monkey_running);
}