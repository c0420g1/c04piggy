import {FeedType} from './FeedType';
import {Vendor} from './Vendor';


export class Stock {
    id: number;
    description: string;
    isDeleted: boolean;
    expDate: string;
    importDate: string;
    mfgDate: string;
    quantity: string;
    shipmentCode: string;
    unit: string;
    feedType: FeedType;
    vendor: Vendor;
}
