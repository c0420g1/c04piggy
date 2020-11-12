import {Cote} from './Cote';
import {Pig} from './Pig';
import {Diseases} from './Diseases';
import {Vaccine} from './Vaccine';

export class TreatmentVacxins {
    id: number;
    description: string;
    isDeleted: number;
    treatDate: string;
    type: string;
    veterinary: string;
    cote: Cote;
    pig: Pig;
    diseases: Diseases;
    vacxin: Vaccine;
}
