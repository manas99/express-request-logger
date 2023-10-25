import { Log } from '../../types';


export interface LogHandler {
    handle(log: Log): void
}
