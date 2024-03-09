import prisma from "../client"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { NextApiRequest, NextApiResponse } from "next"


export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponse
) {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
      return res.status(401).json({ message: "Please signin to create a note." })
    }
    // Get Auth Users Notes
    try {
      const data = await prisma.user.findUnique({
        where: {
          email: session.user?.email || "",
        },
        include: {
          Post: {
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      })

      return res.status(200).json(data)
    } catch (err) {
      res.status(403).json({ err: "Error has occured while making a note" })
    }
  }
}