import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import dotenv from 'dotenv';

dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;

export default {
    signAccessToken(payload: any) {
        return new Promise((resolve, reject) => {
            jwt.sign({ payload }, accessTokenSecret, {}, (err: any, token: any) => {
                if (err) {
                    reject(createError.InternalServerError());
                }
                resolve(token);
            });
        });
    },

    verifyAccessToken(token: string) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, accessTokenSecret, (err: any, payload: any) => {
                if (err) {
                    const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
                    return reject(createError.Unauthorized(message));
                }
                resolve(payload);
            });
        });
    },
};