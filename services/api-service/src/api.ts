import { Router } from 'express';

import conversationRoutes from './routes/conversations';
import messageRoutes from './routes/messages';
import aiRoutes from './routes/ai';

const router = Router();

router.use('/conversations', conversationRoutes);
router.use('/messages', messageRoutes);
router.use('/ai', aiRoutes);

export default router;
