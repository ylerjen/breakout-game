import './style.css';
import { Ball } from './models/ball';
import { Game } from './models/game';
import { Paddle } from './models/paddle';
import { EventManager } from './models/event-manager';

const canvasId = 'gaming-zone';
document.getElementById('play').addEventListener('click', () => {
    game.start();
});

const em = new EventManager();
const paddle = new Paddle();
const ball = new Ball(10, '#0095DD');
const game = new Game(canvasId, ball, paddle, em);
