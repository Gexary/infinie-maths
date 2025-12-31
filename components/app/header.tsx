"use client";

import { useApp, useGradeLevels } from "@/contexts/app-context";
import { useGradeLevel } from "@/contexts/grade-level-context";
import { cn } from "@/lib/utils";
import { MenuIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";

interface NavLinkProps {
  href: string;
  name: string;
  icon?: React.ReactNode;
}

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const scrollDirection = useRef<"up" | "down">("up");
  const lastScrollDate = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

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
          <Link href={"/"} className="flex flex-row items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={40} height={40} className="size-8" />
            <span className="text-xl font-bold">InfinieMaths</span>
          </Link>
          <span className="text-gray-300 hidden lg:inline-block">Les maths du lycée, simplement.</span>
        </div>
        <div className="flex-row gap-4 items-center hidden md:flex">
          <NavLinks />
        </div>
        <div className="block md:hidden">
          <button className="border-none outline-none cursor-pointer size-8 text-2xl bg-transparent hover:bg-white/5 flex flex-row items-center justify-center rounded-md" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </header>
      <div
        className={cn("fixed w-full z-50 overflow-hidden bg-gray-950/90 backdrop-blur-3xl top-[4rem] left-0 transition-all duration-500 ease-in-out", {
          "h-0": !mobileMenuOpen,
          "h-[calc(100vh-4rem)]": mobileMenuOpen,
        })}
      >
        <div className="flex-col gap-4 items-center flex p-8">
          <NavLinks />
        </div>
      </div>
    </>
  );
}

function NavLinks() {
  const { gradeSlug } = useParams<{ gradeSlug: string | undefined }>();
  const { iterateOver } = useGradeLevels();

  return (
    <>
      <NavLink name="Accueil" href="/" />
      {iterateOver((grade, i) => (
        <NavLink name={grade.name} href={`/niveau/${grade.slug}`} active={grade.slug === gradeSlug} key={i} />
      ))}
      <NavLink name="Premium" href="/premium" variant="premium" />
    </>
  );
}

function NavLink({ href, name, active, variant }: NavLinkProps & { active?: boolean; variant?: "premium" }) {
  const pathname = usePathname();
  if (active === undefined) active = pathname === href;

  return (
    <Link
      className={cn("flex flex-row items-center gap-2 px-4 py-1 rounded-full border text-base text-white border-transparent transition", {
        "text-orange-500 border-orange-500": active,
        "text-yellow-500 border-yellow-500": variant === "premium",
      })}
      href={href}
    >
      {variant === "premium" && <FaStar className="size-4" />}
      {name}
    </Link>
  );
}
