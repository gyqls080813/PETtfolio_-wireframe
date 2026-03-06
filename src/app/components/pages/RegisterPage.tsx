import { useNavigate } from "react-router";
import { PawPrint, Mail, Lock, User, ChevronLeft, Check } from "lucide-react";
import { useState } from "react";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [agreements, setAgreements] = useState<boolean[]>([false, false, false]);

  const toggleAll = () => {
    const allChecked = agreements.every(Boolean);
    setAgreements(agreements.map(() => !allChecked));
  };

  const toggle = (i: number) => {
    const next = [...agreements];
    next[i] = !next[i];
    setAgreements(next);
  };

  const terms = ["[필수] 서비스 이용약관 동의", "[필수] 개인정보 수집 및 이용 동의", "[선택] 마케팅 정보 수신 동의"];

  return (
    <div className="min-h-screen bg-[var(--app-bg-main)] flex items-center justify-center p-4" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
      <div className="w-full max-w-[400px]">
        <button
          className="flex items-center gap-1 text-[13px] text-[#888] mb-4 hover:text-[#666]"
          onClick={() => navigate("/login")}
        >
          <ChevronLeft className="w-4 h-4" />
          로그인으로 돌아가기
        </button>

        <div className="flex flex-col items-center mb-6">
          <PawPrint className="w-8 h-8 text-[var(--app-primary)] mb-2" />
          <h1 className="text-[22px] text-[#222]" style={{ fontWeight: 700 }}>회원가입</h1>
        </div>

        <div className="bg-white rounded-2xl border border-[var(--app-border)] p-6 space-y-4">
          <div>
            <label className="text-[13px] text-[#666] mb-1.5 block">닉네임</label>
            <div className="flex items-center gap-2 border border-[#DDD] rounded-lg px-3 py-2.5 bg-[var(--app-bg-main)]">
              <User className="w-4 h-4 text-[#AAA]" />
              <input placeholder="닉네임" className="flex-1 bg-transparent outline-none text-[14px] placeholder:text-[#CCC]" />
            </div>
          </div>
          <div>
            <label className="text-[13px] text-[#666] mb-1.5 block">이메일</label>
            <div className="flex items-center gap-2 border border-[#DDD] rounded-lg px-3 py-2.5 bg-[var(--app-bg-main)]">
              <Mail className="w-4 h-4 text-[#AAA]" />
              <input placeholder="example@email.com" className="flex-1 bg-transparent outline-none text-[14px] placeholder:text-[#CCC]" />
            </div>
          </div>
          <div>
            <label className="text-[13px] text-[#666] mb-1.5 block">비밀번호</label>
            <div className="flex items-center gap-2 border border-[#DDD] rounded-lg px-3 py-2.5 bg-[var(--app-bg-main)]">
              <Lock className="w-4 h-4 text-[#AAA]" />
              <input type="password" placeholder="비밀번호 (8자 이상)" className="flex-1 bg-transparent outline-none text-[14px] placeholder:text-[#CCC]" />
            </div>
          </div>
          <div>
            <label className="text-[13px] text-[#666] mb-1.5 block">비밀번호 확인</label>
            <div className="flex items-center gap-2 border border-[#DDD] rounded-lg px-3 py-2.5 bg-[var(--app-bg-main)]">
              <Lock className="w-4 h-4 text-[#AAA]" />
              <input type="password" placeholder="비밀번호 재입력" className="flex-1 bg-transparent outline-none text-[14px] placeholder:text-[#CCC]" />
            </div>
          </div>

          {/* Terms */}
          <div className="border border-[#EEE] rounded-lg p-3 space-y-2">
            <button className="flex items-center gap-2 w-full" onClick={toggleAll}>
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${agreements.every(Boolean) ? "bg-[var(--app-primary)] border-[var(--app-primary)]" : "border-[#CCC]"}`}>
                {agreements.every(Boolean) && <Check className="w-3 h-3 text-white" />}
              </div>
              <span className="text-[13px] text-[#333]" style={{ fontWeight: 500 }}>전체 동의</span>
            </button>
            <div className="border-t border-[#EEE] pt-2 space-y-2">
              {terms.map((t, i) => (
                <button key={i} className="flex items-center gap-2 w-full" onClick={() => toggle(i)}>
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${agreements[i] ? "bg-[var(--app-primary)] border-[var(--app-primary)]" : "border-[#CCC]"}`}>
                    {agreements[i] && <Check className="w-2.5 h-2.5 text-white" />}
                  </div>
                  <span className="text-[12px] text-[#666]">{t}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            className="w-full py-3 bg-[var(--app-primary)] text-white rounded-lg text-[15px] hover:bg-[var(--app-primary-dark)] transition-colors"
            onClick={() => navigate("/onboarding")}
          >
            가입하기
          </button>
        </div>
      </div>
    </div>
  );
}
