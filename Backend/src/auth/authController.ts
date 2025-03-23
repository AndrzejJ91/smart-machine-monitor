import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from 'express';
import dotenv from "dotenv";

dotenv.config();


export const login = async (req: Request, res: Response) => {

    const {username, password} = req.body;

      const plainPassword = "admin123"
      const hashedPassword = bcrypt.hashSync(plainPassword, 10);  

    // Przykładowe dane logowania
    const mockUser = {
        id: 1,
        username: "admin",
        password: hashedPassword
    };

    // Sprawdzenie danych logowania

       const isPasswordVaild = await bcrypt.compare(password, mockUser.password);
       
       if(username !== mockUser.username || !isPasswordVaild) {
        res.status(401).json({error :'Nieprawidłowy login lub hasło' })
        return;
       };

       
        // Generowanie tokena

        const token = jwt.sign(
            {id:mockUser.id, username: mockUser.username},
            process.env.JWT_SECRET as string,
            {expiresIn: "1h"}

        );

        res.json({token});
        
};

// funkcja do sprawdzenia statusu użytkownika
export const activeStatus = (req: Request, res: Response) => {

    const lastLogin = new Date(Date.now() - 2 * 60 * 1000);
    const isActive = Date.now() - lastLogin.getTime() < 5 * 60 * 1000;

    res.json({isActive, lastLogin});


}