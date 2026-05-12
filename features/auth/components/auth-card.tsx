import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface AuthCardProps {
   children: ReactNode;
   title?: string;
   description?: string;
   className?: string;
   logo?: ReactNode;
   footer?: ReactNode;
}

function AuthCard({
   children,
   title,
   description,
   className,
   logo,
   footer,
}: AuthCardProps) {
   return (
      <Card
         size="default"
         className={cn(
            'w-full max-w-md font-urbanist shadow-xl shadow-foreground/5 ring-foreground/8',
            className
         )}>
         {(logo || title || description) && (
            <CardHeader className="w-full items-center gap-3 text-center pb-2">
               {logo && <div className="flex justify-center">{logo}</div>}
               {title && (
                  <CardTitle className="font-bold font-urbanist text-2xl! tracking-tight">
                     {title}
                  </CardTitle>
               )}
               {description && (
                  <CardDescription className="text-center text-sm! text-muted-foreground leading-relaxed">
                     {description}
                  </CardDescription>
               )}
            </CardHeader>
         )}
         <CardContent className="pt-2">{children}</CardContent>
         {footer && (
            <div className="px-4 pb-5 text-center text-sm text-muted-foreground">
               {footer}
            </div>
         )}
      </Card>
   );
}

export { AuthCard };
