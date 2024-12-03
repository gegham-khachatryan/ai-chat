import { Heading, HeadingProps } from '@chakra-ui/react';
import { forwardRef } from 'react';

export interface TitleProps extends HeadingProps {}

export const Title = forwardRef<HTMLHeadingElement, TitleProps>(function Title(props, ref) {
  const { children, ...rest } = props;
  return (
    <Heading
      ref={ref}
      bg={`linear-gradient(74deg,#4285f4 0,#9b72cb 9%,#d96570 20%,#d96570 24%,#9b72cb 35%,#4285f4 44%,#9b72cb 50%,#d96570 56%,#1e1f20 75%,#1e1f20 100%)`}
      backgroundClip='text'
      backgroundSize='500%, 100%'
      color='transparent'
      {...rest}
    >
      {children}
    </Heading>
  );
});
