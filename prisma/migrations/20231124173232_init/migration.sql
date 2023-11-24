-- DropForeignKey
ALTER TABLE "ProjectsOnUsers" DROP CONSTRAINT "ProjectsOnUsers_projectId_fkey";

-- AddForeignKey
ALTER TABLE "ProjectsOnUsers" ADD CONSTRAINT "ProjectsOnUsers_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
