import type { NextApiRequest, NextApiResponse } from 'next';
import { Click } from 'prisma/client';
import { prisma } from '@/libs/prisma';

type Data = {
  clicks?: Click[];
  error?: unknown;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const clicks = await prisma.click.findMany({
      include: {
        user: true,
      },
      orderBy: [
        {
          perSecond: 'desc',
        },
      ],
      skip: 0,
      take: 20,
    });

    res.status(200).json({ clicks });
    res.end();
  } catch (error) {
    console.error(`error in /api/clicks/list: `, error);
    res.status(500).json({ error });
    res.end();
  }
}