import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"
import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../client"



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method === "PUT") {
        const session = await getServerSession(req, res, authOptions)

        const prismaUser = await prisma.user.findUnique({
            where: { email: session?.user?.email! },
        })

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

        //Add Public Category
        try {
            const result = await prisma.post.update({
                where: {
                    id: postId,
                },
                data: {
                    public: {
                        create: [{ name: 'public' }]
                    },
                },
            });
            res.status(200).json(result)
            console.log(result)
            console.log('Public tag added to post:', result);
        } catch (err) {
            console.error('Error creating favorites tag:', err);
            res.status(403).json({ message: "Error has occured while creating a favorite tag" })
        }
    }
}