import { authOptions } from '@/auth';
import { prisma } from '@/libs/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from "next-auth/next";
import { Click } from 'prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Click>
) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401);
    res.end();
    return;
  }

  try {
    // todo should add zod scheme checks
    if (!req.body.click) {
      res.status(400).end();
      return;
    }

    if (!session.user?.email) {
      res.status(401);
      res.end();
      return;
    }

    const { click } = req.body;

    const user = await prisma.user.findUnique({
      where: { email: session.user?.email },
    });

    if (!user) {
      res.status(404);
      res.end();
      return;
    }


    const newClick = await prisma.click.create({
      data: {
        perSecond: click.perSecond,
        userId: user.id
      },
    })

    res.status(200).json(newClick);
    res.end();
    return;
  } catch (error) {
    console.error(`error in /api/clicks/create: `, error);
    res.status(500);
    res.end();
    return;
  }
}