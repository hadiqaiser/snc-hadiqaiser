import { PrismaClient } from "@prisma/client";

// Commons
import { Person } from "@/utils/common/person";

const prisma = new PrismaClient();
export const getPersonFromDB = async (person: Person) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        name: person,
      },
    });

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
