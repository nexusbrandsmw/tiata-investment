"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#000f22] text-white min-h-screen p-6">

      <h1 className="text-2xl font-bold mb-10">
        Nexus CMS
      </h1>

      <nav className="space-y-2">

        <Link
          href="/admin/dashboard"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition"
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link
          href="/admin/projects"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition"
        >
          <Briefcase size={18} />
          Projects
        </Link>

        <Link
          href="/admin/blog"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition"
        >
          <FileText size={18} />
          Blog
        </Link>

        <Link
          href="/admin/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition"
        >
          <Settings size={18} />
          Settings
        </Link>

      </nav>

    </aside>
  );
}