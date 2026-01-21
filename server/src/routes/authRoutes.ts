import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

// Register
router.post('/register', async (req, res) => {
    const { email, password, name } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });

        // Log the activity
        await prisma.activity.create({
            data: {
                action: 'Account created',
                status: 'success',
                userId: user.id
            }
        });

        res.status(201).json({ message: 'User created' });
    } catch (error: any) {
        console.error('Registration error:', error);
        if (error.code === 'P2002') {
            return res.status(400).json({ error: 'A user with this email already exists.' });
        }
        res.status(400).json({ error: 'Registration failed. Please check your data and try again.' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // Log failed attempt
            await prisma.activity.create({
                data: {
                    action: 'Failed login attempt',
                    status: 'warning',
                    userId: user.id
                }
            });
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        // Log success
        await prisma.activity.create({
            data: {
                action: 'Logged in',
                status: 'success',
                userId: user.id
            }
        });

        res.json({ token, user: { email: user.email, name: user.name, role: user.role } });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
