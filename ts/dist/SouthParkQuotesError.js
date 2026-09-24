"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SouthParkQuotesError = void 0;
class SouthParkQuotesError extends Error {
    isSouthParkQuotesError = true;
    sdk = 'SouthParkQuotes';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.SouthParkQuotesError = SouthParkQuotesError;
//# sourceMappingURL=SouthParkQuotesError.js.map