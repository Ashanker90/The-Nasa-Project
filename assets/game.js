//camvas variable
let roidCan;
//gets the context
let canInfo;
//canvas width below
let canW = 2000;
//canvas height below
let canH = 1400;
//to get the keys for the user easily
let keyArr = [];
let userFire;
let circles = [];
let asteroids =[];
let score = 0;
//lives below - 5 lives then game over
let turns = 5;

document.addEventListener("DOMContentLoaded", SetupCanvas);

function SetupCanvas()
{
  roidCan = document.getElementById("asteroidCanvas");
  canInfo = roidCan.getContext("2d");
  roidCan.width = canW;
  roidCan.height = canH;
  canInfo.fillStyle = "black";
  canInfo.fillRect(0, 0, roidCan.width, roidCan.height);
  userFire = new UserFire();
  for (let i = 0; i < 8; i++)
  {
    asteroids.push(new Asteroid());
  }
  document.body.addEventListener("keydown", HandleKeyDown);
  document.body.addEventListener("keyup", HandleKeyUp);
  Render();
}

//deals with the keys moving up and down
function HandleKeyDown(k)
{
  keyArr[k.keyCode] = true;
}
function HandleKeyUp(k)
{
  keyArr[k.keyCode] = false;
  //space bar fires`
  if (k.keyCode === 32)
  {
    circles.push(new Circles(userFire.angle));
  }
}

//creates the users piece
class UserFire
{
    constructor()
    {
      //makes users little part visible
      this.visible = true;
      //x and y coords for the user's part
      this.x = canW / 2;
      this.y = canH / 2;
      //user isn't moving right when it loads
      this.movingForward = false;
      this.speed = 0.1;
      this.velX = 0;
      this.velY = 0;
      this.rotateSpeed = 0.001;
      this.radius = 20;
      this.angle = 0;
      this.strokeColor = "white";
      this.noseX = canW / 2 + 15;
      this.noseY = canH / 2;
    }

    //rotates user
    Rotate(direction)
    {
      this.angle += this.rotateSpeed * direction;
    }

    //updates everything as the user moves
    Update()
    {
      let deg = this.angle / Math.PI * 180;
      if (this.movingForward)
      {
        this.velX += Math.cos(deg) * this.speed;
        this.velY += Math.sin(deg) * this.speed;
      }
      if (this.x < this.radius)
      {
        this.x = roidCan.width;
      }
      if (this.x > roidCan.width)
      {
        this.x = this.radius;
      }
      if (this.y < this.radius)
      {
        this.y = roidCan.height;
      }
      if (this.y > roidCan.height)
      {
        this.y = this.radius;
      }

      this.velX *= 0.99;
      this.velY *= 0.99;

      this.x -= this.velX;
      this.y -= this.velY;
    }

    //makes what the user sees
    Draw()
    {
      canInfo.strokeStyle = this.strokeColor;
      canInfo.beginPath();
      let triAngle = ((Math.PI * 2) / 3);
      let deg = this.angle /Math.PI * 180;

      this.noseX = this.x - this.radius * Math.cos(deg);
      this.noseY = this.y - this.radius * Math.sin(deg);


      for(let i = 0; i < 3; i++)
      {
        canInfo.lineTo(this.x - this.radius * Math.cos(triAngle * i + deg),
              this.y - this.radius * Math.sin(triAngle * i + deg));
      }
      canInfo.closePath();
      canInfo.stroke();
    }
}

//creates the firing of the user
class Circles
{
  constructor(angle)
  {
    this.visible = true;
    this.x = userFire.noseX;
    this.y = userFire.noseY;
    this.angle = angle;
    this.height = 4;
    this.width = 4;
    this.speed = 5;
    this.velX = 0;
    this.velY = 0;
  }
  Update()
  {
    let deg = this.angle / Math.PI * 180;
    this.x -= Math.cos(deg) * this.speed;
    this.y -= Math.sin(deg) * this.speed;
  }
  Draw()
  {
    canInfo.fillStyle = "purple";
    canInfo.fillRect(this.x, this.y, this.width, this.height);
  }
}

//creates the asteroids
class Asteroid
{
  constructor(x, y, radius, level, collisionRadius)
  {
    this.visible = true;
    this.x = x || Math.floor(Math.random() * canW);
    this.y = y || Math.floor(Math.random() * canH);
    this.speed = 3;
    this.radius = radius || 50;
    this.angle = Math.floor(Math.random() * 359);
    this.collisionRadius = collisionRadius || 46;
    this.level = level || 1;
    this.strokeColor = "white";
  }
  Update()
  {
    let deg = this.angle / Math.PI * 180;
    this.x += Math.cos(deg) * this.speed;
    this.y += Math.sin(deg) * this.speed;
    if (this.x < this.radius)
    {
      this.x =roidCan.width;
    }
    if (this.x > roidCan.width)
    {
      this.x = this.radius;
    }
    if (this.y < this.radius)
    {
      this.y = roidCan.height;
    }
    if (this.y > roidCan.height)
    {
      this.y = this.radius;
    }
  }
  Draw()
  {
    canInfo.strokeStyle = "red";
    canInfo.beginPath();
    let anAngle = ((Math.PI * 2) / 6);
    let deg = this.angle / Math.PI * 180;
    for (let i = 0; i < 6; i++)
    {
      canInfo.lineTo(this.x - this.radius * Math.cos(anAngle * i + deg),
            this.y - this.radius * Math.sin(anAngle * i + deg));
    }
    canInfo.closePath();
    canInfo.stroke();
  }
}

//the users lives (there are 5)
function Lives()
{
  let x = 1350;
  let y = 10;
  let numbs = [[9,9], [-9,-9]];
  canInfo.strokeStyle = 'green';
  canInfo.lineWidth = 5;
  for (let i = 0; i < turns; i++)
  {
    canInfo.beginPath();
    canInfo.moveTo(x, y);
    for (let j = 0; j < numbs.length; j++)
    {
      canInfo.lineTo(x + numbs[j][0], y + numbs[j][1]);
    }
    canInfo.closePath();
    canInfo.stroke();
    x -= 30;
  }
}

//function for asteroids and user collisions based on distance
function CircleCollision(px, py, p2x, p2y)
{
  let diffX;
  let diffY;
  return Math.sqrt(Math.pow(p2x-px, 2) + Math.pow(p2y-py, 2));
}

//function for collisions of the firing and the asteroids
function Collisions(px, py, rad1, p2x, p2y, rad2)
{
  let radSum;
  let diffX;
  let diffY;

  radSum = rad1 + rad2;
  diffX = px - p2x;
  diffY = py - p2y;

  if (radSum > Math.sqrt((diffX * diffX) + (diffY * diffY)))
  {
    return true;
  }
  else
  {
    return false;
  }
}

function Render()
{
  //w key moves forward
  userFire.movingForward = (keyArr[87]);
  //d key roates right
  if (keyArr[68])
  {
    userFire.Rotate(1);
  }
  //a keys rotate left
  if (keyArr[65])
  {
    userFire.Rotate(-1);
  }
 // space bar key to fire
  if (keyArr[32])
  {
    if (circles.length !== 0)
    {
          for(let i = 0; i < circles.length; i++)
          {
              circles[i].Update();
              circles[i].Draw();
          }
      }
  }

  //puts the score in the left corner
  canInfo.clearRect(0, 0, canW, canH);
  canInfo.fillStyle = 'green';
  canInfo.font= "50px Times New Roman";
  canInfo.fillText("Score: " + score.toString(), 20, 35);

  if (turns <= 0)
  {
    document.body.removeEventListener("keydown", HandleKeyDown);
    document.body.removeEventListener("keyup", HandleKeyUp);
    userFire.visible = false;
    canInfo.fillStyle = "blue";
    canInfo.font = "50px Times New Roman";
    canInfo.fillText("Game Over", canW / 2 - 150, canH /2);
  }

  if(asteroids.length === 0)
  {
        userFire.x = canW / 2;
        userFire.y = canH / 2;
        userFire.velX = 0;
        userFire.velY = 0;
        for(let i = 0; i < 8; i++)
        {
            let asteroid = new Asteroid();
            asteroid.speed += .5;
            asteroids.push(asteroid);
        }
    }

  Lives();

  //collision check
  if (asteroids.length !==0)
    {
      for (var k = 0; k < asteroids.length; k++)
      {
        if (CircleCollision(userFire.x, userFire.y, asteroids[k].x, asteroids[k].y) < userFire.radius + asteroids[k].radius)
        {
          userFire.x = canW / 2;
          userFire.y = canH / 2;
          userFire.velX = 0;
          userFire.velY = 0;
          turns -= 1;
        }
      }
    }

    //user firing hits asteroids check
      if (asteroids.length !== 0 && circles.length != 0)
      {
          loop:
            for(let i = 0; i < asteroids.length; i++)
            {
                for(let j = 0; j < circles.length; j++)
                {
                    if(Collisions(circles[j].x, circles[j].y, 3, asteroids[i].x, asteroids[i].y, asteroids[i].collisionRadius))
                    {
                        //goes through making the asteroids smaller
                        if(asteroids[i].level === 1)
                        {
                            asteroids.push(new Asteroid(asteroids[i].x - 5, asteroids[i].y - 5, 25, 2, 22));
                            asteroids.push(new Asteroid(asteroids[i].x + 5, asteroids[i].y + 5, 25, 2, 22));
                        }
                        else if(asteroids[i].level === 2)
                        {
                            asteroids.push(new Asteroid(asteroids[i].x - 5, asteroids[i].y - 5, 15, 3, 12));
                            asteroids.push(new Asteroid(asteroids[i].x + 5, asteroids[i].y + 5, 15, 3, 12));
                        }
                        //makes asteroid go away as well as the firing
                        asteroids.splice(i, 1);
                        circles.splice(j, 1);
                        score += 30;
                        break loop;
                    }
                }
            }
      }

  //makes the user's triangle
  if (userFire.visible)
  {
    userFire.Update();
    userFire.Draw();
  }
  //makes the firing
  if (circles.length !== 0)
  {
        for(let i = 0; i < circles.length; i++)
        {
            circles[i].Update();
            circles[i].Draw();
        }
    }
  //makes the asteroids
  if (asteroids.length !== 0)
  {
      for(let j = 0; j < asteroids.length; j++)
      {
          asteroids[j].Update();
          asteroids[j].Draw(j);
      }
  }
  requestAnimationFrame(Render);
}
