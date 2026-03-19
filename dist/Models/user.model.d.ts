import { Document, Model } from "mongoose";
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}
declare const userModel: Model<IUser>;
export default userModel;
//# sourceMappingURL=user.model.d.ts.map