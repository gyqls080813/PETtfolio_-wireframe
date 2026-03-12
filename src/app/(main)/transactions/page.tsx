"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Wallet,
  ChevronRight,
  ChevronLeft,
  CreditCard,
  Plus,
  Trash2,
  X,
  HeartPulse,
} from "lucide-react";

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
  transactions: { desc: string; amount: number; date: string; category: string }[];
}

const initialCards: CardData[] = [
  {
    id: 1,
    alias: "토스 체크카드",
    number: "5234  ****  ****  1234",
    company: "토스뱅크",
    expiry: "12/28",
    color: "#3182F6",
    gradientTo: "#1B64DA",
    monthlyTotal: 199000,
    txCount: 12,
    transactions: [
      { desc: "펫프렌즈 (사료)", amount: 45000, date: "12/05", category: "사료" },
      { desc: "동물병원 정기검진", amount: 150000, date: "12/04", category: "병원" },
      { desc: "쿠팡 (간식)", amount: 12500, date: "12/03", category: "간식" },
      { desc: "스타벅스", amount: 6500, date: "12/03", category: "카페" },
      { desc: "마이펫방", amount: 32000, date: "12/02", category: "용품" },
      { desc: "배달의민족", amount: 18500, date: "12/01", category: "음식" },
    ],
  },
  {
    id: 2,
    alias: "삼성카드",
    number: "9411  ****  ****  5678",
    company: "삼성카드",
    expiry: "06/27",
    color: "#1428A0",
    gradientTo: "#0B1A6E",
    monthlyTotal: 87500,
    txCount: 5,
    transactions: [
      { desc: "미용실 멍멍이", amount: 50000, date: "12/01", category: "미용" },
      { desc: "이마트 (위생용품)", amount: 18000, date: "12/01", category: "위생" },
      { desc: "약국 (관절 영양제)", amount: 35000, date: "11/28", category: "약품" },
      { desc: "GS25", amount: 3200, date: "11/27", category: "편의점" },
      { desc: "동물병원 예방접종", amount: 60000, date: "11/25", category: "병원" },
    ],
  },
];

export default function TransactionsPage() {
  const router = useRouter();
  const [cards, setCards] = useState<CardData[]>(initialCards);
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const currentCard = cards.length > 0 ? cards[currentCardIdx] : null;

  const handleDeleteCard = (cardId: number) => {
    const newCards = cards.filter(c => c.id !== cardId);
    setCards(newCards);
    if (currentCardIdx >= newCards.length) setCurrentCardIdx(Math.max(0, newCards.length - 1));
    if (newCards.length === 0) setIsDeleteMode(false);
  };

  const handleAddCard = () => {
    const newId = cards.length > 0 ? Math.max(...cards.map(c => c.id)) + 1 : 1;
    const colors = [
      { color: "#FF6B35", gradientTo: "#CC5528" },
      { color: "#7C3AED", gradientTo: "#5B21B6" },
      { color: "#059669", gradientTo: "#047857" },
    ];
    const c = colors[newId % colors.length];
    setCards(prev => [...prev, {
      id: newId,
      alias: "새 카드",
      number: `${Math.floor(1000 + Math.random() * 9000)}  ****  ****  ${Math.floor(1000 + Math.random() * 9000)}`,
      company: "카드사",
      expiry: "01/29",
      color: c.color,
      gradientTo: c.gradientTo,
      monthlyTotal: 0,
      txCount: 0,
      transactions: [],
    }]);
    setShowAddCardModal(false);
  };

  return (
    <div className="space-y-3">
      {/* Shake animation */}
      <style>{`
        @keyframes card-shake {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-2deg); }
          75% { transform: rotate(2deg); }
        }
        .card-shaking { animation: card-shake 0.25s ease-in-out infinite; }
      `}</style>

      {/* Main 2-Column Layout */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3 lg:items-stretch" style={{ height: 'calc(100vh - 120px)' }}>
        
        {/* ─── Left Column: Card Display ─── */}
        <div className="bg-[var(--app-bg-main)] rounded-3xl border border-[var(--app-border)] p-5 flex flex-col relative overflow-hidden">
          {/* Background Decor */}
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-[var(--app-primary)]/5 rounded-full blur-2xl pointer-events-none" />
          
          {/* Header */}
          <div className="flex items-center justify-between mb-4 shrink-0">
            <h3 className="text-[14px] text-[var(--app-text-main)]" style={{ fontWeight: 600 }}>
              <Wallet className="w-3.5 h-3.5 inline mr-1.5 text-[var(--app-primary)]" strokeWidth={1.5} />
              나의 카드
            </h3>
            <button 
              className="text-[11px] font-bold text-[var(--app-primary)] px-2 py-1 rounded bg-[var(--app-primary)]/10 hover:bg-[var(--app-primary)]/20 transition-colors" 
              onClick={() => router.push("/ledger")}
            >
              가계부 보기
            </button>
          </div>

          {currentCard ? (
            <div className="flex-1 flex flex-col items-center min-h-0">
              {/* 이번달 총 지출 */}
              <div className="text-center mb-4 shrink-0">
                <span className="text-[11px] text-[#888] font-medium block mb-0.5">이번달 총 지출</span>
                <div className="text-[28px] text-[#222]" style={{ fontWeight: 800, fontFamily: "'Nunito', sans-serif" }}>
                  <span className="text-[18px] mr-0.5">₩</span>{currentCard.monthlyTotal.toLocaleString()}
                </div>
              </div>

              {/* 카드 실물 (세로, 실제 비율) */}
              <div className="flex-1 flex items-center justify-center w-full min-h-0 mb-3">
                <div
                  className={`relative rounded-2xl p-5 text-white overflow-hidden flex flex-col justify-between shadow-xl ${isDeleteMode ? 'card-shaking' : ''}`}
                  style={{
                    background: `linear-gradient(160deg, ${currentCard.color}, ${currentCard.gradientTo})`,
                    width: '200px',
                    height: '318px',
                    maxHeight: '100%',
                  }}
                >
                  {/* Delete X */}
                  {isDeleteMode && (
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDeleteCard(currentCard.id); }}
                      className="absolute -top-0 -right-0 w-7 h-7 bg-[#EF4444] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#DC2626] z-20 m-1.5"
                    >
                      <X className="w-4 h-4" strokeWidth={2.5} />
                    </button>
                  )}

                  {/* Decorative Circles */}
                  <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/4" />
                  <div className="absolute bottom-0 left-0 w-28 h-28 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4" />

                  {/* Card Company */}
                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-[14px] font-bold opacity-95">{currentCard.company}</span>
                    <CreditCard className="w-5 h-5 opacity-60" strokeWidth={1.5} />
                  </div>

                  {/* IC chip */}
                  <div className="relative z-10 my-4">
                    <div className="w-10 h-7 rounded-md bg-gradient-to-br from-[#FFD700]/80 to-[#DAA520]/80 shadow-inner" />
                  </div>

                  {/* Card Number */}
                  <div className="relative z-10">
                    <div className="text-[13px] tracking-[2px] opacity-90 mb-6" style={{ fontFamily: "'Nunito', monospace" }}>
                      {currentCard.number}
                    </div>
                  </div>

                  {/* Card Info */}
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
                  {cards.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentCardIdx(i)}
                      className={`h-2 rounded-full transition-all ${i === currentCardIdx ? 'bg-[var(--app-primary)] w-5' : 'bg-[#D9C8B4] w-2'}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setCurrentCardIdx(Math.min(cards.length - 1, currentCardIdx + 1))}
                  disabled={currentCardIdx === cards.length - 1}
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
                onClick={() => setShowAddCardModal(true)}
                className="px-5 py-2 text-[13px] font-bold text-white rounded-full hover:opacity-90 transition-opacity active:scale-95"
                style={{ background: "linear-gradient(135deg, var(--app-primary), var(--app-primary-dark))" }}
              >
                카드 등록하기
              </button>
            </div>
          )}
        </div>

        {/* ─── Right Column: Card Management + Transactions ─── */}
        <div className="flex flex-col gap-3 h-full min-h-0">

          {/* 카드 관리 (추가/삭제) */}
          <div className="bg-[var(--app-bg-main)] rounded-3xl border border-[var(--app-border)] p-4 shrink-0">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[14px] text-[var(--app-text-main)]" style={{ fontWeight: 600 }}>
                <CreditCard className="w-3.5 h-3.5 inline mr-1.5 text-[var(--app-primary)]" strokeWidth={1.5} />
                카드 관리
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowAddCardModal(true)}
                  className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-white rounded-lg hover:opacity-90 transition-opacity active:scale-95"
                  style={{ background: "linear-gradient(135deg, var(--app-primary), var(--app-primary-dark))" }}
                >
                  <Plus className="w-3 h-3" strokeWidth={2.5} /> 추가
                </button>
                {cards.length > 0 && (
                  <button
                    onClick={() => setIsDeleteMode(!isDeleteMode)}
                    className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all active:scale-95 ${
                      isDeleteMode ? "bg-[#EF4444] text-white" : "border border-[#EF4444]/30 text-[#EF4444] hover:bg-[#FFF0F0]"
                    }`}
                  >
                    <Trash2 className="w-3 h-3" strokeWidth={2.5} /> {isDeleteMode ? "완료" : "삭제"}
                  </button>
                )}
              </div>
            </div>

            {/* Card Chips */}
            <div className="flex gap-2 flex-wrap">
              {cards.map((card, i) => (
                <button
                  key={card.id}
                  onClick={() => { setCurrentCardIdx(i); }}
                  className={`relative flex items-center gap-2 px-3 py-2 rounded-xl border transition-all ${
                    i === currentCardIdx
                      ? 'border-[var(--app-primary)] bg-[var(--app-primary)]/5 shadow-sm'
                      : 'border-[var(--app-border)] bg-white hover:border-[var(--app-primary)]/40'
                  } ${isDeleteMode ? 'card-shaking' : ''}`}
                >
                  {isDeleteMode && (
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDeleteCard(card.id); }}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#EF4444] text-white rounded-full flex items-center justify-center shadow-md hover:bg-[#DC2626] z-10"
                    >
                      <X className="w-3 h-3" strokeWidth={2.5} />
                    </button>
                  )}
                  <div className="w-5 h-5 rounded flex items-center justify-center shrink-0" style={{ backgroundColor: card.color + '20' }}>
                    <CreditCard className="w-3 h-3" style={{ color: card.color }} strokeWidth={1.5} />
                  </div>
                  <span className="text-[12px] font-medium text-[var(--app-text-main)]">{card.alias}</span>
                </button>
              ))}
              {cards.length === 0 && (
                <span className="text-[12px] text-[var(--app-text-tertiary)]">등록된 카드가 없습니다. 카드를 추가해주세요.</span>
              )}
            </div>
          </div>
          
          {/* 거래 내역 */}
          <div className="bg-[var(--app-bg-main)] rounded-3xl border border-[var(--app-border)] p-4 flex-1 flex flex-col min-h-0 overflow-hidden">
            <div className="flex items-center justify-between mb-3 shrink-0">
              <h3 className="text-[14px] text-[var(--app-text-main)]" style={{ fontWeight: 600 }}>
                <CreditCard className="w-3.5 h-3.5 inline mr-1.5 text-[var(--app-primary)]" strokeWidth={1.5} />
                {currentCard ? `${currentCard.alias} 거래 내역` : "거래 내역"}
              </h3>
              {currentCard && (
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--app-primary)]/10 text-[var(--app-primary)] font-bold">
                  {currentCard.txCount}건 · ₩{currentCard.monthlyTotal.toLocaleString()}
                </span>
              )}
            </div>

            {currentCard && currentCard.transactions.length > 0 ? (
              <div className="flex-1 overflow-y-auto space-y-2 pr-1" style={{ scrollbarWidth: 'thin' }}>
                {currentCard.transactions.map((tx, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-[#FAFAFA] rounded-2xl border border-[var(--app-border)]/30 hover:border-[var(--app-primary)]/20 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: (currentCard.color) + '15' }}>
                        <CreditCard className="w-4 h-4" style={{ color: currentCard.color }} strokeWidth={1.5} />
                      </div>
                      <div>
                        <div className="text-[13px] text-[var(--app-text-main)] font-medium">{tx.desc}</div>
                        <div className="text-[11px] text-[var(--app-text-tertiary)]">{tx.date} · {tx.category}</div>
                      </div>
                    </div>
                    <span className="text-[13px] text-[#E07C6A] font-bold shrink-0" style={{ fontFamily: "'Nunito', sans-serif" }}>
                      -₩{tx.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-2">
                <CreditCard className="w-8 h-8 text-[var(--app-text-tertiary)]" strokeWidth={1.2} />
                <span className="text-[13px] text-[var(--app-text-tertiary)]">거래 내역이 없습니다</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── Add Card Modal ─── */}
      {showAddCardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={(e) => e.target === e.currentTarget && setShowAddCardModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-xl">
            <button className="absolute top-4 right-4 text-[#AAA] hover:text-[#333] transition-colors" onClick={() => setShowAddCardModal(false)}>
              <X className="w-5 h-5" strokeWidth={2} />
            </button>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[var(--app-primary)]/10 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-[var(--app-primary)]" />
              </div>
              <div>
                <h3 className="text-[18px] font-bold text-[var(--app-text-main)]">카드 등록</h3>
                <p className="text-[12px] text-[var(--app-text-tertiary)]">결제 카드 정보를 입력해주세요</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-[13px] text-[#333] mb-1 block font-semibold">카드 번호</label>
                <input placeholder="0000-0000-0000-0000" className="w-full border border-[#E8E8E8] rounded-xl px-3 py-2.5 bg-white text-[14px] outline-none placeholder:text-[#AAA] focus:border-[var(--app-primary)] tracking-widest" style={{ fontFamily: "'Nunito', monospace" }} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[13px] text-[#333] mb-1 block font-semibold">유효 기간</label>
                  <input placeholder="MM/YY" className="w-full border border-[#E8E8E8] rounded-xl px-3 py-2.5 bg-white text-[14px] outline-none placeholder:text-[#AAA] focus:border-[var(--app-primary)]" style={{ fontFamily: "'Nunito', monospace" }} />
                </div>
                <div>
                  <label className="text-[13px] text-[#333] mb-1 block font-semibold">CVC</label>
                  <input placeholder="000" type="password" maxLength={3} className="w-full border border-[#E8E8E8] rounded-xl px-3 py-2.5 bg-white text-[14px] outline-none placeholder:text-[#AAA] focus:border-[var(--app-primary)]" style={{ fontFamily: "'Nunito', monospace" }} />
                </div>
              </div>
              <div>
                <label className="text-[13px] text-[#333] mb-1 block font-semibold">카드 별칭</label>
                <input placeholder="예: 토스 체크카드" className="w-full border border-[#E8E8E8] rounded-xl px-3 py-2.5 bg-white text-[14px] outline-none placeholder:text-[#AAA] focus:border-[var(--app-primary)]" />
              </div>
              <div>
                <label className="text-[13px] text-[#333] mb-1 block font-semibold">카드사</label>
                <select className="w-full border border-[#E8E8E8] rounded-xl px-3 py-2.5 bg-white text-[14px] outline-none focus:border-[var(--app-primary)]">
                  <option>선택해주세요</option>
                  <option>토스뱅크</option>
                  <option>삼성카드</option>
                  <option>현대카드</option>
                  <option>KB국민카드</option>
                  <option>신한카드</option>
                  <option>우리카드</option>
                  <option>하나카드</option>
                  <option>카카오뱅크</option>
                </select>
              </div>
            </div>
            <button
              className="w-full mt-6 py-3 text-white rounded-xl text-[14px] font-bold hover:opacity-90 active:scale-[0.98] transition-all"
              style={{ background: "linear-gradient(135deg, var(--app-primary), var(--app-primary-dark))", boxShadow: "0 4px 12px rgba(245,158,11,0.3)" }}
              onClick={handleAddCard}
            >
              카드 등록하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
