export function isTouchingTop(p: number): boolean {
    return p < 0;
}

export function isTouchingBottom(
    canvas: HTMLCanvasElement,
    p: number
): boolean {
    return p > canvas.height;
}

export function isTouchingRight(
    canvas: HTMLCanvasElement,
    position: number
): boolean {
    return position > canvas.width;
}

/**
 * Check if the given position is touching the left wall (x = 0)
 * @param p - the position to evaluate
 */
export function isTouchingLeft(p: number): boolean {
    return p < 0;
}
