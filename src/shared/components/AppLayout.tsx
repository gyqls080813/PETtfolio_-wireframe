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
    Menu,
    Activity,
    QrCode,
    X,
    Send,
    Wallet,
} from "lucide-react";
import { useState, useEffect } from "react";
import dogImg from "../../assets/pome.png";
import MobileBottomNav from "./MobileBottomNav";

const navItems = [
    { href: "/", icon: Home, label: "홈" },
    { href: "/ledger", icon: BookOpen, label: "가계부" },
    { href: "/accounts", icon: Landmark, label: "페이 관리" },
    { href: "/savings", icon: PiggyBank, label: "저축 관리" },
    { href: "/reports", icon: BarChart3, label: "리포트" },
    { href: "/supplies", icon: Package, label: "소모품" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isQrModalOpen, setIsQrModalOpen] = useState(false);

    useEffect(() => {
        const handleOpenQr = () => setIsQrModalOpen(true);
        window.addEventListener('openQrModal', handleOpenQr);
        return () => window.removeEventListener('openQrModal', handleOpenQr);
    }, []);

    const currentPageLabel =
        navItems.find((item) =>
            item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href)
        )?.label ?? "홈";

    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname.startsWith(href);

    return (
        <div
            className="flex h-screen w-full bg-[var(--app-bg-tertiary)] overflow-hidden relative"
            style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
        >
            {/* Sidebar */}
            <aside className={`hidden lg:flex flex-col bg-[var(--app-bg-main)] border-r border-[var(--app-border)] shrink-0 transition-[width] duration-300 overflow-hidden z-20 ${isCollapsed ? 'w-[76px]' : 'w-[240px]'}`}>
                <div className={`flex h-[60px] items-center border-b border-[var(--app-border)] shrink-0 ${isCollapsed ? 'justify-center px-0' : 'px-4 gap-2'}`}>
                    <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-1.5 text-[#8B7355] hover:bg-[var(--app-bg-secondary)] rounded-xl shrink-0 transition-colors">
                        <Menu className="w-6 h-6" />
                    </button>
                    {!isCollapsed && (
                        <div className="flex items-center gap-2 cursor-pointer overflow-hidden transition-opacity duration-300" onClick={() => router.push("/")}>
                            <img src={(dogImg as any).src || (dogImg as unknown as string)} alt="logo" className="w-7 h-7 object-contain drop-shadow-sm shrink-0" />
                            <span
                                className="text-[18px] tracking-tight whitespace-nowrap"
                                style={{
                                    fontWeight: 800,
                                    color: "var(--app-primary)",
                                    fontFamily: "'Nunito', sans-serif",
                                }}
                            >
                                Petfolio
                            </span>
                        </div>
                    )}
                </div>
                <nav className={`flex-1 py-4 space-y-1.5 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${isCollapsed ? 'px-2' : 'px-3'}`}>
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex transition-all ${isCollapsed ? 'flex-col items-center justify-center gap-1 py-3 rounded-[16px]' : 'items-center gap-3 px-3 py-2.5 rounded-[16px]'} ${isActive(item.href)
                                ? "bg-black text-white shadow-sm"
                                : "text-[#8B7355] hover:bg-[var(--app-bg-secondary)] hover:text-[#6B4F3A]"
                                }`}
                            style={isActive(item.href) && !isCollapsed ? { boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)" } : {}}
                        >
                            <item.icon className="w-5 h-5 shrink-0" strokeWidth={isActive(item.href) ? 2.5 : 2} />
                            <span className={isCollapsed ? "text-[11px] font-[600] whitespace-nowrap" : "text-[14px] font-[600]"}>
                                {item.label}
                            </span>
                        </Link>
                    ))}
                </nav>
                <div className={`hidden lg:flex pb-4 pt-2 mt-auto border-t border-[var(--app-border)] bg-[var(--app-bg-main)] shrink-0 ${isCollapsed ? 'px-2 flex-col items-center' : 'px-3'}`}>
                    <div
                        className={`flex items-center gap-2 py-2 rounded-[16px] hover:bg-[var(--app-bg-secondary)] transition-colors cursor-pointer w-full ${isCollapsed ? 'justify-center px-0' : 'px-3'}`}
                        onClick={() => router.push("/mypage")}
                    >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--app-primary)] to-[var(--app-primary-dark)] flex items-center justify-center shadow-sm shrink-0">
                            <span
                                className="text-white text-[13px]"
                                style={{ fontWeight: 700, fontFamily: "'Nunito', sans-serif" }}
                            >
                                R
                            </span>
                        </div>
                        {!isCollapsed && <span className="text-[14px] text-[var(--app-text-main)] font-[700] whitespace-nowrap overflow-hidden text-ellipsis">김집사</span>}
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col min-w-0 bg-[var(--app-bg-tertiary)]">
                {/* Top bar */}
                <header className="h-[60px] bg-[var(--app-bg-main)] border-b border-[var(--app-border)] flex items-center justify-between px-4 lg:px-6 shrink-0 z-10">
                    <div className="flex items-center gap-3">
                        {isCollapsed && (
                            <div className="flex items-center gap-2 lg:hidden cursor-pointer mr-2" onClick={() => router.push("/")}>
                                <img src={(dogImg as any).src || (dogImg as unknown as string)} alt="logo" className="w-6 h-6 object-contain drop-shadow-sm shrink-0" />
                                <span className="text-[16px] tracking-tight whitespace-nowrap" style={{ fontWeight: 800, color: "var(--app-primary)", fontFamily: "'Nunito', sans-serif" }}>
                                    Petfolio
                                </span>
                            </div>
                        )}
                        <span className="text-[16px] text-[var(--app-text-main)]" style={{ fontWeight: 700 }}>
                            {currentPageLabel}
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="relative p-2 rounded-2xl hover:bg-[var(--app-bg-secondary)] transition-colors">
                            <Bell className="w-5 h-5 text-[#8B7355]" strokeWidth={2} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--app-danger)] rounded-full border border-white" />
                        </button>
                        {/* Mobile Profile */}
                        <div
                            className="flex lg:hidden items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-[var(--app-primary)] to-[var(--app-primary-dark)] shadow-sm cursor-pointer ml-1"
                            onClick={() => router.push("/mypage")}
                        >
                            <span className="text-white text-[13px]" style={{ fontWeight: 700, fontFamily: "'Nunito', sans-serif" }}>
                                R
                            </span>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-6 pb-20 lg:pb-6 custom-scrollbar relative">
                    {children}
                </main>
            </div>

            {/* Mobile Bottom App Bar Navigation */}
            <MobileBottomNav items={navItems} onItemClick={(item) => router.push(item.href || "")} onQrClick={() => setIsQrModalOpen(true)} isActive={isActive} />

            {/* QR Modal */}
            {isQrModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => setIsQrModalOpen(false)} />
                    <div className="relative bg-white rounded-[32px] w-full max-w-[360px] overflow-hidden shadow-2xl">
                        <div className="flex items-center justify-between px-6 pt-6 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #E8A365, #D48C45)" }}>
                                    <Send className="w-5 h-5 text-white" strokeWidth={2} />
                                </div>
                                <span className="text-[20px] text-[#1F2937]" style={{ fontWeight: 700 }}>QR 결제</span>
                            </div>
                            <button onClick={() => setIsQrModalOpen(false)} className="w-8 h-8 flex items-center justify-center bg-[#F3F4F6] rounded-full hover:bg-[#E5E7EB] transition-colors">
                                <X className="w-4 h-4 text-[#9CA3AF]" strokeWidth={2} />
                            </button>
                        </div>
                        <div className="px-6 pb-6 flex flex-col items-stretch">
                            <div className="bg-[#FFFDF5] rounded-[20px] p-4 flex items-center justify-between mb-8 border border-[#F3EAD5]">
                                <div className="flex items-center gap-3">
                                    <Wallet className="w-5 h-5 text-[var(--app-primary)]" strokeWidth={2} />
                                    <div className="flex flex-col">
                                        <span className="text-[12px] text-[#9CA3AF]" style={{ fontWeight: 500 }}>공동 관리 지갑</span>
                                        <span className="text-[16px] text-[#1F2937] leading-tight mt-0.5" style={{ fontWeight: 700, fontFamily: "'Nunito', sans-serif" }}>1,250,000원</span>
                                    </div>
                                </div>
                                <div className="bg-[#FDF2E3] px-3 py-1.5 rounded-full">
                                    <span className="text-[12px] text-[var(--app-primary)]" style={{ fontWeight: 600 }}>결제용</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center mb-6">
                                <div className="w-[200px] h-[200px] bg-[#F9FAFB] rounded-[32px] p-4 flex items-center justify-center mb-5">
                                    <div className="w-full h-full bg-white rounded-[20px] p-2 flex items-center justify-center">
                                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=250&data=example" alt="QR" className="w-[140px] h-[140px] mix-blend-multiply" />
                                    </div>
                                </div>
                                <span className="text-[15px] text-[#374151] mb-1.5" style={{ fontWeight: 700 }}>QR을 스캔하여 결제하세요</span>
                                <span className="text-[13px] text-[#9CA3AF]">이 QR은 5분 후 만료됩니다</span>
                            </div>
                            <div className="relative flex items-center justify-center mb-6">
                                <div className="absolute inset-x-0 h-px bg-[#F3F4F6]" />
                                <span className="relative bg-white px-3 text-[12px] text-[#9CA3AF]">또는</span>
                            </div>
                            <button className="w-full py-4 rounded-[20px] border border-[#FDE6C8] flex items-center justify-center bg-white hover:bg-[#FFFDF5] transition-colors">
                                <span className="text-[14px] text-[#B87A3E]" style={{ fontWeight: 600 }}>금액 직접 입력하기</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
