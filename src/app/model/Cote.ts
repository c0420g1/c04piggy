import {Herd} from './Herd';
import {Employee} from './Employee';

export class Cote {
    id: number;
    description: string;
    isDeleted: false;
    code: string;
    importDate: Date;
    exportDate: Date;
    quantity: number;
    type: string;
    employee: Employee;
    herd: Herd;
}
