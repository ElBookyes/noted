import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../client"


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method === "PUT") {
        const session = await getServerSession(req, res, authOptions) //Check if signed in
        if (!session) {
            return res
              .status(401)
              .json({ message: "Please sign in to create a note"})
        }

        //Get User
        const prismaUser = await prisma.user.findUnique({
            where: {email: session?.user?.email || ''},
        })

        //Get specific Note
        const { postId, title } = req.body.data

        //Edit Note
        try {
            const result = await prisma.post.update({
                where: {
                    id: postId,
                    userId: prismaUser?.id
                },
                data: {
                    title
                }
            })
            res.status(200).json(result)
        } catch (err) {
            res.status(403).json({ err: "Error has occured while updating the note"})
        }
    }
}