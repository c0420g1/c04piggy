import { PigAssociateStatus } from './PigAssociateStatus';

export class PigDTO {
    pigId: number;
    codePig: string;
    coteName: string;
    importDate: string;
    weight: number;
    status: PigAssociateStatus[];
}
