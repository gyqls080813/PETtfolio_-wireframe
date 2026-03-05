import { useNavigate } from "react-router";
import { useState } from "react";
import {
  PawPrint,
  Dog,
  Cat,
  Camera,
  ChevronRight,
  ChevronLeft,
  Users,
  Crown,
  UserPlus,
  Plus,
  X,
} from "lucide-react";

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [role, setRole] = useState<"host" | "guest" | null>(null);
  const [petType, setPetType] = useState<"dog" | "cat" | null>(null);

  return (
    <div className="min-h-screen bg-[#F5F5F8] flex items-center justify-center p-4" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
      <div className="w-full max-w-[480px]">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-6">
          {[0, 1, 2].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-colors ${
                s <= step ? "bg-[#6C5CE7]" : "bg-[#DDD]"
              }`}
            />
          ))}
        </div>

        {/* Step 0: Role Selection */}
        {step === 0 && (
          <div className="bg-white rounded-2xl border border-[#E0E0E0] p-6">
            <div className="text-center mb-6">
              <Users className="w-10 h-10 text-[#6C5CE7] mx-auto mb-3" />
              <h2 className="text-[20px] text-[#222]" style={{ fontWeight: 700 }}>역할을 선택하세요</h2>
              <p className="text-[13px] text-[#888] mt-1">그룹에서의 역할을 선택해주세요</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                className={`border-2 rounded-xl p-5 text-center transition-colors ${
                  role === "host" ? "border-[#6C5CE7] bg-[#6C5CE7]/5" : "border-[#E0E0E0] hover:border-[#CCC]"
                }`}
                onClick={() => setRole("host")}
              >
                <Crown className="w-8 h-8 mx-auto mb-2 text-[#6C5CE7]" />
                <div className="text-[15px] text-[#333]" style={{ fontWeight: 600 }}>호스트</div>
                <div className="text-[11px] text-[#999] mt-1">그룹 생성 및 관리</div>
              </button>
              <button
                className={`border-2 rounded-xl p-5 text-center transition-colors ${
                  role === "guest" ? "border-[#6C5CE7] bg-[#6C5CE7]/5" : "border-[#E0E0E0] hover:border-[#CCC]"
                }`}
                onClick={() => setRole("guest")}
              >
                <UserPlus className="w-8 h-8 mx-auto mb-2 text-[#00B894]" />
                <div className="text-[15px] text-[#333]" style={{ fontWeight: 600 }}>게스트</div>
                <div className="text-[11px] text-[#999] mt-1">초대코드로 참여</div>
              </button>
            </div>

            {role === "guest" && (
              <div className="mt-4">
                <label className="text-[13px] text-[#666] mb-1.5 block">초대 코드</label>
                <input
                  placeholder="초대 코드를 입력하세요"
                  className="w-full border border-[#DDD] rounded-lg px-3 py-2.5 bg-[#FAFAFA] text-[14px] placeholder:text-[#CCC] outline-none"
                />
              </div>
            )}

            <button
              className="w-full mt-5 py-3 bg-[#6C5CE7] text-white rounded-lg text-[15px] hover:bg-[#5A4BD1] transition-colors disabled:opacity-40"
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
          <div className="bg-white rounded-2xl border border-[#E0E0E0] p-6">
            <button className="flex items-center gap-1 text-[13px] text-[#888] mb-4" onClick={() => setStep(0)}>
              <ChevronLeft className="w-4 h-4" /> 이전
            </button>
            <div className="text-center mb-5">
              <PawPrint className="w-10 h-10 text-[#6C5CE7] mx-auto mb-3" />
              <h2 className="text-[20px] text-[#222]" style={{ fontWeight: 700 }}>반려동물 등록</h2>
              <p className="text-[13px] text-[#888] mt-1">기본 정보를 입력해주세요</p>
            </div>

            {/* Pet type */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <button
                className={`border-2 rounded-xl p-4 flex flex-col items-center transition-colors ${
                  petType === "dog" ? "border-[#6C5CE7] bg-[#6C5CE7]/5" : "border-[#E0E0E0]"
                }`}
                onClick={() => setPetType("dog")}
              >
                <Dog className="w-7 h-7 text-[#E17055] mb-1" />
                <span className="text-[14px] text-[#333]">강아지</span>
              </button>
              <button
                className={`border-2 rounded-xl p-4 flex flex-col items-center transition-colors ${
                  petType === "cat" ? "border-[#6C5CE7] bg-[#6C5CE7]/5" : "border-[#E0E0E0]"
                }`}
                onClick={() => setPetType("cat")}
              >
                <Cat className="w-7 h-7 text-[#FDCB6E] mb-1" />
                <span className="text-[14px] text-[#333]">고양이</span>
              </button>
            </div>

            {/* Photo */}
            <div className="flex justify-center mb-5">
              <div className="w-24 h-24 rounded-full bg-[#F0F0F5] border-2 border-dashed border-[#CCC] flex flex-col items-center justify-center cursor-pointer hover:border-[#6C5CE7] transition-colors">
                <Camera className="w-6 h-6 text-[#AAA]" />
                <span className="text-[10px] text-[#AAA] mt-1">대표 이미지</span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[13px] text-[#666] mb-1 block">품종</label>
                <select className="w-full border border-[#DDD] rounded-lg px-3 py-2.5 bg-[#FAFAFA] text-[14px] text-[#333] outline-none appearance-none">
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
                <label className="text-[13px] text-[#666] mb-1 block">이름</label>
                <input placeholder="반려동물 이름" className="w-full border border-[#DDD] rounded-lg px-3 py-2.5 bg-[#FAFAFA] text-[14px] placeholder:text-[#CCC] outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[13px] text-[#666] mb-1 block">생년월일</label>
                  <input type="date" className="w-full border border-[#DDD] rounded-lg px-3 py-2.5 bg-[#FAFAFA] text-[14px] text-[#333] outline-none" />
                </div>
                <div>
                  <label className="text-[13px] text-[#666] mb-1 block">성별</label>
                  <select className="w-full border border-[#DDD] rounded-lg px-3 py-2.5 bg-[#FAFAFA] text-[14px] text-[#333] outline-none appearance-none">
                    <option>수컷</option>
                    <option>암컷</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[13px] text-[#666] mb-1 block">몸무게 (kg)</label>
                <input type="number" placeholder="0.0" className="w-full border border-[#DDD] rounded-lg px-3 py-2.5 bg-[#FAFAFA] text-[14px] placeholder:text-[#CCC] outline-none" />
              </div>
            </div>

            <button
              className="w-full mt-5 py-3 bg-[#6C5CE7] text-white rounded-lg text-[15px] hover:bg-[#5A4BD1] transition-colors"
              onClick={() => setStep(2)}
            >
              다음 <ChevronRight className="w-4 h-4 inline ml-1" />
            </button>
          </div>
        )}

        {/* Step 2: Optional Health Info */}
        {step === 2 && (
          <div className="bg-white rounded-2xl border border-[#E0E0E0] p-6">
            <button className="flex items-center gap-1 text-[13px] text-[#888] mb-4" onClick={() => setStep(1)}>
              <ChevronLeft className="w-4 h-4" /> 이전
            </button>
            <div className="text-center mb-5">
              <h2 className="text-[20px] text-[#222]" style={{ fontWeight: 700 }}>건강 정보 (선택)</h2>
              <p className="text-[13px] text-[#888] mt-1">나중에 마이페이지에서 수정할 수 있어요</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-[#EEE] rounded-lg">
                <span className="text-[14px] text-[#444]">중성화 여부</span>
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded-md text-[13px] bg-[#6C5CE7]/10 text-[#6C5CE7]">완료</button>
                  <button className="px-3 py-1 rounded-md text-[13px] bg-[#F0F0F5] text-[#888]">미완료</button>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border border-[#EEE] rounded-lg">
                <span className="text-[14px] text-[#444]">예방접종 여부</span>
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded-md text-[13px] bg-[#6C5CE7]/10 text-[#6C5CE7]">완료</button>
                  <button className="px-3 py-1 rounded-md text-[13px] bg-[#F0F0F5] text-[#888]">미완료</button>
                </div>
              </div>

              <div>
                <label className="text-[13px] text-[#666] mb-1.5 block">보유 질환</label>
                <div className="border border-[#DDD] rounded-lg p-3 bg-[#FAFAFA]">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="px-2.5 py-1 bg-[#FF6B6B]/10 text-[#FF6B6B] rounded-full text-[12px] flex items-center gap-1">
                      슬개골 탈구 <X className="w-3 h-3 cursor-pointer" />
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input placeholder="질병 코드 또는 질병명 검색" className="flex-1 text-[13px] bg-transparent outline-none placeholder:text-[#CCC]" />
                    <Plus className="w-4 h-4 text-[#6C5CE7] cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                className="flex-1 py-3 border border-[#DDD] text-[#666] rounded-lg text-[14px] hover:bg-[#F5F5F5] transition-colors"
                onClick={() => navigate("/")}
              >
                건너뛰기
              </button>
              <button
                className="flex-1 py-3 bg-[#6C5CE7] text-white rounded-lg text-[14px] hover:bg-[#5A4BD1] transition-colors"
                onClick={() => navigate("/")}
              >
                완료
              </button>
            </div>

            <button className="w-full mt-3 py-2 text-[13px] text-[#6C5CE7] hover:underline">
              + 반려동물 추가 등록하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
