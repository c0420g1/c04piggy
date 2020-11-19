import { PigAssociateStatus } from './PigAssociateStatus';

export class PigDTO {
    pigId: number;
    codePig: string;
    cote: string;
    importDate: string;
    weight: number;
    status: PigAssociateStatus[];
}
