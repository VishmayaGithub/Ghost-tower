var tower, towerImage, door, doorImage, climber, climberImage, ghost, ghostImage, doorGroup, climberGroup;
var PLAY = 1,
  END = 0,
  gameState = PLAY;


function preload() {
  towerImage = loadImage("tower.png")
  doorImage = loadImage("door.png")
  climberImage = loadImage("climber.png")
  ghostImage = loadImage("ghost-standing.png")


}

function setup() {
  createCanvas(600, 600)

  tower = createSprite(100, 0, 600, 600)
  tower.addImage("tower", towerImage)
  tower.scale = 1.5
  tower.velocityY = 4

  ghost = createSprite(300, 300, 20, 20)
  ghost.addImage("ghost", ghostImage)
  ghost.scale = 0.5
  ghost.velocityY = 4

  doorGroup = new Group()
  climberGroup = new Group()

}

function draw() {
  background("white")
  if (gameState == PLAY) {
    if (tower.y > 600) {
      tower.y = tower.width / 2
    }
    if (keyDown("SPACE")) {
      ghost.velocityY = -4
    }
    if (keyDown("LEFT")) {
      ghost.x = ghost.x - 3
    }

    if (keyDown("RIGHT")) {
      ghost.x = ghost.x + 3
    }
    ghost.velocityY = ghost.velocityY + 0.8
    Spawndoor()
    
    if (ghost.y > 600) {
     
      gameState = END
    }
      drawSprites()
  }

  if(gameState === END){
     climberGroup.setVelocityYEach(0)
      doorGroup.setVelocityYEach(0)
      tower.velocityY = 0
    climberGroup.setLifetimeEach(-1)
    doorGroup.setLifetimeEach(-1)
    textSize(30)                   
    text("Game Over",250,250)
  }
    

}

function Spawndoor() {
  if (frameCount % 100 === 0) {
    door = createSprite(Math.round(random(200, 400)), Math.round(random(100, 300)), 20, 20)
    door.velocityY = -3
    door.addImage("door", doorImage)
    door.lifetime = 300
    doorGroup.add(door)
    climber = createSprite(Math.round(random(200, 400)), Math.round(random(100, 300)), 20, 20)
    climber.velocityY = -3
    climber.addImage("climber", climberImage)

    climber.x = door.x
    climber.y = door.y + 50
    climber.lifetime = 300

    climberGroup.add(climber)

    ghost.depth = door.depth
    ghost.depth = ghost.depth + 1
  }
}