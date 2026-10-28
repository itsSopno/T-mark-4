import type {Request , Response} from 'express';
import {GraphicsCard} from '../Models/graphisCard.model.js';
 
/**
 * @name createGraphicsCardCollectionController
 * @desc create graphics card collection
 * @acess private
 * 
 */
export const createGaphicsCardCollectionController = async(req:Request, res:Response) =>{
    try{
        const products = Array.isArray(req.body)? req.body:[req.body];
        const processedProducts = products.map(p =>({
            name:p.name,
            price:p.price?? 300,
            oldPrice:p.oldPrice?? 0,
            image:p.image,
            iamges:p.iamges?? [],
            stock:p.stock?? 100,
            brand:p.brand?? "Tech Gear",
            model:p.model?? "GTX 1080",
            vramSize:p.vramSize?? 8,
            vramType:p.vramType?? "GDDR5X",
            coreClock:p.coreClock?? 1607,
            boostClock:p.boostClock?? 1733,
            powerConnectors:p.powerConnectors?? ["8-pin"],
            displayOutputs:p.displayOutputs?? ["HDMI", "DisplayPort", "DVI"],
            rayTracing:p.rayTracing?? false,
            dlss:p.dlss?? false,
            description:p.description?? "High-end graphics card for gaming and professional applications.",
            isFeatured:p.isFeatured?? false,
            port:p.port?? "PCIe 3.0"
        
        }))
        for(const p of processedProducts){
            if(!p.name || !p.image || !p.description){
                return res.status(400).json({message:"Missing required fields (name, image, or description) in one or more items."})
            }
        }
        const graphicsCards = await GraphicsCard.create(processedProducts);
        res.status(201).json({message:"Graphics cards created successfully.", graphicsCards});
    } catch (error) {
        console.error("Error creating graphics card collection:", error);
        res.status(500).json({message:"Internal server error."});
    }
}