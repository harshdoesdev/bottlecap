# bottlecap.js - A Minimalist 2D Game Framework

## Examples:

### createCanvas
```javascript
import { createCanvas } from './bottlecap/canvas.js';

const { cnv, ctx, clearCanvas } = createCanvas(800, 600, 'white'); 

document.body.appendChild(cnv);

clearCanvas(); // to clear the canvas
```

### startApp
```javascript 
import { createCanvas } from './bottlecap/canvas.js';
import { startApp } from './bottlecap/app.js';

class App {

  init() {
    const { cnv, ctx, clearScreen } = createCanvas();
    this.cnv = cnv;
    this.ctx = ctx;
    this.clearScreen = clearScreen;
    
    document.body.appendChild(this.cnv);
  }
  
  update(timestamp, frame) {
  
  
  }
  
  render() {
    this.clearScreen();
  
  }

}

const app = new App();

startApp(app, 60);
```
