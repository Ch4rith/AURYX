import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import { PrismaClient } from '@prisma/client';

dotenv.config();
console.log('DATABASE_URL:', process.env.DATABASE_URL);

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

// Activity logs endpoint
app.get('/api/activities', async (req, res) => {
    try {
        const activities = await prisma.activity.findMany({
            take: 10,
            orderBy: { createdAt: 'desc' },
            include: { user: { select: { email: true } } }
        });
        res.json(activities);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch activities' });
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
