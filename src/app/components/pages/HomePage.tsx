import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
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
  HeartPulse,
  Trophy,
  Crown,
  Medal,
  BarChart3,
} from "lucide-react";
import PetCharacter from "../figma/PetCharacter";
import PetAvatar from "../figma/PetAvatar";
import pomeImg from "../../../assets/pome.png";
import catImg from "../../../assets/cat-character.png";
import SwipeCarousel from "../../../shared/components/SwipeCarousel";

const getImgSrc = (img: any): string => typeof img === 'string' ? img : (img?.src || (img as string));

const upcomingExpenses = [
  { label: "사료 (오리젠)", date: "03/10", amount: "89,000", pet: "초코", petId: "choco", icon: Dog },
  { label: "예방접종", date: "03/15", amount: "60,000", pet: "나비", petId: "nabi", icon: Cat },
  { label: "미용", date: "03/20", amount: "50,000", pet: "초코", petId: "choco", icon: Dog },
];

const memberRanking = [
  { name: "김집사", expense: 690000, rank: 1, medal: "🥇" },
  { name: "이집사", expense: 247000, rank: 2, medal: "🥈" },
  { name: "박집사", expense: 123000, rank: 3, medal: "🥉" },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  return (
    <div className="space-y-5">

      {/* ── Desktop Grid Layout ── */}
      <div className="hidden lg:grid grid-cols-2 gap-5 items-stretch" style={{ minHeight: "calc(100vh - 130px)" }}>
        <div className="flex flex-col gap-5 h-full">
          {/* Hero Wallet Card */}
          <div
            className="rounded-3xl p-5 relative overflow-hidden flex flex-col justify-between flex-1"
            style={{ background: "linear-gradient(135deg, var(--app-primary), var(--app-primary-dark), #B8865A)" }}
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-28 h-28 bg-white/10 rounded-full blur-2xl -ml-10 -mb-10" />
            {/* ② 지갑 카드 — 펫 아바타 사진 오버레이 */}
            <div className="absolute bottom-3 right-3 opacity-30">
              <PetAvatar pet="choco" size="lg" border={false} className="opacity-60" />
            </div>
            <div className="relative z-10 flex items-center justify-between mb-4 cursor-pointer" onClick={() => navigate("/accounts")}>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                  <Wallet className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>
                <span className="text-[15px] text-white/90 font-medium">내 지갑</span>
              </div>
              <ChevronRight className="w-5 h-5 text-white/70" />
            </div>
            <div className="relative z-10">
              <div
                className="text-[32px] tracking-tight cursor-pointer text-white"
                style={{ fontWeight: 800, fontFamily: "'Nunito', sans-serif" }}
                onClick={() => navigate("/accounts")}
              >
                ₩ 2,730,000
              </div>
              <div className="flex items-center gap-2 mt-4">
                <button
                  className="w-full py-2.5 rounded-2xl flex items-center justify-center gap-2 transition-colors border border-white/20"
                  style={{ background: "rgba(255,255,255,0.22)", backdropFilter: "blur(8px)" }}
                  onClick={() => navigate("/accounts")}
                >
                  <span className="text-[13px] font-semibold text-white">충전하기</span>
                </button>
                <button
                  className="w-full py-2.5 rounded-2xl flex items-center justify-center gap-2 transition-colors border border-white/20"
                  style={{ background: "rgba(255,255,255,0.22)", backdropFilter: "blur(8px)" }}
                  onClick={() => setIsQrModalOpen(true)}
                >
                  <span className="text-[13px] font-semibold text-white">결제하기</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 mb-3 px-1 shrink-0">
            <span className="text-[13px] text-[var(--app-text-secondary)]" style={{ fontWeight: 600 }}>연결된 계좌</span>
          </div>

          {/* Sub Accounts List */}
          <div className="flex-1 flex flex-col gap-2">
            {/* Emergency Fund */}
            <div
              className="bg-[var(--app-bg-main)] rounded-2xl border border-[var(--app-border)] p-4 cursor-pointer hover:border-[var(--app-success)]/40 transition-colors flex items-center justify-between group flex-1"
              onClick={() => navigate("/accounts")}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--app-success)]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <PiggyBank className="w-5 h-5 text-[var(--app-success)]" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-[13px] text-[var(--app-text-tertiary)] mb-0.5">비상금 계좌</div>
                  <div className="text-[18px] text-[var(--app-text-main)]" style={{ fontWeight: 700, fontFamily: "'Nunito', sans-serif" }}>₩ 2,150,000</div>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between h-full py-1">
                <ChevronRight className="w-4 h-4 text-[#D9C8B4]" />
                <div className="flex items-center gap-0.5 mt-auto">
                  <ArrowDownRight className="w-3 h-3 text-[var(--app-success)]" />
                  <span className="text-[11px] text-[var(--app-success)] font-medium">안전 수준</span>
                </div>
              </div>
            </div>

            {/* Shared Account */}
            <div
              className="bg-[var(--app-bg-main)] rounded-2xl border border-[var(--app-border)] p-4 cursor-pointer hover:border-[var(--app-primary)]/40 transition-colors flex items-center justify-between group flex-1"
              onClick={() => navigate("/accounts")}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F5E6D0] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Wallet className="w-5 h-5 text-[var(--app-primary)]" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-[13px] text-[var(--app-text-tertiary)] mb-0.5">공동 관리 계좌</div>
                  <div className="text-[18px] text-[var(--app-text-main)]" style={{ fontWeight: 700, fontFamily: "'Nunito', sans-serif" }}>₩ 580,000</div>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between h-full py-1">
                <ChevronRight className="w-4 h-4 text-[#D9C8B4]" />
                <div className="text-[11px] text-[var(--app-text-tertiary)] mt-auto">이번달 입금: ₩200,000</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-5 h-full" >
          {/* 나의 소비 내역 (이번달 지출 금액) */}
          <div className="bg-[var(--app-bg-main)] rounded-3xl border border-[var(--app-border)] p-4 flex flex-col justify-center items-center flex-1 relative overflow-hidden" >
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
                onClick={() => navigate("/ledger")}
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

          {/* 리포트 랭킹 요약 */}
          <div className="bg-[var(--app-bg-main)] rounded-3xl border border-[var(--app-border)] p-4 flex-none cursor-pointer hover:border-[var(--app-primary)]/40 transition-colors" onClick={() => navigate("/reports")}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[14px] text-[var(--app-text-main)]" style={{ fontWeight: 600 }}>
                <Trophy className="w-3.5 h-3.5 inline mr-1.5 text-[var(--app-primary)]" strokeWidth={1.5} />
                집사 랭킹
              </h3>
              <div className="flex items-center gap-1">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--app-primary)]/10 text-[var(--app-primary)] font-bold">상위 15%</span>
                <button className="text-[11px] text-[var(--app-primary)] font-bold" onClick={(e) => { e.stopPropagation(); navigate("/reports"); }}>리포트</button>
              </div>
            </div>
            <div className="space-y-1.5">
              {memberRanking.map((m) => (
                <div key={m.rank} className={`flex items-center justify-between p-2 rounded-xl ${
                  m.rank === 1 ? 'bg-gradient-to-r from-[#FDF8F0] to-[#FFF5E6] border border-[var(--app-primary)]/20' : 'bg-[var(--app-bg-tertiary)]'
                }`}>
                  <div className="flex items-center gap-2">
                    <span className="text-[16px] leading-none">{m.medal}</span>
                    <span className={`text-[13px] ${m.rank === 1 ? 'font-bold text-[var(--app-text-main)]' : 'font-medium text-[var(--app-text-secondary)]'}`}>
                      {m.name}
                    </span>
                  </div>
                  <span className="text-[12px] font-bold text-[var(--app-text-main)]" style={{ fontFamily: "'Nunito', sans-serif" }}>
                    {m.expense.toLocaleString()}원
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 예정된 지출 (Upcoming Expenses) */}
          <div className="bg-[var(--app-bg-main)] rounded-3xl border border-[var(--app-border)] p-4 flex-none" >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[14px] text-[var(--app-text-main)]" style={{ fontWeight: 600 }}>
                <Calendar className="w-3.5 h-3.5 inline mr-1.5 text-[var(--app-primary)]" strokeWidth={1.5} />
                예정된 지출
              </h3>
              <button className="text-[11px] text-[var(--app-primary)]" onClick={() => navigate("/supplies")}>더보기</button>
            </div>
            <div className="space-y-2">
              {upcomingExpenses.map((exp, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 bg-[var(--app-bg-tertiary)] rounded-2xl" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
                  <div className="flex items-center gap-2.5">
                    {/* 예정된 지출 — 펫 아바타 사진 */}
                    <PetAvatar pet={exp.petId} size="xs" border={true} />
                    <div>
                      <div className="text-[13px] text-[var(--app-text-secondary)]">{exp.label}</div>
                      <div className="text-[10px] text-[var(--app-text-tertiary)]">{exp.pet} · {exp.date}</div>
                    </div>
                  </div>
                  <span className="text-[13px] text-[#E07C6A]" style={{ fontWeight: 500, fontFamily: "'Nunito', sans-serif" }}>-₩{exp.amount}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── 생애주기 질병 예방 가이드 — Swipeable Cards ── */}
          <div className="bg-[var(--app-bg-main)] rounded-3xl border border-[var(--app-border)] p-4 flex flex-col flex-1 overflow-hidden" >
            <h3 className="text-[14px] text-[var(--app-text-main)] mb-3 shrink-0" style={{ fontWeight: 600 }}>
              <HeartPulse className="w-3.5 h-3.5 inline mr-1.5 text-[var(--app-primary)]" strokeWidth={1.5} />
              우리 아이 생애주기 맞춤 질병 가이드
            </h3>

            <div className="relative w-full flex-1 flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              {/* 1st Card: Choco (Dog) - Youth */}
              <div className="snap-center shrink-0 w-full min-w-full bg-[var(--app-bg-tertiary)] rounded-2xl p-4 border border-[var(--app-border)]/50 shadow-sm flex flex-col h-full cursor-pointer hover:border-[var(--app-primary)]/40 transition-colors" onClick={() => navigate("/savings")}>
                <div className="flex items-center gap-2 mb-3">
                  <PetAvatar pet="choco" size="sm" border={false} />
                  <div>
                    <span className="text-[13px] font-bold text-[var(--app-text-main)] block">초코 (강아지)</span>
                    <span className="text-[11px] text-[#A66D38] bg-[#F5E6D0] px-2 py-0.5 rounded-full font-bold mt-0.5 inline-block">현재: 청년기</span>
                  </div>
                </div>
                <div className="flex-1 space-y-2.5">
                  <div className="flex items-start gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-[var(--app-primary)] mt-1.5 shrink-0" />
                     <span className="text-[12px] text-[var(--app-text-secondary)] leading-snug break-keep">기초 면역과 사회화를 위해 예방접종(종합,코로나,켄넬코프 등) 스케줄을 맞춰 진행해주세요.</span>
                  </div>
                  <div className="flex items-start gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-[var(--app-primary)] mt-1.5 shrink-0" />
                     <span className="text-[12px] text-[var(--app-text-secondary)] leading-snug break-keep">매월 심장사상충 예방약을 복용해야 합니다.</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-[10px] text-[var(--app-primary)] font-bold justify-end">
                  밀어서 나비 보기 <ChevronRight className="w-3 h-3 ml-0.5" />
                </div>
              </div>

              {/* 2nd Card: Nabi (Cat) - Middle Age */}
              <div className="snap-center shrink-0 w-full min-w-full bg-[var(--app-bg-tertiary)] rounded-2xl p-4 border border-[var(--app-border)]/50 shadow-sm flex flex-col h-full cursor-pointer hover:border-[#C4A684]/40 transition-colors" onClick={() => navigate("/savings")}>
                <div className="flex items-center gap-2 mb-3">
                  <PetAvatar pet="nabi" size="sm" border={false} />
                  <div>
                    <span className="text-[13px] font-bold text-[var(--app-text-main)] block">나비 (고양이)</span>
                    <span className="text-[11px] text-[#296D56] bg-[#D7EBE3] px-2 py-0.5 rounded-full font-bold mt-0.5 inline-block">현재: 중년기</span>
                  </div>
                </div>
                <div className="flex-1 space-y-2.5">
                  <div className="flex items-start gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-[#4FA081] mt-1.5 shrink-0" />
                     <span className="text-[12px] text-[var(--app-text-secondary)] leading-snug break-keep">연 1회 이상 정기 검진으로 신장 기능, 심장, 치아 상태를 체크하세요.</span>
                  </div>
                  <div className="flex items-start gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-[#4FA081] mt-1.5 shrink-0" />
                     <span className="text-[12px] text-[var(--app-text-secondary)] leading-snug break-keep">음수량을 늘릴 수 있도록 곳곳에 물그릇을 배치하고 스케일링을 고려해 주세요.</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-[10px] text-[#4FA081] font-bold justify-end">
                  자세히 보기 <ChevronRight className="w-3 h-3 ml-0.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout - Mobile Swipe Carousel */}
      <div className="block lg:hidden h-[calc(100vh-210px)]" >
        <SwipeCarousel
          views={[
            // View 1: My Wallet & Connected Accounts
            <div key="view1" className="bg-[var(--app-bg-secondary)] rounded-3xl border border-[var(--app-border)] p-4 flex flex-col h-full w-full">
              {/* Hero Wallet Card */}
              <div
                className="rounded-3xl p-5 relative overflow-hidden flex flex-col justify-between mb-4 flex-none"
                style={{ background: "linear-gradient(135deg, var(--app-primary), var(--app-primary-dark), #B8865A)" }}
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
                <div className="absolute bottom-0 left-0 w-28 h-28 bg-white/10 rounded-full blur-2xl -ml-10 -mb-10" />
                <div className="absolute bottom-3 right-3 opacity-30">
                  <PetAvatar pet="choco" size="lg" border={false} className="opacity-60" />
                </div>
                <div className="relative z-10 flex items-center justify-between mb-4 cursor-pointer" onClick={() => navigate("/accounts")}>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                      <Wallet className="w-5 h-5 text-white" strokeWidth={1.5} />
                    </div>
                    <span className="text-[15px] text-white/90 font-medium">내 지갑</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/70" />
                </div>
                <div className="relative z-10">
                  <div
                    className="text-[32px] tracking-tight cursor-pointer text-white"
                    style={{ fontWeight: 800, fontFamily: "'Nunito', sans-serif" }}
                    onClick={() => navigate("/accounts")}
                  >
                    ₩ 2,730,000
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <button
                      className="w-full py-2.5 rounded-2xl flex items-center justify-center gap-2 transition-colors border border-white/20"
                      style={{ background: "rgba(255,255,255,0.22)", backdropFilter: "blur(8px)" }}
                      onClick={() => navigate("/accounts")}
                    >
                      <span className="text-[13px] font-semibold text-white">충전하기</span>
                    </button>
                    <button
                      className="w-full py-2.5 rounded-2xl flex items-center justify-center gap-2 transition-colors border border-white/20"
                      style={{ background: "rgba(255,255,255,0.22)", backdropFilter: "blur(8px)" }}
                      onClick={() => setIsQrModalOpen(true)}
                    >
                      <span className="text-[13px] font-semibold text-white">결제하기</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 mb-3 px-1">
                <span className="text-[13px] text-[var(--app-text-secondary)]" style={{ fontWeight: 600 }}>연결된 계좌</span>
              </div>

              {/* Sub Accounts List */}
              <div className="flex-1 flex flex-col gap-2">
                <div
                  className="bg-[var(--app-bg-main)] rounded-2xl border border-[var(--app-border)] p-4 cursor-pointer hover:border-[var(--app-success)]/40 transition-colors flex items-center justify-between flex-1"
                  onClick={() => navigate("/accounts")}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--app-success)]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <PiggyBank className="w-5 h-5 text-[var(--app-success)]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-[13px] text-[var(--app-text-tertiary)] mb-0.5">비상금 계좌</div>
                      <div className="text-[18px] text-[var(--app-text-main)]" style={{ fontWeight: 700, fontFamily: "'Nunito', sans-serif" }}>₩ 2,150,000</div>
                    </div>
                  </div>
                </div>
                <div
                  className="bg-[var(--app-bg-main)] rounded-2xl border border-[var(--app-border)] p-4 cursor-pointer hover:border-[var(--app-primary)]/40 transition-colors flex items-center justify-between flex-1"
                  onClick={() => navigate("/accounts")}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#F5E6D0] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Wallet className="w-5 h-5 text-[var(--app-primary)]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-[13px] text-[var(--app-text-tertiary)] mb-0.5">공동 관리 계좌</div>
                      <div className="text-[18px] text-[var(--app-text-main)]" style={{ fontWeight: 700, fontFamily: "'Nunito', sans-serif" }}>₩ 580,000</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>,

            // View 2: Scheduled Expenses & Recommended Goal Achievement Rate
            <div key="view2" className="flex flex-col gap-3 h-full w-full">
              {/* 나의 소비 내역 (이번달 지출 금액) */}
              <div className="bg-[var(--app-bg-main)] rounded-3xl border border-[var(--app-border)] p-4 flex flex-col justify-center items-center flex-none relative overflow-hidden" >
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
                    onClick={() => navigate("/ledger")}
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

              {/* 리포트 랭킹 요약 (Mobile) */}
              <div className="bg-[var(--app-bg-main)] rounded-3xl border border-[var(--app-border)] p-4 flex-none cursor-pointer" onClick={() => navigate("/reports")}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[14px] text-[var(--app-text-main)]" style={{ fontWeight: 600 }}>
                    <Trophy className="w-3.5 h-3.5 inline mr-1.5 text-[var(--app-primary)]" strokeWidth={1.5} />
                    집사 랭킹
                  </h3>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--app-primary)]/10 text-[var(--app-primary)] font-bold">상위 15%</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {memberRanking.map((m) => (
                    <div key={m.rank} className={`flex items-center justify-between p-2 rounded-xl ${
                      m.rank === 1 ? 'bg-gradient-to-r from-[#FDF8F0] to-[#FFF5E6] border border-[var(--app-primary)]/20' : 'bg-[var(--app-bg-tertiary)]'
                    }`}>
                      <div className="flex items-center gap-2">
                        <span className="text-[16px] leading-none">{m.medal}</span>
                        <span className={`text-[13px] ${m.rank === 1 ? 'font-bold text-[var(--app-text-main)]' : 'font-medium text-[var(--app-text-secondary)]'}`}>
                          {m.name}
                        </span>
                      </div>
                      <span className="text-[12px] font-bold text-[var(--app-text-main)]" style={{ fontFamily: "'Nunito', sans-serif" }}>
                        {m.expense.toLocaleString()}원
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 예정된 지출 (Upcoming Expenses) */}
              <div className="bg-[var(--app-bg-main)] rounded-3xl border border-[var(--app-border)] p-4 flex-none" >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[14px] text-[var(--app-text-main)]" style={{ fontWeight: 600 }}>
                    <Calendar className="w-3.5 h-3.5 inline mr-1.5 text-[var(--app-primary)]" strokeWidth={1.5} />
                    예정된 지출
                  </h3>
                  <button className="text-[11px] text-[var(--app-primary)]" onClick={() => navigate("/supplies")}>더보기</button>
                </div>
                <div className="space-y-2">
                  {upcomingExpenses.map((exp, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 bg-[var(--app-bg-tertiary)] rounded-2xl" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
                      <div className="flex items-center gap-2.5">
                        {/* 예정된 지출 — 펫 아바타 사진 */}
                        <PetAvatar pet={exp.petId} size="xs" border={true} />
                        <div>
                          <div className="text-[13px] text-[var(--app-text-secondary)]">{exp.label}</div>
                          <div className="text-[10px] text-[var(--app-text-tertiary)]">{exp.pet} · {exp.date}</div>
                        </div>
                      </div>
                      <span className="text-[13px] text-[#E07C6A]" style={{ fontWeight: 500, fontFamily: "'Nunito', sans-serif" }}>-₩{exp.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── 생애주기 질병 예방 가이드 — Swipeable Cards ── */}
              <div className="bg-[var(--app-bg-main)] rounded-3xl border border-[var(--app-border)] p-4 flex flex-col flex-1 overflow-hidden" >
                <h3 className="text-[14px] text-[var(--app-text-main)] mb-3 shrink-0" style={{ fontWeight: 600 }}>
                  <HeartPulse className="w-3.5 h-3.5 inline mr-1.5 text-[var(--app-primary)]" strokeWidth={1.5} />
                  우리 아이 생애주기 맞춤 질병 가이드
                </h3>

                <div className="relative w-full flex-1 flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                  {/* 1st Card: Choco (Dog) - Youth */}
                  <div className="snap-center shrink-0 w-full min-w-full bg-[var(--app-bg-tertiary)] rounded-2xl p-4 border border-[var(--app-border)]/50 shadow-sm flex flex-col h-full cursor-pointer hover:border-[var(--app-primary)]/40 transition-colors" onClick={() => navigate("/savings")}>
                    <div className="flex items-center gap-2 mb-3">
                      <PetAvatar pet="choco" size="sm" border={false} />
                      <div>
                        <span className="text-[13px] font-bold text-[var(--app-text-main)] block">초코 (강아지)</span>
                        <span className="text-[11px] text-[#A66D38] bg-[#F5E6D0] px-2 py-0.5 rounded-full font-bold mt-0.5 inline-block">현재: 청년기</span>
                      </div>
                    </div>
                    <div className="flex-1 space-y-2.5">
                      <div className="flex items-start gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-[var(--app-primary)] mt-1.5 shrink-0" />
                         <span className="text-[12px] text-[var(--app-text-secondary)] leading-snug break-keep">기초 면역과 사회화를 위해 예방접종(종합,코로나,켄넬코프 등) 스케줄을 맞춰 진행해주세요.</span>
                      </div>
                      <div className="flex items-start gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-[var(--app-primary)] mt-1.5 shrink-0" />
                         <span className="text-[12px] text-[var(--app-text-secondary)] leading-snug break-keep">매월 심장사상충 예방약을 복용해야 합니다.</span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-[10px] text-[var(--app-primary)] font-bold justify-end">
                      밀어서 나비 보기 <ChevronRight className="w-3 h-3 ml-0.5" />
                    </div>
                  </div>

                  {/* 2nd Card: Nabi (Cat) - Middle Age */}
                  <div className="snap-center shrink-0 w-full min-w-full bg-[var(--app-bg-tertiary)] rounded-2xl p-4 border border-[var(--app-border)]/50 shadow-sm flex flex-col h-full cursor-pointer hover:border-[#C4A684]/40 transition-colors" onClick={() => navigate("/savings")}>
                    <div className="flex items-center gap-2 mb-3">
                      <PetAvatar pet="nabi" size="sm" border={false} />
                      <div>
                        <span className="text-[13px] font-bold text-[var(--app-text-main)] block">나비 (고양이)</span>
                        <span className="text-[11px] text-[#296D56] bg-[#D7EBE3] px-2 py-0.5 rounded-full font-bold mt-0.5 inline-block">현재: 중년기</span>
                      </div>
                    </div>
                    <div className="flex-1 space-y-2.5">
                      <div className="flex items-start gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-[#4FA081] mt-1.5 shrink-0" />
                         <span className="text-[12px] text-[var(--app-text-secondary)] leading-snug break-keep">연 1회 이상 정기 검진으로 신장 기능, 심장, 치아 상태를 체크하세요.</span>
                      </div>
                      <div className="flex items-start gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-[#4FA081] mt-1.5 shrink-0" />
                         <span className="text-[12px] text-[var(--app-text-secondary)] leading-snug break-keep">음수량을 늘릴 수 있도록 곳곳에 물그릇을 배치하고 스케일링을 고려해 주세요.</span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-[10px] text-[#4FA081] font-bold justify-end">
                      자세히 보기 <ChevronRight className="w-3 h-3 ml-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ]}
        />
      </div>

      {/* Floating Action Button for QR Payment */}
      <motion.button
        drag
        dragConstraints={{ left: -150, right: 150, top: -400, bottom: 0 }}
        dragElastic={0.1}
        onClick={() => setIsQrModalOpen(true)}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 lg:bottom-10 lg:left-[280px] lg:translate-x-0 w-14 h-14 text-white rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 group shadow-lg cursor-grab active:cursor-grabbing"
        style={{ background: "linear-gradient(135deg, var(--app-primary), var(--app-primary-dark))", boxShadow: "0 8px 20px rgba(212,165,116,0.4)" }}
      >
        <QrCode className="w-6 h-6 group-hover:scale-110 transition-transform pointer-events-none" strokeWidth={1.5} />
      </motion.button >

      {/* QR Payment Modal */}
      {
        isQrModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => setIsQrModalOpen(false)} />
            <div className="relative bg-white rounded-[32px] w-full max-w-[360px] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">

              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #E8A365, #D48C45)" }}
                  >
                    <Send className="w-5 h-5 text-white -mt-0.5 -ml-0.5" strokeWidth={2} />
                  </div>
                  <span className="text-[20px] text-[#1F2937]" style={{ fontWeight: 700 }}>QR 결제</span>
                </div>
                <button
                  onClick={() => setIsQrModalOpen(false)}
                  className="w-8 h-8 flex items-center justify-center bg-[#F3F4F6] rounded-full hover:bg-[#E5E7EB] transition-colors border-none cursor-pointer"
                >
                  <X className="w-4 h-4 text-[#9CA3AF]" strokeWidth={2} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="px-6 pb-6 flex flex-col items-stretch">

                {/* Wallet Info Box */}
                <div className="bg-[#FFFDF5] rounded-[20px] p-4 flex items-center justify-between mb-8 border border-[#F3EAD5]">
                  <div className="flex items-center gap-3">
                    <Wallet className="w-5 h-5 text-[var(--app-primary)]" strokeWidth={2} />
                    <div className="flex flex-col">
                      <span className="text-[12px] text-[#9CA3AF]" style={{ fontWeight: 500 }}>공동 관리 지갑</span>
                      <span className="text-[16px] text-[#1F2937] leading-tight mt-0.5" style={{ fontWeight: 700, fontFamily: "'Nunito', sans-serif" }}>1,250,000원</span>
                    </div>
                  </div>
                  <div className="bg-[#FDF2E3] px-3 py-1.5 rounded-full">
                    <span className="text-[12px] text-[var(--app-primary)]" style={{ fontWeight: 600 }}>결제용</span>
                  </div>
                </div>

                {/* QR Code Container */}
                <div className="flex flex-col items-center mb-6">
                  <div className="w-[200px] h-[200px] bg-[#F9FAFB] rounded-[32px] p-4 flex items-center justify-center mb-5">
                    <div className="w-full h-full bg-white rounded-[20px] p-2 flex items-center justify-center relative overlow-hidden">
                      {/* Simulated QR Pattern for design fidelity */}
                      <img src="https://api.qrserver.com/v1/create-qr-code/?size=250&data=example" alt="QR" className="w-[140px] h-[140px] mix-blend-multiply" />
                    </div>
                  </div>

                  <span className="text-[15px] text-[#374151] mb-1.5" style={{ fontWeight: 700 }}>QR을 스캔하여 결제하세요</span>
                  <span className="text-[13px] text-[#9CA3AF]">이 QR은 5분 후 만료됩니다</span>
                </div>

                {/* Divider */}
                <div className="relative flex items-center justify-center mb-6">
                  <div className="absolute inset-x-0 h-px bg-[#F3F4F6]" />
                  <span className="relative bg-white px-3 text-[12px] text-[#9CA3AF]">또는</span>
                </div>

                {/* Direct Input Button */}
                <button className="w-full py-4 rounded-[20px] border border-[#FDE6C8] flex items-center justify-center bg-white hover:bg-[#FFFDF5] transition-colors cursor-pointer">
                  <span className="text-[14px] text-[#B87A3E]" style={{ fontWeight: 600 }}>금액 직접 입력하기</span>
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}