import { useNavigate } from "react-router";
import { Mail, Lock } from "lucide-react";
import PetCharacter from "../figma/PetCharacter";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--app-bg-main)] flex items-center justify-center p-4" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
      <div className="w-full max-w-[400px]">
        {/* Logo + Character */}
        <div className="flex flex-col items-center mb-6">
          <PetCharacter type="dog" size="lg" mood="happy" />
          <h1 className="text-[24px] text-[var(--app-text-main)] mt-2" style={{ fontWeight: 800, fontFamily: "'Nunito', sans-serif" }}>Petfolio</h1>
          <p className="text-[14px] text-[var(--app-text-sub)] mt-1">반려동물 금융 관리 서비스</p>
        </div>

        {/* Login Card */}
        <div className="bg-[var(--app-bg-main)] rounded-3xl border border-[var(--app-border)] p-6 space-y-4 shadow-sm" style={{ boxShadow: "0 4px 20px rgba(180, 150, 110, 0.08)" }}>
          <div>
            <label className="text-[13px] text-[var(--app-text-sub)] mb-1.5 block">이메일</label>
            <div className="flex items-center gap-2 border border-[var(--app-border)] rounded-2xl px-3 py-2.5 bg-[var(--app-bg-main)]">
              <Mail className="w-4 h-4 text-[#C4A684]" />
              <input
                type="email"
                placeholder="example@email.com"
                className="flex-1 bg-transparent outline-none text-[14px] text-[var(--app-text-main)] placeholder:text-[#C4B8A4]"
              />
            </div>
          </div>
          <div>
            <label className="text-[13px] text-[var(--app-text-sub)] mb-1.5 block">비밀번호</label>
            <div className="flex items-center gap-2 border border-[var(--app-border)] rounded-2xl px-3 py-2.5 bg-[var(--app-bg-main)]">
              <Lock className="w-4 h-4 text-[#C4A684]" />
              <input
                type="password"
                placeholder="비밀번호 입력"
                className="flex-1 bg-transparent outline-none text-[14px] text-[var(--app-text-main)] placeholder:text-[#C4B8A4]"
              />
            </div>
          </div>

          <button
            className="w-full py-3 text-white rounded-2xl text-[15px] font-semibold hover:opacity-90 transition-opacity active:scale-[0.99]"
            style={{ background: "linear-gradient(135deg, var(--app-primary), var(--app-primary-dark))" }}
            onClick={() => navigate("/")}
          >
            로그인
          </button>

          <div className="relative py-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--app-border)]" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[var(--app-bg-main)] px-3 text-[12px] text-[var(--app-text-tertiary)]">또는</span>
            </div>
          </div>

          <button
            className="w-full py-3 border border-[var(--app-border)] rounded-2xl text-[14px] text-[var(--app-text-secondary)] flex items-center justify-center gap-2 hover:bg-[var(--app-bg-main)] transition-colors"
            onClick={() => navigate("/")}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google로 로그인
          </button>
        </div>

        <div className="flex items-center justify-center gap-1 mt-5">
          <span className="text-[13px] text-[var(--app-text-sub)]">계정이 없으신가요?</span>
          <button
            className="text-[13px] text-[var(--app-primary)] hover:underline"
            onClick={() => navigate("/register")}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
