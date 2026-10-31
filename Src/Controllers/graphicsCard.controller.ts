import type {Request , Response} from 'express';
import {GraphicsCard} from '../Models/graphisCard.model.js';
 
/**
 * @name createGraphicsCardCollectionController
 * @desc create graphics card collection
 * @acess private
 * 
 */
export const createGaphicsCardCollectionController = async(req:Request, res:Response):Promise<Response> =>{
    try{
        const products = Array.isArray(req.body)? req.body:[req.body];
        const processedProducts = products.map(p =>({
            name:p.name,
            price:p.price?? 300,
            oldPrice:p.oldPrice?? 0,
            image:p.image,
            images:p.images?? [],
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
        return res.status(201).json({message:"Graphics cards created successfully.", graphicsCards});
    } catch (error) {
        console.error("Error creating graphics card collection:", error);
        return res.status(500).json({message:"Internal server error."});
    }
}

/*** 
 * @name getAllGraphicsCards
 * @desc get all graphics card collection by this
 * @access public
*/

export const getAllGraphicsCards = async(req:Request, res:Response):Promise<Response> =>{
    try{
        const {category, brand, searchTerm} = req.query;
        let query:any = {};
        if(category) query.category = category;
        if(brand) query.brand = brand;
        if(searchTerm){
            query.$or = [
                {name:{$regex:searchTerm, $options:"i"}},
                {description:{$regex:searchTerm, $options:"i"}}
            ]
        }
        const graphicsCards = await GraphicsCard.find(query);
        return res.status(200).json({message:"Graphics cards fetched successfully.", graphicsCards});
    }
    catch(error){
        console.error("Error fetching graphics cards:", error);
        return res.status(500).json({message:"Internal server error."});
    }
}

/**
 * @name getSingleGraphicsCard
 * @desc get a single graphics card
 * @access public
 */

export const getSingleGraphicsCard = async(req:Request, res:Response):Promise<Response> =>{
    try{
        const {id} = req.params;
        const graphicsCard = await GraphicsCard.findById(id);
        if(!graphicsCard){
            return res.status(404).json({message:"Graphics card not found."});
        }
        return res.status(200).json({message:"Graphics card fetched successfully.", graphicsCard});
    } catch (error) {
        console.error("Error fetching graphics card:", error);
        return res.status(500).json({message:"Internal server error."});
    }
}