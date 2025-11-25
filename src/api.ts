import { type Express, type Request, type Response } from 'express'
import { db } from './database';
import { postTable } from './db/schema';
import { eq } from 'drizzle-orm';

export const initializeAPI = (app: Express) => {


    /*let posts = [
        { id: 1, text: 'Das ist von mir' },
        { id: 2, text: 'Hallo Welt!' },
        { id: 3, text: 'Test123' },
    ];*/

    app.get('/posts', async (req: Request, res: Response) => {
        const dbPosts = await db.select().from(postTable)
        res.send(dbPosts)
    })

    app.post('/posts', async (req: Request, res: Response) => {
        const newPostDb = await db.insert(postTable).values({text: req.body.text})
        /*const newPost = req.body
        newPost.id = posts[posts.length - 1].id + 1
        posts.push(newPost)
        res.send(newPost)*/
        res.send(newPostDb)
    })

    app.put('/posts/:id', async (req: Request, res: Response) => {
        /*const id = parseInt(req.params.id ?? "0")
        const updatedPost = req.body
        const existingPost = posts.find((post) => post.id === id)
        if (!existingPost) {
            res.status(404).send('Post not found')
            return
        }
        updatedPost.id = id
        posts = posts.map((post) => (post.id === id ? updatedPost : post))
        res.send(updatedPost)*/
        const updatedPostDb = await db.update(postTable)
        .set({text: req.body.text})
        .where(eq(postTable.id, parseInt(req.params.id ?? "0")))
        res.send(updatedPostDb)
    })

    app.delete('/posts/:id', async (req: Request, res: Response) => {
        /*const id = parseInt(req.params.id ?? "0")
        posts = posts.filter((post) => post.id !== id)
        res.send(posts)*/

        const deletePostDb = await db.delete(postTable)
        .where(eq(postTable.id, parseInt(req.params.id ?? "0")))
        res.send(deletePostDb)

    })
}
