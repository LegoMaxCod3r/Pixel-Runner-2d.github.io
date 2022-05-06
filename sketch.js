var alienParasite,alienParasiteGroup,alienParasiteImg;
var alin1Img;
var biteSound,gameOverSound;
var road, roadImg;
var runner, runnerImg;
var gameOver,gameOverImg,reStart,reStartImg;
var cubeFont;


let gameState="PLAY";
let score = 0;

function preload(){
    alienParasiteImg=loadImage("alienParasite1.png");
    runnerImg=loadImage("PMan.png");
    roadImg=loadImage("ROAD.png");
    gameOverImg=loadImage("GameOver.png");
    reStartImg=loadImage("reStart.png");
    
    gameOverSound=loadSound("defeat.mp3");
    biteSoundSound=loadSound("bite.mp3");

    cubeFont=loadFont("04B_03.ttf");
    
    alienParasiteGroup = new Group();
}

function setup() {
    createCanvas(550,600);

    road=createSprite(280,200,516,500);
    road.addImage("road",roadImg);
    road.velocityY=1;

    reStart=createSprite(300,300,100,100);
    reStart.addImage("reStart", reStartImg);
    reStart.visible=false;

    gameOver=createSprite(190,300,100,100);
    gameOver.addImage("gameOver", gameOverImg);
    gameOver.visible=false;

    runner=createSprite(300,520,50,50);
    runner.addImage("runner", runnerImg);
    runner.scale=.15;
}

function draw() {
    background("grey");
    //runner.debug=true;

    
    
    fill("lightgreen");
    textSize(54);
    textFont(cubeFont);
    text('Score: ' + score, 30, 50);

    runner.setCollider("rectangle", 5,0,400,800);
    if(gameState==="PLAY"){
        
        if(road.y>300){
            road.y=road.width/2;
        }
    
        if(keyDown("DOWN_ARROW")){
            runner.y = runner.y+2;
        }
    
        if(keyDown("UP_ARROW")){
            runner.y = runner.y-2;
        }
    
        if(keyDown("RIGHT_ARROW")){
            runner.x = runner.x+2;
        }
    
        if(keyDown("LEFT_ARROW")){
            runner.x = runner.x-2;
        }
    
    
        spawnAlienParasites(); 
    }

    if(alienParasiteGroup.isTouching(runner)|| runner.y>600 || runner.x>599 || runner.x<0){
        gameState="END"
        biteSound.play();


    }
   
    if(gameState==="END"){
        alienParasiteGroup.setLifetimeEach(-1);
        alienParasiteGroup.setVelocityYEach(0);
        road.velocityY=0;

        gameOverSound.loop();
        reStart.visible=true;
        gameOver.visible=true;
    }

    drawSprites();
}

function resetGame(){
    gameState="PLAY";
    alienParasiteGroup.destroyEach();
    gameOverSound.stop();
    reStart.visible=false;
    gameOver.visible=false;
}

function spawnAlienParasites(){
    if(frameCount%100===0){
        var alienParasite = createSprite(200,-50)

        alienParasite.addImage(alienParasiteImg);

        alienParasite.x = Math.round(random(10,590))

        runner.depth=alienParasite.depth;

        alienParasite.velocityY=1;

        alienParasite.lifetime=800;

        alienParasite.addImage("alienParasite",alienParasiteImg);

        alienParasiteGroup.add(alienParasite);

        //alienParasite.debug=true;
        
        alienParasite.scale=.4;
    }
}

