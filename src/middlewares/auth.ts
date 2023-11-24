import { Request, Response, NextFunction } from 'express';
import jwt from '../../utils/jwt';
import createError from 'http-errors';

const auth = async (req: any, res: any, next: any) => {
  if (!req.headers.authorization) {
    return next(createError.Unauthorized('Access token is required'));
  }
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return next(createError.Unauthorized());
  }
  await jwt.verifyAccessToken(token)
    .then((user: any) => {
      req.user = user;
      next();
    })
    .catch((e: any) => {
      next(createError.Unauthorized(e.message));
    });
};

export default auth;