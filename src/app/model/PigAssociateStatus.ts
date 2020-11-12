import {Pig} from './Pig';
import {PigStatus} from './PigStatus';

export class PigAssociateStatus {
    id: number;
    description: string;
    isDeleted: boolean;
    pig: Pig;
    pigStatus: PigStatus;
}
