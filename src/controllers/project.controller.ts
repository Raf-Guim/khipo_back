import { Request, Response, NextFunction } from 'express';
import project from '../services/project.services';
import createError from 'http-errors';

class ProjectController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await project.create(req.body);
            
            res.status(200).json({
                status: 200,
                message: "Project creation successful",
                data
            });
        } catch (e: any) {
            next(createError(e.statusCode || 500, e.message));
        }
    }

    static async all(req: Request, res: Response, next: NextFunction) {
        try {
            const projects = await project.all();
            res.status(200).json({
                status: 200,
                message: 'All projects',
                data: projects
            });
        } catch (e: any) {
            next(createError(e.statusCode || 500, e.message));
        }
    }

    static async one(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await project.one(parseInt(req.params.id));

            if (!data) throw createError.NotFound('Project not found');

            res.status(200).json({
                status: 200,
                message: 'Project',
                data: data
            });
        } catch (e: any) {
            next(createError(e.statusCode || 500, e.message));
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await project.update(parseInt(req.params.id), req.body);
            if (!data) throw createError.NotFound('Project not found');
            res.status(200).json({
                status: 200,
                message: 'Project updated',
                data: data
            });
        } catch (e: any) {
            next(createError(e.statusCode || 500, e.message));
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await project.delete(
                parseInt(req.params.id),
                parseInt(req.body.userId)
            );
            if (!data) throw createError.NotFound('Project not found');
            res.status(200).json({
                status: 200,
                message: 'Project deleted',
                data: data
            });
        } catch (e: any) {
            next(createError(e.statusCode || 500, e.message));
        }
    }

    static async addMember(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await project.addMember({
                userId: parseInt(req.body.userId),
                ownerId: parseInt(req.body.ownerId),
                projectId: parseInt(req.params.id)
            });
            res.status(200).json({
                status: 200,
                message: 'Member added',
                data: data
            });
        } catch (e: any) {
            next(createError(e.statusCode || 500, e.message));
        }
    }

    static async removeMember(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await project.removeMember({
                userId: parseInt(req.body.userId),
                ownerId: parseInt(req.body.ownerId),
                projectId: parseInt(req.params.id)
            });
            res.status(200).json({
                status: 200,
                message: 'Member removed',
                data: data
            });
        } catch (e: any) {
            next(createError(e.statusCode || 500, e.message));
        }
    }
}

export default ProjectController;