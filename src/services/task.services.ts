import { Task, Status } from '@prisma/client';
import { prisma } from '../index';
import dotenv from 'dotenv';
import createError from 'http-errors';

dotenv.config();

class TaskService {
    static async create(data: Partial<Task>) {

        const user = await prisma.user.findUnique({
            where: {
                id: data.userId
            }
        });

        if (!user) {
            throw createError.NotFound('User not registered');
        }

        const project = await prisma.project.findFirst({
            where: {
                id: data.projectId
            }
        });

        if (!project) {
            throw createError.NotFound('Project not found');
        }

        const projectMember = await prisma.projectsOnUsers.findFirst({
            where: {
                userId: data.userId,
                projectId: data.projectId
            }
        });

        if (!projectMember) {
            throw createError.NotFound('You are not a member of this project');
        }

        const task = await prisma.task.create({
          data: data as Task
        });

        await prisma.tag.create({
            data: {
                taskId: task.id
            }
        });

        return { ...task};
    }

    static async all() {
        const allTasks = await prisma.task.findMany();
        return allTasks;
    }

    static async one(id: number) {
        const task = await prisma.task.findFirst({
            where: {
                id: id
            }
        });
        return task;
    }

    static async update(id: number, data: Partial<Task>) {

        const task = await prisma.task.findFirst({
            where: {
                id: id
            }
        });

        if (!task) {
          throw createError.NotFound('Task not found');
        }

        if (task.status === 'Concluido' as Status) {
          throw createError.Conflict('Task is already done');
        }

        const user = await prisma.user.findUnique({
            where: {
                id: data.userId
            }
        });

        if (!user) {
            throw createError.NotFound('User not registered');
        }

        const projectMember = await prisma.projectsOnUsers.findFirst({
          where: {
            userId: data.userId,
            projectId: data.projectId
          }
        });

        if (!projectMember) {
            throw createError.NotFound('You are not a member of this project');
        }

        const taskUpdated = await prisma.task.update({
            where: {
                id: id
            },
            data: data
        });
        return taskUpdated;
    }

    static async delete(id: number, userId: number, projectId: number) {

        const task = await prisma.task.findFirst({
            where: {
                id: id
            }
        });

        if (!task) {
            throw createError.NotFound('Task not found');
        }

        const project = await prisma.project.findFirst({
            where: {
                id: projectId
            }
        });

        if (!project) {
            throw createError.NotFound('Project not found');
        }

        const projectMember = await prisma.projectsOnUsers.findFirst({
            where: {
                userId: userId,
                projectId: projectId
            }
        });

        if (!projectMember) {
            throw createError.NotFound('You are not a member of this project');
        }

        const taskDeleted = await prisma.task.delete({
            where: {
                id: id
            }
        });
        return taskDeleted;
    }
}

export default TaskService;