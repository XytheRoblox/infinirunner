var stars, starsImg, starsGroup;
var rocket, rocketImg;
var asteroid, asteroidImg,asteroidImg2, asteroidGroup;
var gravity = 2.1;
var spawnRate = 80;
var score = 0;
var prevScore;
var rande;
var crashSound;
var gameState = "PLAY";

function preload() {
    starsImg = loadImage("star.png")
    rocketImg = loadImage("rocket.png")
    asteroidImg = loadImage("asteroid.png")
    asteroidImg2 = loadImage("asteroid2.png");

    crashSound = loadSound("crash.wav")

    starsGroup = new Group();
    asteroidGroup = new Group();
}

function setup() {
    createCanvas(600,200);
    rocket = createSprite(50,10);
    rocket.addImage("rocket",rocketImg);
    rocket.scale = 0.07;
    rocket.debug = true
    
    
    score = 0;
    played = false;
    gameState = "PLAY"
}

function draw() {
    background(10);
    
    text("Score: " + Math.round(score), 50, 35);
    score = score+(getFrameRate()/125);
    
    
    rocket.velocityY = gravity;
    if(gameState === "PLAY") {
        if(keyDown("UP_ARROW") || keyDown("SPACE")) {
            rocket.velocityY =  -4;
        }

        if(rocket.y > 200 || rocket.y < 0 || rocket.isTouching(asteroidGroup)) {
            gameState = "END";
        }
        
    } else if(gameState === "END") {
        rocket.destroy();
        starsGroup.destroyEach()
        asteroidGroup.destroyEach();
        fill("Red")
        textSize(20)
        text("Game Over!",235,100)
        score = 0;
        
        

        
        
    }
    spawnStars();
    spawnAsteroids();
    drawSprites();
}



function spawnStars() {
    if(frameCount % 40 === 0) {
        stars = createSprite(300,100);
        stars.addImage("star", starsImg);
        stars.velocityX = -2 - score/150;
        stars.scale = 0.01
        stars.y = random(20,180)
        stars.x = random(590,530)
        stars.lifetime = 500;
        stars.depth = rocket.depth - 2
        starsGroup.add(stars);
    }

}

function spawnAsteroids() {
    if(frameCount % spawnRate === 0) {
        
        asteroid = createSprite(100,100);
        asteroid.y = random(rocket.y - 20,rocket.y + 20);
        asteroid.x = 600;
        asteroid.velocityX = -2 - score/150;
        asteroid.scale = 0.2
        asteroid.lifetime = 400;
        
        asteroid.depth = stars.depth + 1
        asteroid.setCollider("rectangle",0,0,80,0)
        asteroid.debug = true;
        rande = random(1,3);
        
        
        switch(Math.round(rande)) {
            case 1:
                asteroid.addImage("aster",asteroidImg);
            case 2:
                asteroid.addImage("aster2",asteroidImg2);
            case 3:
                asteroid.addImage("aster2",asteroidImg2);
        }
        asteroidGroup.add(asteroid);
    }
}
