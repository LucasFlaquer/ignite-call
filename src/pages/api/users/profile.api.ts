import { prisma } from '@/lib/prisma'
import { buildNextAuthOptions } from '@/pages/api/auth/[...nextauth].api'
import { NextApiRequest, NextApiResponse } from 'next'
// eslint-disable-next-line camelcase
import { unstable_getServerSession } from 'next-auth'
import { z } from 'zod'

const updateProfileBodySchema = z.object({
  bio: z.string(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'PUT') return res.status(405).end()
  const session = await unstable_getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )
  if (!session) return res.status(401).end()
  const { bio } = updateProfileBodySchema.parse(req.body)
  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      bio,
    },
  })

  return res.status(204).end()
}
