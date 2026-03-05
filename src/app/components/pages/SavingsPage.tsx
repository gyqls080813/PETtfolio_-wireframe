import { useState } from "react";
import {
  Plus,
  Target,
  TrendingUp,
  ArrowRight,
  AlertTriangle,
  Sparkles,
  ChevronRight,
  Dog,
  Cat,
} from "lucide-react";

const savingsList = [
  {
    id: 1,
    title: "슬개골 탈구 대비",
    pet: "초코",
    petIcon: Dog,
    current: 2160000,
    goal: 3000000,
    color: "#6C5CE7",
    monthlyTarget: 100000,
    disease: "근골격계 (801)",
  },
  {
    id: 2,
    title: "백내장 수술 대비",
    pet: "나비",
    petIcon: Cat,
    current: 225000,
    goal: 500000,
    color: "#00B894",
    monthlyTarget: 50000,
    disease: "안과 (804)",
  },
  {
    id: 3,
    title: "응급 비상금",
    pet: "전체",
    petIcon: Target,
    current: 1760000,
    goal: 2000000,
    color: "#E17055",
    monthlyTarget: 80000,
    disease: "",
  },
];

export default function SavingsPage() {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-end">
        <button
          className="flex items-center gap-1.5 px-3 py-2 bg-[#6C5CE7] text-white rounded-lg text-[13px] hover:bg-[#5A4BD1] transition-colors"
          onClick={() => setShowCreate(!showCreate)}
        >
          <Plus className="w-4 h-4" />
          저축 목표 생성
        </button>
      </div>

      {/* AI Suggestion Banner */}
      <div className="bg-gradient-to-r from-[#6C5CE7]/10 to-[#A29BFE]/10 border border-[#6C5CE7]/20 rounded-xl p-4 flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#6C5CE7]/15 flex items-center justify-center shrink-0">
          <Sparkles className="w-5 h-5 text-[#6C5CE7]" />
        </div>
        <div className="flex-1">
          <div className="text-[14px] text-[#333]" style={{ fontWeight: 600 }}>
            생애주기 맞춤형 저축 제안
          </div>
          <p className="text-[12px] text-[#666] mt-1">
            초코(말티즈, 3세)의 연령대에서 <span className="text-[#FF6B6B]" style={{ fontWeight: 500 }}>아토피성 피부염</span> 발생률이 높아요.
            예상 치료비 기준으로 월 ₩30,000 저축을 추천드립니다.
          </p>
          <div className="flex gap-2 mt-2">
            <button className="px-3 py-1.5 bg-[#6C5CE7] text-white rounded-lg text-[12px]">저축 시작</button>
            <button className="px-3 py-1.5 border border-[#DDD] text-[#666] rounded-lg text-[12px]">나중에</button>
          </div>
        </div>
      </div>

      {/* Create Form */}
      {showCreate && (
        <div className="bg-white rounded-xl border border-[#E0E0E0] p-5 space-y-3">
          <h3 className="text-[16px] text-[#222]" style={{ fontWeight: 600 }}>새 저축 목표</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-[13px] text-[#666] mb-1 block">저축명</label>
              <input placeholder="예: 슬개골 수술 대비" className="w-full border border-[#DDD] rounded-lg px-3 py-2.5 bg-[#FAFAFA] text-[14px] outline-none placeholder:text-[#CCC]" />
            </div>
            <div>
              <label className="text-[13px] text-[#666] mb-1 block">대상 반려동물</label>
              <select className="w-full border border-[#DDD] rounded-lg px-3 py-2.5 bg-[#FAFAFA] text-[14px] outline-none appearance-none">
                <option>초코</option>
                <option>나비</option>
                <option>전체</option>
              </select>
            </div>
            <div>
              <label className="text-[13px] text-[#666] mb-1 block">목표 금액</label>
              <input placeholder="₩ 0" className="w-full border border-[#DDD] rounded-lg px-3 py-2.5 bg-[#FAFAFA] text-[14px] outline-none placeholder:text-[#CCC]" />
            </div>
            <div>
              <label className="text-[13px] text-[#666] mb-1 block">월 저축액</label>
              <input placeholder="₩ 0" className="w-full border border-[#DDD] rounded-lg px-3 py-2.5 bg-[#FAFAFA] text-[14px] outline-none placeholder:text-[#CCC]" />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button className="px-4 py-2 border border-[#DDD] rounded-lg text-[13px] text-[#666]" onClick={() => setShowCreate(false)}>취소</button>
            <button className="px-4 py-2 bg-[#6C5CE7] text-white rounded-lg text-[13px]" onClick={() => setShowCreate(false)}>생성</button>
          </div>
        </div>
      )}

      {/* Savings List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {savingsList.map((s) => {
          const pct = Math.round((s.current / s.goal) * 100);
          const isComplete = pct >= 100;
          return (
            <div key={s.id} className="bg-white rounded-xl border border-[#E0E0E0] p-5 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <s.petIcon className="w-5 h-5" style={{ color: s.color }} />
                  <span className="text-[13px] text-[#888]">{s.pet}</span>
                </div>
                {s.disease && (
                  <span className="px-2 py-0.5 bg-[#FF6B6B]/10 text-[#FF6B6B] rounded text-[10px]">{s.disease}</span>
                )}
              </div>
              <h4 className="text-[16px] text-[#222] mb-3" style={{ fontWeight: 600 }}>{s.title}</h4>

              {/* Water Level Tank */}
              <div className="flex items-center gap-4 mb-3">
                <div className="w-14 h-24 bg-[#F0F0F5] rounded-lg relative overflow-hidden border border-[#E0E0E0]">
                  <div
                    className="absolute bottom-0 w-full rounded-b-lg transition-all"
                    style={{ height: `${Math.min(pct, 100)}%`, backgroundColor: s.color, opacity: 0.6 }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[13px] text-[#333]" style={{ fontWeight: 600 }}>{pct}%</span>
                  </div>
                </div>
                <div className="flex-1 space-y-1.5">
                  <div className="flex justify-between text-[12px]">
                    <span className="text-[#888]">현재</span>
                    <span className="text-[#333]" style={{ fontWeight: 500 }}>₩{s.current.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[12px]">
                    <span className="text-[#888]">목표</span>
                    <span className="text-[#333]" style={{ fontWeight: 500 }}>₩{s.goal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[12px]">
                    <span className="text-[#888]">월 저축</span>
                    <span className="text-[#6C5CE7]" style={{ fontWeight: 500 }}>₩{s.monthlyTarget.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="w-full bg-[#F0F0F5] rounded-full h-1.5 mb-3">
                <div className="h-1.5 rounded-full" style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: s.color }} />
              </div>

              <div className="flex gap-2">
                <button className="flex-1 py-2 border border-[#DDD] rounded-lg text-[12px] text-[#666] hover:bg-[#F5F5F5] transition-colors flex items-center justify-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> 입금
                </button>
                {isComplete ? (
                  <button className="flex-1 py-2 bg-[#00B894] text-white rounded-lg text-[12px] flex items-center justify-center gap-1">
                    <ArrowRight className="w-3.5 h-3.5" /> 이체하기
                  </button>
                ) : (
                  <button className="flex-1 py-2 bg-[#F0F0F5] text-[#AAA] rounded-lg text-[12px] flex items-center justify-center gap-1 cursor-not-allowed">
                    목표 미달성
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Disease Reference */}
      <div className="bg-white rounded-xl border border-[#E0E0E0] p-5">
        <h3 className="text-[15px] text-[#222] mb-3" style={{ fontWeight: 600 }}>
          <AlertTriangle className="w-4 h-4 inline mr-2 text-[#E17055]" />
          질병별 예상 비용 가이드 (KB 펫 보험 약관 기준)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[#EEE]">
                <th className="text-left py-2 text-[#888]" style={{ fontWeight: 500 }}>구분</th>
                <th className="text-right py-2 text-[#888]" style={{ fontWeight: 500 }}>예상 비용</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "일반 수술 (슬개골 등)", cost: "150만~300만원" },
                { name: "백내장/녹내장 수술", cost: "50만원/회" },
                { name: "MRI/CT 촬영", cost: "100만원/년" },
                { name: "이물 제거 (내시경)", cost: "200만원/회" },
                { name: "항암 약물 치료", cost: "30만원/회" },
                { name: "일반 진료 (수술 미실시)", cost: "10만~30만원/일" },
              ].map((item, i) => (
                <tr key={i} className="border-b border-[#F5F5F5]">
                  <td className="py-2.5 text-[#444]">{item.name}</td>
                  <td className="py-2.5 text-right text-[#FF6B6B]" style={{ fontWeight: 500 }}>{item.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}