"use client";

import { cn } from "@/lib/utils";
import { MenuIcon, StarIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";

interface NavLinkProps {
  href: string;
  name: string;
  icon?: React.ReactNode;
  active?: boolean;
}

const navLinks: NavLinkProps[] = [
  {
    href: "/",
    name: "Accueil",
  },
  {
    href: "/seconde",
    name: "Seconde",
    active: true,
  },
  {
    href: "/premiere",
    name: "Première",
  },
  {
    href: "/terminale",
    name: "Terminale",
  },
  {
    href: "/premium",
    name: "Pass Premium",
    // icon: <FaStar />
  },
];

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const scrollDirection = useRef<"up" | "down">("up");
  const lastScrollDate = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;

      // Detect direction
      scrollDirection.current = currentY > lastScrollY.current ? "down" : "up";

      lastScrollY.current = currentY;

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

      // Wait for scroll end
      scrollTimeout.current = setTimeout(() => {
        if (scrollDirection.current === "down") {
          setHidden(true);
        } else {
          setHidden(false);
        }
      }, 120); // délai après fin de scroll (ajustable)
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 h-16 w-full bg-gray-950 flex flex-row justify-between items-center px-4 md:px-8 lg:px-16 border-b border-gray-800">
        <div className="flex flex-row items-center gap-4">
          <div className="flex flex-row items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={40} height={40} className="size-8" />
            <span className="text-xl font-bold">InfinieMaths</span>
          </div>
          <span className="text-gray-300 hidden md:inline-block">Les maths du lycée, simplement.</span>
        </div>

        <div className="flex-row gap-4 items-center hidden md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn("flex flex-row items-center gap-2 px-4 py-1 rounded-full border text-base text-white border-transparent transition", {
                "text-primary border-primary": link.active,
                "text-yellow-500 border-yellow-500": link.href === "/premium",
              })}
            >
              {link.href === "/premium" ? <FaStar className="size-4" /> : null}
              {link.name}
            </Link>
          ))}
        </div>
        <div className="block md:hidden">
          <button className="border-none outline-none cursor-pointer size-8 text-2xl bg-transparent hover:bg-white/5 flex flex-row items-center justify-center rounded-md" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </header>
      {/* <div className="absolute w-full h-[calc(100vh-4rem)] z-50 bg-red-500 top-auto left-0 p-8">
        <div className="flex-col gap-4 items-center flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn("hover:text-white/80 hover:underline px-4 py-1 rounded-full border text-base text-white border-transparent transition", {
                "text-primary border-primary": link.active,
              })}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div> */}
    </>
  );
}
