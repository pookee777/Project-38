var gameState = 0;
var monkey,monkey_running;
var banana,bananaImage,obstacle,obstacleImage;
var ground,invisibleGround;
var bananaGroup, obstaclesGroup;
var canvas;
var score = 0;
var gameOver,gameOverImg;
var resetButton;
function preload()
{  
 monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png",
 "sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");            
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gameOverImg = loadImage("gameOver.png");
}

function setup() 
{
  canvas = createCanvas(displayWidth,displayHeight-145);

  monkey = createSprite(200,height-20,22,22);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.13;
  
  ground = createSprite(width/2,height-8,width,15);
  ground.velocityX = -4;
  ground.shapeColor = "White"
  ground.x = ground.width/2;

  invisibleGround = createSprite(width/2,height-16,width,2);
  invisibleGround.visible = false;
  
  gameOver = createSprite(width/2,height/2,10,10);
  gameOver.addImage("over",gameOverImg);

  bananaGroup = createGroup();
  obstaclesGroup = createGroup(); 
}


function draw() 
{
  background("lightBlue");
   
  textSize(20);
  fill("black");
  text("Bananas Eaten = "+score,width/4,50)
  
  //creating gamestates
  if (gameState === 0)
    {
      gameOver.visible = false;    

      if (ground.x < width/1.5)
      {
        ground.x = ground.width/2;
      }  

      if(keyDown("space")&& monkey.y >= height-170)
      {
        monkey.velocityY = -12;
      }
      monkey.velocityY = monkey.velocityY + 0.8;

      food();
      spawnObstacles();
      
      if(bananaGroup.isTouching(monkey))
      {
        bananaGroup.destroyEach();
        score++;
      }

      if(obstaclesGroup.isTouching(monkey))
      {
          gameState = 1;    
      }
  }
  
  else if (gameState === 1)
  {
    ground.velocityX = 0;
    monkey.velocityY = 0;

    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);

    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
   
    gameOver.visible = true;

    resetButton = createButton('Reset');
    resetButton.position(width/25,height/20);
    resetButton.mousePressed(()=>{
      reset();
    })
  }
  monkey.collide(invisibleGround);
  drawSprites();
}

function food()
{
  if (frameCount % 80 === 0)
  {
    var banana = 
    createSprite(width/1.5,Math.round(random(height-180,height-170))); 
    banana.addImage("eating",bananaImage); 
    banana.velocityX = -4; 
    banana.scale = 0.12;  
    banana.lifetime = 300;  
    bananaGroup.add(banana);    
  }
}

function spawnObstacles()
{
  if (frameCount %200 === 0)
  {
    var obstacle = createSprite(width/1.5,height-35,22,22); 
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -4;
    obstacle.scale = 0.12;
    obstacle.setCollider("rectangle",20,90);   
    obstacle.lifetime = 305;
    obstaclesGroup.add(obstacle);
  }
}
function reset()
{
  gameState = 0;
  obstaclesGroup.destroyEach();
  bananaGroup.destroyEach();
  gameOver.visible = false;
  score = 0;
}