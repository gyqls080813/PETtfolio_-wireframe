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
  LogOut,
  Menu,
  X,
  Activity,
} from "lucide-react";
import { useState } from "react";
import PetCharacter from "./figma/PetCharacter";

const navItems = [
  { to: "/", icon: Home, label: "홈" },
  { to: "/ledger", icon: BookOpen, label: "가계부" },
  { to: "/accounts", icon: Landmark, label: "페이 관리" },
  { to: "/savings", icon: PiggyBank, label: "저축 관리" },
  { to: "/reports", icon: BarChart3, label: "리포트" },
  { to: "/health", icon: Activity, label: "건강 검진" },
  { to: "/supplies", icon: Package, label: "소모품" },
  { to: "/mypage", icon: User, label: "마이페이지" },
];

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentPageLabel =
    navItems.find((item) =>
      item.to === "/"
        ? location.pathname === "/"
        : location.pathname.startsWith(item.to),
    )?.label ?? "홈";

  return (
    <div
      className="flex h-screen bg-[var(--app-bg-main)]"
      style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
    >
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-[240px] bg-[var(--app-bg-main)] border-r border-[var(--app-border)] shrink-0">
        <div
          className="flex items-center gap-2 px-5 py-4 border-b border-[var(--app-border)] cursor-pointer"
          onClick={() => navigate("/")}
        >
          <PetCharacter type="dog" size="sm" mood="happy" />
          <span
            className="text-[18px] tracking-tight"
            style={{
              fontWeight: 800,
              color: "var(--app-primary)",
              fontFamily: "'Nunito', sans-serif",
            }}
          >
            Petfolio
          </span>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all ${isActive
                  ? "bg-gradient-to-r from-[var(--app-primary)] to-[var(--app-primary-dark)] text-white shadow-sm"
                  : "text-[var(--app-text-sub)] hover:bg-[var(--app-bg-secondary)] hover:text-[#6B4F3A]"
                }`
              }
              style={({ isActive }) => isActive ? { boxShadow: "0 2px 8px rgba(212, 165, 116, 0.3)" } : {}}
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className="w-5 h-5"
                    strokeWidth={isActive ? 2 : 1.5}
                  />
                  <span
                    className="text-[14px]"
                    style={{ fontWeight: isActive ? 600 : 400 }}
                  >
                    {item.label}
                  </span>
                  {isActive && <span className="ml-auto text-white/60">›</span>}
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="px-3 pb-4 space-y-2">
          <div
            className="flex items-center gap-2 px-3 py-2.5 rounded-2xl hover:bg-[var(--app-bg-secondary)] transition-colors cursor-pointer w-full"
            onClick={() => navigate("/mypage")}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--app-primary)] to-[var(--app-primary-dark)] flex items-center justify-center shadow-sm shrink-0">
              <span
                className="text-white text-[13px]"
                style={{
                  fontWeight: 700,
                  fontFamily: "'Nunito', sans-serif",
                }}
              >
                R
              </span>
            </div>
            <span className="text-[14px] text-[var(--app-text-secondary)] font-medium">김집사</span>
          </div>
          <button
            className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-[var(--app-text-tertiary)] hover:bg-[var(--app-bg-secondary)] hover:text-[#6B4F3A] w-full transition-colors"
            onClick={() => navigate("/login")}
          >
            <LogOut className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-[14px]">로그아웃</span>
          </button>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative w-[260px] h-full bg-[var(--app-bg-main)] flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--app-border)]">
              <div className="flex items-center gap-2">
                <PetCharacter type="dog" size="sm" mood="happy" />
                <span
                  className="text-[16px]"
                  style={{
                    fontWeight: 800,
                    color: "var(--app-primary)",
                    fontFamily: "'Nunito', sans-serif",
                  }}
                >
                  Petfolio
                </span>
              </div>
              <button onClick={() => setMobileOpen(false)}>
                <X className="w-5 h-5 text-[var(--app-text-sub)]" />
              </button>
            </div>
            <nav className="flex-1 py-4 px-3 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all ${isActive
                      ? "bg-gradient-to-r from-[var(--app-primary)] to-[var(--app-primary-dark)] text-white shadow-sm"
                      : "text-[var(--app-text-sub)] hover:bg-[var(--app-bg-secondary)] hover:text-[#6B4F3A]"
                    }`
                  }
                  style={({ isActive }) => isActive ? { boxShadow: "0 2px 8px rgba(212, 165, 116, 0.3)" } : {}}
                >
                  {({ isActive }) => (
                    <>
                      <item.icon
                        className="w-5 h-5"
                        strokeWidth={isActive ? 2 : 1.5}
                      />
                      <span
                        className="text-[14px]"
                        style={{ fontWeight: isActive ? 600 : 400 }}
                      >
                        {item.label}
                      </span>
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
            <div className="px-3 pb-8 space-y-2 mt-auto">
              <div
                className="flex items-center gap-2 px-3 py-2.5 rounded-2xl hover:bg-[var(--app-bg-secondary)] transition-colors cursor-pointer w-full"
                onClick={() => { setMobileOpen(false); navigate("/mypage"); }}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--app-primary)] to-[var(--app-primary-dark)] flex items-center justify-center shadow-sm shrink-0">
                  <span
                    className="text-white text-[13px]"
                    style={{
                      fontWeight: 700,
                      fontFamily: "'Nunito', sans-serif",
                    }}
                  >
                    R
                  </span>
                </div>
                <span className="text-[14px] text-[var(--app-text-secondary)] font-medium">김집사</span>
              </div>
              <button
                className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-[var(--app-text-tertiary)] hover:bg-[var(--app-bg-secondary)] hover:text-[#6B4F3A] w-full transition-colors"
                onClick={() => { setMobileOpen(false); navigate("/login"); }}
              >
                <LogOut className="w-5 h-5" strokeWidth={1.5} />
                <span className="text-[14px]">로그아웃</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-[60px] bg-[var(--app-bg-main)] border-b border-[var(--app-border)] flex items-center justify-between px-4 lg:px-6 shrink-0">
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setMobileOpen(true)}>
              <Menu className="w-6 h-6 text-[var(--app-text-sub)]" />
            </button>
            <span
              className="text-[16px] text-[var(--app-text-main)]"
              style={{ fontWeight: 600 }}
            >
              {currentPageLabel}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-2xl hover:bg-[var(--app-bg-secondary)] transition-colors">
              <Bell className="w-5 h-5 text-[var(--app-text-sub)]" strokeWidth={1.5} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E07C6A] rounded-full" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
