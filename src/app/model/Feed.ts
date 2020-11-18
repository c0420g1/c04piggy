import {Herd} from './Herd';
import {FeedType} from './FeedType';

export class Feed {
    id: number;
    description: string;
    isDelete: number;
    amount: number;
    code: string;
    unit: string;
    feedTypeName: string;
    feedTypeId: number;
    herdName: string;
    herdId: number;
    herd : Herd;
    feedType : FeedType;
}
