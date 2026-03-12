import { Outlet, NavLink, useNavigate, useLocation } from "react-router";
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
} from "lucide-react";
import { useState } from "react";
import dogImg from "../../assets/pome.png";
import MobileBottomNav from "./MobileBottomNav";

const navItems = [
  { to: "/", icon: Home, label: "홈" },
  { to: "/ledger", icon: BookOpen, label: "가계부" },
  { to: "/accounts", icon: Landmark, label: "페이 관리" },
  { to: "/savings", icon: PiggyBank, label: "저축 관리" },
  { to: "/reports", icon: BarChart3, label: "리포트" },
  { to: "/supplies", icon: Package, label: "소모품" },
];

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const currentPageLabel =
    navItems.find((item) =>
      item.to === "/"
        ? location.pathname === "/"
        : location.pathname.startsWith(item.to),
    )?.label ?? "홈";

  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <div className="flex h-screen w-full bg-[var(--app-bg-tertiary)] overflow-hidden relative" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
      {/* Sidebar */}
      <aside className={`hidden lg:flex flex-col bg-[var(--app-bg-main)] border-r border-[var(--app-border)] shrink-0 transition-[width] duration-300 overflow-hidden z-20 ${isCollapsed ? 'w-[76px]' : 'w-[240px]'}`}>
        <div className={`flex h-[60px] items-center border-b border-[var(--app-border)] shrink-0 ${isCollapsed ? 'justify-center px-0' : 'px-4 gap-2'}`}>
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-1.5 text-[#8B7355] hover:bg-[var(--app-bg-secondary)] rounded-xl shrink-0 transition-colors">
            <Menu className="w-6 h-6" />
          </button>
          {!isCollapsed && (
            <div className="flex items-center gap-2 cursor-pointer overflow-hidden transition-opacity duration-300" onClick={() => navigate("/")}>
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
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={`flex transition-all ${isCollapsed ? 'flex-col items-center justify-center gap-1 py-3 rounded-[16px]' : 'items-center gap-3 px-3 py-2.5 rounded-[16px]'} ${isActive(item.to)
                ? "bg-[var(--app-highlight)] text-[var(--app-highlight-text)] shadow-sm"
                : "text-[#8B7355] hover:bg-[var(--app-bg-secondary)] hover:text-[#6B4F3A]"
                }`}
              style={isActive(item.to) && !isCollapsed ? { boxShadow: "0 2px 8px rgba(212, 165, 116, 0.3)" } : {}}
            >
              <item.icon className="w-5 h-5 shrink-0" strokeWidth={isActive(item.to) ? 2.5 : 2} />
              <span className={isCollapsed ? "text-[11px] font-[600] whitespace-nowrap" : "text-[14px] font-[600]"}>
                {item.label}
              </span>
            </NavLink>
          ))}
        </nav>
        <div className={`hidden lg:flex pb-6 pt-3 mt-auto border-t border-[var(--app-border)] bg-[var(--app-bg-main)] shrink-0 ${isCollapsed ? 'px-2 flex-col items-center' : 'px-3'}`}>
          <div
            className={`flex items-center gap-2 py-2.5 rounded-[16px] hover:bg-[var(--app-bg-secondary)] transition-colors cursor-pointer w-full ${isCollapsed ? 'justify-center px-0' : 'px-3'}`}
            onClick={() => navigate("/mypage")}
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
              <div className="flex items-center gap-2 lg:hidden cursor-pointer mr-2" onClick={() => navigate("/")}>
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
              onClick={() => navigate("/mypage")}
            >
              <span className="text-white text-[13px]" style={{ fontWeight: 700, fontFamily: "'Nunito', sans-serif" }}>
                R
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 pb-20 lg:pb-6 custom-scrollbar relative">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom App Bar Navigation */}
      <MobileBottomNav items={navItems} onItemClick={(item) => navigate(item.to || "")} isActive={isActive} />
    </div>
  );
}
