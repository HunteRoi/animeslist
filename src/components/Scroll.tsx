import React from 'react';
import InfiniteScroll, { Props as InfiniteScrollProps } from 'react-infinite-scroll-component';

export const Scroll: React.FC<InfiniteScrollProps> = ({ children, ...rest }) => <InfiniteScroll {...rest}>{children}</InfiniteScroll>;
