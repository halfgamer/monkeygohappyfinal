

var monkey , monkey_running

var banana ,bananaImage,bananagroup, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score,gameover,ga,backimg,bag,sound



function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  ga=loadImage("game.PNG")
  backimg=loadImage("jungle.jpg")
   sound = loadSound("checkPoint.mp3")
  
 
 
 
}



function setup() {
  createCanvas(displayWidth,displayHeight);
  console.log(displayHeight);
  console.log(displayWidth);
  monkey=createSprite(80,332,20,20)
  monkey.addAnimation("run",monkey_running)
  monkey.scale=0.09
  monkey.setCollider("circle",0,0,290)
  //monkey.debug=true
  
  ground=createSprite(displayWidth/2,displayHeight-250,900,10)
  ground.velocityX=-4
  ground.x=ground.width/2
  ground.visible=false
  
  bananagroup=new Group();
  obstaclegroup=new Group();
  score=0;
  
  gameover=createSprite(200,200,20,20)
 // gameover.addImage("gameisover",ga)
  gameover.scale=0.5
  gameover.visible=false
    gameover.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
  gameover.addImage("over",ga)
  
  
  bag=createSprite(200,200,5,5);
  bag.addImage("ju",backimg)
  bag.velocityX=-4
  bag.scale=2
  
  camera.position.x=displayWidth/2;
  camera.position.y=monkey.Y;
  
  
}


function draw() {
   background(500);
  monkey.depth=bag.depth+1
  gameover.depth=bag.depth+1

 
   if (bag.x<0){
    bag.x=bag.width/2
 }
  
  if (ground.x<0){
    ground.x=ground.width/2
  }
  
  monkey.collide(ground);
    if(keyDown("space") ) {
        monkey.velocityY = -15;

       
    }
    monkey.velocityY = monkey.velocityY + 0.8
   if(score%10===0 && score>0){
      sound.play();
      //ground.velocityX=ground.velocityX+100
    }
 
 
    
    if (monkey.isTouching(obstaclegroup)){
       obstaclegroup.setVelocityXEach(0);
    bananagroup.setVelocityXEach(0);
      monkey.scale=0.09
   monkey.velocityY=4
   gameover.visible=true
    bag.velocityX=0;
    textSize(20);
    text("GAME OVER ",displayWidth/7,displayHeight/8)
  
     
  
    
  }
  if (monkey.isTouching(bananagroup)){
     bananagroup.destroyEach();
      score=score+2
  }
    switch (score){
      case 10 : monkey.scale=0.12
        break;
        case 20 :monkey.scale=0.14
        break;
        case 40:monkey.scale=0.16
        break;
        default:monkey.scale=monkey.scale
        break;
    }

  ob();
  ba();
  camera.position.x=displayWidth/8;
  camera.position.y=monkey.y;
drawSprites();
fill("red")
   textSize(20);
 text("Score: "+ score, 330,160);
  
}
function ba(){
  if (frameCount%104===0){
    var banana=createSprite(displayWidth,random(displayHeight/2,displayHeight/3),20,20)
    banana.addImage("fruit",bananaImage)
    banana.velocityX=-4
    banana.scale=0.08
    banana.lifetime=-1;
    bananagroup.add(banana)
    
      
 }
  
}
function ob(){
  if (frameCount%160===0){
    var obstacles=createSprite(displayWidth,displayHeight-270,20,20)
    obstacles.addImage("hit", obstaceImage)
    obstacles.velocityX=-8
   obstacles.scale=0.2
   obstacles.lifetime=-1;
     obstaclegroup.add(obstacles);
     obstacles.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
   
   
  
}
}






