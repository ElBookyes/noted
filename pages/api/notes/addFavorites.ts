import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"
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
     
        //Get specific Note
        const { postId, name } = req.body.data

        const post = await prisma.post.findUnique({
            where: { id: postId },
            include: { favorites: true }
        })

        const hasFavoriteTag = post?.favorites.some(favorite => favorite.name === session?.user?.email);
        const favoriteTag = post?.favorites.find(favorite => favorite.name === session.user?.email);

        if (!name) {
            return res.status(400).json({ message: "Name is required for creating a favorite tag" });
        }

        if (!postId) {
            return res.status(400).json({ message: "POSTID BRO" });
        }

        console.log("Session:", session);
        console.log("Name:", name);
        console.log("Post ID:", postId);

        //Add Favorite Category
        try { 
            if (!hasFavoriteTag) {
                const newFavoritesTag = await prisma.favoritesTag.create({
                    data: {
                        name: session?.user?.email!
                    }
                });

                await prisma.post.update({
                    where: { id: postId },
                    data: {
                        favorites: {
                           connect: { id: newFavoritesTag.id } 
                        }
                    }
                });
                console.log('Favorite tag added to the post');
            } else {
                await prisma.post.update({
                    where: {id: postId },
                    data: {
                        favorites: {
                            disconnect: { id: favoriteTag?.id }
                        }
                    }
                });
            }
            res.status(200).json(post)
            console.log(post)
            console.log('Favorite tag added to post:', post);
        } catch (err) {
            console.error('Error creating favorite tag:', err);
            res.status(403).json({ message: "Error has occurred while creating a favorite tag" });
        }
    }
}