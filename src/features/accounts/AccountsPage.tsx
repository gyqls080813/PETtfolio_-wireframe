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

// 펫 스티커 이미지
import pomeImg from "../../assets/pome.png";
import catImg from "../../assets/cat-character.png";
import stickerThumbsup from "../../assets/pome_thumbsup.png";
import stickerSad from "../../assets/pome_sad.png";
import stickerEating from "../../assets/pome_eating.png";
import stickerGrooming from "../../assets/pome_grooming.png";
import stickerHospital from "../../assets/pome_hospital.png";
import stickerSnack from "../../assets/pome_snack.png";

const txHistoryData = [
  { id: 1, date: "03/04", desc: "사료 구매 - 오리젠", amount: "-89,000", type: "out", account: "shared", cat: "사료" },
  { id: 2, date: "03/03", desc: "공동 페이 충전", amount: "+200,000", type: "in", account: "shared", cat: "충전" },
  { id: 3, date: "03/02", desc: "간식 구매", amount: "-12,500", type: "out", account: "shared", cat: "간식" },
  { id: 4, date: "03/01", desc: "비상금 페이 이체", amount: "-100,000", type: "out", account: "shared", cat: "이체" },
  { id: 5, date: "03/01", desc: "메인 페이 이체 수신", amount: "+100,000", type: "in", account: "emergency", cat: "충전" },
  { id: 6, date: "02/28", desc: "김집사 송금", amount: "+150,000", type: "in", account: "shared", cat: "충전" },
  { id: 7, date: "02/27", desc: "영양제 구매", amount: "-35,000", type: "out", account: "shared", cat: "병원" },
];

// 카테고리별 스티커 매핑
const catStickerMap: Record<string, string> = {
  "사료": stickerEating,
  "간식": stickerSnack,
  "미용": stickerGrooming,
  "병원": stickerHospital,
  "충전": stickerThumbsup,
  "이체": stickerSad,
};

export default function AccountPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<"all" | "shared" | "emergency">("shared");
  const carouselRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync mobile swipe with selected account
  const handleScroll = () => {
    if (window.innerWidth >= 1024) return;
    if (!carouselRef.current) return;
    if (isScrollingRef.current) return;

    const scrollLeft = carouselRef.current.scrollLeft;
    if (scrollLeft > 100) {
      if (selectedAccount !== "emergency") setSelectedAccount("emergency");
    } else {
      if (selectedAccount !== "shared" && selectedAccount !== "all") setSelectedAccount("shared");
    }
  };

  useEffect(() => {
    if (window.innerWidth >= 1024) return;
    if (!carouselRef.current) return;

    if (selectedAccount === "shared" || selectedAccount === "emergency") {
      const index = selectedAccount === "shared" ? 0 : 1;
      const cardElement = carouselRef.current.children[index] as HTMLElement;
      if (cardElement) {
        isScrollingRef.current = true;
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

        carouselRef.current.scrollTo({
          left: cardElement.offsetLeft - carouselRef.current.parentElement!.offsetLeft,
          behavior: 'smooth'
        });

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
    <div className="pt-2">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left Column: Account Cards */}
        <div className="lg:col-span-5 flex flex-col gap-2 lg:gap-4 h-full">
          <div className="px-1 pt-1 mb-2 flex items-center gap-3">
            <img src={pomeImg} alt="pet" className="w-[48px] h-[48px] object-contain drop-shadow-md" />
            <div>
              <h2 className="text-[20px] font-extrabold text-[#3D3229] mb-1 tracking-tight">내 페이 관리</h2>
              <p className="text-[13px] text-[#B4A08A] font-medium tracking-tight">목적에 맞게 잔액을 나누어 써보세요</p>
            </div>
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
              className={`snap-center shrink-0 w-[90vw] sm:w-[80vw] lg:w-auto bg-white rounded-[20px] p-5 cursor-pointer transition-all duration-300 relative overflow-hidden ${selectedAccount === "shared" || selectedAccount === "all" ? "shadow-[0_8px_30px_rgba(245,158,11,0.15)] border-[1.5px] border-[#D4A574] lg:scale-[1.02] z-10" : "border border-[#E8D5C0] shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:border-[#E8D5C0]"}`}
              onClick={() => setSelectedAccount("shared")}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex flex-col">
                  <span className="text-[12px] text-[#5C4A3A] font-semibold mb-0.5">초코네 가족</span>
                  <span className="text-[13px] text-[#B4A08A] font-medium underline decoration-1 underline-offset-4 decoration-[#E8D5C0]">공동 페이 가상계좌 110-123-456789</span>
                </div>
              </div>
              <div className="flex items-end gap-1 mb-5">
                <div className="text-[28px] text-[#3D3229] tracking-tight" style={{ fontWeight: 800, lineHeight: 1, fontFamily: "'Nunito', sans-serif" }}>580,000</div>
                <div className="text-[18px] text-[#3D3229] font-bold pb-0.5">원</div>
              </div>
              <div className="flex gap-2.5">
                <button className="flex-1 py-3 bg-[#F5E6D0] text-[#6B4F3A] rounded-[12px] text-[14px] font-bold hover:bg-[#E8D5C0] transition-colors">
                  채우기
                </button>
                <button
                  className="flex-1 py-3 text-white rounded-[12px] text-[14px] font-bold hover:opacity-90 shadow-[0_2px_6px_rgba(245,158,11,0.3)] transition-all active:scale-95"
                  style={{ background: "linear-gradient(135deg, #D4A574, #C4956A)" }}
                >
                  보내기
                </button>
              </div>
            </div>

            {/* Emergency Pay Card */}
            <div
              className={`snap-center shrink-0 w-[90vw] sm:w-[80vw] lg:w-auto bg-white rounded-[20px] p-5 cursor-pointer transition-all duration-300 relative overflow-hidden ${selectedAccount === "emergency" ? "shadow-[0_8px_30px_rgba(245,158,11,0.15)] border-[1.5px] border-[#D4A574] lg:scale-[1.02] z-10" : "border border-[#E8D5C0] shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:border-[#E8D5C0]"}`}
              onClick={() => setSelectedAccount("emergency")}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex flex-col">
                  <span className="text-[12px] text-[#5C4A3A] font-semibold mb-0.5">예비 자금</span>
                  <span className="text-[13px] text-[#B4A08A] font-medium underline decoration-1 underline-offset-4 decoration-[#E8D5C0]">비상금 페이 가상계좌 110-987-654321</span>
                </div>
              </div>
              <div className="flex items-end gap-1 mb-5">
                <div className="text-[28px] text-[#3D3229] tracking-tight" style={{ fontWeight: 800, lineHeight: 1, fontFamily: "'Nunito', sans-serif" }}>2,150,000</div>
                <div className="text-[18px] text-[#3D3229] font-bold pb-0.5">원</div>
              </div>
              <div className="flex gap-2.5">
                <button className="flex-1 py-3 bg-[#F5E6D0] text-[#6B4F3A] rounded-[12px] text-[14px] font-bold hover:bg-[#E8D5C0] transition-colors">
                  채우기
                </button>
                <button
                  className="flex-1 py-3 text-white rounded-[12px] text-[14px] font-bold hover:opacity-90 shadow-[0_2px_6px_rgba(245,158,11,0.3)] transition-all active:scale-95"
                  style={{ background: "linear-gradient(135deg, #D4A574, #C4956A)" }}
                >
                  보내기
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Carousel Indicators */}
          <div className="flex lg:hidden justify-center gap-2 mb-2">
            <div className={`w-1.5 h-1.5 rounded-full transition-colors ${selectedAccount === "shared" || selectedAccount === "all" ? "bg-[#D4A574]" : "bg-[#E8D5C0]"}`} />
            <div className={`w-1.5 h-1.5 rounded-full transition-colors ${selectedAccount === "emergency" ? "bg-[#D4A574]" : "bg-[#E8D5C0]"}`} />
          </div>
        </div>

        {/* Right Column: Transaction History */}
        <div className="lg:col-span-7 relative flex flex-col h-[550px] lg:h-auto lg:min-h-[100%]">
          <div className="lg:absolute lg:inset-0 bg-white rounded-2xl border border-[#E8D5C0] p-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-1 -ml-2">
                <button
                  onClick={() => setSelectedAccount("shared")}
                  disabled={selectedAccount === "shared"}
                  className={`p-1 rounded-full transition-colors ${selectedAccount === "shared" ? "opacity-30 cursor-not-allowed" : "hover:bg-[#FFF8EE] active:bg-[#F5E6D0]"}`}
                >
                  <ChevronLeft className="w-6 h-6 text-[#3D3229]" />
                </button>

                <span className="text-[19px] text-[#3D3229] font-bold min-w-[85px] text-center select-none">
                  {selectedAccount === "emergency" ? "비상금 페이" : "공동 페이"}
                </span>

                <button
                  onClick={() => setSelectedAccount("emergency")}
                  disabled={selectedAccount === "emergency"}
                  className={`p-1 rounded-full transition-colors ${selectedAccount === "emergency" ? "opacity-30 cursor-not-allowed" : "hover:bg-[#FFF8EE] active:bg-[#F5E6D0]"}`}
                >
                  <ChevronRight className="w-6 h-6 text-[#3D3229]" />
                </button>
              </div>

              <button className="flex items-center gap-1.5 text-[14px] text-[#B4A08A] font-medium hover:text-[#5C4A3A] transition-colors">
                5분 전 <RefreshCcw className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>

            <div className="space-y-1 overflow-y-auto pr-2 flex-1 min-h-0">
              <div className="text-[14px] text-[#B4A08A] font-medium mb-3 pl-1">최근 내역</div>
              {filteredHistory.length > 0 ? (
                filteredHistory.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between py-3.5 px-2 hover:bg-[#FFF8EE] rounded-2xl transition-colors cursor-pointer group -mx-2">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 flex items-center justify-center shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)]">
                        <div className={`w-full h-full ${tx.type === "in" ? "bg-[#E8F5E4]" : "bg-[#FFF8EE]"} flex items-center justify-center`}>
                          <img
                            src={catStickerMap[tx.cat] || (tx.type === "in" ? stickerThumbsup : stickerSad)}
                            alt={tx.cat}
                            className="w-9 h-9 object-contain"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="text-[16px] text-[#3D3229] font-semibold mb-0.5">{tx.desc}</div>
                        <div className="flex items-center gap-1.5 text-[14px] text-[#B4A08A]">
                          <span>{tx.date}</span>
                          <span>12:00</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end justify-center">
                      <span className={`text-[16px] font-bold ${tx.type === "in" ? "text-[#A8C5A0]" : "text-[#3D3229]"}`} style={{ fontFamily: "'Nunito', sans-serif" }}>
                        {tx.type === "out" ? tx.amount.replace('-', '') : tx.amount.replace('+', '')} 원
                      </span>
                      <span className="text-[14px] text-[#B4A08A] mt-0.5">잔액 0 원</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-[#D9C8B4]">
                  <img src={stickerSad} alt="없음" className="w-16 h-16 object-contain mb-4 opacity-60" />
                  <p className="text-[15px] font-medium">해당 페이의 거래 내역이 없습니다.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}