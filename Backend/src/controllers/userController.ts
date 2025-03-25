import bcrypt from "bcrypt";
import pool from "../config/db";
import  {Request, Response} from "express";



export const changePassword = async (req: Request, res: Response) => {

    const {oldPassword, newPassword} = req.body;
    const userId = (req as any).user.id
        try {

            const [rows]: any = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);

            if(rows.length === 0) {
                res.status(404).json({error: 'Użytkownik nie znaleziony'});
                return;
            }

            const user = rows[0];

            // Sprawdzenie poprawności starego hasła

            const isValidPassword =  await bcrypt.compare(oldPassword, user.password);

                if(!isValidPassword) {
                    res.status(401).json({ error: 'Nieprawidłowe stare hasło'});
                    return;
                };

                 // Hashowanie nowego hasła
                 const hashedPassword = await bcrypt.hash(newPassword,10);

                 // Aktualizacja hasła w bazie danych

                 await pool.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, userId])

                 res.json({ message: 'Hasło zostało zmienione pomyślnie' });
            
        }catch(error) {
            console.error("Błąd zmiany hasła:", error);
            res.status(500).json({ error: 'Błąd serwera podczas zmiany hasła' });

        }


}