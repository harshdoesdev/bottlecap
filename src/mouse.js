import { on } from "./dom.js";

export const Mouse = {
    x: 0,
    y: 0,
    isDown: false
};

const handleMouse = ({ clientX, clientY, type }) => {
    Mouse.x = clientX;
    Mouse.y = clientY;
    Mouse.isDown = type === 'mousedown';
};

const handleMouseMove = ({ clientX, clientY }) => {
    Mouse.x = clientX;
    Mouse.y = clientY;
};

on(window, 'mousedown', handleMouse);
on(window, 'mouseup', handleMouse);
on(window, 'mousemove', handleMouseMove);
