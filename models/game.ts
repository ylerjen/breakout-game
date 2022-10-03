import { Subscription } from 'rxjs';
import { leftArrowKey } from '../constants/keycode';
import { isTouchingBottom } from '../helpers/position.helper';
import { Ball } from './ball';
import { Coordinate } from './coordinate';
import { EventManager } from './event-manager';
import { Paddle } from './paddle';

export class Game {
    static instance: Game;

    private ball: Ball;
    private ballPosition: Coordinate;
    private paddle: Paddle;
    private paddlePosition: Coordinate;
    private eventManager: EventManager;
    private intervalId: number;
    private subs$ = new Subscription();

    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor(
        canvasId: string,
        ball: Ball,
        paddle: Paddle,
        em: EventManager
    ) {
        if (Game.instance) {
            return Game.instance;
        }
        this.ball = ball;
        this.paddle = paddle;
        this.eventManager = em;
        this.canvas = <HTMLCanvasElement>document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');

        Game.instance = this;
        return this;
    }

    listenToEvents(): void {
        this.subs$.add(
            this.eventManager.rightLeftKeyDown$.subscribe((key) => {
                this.paddlePosition.x =
                    key === leftArrowKey
                        ? this.paddle.nextLeftPosition()
                        : this.paddle.nextRightPosition(this.canvas);
            })
        );
    }

    removeListeners(): void {
        this.subs$.unsubscribe();
    }

    /**
     * get the intial position of the ball at game start
     */
    get initialBallPosition(): Coordinate {
        return {
            x: this.canvas.width / 2,
            y: this.canvas.height - 30,
        };
    }

    /**
     * get the intial position of the ball at game start
     */
    get initialPaddlePosition(): Coordinate {
        return {
            x: (this.canvas.width - this.paddle.width) / 2,
            y: this.canvas.height - 30,
        };
    }

    movePaddle(xOffset: number): void {
        this.paddlePosition.x += xOffset;
    }

    /**
     * Clear the whole canvas zone
     */
    clearCanvas(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Start the game by animating the ball
     */
    start(): void {
        document.getElementById('overlay').classList.add('hidden');
        this.listenToEvents();
        this.ballPosition = this.initialBallPosition;
        this.paddlePosition = this.initialPaddlePosition;
        this.intervalId = setInterval(() => this.reDrawBoard(), 10);
    }

    /**
     * End the game
     */
    end(): void {
        document.getElementById('overlay').classList.remove('hidden');
        this.removeListeners();
        clearInterval(this.intervalId);
        // release our intervalID from the variable
        this.intervalId = null;
    }

    /**
     * Redraw every elements in the play zone
     */
    reDrawBoard(): void {
        this.clearCanvas();
        this.ball.draw(this.ctx, this.ballPosition);
        this.paddle.draw(this.ctx, this.paddlePosition);
        this.ballPosition = this.ball.calculateNextBallPosition(this.canvas);

        if (isTouchingBottom(this.canvas, this.ball.lowestY)) {
            this.end();
        } else if (this.paddle.isHittingPaddle(this.ballPosition)) {
            console.info('paddle touched');
            this.ball.rebounce('y');
            this.ballPosition = this.ball.calculateNextBallPosition(
                this.canvas
            );
        }
    }
}
