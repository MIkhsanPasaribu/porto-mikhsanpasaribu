"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  HomeIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  CodeBracketIcon,
  BeakerIcon,
  SparklesIcon,
  TrophyIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  ArrowLeftOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/shared/utils/cn";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: HomeIcon, exact: true },
  { href: "/admin/hero", label: "Hero Info", icon: UserCircleIcon },
  { href: "/admin/experience", label: "Pengalaman", icon: BriefcaseIcon },
  { href: "/admin/education", label: "Pendidikan", icon: AcademicCapIcon },
  { href: "/admin/projects", label: "Proyek", icon: CodeBracketIcon },
  { href: "/admin/research", label: "Riset", icon: BeakerIcon },
  { href: "/admin/skills", label: "Keahlian", icon: SparklesIcon },
  { href: "/admin/certifications", label: "Sertifikasi", icon: TrophyIcon },
  { href: "/admin/awards", label: "Penghargaan", icon: TrophyIcon },
  { href: "/admin/volunteer", label: "Relawan", icon: HeartIcon },
  { href: "/admin/contact", label: "Kontak", icon: ChatBubbleLeftRightIcon },
];

function NavItem({
  href,
  label,
  icon: Icon,
  exact,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  exact?: boolean;
}) {
  const pathname = usePathname();
  // Jangan aktifkan sidebar di halaman login
  if (pathname === "/admin/login") return null;
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors",
        isActive
          ? "bg-primary text-white"
          : "text-neutral-600 hover:bg-surface-variant hover:text-on-surface"
      )}
    >
      <Icon className="w-4 h-4 shrink-0" />
      <span>{label}</span>
    </Link>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Render tanpa sidebar untuk halaman login
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const pathname = usePathname();
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex bg-surface">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-neutral-300/30 flex flex-col bg-surface">
        <div className="px-4 py-5 border-b border-neutral-300/30">
          <Link href="/" className="text-sm font-bold text-on-surface hover:text-primary transition-colors">
            ← Portfolio
          </Link>
          <p className="text-xs text-neutral-500 mt-0.5">Admin Panel</p>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => (
            <NavItem key={item.href} {...item} />
          ))}
        </nav>

        <div className="p-3 border-t border-neutral-300/30">
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-md text-sm font-medium text-neutral-600 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <ArrowLeftOnRectangleIcon className="w-4 h-4" />
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  );
}
