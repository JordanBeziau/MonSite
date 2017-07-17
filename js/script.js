document.addEventListener("DOMContentLoaded", () => {
  // properties
  const props = {
    color: '#cae5eb',
    lineDistance: 75,
    numParticles : 150
  };

  // Code to actually run canvas stuff
  const header = $('.canvas-int'),
  canvas = $('<canvas></canvas>').appendTo(header)[0],

  ctx = canvas.getContext('2d');
  //ctx    = canvas.getContext('2d').scale(2,2),
  // idle   = null, mousePosition;
  ctx.scale(2,2);

  canvas.width = window.innerWidth * 2;
  canvas.height = header.outerHeight() * 2;
  canvas.style.width = window.innerWidth+"px";
  canvas.style.height = header.outerHeight()+"px";
  canvas.style.display = 'block';

  ctx.fillStyle = props.color;
  //ctx.lineWidth = .5;
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = props.color;

  // var dotNum = props.numParticles;
  var mousePosition = { x: 30 * canvas.width / 100, y: 30 * canvas.height / 100 },
  //dots = { nb: 600, distance: 80, d_radius: 3000, array: [] };
  dots = { nb: props.numParticles, distance: props.lineDistance, d_radius: 3000, array: [] };

  function Dot() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.vx = -.5 + Math.random();
    this.vy = -.5 + Math.random();

    this.radius = Math.random();
  }

  Dot.prototype = {
    create: function() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fill();
    },

    animate: function() {

      for (let i = 0, dot=false; i < dots.nb; i++) {

        dot = dots.array[i];

        if (dot.y < 0 || dot.y > canvas.height) {
          dot.vx = dot.vx;
          dot.vy = - dot.vy;
        } else if (dot.x < 0 || dot.x > canvas.width) {
          dot.vx = - dot.vx;
          dot.vy = dot.vy;
        }
        dot.x += dot.vx;
        dot.y += dot.vy;
      }
    },

    line: function() {
      for (let i = 0; i < dots.nb; i++) {
        for (let j = 0; j < dots.nb; j++) {
          i_dot = dots.array[i];
          j_dot = dots.array[j];

          if ((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > - dots.distance && (i_dot.y - j_dot.y) > - dots.distance) {
            if ((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > - dots.d_radius && (i_dot.y - mousePosition.y) > - dots.d_radius) {
              ctx.beginPath();
              ctx.moveTo(i_dot.x, i_dot.y);
              ctx.lineTo(j_dot.x, j_dot.y);
              ctx.stroke();
              ctx.closePath();
            }
          }
        }
      }
    }
  };

  function createDots() {
    requestAnimationFrame(createDots);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < dots.nb; i++) {
      dots.array.push(new Dot());
      dot = dots.array[i];

      dot.create();
    }

    dot.line();
    dot.animate();
  }
  createDots();

  // idle = setInterval(createDots, 1000/30);

  /*$(canvas).on('mousemove mouseleave', function(e){
  if(e.type == 'mousemove'){
  mousePosition.x = e.pageX;
  mousePosition.y = e.pageY;
}
if(e.type == 'mouseleave'){
mousePosition.x = canvas.width / 2;
mousePosition.y = canvas.height / 2;
}
});*/


let prevScroll, invPrevScroll, translateY = 50;
const title = $('.header-title');
const fadeHeaderOnScroll = () => {
  const scrollPosition = $(window).scrollTop();
  if (scrollPosition <= 400 && scrollPosition > 0) {
    if (prevScroll) {
      if (scrollPosition > prevScroll) {
        header.css("opacity", (invPrevScroll - 25) * 0.0025);
        //title.css("transform", "translate3d(-50%, " + translateY-- + "%, 0)");
      } else {
        header.css("opacity", (invPrevScroll + 25) * 0.0025);
        //title.css("transform", "translate3d(-50%, " + translateY++ + "%, 0)");
      }
    }
  }
  prevScroll = scrollPosition;
  invPrevScroll = 350 - prevScroll;
};

fadeHeaderOnScroll();
$(window).on('scroll', fadeHeaderOnScroll);

const rotateOnMouseMouse = (event) => {

  const width = $(window).innerWidth(),
    height = header.innerHeight();

  const cursorPosX = event.clientX,
    cursorPosY = event.clientY;

  const operatorX = (cursorPosX - width / 2),
    operatorY = (cursorPosY - height / 2);

  if (cursorPosX > width / 2 && cursorPosY > (height / 2)) {
    rotateCanvas(operatorY * 0.04, operatorX * 0.02);

  } else if (cursorPosX > width / 2 && cursorPosY <= (height / 2)) {
    rotateCanvas(360 - operatorY * -0.04, operatorX * 0.02);

  } else if (cursorPosX <= width / 2 && cursorPosY > (height / 2)) {
    rotateCanvas(operatorY * 0.04, 360 - operatorX * -0.02);

  } else {
    rotateCanvas(360 - operatorY * -0.04, 360 - operatorX * -0.02);
  }

};

function rotateCanvas(X, Y) {
  $("canvas").css("transform", "rotateX(" + X + "deg) rotateY(" + Y + "deg) scale(1.1)");
}

header.on("mouseover, mousemove", rotateOnMouseMouse);


});
