import { Request, Response, NextFunction } from 'express';
import user from '../services/user.services';
import createError from 'http-errors';

class UserController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await user.create(req.body);
            res.status(200).json({
                status: 200,
                message: "Account registration successful",
                data
            });
        } catch (e: any) {
            next(createError(e.statusCode || 500, e.message));
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await user.login(req.body);
            res.status(200).json({
                status: 200,
                message: "Account login successful",
                data
            });
        } catch (e: any) {
            next(createError(e.statusCode, e.message));
        }
    }

    static async all(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await user.all();
            res.status(200).json({
                status: 200,
                message: 'All users',
                data: users
            });
        } catch (e: any) {
            next(createError(e.statusCode, e.message));
        }
    }

    static async one(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await user.one(parseInt(req.params.id));
            if (!data) throw createError.NotFound('User not found');
            res.status(200).json({
                status: 200,
                message: 'User',
                data: data
            });
        } catch (e: any) {
            next(createError(e.statusCode, e.message));
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await user.update(parseInt(req.params.id), req.body);
            if (!data) throw createError.NotFound('User not found');
            res.status(200).json({
                status: 200,
                message: 'User updated',
                data: data
            });
        } catch (e: any) {
            next(createError(e.statusCode, e.message));
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await user.delete(parseInt(req.params.id));
            if (!data) throw createError.NotFound('User not found');
            res.status(200).json({
                status: 200,
                message: 'User deleted',
                data: data
            });
        } catch (e: any) {
            next(createError(e.statusCode, e.message));
        }
    }
}

export default UserController;