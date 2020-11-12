import {Feed} from './Feed';
import {Herd} from './Herd';
import {PigAssociateStatus} from './PigAssociateStatus';
import {TreatmentVacxins} from './TreatmentVacxins';

export class Pig {
    id: number;
    description: string;
    isDeleted: boolean;
    code: string;
    spec: string;
    gender: number;
    weight: number;
    color: string;
    fatherId: number;
    motherId: number;
    importDate: string;
    exportDate: string;
    pigFeed: Feed;
    pigHerd: Herd;
    PigAssociateStatus: PigAssociateStatus[] = [];
    TreatmentVacxins: TreatmentVacxins[] = [];
}
