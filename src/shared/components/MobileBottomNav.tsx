"use client";
import { QrCode } from "lucide-react";

interface NavItem {
    href?: string;
    to?: string;
    icon: React.ElementType;
    label: string;
}

interface MobileBottomNavProps {
    items: NavItem[];
    onItemClick: (item: NavItem) => void;
    onQrClick: () => void;
    isActive: (path: string) => boolean;
}

export default function MobileBottomNav({ items, onItemClick, onQrClick, isActive }: MobileBottomNavProps) {
    const leftItems = items.slice(0, 3);
    const rightItems = items.slice(3, 6);

    const renderItem = (item: NavItem) => {
        const path = item.href || item.to || "";
        const active = isActive(path);

        return (
            <button
                key={path}
                onClick={() => onItemClick(item)}
                className="flex flex-col items-center justify-center w-full h-full gap-1 active:scale-95 transition-transform appearance-none bg-transparent"
            >
                <div className={`flex flex-col items-center p-1.5 rounded-xl ${active ? "text-black" : "text-[var(--app-text-tertiary)] hover:text-[#6B4F3A]"}`}>
                    <item.icon className="w-5 h-5" strokeWidth={active ? 2.5 : 2} />
                    <span className="text-[10px] mt-0.5" style={{ fontWeight: active ? 700 : 500 }}>
                        {item.label}
                    </span>
                </div>
            </button>
        );
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 h-[64px] bg-white border-t border-[var(--app-border)] lg:hidden z-50 flex items-center justify-between px-2 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.03)]" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
            {/* Left Items */}
            <div className="flex-1 flex items-center h-full">
                {leftItems.map(renderItem)}
            </div>

            {/* Central QR Button Wrapper - Protruding */}
            <div className="w-[72px] h-full relative shrink-0 flex justify-center">
                <button
                    onClick={onQrClick}
                    className="absolute -top-6 w-[60px] h-[60px] rounded-full flex flex-col items-center justify-center text-white shadow-lg active:scale-95 transition-all border-[4px] border-[var(--app-bg-tertiary)]"
                    style={{ background: "linear-gradient(135deg, var(--app-primary), var(--app-primary-dark))", boxShadow: "0 8px 16px rgba(212,165,116,0.3)" }}
                >
                    <QrCode className="w-7 h-7" strokeWidth={1.5} />
                </button>
                <div className="absolute bottom-1.5 w-full text-center">
                    <span className="text-[10px] text-[var(--app-primary-dark)]" style={{ fontWeight: 800 }}>QR 결제</span>
                </div>
            </div>

            {/* Right Items */}
            <div className="flex-1 flex items-center h-full">
                {rightItems.map(renderItem)}
            </div>
        </div>
    );
}

