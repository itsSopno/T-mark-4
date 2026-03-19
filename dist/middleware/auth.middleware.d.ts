import type { Request, Response, NextFunction } from "express";
/**
 * Custom request interface to include user object
 */
export interface CustomRequest extends Request {
    user?: any;
}
/**
 * Middleware to authenticate user via JWT token
 */
export declare const authUser: (req: CustomRequest, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
//# sourceMappingURL=auth.middleware.d.ts.map