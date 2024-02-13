import {ReactNode} from 'react';

export type WithChildren<T = {}> = T & {children?: ReactNode};

export type KeyboardBehavior = 'padding' | 'height' | 'position' | undefined;
