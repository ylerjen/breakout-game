import {
    isTouchingBottom,
    isTouchingLeft,
    isTouchingRight,
    isTouchingTop,
} from '../helpers/position.helper';
import { Coordinate } from './coordinate';

export class Ball {
    /**
     * The current position of the ball in the canvas (is the center of the ball)
     */
    position: Coordinate;

    /**
     * The direction in which the ball is moving
     */
    direction: Coordinate = {
        x: 2,
        y: -2,
    };

    constructor(
        private readonly _radius: number,
        private color: string,
        public initialPos: Coordinate = { x: 0, y: 0 }
    ) {}

    /**
     * Get the radius of the current ball
     */
    get radius(): number {
        return this._radius;
    }

    /**
     * Get the highest position of the ball in its superficy
     */
    get highestY(): number {
        return this.position.y - this.radius;
    }

    /**
     * Get the lowest position of the ball in its superficy
     */
    get lowestY(): number {
        return this.position.y + this.radius;
    }

    /**
     * Get the leftist position of the ball in its superficy
     */
    get leftestX(): number {
        return this.position.x - this.radius;
    }

    /**
     * Get the rightist position of the ball in its superficy
     */
    get rightestX(): number {
        return this.position.x + this.radius;
    }

    /**
     * Draw the ball in the canvas at a given position
     */
    draw(ctx: CanvasRenderingContext2D, pos: Coordinate): void {
        this.position = pos;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    /**
     * Get the next ball position for the move
     */
    calculateNextBallPosition(canvas: HTMLCanvasElement): Coordinate {
        const r = this.radius;
        let x = this.position.x;
        let y = this.position.y;
        if (
            isTouchingLeft(this.leftestX) ||
            isTouchingRight(canvas, this.rightestX)
        ) {
            this.rebounce('x');
        }
        if (
            isTouchingTop(this.highestY) ||
            isTouchingBottom(canvas, this.lowestY)
        ) {
            this.rebounce('y');
        }

        x += this.direction.x;
        y += this.direction.y;

        return { x, y };
    }

    /**
     * Indicate a rebounce in a direction
     */
    rebounce(axe: 'x' | 'y'): void {
        if (axe === 'y') {
            this.direction.y = -this.direction.y;
        } else if (axe === 'x') {
            this.direction.x = -this.direction.x;
        }
    }
}
