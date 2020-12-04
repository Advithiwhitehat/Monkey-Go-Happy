var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500,400);

  monkey = createSprite(50,360,10,10);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.09
  
  ground = createSprite(250,395,800,10);
  ground.velocityX = -6;
  ground.x = ground.width/2
  
  bananaGroup = createGroup();
  
  obstacleGroup = createGroup();

  score = 0;
  
  gamestate = "play";
}


function draw() {
  background("white");
  
 
  score = Math.ceil(frameCount/frameRate())
  fill("black");
  textSize(20);
  text("Survival Time:"+score,190,20);
  
  if(ground.x<100){
  ground.x = ground.width/2
  }
  
  if(keyDown("space")){
    monkey.velocityY = -10;
  }
  
  if(monkey.isTouching(obstacleGroup)){
    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    ground.velocityX=0;
    gamestate = "end";
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    background(500);
    
  }

  spawnBananas();
  
  spawnObstacles();
  monkey.velocityY = monkey.velocityY + 1;
  monkey.collide(ground);
  drawSprites();
  
}

function spawnBananas(){
  if(frameCount%80===0){
    banana = createSprite(200,200,10,10);
    banana.y = Math.round(random(150,300));
    banana.addImage(bananaImage);
    banana.scale = 0.06;
    banana.velocityX = -6;
    banana.lifetime = 100;
    bananaGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount%300===0){
    
    obstacle = createSprite(20,350,10,10);
    obstacle.velocityX = -6;
    obstacle.x=Math.round(random(250,500))
    
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    
    obstacle.lifetime = 300;

    obstacleGroup.add(obstacle);
  }
}




