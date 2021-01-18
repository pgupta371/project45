var bg1, bg2, bg3, bg4, prison, treasureFound; 
var key, keyImg, chest, chestImg, chestExplosionImg, map, button;
var boyRunning, boyJumping, boyAttack, boyDie, girlRunning, girlJumping, girlAttack, girlDie, zombie, blackGhost, ghost;   
var chooseGirl, chooseBoy, chooseGirl1, chooseBoy1, button1; 
var gameState = "choose"; 

function preload(){
    bg1 = loadImage("img/bg1.jpg");
    bg2 = loadImage("img/bg2.jpg");
    bg3 = loadImage("img/bg3.jpg");
    bg4 = loadImage("img/bg.png");
    map = loadImage("img/map.jpg");
    button = loadImage("img/button.png");
    button0 = loadImage("img/button0.png");

    prison = loadImage("img/prison.jpg");
    treasureFound = loadImage("img/treasureFound.jpg");
    chooseBG = loadImage("img/chooseBG.png")
    directionsBG = loadImage("img/directionsBG.png")

    keyImg = loadAnimation("img/Key1.png", "img/Key2.png", "img/Key3.png", "img/Key4.png", "img/Key5.png", "img/Key6.png", "img/Key7.png", "img/Key8.png"); 
    chestImg = loadImage("img/chest.png"); 
    chestExplosionImg = loadAnimation("img/chestExplosion1.png", "img/chestExplosion2.png", "img/chestExplosion3.png"); 

    boyRunning = loadAnimation("img/boyRunning1.png","img/boyRunning2.png", "img/boyRunning3.png", "img/boyRunning4.png", "img/boyRunning5.png", "img/boyRunning6.png" ); 
    boyJumping = loadAnimation("img/boyJumping1.png", "img/boyJumping2.png", "img/boyJumping3.png", "img/boyJumping4.png", "img/boyJumping5.png", "img/boyJumping6.png", "img/boyJumping7.png", "img/boyJumping8.png", "img/boyJumping9.png", "img/boyJumping10.png");
    boyAttack = loadImage("img/boyAttack.png");
    boyDie = loadImage("img/boyDie.png");
    boy = loadImage("img/boyRunning5.png")

    girlRunning = loadAnimation("img/girlRunning1.png", "img/girlRunning2.png", "img/girlRunning3.png", "img/girlRunning4.png", "img/girlRunning5.png", "img/girlRunning6.png",  );
    girlJumping = loadAnimation("img/girlJumping1.png", "img/girlJumping2.png", "img/girlJumping3.png"); 
    girlAttack = loadImage("img/girlAttack.png");
    girlDie = loadImage("img/girlDie.png"); 
    girl = loadImage("img/girlRunning1.png");

    gem = loadImage("img/gem.png"); 
    coins = loadAnimation("img/coin1.png","img/coin2.png","img/coin3.png","img/coin4.png","img/coin5.png","img/coin6.png")
    ghost = loadImage("img/ghost.png");
    blackGhost = loadImage("img/blackGhost.png"); 
    zombie = loadAnimation("img/zombie1.png","img/zombie2.png","img/zombie3.png","img/zombie4.png","img/zombie5.png","img/zombie6.png","img/zombie7.png","img/zombie8.png","img/zombie9.png")
}
function setup(){
    createCanvas(800,400);
    
    chooseGirl1 = createSprite(100,320,50,50);
    chooseGirl1.addAnimation("0", girl);
    chooseGirl1.scale =1.5; 

    chooseBoy1 = createSprite(250,330,50,50);
    chooseBoy1.addAnimation("1", boy);
    chooseBoy1.scale = 1.5; 

    chooseGirl1.visible=false;
    chooseBoy1.visible=false;

    button1 = createSprite(27,25,20,20);
    button1.addImage(button0);
    button1.scale = 2;
    button1.visible = false;
    button1.scale = 0.2;

    button2 = createSprite(710,380,20,20);
    button2.addImage(button);
    button2.scale = 2;
    button2.visible = false;
    button2.scale = 0.9;

    bg = createSprite (650,200,1700,400);
    bg.addImage("background", bg4);
    bg.x = bg.width /2;
    bg.scale = 2;
    bg.visible = false;

    player = createSprite(50,50,20,20);
    player.visible = false;

    obstaclesGroup = new Group(); 
    advantagesGroup = new Group();
    coinsGroup = new Group();  
}

function draw(){
    background(0);
    playerChoosing();
    map1(); 
    directions();
    play();
    drawSprites(); 
}

function playerChoosing(){
    if(gameState === "choose"){
        background(chooseBG);
        fill(255);
        textSize(30);
        text("Choose your character:", 20,230); 
        chooseGirl1.visible=true;
        chooseBoy1.visible=true;
    }
    if(mousePressedOver(chooseGirl1)){
        gameState = "Map"
        player.addAnimation("2",girlRunning)
        chooseGirl1.destroy();
        chooseBoy1.destroy();
    }
    if(mousePressedOver(chooseBoy1)){
        gameState = "Map"
        player.addAnimation("2",boyRunning)
        chooseGirl1.destroy();
        chooseBoy1.destroy();
    }
}
function map1(){
    if(gameState === "Map"){
        background(map);
        button1.visible=true;
    }
    if(mousePressedOver(button1)){
        gameState = "directions"
        button1.destroy(); 
    }
}
function directions(){
    if(gameState === "directions"){
        background(directionsBG);
        button2.visible = true; 
    }
    if(mousePressedOver(button2)){
        gameState = "play"
        button2.destroy();  
    }
}
function play(){
    if(gameState === "play") {
        bg.visible = true;
        player.visible = true;
        player.scale = 1.5;
        player.x=70;
        player.y=315;
        bg.velocityX = -8
        if (bg.x < 0) {
            bg.x = bg.width/2;
        }
        if (keyDown("space")) {
            player.velocityY = -10;
        }
        if(keyDown("a")){
            player.addImage(boyAttack);
        }  
        spawnObstacles(); 
        spawnAdvantages();
        //spawnCoins(); 
        /*if(obstaclesGroup.isTouching(player)){
            gameState = "end";
        }*/       
    }  
}
function spawnObstacles() {
    if(frameCount % 160 === 0) {
      var obstacle = createSprite(width-20,height-80,10,40);
      obstacle.velocityX = -10;
      
      //generate random obstacles
      var rand = Math.round(random(1,2));
      switch(rand) {
        case 1: obstacle.addAnimation("1", zombie);
                break;
        case 2: obstacle.addImage(blackGhost);
                break;
        default: break;
      }         
      obstacle.scale = 2;
      obstacle.lifetime = (width/obstacle.velocityX);
      obstaclesGroup.add(obstacle);
    }
  }
function spawnAdvantages(){
    if(frameCount % 500 === 0){
        var advantage = createSprite(width-20,height-80,10,40);
        advantage.velocityX = -10;

        var rand = Math.round(random(1,2));
        switch(rand) {
            case 1: advantage.addImage(ghost);
                    break;
            case 2: advantage.addImage(gem);
                    break;
            default: break;
        }         
        //advantage.scale = 2;
        advantage.lifetime = (width/advantage.velocityX);
        advantagesGroup.add(advantage);
    }
}
function spawnCoins(){
    if(frameCount % 100){
        var coin = createSprite(width-20,height-80,10,40);
        coin.addAnimation("0", coins);
        coin.velocityX = -10;
        //coin.lifetime = (width/coin.velocityX);
        coinsGroup.add(coin);
    }
}
function end(){
    if(gameState === "end"){
        bg.visible = false;
        player.visible = false;
        background(0);
        console.log("end");
    }
  }