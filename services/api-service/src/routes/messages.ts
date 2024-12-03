import { Router, Request, Response } from 'express';

import { Message } from '@ai-chat/mongo';
import { authMiddleware } from '@ai-chat/auth';
import { MessageRole } from '@ai-chat/ai';

const router = Router();

router.get('/:conversationId', authMiddleware, async (req: Request, res: Response) => {
  const { conversationId } = req.params;
  const page = parseInt(req.query.page as string) || 0;
  const limit = parseInt(req.query.limit as string) || 20;

  try {
    const messages = await Message.find({ conversationId })
      .sort({ createdAt: -1 })
      .skip(page * limit)
      .limit(limit)
      .populate('sender', 'username');

    res.json(messages);
  } catch (error) {
    console.error('Failed to fetch messages', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/:conversationId', authMiddleware, async (req: Request, res: Response) => {
  const { conversationId } = req.params;
  const { text } = req.body;
  const userId = (req as any).userId;

  try {
    const userMessage = new Message({
      role: MessageRole.user,
      conversationId,
      sender: userId,
      text
    });
    await userMessage.save();
    res.status(201).json(userMessage);
  } catch (error) {
    console.error('Failed to send message', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
