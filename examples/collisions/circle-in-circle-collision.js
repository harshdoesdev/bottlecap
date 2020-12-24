import { ready, on } from './bottlecap/dom.js';
import { createCanvas, clearCanvas, screenToCanvas } from './bottlecap/canvas.js';
import { circleInCircle } from './bottlecap/collisions.js';

const app = () => {

  const { cnv, ctx } = createCanvas();

  document.body.appendChild(cnv);

  const mouse = { x: 0, y: 0, isDown: false };

  const midW = Math.round(cnv.width / 2), midH = Math.round(cnv.height / 2);

  const circleA = { x: midW, y: midH, radius: 20 };

  const gameloop = () => {

    requestAnimationFrame(gameloop);

    clearCanvas(ctx);

    ctx.beginPath();

    ctx.arc(circleA.x, circleA.y, circleA.radius, 0, Math.PI * 2);

    const isColliding = circleInCircle(circleA.x, circleA.y, circleA.radius, mouse.x, mouse.y, 10);
    
    ctx.strokeStyle = isColliding ? 'red' : 'green';

    ctx.stroke();

    ctx.closePath();

    ctx.beginPath();

    ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2);

    ctx.fillStyle = '#fff';

    ctx.fill();

    ctx.closePath();
  
  };
  
  requestAnimationFrame(gameloop);

  const handleMouseInput = ({ type, clientX, clientY }) => {

    Object.assign(mouse, screenToCanvas(cnv, clientX, clientY));

    mouse.isDown = type === 'mousedown';

  };

  on(cnv, 'mousedown', handleMouseInput);

  on(cnv, 'mouseup', handleMouseInput);

  on(cnv, 'mousemove', handleMouseInput);

};

ready(app);
