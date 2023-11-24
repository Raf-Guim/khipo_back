import { Project, Profile } from '@prisma/client';
import { prisma } from '../index';
import dotenv from 'dotenv';
import createError from 'http-errors';

dotenv.config();

class ProjectService {
    static async create(data: Partial<Project>) {

        const user = await prisma.user.findUnique({
            where: {
                id: data.userId
            }
        });

        if (!user) {
            throw createError.NotFound('User not registered');
        }

        const project = await prisma.project.create({
            data: data as Project
        });

        await prisma.projectsOnUsers.create({
            data: {
                userId: project.userId,
                projectId: project.id,
                profile: 'Owner' as Profile // Replace 'ACTUAL_PROFILE_VALUE' with the actual profile value
            }
        });

        return { ...project};
    }

    static async all() {
        const allProjects = await prisma.project.findMany();
        return allProjects;
    }

    static async one(id: number) {
        const project = await prisma.project.findFirst({
            where: {
                id: id
            }
        });
        return project;
    }

    static async update(id: number, data: Partial<Project>) {
        const project = await prisma.project.update({
            where: {
                id: id
            },
            data: data
        });
        return project;
    }

    static async delete(id: number, userId: number) {

        const project = await prisma.project.findFirst({
            where: {
                id: id
            }
        });

        if (!project) {
            throw createError.NotFound('Project not found');
        }

        const owner = await prisma.project.findFirst({
            where: {
                userId,
                id
            }
        });

        if (!owner) {
            throw createError.NotFound('You are not the owner of this project');
        }

        const projectDeleted = await prisma.project.delete({
            where: {
                id: id
            }
        });
        return projectDeleted;
    }

    static async addMember(data: { userId: number, projectId: number, ownerId: number }) {
        const { userId, projectId, ownerId } = data;

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            throw createError.NotFound('User not registered');
        }

        const project = await prisma.project.findUnique({
            where: {
                id: projectId
            }
        });

        if (!project) {
            throw createError.NotFound('Project not found');
        }

        const owner = await prisma.projectsOnUsers.findFirst({
            where: {
                userId: ownerId,
                projectId,
                profile: 'Owner' as Profile
            }
        });

        if (!owner) {
            throw createError.NotFound('You are not the owner of this project');
        }

        const alreadyMember = await prisma.projectsOnUsers.findFirst({
            where: {
                userId,
                projectId
            }
        });

        if (alreadyMember) {
            throw createError.Conflict('User is already a member of this project');
        }

        const member = await prisma.projectsOnUsers.create({
            data: {
                userId,
                projectId,
                profile: 'Worker' as Profile
            }
        });

        return member;
    }

    static async removeMember(data: { userId: number, projectId: number, ownerId: number }) {
        const { userId, projectId, ownerId } = data;

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            throw createError.NotFound('User not registered');
        }

        const project = await prisma.project.findUnique({
            where: {
                id: projectId
            }
        });

        if (!project) {
            throw createError.NotFound('Project not found');
        }

        const owner = await prisma.projectsOnUsers.findFirst({
            where: {
                userId: ownerId,
                projectId,
                profile: 'Owner' as Profile
            }
        });

        if (!owner) {
            throw createError.NotFound('You are not the owner of this project');
        }

        const member = await prisma.projectsOnUsers.findFirst({
            where: {
                userId,
                projectId
            }
        });

        if (member?.userId === ownerId) {
            throw createError.Conflict('You cannot remove yourself from the project');
        }

        if (!member) {
            throw createError.NotFound('User is not a member of this project');
        }

        const memberDeleted = await prisma.projectsOnUsers.delete({
            where: {
                userId_projectId: {
                    userId,
                    projectId
                }
            }
        });

        return memberDeleted;
    }
}

export default ProjectService;