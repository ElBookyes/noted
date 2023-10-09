import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../client"



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method === "POST") {
        const session = await getServerSession(req, res, authOptions) //Check if signed in
        if (!session) {
            return res
              .status(401)
              .json({ message: "Please sign in to create a note"})
        }

        const title: string = req.body.title || 'This is a new note'
        const color = req.body.color

        //Get Specific User
        const prismaUser = await prisma.user.findUnique({
            where: {email: session?.user?.email! },
        })
        //Check title
        if (title.length > 300) {
            return res.status(403).json({ message: "Please write a shorter note"})
        }
        if (!title.length) {
            return res
              .status(403)
              .json({ message: "You can't create an empty note"})
        }

        //Create Note
        try {
            const result = await prisma.post.create({
                data: {
                    title,
                    userId: prismaUser!.id,
                    color: color,
                },
            })
            res.status(200).json(result)
            console.log(result)
        } catch (err) {
            res.status(403).json({ err: "Error has occured while making a note" })
        }
    }
}