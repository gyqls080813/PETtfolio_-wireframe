import { useNavigate } from "react-router";
import { useState } from "react";
import {
  Camera,
  ChevronRight,
  ChevronLeft,
  Users,
  Crown,
  UserPlus,
  Plus,
  X,
} from "lucide-react";
import PetCharacter from "../figma/PetCharacter";

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [role, setRole] = useState<"host" | "guest" | null>(null);
  const [petType, setPetType] = useState<"dog" | "cat" | null>(null);

  return (
    <div className="min-h-screen bg-[var(--app-bg-main)] flex items-center justify-center p-4" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
      <div className="w-full max-w-[480px]">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-6">
          {[0, 1, 2].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-colors ${s <= step ? "bg-[var(--app-primary)]" : "bg-[var(--app-border)]"
                }`}
            />
          ))}
        </div>

        {/* Step 0: Role Selection */}
        {step === 0 && (
          <div className="bg-[var(--app-bg-main)] rounded-3xl border border-[var(--app-border)] p-6" style={{ boxShadow: "0 4px 20px rgba(180, 150, 110, 0.08)" }}>
            <div className="text-center mb-6">
              <Users className="w-10 h-10 text-[var(--app-primary)] mx-auto mb-3" />
              <h2 className="text-[20px] text-[var(--app-text-main)]" style={{ fontWeight: 700 }}>역할을 선택하세요</h2>
              <p className="text-[13px] text-[var(--app-text-sub)] mt-1">그룹에서의 역할을 선택해주세요</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                className={`border-2 rounded-2xl p-5 text-center transition-colors ${role === "host" ? "border-[var(--app-primary)] bg-[var(--app-primary)]/5" : "border-[var(--app-border)] hover:border-[var(--app-primary)]/50"
                  }`}
                onClick={() => setRole("host")}
              >
                <Crown className="w-8 h-8 mx-auto mb-2 text-[var(--app-primary)]" />
                <div className="text-[15px] text-[var(--app-text-main)]" style={{ fontWeight: 600 }}>호스트</div>
                <div className="text-[11px] text-[var(--app-text-sub)] mt-1">그룹 생성 및 관리</div>
              </button>
              <button
                className={`border-2 rounded-2xl p-5 text-center transition-colors ${role === "guest" ? "border-[var(--app-success)] bg-[var(--app-success)]/5" : "border-[var(--app-border)] hover:border-[var(--app-success)]/50"
                  }`}
                onClick={() => setRole("guest")}
              >
                <UserPlus className="w-8 h-8 mx-auto mb-2 text-[var(--app-success)]" />
                <div className="text-[15px] text-[var(--app-text-main)]" style={{ fontWeight: 600 }}>게스트</div>
                <div className="text-[11px] text-[var(--app-text-sub)] mt-1">초대코드로 참여</div>
              </button>
            </div>

            {role === "guest" && (
              <div className="mt-4">
                <label className="text-[13px] text-[var(--app-text-sub)] mb-1.5 block">초대 코드</label>
                <input
                  placeholder="초대 코드를 입력하세요"
                  className="w-full border border-[var(--app-border)] rounded-2xl px-3 py-2.5 bg-[var(--app-bg-main)] text-[14px] placeholder:text-[#C4B8A4] outline-none"
                />
              </div>
            )}

            <button
              className="w-full mt-5 py-3 text-white rounded-2xl text-[15px] hover:opacity-90 transition-colors disabled:opacity-40"
              style={{ background: "linear-gradient(135deg, var(--app-primary), var(--app-primary-dark))" }}
              disabled={!role}
              onClick={() => setStep(1)}
            >
              다음
              <ChevronRight className="w-4 h-4 inline ml-1" />
            </button>
          </div>
        )}

        {/* Step 1: Pet Type & Basic Info */}
        {step === 1 && (
          <div className="bg-[var(--app-bg-main)] rounded-3xl border border-[var(--app-border)] p-6" style={{ boxShadow: "0 4px 20px rgba(180, 150, 110, 0.08)" }}>
            <button className="flex items-center gap-1 text-[13px] text-[var(--app-text-sub)] mb-4" onClick={() => setStep(0)}>
              <ChevronLeft className="w-4 h-4" /> 이전
            </button>
            <div className="text-center mb-5">
              <h2 className="text-[20px] text-[var(--app-text-main)]" style={{ fontWeight: 700 }}>반려동물 등록</h2>
              <p className="text-[13px] text-[var(--app-text-sub)] mt-1">기본 정보를 입력해주세요</p>
            </div>

            {/* Pet type with characters */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <button
                className={`border-2 rounded-2xl p-4 flex flex-col items-center transition-colors ${petType === "dog" ? "border-[var(--app-primary)] bg-[var(--app-primary)]/5" : "border-[var(--app-border)]"
                  }`}
                onClick={() => setPetType("dog")}
              >
                <PetCharacter type="dog" size="sm" mood="happy" />
                <span className="text-[14px] text-[var(--app-text-main)] mt-1">강아지</span>
              </button>
              <button
                className={`border-2 rounded-2xl p-4 flex flex-col items-center transition-colors ${petType === "cat" ? "border-[#E8C5A0] bg-[#E8C5A0]/5" : "border-[var(--app-border)]"
                  }`}
                onClick={() => setPetType("cat")}
              >
                <PetCharacter type="cat" size="sm" mood="happy" />
                <span className="text-[14px] text-[var(--app-text-main)] mt-1">고양이</span>
              </button>
            </div>

            {/* Photo */}
            <div className="flex justify-center mb-5">
              <div className="w-24 h-24 rounded-full bg-[var(--app-bg-secondary)] border-2 border-dashed border-[#D9C8B4] flex flex-col items-center justify-center cursor-pointer hover:border-[var(--app-primary)] transition-colors">
                <Camera className="w-6 h-6 text-[var(--app-text-tertiary)]" />
                <span className="text-[10px] text-[var(--app-text-tertiary)] mt-1">대표 이미지</span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[13px] text-[var(--app-text-sub)] mb-1 block">품종</label>
                <select className="w-full border border-[var(--app-border)] rounded-2xl px-3 py-2.5 bg-[var(--app-bg-main)] text-[14px] text-[var(--app-text-main)] outline-none appearance-none">
                  <option>품종을 선택하세요</option>
                  <option>말티즈</option>
                  <option>푸들</option>
                  <option>골든리트리버</option>
                  <option>코리안숏헤어</option>
                  <option>러시안블루</option>
                  <option>스코티쉬폴드</option>
                </select>
              </div>
              <div>
                <label className="text-[13px] text-[var(--app-text-sub)] mb-1 block">이름</label>
                <input placeholder="반려동물 이름" className="w-full border border-[var(--app-border)] rounded-2xl px-3 py-2.5 bg-[var(--app-bg-main)] text-[14px] placeholder:text-[#C4B8A4] outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[13px] text-[var(--app-text-sub)] mb-1 block">생년월일</label>
                  <input type="date" className="w-full border border-[var(--app-border)] rounded-2xl px-3 py-2.5 bg-[var(--app-bg-main)] text-[14px] text-[var(--app-text-main)] outline-none" />
                </div>
                <div>
                  <label className="text-[13px] text-[var(--app-text-sub)] mb-1 block">성별</label>
                  <select className="w-full border border-[var(--app-border)] rounded-2xl px-3 py-2.5 bg-[var(--app-bg-main)] text-[14px] text-[var(--app-text-main)] outline-none appearance-none">
                    <option>수컷</option>
                    <option>암컷</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[13px] text-[var(--app-text-sub)] mb-1 block">몸무게 (kg)</label>
                <input type="number" placeholder="0.0" className="w-full border border-[var(--app-border)] rounded-2xl px-3 py-2.5 bg-[var(--app-bg-main)] text-[14px] placeholder:text-[#C4B8A4] outline-none" />
              </div>
            </div>

            <button
              className="w-full mt-5 py-3 text-white rounded-2xl text-[15px] hover:opacity-90 transition-colors"
              style={{ background: "linear-gradient(135deg, var(--app-primary), var(--app-primary-dark))" }}
              onClick={() => setStep(2)}
            >
              다음 <ChevronRight className="w-4 h-4 inline ml-1" />
            </button>
          </div>
        )}

        {/* Step 2: Optional Health Info */}
        {step === 2 && (
          <div className="bg-[var(--app-bg-main)] rounded-3xl border border-[var(--app-border)] p-6" style={{ boxShadow: "0 4px 20px rgba(180, 150, 110, 0.08)" }}>
            <button className="flex items-center gap-1 text-[13px] text-[var(--app-text-sub)] mb-4" onClick={() => setStep(1)}>
              <ChevronLeft className="w-4 h-4" /> 이전
            </button>
            <div className="text-center mb-5">
              <PetCharacter type={petType === "cat" ? "cat" : "dog"} size="md" mood="excited" className="mx-auto" />
              <h2 className="text-[20px] text-[var(--app-text-main)] mt-2" style={{ fontWeight: 700 }}>건강 정보 (선택)</h2>
              <p className="text-[13px] text-[var(--app-text-sub)] mt-1">나중에 마이페이지에서 수정할 수 있어요</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-[var(--app-border)] rounded-2xl bg-[var(--app-bg-main)]">
                <span className="text-[14px] text-[var(--app-text-secondary)]">중성화 여부</span>
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded-xl text-[13px] bg-[var(--app-primary)]/10 text-[var(--app-primary)]">완료</button>
                  <button className="px-3 py-1 rounded-xl text-[13px] bg-[#F5EDDF] text-[var(--app-text-sub)]">미완료</button>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border border-[var(--app-border)] rounded-2xl bg-[var(--app-bg-main)]">
                <span className="text-[14px] text-[var(--app-text-secondary)]">예방접종 여부</span>
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded-xl text-[13px] bg-[var(--app-primary)]/10 text-[var(--app-primary)]">완료</button>
                  <button className="px-3 py-1 rounded-xl text-[13px] bg-[#F5EDDF] text-[var(--app-text-sub)]">미완료</button>
                </div>
              </div>

              <div>
                <label className="text-[13px] text-[var(--app-text-sub)] mb-1.5 block">보유 질환</label>
                <div className="border border-[var(--app-border)] rounded-2xl p-3 bg-[var(--app-bg-main)]">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="px-2.5 py-1 bg-[#E07C6A]/10 text-[#E07C6A] rounded-full text-[12px] flex items-center gap-1">
                      슬개골 탈구 <X className="w-3 h-3 cursor-pointer" />
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input placeholder="질병 코드 또는 질병명 검색" className="flex-1 text-[13px] bg-transparent outline-none placeholder:text-[#C4B8A4]" />
                    <Plus className="w-4 h-4 text-[var(--app-primary)] cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                className="flex-1 py-3 border border-[var(--app-border)] text-[var(--app-text-sub)] rounded-2xl text-[14px] hover:bg-[var(--app-bg-secondary)] transition-colors"
                onClick={() => navigate("/")}
              >
                건너뛰기
              </button>
              <button
                className="flex-1 py-3 text-white rounded-2xl text-[14px] hover:opacity-90 transition-colors"
                style={{ background: "linear-gradient(135deg, var(--app-primary), var(--app-primary-dark))" }}
                onClick={() => navigate("/")}
              >
                완료
              </button>
            </div>

            <button className="w-full mt-3 py-2 text-[13px] text-[var(--app-primary)] hover:underline">
              + 반려동물 추가 등록하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
