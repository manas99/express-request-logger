import { randomUUID } from 'crypto';

export function generateRandomUUID(removeHyphens: boolean = true) {
    let _uid: string = randomUUID();
    if (removeHyphens) {
        _uid = _uid.replace(/-/g, '');
    }
    return _uid;
}
