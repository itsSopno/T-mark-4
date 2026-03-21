import type { Request, Response } from "express";
/**
 * @name createKeycapsCollectionController
 * @desc add every key caps
 * @route POST /api/keycaps
 * @access private
 */
export declare const createKeycapsCollectionController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * @name getaLLKeyCapsCollection Controller
 * @desc get all key caps
 * @route get/api/getkeycaps
 */
export declare const getAllKeyCapsCollectionController: (req: Request, res: Response) => Promise<Response>;
/**
 * @name getSingleKeycapController
 * @desc get single keycap
 * @route get/api/getkeycap/:id
 */
export declare const getSingleKeycapController: (req: Request, res: Response) => Promise<Response>;
/**
 * @name updateKeycapController
 * @desc update keycap
 * @route put/api/updatekeycap/:id
 */
export declare const updateKeycapController: (req: Request, res: Response) => Promise<Response>;
/**
 * @name deleteKeycapController
 * @desc delete keycap
 * @route delete/api/deletekeycap/:id
 */
export declare const deleteKeycapController: (req: Request, res: Response) => Promise<Response>;
//# sourceMappingURL=keycap.controller.d.ts.map