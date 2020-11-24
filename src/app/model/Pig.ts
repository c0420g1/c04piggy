import {Feed} from './Feed';
import {Herd} from './Herd';
import {PigAssociateStatus} from './PigAssociateStatus';
import {TreatmentVacxins} from './TreatmentVacxins';
import {Cote} from './Cote';

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
    importDate: Date;
    exportDate: Date;
    feed: Feed;
    herd: Herd;
    cote: Cote;
    PigAssociateStatus: PigAssociateStatus;
    TreatmentVacxins: TreatmentVacxins;
}
