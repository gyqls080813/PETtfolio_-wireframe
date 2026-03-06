import { useState } from "react";
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
} from "lucide-react";
import PetCharacter from "../figma/PetCharacter";
import PetAvatar from "../figma/PetAvatar";
import pomeImg from "../../../assets/pome.png";
import catImg from "../../../assets/cat-character.png";

const upcomingExpenses = [
  { label: "사료 (오리젠)", date: "03/10", amount: "89,000", pet: "초코", petId: "choco", icon: Dog },
  { label: "예방접종", date: "03/15", amount: "60,000", pet: "나비", petId: "nabi", icon: Cat },
  { label: "미용", date: "03/20", amount: "50,000", pet: "초코", petId: "choco", icon: Dog },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [selectedPet, setSelectedPet] = useState<string>("전체");
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  return (
    <div className="space-y-3">
      {/* Pet Selector — ① 펫 아바타 사진 적용 */}
      <div className="flex gap-2">
        <div
          onClick={() => setSelectedPet("전체")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer transition-all ${selectedPet === "전체" ? "bg-gradient-to-r from-[var(--app-primary)] to-[var(--app-primary-dark)] text-white shadow-md" : "bg-[var(--app-bg-main)] border border-[var(--app-border)] text-[var(--app-text-sub)] hover:border-[var(--app-primary)]/40"}`}
          style={selectedPet === "전체" ? { boxShadow: "0 2px 8px rgba(212, 165, 116, 0.3)" } : {}}
        >
          <span className="text-[13px]" style={{ fontWeight: selectedPet === "전체" ? 600 : 500 }}>전체</span>
        </div>
        <div
          onClick={() => setSelectedPet("초코")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer transition-all ${selectedPet === "초코" ? "bg-[var(--app-primary-light)] border border-[var(--app-primary)]/50 text-[#6B4F3A]" : "bg-[var(--app-bg-main)] border border-[var(--app-border)] text-[var(--app-text-sub)] hover:border-[var(--app-primary)]/40"}`}
        >
          <PetAvatar pet="choco" size="xs" border={false} />
          <span className="text-[13px]" style={{ fontWeight: selectedPet === "초코" ? 600 : 500 }}>초코</span>
        </div>
        <div
          onClick={() => setSelectedPet("나비")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer transition-all ${selectedPet === "나비" ? "bg-[#E8DFD0] border border-[#C4A684]/50 text-[var(--app-text-secondary)]" : "bg-[var(--app-bg-main)] border border-[var(--app-border)] text-[var(--app-text-sub)] hover:border-[#C4A684]/40"}`}
        >
          <PetAvatar pet="nabi" size="xs" border={false} />
          <span className="text-[13px]" style={{ fontWeight: selectedPet === "나비" ? 600 : 500 }}>나비</span>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-stretch">
        {/* Left Column: Pay Overview */}
        <div className="bg-[var(--app-bg-secondary)] rounded-3xl border border-[var(--app-border)] p-4 flex flex-col h-full">
          {/* Hero Wallet Card */}
          <div
            className="rounded-3xl p-5 relative overflow-hidden flex flex-col justify-between mb-4 flex-none"
            style={{ background: "linear-gradient(135deg, var(--app-primary), var(--app-primary-dark), #B8865A)" }}
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-28 h-28 bg-white/10 rounded-full blur-2xl -ml-10 -mb-10" />
            {/* ② 지갑 카드 — 펫 아바타 사진 오버레이 */}
            <div className="absolute bottom-3 right-3 opacity-30">
              <PetAvatar pet={selectedPet === "나비" ? "nabi" : "choco"} size="lg" border={false} className="opacity-60" />
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
                <div className="w-10 h-10 rounded-full bg-[var(--app-primary-light)] flex items-center justify-center group-hover:scale-110 transition-transform">
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
        <div className="flex flex-col gap-3 h-full">
          {/* Upcoming Expenses */}
          <div className="bg-[var(--app-bg-main)] rounded-3xl border border-[var(--app-border)] p-4 flex-none">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[14px] text-[var(--app-text-main)]" style={{ fontWeight: 600 }}>
                <Calendar className="w-3.5 h-3.5 inline mr-1.5 text-[var(--app-primary)]" strokeWidth={1.5} />
                예정된 지출
              </h3>
              <button className="text-[11px] text-[var(--app-primary)]" onClick={() => navigate("/supplies")}>더보기</button>
            </div>
            <div className="space-y-2">
              {upcomingExpenses.map((exp, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 bg-[var(--app-bg-main)] rounded-2xl">
                  <div className="flex items-center gap-2.5">
                    {/* ③ 예정된 지출 — 펫 아바타 사진 */}
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

          {/* ── 개체별 추천 목표 달성률 — 원형 프로그레스 + 펫 일러스트 ── */}
          <div className="bg-[var(--app-bg-main)] rounded-3xl border border-[var(--app-border)] p-4 flex flex-col flex-1">
            <h3 className="text-[14px] text-[var(--app-text-main)] mb-3" style={{ fontWeight: 600 }}>
              <Target className="w-3.5 h-3.5 inline mr-1.5 text-[var(--app-primary)]" strokeWidth={1.5} />
              개체별 추천 목표 달성률
            </h3>

            <div className="flex items-center justify-center gap-4 flex-1">
              {[
                { pet: "초코", pct: 64, color: "var(--app-primary)", trackColor: "#F5EDDF", goal: "5,000,000", current: "3,200,000", petId: "choco", img: pomeImg },
                { pet: "나비", pct: 45, color: "#E8C5A0", trackColor: "#F5EDDF", goal: "3,000,000", current: "1,350,000", petId: "nabi", img: catImg },
              ].filter(item => selectedPet === "전체" || item.pet === selectedPet).map((item, i) => {
                const radius = 58;
                const circumference = 2 * Math.PI * radius;
                const strokeDashoffset = circumference - (item.pct / 100) * circumference;
                const isHigh = item.pct > 50;

                return (
                  <div
                    key={i}
                    className="flex flex-col items-center bg-[var(--app-bg-main)] rounded-2xl p-3 flex-1 border border-[var(--app-border)]/50 hover:shadow-md transition-shadow"
                  >
                    {/* Circular Progress Ring with Pet inside */}
                    <div className="relative w-[140px] h-[140px] flex items-center justify-center">
                      {/* SVG Ring */}
                      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 140 140">
                        {/* Track */}
                        <circle cx="70" cy="70" r={radius} fill="none" stroke={item.trackColor} strokeWidth="8" />
                        {/* Progress */}
                        <circle
                          cx="70" cy="70" r={radius}
                          fill="none"
                          stroke={isHigh ? "var(--app-success)" : item.color}
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                          style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
                        />
                      </svg>

                      {/* Pet character sticker inside the ring */}
                      <div className="relative z-10 w-[80px] h-[80px]">
                        <img
                          src={item.img}
                          alt={item.pet}
                          className="w-full h-full object-contain drop-shadow-md"
                        />
                      </div>

                      {/* Percentage badge */}
                      <div
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-white text-[11px] z-20"
                        style={{ fontWeight: 700, background: isHigh ? "var(--app-success)" : item.color, boxShadow: `0 2px 6px ${isHigh ? "rgba(168,197,160,0.4)" : "rgba(212,165,116,0.4)"}` }}
                      >
                        {item.pct}%
                      </div>

                      {/* Sparkles for high achievers */}
                      {isHigh && (
                        <>
                          <div className="absolute top-1 right-2 text-[10px] animate-pulse">✨</div>
                          <div className="absolute top-4 left-1 text-[8px] animate-pulse" style={{ animationDelay: "0.5s" }}>⭐</div>
                        </>
                      )}
                    </div>

                    {/* Pet Name */}
                    <span className="text-[15px] text-[var(--app-text-main)] mt-2" style={{ fontWeight: 700 }}>{item.pet}</span>
                    <span className="text-[11px] text-[var(--app-text-tertiary)] mb-2">
                      {isHigh ? "잘하고 있어요! 🎉" : "조금 더 힘내요 💪"}
                    </span>

                    {/* Amount info */}
                    <div className="w-full bg-[var(--app-bg-main)] rounded-xl p-2 border border-[var(--app-border)]/30 space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-[var(--app-text-tertiary)]">모인 금액</span>
                        <span className="text-[var(--app-text-main)]" style={{ fontWeight: 600, fontFamily: "'Nunito', sans-serif" }}>₩{item.current}</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-[var(--app-text-tertiary)]">목표</span>
                        <span className="text-[var(--app-text-tertiary)]" style={{ fontFamily: "'Nunito', sans-serif" }}>₩{item.goal}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button for QR Payment */}
      <button
        onClick={() => setIsQrModalOpen(true)}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 lg:bottom-10 lg:left-[280px] lg:translate-x-0 w-14 h-14 text-white rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 group shadow-lg"
        style={{ background: "linear-gradient(135deg, var(--app-primary), var(--app-primary-dark))", boxShadow: "0 8px 20px rgba(212,165,116,0.4)" }}
      >
        <QrCode className="w-6 h-6 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
      </button>

      {/* QR Payment Modal */}
      {isQrModalOpen && (
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
      )}
    </div >
  );
}