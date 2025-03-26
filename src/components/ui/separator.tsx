'use client';

import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';

import { cn } from '@/lib/utils';

interface SeparatorProps
  extends React.ComponentProps<typeof SeparatorPrimitive.Root> {
  thickness?: number;
  color?: string;
}

function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  thickness = 1,
  color = 'border',
  ...props
}: SeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator-root"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        `bg-${color} shrink-0 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full ${
          orientation === 'horizontal' ? 'w-full' : `w-[${thickness}px]`
        }`,
        className,
      )}
      {...props}
    />
  );
}

export { Separator };
