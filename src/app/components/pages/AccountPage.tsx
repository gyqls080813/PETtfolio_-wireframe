import {
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  PiggyBank,
  History,
  ChevronRight,
  ChevronLeft,
  RefreshCcw,
  User,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

const txHistoryData = [
  { id: 1, date: "03/04", desc: "사료 구매 - 오리젠", amount: "-89,000", type: "out", account: "shared" },
  { id: 2, date: "03/03", desc: "공동 페이 충전", amount: "+200,000", type: "in", account: "shared" },
  { id: 3, date: "03/02", desc: "간식 구매", amount: "-12,500", type: "out", account: "shared" },
  { id: 4, date: "03/01", desc: "비상금 페이 이체", amount: "-100,000", type: "out", account: "shared" },
  { id: 5, date: "03/01", desc: "메인 페이 이체 수신", amount: "+100,000", type: "in", account: "emergency" },
  { id: 6, date: "02/28", desc: "김집사 송금", amount: "+150,000", type: "in", account: "shared" },
  { id: 7, date: "02/27", desc: "영양제 구매", amount: "-35,000", type: "out", account: "shared" },
];

export default function AccountPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<"all" | "shared" | "emergency">("shared");
  const carouselRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync mobile swipe with selected account
  const handleScroll = () => {
    if (window.innerWidth >= 1024) return; // Desktop uses split-pane, ignore scroll
    if (!carouselRef.current) return;
    if (isScrollingRef.current) return; // Ignore onScroll updates during programmed transitions

    const scrollLeft = carouselRef.current.scrollLeft;
    if (scrollLeft > 100) {
      if (selectedAccount !== "emergency") setSelectedAccount("emergency");
    } else {
      if (selectedAccount !== "shared" && selectedAccount !== "all") setSelectedAccount("shared");
    }
  };

  // Sync scroll position when account is changed from dropdown or desktop click
  useEffect(() => {
    if (window.innerWidth >= 1024) return;
    if (!carouselRef.current) return;

    if (selectedAccount === "shared" || selectedAccount === "emergency") {
      const index = selectedAccount === "shared" ? 0 : 1;
      const cardElement = carouselRef.current.children[index] as HTMLElement;
      if (cardElement) {
        // Set scroll lock to prevent scroll event from overriding our state
        isScrollingRef.current = true;
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

        carouselRef.current.scrollTo({
          left: cardElement.offsetLeft - carouselRef.current.parentElement!.offsetLeft,
          behavior: 'smooth'
        });

        // Release scroll lock after transition
        scrollTimeoutRef.current = setTimeout(() => {
          isScrollingRef.current = false;
        }, 500);
      }
    }

    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    }
  }, [selectedAccount]);

  const filteredHistory = txHistoryData.filter(tx => selectedAccount === "all" || tx.account === selectedAccount);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-end">
        <button
          className="flex items-center gap-1.5 px-3 py-2 bg-[#6C5CE7] text-white rounded-lg text-[13px] hover:bg-[#5A4BD1] transition-colors"
          onClick={() => setShowCreate(!showCreate)}
        >
          <Plus className="w-4 h-4" />
          계좌 생성
        </button>
      </div>

      {showCreate && (
        <div className="bg-white rounded-xl border border-[#E0E0E0] p-5 space-y-3">
          <h3 className="text-[16px] text-[#222]" style={{ fontWeight: 600 }}>새 계좌 생성</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-[13px] text-[#666] mb-1 block">계좌 이름</label>
              <input placeholder="예: 초코 비상금 계좌" className="w-full border border-[#DDD] rounded-lg px-3 py-2.5 bg-[#FAFAFA] text-[14px] outline-none placeholder:text-[#CCC]" />
            </div>
            <div>
              <label className="text-[13px] text-[#666] mb-1 block">계좌 유형</label>
              <select className="w-full border border-[#DDD] rounded-lg px-3 py-2.5 bg-[#FAFAFA] text-[14px] outline-none appearance-none">
                <option>비상금 계좌</option>
                <option>공동 관리 계좌</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button className="px-4 py-2 border border-[#DDD] rounded-lg text-[13px] text-[#666]" onClick={() => setShowCreate(false)}>취소</button>
            <button className="px-4 py-2 bg-[#6C5CE7] text-white rounded-lg text-[13px]" onClick={() => setShowCreate(false)}>생성</button>
          </div>
        </div>
      )}

      {/* Two Column Layout for Pay Management */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left Column: Account Cards Stack (Desktop) / Carousel (Mobile) */}
        <div className="lg:col-span-5 flex flex-col gap-2 lg:gap-4 h-full">
          {/* Section Header */}
          <div className="px-1 pt-1 mb-2">
            <h2 className="text-[20px] font-extrabold text-[#191F28] mb-1 tracking-tight">내 페이 관리</h2>
            <p className="text-[13px] text-[#8B95A1] font-medium tracking-tight">목적에 맞게 잔액을 나누어 써보세요</p>
          </div>

          <style>{`
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>

          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible snap-x snap-mandatory pb-2 lg:pb-0 hide-scrollbar"
          >
            {/* Shared Pay Card */}
            <div
              className={`snap-center shrink-0 w-[90vw] sm:w-[80vw] lg:w-auto bg-white rounded-[20px] p-5 cursor-pointer transition-all duration-300 relative overflow-hidden ${selectedAccount === "shared" || selectedAccount === "all" ? "shadow-[0_8px_30px_rgba(49,130,246,0.12)] border-[1.5px] border-[#3182F6] lg:scale-[1.02] z-10" : "border border-[#F2F4F6] shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:border-[#E5E8EB]"}`}
              onClick={() => setSelectedAccount("shared")}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex flex-col">
                  <span className="text-[12px] text-[#4E5968] font-semibold mb-0.5">초코네 가족</span>
                  <span className="text-[13px] text-[#8B95A1] font-medium underline decoration-1 underline-offset-4 decoration-[#D1D6DB]">공동 페이 가상계좌 110-123-456789</span>
                </div>
              </div>
              <div className="flex items-end gap-1 mb-5">
                <div className="text-[28px] text-[#191F28] tracking-tight" style={{ fontWeight: 800, lineHeight: 1 }}>580,000</div>
                <div className="text-[18px] text-[#191F28] font-bold pb-0.5">원</div>
              </div>
              <div className="flex gap-2.5">
                <button className="flex-1 py-3 bg-[#E8F3FF] text-[#1B64DA] rounded-[12px] text-[14px] font-bold hover:bg-[#D3E4FF] transition-colors">
                  채우기
                </button>
                <button className="flex-1 py-3 bg-[#3182F6] text-white rounded-[12px] text-[14px] font-bold hover:bg-[#1B64DA] shadow-[0_2px_6px_rgba(49,130,246,0.25)] transition-all">
                  보내기
                </button>
              </div>
            </div>

            {/* Emergency Pay Card */}
            <div
              className={`snap-center shrink-0 w-[90vw] sm:w-[80vw] lg:w-auto bg-white rounded-[20px] p-5 cursor-pointer transition-all duration-300 relative overflow-hidden ${selectedAccount === "emergency" ? "shadow-[0_8px_30px_rgba(49,130,246,0.12)] border-[1.5px] border-[#3182F6] lg:scale-[1.02] z-10" : "border border-[#F2F4F6] shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:border-[#E5E8EB]"}`}
              onClick={() => setSelectedAccount("emergency")}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex flex-col">
                  <span className="text-[12px] text-[#4E5968] font-semibold mb-0.5">예비 자금</span>
                  <span className="text-[13px] text-[#8B95A1] font-medium underline decoration-1 underline-offset-4 decoration-[#D1D6DB]">비상금 페이 가상계좌 110-987-654321</span>
                </div>
              </div>
              <div className="flex items-end gap-1 mb-5">
                <div className="text-[28px] text-[#191F28] tracking-tight" style={{ fontWeight: 800, lineHeight: 1 }}>2,150,000</div>
                <div className="text-[18px] text-[#191F28] font-bold pb-0.5">원</div>
              </div>
              <div className="flex gap-2.5">
                <button className="flex-1 py-3 bg-[#E8F3FF] text-[#1B64DA] rounded-[12px] text-[14px] font-bold hover:bg-[#D3E4FF] transition-colors">
                  채우기
                </button>
                <button className="flex-1 py-3 bg-[#3182F6] text-white rounded-[12px] text-[14px] font-bold hover:bg-[#1B64DA] shadow-[0_2px_6px_rgba(49,130,246,0.25)] transition-all">
                  보내기
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Carousel Indicators */}
          <div className="flex lg:hidden justify-center gap-2 mb-2">
            <div className={`w-1.5 h-1.5 rounded-full transition-colors ${selectedAccount === "shared" || selectedAccount === "all" ? "bg-[#3182F6]" : "bg-[#D1D6DB]"}`} />
            <div className={`w-1.5 h-1.5 rounded-full transition-colors ${selectedAccount === "emergency" ? "bg-[#3182F6]" : "bg-[#D1D6DB]"}`} />
          </div>
        </div>

        {/* Right Column: Transaction History */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#F2F4F6] p-6 flex flex-col h-full">
          {/* Header Area */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-1 -ml-2">
              <button
                onClick={() => setSelectedAccount("shared")}
                disabled={selectedAccount === "shared"}
                className={`p-1 rounded-full transition-colors ${selectedAccount === "shared" ? "opacity-30 cursor-not-allowed" : "hover:bg-[#F2F4F6] active:bg-[#E5E8EB]"}`}
              >
                <ChevronLeft className="w-6 h-6 text-[#191F28]" />
              </button>

              <span className="text-[19px] text-[#191F28] font-bold min-w-[85px] text-center select-none">
                {selectedAccount === "emergency" ? "비상금 페이" : "공동 페이"}
              </span>

              <button
                onClick={() => setSelectedAccount("emergency")}
                disabled={selectedAccount === "emergency"}
                className={`p-1 rounded-full transition-colors ${selectedAccount === "emergency" ? "opacity-30 cursor-not-allowed" : "hover:bg-[#F2F4F6] active:bg-[#E5E8EB]"}`}
              >
                <ChevronRight className="w-6 h-6 text-[#191F28]" />
              </button>
            </div>

            <button className="flex items-center gap-1.5 text-[14px] text-[#8B95A1] font-medium hover:text-[#4E5968] transition-colors">
              5분 전 <RefreshCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1 overflow-y-auto pr-2 flex-1" style={{ maxHeight: 'calc(100vh - 280px)' }}>
            {/* Optional Date Header could go here. Render list strictly */}
            <div className="text-[14px] text-[#8B95A1] font-medium mb-3 pl-1">최근 내역</div>
            {filteredHistory.length > 0 ? (
              filteredHistory.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between py-3.5 px-2 hover:bg-[#F9FAFB] rounded-2xl transition-colors cursor-pointer group -mx-2">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 flex items-center justify-center shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)]">
                      {tx.type === "in" ? (
                        <div className="w-full h-full bg-[#3182F6] flex items-center justify-center">
                          <span className="text-white font-bold text-[16px]">₩</span>
                        </div>
                      ) : (
                        <div className="w-full h-full bg-[#F2F4F6] flex items-center justify-center text-[#B0B8C1]">
                          <User className="w-6 h-6" fill="currentColor" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-[16px] text-[#191F28] font-semibold mb-0.5">{tx.desc}</div>
                      <div className="flex items-center gap-1.5 text-[14px] text-[#8B95A1]">
                        <span>{tx.date}</span>
                        <span>12:00</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end justify-center">
                    <span className={`text-[16px] font-bold ${tx.type === "in" ? "text-[#3182F6]" : "text-[#191F28]"}`}>
                      {tx.type === "out" ? tx.amount.replace('-', '') : tx.amount.replace('+', '')} 원
                    </span>
                    <span className="text-[14px] text-[#8B95A1] mt-0.5">잔액 0 원</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-[#B0B8C1]">
                <History className="w-10 h-10 mb-4 opacity-50" />
                <p className="text-[15px] font-medium">해당 페이의 거래 내역이 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}