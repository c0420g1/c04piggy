import {Herd} from './Herd';

export class Cote {
    id: number;
    description: string;
    isDeleted: boolean;
    code: string;
    importDate: string;
    exportDate: string;
    quantity: number;
    type: string;
    employeeId: number;
    herd: Herd;
}
