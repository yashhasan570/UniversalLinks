import { prisma } from "@/lib/prisma";
import { UNIVERSALLINKS_WORKSPACE_ID } from "@universallinks/utils";

export const getDubAdminRole = async (userId: string) => {
  const response = await prisma.projectUsers.findUnique({
    where: {
      userId_projectId: {
        userId,
        projectId: UNIVERSALLINKS_WORKSPACE_ID,
      },
    },
    select: {
      role: true,
    },
  });

  if (!response) {
    return null;
  }
  return response.role;
};
