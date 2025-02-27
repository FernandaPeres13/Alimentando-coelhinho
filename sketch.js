const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con2;
var fruit_con3;
var rope2;
var rope3;
var button2;
var button3;

var bg_img;
var food;
var rabbit;

var button;
var bunny;
var blink, eat, sad;
var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air; 
var canW;
var canH;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  blink = loadAnimation('blink_1.png','blink_2.png','blink_3.png');
  eat = loadAnimation('eat_0.png','eat_1.png','eat_2.png','eat_3.png','eat_4.png');
  sad = loadAnimation('sad_1.png','sad_2.png','sad_3.png');

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping = false;
  eat.looping = false;

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound('sad.wav');
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

}

function setup() {
  
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent); 
  if(isMobile){
     canW = displayWidth; 
     canH = displayHeight; 
     createCanvas(displayWidth+80, displayHeight); 
  }else { 
    canW = windowWidth; 
    canH = windowHeight; 
    createCanvas(windowWidth, windowHeight); 
  }
  
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;
  
  //botão 1
  button = createImg('cut_btn.png');
  button.position(20,30);
  button.size(50,50);
  button.mouseClicked(drop);
  
  //botão 2
  button2 = createImg('cut_btn.png');
  button2.position(330,35);
  button2.size(60,60);
  button2.mouseClicked(drop2);

  //botão 3
  button2 = createImg('cut_btn.png');
  button2.position(200,100);
  button2.size(60,60);
  button2.mouseClicked(drop3);

  rope = new Rope(8,{x:40,y:30});

  rope2 = new Rope(7,{x:370,y:40});

  rope3 = new Rope(6,{x:200,y:100});

  ground = new Ground(200,canH,600,20);
  
  blink.frameDelay = 20;
  eat.frameDelay = 30;
  sad.frameDelay = 30;

  bunny = createSprite(170,canH -80,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking', blink);
  bunny.addAnimation('eating', eat);
  bunny.addAnimation('crying', sad);
  bunny.changeAnimation('blinking');

  blower = createImg('blower.png');
  blower.position(10,250);
  blower.size(150,100);
  blower.mouseClicked(airblow);

  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  fruit_con2 = new Link(rope2,fruit);

  fruit_con3 = new Link(rope3,fruit);

  mute_btn = createImg('mute.png');
  mute_btn.position(450,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,displayWidth+80,displayHeight);

  push();

  imageMode(CENTER);
  if (fruit != null) {
    image(food,fruit.position.x,fruit.position.y,70,70);
  }

  pop();

  rope.show();
  rope2.show();
  rope3.show();
  Engine.update(engine);
  ground.show();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
    eating_sound.play();
  }


  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    fruit=null;
     
   }

  drawSprites();
}

function drop()
{
  cut_sound.play();
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 

}

function drop2()
{
  cut_sound.play();
  rope2.break();
  fruit_con2.dettach();
  fruit_con2 = null; 

}

function drop3()
{
  cut_sound.play();
  rope3.break();
  fruit_con3.dettach();
  fruit_con3 = null; 

}

function airblow() { 
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0}); 
  air.play();

}

function mute() {
  if (bk_song.isPlaying()) {
    bk_song.stop();
  } else {
    bk_song.play();
  }
  }


function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}

