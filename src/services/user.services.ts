import { User } from '@prisma/client';
import { prisma } from '../index';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from '../../utils/jwt';
import createError from 'http-errors';

dotenv.config();

class UserService {
    static async create(data: Partial<User>) {
        const hashedPassword = bcrypt.hashSync(data.password as string, 10);
        data.password = hashedPassword;

        const user = await prisma.user.create({
        data: data as User
        });

        const accessToken = await jwt.signAccessToken(user);

        return { ...user, accessToken };
    }

    static async login(data: { email: string, password: string }) {
        const { email, password } = data;
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            throw createError.NotFound('User not registered');
        }

        const checkPassword = bcrypt.compareSync(password, user.password);
        if (!checkPassword) throw createError.Unauthorized('Email address or password not valid');

        const accessToken = await jwt.signAccessToken(user);
        return { ...user, accessToken };
    }

    static async all() {
        const allUsers = await prisma.user.findMany();
        return allUsers;
    }

    static async one(id: number) {
        const user = await prisma.user.findFirst({
            where: {
                id: id
            }
        });
        return user;
    }

    static async update(id: number, data: Partial<User>) {
        const user = await prisma.user.update({
            where: {
                id: id
            },
            data: data
        });
        return user;
    }

    static async delete(id: number) {
        const user = await prisma.user.delete({
            where: {
                id: id
            }
        });
        return user;
    }
}

export default UserService;