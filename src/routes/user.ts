import express, { Router, Request, Response, NextFunction } from 'express';
import user from '../controllers/user.controller';
import auth from '../middlewares/auth';

const user_router: Router = express.Router();

user_router.post(`/`, user.create);
user_router.post('/login', user.login);
user_router.get('/', auth, user.all);
user_router.get('/:id', auth, user.one);
user_router.put('/:id', auth, user.update);
user_router.delete('/:id', auth, user.delete);


export default user_router;