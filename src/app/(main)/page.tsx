"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Wallet,
  Calendar,
  ChevronRight,
  ChevronLeft,
  CreditCard,
  Clock,
  ShoppingBag,
  Users,
} from "lucide-react";
import PetAvatar from "../../shared/components/figma/PetAvatar";

// 그룹 멤버별 소비
const groupSpending = [
  { name: "김집사", amount: 199000 },
  { name: "이집사", amount: 87500 },
];

// 예정된 지출 (직관적 데이터)
const upcomingExpenses = [
  {
    label: "사료 (오리젠)",
    pet: "초코",
    petId: "choco",
    amount: 89000,
    daysLeft: 3,
    totalDays: 30,
    urgency: "urgent" as const,
  },
  {
    label: "예방접종",
    pet: "나비",
    petId: "nabi",
    amount: 60000,
    daysLeft: 8,
    totalDays: 90,
    urgency: "soon" as const,
  },
  {
    label: "미용",
    pet: "초코",
    petId: "choco",
    amount: 50000,
    daysLeft: 15,
    totalDays: 60,
    urgency: "normal" as const,
  },
  {
    label: "심장사상충 예방약",
    pet: "나비",
    petId: "nabi",
    amount: 35000,
    daysLeft: 22,
    totalDays: 30,
    urgency: "normal" as const,
  },
];

// 카드 데이터 (거래 관리 페이지와 동일)
interface CardData {
  id: number;
  alias: string;
  number: string;
  company: string;
  expiry: string;
  color: string;
  gradientTo: string;
  monthlyTotal: number;
  txCount: number;
}

const registeredCards: CardData[] = [
  {
    id: 1, alias: "토스 체크카드", number: "5234  ****  ****  1234",
    company: "토스뱅크", expiry: "12/28", color: "#3182F6", gradientTo: "#1B64DA",
    monthlyTotal: 199000, txCount: 12,
  },
  {
    id: 2, alias: "삼성카드", number: "9411  ****  ****  5678",
    company: "삼성카드", expiry: "06/27", color: "#1428A0", gradientTo: "#0B1A6E",
    monthlyTotal: 87500, txCount: 5,
  },
];

const urgencyConfig = {
  urgent: { bg: "#FEE2E2", text: "#DC2626", label: "긴급", barColor: "#EF4444" },
  soon: { bg: "#FEF3C7", text: "#D97706", label: "임박", barColor: "#F59E0B" },
  normal: { bg: "#DCFCE7", text: "#16A34A", label: "여유", barColor: "#22C55E" },
};

export default function HomePage() {
  const router = useRouter();
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const currentCard = registeredCards[currentCardIdx];

  const totalGroupSpending = groupSpending.reduce((sum, m) => sum + m.amount, 0);
  const totalUpcoming = upcomingExpenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="space-y-3">
      {/* Main 2-Column Layout — same proportions as /transactions */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3 lg:items-stretch" style={{ height: 'calc(100vh - 120px)' }}>
        
        {/* ─── Left Column ─── */}
        <div className="flex flex-col gap-3 h-full">

          {/* 이번달 우리 그룹 총 지출 */}
          <div className="bg-[var(--app-bg-main)] rounded-3xl border border-[var(--app-border)] p-5 relative overflow-hidden shrink-0">
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-[var(--app-primary)]/5 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[14px] text-[var(--app-text-main)]" style={{ fontWeight: 600 }}>
                <Users className="w-3.5 h-3.5 inline mr-1.5 text-[var(--app-primary)]" strokeWidth={1.5} />
                이번달 그룹 총 지출
              </h3>
              <button
                className="text-[11px] font-bold text-[var(--app-primary)] px-2 py-1 rounded bg-[var(--app-primary)]/10 hover:bg-[var(--app-primary)]/20 transition-colors"
                onClick={() => router.push("/ledger")}
              >
                가계부 보기
              </button>
            </div>

            {/* Total */}
            <div className="text-center mb-4">
              <div className="text-[30px] text-[#222]" style={{ fontWeight: 800, fontFamily: "'Nunito', sans-serif" }}>
                <span className="text-[18px] mr-0.5">₩</span>{totalGroupSpending.toLocaleString()}
              </div>
            </div>

            {/* Member Breakdown */}
            <div className="flex gap-2">
              {groupSpending.map((m, i) => (
                <div key={i} className="flex-1 bg-[#FAFAFA] rounded-xl p-2.5 text-center border border-[var(--app-border)]/30">
                  <div className="text-[11px] text-[#888] mb-0.5">{m.name}</div>
                  <div className="text-[14px] font-bold text-[var(--app-text-main)]" style={{ fontFamily: "'Nunito', sans-serif" }}>
                    ₩{m.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 예정된 지출 (직관적 뷰) */}
          <div className="bg-[var(--app-bg-main)] rounded-3xl border border-[var(--app-border)] p-4 flex-1 flex flex-col min-h-0 overflow-hidden">
            <div className="flex items-center justify-between mb-3 shrink-0">
              <h3 className="text-[14px] text-[var(--app-text-main)]" style={{ fontWeight: 600 }}>
                <Calendar className="w-3.5 h-3.5 inline mr-1.5 text-[var(--app-primary)]" strokeWidth={1.5} />
                예정된 지출
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--app-primary)]/10 text-[var(--app-primary)] font-bold">
                  총 ₩{totalUpcoming.toLocaleString()}
                </span>
                <button
                  className="text-[11px] text-[var(--app-primary)] font-bold"
                  onClick={() => router.push("/supplies")}
                >
                  더보기
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2.5" style={{ scrollbarWidth: 'none' }}>
              {upcomingExpenses.map((exp, i) => {
                const config = urgencyConfig[exp.urgency];
                const progress = Math.max(0, Math.min(100, ((exp.totalDays - exp.daysLeft) / exp.totalDays) * 100));
                return (
                  <div
                    key={i}
                    className="p-3 bg-[#FAFAFA] rounded-2xl border border-[var(--app-border)]/30 hover:border-[var(--app-primary)]/20 transition-colors"
                  >
                    {/* Top Row: Item + Urgency + Amount */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <PetAvatar pet={exp.petId} size="xs" border={true} />
                        <div>
                          <div className="text-[13px] text-[var(--app-text-main)] font-medium">{exp.label}</div>
                          <div className="text-[10px] text-[var(--app-text-tertiary)]">{exp.pet}</div>
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-2">
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: config.bg, color: config.text }}
                        >
                          {config.label}
                        </span>
                        <span className="text-[13px] text-[#E07C6A] font-bold" style={{ fontFamily: "'Nunito', sans-serif" }}>
                          ₩{exp.amount.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar + Days Left */}
                    <div className="flex items-center gap-2.5">
                      <div className="flex-1 h-2 bg-[#E8E4DE] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${progress}%`, backgroundColor: config.barColor }}
                        />
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Clock className="w-3 h-3 text-[var(--app-text-tertiary)]" strokeWidth={1.5} />
                        <span className="text-[11px] font-bold" style={{ color: config.text }}>
                          {exp.daysLeft}일 남음
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ─── Right Column: 나의 카드 ─── */}
        <div className="bg-[var(--app-bg-main)] rounded-3xl border border-[var(--app-border)] p-5 flex flex-col relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-[var(--app-primary)]/5 rounded-full blur-2xl pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between mb-4 shrink-0">
            <h3 className="text-[14px] text-[var(--app-text-main)]" style={{ fontWeight: 600 }}>
              <Wallet className="w-3.5 h-3.5 inline mr-1.5 text-[var(--app-primary)]" strokeWidth={1.5} />
              나의 카드
            </h3>
            <button
              className="text-[11px] font-bold text-[var(--app-primary)] px-2 py-1 rounded bg-[var(--app-primary)]/10 hover:bg-[var(--app-primary)]/20 transition-colors"
              onClick={() => router.push("/transactions")}
            >
              거래 관리
            </button>
          </div>

          {currentCard ? (
            <div className="flex-1 flex flex-col items-center min-h-0">
              {/* 이번달 총 지출 */}
              <div className="text-center mb-4 shrink-0">
                <span className="text-[11px] text-[#888] font-medium block mb-0.5">카드 이번달 지출</span>
                <div className="text-[28px] text-[#222]" style={{ fontWeight: 800, fontFamily: "'Nunito', sans-serif" }}>
                  <span className="text-[18px] mr-0.5">₩</span>{currentCard.monthlyTotal.toLocaleString()}
                </div>
              </div>

              {/* 카드 실물 (세로) */}
              <div className="flex-1 flex items-center justify-center w-full min-h-0 mb-3">
                <div
                  className="relative rounded-2xl p-5 text-white overflow-hidden flex flex-col justify-between shadow-xl cursor-pointer hover:shadow-2xl transition-shadow"
                  style={{
                    background: `linear-gradient(160deg, ${currentCard.color}, ${currentCard.gradientTo})`,
                    width: '200px',
                    height: '318px',
                    maxHeight: '100%',
                  }}
                  onClick={() => router.push("/transactions")}
                >
                  <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/4" />
                  <div className="absolute bottom-0 left-0 w-28 h-28 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4" />

                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-[14px] font-bold opacity-95">{currentCard.company}</span>
                    <CreditCard className="w-5 h-5 opacity-60" strokeWidth={1.5} />
                  </div>

                  <div className="relative z-10 my-4">
                    <div className="w-10 h-7 rounded-md bg-gradient-to-br from-[#FFD700]/80 to-[#DAA520]/80 shadow-inner" />
                  </div>

                  <div className="relative z-10">
                    <div className="text-[13px] tracking-[2px] opacity-90 mb-6" style={{ fontFamily: "'Nunito', monospace" }}>
                      {currentCard.number}
                    </div>
                  </div>

                  <div className="relative z-10 mt-auto">
                    <div className="text-[12px] opacity-80 mb-1">{currentCard.alias}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] opacity-60">VALID THRU</span>
                      <span className="text-[12px] opacity-80" style={{ fontFamily: "'Nunito', monospace" }}>{currentCard.expiry}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Navigation */}
              <div className="flex items-center justify-center gap-3 shrink-0">
                <button
                  onClick={() => setCurrentCardIdx(Math.max(0, currentCardIdx - 1))}
                  disabled={currentCardIdx === 0}
                  className="p-1 rounded-full hover:bg-[var(--app-bg-secondary)] disabled:opacity-30 transition-all"
                >
                  <ChevronLeft className="w-4 h-4 text-[var(--app-text-tertiary)]" strokeWidth={2} />
                </button>
                <div className="flex gap-1.5">
                  {registeredCards.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentCardIdx(i)}
                      className={`h-2 rounded-full transition-all ${i === currentCardIdx ? 'bg-[var(--app-primary)] w-5' : 'bg-[#D9C8B4] w-2'}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setCurrentCardIdx(Math.min(registeredCards.length - 1, currentCardIdx + 1))}
                  disabled={currentCardIdx === registeredCards.length - 1}
                  className="p-1 rounded-full hover:bg-[var(--app-bg-secondary)] disabled:opacity-30 transition-all"
                >
                  <ChevronRight className="w-4 h-4 text-[var(--app-text-tertiary)]" strokeWidth={2} />
                </button>
              </div>

              {/* Card Summary */}
              <div className="w-full mt-3 pt-3 border-t border-[var(--app-border)]/50 shrink-0">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#FAFAFA] rounded-xl p-2.5 text-center">
                    <div className="text-[10px] text-[#888]">이번달 거래</div>
                    <div className="text-[15px] font-bold text-[var(--app-text-main)]" style={{ fontFamily: "'Nunito', sans-serif" }}>{currentCard.txCount}건</div>
                  </div>
                  <div className="bg-[#FAFAFA] rounded-xl p-2.5 text-center">
                    <div className="text-[10px] text-[#888]">카드 유형</div>
                    <div className="text-[12px] font-bold text-[var(--app-text-main)]">{currentCard.company}</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-3">
              <CreditCard className="w-12 h-12 text-[var(--app-text-tertiary)]" strokeWidth={1} />
              <span className="text-[14px] text-[var(--app-text-tertiary)] font-medium">등록된 카드가 없습니다</span>
              <button
                onClick={() => router.push("/transactions")}
                className="px-5 py-2 text-[13px] font-bold text-white rounded-full hover:opacity-90 transition-opacity active:scale-95"
                style={{ background: "linear-gradient(135deg, var(--app-primary), var(--app-primary-dark))" }}
              >
                카드 등록하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
