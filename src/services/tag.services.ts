import { Tag, Status } from '@prisma/client';
import { prisma } from '../index';
import dotenv from 'dotenv';
import createError from 'http-errors';

dotenv.config();

class TagService {
    static async create(data: Partial<Tag>) {

        const task = await prisma.task.findFirst({
            where: {
                id: data.taskId
            }
        });

        if (!task) {
            throw createError.NotFound('Task not found');
        }

        if (task.status === 'Concluido' as Status) {
            throw createError.Conflict('Task is already done');
        }

        const tag = await prisma.tag.create({
            data: data as Tag
        });

        return { ...tag};
    }

    static async all() {
        const allTags = await prisma.tag.findMany();
        return allTags;
    }

    static async one(id: number) {
        const tag = await prisma.tag.findFirst({
            where: {
                id: id
            }
        });
        return tag;
    }

    static async update(id: number, data: Partial<Tag>) {

        const tag = await prisma.tag.findFirst({
            where: {
                id: id
            }
        });

        if (!tag) {
            throw createError.NotFound('Tag not found');
        }

        const tagUpdated = await prisma.tag.update({
            where: {
                id: id
            },
            data: data
        });
        return tagUpdated;
    }

    static async delete(id: number) {

        const tag = await prisma.tag.findFirst({
            where: {
                id: id
            }
        });

        if (!tag) {
            throw createError.NotFound('Tag not found');
        }

        const tagDeleted = await prisma.tag.delete({
            where: {
                id: id
            }
        });
        return tagDeleted;
    }
}

export default TagService;