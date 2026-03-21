import { Document } from "mongoose";
export interface IKeycaps extends Document {
    name: String;
    image: String;
    description: String;
    price: Number;
    brand: String;
}
declare const KeycapsModel: import("mongoose").Model<IKeycaps, {}, {}, {}, Document<unknown, {}, IKeycaps, {}, import("mongoose").DefaultSchemaOptions> & IKeycaps & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IKeycaps>;
export default KeycapsModel;
//# sourceMappingURL=keycaps.model.d.ts.map