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
//# sourceMappingURL=auth.controller.d.ts.map