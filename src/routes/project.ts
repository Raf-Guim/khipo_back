import express, { Router, Request, Response, NextFunction } from 'express';
import project from '../controllers/project.controller';
import auth from '../middlewares/auth';

const project_router: Router = express.Router();

project_router.post(`/`, auth, project.create);
project_router.get('/', auth, project.all);
project_router.get('/:id', auth, project.one);
project_router.put('/:id', auth, project.update);
project_router.delete('/:id', auth, project.delete);
project_router.post('/:id/add-member', auth, project.addMember);
project_router.post('/:id/remove-member', auth, project.removeMember);


export default project_router;