import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../client"


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
    //Fetch all posts
    try {
        const data = await prisma.post.findMany({
            orderBy: {
                createdAt: "desc",
            },
        })
        return res.status(200).json(data)
    } catch (err) {
        res.status(403).json({ err: "Error fetching posts" })
    } 
  }
}