import { PigAssociateStatus } from './PigAssociateStatus';

export class PigDTO {
    pigId: number;
    cote: string;
    importDate: string;
    weight: number;
    status: PigAssociateStatus[];
}
