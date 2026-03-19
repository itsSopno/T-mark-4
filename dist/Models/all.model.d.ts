import { Document } from "mongoose";
interface IProduct extends Document {
    name: String;
    price: Number;
    image: String;
    category: String;
    description: String;
    brand: String;
    stock: String;
}
declare const productModel: import("mongoose").Model<IProduct, {}, {}, {}, Document<unknown, {}, IProduct, {}, import("mongoose").DefaultSchemaOptions> & IProduct & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IProduct>;
export default productModel;
//# sourceMappingURL=all.model.d.ts.map