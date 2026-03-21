import { Document } from "mongoose";
interface IKeyBoard extends Document {
    name: string;
    price: number;
    image: string;
    stock: number;
    category: string;
    brand: string;
    switchType: string;
    layout: string;
    description: string;
    isFeatured: boolean;
}
declare const keyboardModel: import("mongoose").Model<IKeyBoard, {}, {}, {}, Document<unknown, {}, IKeyBoard, {}, import("mongoose").DefaultSchemaOptions> & IKeyBoard & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IKeyBoard>;
export default keyboardModel;
//# sourceMappingURL=keyboard.model.d.ts.map