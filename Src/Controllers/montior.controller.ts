import type { Request, Response } from 'express';
import MonitorModel from '../Models/montior.model.js'

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

        }))
    }
}