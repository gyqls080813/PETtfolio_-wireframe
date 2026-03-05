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

  const overdue = supplies.filter((s) => s.daysLeft <= 0);
  const upcoming = supplies.filter((s) => s.daysLeft > 0 && s.daysLeft <= 7);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-end">
        <button
          className="flex items-center gap-1.5 px-3 py-2 bg-[#6C5CE7] text-white rounded-lg text-[13px] hover:bg-[#5A4BD1] transition-colors"
          onClick={() => setShowAdd(!showAdd)}
        >
          <Plus className="w-4 h-4" />
          품목 추가
        </button>
      </div>

      {/* Alerts */}
      {(overdue.length > 0 || upcoming.length > 0) && (
        <div className="space-y-2">
          {overdue.map((s) => (
            <div key={s.id} className="flex items-center justify-between p-3 bg-[#FF6B6B]/5 border border-[#FF6B6B]/20 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#FF6B6B]" />
                <span className="text-[13px] text-[#FF6B6B]" style={{ fontWeight: 500 }}>
                  {s.name} 구매 기한이 {Math.abs(s.daysLeft)}일 지났어요!
                </span>
              </div>
              <button className="flex items-center gap-1 px-2.5 py-1 bg-[#FF6B6B] text-white rounded text-[11px]">
                <ShoppingCart className="w-3 h-3" /> 구매
              </button>
            </div>
          ))}
          {upcoming.map((s) => (
            <div key={s.id} className="flex items-center justify-between p-3 bg-[#FDCB6E]/10 border border-[#FDCB6E]/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#E17055]" />
                <span className="text-[13px] text-[#E17055]" style={{ fontWeight: 500 }}>
                  {s.name} 구매까지 {s.daysLeft}일 남았어요
                </span>
              </div>
              <button className="flex items-center gap-1 px-2.5 py-1 bg-[#E17055] text-white rounded text-[11px]">
                <ShoppingCart className="w-3 h-3" /> 구매
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add Form */}
      {showAdd && (
        <div className="bg-white rounded-xl border border-[#E0E0E0] p-5 space-y-3">
          <h3 className="text-[16px] text-[#222]" style={{ fontWeight: 600 }}>품목 추가</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div>
              <label className="text-[13px] text-[#666] mb-1 block">카테고리</label>
              <select className="w-full border border-[#DDD] rounded-lg px-3 py-2.5 bg-[#FAFAFA] text-[14px] outline-none appearance-none">
                <option>사료</option>
                <option>간식</option>
                <option>위생/소모품</option>
                <option>약/영양제</option>
                <option>용품</option>
                <option>기타</option>
              </select>
            </div>
            <div>
              <label className="text-[13px] text-[#666] mb-1 block">품목명</label>
              <input placeholder="품목 이름" className="w-full border border-[#DDD] rounded-lg px-3 py-2.5 bg-[#FAFAFA] text-[14px] outline-none placeholder:text-[#CCC]" />
            </div>
            <div>
              <label className="text-[13px] text-[#666] mb-1 block">금액</label>
              <input placeholder="₩ 0" className="w-full border border-[#DDD] rounded-lg px-3 py-2.5 bg-[#FAFAFA] text-[14px] outline-none placeholder:text-[#CCC]" />
            </div>
            <div>
              <label className="text-[13px] text-[#666] mb-1 block">대상 (태그)</label>
              <select className="w-full border border-[#DDD] rounded-lg px-3 py-2.5 bg-[#FAFAFA] text-[14px] outline-none appearance-none">
                <option>초코</option>
                <option>나비</option>
                <option>전체</option>
              </select>
            </div>
            <div>
              <label className="text-[13px] text-[#666] mb-1 block">구매 URL</label>
              <input placeholder="https://" className="w-full border border-[#DDD] rounded-lg px-3 py-2.5 bg-[#FAFAFA] text-[14px] outline-none placeholder:text-[#CCC]" />
            </div>
            <div>
              <label className="text-[13px] text-[#666] mb-1 block">구매 주기 (일)</label>
              <input type="number" placeholder="30" className="w-full border border-[#DDD] rounded-lg px-3 py-2.5 bg-[#FAFAFA] text-[14px] outline-none placeholder:text-[#CCC]" />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button className="px-4 py-2 border border-[#DDD] rounded-lg text-[13px] text-[#666]" onClick={() => setShowAdd(false)}>취소</button>
            <button className="px-4 py-2 bg-[#6C5CE7] text-white rounded-lg text-[13px]" onClick={() => setShowAdd(false)}>추가</button>
          </div>
        </div>
      )}

      {/* Supplies List */}
      <div className="bg-white rounded-xl border border-[#E0E0E0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[#FAFAFA] border-b border-[#EEE]">
                <th className="text-left px-4 py-3 text-[#888]" style={{ fontWeight: 500 }}>품목</th>
                <th className="text-left px-4 py-3 text-[#888]" style={{ fontWeight: 500 }}>카테고리</th>
                <th className="text-left px-4 py-3 text-[#888]" style={{ fontWeight: 500 }}>대상</th>
                <th className="text-right px-4 py-3 text-[#888]" style={{ fontWeight: 500 }}>금액</th>
                <th className="text-center px-4 py-3 text-[#888]" style={{ fontWeight: 500 }}>주기</th>
                <th className="text-center px-4 py-3 text-[#888]" style={{ fontWeight: 500 }}>다음 구매</th>
                <th className="text-center px-4 py-3 text-[#888]" style={{ fontWeight: 500 }}>액션</th>
              </tr>
            </thead>
            <tbody>
              {supplies.map((s) => (
                <tr key={s.id} className="border-b border-[#F5F5F5] hover:bg-[#FAFAFA] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-[#AAA]" />
                      <span className="text-[#333]">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#666]">{s.category}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <s.petIcon className="w-3.5 h-3.5 text-[#888]" />
                      <span className="text-[#666]">{s.pet}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right text-[#333]" style={{ fontWeight: 500 }}>₩{s.price.toLocaleString()}</td>
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
                      <button className="p-1.5 rounded hover:bg-[#F0F0F5] transition-colors" title="구매 링크">
                        <ExternalLink className="w-3.5 h-3.5 text-[#6C5CE7]" />
                      </button>
                      <button className="p-1.5 rounded hover:bg-[#F0F0F5] transition-colors" title="수정">
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