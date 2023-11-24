import { Request, Response, NextFunction } from 'express';
import task from '../services/task.services';
import createError from 'http-errors';

class TaskController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await task.create(req.body);
            
            res.status(200).json({
                status: 200,
                message: "Task creation successful",
                data
            });
        } catch (e: any) {
            next(createError(e.statusCode || 500, e.message));
        }
    }

    static async all(req: Request, res: Response, next: NextFunction) {
        try {
            const tasks = await task.all();
            res.status(200).json({
                status: 200,
                message: 'All tasks',
                data: tasks
            });
        } catch (e: any) {
            next(createError(e.statusCode || 500, e.message));
        }
    }

    static async one(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await task.one(parseInt(req.params.id));

            if (!data) throw createError.NotFound('Task not found');

            res.status(200).json({
                status: 200,
                message: 'Task',
                data: data
            });
        } catch (e: any) {
            next(createError(e.statusCode || 500, e.message));
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await task.update(parseInt(req.params.id), req.body);
            if (!data) throw createError.NotFound('Task not found');
            res.status(200).json({
                status: 200,
                message: 'Task updated',
                data: data
            });
        } catch (e: any) {
            next(createError(e.statusCode || 500, e.message));
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await task.delete(
                parseInt(req.params.id),
                parseInt(req.body.userId),
                parseInt(req.body.projectId)
            );
            if (!data) throw createError.NotFound('Task not found');
            res.status(200).json({
                status: 200,
                message: 'Task deleted',
                data: data
            });
        } catch (e: any) {
            next(createError(e.statusCode || 500, e.message));
        }
    }
}

export default TaskController;