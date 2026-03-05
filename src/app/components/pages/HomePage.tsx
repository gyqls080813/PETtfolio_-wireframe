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
} from "lucide-react";
import PetCharacter from "../figma/PetCharacter";

const upcomingExpenses = [
  { label: "사료 (오리젠)", date: "03/10", amount: "89,000", pet: "초코", icon: Dog },
  { label: "예방접종", date: "03/15", amount: "60,000", pet: "나비", icon: Cat },
  { label: "미용", date: "03/20", amount: "50,000", pet: "초코", icon: Dog },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [selectedPet, setSelectedPet] = useState<string>("전체");
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  return (
    <div className="space-y-3">
      {/* Pet Selector */}
      <div className="flex gap-2">
        <div
          onClick={() => setSelectedPet("전체")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer transition-all ${selectedPet === "전체" ? "bg-gradient-to-r from-[#D4A574] to-[#C4956A] text-white shadow-md" : "bg-[#FFFDF8] border border-[#E8D5C0] text-[#8B7355] hover:border-[#D4A574]/40"}`}
          style={selectedPet === "전체" ? { boxShadow: "0 2px 8px rgba(212, 165, 116, 0.3)" } : {}}
        >
          <span className="text-[13px]" style={{ fontWeight: selectedPet === "전체" ? 600 : 500 }}>전체</span>
        </div>
        <div
          onClick={() => setSelectedPet("초코")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer transition-all ${selectedPet === "초코" ? "bg-[#F5E6D0] border border-[#D4A574]/50 text-[#6B4F3A]" : "bg-[#FFFDF8] border border-[#E8D5C0] text-[#8B7355] hover:border-[#D4A574]/40"}`}
        >
          <Dog className={`w-4 h-4 ${selectedPet === "초코" ? "text-[#D4A574]" : "text-[#B4A08A]"}`} strokeWidth={1.5} />
          <span className="text-[13px]" style={{ fontWeight: selectedPet === "초코" ? 600 : 500 }}>초코</span>
        </div>
        <div
          onClick={() => setSelectedPet("나비")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer transition-all ${selectedPet === "나비" ? "bg-[#E8DFD0] border border-[#C4A684]/50 text-[#5C4A3A]" : "bg-[#FFFDF8] border border-[#E8D5C0] text-[#8B7355] hover:border-[#C4A684]/40"}`}
        >
          <Cat className={`w-4 h-4 ${selectedPet === "나비" ? "text-[#C4A684]" : "text-[#B4A08A]"}`} strokeWidth={1.5} />
          <span className="text-[13px]" style={{ fontWeight: selectedPet === "나비" ? 600 : 500 }}>나비</span>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-stretch">
        {/* Left Column: Pay Overview */}
        <div className="bg-[#F9F0E4] rounded-3xl border border-[#E8D5C0] p-4 flex flex-col h-full">
          {/* Hero Wallet Card */}
          <div
            className="rounded-3xl p-5 relative overflow-hidden flex flex-col justify-between mb-4 flex-none"
            style={{ background: "linear-gradient(135deg, #D4A574, #C4956A, #B8865A)" }}
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-28 h-28 bg-white/10 rounded-full blur-2xl -ml-10 -mb-10" />
            {/* Pet character floating in the corner */}
            <div className="absolute -bottom-2 -right-2 opacity-20">
              <PetCharacter type="dog" size="lg" mood="sleepy" />
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
                  onClick={() => navigate("/accounts")}
                >
                  <span className="text-[13px] font-semibold text-white">결제하기</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 mb-3 px-1">
            <span className="text-[13px] text-[#5C4A3A]" style={{ fontWeight: 600 }}>연결된 계좌</span>
          </div>

          {/* Sub Accounts List */}
          <div className="flex-1 flex flex-col gap-2">
            {/* Emergency Fund */}
            <div
              className="bg-[#FFFDF8] rounded-2xl border border-[#E8D5C0] p-4 cursor-pointer hover:border-[#A8C5A0]/40 transition-colors flex items-center justify-between group flex-1"
              onClick={() => navigate("/accounts")}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#A8C5A0]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <PiggyBank className="w-5 h-5 text-[#A8C5A0]" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-[13px] text-[#B4A08A] mb-0.5">비상금 계좌</div>
                  <div className="text-[18px] text-[#3D3229]" style={{ fontWeight: 700, fontFamily: "'Nunito', sans-serif" }}>₩ 2,150,000</div>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between h-full py-1">
                <ChevronRight className="w-4 h-4 text-[#D9C8B4]" />
                <div className="flex items-center gap-0.5 mt-auto">
                  <ArrowDownRight className="w-3 h-3 text-[#A8C5A0]" />
                  <span className="text-[11px] text-[#A8C5A0] font-medium">안전 수준</span>
                </div>
              </div>
            </div>

            {/* Shared Account */}
            <div
              className="bg-[#FFFDF8] rounded-2xl border border-[#E8D5C0] p-4 cursor-pointer hover:border-[#D4A574]/40 transition-colors flex items-center justify-between group flex-1"
              onClick={() => navigate("/accounts")}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F5E6D0] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Wallet className="w-5 h-5 text-[#D4A574]" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-[13px] text-[#B4A08A] mb-0.5">공동 관리 계좌</div>
                  <div className="text-[18px] text-[#3D3229]" style={{ fontWeight: 700, fontFamily: "'Nunito', sans-serif" }}>₩ 580,000</div>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between h-full py-1">
                <ChevronRight className="w-4 h-4 text-[#D9C8B4]" />
                <div className="text-[11px] text-[#B4A08A] mt-auto">이번달 입금: ₩200,000</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-3 h-full">
          {/* Upcoming Expenses */}
          <div className="bg-[#FFFDF8] rounded-3xl border border-[#E8D5C0] p-4 flex-none">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[14px] text-[#3D3229]" style={{ fontWeight: 600 }}>
                <Calendar className="w-3.5 h-3.5 inline mr-1.5 text-[#D4A574]" strokeWidth={1.5} />
                예정된 지출
              </h3>
              <button className="text-[11px] text-[#D4A574]" onClick={() => navigate("/supplies")}>더보기</button>
            </div>
            <div className="space-y-2">
              {upcomingExpenses.map((exp, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 bg-[#FFF8EE] rounded-2xl">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-xl bg-[#FFFDF8] border border-[#E8D5C0] flex items-center justify-center">
                      <exp.icon className="w-3.5 h-3.5 text-[#B4A08A]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-[13px] text-[#5C4A3A]">{exp.label}</div>
                      <div className="text-[10px] text-[#B4A08A]">{exp.pet} · {exp.date}</div>
                    </div>
                  </div>
                  <span className="text-[13px] text-[#E07C6A]" style={{ fontWeight: 500, fontFamily: "'Nunito', sans-serif" }}>-₩{exp.amount}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Savings Water Level */}
          <div className="bg-[#FFFDF8] rounded-3xl border border-[#E8D5C0] p-4 flex flex-col flex-1">
            <h3 className="text-[14px] text-[#3D3229] mb-4" style={{ fontWeight: 600 }}>
              <Target className="w-3.5 h-3.5 inline mr-1.5 text-[#D4A574]" strokeWidth={1.5} />
              개체별 추천 목표 달성률
            </h3>
            <div className="flex items-end justify-center gap-8 flex-1 pb-2">
              {[
                { pet: "초코", pct: 64, gradient: "linear-gradient(to top, #D4A574, #C4956A)", shadow: "rgba(212,165,116,0.3)", goal: "5,000,000", current: "3,200,000", type: "dog" as const },
                { pet: "나비", pct: 45, gradient: "linear-gradient(to top, #E8C5A0, #D4B08C)", shadow: "rgba(232,197,160,0.3)", goal: "3,000,000", current: "1,350,000", type: "cat" as const },
              ].filter(item => selectedPet === "전체" || item.pet === selectedPet).map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <PetCharacter type={item.type} size="sm" mood={item.pct > 50 ? "happy" : "sleepy"} />
                  <span className="text-[14px] text-[#3D3229] mb-0.5" style={{ fontWeight: 700 }}>{item.pet}</span>
                  <span className="text-[12px] text-[#B4A08A] mb-1.5 font-bold">
                    <span style={{ color: "#D4A574" }}>{item.pct}%</span> 달성
                  </span>
                  <div className="w-16 h-[110px] bg-[#F5EDDF] rounded-2xl relative overflow-hidden border border-[#E8D5C0]">
                    <div
                      className="absolute bottom-0 w-full rounded-b-2xl transition-all duration-500"
                      style={{
                        height: `${item.pct}%`,
                        background: item.gradient,
                        boxShadow: `inset 0 2px 8px ${item.shadow}`,
                      }}
                    />
                  </div>
                  <span className="text-[11px] text-[#5C4A3A] mt-2 font-semibold" style={{ fontFamily: "'Nunito', sans-serif" }}>모인 금액 ₩ {item.current}</span>
                  <span className="text-[10px] text-[#B4A08A] mt-0.5">목표 ₩ {item.goal}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button for QR Payment */}
      <button
        onClick={() => setIsQrModalOpen(true)}
        className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 w-14 h-14 text-white rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 group"
        style={{ background: "linear-gradient(135deg, #D4A574, #C4956A)", boxShadow: "0 8px 20px rgba(212,165,116,0.4)" }}
      >
        <QrCode className="w-6 h-6 group-hover:rotate-12 transition-transform" strokeWidth={1.5} />
      </button>

      {/* QR Payment Modal */}
      {isQrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsQrModalOpen(false)} />
          <div className="relative bg-[#FFFDF8] rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#E8D5C0]">
              <span className="text-[16px] font-bold text-[#3D3229]">QR 결제</span>
              <button onClick={() => setIsQrModalOpen(false)} className="p-1 hover:bg-[#F9F0E4] border-none bg-transparent rounded-full transition-colors cursor-pointer">
                <X className="w-5 h-5 text-[#8B7355]" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 flex flex-col items-center justify-center">
              <span className="text-[14px] text-[#8B7355] mb-6">매장 QR 리더기에 스캔해주세요</span>

              {/* Fake QR Code Box */}
              <div className="w-48 h-48 bg-white border-2 border-[#E8D5C0] rounded-2xl flex items-center justify-center relative shadow-inner">
                <div className="absolute top-3 left-3 w-8 h-8 border-4 border-[#3D3229]" />
                <div className="absolute top-3 right-3 w-8 h-8 border-4 border-[#3D3229]" />
                <div className="absolute bottom-3 left-3 w-8 h-8 border-4 border-[#3D3229]" />
                <QrCode className="w-24 h-24 text-[#3D3229]" strokeWidth={1.5} />
              </div>

              <div className="mt-6 space-y-1 text-center">
                <span className="block text-[13px] text-[#B4A08A]">결제 가능 금액</span>
                <span className="block text-[20px] font-bold text-[#D4A574]" style={{ fontFamily: "'Nunito', sans-serif" }}>₩ 2,730,000</span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-[#F9F0E4] p-4 flex justify-between items-center text-[13px]">
              <span className="text-[#8B7355]">결제 바코드</span>
              <span className="font-semibold tracking-widest text-[#3D3229]">||| || ||| | ||</span>
            </div>
          </div>
        </div>
      )}
    </div >
  );
}