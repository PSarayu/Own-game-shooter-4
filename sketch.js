var player,alien,teamMatesgrp,tm,tmImg
var bg,playerImg,alienImg,ALIENSgrp
var laser, laserImg,Lasergrp
var score=0;
var gameState="start"



function preload(){
bg=loadImage("Pictures/bg.jpg")
playerImg=loadImage("Pictures/player.png")
alienImg=loadImage("Pictures/Alien.png")
laserImg=loadImage("Pictures/laser.png")
tmImg=loadImage("Pictures/team.png")
}

function setup(){
createCanvas(displayWidth-3,displayHeight-140)
player=createSprite(displayWidth/2,displayHeight-250,50,50)
player.shapeColor="black"
player.addImage(playerImg)
player.scale=1.5
player.setCollider("circle",0,0,50)




ALIENSgrp=new Group()
teamMatesgrp=new Group()
Lasergrp=new Group()

}

function draw(){
background(bg)

if(gameState==="start"){
   
    textSize(25)
    fill("white")
    text("Press 'S' to start the game",displayWidth/2-150,displayHeight/2-200)
    
}
if (keyDown("s")){

        
    gameState="play"
   }

if(gameState==="play")
{
    if(keyDown("right")){
        player.x=player.x+5
   }
   
   
   if(keyDown("left")){
       player.x=player.x-5
   }
   
   if(keyDown(32)){
       laser=createSprite(player.x,player.y-200,20,20)
       laser.addImage(laserImg)
       Lasergrp.add(laser)
       laser.scale=0.3
       laser.velocityY=-5
       player.depth=laser.depth
       player.depth+=2
       laser.depth-=1
    }
   
   
   if(ALIENSgrp.isTouching(Laser)){
       for(var i=0;i<ALIENSgrp.length;i++){
           if(ALIENSgrp[i].isTouching(Laser)){
               ALIENSgrp[i].destroy();  
               Lasergrp.destroyEach();  
               score+=2                    
           }
       }
   }

   if(ALIENSgrp.isTouching(player)){
    for(var i=0;i<ALIENS.length;i++){
        if(ALIENSgrp[i].isTouching(player)){
            gameState="end"
        }
      }
   }

if(Lasergrp.isTouching(teamMatesgrp)){
    for(var i=0;i<Lasergrp.length;i++){
        if(Lasergrp[i].isTouching(teamMatesgrp)){
           gameState="end"
        }
      }
   }
  
   aliens();
   teammates();
}

drawSprites();
textSize(25)
   fill("white")
   text("SCORE: "+ score,displayWidth-200,50)

   if (gameState==="end"){
    ALIENSgrp.destroyEach();
    teamMatesgrp.destroyEach();
    textSize(10)
    fill("white")
    text("GAME OVER",displayWidth/2,displayHeight/2)
    text("Press 'r' to restart",dsplayWidth/2,displayHeight/2+30)
   
 }
if(keyDown("r")){
    gameState="start"
    score=0
  }

}


function aliens(){
if(frameCount%70===0){
    alien=createSprite(Math.round(random(20,1300)),Math.round(random(-10,200)),40,40)
    alien.addImage(alienImg)
    alien.scale=0.3
    alien.velocityY=2
    ALIENSgrp.add(alien)
    
}
}

function teammates(){
  if(frameCount%160===0){
      tm=createSprite(Math.round(random(20,1300)),Math.round(random(-10,200)),40,40)
      tm.addImage(tmImg)
      tm.scale=1
      tm.velocityY=2
      teamMatesgrp.add(tm)
  }
}
