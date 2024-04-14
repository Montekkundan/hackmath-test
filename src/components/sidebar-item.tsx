"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { IconAI } from "./ui/icons";

type Props = {
  label: string;
  iconSrc: string;
  href: string;
};

export const SidebarItem = ({
  label,
  iconSrc,
  href,
}: Props) => {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Button
      variant={active ? "sidebarOutline"  : "sidebar"}
      className="justify-start h-[52px]"
      asChild
    >
      <Link href={href}>
        <Image
          src={iconSrc}
          alt={label}
          className="mr-5"
          height={32}
          width={32}
        />
        {/* TODO: Dr Ham premium if user is subscribed */}
        {/* {label === "dr ham" ? (
          <span className="text-lg font-semibold flex items-center gap-2">dr ham <IconAI/></span>
        ) : (
          <span>{label}</span>
        )} */}
        {label}
      </Link>
    </Button>
  );
};