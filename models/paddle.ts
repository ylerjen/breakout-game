import { Coordinate } from './coordinate';

export class Paddle {
    /**
     * Is the position of the paddle. The coordinate points to
     * the top/left pixel of the bar
     */
    position: Coordinate;

    constructor(
        public readonly height = 10,
        public readonly width = 75,
        public readonly moveSpeed = 10
    ) {}

    draw(ctx: CanvasRenderingContext2D, pos: Coordinate) {
        this.position = pos;
        ctx.beginPath();
        ctx.rect(pos.x, pos.y, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.closePath();
    }

    nextRightPosition(canvas: HTMLCanvasElement): number {
        return Math.min(
            this.position.x + this.moveSpeed,
            canvas.width - this.width
        );
    }

    nextLeftPosition(): number {
        return Math.max(this.position.x - this.moveSpeed, 0);
    }

    isHittingPaddle(pos: Coordinate): boolean {
        const isAtPaddleLevelInY = pos.y > this.position.y;
        if (this._isPositionOnPaddleX(pos) && isAtPaddleLevelInY) return true;
        else return false;
    }

    private _isPositionOnPaddleX(pos: Coordinate): boolean {
        return pos.x > this.position.x && pos.x < this.position.x + this.width;
    }
}
