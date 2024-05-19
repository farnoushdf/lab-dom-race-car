class Game {
    constructor() {
      this.startScreen = document.getElementById("game-intro");
      this.gameScreen = document.getElementById("game-screen");
      this.gameEndScreen = document.getElementById("game-end");
      this.player = new Player(this.gameScreen, 200, 500, 100, 150, "./images/car.png")
      this.height = 600;
      this.width = 500;
      this.obstacles = [new Obstacle(this.gameScreen)];
      this.score = 0;
      this.lives = 3;
      this.gameIsOver = false;
      this.gameIntervalId = null;
      this.gameLoopFrequency = Math.round(1000/60); // 60fps
    }
  
    start() {
      // Set the height and width of the game screen
      this.gameScreen.style.height = `${this.height}px`;
      this.gameScreen.style.width = `${this.width}px`;
  
      // Hide the start screen
      this.startScreen.style.display = "none";
      
      // Show the game screen
      this.gameScreen.style.display = "block";
  
      // Runs the gameLoop on a fequency of 60 times per second. Also stores the ID of the interval.
      this.gameIntervalId = setInterval(() => {
        this.gameLoop()
      }, this.gameLoopFrequency)
    }
  
    gameLoop() {
      console.log("in the game loop");
      
      this.update();
  
      // If "gameIsOver" is set to "true" clear the interval to stop the loop
      if (this.gameIsOver) {
        clearInterval(this.gameIntervalId)
      }
    }
  
    update() {
        // console.log("inside the update function");
        this.player.move();
        this.obstacles.forEach((oneObstacle, oneObstacleIndex) => {
          oneObstacle.move();

          const thereWasACollision = this.player.didCollide(oneObstacle);

          if (thereWasACollision) {
            this.obstacles.splice(oneObstacle, 1);
            this.lives -= 1;
            if (this.lives === 0) {
              this.gameIsOver = true;
              this.gameOver();
            }
            const livesElement = document.getElementById("lives");
            livesElement.innerHTML = this.lives;
          }
          //this checks if the top of the red car is bigger (on the bottom) than the game page
          if (oneObstacle.top > 700) {
            this.obstacles.splice(oneObstacleIndex, 1);
            oneObstacle.element.remove();
            //increase the score by 1
            this.score += 1;
            const scoreElement = document.getElementById("score");
            scoreElement.innerHTML = this.score; 
            this.obstacles.push(new Obstacle(this.gameScreen));
          }
        });
      }
       gameOver() {
        this.gameEndScreen.style.display = "none";
        this.gameIsOver.style.display = "block"
       }
  }

