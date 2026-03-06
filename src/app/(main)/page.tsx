"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  TrendingDown,
  Wallet,
  PiggyBank,
  Calendar,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Dog,
  Cat,
  QrCode,
  X,
  Send,
  Activity,
} from "lucide-react";
import PetCharacter from "../../shared/components/figma/PetCharacter";
import PetAvatar from "../../shared/components/figma/PetAvatar";
import pomeImg from "../../assets/pome.png";
import catImg from "../../assets/cat-character.png";

const upcomingExpenses = [
  {
    label: "사료 (오리젠)",
    date: "03/10",
    amount: "89,000",
    pet: "초코",
    petId: "choco",
    icon: Dog,
  },
  {
    label: "예방접종",
    date: "03/15",
    amount: "60,000",
    pet: "나비",
    petId: "nabi",
    icon: Cat,
  },
  {
    label: "미용",
    date: "03/20",
    amount: "50,000",
    pet: "초코",
    petId: "choco",
    icon: Dog,
  },
];

export default function HomePage() {
  const router = useRouter();
  const [selectedPet, setSelectedPet] = useState<string>("전체");
  // QR Code trigger via global event
  const triggerQrModal = () => {
    window.dispatchEvent(new CustomEvent("openQrModal"));
  };

  return (
    <div className="space-y-3">
      {/* Pet Selector */}
      <div className="flex gap-2">
        <div
          onClick={() => setSelectedPet("전체")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer transition-all ${selectedPet === "전체" ? "bg-gradient-to-r from-[var(--app-primary)] to-[var(--app-primary-dark)] text-white shadow-md" : "bg-[var(--app-bg-main)] border border-[var(--app-border)] text-[var(--app-text-sub)] hover:border-[var(--app-primary)]/40"}`}
          style={
            selectedPet === "전체"
              ? { boxShadow: "0 2px 8px rgba(212, 165, 116, 0.3)" }
              : {}
          }
        >
          <span
            className="text-[13px]"
            style={{ fontWeight: selectedPet === "전체" ? 600 : 500 }}
          >
            전체
          </span>
        </div>
        <div
          onClick={() => setSelectedPet("초코")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer transition-all ${selectedPet === "초코" ? "bg-[var(--app-primary-light)] border border-[var(--app-primary)]/50 text-[#6B4F3A]" : "bg-[var(--app-bg-main)] border border-[var(--app-border)] text-[var(--app-text-sub)] hover:border-[var(--app-primary)]/40"}`}
        >
          <PetAvatar pet="choco" size="xs" border={false} />
          <span
            className="text-[13px]"
            style={{ fontWeight: selectedPet === "초코" ? 600 : 500 }}
          >
            초코
          </span>
        </div>
        <div
          onClick={() => setSelectedPet("나비")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer transition-all ${selectedPet === "나비" ? "bg-[#E8DFD0] border border-[#C4A684]/50 text-[var(--app-text-secondary)]" : "bg-[var(--app-bg-main)] border border-[var(--app-border)] text-[var(--app-text-sub)] hover:border-[#C4A684]/40"}`}
        >
          <PetAvatar pet="nabi" size="xs" border={false} />
          <span
            className="text-[13px]"
            style={{ fontWeight: selectedPet === "나비" ? 600 : 500 }}
          >
            나비
          </span>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3 lg:items-stretch">
        {/* Left Column: Spending History & Upcoming Expenses */}
        <div className="flex flex-col gap-3 h-full">
          {/* Spending History Section */}
          <div className="bg-[var(--app-bg-secondary)] rounded-3xl border border-[var(--app-border)] p-4 flex flex-col flex-1 h-full">
            <h3
              className="text-[14px] text-[var(--app-text-main)] mb-3"
              style={{ fontWeight: 600 }}
            >
              <TrendingDown
                className="w-3.5 h-3.5 inline mr-1.5 text-[var(--app-primary)]"
                strokeWidth={1.5}
              />
              나의 소비 내역
            </h3>
            <div className="space-y-2 flex-1">
              <div className="flex items-center justify-between p-3 bg-[var(--app-bg-main)] rounded-2xl border border-[var(--app-border)]/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--app-primary-light)] flex items-center justify-center">
                      <TrendingDown className="w-5 h-5 text-[var(--app-primary)]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-[13px] text-[var(--app-text-main)] font-medium">동물병원 진료비</div>
                      <div className="text-[11px] text-[var(--app-text-tertiary)] mt-0.5">오늘 · 14:30</div>
                    </div>
                  </div>
                  <span className="text-[14px] text-[var(--app-text-main)]" style={{ fontWeight: 700, fontFamily: "'Nunito', sans-serif" }}>-₩45,000</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[var(--app-bg-main)] rounded-2xl border border-[var(--app-border)]/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--app-primary-light)] flex items-center justify-center">
                      <TrendingDown className="w-5 h-5 text-[var(--app-primary)]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-[13px] text-[var(--app-text-main)] font-medium">장난감 구매</div>
                      <div className="text-[11px] text-[var(--app-text-tertiary)] mt-0.5">어제 · 18:20</div>
                    </div>
                  </div>
                  <span className="text-[14px] text-[var(--app-text-main)]" style={{ fontWeight: 700, fontFamily: "'Nunito', sans-serif" }}>-₩12,000</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[var(--app-bg-main)] rounded-2xl border border-[var(--app-border)]/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--app-primary-light)] flex items-center justify-center">
                      <TrendingDown className="w-5 h-5 text-[var(--app-primary)]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-[13px] text-[var(--app-text-main)] font-medium">펫시터 예약</div>
                      <div className="text-[11px] text-[var(--app-text-tertiary)] mt-0.5">03/03 · 09:15</div>
                    </div>
                  </div>
                  <span className="text-[14px] text-[var(--app-text-main)]" style={{ fontWeight: 700, fontFamily: "'Nunito', sans-serif" }}>-₩35,000</span>
              </div>
            </div>
            <button className="w-full mt-3 py-2.5 rounded-2xl bg-[var(--app-bg-main)] border border-[var(--app-border)] text-[13px] text-[var(--app-text-secondary)] font-medium hover:border-[var(--app-primary)]/40 transition-colors" onClick={() => router.push("/ledger")}>
              전체 내역 보기
            </button>
          </div>

          {/* Upcoming Expenses Section (Moved from Right Column) */}
          <div className="bg-[var(--app-bg-main)] rounded-3xl border border-[var(--app-border)] p-4 flex-none">
            <div className="flex items-center justify-between mb-3">
              <h3
                className="text-[14px] text-[var(--app-text-main)]"
                style={{ fontWeight: 600 }}
              >
                <Calendar
                  className="w-3.5 h-3.5 inline mr-1.5 text-[var(--app-primary)]"
                  strokeWidth={1.5}
                />
                예정된 지출
              </h3>
              <button
                className="text-[11px] text-[var(--app-primary)]"
                onClick={() => router.push("/supplies")}
              >
                더보기
              </button>
            </div>
            <div className="space-y-2">
              {upcomingExpenses.map((exp, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2.5 bg-[var(--app-bg-main)] rounded-2xl border border-[var(--app-border)]/30"
                >
                  <div className="flex items-center gap-2.5">
                    <PetAvatar pet={exp.petId} size="xs" border={true} />
                    <div>
                      <div className="text-[13px] text-[var(--app-text-secondary)]">
                        {exp.label}
                      </div>
                      <div className="text-[10px] text-[var(--app-text-tertiary)]">
                        {exp.pet} · {exp.date}
                      </div>
                    </div>
                  </div>
                  <span
                    className="text-[13px] text-[#E07C6A]"
                    style={{
                      fontWeight: 500,
                      fontFamily: "'Nunito', sans-serif",
                    }}
                  >
                    -₩{exp.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Life-Cycle Guide */}
        <div className="flex flex-col gap-3 h-full">
          <div className="bg-[var(--app-bg-main)] rounded-3xl border border-[var(--app-border)] p-5 flex flex-col flex-1 h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--app-primary-light)] rounded-full blur-3xl opacity-30 -mr-16 -mt-16" />
            <h3
              className="text-[15px] text-[var(--app-text-main)] mb-1 relative z-10"
              style={{ fontWeight: 700 }}
            >
              <Activity
                className="w-4 h-4 inline mr-1.5 text-[var(--app-primary)]"
                strokeWidth={2}
              />
              반려동물 생애주기 가이드
            </h3>
            <p className="text-[12px] text-[var(--app-text-tertiary)] mb-5 relative z-10">
              나이와 건강 상태에 맞춘 맞춤형 케어 팁을 확인하세요.
            </p>
            
            <div className="space-y-3 flex-1 overflow-y-auto pr-1 custom-scrollbar relative z-10">
              {/* Dog Guide */}
              <div className="p-4 rounded-2xl border border-[var(--app-border)]/60 bg-[#FAFAFA] hover:border-[var(--app-primary)]/40 transition-colors">
                <div className="flex justify-between items-start mb-2">
                   <div className="flex items-center gap-1.5">
                     <span className="text-[14px] font-bold text-[#6B4F3A]">강아지 (시니어)</span>
                   </div>
                   <span className="bg-[#E8C5A0]/30 text-[#6B4F3A] text-[10px] px-2 py-0.5 rounded-full font-semibold">초코</span>
                </div>
                <div className="text-[12px] text-[var(--app-text-main)] leading-relaxed mb-3">
                  노령견은 관절 건강과 정기적인 치아 관리가 중요합니다. 과도한 산책보다는 가벼운 걷기 운동을 꾸준히 해주시고, 연 1~2회 종합 건강 검진을 권장합니다.
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-1 bg-white border border-[#E5E5E5] rounded-lg text-[10px] text-[var(--app-text-secondary)]">#관절영양제</span>
                  <span className="px-2 py-1 bg-white border border-[#E5E5E5] rounded-lg text-[10px] text-[var(--app-text-secondary)]">#치석제거</span>
                  <span className="px-2 py-1 bg-white border border-[#E5E5E5] rounded-lg text-[10px] text-[var(--app-text-secondary)]">#가벼운산책</span>
                </div>
              </div>

              {/* Cat Guide */}
              <div className="p-4 rounded-2xl border border-[var(--app-border)]/60 bg-[#FAFAFA] hover:border-[#C4A684]/40 transition-colors">
                <div className="flex justify-between items-start mb-2">
                   <div className="flex items-center gap-1.5">
                     <span className="text-[14px] font-bold text-[#6B4F3A]">고양이 (성묘)</span>
                   </div>
                   <span className="bg-[#E8C5A0]/30 text-[#6B4F3A] text-[10px] px-2 py-0.5 rounded-full font-semibold">나비</span>
                </div>
                <div className="text-[12px] text-[var(--app-text-main)] leading-relaxed mb-3">
                  활동량이 줄어드는 시기이므로 비만에 주의해야 합니다. 수분 섭취를 늘리기 위해 습식 사료 빈도를 높이고, 스트레스 해소를 위해 캣타워와 사냥 놀이를 규칙적으로 제공하세요.
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-1 bg-white border border-[#E5E5E5] rounded-lg text-[10px] text-[var(--app-text-secondary)]">#체중관리</span>
                  <span className="px-2 py-1 bg-white border border-[#E5E5E5] rounded-lg text-[10px] text-[var(--app-text-secondary)]">#음수량늘리기</span>
                  <span className="px-2 py-1 bg-white border border-[#E5E5E5] rounded-lg text-[10px] text-[var(--app-text-secondary)]">#사냥놀이</span>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-4 py-2.5 rounded-2xl bg-[var(--app-primary-light)] text-[13px] text-[var(--app-primary-dark)] font-bold hover:bg-[#E8C5A0]/60 transition-colors relative z-10" onClick={() => router.push("/health")}>
              맞춤 가이드 더보기
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
