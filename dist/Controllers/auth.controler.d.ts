import type { Request, Response } from "express";
import { type CustomRequest } from "../middleware/auth.middleware.js";
/**
 * @name registerUserController
 * @desc register a new user
 * @route POST /api/v1/auth/register
 * @access public
 */
export declare const registerUserController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/***
 * @NAME loginuser Controll
 * @desc login a user
 * @access public
 */
export declare const LoginUserController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * @name logoutUserCotroller
 * @desc logout a user
 * @access public
*/
export declare const logoutUserController: (req: Request, res: Response) => Promise<Response>;
/***
 * @name getMe controller
 * @desc get user profile
 * @access private
 */
export declare const getMeController: (req: CustomRequest, res: Response) => Promise<Response | void>;
/**
 * @name createKeyboardCollectionControler
 * @desc create keyboard collection
 * @access public
 */
export declare const createKeyboardCollectionControler: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * @name getallkeybaord
 * @desc get all keyboard collection
 * @access public
 */
export declare const getAllKeyboards: (req: Request, res: Response) => Promise<Response>;
/**
 * @name getSingleKeyboard
 * @desc get a single keyboard
 * @access public
 */
export declare const getSingleKeyboard: (req: Request, res: Response) => Promise<Response>;
/**
 * @name CreateAllProductController
 * @desc for all product
 * @access public
 */
export declare const CreateAllProductController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * @name getallProduct
 * @desc get all product from here
 * @acess public
 */
export declare const getAllProduct: (req: Request, res: Response) => Promise<Response>;
/**
 * @name getSingleProductController
 * @desc for every single product
 * @access Public
 */
export declare const getSingleProductController: (req: Request, res: Response) => Promise<Response>;
//# sourceMappingURL=auth.controler.d.ts.map