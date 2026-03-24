import { Document, Model } from "mongoose";
export interface ITopProduct extends Document {
    name: string;
    price: number;
    image: string;
    category: string;
    description: string;
    brand: string;
    stock: number;
    tag?: string;
}
export declare const TopProduct: Model<ITopProduct>;
//# sourceMappingURL=Top.model.d.ts.map