import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET"){
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

        try {
            const { q: query } = req.query;
            console.log("TO API", query)

            if (typeof query !== "string") {
                throw new Error("Invalid request")
            }

            //Search notes
            const notes = await prisma.post.findMany({
                where: {
                    title: {
                        contains: query,
                        mode: "insensitive"
                    },
                    userId: prismaUser?.id
                },
            });

            res.status(200).json({ notes });
        } catch (err) {
            res.status(403).json({ err: "Error has occured while searching your notes"})
        }
    }
}