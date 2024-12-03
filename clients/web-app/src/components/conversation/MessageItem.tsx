import { Box, Flex } from '@chakra-ui/react';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import Markdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import 'github-markdown-css/github-markdown.css';
import 'katex/dist/katex.min.css';

interface MessageItemProps {
  role?: string;
  text: string;
}

const baseProps: Record<string, any> = {
  PreTag: 'div',
  style: { oneDark },
  codeTagProps: { customStyle: { background: 'none' } },
  customStyle: { background: 'none', margin: 0, padding: 0 }
};

const MessageItem = ({ text, role }: MessageItemProps) => {
  return (
    <Flex direction='column' gap='3' w='full' mx='auto' maxW='4xl'>
      {role === 'user' ? (
        <Box ml='auto' bg='bg.muted' borderRadius='xl' py='2' px='4'>
          {text}
        </Box>
      ) : (
        <Box className='markdown-body'>
          <Markdown
            children={text}
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
              code({ node, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return match ? (
                  <SyntaxHighlighter language={match[1]} {...baseProps}>
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          />
        </Box>
      )}
    </Flex>
  );
};
export default MessageItem;
