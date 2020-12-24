import { ready, on } from './bottlecap/dom.js';
import { createCanvas, clearCanvas, screenToCanvas } from './bottlecap/canvas.js';
import { resolveCollision } from './bottlecap/collisions.js';

const app = () => {

  const { cnv, ctx } = createCanvas();

  document.body.appendChild(cnv);

  const mouse = { x: 0, y: 0, isDown: false };

  const midW = Math.round(cnv.width / 2), midH = Math.round(cnv.height / 2);

  const rectA = { x: 0, y: 0, w: 20, h: 20 },

        rectB = { x: midW, y: midH, w: 60, h: 60 };

  const gameloop = () => {

    requestAnimationFrame(gameloop);

    clearCanvas(ctx);

    rectA.x = mouse.x - Math.round(rectA.w / 2);

    rectA.y = mouse.y - Math.round(rectA.h / 2);

    resolveCollision(rectB, rectA);

    ctx.fillStyle = '#fff';

    ctx.fillRect(rectA.x, rectA.y, rectA.w, rectA.h);

    ctx.strokeStyle = '#fff';

    ctx.strokeRect(rectB.x, rectB.y, rectB.w, rectB.h);
  
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
