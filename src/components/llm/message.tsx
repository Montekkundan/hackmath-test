'use client';

import { IconAI, IconUser } from '@/components/ui/icons';
import { cn } from '@/lib/utils';
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage } from '../ui/avatar';
import ReactMarkdown from 'react-markdown';

export function UserMessage({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center ">
        {/* <IconUser /> */}
        <Avatar
          className="shadow-sm border bg-red-500"
        >
          <AvatarImage
            className="object-cover"
            src={user?.imageUrl}
          />
        </Avatar>
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
        <div className='font-bold'>
          {user?.firstName || 'You'}
        </div>
        {children}
      </div>
    </div>
  );
}

export function BotMessage({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <div className={cn('group relative flex items-start md:-ml-12', className)}>
      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center ">
        {/* <IconAI /> */}
        <Avatar
          className="shadow-sm border border-black"
        >
          <AvatarImage
            className="object-cover"
            src='/drham.svg'
          />
        </Avatar>
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
        <div className='font-bold'>
          Dr. Ham
        </div>
        <ReactMarkdown>{children}</ReactMarkdown>
      </div>
    </div>
  );
}

export function BotCard({
  children,
  showAvatar = true,
}: {
  children: React.ReactNode;
  showAvatar?: boolean;
}) {
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow-sm bg-primary text-primary-foreground',
          !showAvatar && 'invisible',
        )}
      >
        <IconAI />
      </div>
      <div className="ml-4 flex-1 px-1">{children}</div>
    </div>
  );
}

export function SystemMessage({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={
        'mt-2 flex items-center justify-center gap-2 text-xs text-gray-500'
      }
    >
      <div className={'max-w-[600px] flex-initial px-2 py-2'}>{children}</div>
    </div>
  );
}