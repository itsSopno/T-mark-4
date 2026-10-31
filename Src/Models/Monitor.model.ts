import { Schema, model } from "mongoose";
 
export interface IMonitor {
    name: string;
    price: number;
    oldPrice?: number;
    image: string;
    images: string[];
    stock: number;
    category: string;
    brand: string;
    description: string;
    features: string[];
    isFeatured: boolean;
 
    // Specifications
    panelSize: number;
    panelType: string;
    resolution: string;
    refreshRate: number;
    responseTime: number;
    colorGamut: string;
    brightness: number;
    contrastRatio: string;
    viewingAngle: string;
    hdr: string;
    syncTechnology: string;
    ports: string[];
    vesaMount: string;
    standAdjustment: string;
    warranty: string;
}
 
const monitorSchema = new Schema<IMonitor>(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            default: 22500
        },
        oldPrice: {
            type: Number
        },
        image: {
            type: String,
            required: true
        },
        images: {
            type: [String],
            default: []
        },
        stock: {
            type: Number,
            default: 100
        },
        category: {
            type: String,
            required: true,
            default: "Monitors"
        },
        brand: {
            type: String,
            required: true,
            default: "KOORUI"
        },
        description: {
            type: String,
            required: true
        },
        features: {
            type: [String],
            default: []
        },
        isFeatured: {
            type: Boolean,
            default: false
        },
 
        // Specifications
        panelSize: {
            type: Number,
            default: 24
        },
        panelType: {
            type: String,
            default: "Fast IPS"
        },
        resolution: {
            type: String,
            default: "2560x1440"
        },
        refreshRate: {
            type: Number,
            default: 180
        },
        responseTime: {
            type: Number,
            default: 1
        },
        colorGamut: {
            type: String,
            default: "~90-95% DCI-P3"
        },
        brightness: {
            type: Number,
            default: 350
        },
        contrastRatio: {
            type: String,
            default: "1000:1"
        },
        viewingAngle: {
            type: String,
            default: "178/178"
        },
        hdr: {
            type: String,
            default: "HDR400"
        },
        syncTechnology: {
            type: String,
            default: "Adaptive Sync"
        },
        ports: {
            type: [String],
            default: ["2 x HDMI 2.0", "1 x DisplayPort 1.4", "Audio Out"]
        },
        vesaMount: {
            type: String,
            default: "75x75 mm"
        },
        standAdjustment: {
            type: String,
            default: "Tilt"
        },
        warranty: {
            type: String,
            default: "3 Years"
        }
    },
    { timestamps: true }
);
 
export const Monitor = model<IMonitor>("Monitor", monitorSchema);
 