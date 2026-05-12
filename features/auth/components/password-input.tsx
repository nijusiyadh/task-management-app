'use client';

import { Eye, EyeOff, Lock } from 'lucide-react';
import { forwardRef, useState } from 'react';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const inputIconClass =
   'absolute top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none';

const PasswordInput = forwardRef<
   HTMLInputElement,
   Omit<React.ComponentProps<typeof Input>, 'type'>
>(({ className, ...props }, ref) => {
   const [visible, setVisible] = useState(false);

   return (
      <div className="relative">
         <Lock className={cn(inputIconClass, 'left-3')} />
         <Input
            {...props}
            ref={ref}
            type={visible ? 'text' : 'password'}
            className={cn('pl-9 pr-10', className)}
         />
         <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Hide password' : 'Show password'}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none">
            {visible ? (
               <EyeOff className="size-4" />
            ) : (
               <Eye className="size-4" />
            )}
         </button>
      </div>
   );
});

PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
