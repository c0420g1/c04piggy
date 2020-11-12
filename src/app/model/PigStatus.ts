import {PigAssociateStatus} from './PigAssociateStatus';

export class PigStatus {
    id: number;
    description: string;
    isDeleted: boolean;
    name: string;
    pigAssociateStatus: PigAssociateStatus[] = [];
}
