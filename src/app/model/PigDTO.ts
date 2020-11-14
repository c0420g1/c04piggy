import { PigAssociateStatus } from './PigAssociateStatus';

export class PigDTO {
    id: number;
    code: string;
    coteName: string;
    importDate: string;
    pigAssociateStatus: PigAssociateStatus[] = [];
    weight: number;
}
