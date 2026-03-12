"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  User,
  Dog,
  Cat,
  Users,
  LogOut,
  Trash2,
  Lock,
  Edit3,
  Copy,
  Crown,
  UserMinus,
  UserPlus,
  ChevronRight,
  ChevronDown,
  Plus,
  Camera,
  Shield,
  Heart,
  CreditCard,
  X,
} from "lucide-react";

interface CardInfo {
  id: number;
  alias: string;
  number: string;
  company: string;
  expiry: string;
  color: string;
}

const initialCards: CardInfo[] = [
  { id: 1, alias: "토스 체크카드", number: "****-****-****-1234", company: "토스뱅크", expiry: "12/28", color: "#3182F6" },
  { id: 2, alias: "삼성카드", number: "****-****-****-5678", company: "삼성카드", expiry: "06/27", color: "#1428A0" },
];

const pets = [
  {
    id: 1,
    name: "초코",
    type: "dog",
    breed: "말티즈",
    birth: "2023-05-15",
    gender: "수컷",
    weight: 4.2,
    neutered: true,
    vaccinated: true,
    diseases: ["슬개골 탈구 주의"],
  },
  {
    id: 2,
    name: "나비",
    type: "cat",
    breed: "코리안숏헤어",
    birth: "2024-01-10",
    gender: "암컷",
    weight: 3.8,
    neutered: true,
    vaccinated: false,
    diseases: [],
  },
];

const groupMembers = [
  { name: "김집사", role: "host", email: "kim@example.com" },
  { name: "이집사", role: "guest", email: "lee@example.com" },
];

export default function MyPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"account" | "pets" | "group">("account");
  const [selectedPet, setSelectedPet] = useState<number | null>(null);
  const [showAddPet, setShowAddPet] = useState(false);
  const [showEditPet, setShowEditPet] = useState(false);

  // Card management states
  const [cards, setCards] = useState<CardInfo[]>(initialCards);
  const [showCardSection, setShowCardSection] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const handleDeleteCard = (cardId: number) => {
    setCards(prev => prev.filter(c => c.id !== cardId));
    if (cards.length <= 1) setIsDeleteMode(false);
  };

  const handleAddCard = () => {
    const newId = cards.length > 0 ? Math.max(...cards.map(c => c.id)) + 1 : 1;
    const colors = ["#FF6B35", "#7C3AED", "#059669", "#DC2626", "#0891B2"];
    setCards(prev => [...prev, {
      id: newId,
      alias: "새 카드",
      number: `****-****-****-${String(Math.floor(1000 + Math.random() * 9000))}`,
      company: "카드사",
      expiry: "01/29",
      color: colors[newId % colors.length],
    }]);
    setShowAddCard(false);
  };

  return (
    <div className="space-y-5">
      {/* Shake animation style */}
      <style>{`
        @keyframes card-shake {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-1.5deg); }
          75% { transform: rotate(1.5deg); }
        }
        .card-shaking { animation: card-shake 0.3s ease-in-out infinite; }
      `}</style>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-[var(--app-border)] p-5 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, var(--app-primary), var(--app-primary-dark))" }}>
          <User className="w-7 h-7 text-white" strokeWidth={1.5} />
        </div>
        <div>
          <div className="text-[18px] text-[var(--app-text-main)]" style={{ fontWeight: 600 }}>김집사</div>
          <div className="text-[13px] text-[var(--app-text-tertiary)]">kim@example.com</div>
          <div className="flex items-center gap-1 mt-1">
            <Crown className="w-3.5 h-3.5 text-[#FDCB6E]" strokeWidth={1.5} />
            <span className="text-[12px] text-[var(--app-warning)]">호스트</span>
            <span className="text-[12px] text-[var(--app-text-tertiary)] ml-2">초코네 가족</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#F5EDDF] rounded-xl p-1">
        {[
          { key: "account" as const, label: "계정 관리", icon: Shield },
          { key: "pets" as const, label: "반려동물 관리", icon: Heart },
          { key: "group" as const, label: "그룹 관리", icon: Users },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => { setTab(t.key); setSelectedPet(null); }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[13px] transition-all ${tab === t.key ? "bg-white text-[#6B4F3A] shadow-sm" : "text-[var(--app-text-tertiary)]"
              }`}
            style={{ fontWeight: tab === t.key ? 600 : 400 }}
          >
            <t.icon className="w-4 h-4" strokeWidth={1.5} />
            {t.label}
          </button>
        ))}
      </div>

      {/* Account Management */}
      {tab === "account" && (
        <div className="bg-white rounded-2xl border border-[var(--app-border)] divide-y divide-[var(--app-border)]">
          {/* 거래 카드 관리 */}
          <div>
            <button
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-[var(--app-bg-main)] transition-colors"
              onClick={() => { setShowCardSection(!showCardSection); setIsDeleteMode(false); }}
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-[var(--app-primary)]" strokeWidth={1.5} />
                <span className="text-[14px] text-[var(--app-text-secondary)]" style={{ fontWeight: 500 }}>거래 카드 관리</span>
                <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-[var(--app-primary)]/10 text-[var(--app-primary)] font-bold">{cards.length}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-[#D9C8B4] transition-transform duration-200 ${showCardSection ? 'rotate-180' : ''}`} strokeWidth={1.5} />
            </button>

            {/* Expandable Card List */}
            {showCardSection && (
              <div className="px-5 pb-4 space-y-3">
                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowAddCard(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-bold text-white rounded-lg hover:opacity-90 transition-opacity active:scale-95"
                    style={{ background: "linear-gradient(135deg, var(--app-primary), var(--app-primary-dark))" }}
                  >
                    <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                    추가
                  </button>
                  <button
                    onClick={() => setIsDeleteMode(!isDeleteMode)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-bold rounded-lg transition-all active:scale-95 ${
                      isDeleteMode
                        ? "bg-[#EF4444] text-white"
                        : "border border-[#EF4444]/30 text-[#EF4444] hover:bg-[#FFF0F0]"
                    }`}
                  >
                    <Trash2 className="w-3.5 h-3.5" strokeWidth={2} />
                    {isDeleteMode ? "완료" : "삭제"}
                  </button>
                </div>

                {/* Card Items */}
                {cards.length === 0 ? (
                  <div className="py-6 text-center text-[13px] text-[var(--app-text-tertiary)]">
                    등록된 카드가 없습니다
                  </div>
                ) : (
                  <div className="space-y-2">
                    {cards.map((card) => (
                      <div
                        key={card.id}
                        className={`relative flex items-center gap-3 p-3 rounded-xl border border-[var(--app-border)] bg-[var(--app-bg-main)] ${isDeleteMode ? 'card-shaking' : ''}`}
                      >
                        {/* Delete X button */}
                        {isDeleteMode && (
                          <button
                            onClick={() => handleDeleteCard(card.id)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-[#EF4444] text-white rounded-full flex items-center justify-center shadow-md hover:bg-[#DC2626] transition-colors z-10"
                          >
                            <X className="w-3.5 h-3.5" strokeWidth={2.5} />
                          </button>
                        )}

                        {/* Card Color Indicator */}
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: card.color + "20" }}
                        >
                          <CreditCard className="w-5 h-5" style={{ color: card.color }} strokeWidth={1.5} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="text-[13px] text-[var(--app-text-main)] truncate" style={{ fontWeight: 600 }}>
                            {card.alias}
                          </div>
                          <div className="text-[11px] text-[var(--app-text-tertiary)]">
                            {card.company} · {card.number.slice(-4)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <button className="w-full flex items-center justify-between px-5 py-4 hover:bg-[var(--app-bg-main)] transition-colors">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-[var(--app-text-tertiary)]" strokeWidth={1.5} />
              <span className="text-[14px] text-[var(--app-text-secondary)]">비밀번호 변경</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#D9C8B4]" strokeWidth={1.5} />
          </button>
          <button
            className="w-full flex items-center justify-between px-5 py-4 hover:bg-[var(--app-bg-main)] transition-colors"
            onClick={() => router.push("/login")}
          >
            <div className="flex items-center gap-3">
              <LogOut className="w-5 h-5 text-[var(--app-text-tertiary)]" strokeWidth={1.5} />
              <span className="text-[14px] text-[var(--app-text-secondary)]">로그아웃</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#D9C8B4]" strokeWidth={1.5} />
          </button>
          <button className="w-full flex items-center justify-between px-5 py-4 hover:bg-[#FFF0F0] transition-colors">
            <div className="flex items-center gap-3">
              <Trash2 className="w-5 h-5 text-[#EF4444]" strokeWidth={1.5} />
              <span className="text-[14px] text-[#EF4444]">회원 탈퇴</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#D9C8B4]" strokeWidth={1.5} />
          </button>
        </div>
      )}

      {/* Add Card Modal */}
      {showAddCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={(e) => e.target === e.currentTarget && setShowAddCard(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-xl">
            <button className="absolute top-4 right-4 text-[#AAA] hover:text-[#333] transition-colors" onClick={() => setShowAddCard(false)}>
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

      {/* Pet Management */}
      {tab === "pets" && selectedPet === null && (
        <div className="space-y-3">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="bg-white rounded-2xl border border-[var(--app-border)] p-4 flex items-center justify-between cursor-pointer hover:shadow-sm transition-shadow"
              onClick={() => setSelectedPet(pet.id)}
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${pet.type === "dog" ? "bg-[var(--app-warning)]/10" : "bg-[#FDCB6E]/10"}`}>
                  {pet.type === "dog" ? (
                    <Dog className="w-6 h-6 text-[var(--app-warning)]" strokeWidth={1.5} />
                  ) : (
                    <Cat className="w-6 h-6 text-[#FDCB6E]" strokeWidth={1.5} />
                  )}
                </div>
                <div>
                  <div className="text-[15px] text-[var(--app-text-main)]" style={{ fontWeight: 600 }}>{pet.name}</div>
                  <div className="text-[12px] text-[var(--app-text-tertiary)]">{pet.breed} · {pet.gender} · {pet.weight}kg</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#D9C8B4]" strokeWidth={1.5} />
            </div>
          ))}
          <button
            className="w-full bg-white rounded-2xl border-2 border-dashed border-[var(--app-border)] p-4 flex items-center justify-center gap-2 text-[14px] text-[var(--app-text-tertiary)] hover:border-[var(--app-primary)] hover:text-[#6B4F3A] transition-colors"
            onClick={() => setShowAddPet(true)}
          >
            <Plus className="w-5 h-5" strokeWidth={1.5} />
            반려동물 추가
          </button>
        </div>
      )}

      {/* Add Pet Modal */}
      {showAddPet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-xl">
            <button
              className="absolute top-4 right-4 text-[#AAA] hover:text-[#333] transition-colors"
              onClick={() => setShowAddPet(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </button>
            <h3 className="text-[18px] text-[var(--app-text-main)] mb-5" style={{ fontWeight: 700 }}>반려동물 추가</h3>
            <div className="space-y-4">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 rounded-full bg-[#F5EDDF] flex items-center justify-center relative cursor-pointer hover:bg-[var(--app-border)] transition-colors">
                  <Camera className="w-8 h-8 text-[var(--app-text-tertiary)]" strokeWidth={1.5} />
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-white border border-[var(--app-border)] rounded-full flex items-center justify-center shadow-sm">
                    <Plus className="w-4 h-4 text-[#6B4F3A]" strokeWidth={2} />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="text-[13px] text-[#333] mb-1 block" style={{ fontWeight: 600 }}>이름</label>
                  <input placeholder="반려동물 이름" className="w-full border border-[#E8E8E8] rounded-xl px-3 py-2.5 bg-white text-[14px] outline-none placeholder:text-[#AAA] focus:border-[var(--app-primary)]" />
                </div>
                <div>
                  <label className="text-[13px] text-[#333] mb-1 block" style={{ fontWeight: 600 }}>종류</label>
                  <select className="w-full border border-[#E8E8E8] rounded-xl px-3 py-2.5 bg-white text-[14px] outline-none focus:border-[var(--app-primary)]">
                    <option>강아지</option>
                    <option>고양이</option>
                    <option>기타</option>
                  </select>
                </div>
                <div>
                  <label className="text-[13px] text-[#333] mb-1 block" style={{ fontWeight: 600 }}>품종</label>
                  <input placeholder="예: 말티즈" className="w-full border border-[#E8E8E8] rounded-xl px-3 py-2.5 bg-white text-[14px] outline-none placeholder:text-[#AAA] focus:border-[var(--app-primary)]" />
                </div>
                <div>
                  <label className="text-[13px] text-[#333] mb-1 block" style={{ fontWeight: 600 }}>생년월일</label>
                  <input type="date" className="w-full border border-[#E8E8E8] rounded-xl px-3 py-2.5 bg-white text-[14px] outline-none focus:border-[var(--app-primary)] text-[#333]" />
                </div>
                <div>
                  <label className="text-[13px] text-[#333] mb-1 block" style={{ fontWeight: 600 }}>몸무게 (kg)</label>
                  <input type="number" step="0.1" placeholder="0.0" className="w-full border border-[#E8E8E8] rounded-xl px-3 py-2.5 bg-white text-[14px] outline-none placeholder:text-[#AAA] focus:border-[var(--app-primary)]" />
                </div>
                <div className="col-span-2">
                  <label className="text-[13px] text-[#333] mb-1 block" style={{ fontWeight: 600 }}>특이사항 (선택)</label>
                  <textarea placeholder="보유 질환 등 건강 특이사항을 적어주세요" className="w-full border border-[#E8E8E8] rounded-xl px-3 py-2.5 bg-white text-[14px] outline-none placeholder:text-[#AAA] focus:border-[var(--app-primary)] h-20 resize-none"></textarea>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                className="flex-1 py-3 border border-[#E8E8E8] rounded-xl text-[14px] text-[#666] hover:bg-[#F9F9F9] transition-colors"
                onClick={() => setShowAddPet(false)}
              >
                취소
              </button>
              <button
                className="flex-1 py-3 text-white rounded-xl text-[14px] hover:opacity-90 active:scale-95 transition-all"
                style={{ background: "#E8A365", fontWeight: 600 }}
                onClick={() => setShowAddPet(false)}
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pet Detail */}
      {tab === "pets" && selectedPet !== null && (() => {
        const pet = pets.find((p) => p.id === selectedPet);
        if (!pet) return null;
        return (
          <div className="bg-white rounded-2xl border border-[var(--app-border)] p-5 space-y-4">
            <button className="text-[13px] text-[var(--app-text-tertiary)] hover:text-[var(--app-text-secondary)]" onClick={() => setSelectedPet(null)}>
              ← 목록으로
            </button>
            <div className="flex items-center gap-4">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center relative ${pet.type === "dog" ? "bg-[var(--app-warning)]/10" : "bg-[#FDCB6E]/10"}`}>
                {pet.type === "dog" ? (
                  <Dog className="w-10 h-10 text-[var(--app-warning)]" strokeWidth={1.5} />
                ) : (
                  <Cat className="w-10 h-10 text-[#FDCB6E]" strokeWidth={1.5} />
                )}
                <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-white border border-[var(--app-border)] rounded-full flex items-center justify-center">
                  <Camera className="w-3.5 h-3.5 text-[var(--app-text-tertiary)]" strokeWidth={1.5} />
                </button>
              </div>
              <div>
                <div className="text-[20px] text-[var(--app-text-main)]" style={{ fontWeight: 700 }}>{pet.name}</div>
                <div className="text-[13px] text-[var(--app-text-tertiary)]">{pet.breed}</div>
              </div>
              <div className="ml-auto flex gap-2">
                <button
                  className="flex items-center gap-1 px-3 py-1.5 border border-[var(--app-border)] rounded-xl text-[12px] text-[var(--app-text-sub)] hover:bg-[#F5EDDF] transition-colors"
                  onClick={() => setShowEditPet(true)}
                >
                  <Edit3 className="w-3.5 h-3.5" strokeWidth={1.5} /> 수정
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 border border-[#EF4444]/30 rounded-xl text-[12px] text-[#EF4444] hover:bg-[#FFF0F0] transition-colors">
                  <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} /> 삭제
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "생년월일", value: pet.birth },
                { label: "성별", value: pet.gender },
                { label: "몸무게", value: `${pet.weight}kg` },
                { label: "종", value: pet.type === "dog" ? "강아지" : "고양이" },
              ].map((item, i) => (
                <div key={i} className="p-3 bg-[var(--app-bg-main)] rounded-xl">
                  <div className="text-[11px] text-[var(--app-text-tertiary)]">{item.label}</div>
                  <div className="text-[14px] text-[var(--app-text-secondary)] mt-0.5" style={{ fontWeight: 500 }}>{item.value}</div>
                </div>
              ))}
            </div>

            <div>
              <h4 className="text-[14px] text-[var(--app-text-main)] mb-2" style={{ fontWeight: 600 }}>건강 특이사항</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-[var(--app-bg-main)] rounded-xl">
                  <span className="text-[13px] text-[var(--app-text-secondary)]">중성화</span>
                  <span className={`text-[13px] ${pet.neutered ? "text-[var(--app-success)]" : "text-[#EF4444]"}`} style={{ fontWeight: 500 }}>
                    {pet.neutered ? "완료" : "미완료"}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[var(--app-bg-main)] rounded-xl">
                  <span className="text-[13px] text-[var(--app-text-secondary)]">예방접종</span>
                  <span className={`text-[13px] ${pet.vaccinated ? "text-[var(--app-success)]" : "text-[#EF4444]"}`} style={{ fontWeight: 500 }}>
                    {pet.vaccinated ? "완료" : "미완료"}
                  </span>
                </div>
                <div className="p-3 bg-[var(--app-bg-main)] rounded-xl">
                  <span className="text-[13px] text-[var(--app-text-secondary)] block mb-1">보유 질환</span>
                  {pet.diseases.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {pet.diseases.map((d, i) => (
                        <span key={i} className="px-2 py-0.5 bg-[#EF4444]/10 text-[#EF4444] rounded text-[12px]">{d}</span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-[12px] text-[var(--app-text-tertiary)]">등록된 질환 없음</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Edit Pet Modal */}
      {showEditPet && selectedPet !== null && (() => {
        const pet = pets.find((p) => p.id === selectedPet);
        if (!pet) return null;
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-xl">
              <button
                className="absolute top-4 right-4 text-[#AAA] hover:text-[#333] transition-colors"
                onClick={() => setShowEditPet(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
              </button>
              <h3 className="text-[18px] text-[var(--app-text-main)] mb-5" style={{ fontWeight: 700 }}>반려동물 수정</h3>
              <div className="space-y-4">
                <div className="flex justify-center mb-6">
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center relative cursor-pointer hover:opacity-90 transition-opacity ${pet.type === "dog" ? "bg-[var(--app-warning)]/10" : "bg-[#FDCB6E]/10"}`}>
                    {pet.type === "dog" ? (
                      <Dog className="w-10 h-10 text-[var(--app-warning)]" strokeWidth={1.5} />
                    ) : (
                      <Cat className="w-10 h-10 text-[#FDCB6E]" strokeWidth={1.5} />
                    )}
                    <div className="absolute bottom-0 right-0 w-8 h-8 bg-white border border-[var(--app-border)] rounded-full flex items-center justify-center shadow-sm">
                      <Camera className="w-4 h-4 text-[#6B4F3A]" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className="text-[13px] text-[#333] mb-1 block" style={{ fontWeight: 600 }}>이름</label>
                    <input defaultValue={pet.name} placeholder="반려동물 이름" className="w-full border border-[#E8E8E8] rounded-xl px-3 py-2.5 bg-white text-[14px] outline-none placeholder:text-[#AAA] focus:border-[var(--app-primary)]" />
                  </div>
                  <div>
                    <label className="text-[13px] text-[#333] mb-1 block" style={{ fontWeight: 600 }}>종류</label>
                    <select defaultValue={pet.type === "dog" ? "강아지" : pet.type === "cat" ? "고양이" : "기타"} className="w-full border border-[#E8E8E8] rounded-xl px-3 py-2.5 bg-white text-[14px] outline-none focus:border-[var(--app-primary)]">
                      <option>강아지</option>
                      <option>고양이</option>
                      <option>기타</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[13px] text-[#333] mb-1 block" style={{ fontWeight: 600 }}>품종</label>
                    <input defaultValue={pet.breed} placeholder="예: 말티즈" className="w-full border border-[#E8E8E8] rounded-xl px-3 py-2.5 bg-white text-[14px] outline-none placeholder:text-[#AAA] focus:border-[var(--app-primary)]" />
                  </div>
                  <div>
                    <label className="text-[13px] text-[#333] mb-1 block" style={{ fontWeight: 600 }}>생년월일</label>
                    <input type="date" defaultValue={pet.birth} className="w-full border border-[#E8E8E8] rounded-xl px-3 py-2.5 bg-white text-[14px] outline-none focus:border-[var(--app-primary)] text-[#333]" />
                  </div>
                  <div>
                    <label className="text-[13px] text-[#333] mb-1 block" style={{ fontWeight: 600 }}>몸무게 (kg)</label>
                    <input type="number" step="0.1" defaultValue={pet.weight} placeholder="0.0" className="w-full border border-[#E8E8E8] rounded-xl px-3 py-2.5 bg-white text-[14px] outline-none placeholder:text-[#AAA] focus:border-[var(--app-primary)]" />
                  </div>
                  <div className="col-span-2">
                    <label className="text-[13px] text-[#333] mb-1 block" style={{ fontWeight: 600 }}>특이사항 (선택)</label>
                    <textarea defaultValue={pet.diseases.join(", ")} placeholder="보유 질환 등 건강 특이사항을 적어주세요" className="w-full border border-[#E8E8E8] rounded-xl px-3 py-2.5 bg-white text-[14px] outline-none placeholder:text-[#AAA] focus:border-[var(--app-primary)] h-20 resize-none"></textarea>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <button
                  className="flex-1 py-3 border border-[#E8E8E8] rounded-xl text-[14px] text-[#666] hover:bg-[#F9F9F9] transition-colors"
                  onClick={() => setShowEditPet(false)}
                >
                  취소
                </button>
                <button
                  className="flex-1 py-3 text-white rounded-xl text-[14px] hover:opacity-90 active:scale-95 transition-all"
                  style={{ background: "#E8A365", fontWeight: 600 }}
                  onClick={() => setShowEditPet(false)}
                >
                  수정 완료
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Group Management */}
      {tab === "group" && (
        <div className="space-y-4">
          {/* Invite Code */}
          <div className="bg-white rounded-2xl border border-[var(--app-border)] p-5">
            <h3 className="text-[15px] text-[var(--app-text-main)] mb-3" style={{ fontWeight: 600 }}>초대 코드</h3>
            <div className="flex items-center gap-2">
              <div className="flex-1 px-4 py-3 bg-[var(--app-bg-main)] border border-[var(--app-border)] rounded-xl text-[16px] text-[var(--app-text-secondary)] tracking-widest" style={{ fontWeight: 600, fontFamily: "monospace" }}>
                AX7K-M2PQ
              </div>
              <button className="p-3 bg-[var(--app-primary-light)] text-[#6B4F3A] rounded-xl hover:bg-[var(--app-border)] transition-colors">
                <Copy className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>
            <p className="text-[11px] text-[var(--app-text-tertiary)] mt-2">이 코드를 공유하여 그룹에 구성원을 초대하세요</p>
          </div>

          {/* Members */}
          <div className="bg-white rounded-2xl border border-[var(--app-border)] p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[15px] text-[var(--app-text-main)]" style={{ fontWeight: 600 }}>그룹 구성원</h3>
              <span className="text-[12px] text-[var(--app-text-tertiary)]">초코네 가족</span>
            </div>
            <div className="space-y-2">
              {groupMembers.map((m, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-[var(--app-bg-main)] rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[var(--app-primary-light)] flex items-center justify-center">
                      <User className="w-4 h-4 text-[#6B4F3A]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[14px] text-[var(--app-text-secondary)]" style={{ fontWeight: 500 }}>{m.name}</span>
                        {m.role === "host" && <Crown className="w-3.5 h-3.5 text-[#FDCB6E]" strokeWidth={1.5} />}
                      </div>
                      <div className="text-[11px] text-[var(--app-text-tertiary)]">{m.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {m.role === "host" ? (
                      <span className="px-2 py-0.5 bg-[var(--app-primary-light)] text-[#6B4F3A] rounded text-[11px]">호스트</span>
                    ) : (
                      <>
                        <button className="p-1.5 rounded hover:bg-white transition-colors" title="호스트 변경">
                          <Crown className="w-3.5 h-3.5 text-[#D9C8B4]" strokeWidth={1.5} />
                        </button>
                        <button className="p-1.5 rounded hover:bg-[#FFF0F0] transition-colors" title="내보내기">
                          <UserMinus className="w-3.5 h-3.5 text-[#EF4444]" strokeWidth={1.5} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Requests */}
          <div className="bg-white rounded-2xl border border-[var(--app-border)] p-5">
            <h3 className="text-[15px] text-[var(--app-text-main)] mb-3" style={{ fontWeight: 600 }}>가입 대기</h3>
            <div className="flex items-center justify-between p-3 bg-[var(--app-bg-main)] rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#F5EDDF] flex items-center justify-center">
                  <UserPlus className="w-4 h-4 text-[var(--app-text-tertiary)]" strokeWidth={1.5} />
                </div>
                <div>
                  <span className="text-[14px] text-[var(--app-text-secondary)]">박집사</span>
                  <div className="text-[11px] text-[var(--app-text-tertiary)]">park@example.com</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1.5 text-white rounded-xl text-[12px] hover:opacity-90 active:scale-95 transition-all"
                  style={{ background: "linear-gradient(135deg, var(--app-primary), var(--app-primary-dark))", fontWeight: 600 }}
                >수락</button>
                <button className="px-3 py-1.5 border border-[var(--app-border)] text-[var(--app-text-tertiary)] rounded-xl text-[12px]">거절</button>
              </div>
            </div>
          </div>

          {/* Leave Group */}
          <div className="bg-white rounded-2xl border border-[var(--app-border)] p-5">
            <button className="flex items-center gap-2 text-[14px] text-[#EF4444]">
              <LogOut className="w-4 h-4" strokeWidth={1.5} />
              그룹 탈퇴
            </button>
            <p className="text-[11px] text-[var(--app-text-tertiary)] mt-1 ml-6">
              호스트는 구성원이 본인뿐일 때만 탈퇴 가능하며, 탈퇴 시 그룹이 삭제됩니다.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}