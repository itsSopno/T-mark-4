import type { Request, Response } from 'express';
import {Monitor} from '../Models/Montior.model.js'

/** 
 * @name createMonitorCollectionController
 * @desc create monitor collection
 * @access public
 */
export const createMonitorCollectionController = async(req:Request, res:Response) => {
    try{
        const products = Array.isArray(req.body) ? req.body:[req.body];
        const processedProducts = products.map(p => ({
            name:p.name,
            price:p.price?? 22500,
oldPrice:p.oldPrice?? 0,
            image:p.image,
            images:p.images?? [],
            stock:p.stock?? 100,
            category:p.category?? "Monitors",
            brand:p.brand?? "Tech Gear",
            description:p.description?? "High-end tech peripheral.",
            features:p.features?? [],
            isFeatured:p.isFeatured?? false,
            panelSize:p.panelSize?? 24,
            panelType:p.panelType?? "Fast IPS",
            resolution:p.resolution?? "2560x1440",
            refreshRate:p.refreshRate?? 144,
            responseTime:p.responseTime?? 1,
            colorGamut:p.colorGamut?? "sRGB 99%",
            connectivity:p.connectivity?? ["HDMI", "DisplayPort"],
            brightness:p.brightness?? 350,
            contrastRatio:p.contrastRatio?? "1000:1",
            viewingAngle:p.viewingAngle?? "178°/178°",
            hdr:p.hdr?? "HDR10",
            syncTechnology:p.syncTechnology?? "FreeSync",
            ports:p.ports?? ["HDMI", "DisplayPort", "USB-C"],
            vesaMount:p.vesaMount?? "100x100mm",
            standAdjustment:p.standAdjustment?? "Tilt, Swivel, Height",
            warranty:p.warranty?? "3 years"
        }))
        for (const p of processedProducts){
            if(!p.name || !p.image || !p.description){
                return res.status(400).json({message:"Missing required fields (name, image, or description) in one or more items."})
            }
        }
        const monitors = await Monitor.create(processedProducts);
        res.status(201).json({message:"Monitors created successfully.", monitors});
    } catch (error) {
        console.error("Error creating monitor collection:", error);
        res.status(500).json({message:"Internal server error."});
    }
}

/**
 * @name getAllMonitors
 * @desc get all monitor collection
 * @acess public 
 */

export const getAllMonitors = async(req:Request, res:Response):Promise<Response> =>{
    try{
        const { category, brand, searchTerm } = req.query;
        let query: any = {};

        if(category) query.category = category;
        if(brand) query.brand = brand;

        if(searchTerm){
            query.$or = [
                { name: { $regex: searchTerm, $options: "i" } },
                { description: { $regex: searchTerm, $options: "i" } }
            ]
        }       
        const monitors = await Monitor.find(query);
        return res.status(200).json({ monitors });
    } catch (error) {
        console.error("Error fetching monitors:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
}
