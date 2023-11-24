import express, { Router, Request, Response, NextFunction } from 'express';
import task from '../controllers/task.controller';
import auth from '../middlewares/auth';

const task_router: Router = express.Router();

task_router.post(`/`, auth, task.create);
task_router.get('/', auth, task.all);
task_router.get('/:id', auth, task.one);
task_router.put('/:id', auth, task.update);
task_router.delete('/:id', auth, task.delete);


export default task_router;