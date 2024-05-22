import { PrismaClient } from "@prisma/client";
import { mockUsers } from "../src/utils/server/mock-users";
import { Person } from "../src/utils/common/person";

const prisma = new PrismaClient();

async function main() {
  for (const person in mockUsers) {
    const user = mockUsers[person as Person];
    if (user) {
      await prisma.user.create({
        data: {
          backgroundImageUrl: user.backgroundImageUrl,
          profilePictureUrl: user.profilePictureUrl,
          name: user.name,
          title: user.title,
          followers: user.followers,
          following: user.following,
        },
      });
    }
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
