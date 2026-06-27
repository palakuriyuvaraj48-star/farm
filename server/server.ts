import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env';
import { connectRedis } from './config/redis';
import { errorHandler } from './middleware/errorHandler';
import { AIService } from './src/modules/ai/ai.service';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// AI Routes Mockup
app.post('/api/v1/ai/chat', async (req, res) => {
  const { query, userId } = req.body;
  const result = await AIService.processChatbotQuery(query, userId || 'anonymous');
  res.json(result);
});

// Global Error Handler
app.use(errorHandler);

const validateStartup = async () => {
  try {
    await prisma.$connect();
    console.log('✅ Database Connected');
  } catch (error) {
    console.log('❌ Database Connection Failed', error);
  }

  // Connect Redis (handles its own logging now)
  await connectRedis();
};

// Start Server with port fallback
const startServer = async (port: number) => {
  const server = app.listen(port, () => {
    console.log(`✅ Backend Running on Port ${port}`);
  });

  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`⚠️ Port ${port} is occupied, trying ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('❌ Failed to start server:', err);
      process.exit(1);
    }
  });
};

const boot = async () => {
  await validateStartup();
  const initialPort = parseInt(env.PORT || '5000', 10);
  startServer(initialPort);
};

boot();
