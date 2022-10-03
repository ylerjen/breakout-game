import { filter, fromEvent, map, Observable } from 'rxjs';
import { leftArrowKey, RightArrowKey } from '../constants/keycode';
import { Paddle } from './paddle';

export class EventManager {
    rightLeftKeyDown$: Observable<string>;

    constructor() {
        this.registerPaddleMoves();
    }

    registerPaddleMoves() {
        this.rightLeftKeyDown$ = fromEvent(document, 'keydown').pipe(
            map((evt: KeyboardEvent) => evt.key),
            filter((key) => [RightArrowKey, leftArrowKey].includes(key))
        );
    }
}
