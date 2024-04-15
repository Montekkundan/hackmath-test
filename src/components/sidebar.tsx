import Link from "next/link";
import Image from "next/image";
import {
  ClerkLoading,
  ClerkLoaded,
  UserButton,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";

import { cn } from "@/lib/utils";

import { SidebarItem } from "./sidebar-item";

type Props = {
  className?: string;
};

export const Sidebar = ({ className }: Props) => {
  return (
    <div className={cn(
      "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
      className,
    )}>
      <Link href="/learn">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/mascot.png" height={40} width={40} alt="Mascot" />
          <h1 className="text-2xl font-extrabold tracking-wide">
            HackMath.
          </h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem 
          label="Learn" 
          href="/learn"
          iconSrc="/images/learn.svg"
        />
        <SidebarItem 
          label="Courses" 
          href="/courses"
          iconSrc="/images/courses.svg"
        />
        <SidebarItem 
          label="Analytics" 
          href="/analytics"
          iconSrc="/images/analytics.svg"
        />
        <SidebarItem 
          label="dr ham" 
          href="/chat"
          iconSrc="/drham.svg"
        />
        <SidebarItem 
          label="Leaderboard" 
          href="/leaderboard"
          iconSrc="/images/leaderboard.svg"
        />
        <SidebarItem 
          label="quests" 
          href="/quests"
          iconSrc="/images/quests.svg"
        />
        <SidebarItem 
          label="shop" 
          href="/shop"
          iconSrc="/images/shop.svg"
        />
      </div>
      <div className="p-4">
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton afterSignOutUrl="/" />
        </ClerkLoaded>
      </div>
    </div>
  );
};