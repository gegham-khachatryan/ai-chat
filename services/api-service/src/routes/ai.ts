import { GEMINI_API_KEY, OPENAI_API_KEY, OPENAI_ORG_ID } from './../configs';
import { Router, Request, Response } from 'express';
import { AiAssist, MessageRole } from '@ai-chat/ai';
import { authMiddleware } from '@ai-chat/auth';
import { Conversation, Message } from '@ai-chat/mongo';

const router = Router();
const AiAssistant = new AiAssist({
  GEMINI_API_KEY,
  OPENAI_API_KEY,
  OPENAI_ORG_ID
});

router.post('/respond', authMiddleware, async (req: Request, res: Response) => {
  const { conversationId, text } = req.body;

  let abortController = new AbortController();

  req.on('aborted', () => {
    console.warn('Request was aborted by the client');
    abortController.abort();
  });

  try {
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    const { aiProvider, title } = conversation.toJSON();

    if (!title) {
      const title = await AiAssistant.getMessageSummary(aiProvider, text);
      await Conversation.findOneAndUpdate({ _id: conversationId }, { $set: { title } }, { new: true, runValidators: true });
    }

    const history = (await Message.find({ conversationId }).sort({ _id: -1 }).limit(10).exec()).reverse();

    const contextHistory = history.map((message) => {
      const msg = message.toJSON();
      return { role: msg.role, text: msg.text };
    });

    const lastMessage = contextHistory.pop();

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('Connection', 'keep-alive');
    const messageText = lastMessage?.text || text;

    const aiResponse = await AiAssistant.getAIResponse(
      aiProvider,
      messageText,
      contextHistory,
      (chunk) => {
        res.write(chunk);
      },
      (controller) => {
        abortController = controller;
      }
    );

    if (aiResponse) {
      const aiMessage = new Message({
        sender: null,
        conversationId,
        text: aiResponse,
        role: MessageRole.assistant
      });

      await aiMessage.save();
    }

    res.end();
  } catch (error: any) {
    if (error.name === 'AbortError') {
      abortController.abort();
      console.log('Request aborted');
    } else {
      console.error('Error in AI response:', error);
    }
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
