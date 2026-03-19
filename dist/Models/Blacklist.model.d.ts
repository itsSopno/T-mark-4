import { Document, Model } from "mongoose";
export interface IBlacklist extends Document {
    token: String;
    createdAt?: Date;
    updatedAt?: Date;
}
declare const tokenBlacklistModel: Model<IBlacklist>;
export default tokenBlacklistModel;
//# sourceMappingURL=Blacklist.model.d.ts.map