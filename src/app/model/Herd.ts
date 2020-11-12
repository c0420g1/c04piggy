import {Feed} from './Feed';
import {Cote} from './Cote';

export class Herd {
    id: number;
    description: string;
    isDeleted: boolean;
    name: string;
    feed: Feed[]= [];
    cote: Cote[]= [];
}
