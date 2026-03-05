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
    <div className="min-h-screen bg-[#FFF8EE] flex items-center justify-center p-4" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
      <div className="w-full max-w-[480px]">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-6">
          {[0, 1, 2].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-colors ${s <= step ? "bg-[#D4A574]" : "bg-[#E8D5C0]"
                }`}
            />
          ))}
        </div>

        {/* Step 0: Role Selection */}
        {step === 0 && (
          <div className="bg-[#FFFDF8] rounded-3xl border border-[#E8D5C0] p-6" style={{ boxShadow: "0 4px 20px rgba(180, 150, 110, 0.08)" }}>
            <div className="text-center mb-6">
              <Users className="w-10 h-10 text-[#D4A574] mx-auto mb-3" />
              <h2 className="text-[20px] text-[#3D3229]" style={{ fontWeight: 700 }}>역할을 선택하세요</h2>
              <p className="text-[13px] text-[#8B7355] mt-1">그룹에서의 역할을 선택해주세요</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                className={`border-2 rounded-2xl p-5 text-center transition-colors ${role === "host" ? "border-[#D4A574] bg-[#D4A574]/5" : "border-[#E8D5C0] hover:border-[#D4A574]/50"
                  }`}
                onClick={() => setRole("host")}
              >
                <Crown className="w-8 h-8 mx-auto mb-2 text-[#D4A574]" />
                <div className="text-[15px] text-[#3D3229]" style={{ fontWeight: 600 }}>호스트</div>
                <div className="text-[11px] text-[#8B7355] mt-1">그룹 생성 및 관리</div>
              </button>
              <button
                className={`border-2 rounded-2xl p-5 text-center transition-colors ${role === "guest" ? "border-[#A8C5A0] bg-[#A8C5A0]/5" : "border-[#E8D5C0] hover:border-[#A8C5A0]/50"
                  }`}
                onClick={() => setRole("guest")}
              >
                <UserPlus className="w-8 h-8 mx-auto mb-2 text-[#A8C5A0]" />
                <div className="text-[15px] text-[#3D3229]" style={{ fontWeight: 600 }}>게스트</div>
                <div className="text-[11px] text-[#8B7355] mt-1">초대코드로 참여</div>
              </button>
            </div>

            {role === "guest" && (
              <div className="mt-4">
                <label className="text-[13px] text-[#8B7355] mb-1.5 block">초대 코드</label>
                <input
                  placeholder="초대 코드를 입력하세요"
                  className="w-full border border-[#E8D5C0] rounded-2xl px-3 py-2.5 bg-[#FFF8EE] text-[14px] placeholder:text-[#C4B8A4] outline-none"
                />
              </div>
            )}

            <button
              className="w-full mt-5 py-3 text-white rounded-2xl text-[15px] hover:opacity-90 transition-colors disabled:opacity-40"
              style={{ background: "linear-gradient(135deg, #D4A574, #C4956A)" }}
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
          <div className="bg-[#FFFDF8] rounded-3xl border border-[#E8D5C0] p-6" style={{ boxShadow: "0 4px 20px rgba(180, 150, 110, 0.08)" }}>
            <button className="flex items-center gap-1 text-[13px] text-[#8B7355] mb-4" onClick={() => setStep(0)}>
              <ChevronLeft className="w-4 h-4" /> 이전
            </button>
            <div className="text-center mb-5">
              <h2 className="text-[20px] text-[#3D3229]" style={{ fontWeight: 700 }}>반려동물 등록</h2>
              <p className="text-[13px] text-[#8B7355] mt-1">기본 정보를 입력해주세요</p>
            </div>

            {/* Pet type with characters */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <button
                className={`border-2 rounded-2xl p-4 flex flex-col items-center transition-colors ${petType === "dog" ? "border-[#D4A574] bg-[#D4A574]/5" : "border-[#E8D5C0]"
                  }`}
                onClick={() => setPetType("dog")}
              >
                <PetCharacter type="dog" size="sm" mood="happy" />
                <span className="text-[14px] text-[#3D3229] mt-1">강아지</span>
              </button>
              <button
                className={`border-2 rounded-2xl p-4 flex flex-col items-center transition-colors ${petType === "cat" ? "border-[#E8C5A0] bg-[#E8C5A0]/5" : "border-[#E8D5C0]"
                  }`}
                onClick={() => setPetType("cat")}
              >
                <PetCharacter type="cat" size="sm" mood="happy" />
                <span className="text-[14px] text-[#3D3229] mt-1">고양이</span>
              </button>
            </div>

            {/* Photo */}
            <div className="flex justify-center mb-5">
              <div className="w-24 h-24 rounded-full bg-[#F9F0E4] border-2 border-dashed border-[#D9C8B4] flex flex-col items-center justify-center cursor-pointer hover:border-[#D4A574] transition-colors">
                <Camera className="w-6 h-6 text-[#B4A08A]" />
                <span className="text-[10px] text-[#B4A08A] mt-1">대표 이미지</span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[13px] text-[#8B7355] mb-1 block">품종</label>
                <select className="w-full border border-[#E8D5C0] rounded-2xl px-3 py-2.5 bg-[#FFF8EE] text-[14px] text-[#3D3229] outline-none appearance-none">
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
                <label className="text-[13px] text-[#8B7355] mb-1 block">이름</label>
                <input placeholder="반려동물 이름" className="w-full border border-[#E8D5C0] rounded-2xl px-3 py-2.5 bg-[#FFF8EE] text-[14px] placeholder:text-[#C4B8A4] outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[13px] text-[#8B7355] mb-1 block">생년월일</label>
                  <input type="date" className="w-full border border-[#E8D5C0] rounded-2xl px-3 py-2.5 bg-[#FFF8EE] text-[14px] text-[#3D3229] outline-none" />
                </div>
                <div>
                  <label className="text-[13px] text-[#8B7355] mb-1 block">성별</label>
                  <select className="w-full border border-[#E8D5C0] rounded-2xl px-3 py-2.5 bg-[#FFF8EE] text-[14px] text-[#3D3229] outline-none appearance-none">
                    <option>수컷</option>
                    <option>암컷</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[13px] text-[#8B7355] mb-1 block">몸무게 (kg)</label>
                <input type="number" placeholder="0.0" className="w-full border border-[#E8D5C0] rounded-2xl px-3 py-2.5 bg-[#FFF8EE] text-[14px] placeholder:text-[#C4B8A4] outline-none" />
              </div>
            </div>

            <button
              className="w-full mt-5 py-3 text-white rounded-2xl text-[15px] hover:opacity-90 transition-colors"
              style={{ background: "linear-gradient(135deg, #D4A574, #C4956A)" }}
              onClick={() => setStep(2)}
            >
              다음 <ChevronRight className="w-4 h-4 inline ml-1" />
            </button>
          </div>
        )}

        {/* Step 2: Optional Health Info */}
        {step === 2 && (
          <div className="bg-[#FFFDF8] rounded-3xl border border-[#E8D5C0] p-6" style={{ boxShadow: "0 4px 20px rgba(180, 150, 110, 0.08)" }}>
            <button className="flex items-center gap-1 text-[13px] text-[#8B7355] mb-4" onClick={() => setStep(1)}>
              <ChevronLeft className="w-4 h-4" /> 이전
            </button>
            <div className="text-center mb-5">
              <PetCharacter type={petType === "cat" ? "cat" : "dog"} size="md" mood="excited" className="mx-auto" />
              <h2 className="text-[20px] text-[#3D3229] mt-2" style={{ fontWeight: 700 }}>건강 정보 (선택)</h2>
              <p className="text-[13px] text-[#8B7355] mt-1">나중에 마이페이지에서 수정할 수 있어요</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-[#E8D5C0] rounded-2xl bg-[#FFF8EE]">
                <span className="text-[14px] text-[#5C4A3A]">중성화 여부</span>
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded-xl text-[13px] bg-[#D4A574]/10 text-[#D4A574]">완료</button>
                  <button className="px-3 py-1 rounded-xl text-[13px] bg-[#F5EDDF] text-[#8B7355]">미완료</button>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border border-[#E8D5C0] rounded-2xl bg-[#FFF8EE]">
                <span className="text-[14px] text-[#5C4A3A]">예방접종 여부</span>
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded-xl text-[13px] bg-[#D4A574]/10 text-[#D4A574]">완료</button>
                  <button className="px-3 py-1 rounded-xl text-[13px] bg-[#F5EDDF] text-[#8B7355]">미완료</button>
                </div>
              </div>

              <div>
                <label className="text-[13px] text-[#8B7355] mb-1.5 block">보유 질환</label>
                <div className="border border-[#E8D5C0] rounded-2xl p-3 bg-[#FFF8EE]">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="px-2.5 py-1 bg-[#E07C6A]/10 text-[#E07C6A] rounded-full text-[12px] flex items-center gap-1">
                      슬개골 탈구 <X className="w-3 h-3 cursor-pointer" />
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input placeholder="질병 코드 또는 질병명 검색" className="flex-1 text-[13px] bg-transparent outline-none placeholder:text-[#C4B8A4]" />
                    <Plus className="w-4 h-4 text-[#D4A574] cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                className="flex-1 py-3 border border-[#E8D5C0] text-[#8B7355] rounded-2xl text-[14px] hover:bg-[#F9F0E4] transition-colors"
                onClick={() => navigate("/")}
              >
                건너뛰기
              </button>
              <button
                className="flex-1 py-3 text-white rounded-2xl text-[14px] hover:opacity-90 transition-colors"
                style={{ background: "linear-gradient(135deg, #D4A574, #C4956A)" }}
                onClick={() => navigate("/")}
              >
                완료
              </button>
            </div>

            <button className="w-full mt-3 py-2 text-[13px] text-[#D4A574] hover:underline">
              + 반려동물 추가 등록하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
