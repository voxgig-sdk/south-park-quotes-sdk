import { SouthParkQuotesEntityBase } from '../SouthParkQuotesEntityBase';
import type { SouthParkQuotesSDK } from '../SouthParkQuotesSDK';
import type { Control } from '../types';
import type { Quote, QuoteLoadMatch, QuoteListMatch } from '../SouthParkQuotesTypes';
declare class QuoteEntity extends SouthParkQuotesEntityBase<Quote> {
    constructor(client: SouthParkQuotesSDK, entopts: any);
    make(this: QuoteEntity): QuoteEntity;
    load(this: any, reqmatch?: QuoteLoadMatch, ctrl?: Control): Promise<QuoteEntity>;
    list(this: any, reqmatch?: QuoteListMatch, ctrl?: Control): Promise<QuoteEntity[]>;
}
export { QuoteEntity };
