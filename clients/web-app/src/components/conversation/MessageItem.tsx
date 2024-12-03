import { Box, Flex } from '@chakra-ui/react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import 'katex/dist/katex.min.css';

interface MessageItemProps {
  role?: string;
  text: string;
}

const MessageItem = ({ text, role }: MessageItemProps) => {
  return (
    <Flex direction='column' gap='3' w='full' mx='auto' maxW='4xl'>
      {role === 'user' ? (
        <Box ml='auto' bg='bg.muted' borderRadius='xl' py='2' px='4'>
          {text}
        </Box>
      ) : (
        <Markdown
          children={text}
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{
            code(props) {
              const { children, className, node, ...rest } = props;
              const match = /language-(\w+)/.exec(className || '');

              return match ? (
                <SyntaxHighlighter style={oneDark} language={match[1]} children={String(children).replace(/\n$/, '')} />
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            }
          }}
        />
      )}
    </Flex>
  );
};
export default MessageItem;
