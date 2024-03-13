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
        const { postId } = req.body.data

        const post = await prisma.post.findUnique({
            where: { id: postId },
            include: { public: true }
        })

        if (!postId) {
            return res.status(400).json({ message: "POSTID BRO" });
        }

        console.log("Session:", session);
        console.log("Prisma User:", post);
        console.log("Post ID:", postId);



        //Add Public Category
        try {
            if (post?.public.length === 0) {
                const newPublicTag = await prisma.publicTag.create({
                    data: {
                        name: 'public'
                    }
                });

                await prisma.post.update({
                    where: {id: postId},
                    data: {
                        public: {
                            connect: {id: newPublicTag.id}
                        }
                    }
                });
                console.log('Public tag added to the post')
            } else {
                await prisma.publicTag.delete({
                    where: {id: post?.public[0].id}
                });
            }
            res.status(200).json(post)
            console.log(post)
            console.log('Public tag added to post:', post);
        } catch (err) {
            console.error('Error creating favorites tag:', err);
            res.status(403).json({ message: "Error has occured while creating a favorite tag" })
        }
    }
}