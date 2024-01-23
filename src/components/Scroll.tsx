import React, { forwardRef } from 'react';
import InfiniteScroll, { Props as InfiniteScrollProps } from 'react-infinite-scroll-component';

export const Scroll: React.ForwardRefExoticComponent<InfiniteScrollProps> = forwardRef<InfiniteScroll, InfiniteScrollProps>((props, ref) => (<InfiniteScroll {...props} ref={ref} />));
