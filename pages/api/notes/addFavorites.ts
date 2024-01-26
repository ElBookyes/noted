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

        //Get Specific User
        const prismaUser = await prisma.user.findUnique({
            where: {email: session?.user?.email! },
        })
        
        //Get specific Note
        const { postId, name } = req.body.data

        if (!name) {
            return res.status(400).json({ message: "Name is required for creating a favorite tag" });
        }

        if (!postId) {
            return res.status(400).json({ message: "POSTID BRO" });
        }

        console.log("Session:", session);
        console.log("Prisma User:", prismaUser);
        console.log("Name:", name);
        console.log("Post ID:", postId);

        //Add Favorite Category
        try {
            const result = await prisma.post.update({
                where : {
                    id: postId,
                },
                data: {
                    favorites: {
                        create: { name: session?.user?.email! },
                    },
                },
            });
            res.status(200).json(result)
            console.log(result)
            console.log('Tag added to post:', result);
        } catch (err) {
            console.error('Error creating favorite tag:', err);
            res.status(403).json({ message: "Error has occurred while creating a favorite tag" });
        }
    }
}