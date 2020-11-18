import {Employee} from './Employee';
import {Cote} from './Cote';
import {Stock} from './Stock';

export class HistoryExport {
    id: number;
    isDeleted: false;
    description: string;
    type: string;
    quantity: number;
    unit: string;
    company: string;
    receivedEmployeeId: number;
    exportDate: string;
    stock: Stock;
    cote: Cote;
    employee: Employee;


}
