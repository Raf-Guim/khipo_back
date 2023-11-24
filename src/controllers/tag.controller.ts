import { Request, Response, NextFunction } from 'express';
import tag from '../services/tag.services';
import createError from 'http-errors';

class TagController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await tag.create(req.body);
            
            res.status(200).json({
                status: 200,
                message: "Tag creation successful",
                data
            });
        } catch (e: any) {
            next(createError(e.statusCode || 500, e.message));
        }
    }

    static async all(req: Request, res: Response, next: NextFunction) {
        try {
            const tags = await tag.all();
            res.status(200).json({
                status: 200,
                message: 'All tasks',
                data: tags
            });
        } catch (e: any) {
            next(createError(e.statusCode || 500, e.message));
        }
    }

    static async one(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await tag.one(parseInt(req.params.id));

            if (!data) throw createError.NotFound('Tag not found');

            res.status(200).json({
                status: 200,
                message: 'Tag',
                data: data
            });
        } catch (e: any) {
            next(createError(e.statusCode || 500, e.message));
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await tag.update(parseInt(req.params.id), req.body);
            if (!data) throw createError.NotFound('Tag not found');
            res.status(200).json({
                status: 200,
                message: 'Tag updated',
                data: data
            });
        } catch (e: any) {
            next(createError(e.statusCode || 500, e.message));
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await tag.delete(
                parseInt(req.params.id)
            );
            if (!data) throw createError.NotFound('Tag not found');
            res.status(200).json({
                status: 200,
                message: 'Tag deleted',
                data: data
            });
        } catch (e: any) {
            next(createError(e.statusCode || 500, e.message));
        }
    }
}

export default TagController;