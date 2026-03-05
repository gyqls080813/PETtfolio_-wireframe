"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
    Home,
    BookOpen,
    Landmark,
    PiggyBank,
    BarChart3,
    Package,
    User,
    Bell,
    LogOut,
    Menu,
    X,
} from "lucide-react";
import { useState } from "react";
import PetCharacter from "./figma/PetCharacter";

const navItems = [
    { href: "/", icon: Home, label: "홈" },
    { href: "/ledger", icon: BookOpen, label: "가계부" },
    { href: "/accounts", icon: Landmark, label: "페이 관리" },
    { href: "/savings", icon: PiggyBank, label: "저축 관리" },
    { href: "/reports", icon: BarChart3, label: "리포트" },
    { href: "/supplies", icon: Package, label: "소모품" },
    { href: "/mypage", icon: User, label: "마이페이지" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    const currentPageLabel =
        navItems.find((item) =>
            item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href)
        )?.label ?? "홈";

    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname.startsWith(href);

    const navLinkClass = (href: string) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all ${isActive(href)
            ? "bg-gradient-to-r from-[#D4A574] to-[#C4956A] text-white shadow-sm"
            : "text-[#8B7355] hover:bg-[#F9F0E4] hover:text-[#6B4F3A]"
        }`;

    return (
        <div
            className="flex h-screen bg-[#FFF8EE]"
            style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
        >
            {/* Sidebar */}
            <aside className="hidden lg:flex flex-col w-[240px] bg-[#FFFDF8] border-r border-[#E8D5C0] shrink-0">
                <div
                    className="flex items-center gap-2 px-5 py-4 border-b border-[#E8D5C0] cursor-pointer"
                    onClick={() => router.push("/")}
                >
                    <PetCharacter type="dog" size="sm" mood="happy" />
                    <span
                        className="text-[18px] tracking-tight"
                        style={{
                            fontWeight: 800,
                            color: "#D4A574",
                            fontFamily: "'Nunito', sans-serif",
                        }}
                    >
                        pawwallet
                    </span>
                </div>
                <nav className="flex-1 py-4 px-3 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={navLinkClass(item.href)}
                            style={isActive(item.href) ? { boxShadow: "0 2px 8px rgba(212, 165, 116, 0.3)" } : {}}
                        >
                            <item.icon className="w-5 h-5" strokeWidth={isActive(item.href) ? 2 : 1.5} />
                            <span className="text-[14px]" style={{ fontWeight: isActive(item.href) ? 600 : 400 }}>
                                {item.label}
                            </span>
                            {isActive(item.href) && <span className="ml-auto text-white/60">›</span>}
                        </Link>
                    ))}
                </nav>
                <div className="px-3 pb-4">
                    <button
                        className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-[#B4A08A] hover:bg-[#F9F0E4] hover:text-[#6B4F3A] w-full transition-colors"
                        onClick={() => router.push("/login")}
                    >
                        <LogOut className="w-5 h-5" strokeWidth={1.5} />
                        <span className="text-[14px]">로그아웃</span>
                    </button>
                </div>
            </aside>

            {/* Mobile sidebar overlay */}
            {mobileOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
                    <aside className="relative w-[260px] h-full bg-[#FFFDF8] flex flex-col">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8D5C0]">
                            <div className="flex items-center gap-2">
                                <PetCharacter type="dog" size="sm" mood="happy" />
                                <span
                                    className="text-[16px]"
                                    style={{ fontWeight: 800, color: "#D4A574", fontFamily: "'Nunito', sans-serif" }}
                                >
                                    pawwallet
                                </span>
                            </div>
                            <button onClick={() => setMobileOpen(false)}>
                                <X className="w-5 h-5 text-[#8B7355]" />
                            </button>
                        </div>
                        <nav className="flex-1 py-4 px-3 space-y-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={navLinkClass(item.href)}
                                    style={isActive(item.href) ? { boxShadow: "0 2px 8px rgba(212, 165, 116, 0.3)" } : {}}
                                >
                                    <item.icon className="w-5 h-5" strokeWidth={isActive(item.href) ? 2 : 1.5} />
                                    <span className="text-[14px]" style={{ fontWeight: isActive(item.href) ? 600 : 400 }}>
                                        {item.label}
                                    </span>
                                </Link>
                            ))}
                        </nav>
                    </aside>
                </div>
            )}

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top bar */}
                <header className="h-[60px] bg-[#FFFDF8] border-b border-[#E8D5C0] flex items-center justify-between px-4 lg:px-6 shrink-0">
                    <div className="flex items-center gap-3">
                        <button className="lg:hidden" onClick={() => setMobileOpen(true)}>
                            <Menu className="w-6 h-6 text-[#8B7355]" />
                        </button>
                        <span className="text-[16px] text-[#3D3229]" style={{ fontWeight: 600 }}>
                            {currentPageLabel}
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="relative p-2 rounded-2xl hover:bg-[#F9F0E4] transition-colors">
                            <Bell className="w-5 h-5 text-[#8B7355]" strokeWidth={1.5} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E07C6A] rounded-full" />
                        </button>
                        <div
                            className="flex items-center gap-2 px-2 py-1 rounded-2xl hover:bg-[#F9F0E4] transition-colors cursor-pointer"
                            onClick={() => router.push("/mypage")}
                        >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4A574] to-[#C4956A] flex items-center justify-center shadow-sm">
                                <span
                                    className="text-white text-[13px]"
                                    style={{ fontWeight: 700, fontFamily: "'Nunito', sans-serif" }}
                                >
                                    R
                                </span>
                            </div>
                            <span className="text-[13px] text-[#5C4A3A] hidden sm:block">김집사</span>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
