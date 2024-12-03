import { authMiddleware } from '@ai-chat/auth';
import { AIProviders } from '@ai-chat/consts';
import { Conversation } from '@ai-chat/mongo';
import { Router, Request, Response } from 'express';

const router = Router();

router.post('/', authMiddleware, async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const { aiProvider } = req.body;

  try {
    if (!AIProviders.hasOwnProperty(aiProvider)) {
      return res.status(400).json({ message: 'Invalid AI provider' });
    }

    const conversation = new Conversation({
      participants: [userId],
      aiProvider
    });
    await conversation.save();

    res.status(201).json(conversation);
  } catch (error) {
    console.error('Error creating conversation:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', authMiddleware, async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  try {
    const conversations = await Conversation.find({ participants: userId }).sort({ _id: -1 });
    res.json(conversations);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:conversationId', authMiddleware, async (req: Request, res: Response) => {
  const { conversationId } = req.params;
  const userId = (req as any).userId;

  try {
    const conversation = await Conversation.findOne({
      _id: conversationId,
      participants: userId
    });

    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    res.json(conversation);
  } catch (error) {
    console.error('Error fetching conversation:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
