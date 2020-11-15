var gameState=1;
var play=1;
var end=0;
var monkey , monkey_running
var banana ,bananaImg, obstacle, obstacleImg
var FoodGroup, obstacleGroup
var Survivaltime,score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkeystop=loadImage("sprite_0.png")
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,360);
 
  monkey=createSprite(80,325,20,20);
  monkey.addAnimation("move",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,1200,10);
  ground.velocityX=-4;
  //ground.x=ground.width/2;
  
  score=0;
  Survivaltime=0;
  
  obstacleGroup=createGroup();
  FoodGroup=createGroup();

  //monkey.setCollider("rectangle",monkey.widht/2,monkey.height);
  //monkey.debug = true
  
}


function draw() {
  background("white");
  
  if(gameState===play){
    
  stroke("black");
  textSize(15);
  fill("black");
  text("SCORE:-"+score,400,50);
  
  stroke("black");
  textSize(15);
  fill("black");
  Survivaltime=Math.ceil(frameCount/frameRate());
  text("Survival Time :- "+Survivaltime,100,50);
  
  spawnBanana();
  spawnobstacle();
    
  if(keyDown("space")){
    monkey.velocityY=-12;
  }
  if(monkey.isTouching(FoodGroup)){
    score=score+1;
    FoodGroup.destroyEach();
  }
    
  if(monkey.isTouching(obstacleGroup)){
    gameState=end;
    monkey.destroy();
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
  }
  }
  if(gameState===end){
    ground.velocityX=0;
    obstacleGroup.velocityX=0;
    FoodGroup.velocityX=0;
    
  stroke("black");
  textSize(15);
  fill("black");
  text("SCORE:-"+score,250,200);
    
  }
  
  
  
  if(ground.x=0){
  ground.x=ground.width/2;
  }
  monkey.velocityY = monkey.velocityY+0.98;
  
  monkey.collide(ground);
  
drawSprites();
  
}
function spawnobstacle(){
 if (frameCount % 100 === 0){
   var obstacle = createSprite(600,350,10,40);
   obstacle.addImage(obstaceImage);
   obstacle.velocityX = -(6 + score/100);
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.30;
    obstacle.lifetime = 500;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }
}

function spawnBanana(){
 if (frameCount % 100 === 0){
   var banana = createSprite(600,350,10,40);
   banana.y=Math.round(random(100,230))
   banana.addImage(bananaImage);
   banana.velocityX = -(6 + score/100);
   
    //assign scale and lifetime to the obstacle           
    banana.scale = 0.10;
    banana.lifetime = 500;
   
   //add each obstacle to the group
    FoodGroup.add(banana);
 }
}



