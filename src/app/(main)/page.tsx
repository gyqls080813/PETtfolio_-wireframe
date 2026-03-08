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
  HeartPulse,
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

  // QR Code trigger via global event
  const triggerQrModal = () => {
    window.dispatchEvent(new CustomEvent("openQrModal"));
  };

  return (
    <div className="space-y-3">
      {/* Main Content Layout */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3 lg:items-stretch h-full">
        
        {/* Left Column: Spending History & Upcoming Expenses */}
        <div className="flex flex-col gap-3 h-full">
          {/* 나의 소비 내역 (이번달 지출 금액) */}
          <div className="bg-[var(--app-bg-main)] rounded-3xl border border-[var(--app-border)] p-4 flex flex-col justify-center items-center flex-none relative overflow-hidden h-[150px]">
            {/* Background Decor */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-[var(--app-primary)]/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-[var(--app-primary)]/5 rounded-full blur-xl pointer-events-none" />

            <div className="flex items-center justify-between w-full mb-2">
              <h3 className="text-[14px] text-[var(--app-text-main)]" style={{ fontWeight: 600 }}>
                <Wallet className="w-3.5 h-3.5 inline mr-1.5 text-[var(--app-primary)]" strokeWidth={1.5} />
                나의 소비 내역
              </h3>
              <button 
                className="text-[11px] font-bold text-[var(--app-primary)] px-2 py-1 rounded bg-[var(--app-primary)]/10 hover:bg-[var(--app-primary)]/20 transition-colors" 
                onClick={() => router.push("/ledger")}
              >
                가계부 보기
              </button>
            </div>
            
            <div className="flex flex-col items-center justify-center py-2 w-full h-full text-center">
               <span className="text-[13px] text-[#888] mb-1 font-medium">이번달 지출 금액</span>
               <div className="text-[32px] text-[#222]" style={{ fontWeight: 800, fontFamily: "'Nunito', sans-serif" }}>
                 <span className="text-[20px] mr-1">₩</span>199,000
               </div>
            </div>
          </div>

          {/* Upcoming Expenses Section */}
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
                onClick={() => router.push("/ledger")}
              >
                더보기
              </button>
            </div>
            <div className="space-y-2">
              {upcomingExpenses.map((exp, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2.5 bg-[#FAFAFA] rounded-2xl border border-[var(--app-border)]/30"
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
          <div className="bg-[var(--app-bg-main)] rounded-3xl border border-[var(--app-border)] p-4 flex flex-col flex-1 overflow-hidden h-auto lg:h-[330px]">
            <h3 className="text-[14px] text-[var(--app-text-main)] mb-3 shrink-0" style={{ fontWeight: 600 }}>
              <HeartPulse className="w-3.5 h-3.5 inline mr-1.5 text-[var(--app-primary)]" strokeWidth={1.5} />
              우리 아이 생애주기 맞춤 질병 가이드
            </h3>

            <div className="relative w-full flex-1 flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2 -mx-1 px-1 h-full" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              {/* 1st Card: Choco (Dog) - Youth */}
              <div className="snap-center shrink-0 w-full min-w-full flex items-center justify-between relative cursor-pointer gap-3 lg:gap-6 px-1" onClick={() => router.push("/savings")}>
                
                {/* Speech Bubble (Left) */}
                <div className="relative bg-white rounded-[24px] border-[1.5px] border-[#4C3B2B] p-4 lg:p-5 shadow-sm flex-1 z-20">
                  <div className="inline-block bg-[#83C594] text-white text-[11px] font-bold px-3 py-1 rounded-full mb-3 shadow-sm">
                    현재 청년기 (3~6세)
                  </div>
                  <div className="text-[15px] lg:text-[17px] font-bold text-[#222] leading-[1.4] mb-3 tracking-tight">
                    저 요즘 슬개골이<br />자꾸 신경 쓰여요 😥
                  </div>
                  <div className="bg-[#FAF8F5] rounded-xl p-3 text-[12px] lg:text-[13px] text-[#555] leading-relaxed border border-[#F0EBE1]">
                    말티즈 <span className="font-bold text-[#4C3B2B]">3세</span>는 슬개골 탈구 방지를 위해 미끄럼 방지 등 일상 관리를 꼭 챙겨주세요.
                  </div>

                  {/* Tail pointing right */}
                  <div className="absolute top-[50%] -right-[13.5px] -translate-y-1/2 w-0 h-0 border-t-[10px] border-b-[10px] border-l-[14px] border-t-transparent border-b-transparent border-l-[#4C3B2B]">
                    <div className="absolute -top-[8.5px] -left-[16px] w-0 h-0 border-t-[8.5px] border-b-[8.5px] border-l-[12px] border-t-transparent border-b-transparent border-l-white" />
                  </div>
                </div>

                {/* Character (Right) */}
                <div className="relative z-10 shrink-0 w-[110px] lg:w-[150px] flex justify-end items-end h-[180px] lg:h-[220px]">
                  <img src={typeof pomeImg === 'string' ? pomeImg : pomeImg?.src} alt="Choco" className="w-full h-auto object-contain drop-shadow-lg" />
                </div>
              </div>

              {/* 2nd Card: Nabi (Cat) - Middle Age */}
              <div className="snap-center shrink-0 w-full min-w-full flex items-center justify-between relative cursor-pointer gap-3 lg:gap-6 px-1" onClick={() => router.push("/savings")}>
                
                {/* Speech Bubble (Left) */}
                <div className="relative bg-white rounded-[24px] border-[1.5px] border-[#4C3B2B] p-4 lg:p-5 shadow-sm flex-1 z-20">
                  <div className="inline-block bg-[#83C594] text-white text-[11px] font-bold px-3 py-1 rounded-full mb-3 shadow-sm">
                    현재 중년기 (7~10세)
                  </div>
                  <div className="text-[15px] lg:text-[17px] font-bold text-[#222] leading-[1.4] mb-3 tracking-tight">
                    신장이 좀 약해지는<br />나이가 됐어요 🐾
                  </div>
                  <div className="bg-[#FAF8F5] rounded-xl p-3 text-[12px] lg:text-[13px] text-[#555] leading-relaxed border border-[#F0EBE1]">
                    코리안숏헤어 <span className="font-bold text-[#4C3B2B]">7세</span>는 만성 신부전 예방을 위해 습식 사료로 음수량을 늘려주세요.
                  </div>

                  {/* Tail pointing right */}
                  <div className="absolute top-[50%] -right-[13.5px] -translate-y-1/2 w-0 h-0 border-t-[10px] border-b-[10px] border-l-[14px] border-t-transparent border-b-transparent border-l-[#4C3B2B]">
                    <div className="absolute -top-[8.5px] -left-[16px] w-0 h-0 border-t-[8.5px] border-b-[8.5px] border-l-[12px] border-t-transparent border-b-transparent border-l-white" />
                  </div>
                </div>

                {/* Character (Right) */}
                <div className="relative z-10 shrink-0 w-[110px] lg:w-[150px] flex justify-end items-end h-[180px] lg:h-[220px]">
                  <img src={typeof catImg === 'string' ? catImg : catImg?.src} alt="Nabi" className="w-full h-auto object-contain drop-shadow-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
