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
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer transition-colors ${selectedPet === "전체" ? "bg-[#222] text-white shadow-md shadow-black/10" : "bg-white border border-[#E0E0E0] text-[#666] hover:border-[#CCC]"}`}
        >
          <span className="text-[13px]" style={{ fontWeight: selectedPet === "전체" ? 600 : 500 }}>전체</span>
        </div>
        <div
          onClick={() => setSelectedPet("초코")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer transition-colors ${selectedPet === "초코" ? "bg-[#6C5CE7]/15 border border-[#6C5CE7]/40 text-[#6C5CE7]" : "bg-white border border-[#E0E0E0] text-[#666] hover:border-[#CCC]"}`}
        >
          <Dog className={`w-4 h-4 ${selectedPet === "초코" ? "text-[#6C5CE7]" : "text-[#888]"}`} />
          <span className="text-[13px]" style={{ fontWeight: selectedPet === "초코" ? 600 : 500 }}>초코</span>
        </div>
        <div
          onClick={() => setSelectedPet("나비")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer transition-colors ${selectedPet === "나비" ? "bg-[#00B894]/15 border border-[#00B894]/40 text-[#00B894]" : "bg-white border border-[#E0E0E0] text-[#666] hover:border-[#CCC]"}`}
        >
          <Cat className={`w-4 h-4 ${selectedPet === "나비" ? "text-[#00B894]" : "text-[#888]"}`} />
          <span className="text-[13px]" style={{ fontWeight: selectedPet === "나비" ? 600 : 500 }}>나비</span>
        </div>
      </div>

      {/* Main Content Layout: Let Left Column (Accounts) and Right Column (Expenses + Savings) stretch */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-stretch">
        {/* Left Column: Pay Overview */}
        <div className="bg-[#F8F8FC] rounded-xl border border-[#E8E6F0] p-4 flex flex-col h-full">
          {/* Main Pay Area */}
          <div className="bg-[#6C5CE7] text-white rounded-xl border border-[#5A4ED1] p-5 relative overflow-hidden flex flex-col justify-between mb-4 flex-none">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
            <div className="relative z-10 flex items-center justify-between mb-4 cursor-pointer" onClick={() => navigate("/accounts")}>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <span className="text-[15px] text-white/90 font-medium">페이 머니 잔액</span>
              </div>
              <ChevronRight className="w-5 h-5 text-white/70" />
            </div>
            <div className="relative z-10">
              <div className="text-[32px] tracking-tight cursor-pointer" style={{ fontWeight: 700 }} onClick={() => navigate("/accounts")}>
                ₩ 2,730,000
              </div>
              <div className="flex items-center gap-2 mt-4">
                <button
                  className="w-full bg-white/10 hover:bg-white/20 text-white py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors backdrop-blur-md border border-white/5"
                  onClick={() => navigate("/accounts")}
                >
                  <span className="text-[13px] font-medium">충전하기</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 mb-3 px-1">
            <span className="text-[13px] text-[#555]" style={{ fontWeight: 600 }}>연결된 계좌</span>
          </div>

          {/* Sub Accounts List */}
          <div className="flex-1 flex flex-col gap-2">
            {/* Emergency Fund */}
            <div
              className="bg-white rounded-xl border border-[#E0E0E0] p-4 cursor-pointer hover:border-[#6C5CE7]/30 transition-colors flex items-center justify-between group flex-1"
              onClick={() => navigate("/accounts")}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#00B894]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <PiggyBank className="w-5 h-5 text-[#00B894]" />
                </div>
                <div>
                  <div className="text-[13px] text-[#888] mb-0.5">비상금 계좌</div>
                  <div className="text-[18px] text-[#222]" style={{ fontWeight: 700 }}>₩ 2,150,000</div>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between h-full py-1">
                <ChevronRight className="w-4 h-4 text-[#CCC]" />
                <div className="flex items-center gap-0.5 mt-auto">
                  <ArrowDownRight className="w-3 h-3 text-[#00B894]" />
                  <span className="text-[11px] text-[#00B894] font-medium">안전 수준</span>
                </div>
              </div>
            </div>

            {/* Shared Account */}
            <div
              className="bg-white rounded-xl border border-[#E0E0E0] p-4 cursor-pointer hover:border-[#6C5CE7]/30 transition-colors flex items-center justify-between group flex-1"
              onClick={() => navigate("/accounts")}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#6C5CE7]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Wallet className="w-5 h-5 text-[#6C5CE7]" />
                </div>
                <div>
                  <div className="text-[13px] text-[#888] mb-0.5">공동 관리 계좌</div>
                  <div className="text-[18px] text-[#222]" style={{ fontWeight: 700 }}>₩ 580,000</div>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between h-full py-1">
                <ChevronRight className="w-4 h-4 text-[#CCC]" />
                <div className="text-[11px] text-[#888] mt-auto">이번달 입금: ₩200,000</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Upcoming Expenses (Top) + Savings Goal (Bottom) */}
        <div className="flex flex-col gap-3 h-full">
          {/* Upcoming Expenses (Top Right) */}
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-4 flex-none">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[14px] text-[#222]" style={{ fontWeight: 600 }}>
                <Calendar className="w-3.5 h-3.5 inline mr-1.5 text-[#6C5CE7]" />
                예정된 지출
              </h3>
              <button className="text-[11px] text-[#6C5CE7]" onClick={() => navigate("/supplies")}>더보기</button>
            </div>
            <div className="space-y-2">
              {upcomingExpenses.map((exp, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 bg-[#FAFAFA] rounded-lg">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-white border border-[#EEE] flex items-center justify-center">
                      <exp.icon className="w-3.5 h-3.5 text-[#888]" />
                    </div>
                    <div>
                      <div className="text-[13px] text-[#333]">{exp.label}</div>
                      <div className="text-[10px] text-[#AAA]">{exp.pet} · {exp.date}</div>
                    </div>
                  </div>
                  <span className="text-[13px] text-[#FF6B6B]" style={{ fontWeight: 500 }}>-₩{exp.amount}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Savings Water Level Visualization (Bottom Right) */}
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-4 flex flex-col flex-1">
            <h3 className="text-[14px] text-[#222] mb-4" style={{ fontWeight: 600 }}>
              <Target className="w-3.5 h-3.5 inline mr-1.5 text-[#6C5CE7]" />
              개체별 추천 목표 달성률
            </h3>
            <div className="flex items-end justify-center gap-8 flex-1 pb-2">
              {[
                { pet: "초코", pct: 64, gradient: "linear-gradient(to top, #6C5CE7, #A29BFE)", shadow: "rgba(108,92,231,0.3)", goal: "5,000,000", current: "3,200,000" },
                { pet: "나비", pct: 45, gradient: "linear-gradient(to top, #00B894, #55EFC4)", shadow: "rgba(0,184,148,0.3)", goal: "3,000,000", current: "1,350,000" },
              ].filter(item => selectedPet === "전체" || item.pet === selectedPet).map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-[14px] text-[#222] mb-1.5" style={{ fontWeight: 700 }}>{item.pet}</span>
                  <span className="text-[12px] text-[#888] mb-1.5 font-bold">
                    <span className="text-[#6C5CE7]">{item.pct}%</span> 달성
                  </span>
                  <div className="w-16 h-[110px] bg-[#F0F0F5] rounded-xl relative overflow-hidden border border-[#E0E0E0]">
                    <div
                      className="absolute bottom-0 w-full rounded-b-xl transition-all duration-500"
                      style={{
                        height: `${item.pct}%`,
                        background: item.gradient,
                        boxShadow: `inset 0 2px 8px ${item.shadow}`,
                      }}
                    />
                  </div>
                  <span className="text-[11px] text-[#333] mt-2 font-semibold">모인 금액 ₩ {item.current}</span>
                  <span className="text-[10px] text-[#AAA] mt-0.5">목표 ₩ {item.goal}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button for QR Payment */}
      <button
        onClick={() => setIsQrModalOpen(true)}
        className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 w-14 h-14 bg-[#6C5CE7] text-white rounded-full shadow-[0_8px_20px_rgba(108,92,231,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 group"
      >
        <QrCode className="w-6 h-6 group-hover:rotate-12 transition-transform" />
      </button>

      {/* QR Payment Modal */}
      {isQrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsQrModalOpen(false)} />
          <div className="relative bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#E0E0E0]">
              <span className="text-[16px] font-bold text-[#222]">QR 결제</span>
              <button onClick={() => setIsQrModalOpen(false)} className="p-1 hover:bg-[#F0F0F5] border-none bg-transparent rounded-full transition-colors cursor-pointer">
                <X className="w-5 h-5 text-[#666]" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 flex flex-col items-center justify-center">
              <span className="text-[14px] text-[#666] mb-6">매장 QR 리더기에 스캔해주세요</span>

              {/* Fake QR Code Box */}
              <div className="w-48 h-48 bg-white border-2 border-[#E0E0E0] rounded-xl flex items-center justify-center relative shadow-inner">
                {/* Corner markers for QR feel */}
                <div className="absolute top-3 left-3 w-8 h-8 border-4 border-[#222]" />
                <div className="absolute top-3 right-3 w-8 h-8 border-4 border-[#222]" />
                <div className="absolute bottom-3 left-3 w-8 h-8 border-4 border-[#222]" />

                <QrCode className="w-24 h-24 text-[#222]" />
              </div>

              <div className="mt-6 space-y-1 text-center">
                <span className="block text-[13px] text-[#888]">결제 가능 금액</span>
                <span className="block text-[20px] font-bold text-[#6C5CE7]">₩ 2,730,000</span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-[#F8F8FC] p-4 flex justify-between items-center text-[13px]">
              <span className="text-[#666]">결제 바코드</span>
              <span className="font-semibold tracking-widest text-[#222]">||| || ||| | ||</span>
            </div>
          </div>
        </div>
      )}
    </div >
  );
}