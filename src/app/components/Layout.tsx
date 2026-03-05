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
  PawPrint,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { to: "/", icon: Home, label: "홈" },
  { to: "/ledger", icon: BookOpen, label: "가계부" },
  { to: "/accounts", icon: Landmark, label: "페이 관리" },
  { to: "/savings", icon: PiggyBank, label: "저축 관리" },
  { to: "/reports", icon: BarChart3, label: "리포트" },
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
      className="flex h-screen bg-[#FAF8F5]"
      style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
    >
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-[240px] bg-white border-r border-[#F0EBE3] shrink-0">
        <div
          className="flex items-center gap-2 px-6 py-5 border-b border-[#F0EBE3] cursor-pointer"
          onClick={() => navigate("/")}
        >
          <PawPrint className="w-7 h-7 text-[#F59E0B]" />
          <span
            className="text-[18px] tracking-tight"
            style={{
              fontWeight: 800,
              color: "#F59E0B",
              fontFamily: "'Nunito', sans-serif",
            }}
          >
            pawwallet
          </span>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white shadow-sm shadow-amber-200"
                    : "text-[#6B7280] hover:bg-[#FEF9EC] hover:text-[#D97706]"
                }`
              }
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
        <div className="px-3 pb-4">
          <button
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#9CA3AF] hover:bg-[#FEF9EC] hover:text-[#D97706] w-full transition-colors"
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
          <aside className="relative w-[260px] h-full bg-white flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#F0EBE3]">
              <div className="flex items-center gap-2">
                <PawPrint className="w-6 h-6 text-[#F59E0B]" />
                <span
                  className="text-[16px]"
                  style={{
                    fontWeight: 800,
                    color: "#F59E0B",
                    fontFamily: "'Nunito', sans-serif",
                  }}
                >
                  pawwallet
                </span>
              </div>
              <button onClick={() => setMobileOpen(false)}>
                <X className="w-5 h-5 text-[#6B7280]" />
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
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white shadow-sm shadow-amber-200"
                        : "text-[#6B7280] hover:bg-[#FEF9EC] hover:text-[#D97706]"
                    }`
                  }
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
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-[60px] bg-white border-b border-[#F0EBE3] flex items-center justify-between px-4 lg:px-6 shrink-0">
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setMobileOpen(true)}>
              <Menu className="w-6 h-6 text-[#6B7280]" />
            </button>
            <span
              className="text-[16px] text-[#111827]"
              style={{ fontWeight: 600 }}
            >
              {currentPageLabel}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-xl hover:bg-[#FEF9EC] transition-colors">
              <Bell className="w-5 h-5 text-[#6B7280]" strokeWidth={1.5} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EF4444] rounded-full" />
            </button>
            <div
              className="flex items-center gap-2 px-2 py-1 rounded-xl hover:bg-[#FEF9EC] transition-colors cursor-pointer"
              onClick={() => navigate("/mypage")}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#F97316] flex items-center justify-center shadow-sm">
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
              <span className="text-[13px] text-[#374151] hidden sm:block">
                김집사
              </span>
            </div>
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
