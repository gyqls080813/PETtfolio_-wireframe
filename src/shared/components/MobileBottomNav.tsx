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
    isActive: (path: string) => boolean;
}

export default function MobileBottomNav({ items, onItemClick, isActive }: MobileBottomNavProps) {

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
        <div className="fixed bottom-0 left-0 right-0 h-[64px] bg-white border-t border-[var(--app-border)] lg:hidden z-50 flex items-center justify-around px-2 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.03)]" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
            {items.map(renderItem)}
        </div>
    );
}

