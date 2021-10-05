var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  spookySound.loop()
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  doorsGroup =new Group();
  climbersGroup =new Group();
  invisibleBlockGroup =new Group();

  ghost = createSprite(200,200)
  ghost.addImage(ghostImg);
  ghost.scale =0.3

  
}

function draw() {
  background(0);

  if (gameState == "play"){


  
  
  if(tower.y > 400){
      tower.y = 300
    }
  
  if (keyDown("right")){
    ghost.x =ghost.x+4

  }
  
  if (keyDown("left")){
    ghost.x =ghost.x-4

  }
    
  if (keyDown("space")){
  ghost.velocityY =-12

  }
  
  ghost.velocityY =ghost.velocityY+0.8

    spawnDoors();
    
    if (climbersGroup.isTouching(ghost)){
     ghost.velocityY =0 
   }

   if (invisibleBlockGroup.isTouching(ghost)||
   ghost.y>600){
  ghost.destroy()
  gameState="END"


   }
  







    drawSprites();
  }
  
  if (gameState == "END"){
    textSize(40)
    fill("red")
    stroke("gold");
    strokeWeight(3);
    text("GAME OVER",200,200)
  }
}


function spawnDoors(){
if (frameCount%240===0){



 door = createSprite(Math.round(random(120,400)),-50) ;
 door.velocityY =1
 door.addImage(doorImg);
 door.lifetime = 800
 ghost.depth =door.depth+1
 
 climber = createSprite(door.x,10);
 climber.velocityY =1
 climber.addImage(climberImg);
 climber.lifetime = 800

 invisibleBlock = createSprite(door.x,15);
 invisibleBlock.width = climber.width
 invisibleBlock.height = 2
 invisibleBlock.velocityY =1
 invisibleBlock.lifetime =800
 invisibleBlock.debug =true  





doorsGroup.add(door);
climbersGroup.add(climber);
invisibleBlockGroup.add(invisibleBlock);

}
}
