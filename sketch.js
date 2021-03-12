var ground, groundImage;
var screen1 = 0
var screen1Bg,screen1Image
var mario,marioImage
var steve,steveImage
var sonic,sonicImage
var title,titleImage
var character = 0
var bgImage
var invisGround
var obstacle,goombaImage, zombieImage,spikeImage
var obstaclesGroup
var obstaclesGroup2
var score = 0

function preload() {
  groundImage = loadImage("ground.png");
  screen1Image = loadImage("background1.png");
  marioImage = loadImage("pixil-frame-0-1.png");
  steveImage = loadImage("steve.png")
  sonicImage = loadImage("sonic.png")
  titleImage = loadImage("title.jfif");
  bgImage = loadImage("bg.png")
  goombaImage = loadImage("goomba1.png")
  zombieImage = loadImage("Zombie.png")
  spikeImage = loadImage("spikes.png")
}

function setup() {
  createCanvas(600, 600);
  console.log('test');
 screen1Bg = createSprite(400, 300, 1200, 600);
  screen1Bg.addImage("screen0",screen1Image)
  //screen1Bg.addImage("screen1",bgImage)
  screen1Bg.scale = 1.5
  
   mario = createSprite(160, 350, 10, 10);
  mario.addImage(marioImage)
  mario.scale = 1.5
  
  steve = createSprite(300,360,10,10)
  steve.addImage(steveImage)
  steve.scale = 1.7
  
  sonic = createSprite(440,350,10,10)
  sonic.addImage(sonicImage)
  sonic.scale = 1.5
  
  title = createSprite(300, 100, 10, 10);
  title.addImage(titleImage)
  title.scale = 1.5
  
  
    ground = createSprite(300, 560, 10, 10);
    ground.addImage(groundImage)
    ground.scale = 1.3
    ground.velocityX = -5
    ground.visible = false
  
  invisGround = createSprite(300,540,600,10)
  invisGround.visible = false

  ground.depth = 1
  mario.depth = 2
  //screen1Bg.depth = -1
  
  
  obstaclesGroup = new Group();
  obstaclesGroup2 = new Group();
  
  
  
  mario.setCollider("rectangle",-15,0,30,60)
  steve.setCollider("rectangle", -19,-12,23,60)
  sonic.setCollider("rectangle", -19,-12,37,60)

}

function draw() {
  background("blue");
  
  
  mario.collide(invisGround)
  steve.collide(invisGround)
  sonic.collide(invisGround)
  
  
  if(mousePressedOver(mario)) {
   screen1 = 1;
   character = 1;
 }
  
  if(mousePressedOver(steve)) {
   screen1 = 2;
   character = 2;
 }
  
  if(mousePressedOver(sonic)) {
   screen1 = 3;
   character = 3;
 }

  if(keyWentDown("space") && mario.y > 400){
    mario.velocityY = -15
  }
    
    if(keyWentDown("space") && steve.y > 400){
    steve.velocityY = -15
  }
  
     
    if(keyWentDown("space") && sonic.y > 400){
    sonic.velocityY = -15
  }
  
  
  
  if (screen1 === 1){
  //screen1Bg.changeImage("screen1",bgImage)
  //screen1Bg.scale = 10
  camera.position.x = mario.x 
  screen1Bg.visible = false
  ground.visible = true
  steve.visible = false
  sonic.visible = false
  title.visible = false
    if(mario.isTouching(obstaclesGroup)){
      screen1 = 4;
    }
    spawn1Obstacles()
    score = score + Math.round(getFrameRate()/60);
      text("Score: "+ score, 510,50);

  }
  
   
  if (screen1 === 2){
  //screen1Bg.changeImage("screen1",bgImage)
  //screen1Bg.scale = 10
  camera.position.x = steve.x
  screen1Bg.visible = false
  ground.visible = true
  mario.visible = false
  sonic.visible = false
  title.visible = false
    if(steve.isTouching(obstaclesGroup)){
    screen1 = 4;
    }
    spawn1Obstacles()
    score = score + Math.round(getFrameRate()/60);
      text("Score: "+ score, 510,50);

  }
  
  if (screen1 === 3){
//  screen1Bg.changeImage("screen1",bgImage)
  //screen1Bg.scale = 10
  camera.position.x = sonic.x
  screen1Bg.visible = false
  ground.visible = true
  mario.visible = false
  steve.visible = false
  title.visible = false
    if(sonic.isTouching(obstaclesGroup2)){
    screen1 = 4;
    }
    spawn2Obstacles()
    score = score + Math.round(getFrameRate()/60);
      text("Score: "+ score, 510,50);

    
  }
 
  if (character === 1){
   mario.velocityY = mario.velocityY + 0.8
 } 
  
  
  if (character === 2){
   steve.velocityY = steve.velocityY + 0.8
    steve.x = 160
 }   
  
  if (character === 3){
   sonic.velocityY = sonic.velocityY + 0.8
    sonic.x = 160
 } 
  
    

  
     if(ground.x < 100){
     ground.x = 300
   }

  
  if(screen1 === 4){
    mario.velocityY = 0
    steve.velocityY= 0
    sonic.velocityY= 0
    ground.velocityX = 0
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    obstaclesGroup2.setVelocityXEach(0);
    obstaclesGroup2.setLifetimeEach(-1);
    textSize(35)
    text("Score: "+ score, 250,300);
  }
  
  
  
  
  drawSprites();
}


function spawn1Obstacles() {
  if(frameCount % 80 === 0) {
    var obstacle = createSprite(600,510,10,10);       
    obstacle.lifetime = 300;
    obstacle.velocityX = -5;
    if(character === 2){
      obstacle.addImage(zombieImage)
      obstacle.scale = 0.8;
      obstacle.y = 500;
    }
    if(character === 1){
      obstacle.addImage(goombaImage)
      obstacle.setCollider("rectangle", 0, 0, 20, 20)
      obstacle.scale = 2;
    }
      obstaclesGroup.add(obstacle);
      
    obstacle.depth = 1

  }
}

function spawn2Obstacles(){
  if(frameCount % 35 === 0) {
    var obstacle2 = createSprite(600,510,10,10);       
    obstacle2.lifetime = 300;
    if(character === 3){
      obstacle2.addImage(spikeImage)
      obstacle2.scale = 0.3;
      obstacle2.y = 500;
      obstacle2.velocityX = -9
    }
      obstaclesGroup2.add(obstacle2);
      
    obstacle2.depth = 1
  }
}