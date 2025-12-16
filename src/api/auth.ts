import { type Express, type Request, type Response } from 'express'
import { db } from '../database';
import { usersTable } from '../db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';


export const initializeAuthAPI = (app: Express) => {
    app.post('/api/auth/register', async (req: Request, res: Response) => {
        const { username, password } = req.body

        try {
      const hashedPassword = await bcrypt.hash(password, 10);

      await db.insert(usersTable).values({
        username,
        password: hashedPassword,
      });

      res.status(201).send("User erstellt");
    } catch (err) {
      res.status(500).send("Fehler beim Registrieren");
    }   

    })
}