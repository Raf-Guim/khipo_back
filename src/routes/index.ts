import express, { Router, Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import user_router from './user';
import project_router from './project';
import task_router from './task';
import tags_router from './tag';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Bem vindo ao meu desafio de Back para Khipo!');
});


router.use('/users', user_router);
router.use('/projects', project_router);
router.use('/tasks', task_router);
router.use('/tags', tags_router);

router.use( async (req: Request, res: Response, next: NextFunction) => {
    next(createError.NotFound('Route not Found'));
});

router.use( (err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({
        status: err.status || 500,
        message: err.message
    });
});

export default router;