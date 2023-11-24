import express, { Router, Request, Response, NextFunction } from 'express';
import tag from '../controllers/tag.controller';
import auth from '../middlewares/auth';

const tag_router: Router = express.Router();

tag_router.post(`/`, auth, tag.create);
tag_router.get('/', auth, tag.all);
tag_router.get('/:id', auth, tag.one);
tag_router.put('/:id', auth, tag.update);
tag_router.delete('/:id', auth, tag.delete);


export default tag_router;