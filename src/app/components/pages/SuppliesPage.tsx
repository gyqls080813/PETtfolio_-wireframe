import { useState } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  ExternalLink,
  Bell,
  ShoppingCart,
  Dog,
  Cat,
  Package,
  AlertCircle,
} from "lucide-react";

const supplies = [
  {
    id: 1,
    name: "오리젠 퍼피 사료 11.4kg",
    category: "사료",
    price: 89000,
    pet: "초코",
    petIcon: Dog,
    url: "https://example.com",
    lastPurchase: "2026-02-10",
    cycle: 30,
    daysLeft: 6,
  },
  {
    id: 2,
    name: "져키 간식 (소고기)",
    category: "간식",
    price: 12500,
    pet: "초코",
    petIcon: Dog,
    url: "https://example.com",
    lastPurchase: "2026-02-20",
    cycle: 14,
    daysLeft: -2,
  },
  {
    id: 3,
    name: "로얄캐닌 인도어 4kg",
    category: "사료",
    price: 45000,
    pet: "나비",
    petIcon: Cat,
    url: "https://example.com",
    lastPurchase: "2026-02-15",
    cycle: 45,
    daysLeft: 26,
  },
  {
    id: 4,
    name: "관절 영양제 (조인트에이드)",
    category: "약/영양제",
    price: 35000,
    pet: "나비",
    petIcon: Cat,
    url: "https://example.com",
    lastPurchase: "2026-01-28",
    cycle: 60,
    daysLeft: 24,
  },
  {
    id: 5,
    name: "모래 (후드형)",
    category: "위생/소모품",
    price: 15000,
    pet: "나비",
    petIcon: Cat,
    url: "https://example.com",
    lastPurchase: "2026-02-25",
    cycle: 14,
    daysLeft: 7,
  },
];

export default function SuppliesPage() {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-end">
        <button
          className="flex items-center gap-1.5 px-3 py-2 text-white rounded-xl text-[13px] hover:opacity-90 transition-opacity active:scale-95"
          style={{ background: "linear-gradient(135deg, #D4A574, #C4956A)", fontWeight: 600 }}
          onClick={() => setShowAdd(!showAdd)}
        >
          <Plus className="w-4 h-4" />
          품목 추가
        </button>
      </div>



      {/* Add Form Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-xl">
            <button 
              className="absolute top-4 right-4 text-[#AAA] hover:text-[#333] transition-colors" 
              onClick={() => setShowAdd(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
            <h3 className="text-[18px] text-[#3D3229] mb-5" style={{ fontWeight: 700 }}>품목 추가</h3>
            <div className="space-y-4">
              <div>
                <label className="text-[13px] text-[#333] mb-1 block" style={{ fontWeight: 600 }}>품목 이름</label>
                <input placeholder="예: Royal Canin 사료" className="w-full border border-[#E8E8E8] rounded-xl px-3 py-2.5 bg-white text-[14px] outline-none placeholder:text-[#AAA] focus:border-[#D4A574]" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[13px] text-[#333] mb-1 block" style={{ fontWeight: 600 }}>카테고리</label>
                  <select className="w-full border border-[#E8E8E8] rounded-xl px-3 py-2.5 bg-white text-[14px] outline-none focus:border-[#D4A574]">
                    <option>사료</option>
                    <option>간식</option>
                    <option>위생/소모품</option>
                    <option>약/영양제</option>
                    <option>용품</option>
                    <option>기타</option>
                  </select>
                </div>
                <div>
                  <label className="text-[13px] text-[#333] mb-1 block" style={{ fontWeight: 600 }}>반려동물</label>
                  <select className="w-full border border-[#E8E8E8] rounded-xl px-3 py-2.5 bg-white text-[14px] outline-none focus:border-[#D4A574]">
                    <option>초코</option>
                    <option>나비</option>
                    <option>전체</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[13px] text-[#333] mb-1 block" style={{ fontWeight: 600 }}>금액</label>
                <div className="relative">
                  <input placeholder="0" className="w-full border border-[#E8E8E8] rounded-xl px-3 py-2.5 bg-white text-[14px] outline-none placeholder:text-[#AAA] focus:border-[#D4A574]" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] text-[14px]">원</span>
                </div>
              </div>
              <div>
                <label className="text-[13px] text-[#333] mb-1 block" style={{ fontWeight: 600 }}>구매 주기 (일)</label>
                <div className="relative">
                  <input type="number" placeholder="30" className="w-full border border-[#E8E8E8] rounded-xl px-3 py-2.5 bg-white text-[14px] outline-none placeholder:text-[#AAA] focus:border-[#D4A574]" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] text-[14px]">일마다</span>
                </div>
              </div>
              <div>
                <label className="text-[13px] text-[#333] mb-1 block" style={{ fontWeight: 600 }}>구매 URL (선택)</label>
                <input placeholder="https://..." className="w-full border border-[#E8E8E8] rounded-xl px-3 py-2.5 bg-white text-[14px] outline-none placeholder:text-[#AAA] focus:border-[#D4A574]" />
              </div>
            </div>
            <div className="mt-6">
              <button 
                className="w-full py-3 text-white rounded-xl text-[14px] hover:opacity-90 active:scale-95 transition-all" 
                style={{ background: "#E8A365", fontWeight: 600 }} 
                onClick={() => setShowAdd(false)}
              >
                품목 추가하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Supplies List */}
      <div className="bg-white rounded-2xl border border-[#E8D5C0] overflow-hidden">
        <div className="overflow-x-auto" style={{ maxHeight: "360px", overflowY: "auto" }}>
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[#FFF8EE] border-b border-[#E8D5C0] sticky top-0 z-10">
                <th className="text-left px-4 py-3 text-[#B4A08A]" style={{ fontWeight: 500 }}>품목</th>
                <th className="text-left px-4 py-3 text-[#B4A08A]" style={{ fontWeight: 500 }}>카테고리</th>
                <th className="text-left px-4 py-3 text-[#B4A08A]" style={{ fontWeight: 500 }}>대상</th>
                <th className="text-right px-4 py-3 text-[#B4A08A]" style={{ fontWeight: 500 }}>금액</th>
                <th className="text-center px-4 py-3 text-[#B4A08A]" style={{ fontWeight: 500 }}>주기</th>
                <th className="text-center px-4 py-3 text-[#B4A08A]" style={{ fontWeight: 500 }}>다음 구매</th>
                <th className="text-center px-4 py-3 text-[#B4A08A]" style={{ fontWeight: 500 }}>액션</th>
              </tr>
            </thead>
            <tbody>
              {supplies.map((s) => (
                <tr key={s.id} className="border-b border-[#E8D5C0] hover:bg-[#FFF8EE] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-[#AAA]" />
                      <span className="text-[#333]">{s.name}</span>
                      <div className="relative w-3.5 h-3.5 flex-shrink-0 ml-1" title={`소진율: ${Math.round(Math.min(100, Math.max(0, ((s.cycle - s.daysLeft) / s.cycle) * 100)))}%`}>
                        <svg viewBox="0 0 16 16" className="w-full h-full transform -rotate-90 rounded-full bg-[#F5F0E6]">
                          <circle
                            cx="8" cy="8" r="4"
                            fill="transparent"
                            stroke={s.daysLeft <= 0 ? "#FF6B6B" : s.daysLeft <= 7 ? "#E17055" : "#D4A574"}
                            strokeWidth="8"
                            strokeDasharray={`${(Math.min(100, Math.max(0, ((s.cycle - s.daysLeft) / s.cycle) * 100)) / 100) * 25.1327} 25.1327`}
                          />
                        </svg>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#666]">{s.category}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <s.petIcon className="w-3.5 h-3.5 text-[#888]" />
                      <span className="text-[#666]">{s.pet}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right text-[#5C4A3A]" style={{ fontWeight: 500, fontFamily: "'Nunito', sans-serif" }}>₩{s.price.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center text-[#888]">{s.cycle}일</td>
                  <td className="px-4 py-3 text-center">
                    {s.daysLeft <= 0 ? (
                      <span className="px-2 py-0.5 bg-[#FF6B6B]/10 text-[#FF6B6B] rounded text-[11px]" style={{ fontWeight: 500 }}>
                        {Math.abs(s.daysLeft)}일 초과
                      </span>
                    ) : s.daysLeft <= 7 ? (
                      <span className="px-2 py-0.5 bg-[#FDCB6E]/20 text-[#E17055] rounded text-[11px]" style={{ fontWeight: 500 }}>
                        {s.daysLeft}일 남음
                      </span>
                    ) : (
                      <span className="text-[#888]">{s.daysLeft}일 남음</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1.5">
                      {s.daysLeft <= 7 && (
                        <button 
                          className="flex items-center gap-1 px-2.5 py-1 text-white rounded text-[11px] transition-colors shadow-sm" 
                          style={{ backgroundColor: s.daysLeft <= 0 ? "#FF6B6B" : "#E17055" }} 
                          title="바로 구매"
                        >
                          <ShoppingCart className="w-3 h-3" /> 구매
                        </button>
                      )}
                      <button className="p-1.5 rounded hover:bg-[#F5E6D0] transition-colors" title="구매 링크">
                        <ExternalLink className="w-3.5 h-3.5 text-[#6B4F3A]" strokeWidth={1.5} />
                      </button>
                      <button className="p-1.5 rounded hover:bg-[#F5EDDF] transition-colors" title="수정">
                        <Edit3 className="w-3.5 h-3.5 text-[#888]" />
                      </button>
                      <button className="p-1.5 rounded hover:bg-[#FFF0F0] transition-colors" title="삭제">
                        <Trash2 className="w-3.5 h-3.5 text-[#FF6B6B]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}