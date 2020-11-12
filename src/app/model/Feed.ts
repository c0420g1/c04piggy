import {FeedType} from './FeedType';
import {Herd} from './Herd';

export class Feed {
    id: number;
    description: string;
    isDelete: number;
    amount: number;
    code: string;
    unit: string;
    feedType: FeedType;
    heard: Herd;
}
