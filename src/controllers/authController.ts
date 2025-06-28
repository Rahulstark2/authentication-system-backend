import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';
import jwt, { SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

interface AuthRequest extends Request {
    user?: any;
}


const generateToken = (id: number) => {
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_IN ?? '1d';

    if (!secret) {
        throw new Error("JWT_SECRET is not defined.");
    }

    return jwt.sign(
        { id },
        secret,
        {
            expiresIn: expiresIn as SignOptions['expiresIn'],
        }
    );
};


export const signup = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            res.status(409).json({ message: 'Error: User with this email already exists.' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword },
        });

        const token = generateToken(user.id);

        res.status(201).json({
            message: 'User registered successfully',
            token,
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }

        const token = generateToken(user.id);

        res.status(200).json({
            message: 'Login successful',
            token,
        });
    } catch (error) {
        next(error);
    }
};


export const getMe = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        res.status(200).json({ user: req.user });
    } catch (error) {
        next(error);
    }
};


export const requestPasswordReset = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });


    if (!user) {
      res.status(200).json({ message: 'If that email is registered, a reset link has been sent.' });
      return;
    }

  
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 60); // 1 hour from now


    await prisma.user.update({
      where: { email },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    
    res.status(200).json({
      message: 'If that email is registered, a reset token has been generated.',
      resetToken, 
    });
  } catch (error) {
    next(error);
  }
};


export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, token, newPassword } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (
      !user ||
      !user.resetToken ||
      !user.resetTokenExpiry ||
      user.resetToken !== token ||
      user.resetTokenExpiry < new Date()
    ) {
      res.status(400).json({ message: 'Invalid or expired reset token.' });
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    res.status(200).json({ message: 'Password has been reset successfully.' });
  } catch (error) {
    next(error);
  }
};

