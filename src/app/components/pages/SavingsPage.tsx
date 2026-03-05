import { useState } from "react";
import {
  AlertTriangle,
  Sparkles,
  Dog,
  Cat,
  PiggyBank,
  Plus,
} from "lucide-react";

/* ───────────── 반려동물 데이터 ───────────── */
const pets = [
  { id: "choco", name: "초코", icon: Dog, color: "#D4A574", breed: "말티즈",       age: 3 },
  { id: "nabi",  name: "나비", icon: Cat, color: "#A8C5A0", breed: "코리안숏헤어", age: 7 },
];

/* ───────────── 반려동물별 비상금 현황 ───────────── */
const emergencyFundByPet: Record<string, {
  current: number; goal: number; monthlyDeposit: number;
}> = {
  choco: { current: 1200000, goal: 2000000, monthlyDeposit: 80000 },
  nabi:  { current:  800000, goal: 2000000, monthlyDeposit: 70000 },
};

/* ───────────── 반려동물별 생애주기 질병 가이드 ───────────── */
const diseaseGuideByPet: Record<string, {
  stage: string; ageRange: string; diseases: { name: string; cost: string }[];
}[]> = {
  choco: [
    {
      stage: "유년기", ageRange: "0~2세",
      diseases: [
        { name: "파보 바이러스 / 홍역",   cost: "30만~80만원"   },
        { name: "고관절 이형성증 검사",    cost: "10만~20만원"   },
        { name: "기관지염 / 호흡기 질환", cost: "5만~20만원/회" },
      ],
    },
    {
      stage: "청년기", ageRange: "3~6세",
      diseases: [
        { name: "슬개골 탈구 수술",     cost: "150만~300만원"  },
        { name: "아토피성 피부염 치료", cost: "20만~50만원/월" },
        { name: "외이염 / 귀 질환",    cost: "5만~15만원/회"  },
      ],
    },
    {
      stage: "중년기", ageRange: "7~10세",
      diseases: [
        { name: "심장 질환 (판막증 등)", cost: "30만~100만원/월" },
        { name: "치주 질환 / 스케일링",  cost: "20만~50만원"     },
        { name: "당뇨병 관리",           cost: "10만~30만원/월"  },
      ],
    },
    {
      stage: "노년기", ageRange: "11세~",
      diseases: [
        { name: "암 / 종양 치료",     cost: "100만~500만원"  },
        { name: "디스크 / 척추 질환", cost: "200만~400만원"  },
        { name: "신부전 치료",        cost: "30만~200만원/월" },
      ],
    },
  ],
  nabi: [
    {
      stage: "유년기", ageRange: "0~2세",
      diseases: [
        { name: "고양이 범백혈구감소증",    cost: "20만~80만원"   },
        { name: "고양이 헤르페스 / 칼리시", cost: "5만~30만원/회" },
        { name: "기생충 / 내부 감염",       cost: "3만~10만원/회" },
      ],
    },
    {
      stage: "청년기", ageRange: "3~6세",
      diseases: [
        { name: "하부 요로계 질환 (FLUTD)", cost: "20만~100만원"  },
        { name: "고양이 천식",              cost: "10만~30만원/월" },
        { name: "치주 질환",               cost: "20만~50만원"    },
      ],
    },
    {
      stage: "중년기", ageRange: "7~10세",
      diseases: [
        { name: "만성 신부전 (CKD)",  cost: "30만~150만원/월" },
        { name: "갑상선 기능 항진증", cost: "10만~40만원/월"  },
        { name: "백내장 / 안구 질환", cost: "50만원/회"       },
      ],
    },
    {
      stage: "노년기", ageRange: "11세~",
      diseases: [
        { name: "암 / 림프종",   cost: "100만~500만원"  },
        { name: "당뇨병 관리",  cost: "10만~30만원/월" },
        { name: "심근병증 치료", cost: "30만~100만원/월" },
      ],
    },
  ],
};

const stageColors = ["#D4A574", "#A8C5A0", "#E17055", "#A29BFE"];

const aiSuggestionByPet: Record<string, { text: string; disease: string; amount: string }> = {
  choco: { text: "초코(말티즈, 3세) 연령대에서",        disease: "아토피성 피부염",  amount: "월 ₩30,000" },
  nabi:  { text: "나비(코리안숏헤어, 7세) 연령대에서", disease: "만성 신부전(CKD)", amount: "월 ₩90,000" },
};

/* ════════════════════════════════════════════ */
export default function SavingsPage() {
  const [activePet, setActivePet] = useState(pets[0].id);

  const pet        = pets.find((p) => p.id === activePet)!;
  const fund       = emergencyFundByPet[activePet];
  const guide      = diseaseGuideByPet[activePet];
  const suggestion = aiSuggestionByPet[activePet];

  const pct        = Math.round((fund.current / fund.goal) * 100);
  const remaining  = fund.goal - fund.current;
  const monthsLeft = Math.ceil(remaining / fund.monthlyDeposit);

  return (
    <div className="flex flex-col gap-3 h-full">

      {/* ── 탭 행 ── */}
      <div className="flex items-center gap-2 shrink-0">
        {pets.map((p) => {
          const Icon     = p.icon;
          const isActive = p.id === activePet;
          return (
            <button
              key={p.id}
              onClick={() => setActivePet(p.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-[14px] transition-all"
              style={{
                background: isActive ? p.color : "#FFF8EE",
                color:      isActive ? "#fff"  : "#888",
                fontWeight: isActive ? 600     : 400,
                boxShadow:  isActive ? `0 2px 8px ${p.color}40` : "none",
              }}
            >
              <Icon className="w-4 h-4" />
              {p.name}
            </button>
          );
        })}
      </div>

      {/* ── AI 제안 배너 (한 줄 compact) ── */}
      <div className="bg-gradient-to-r from-[#D4A574]/10 to-[#C4956A]/10 border border-[#D4A574]/20 rounded-xl px-4 py-3 flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-[#D4A574]/15 flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4 text-[#D4A574]" />
        </div>
        <p className="text-[13px] text-[#555] flex-1">
          <span style={{ fontWeight: 600, color: "#333" }}>{pet.name} 추천 </span>
          {suggestion.text}{" "}
          <span className="text-[#FF6B6B]" style={{ fontWeight: 500 }}>{suggestion.disease}</span>
          {" "}발생률이 높아요 — 예상 치료비 기준{" "}
          <span style={{ fontWeight: 600 }}>{suggestion.amount}</span> 저축 권장
        </p>
        <div className="flex gap-2 shrink-0">
          <button className="px-3 py-1.5 text-white rounded-lg text-[12px]" style={{ background: "linear-gradient(135deg, #D4A574, #C4956A)" }}>저축 시작</button>
          <button className="px-3 py-1.5 border border-[#DDD] text-[#666] rounded-lg text-[12px]">나중에</button>
        </div>
      </div>

      {/* ── 메인 2열 레이아웃 ── */}
      <div className="flex gap-3 flex-1 min-h-0">

        {/* 왼쪽: 비상금 카드 */}
        <div className="bg-white rounded-xl border border-[#E8D5C0] p-5 flex flex-col justify-between w-72 shrink-0">
          {/* 헤더 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${pet.color}18` }}>
                <PiggyBank className="w-5 h-5" style={{ color: pet.color }} />
              </div>
              <div>
                <div className="text-[14px] text-[#222]" style={{ fontWeight: 600 }}>{pet.name} 비상금</div>
                <div className="text-[11px] text-[#999]">월 ₩{fund.monthlyDeposit.toLocaleString()} 자동 저축</div>
              </div>
            </div>
            <button
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[12px] text-white"
              style={{ background: pet.color }}
            >
              <Plus className="w-3.5 h-3.5" /> 입금
            </button>
          </div>

          {/* 금액 */}
          <div className="mt-4">
            <div className="text-[30px] text-[#222]" style={{ fontWeight: 700 }}>
              ₩{fund.current.toLocaleString()}
            </div>
            <div className="text-[12px] text-[#999] mt-0.5">
              목표 ₩{fund.goal.toLocaleString()} 중 {pct}% 달성
            </div>
          </div>

          {/* 진행 바 */}
          <div className="mt-3">
            <div className="w-full bg-[#F5EDDF] rounded-full h-3 overflow-hidden">
              <div
                className="h-3 rounded-full transition-all"
                style={{ width: `${Math.min(pct, 100)}%`, background: `linear-gradient(90deg, ${pet.color}, ${pet.color}AA)` }}
              />
            </div>
            <div className="flex justify-between mt-1.5 text-[11px] text-[#AAA]">
              <span>₩{fund.current.toLocaleString()}</span>
              <span>목표 ₩{fund.goal.toLocaleString()}</span>
            </div>
          </div>

          {/* 하단 정보 */}
          <div className="mt-4 flex gap-3">
            <div className="flex-1 bg-[#F9F0E4] rounded-lg p-3 text-center">
              <div className="text-[18px] text-[#222]" style={{ fontWeight: 700 }}>
                {pct}%
              </div>
              <div className="text-[11px] text-[#999] mt-0.5">달성률</div>
            </div>
            <div className="flex-1 bg-[#F9F0E4] rounded-lg p-3 text-center">
              <div className="text-[18px] text-[#222]" style={{ fontWeight: 700 }}>
                {monthsLeft}개월
              </div>
              <div className="text-[11px] text-[#999] mt-0.5">달성까지</div>
            </div>
          </div>
        </div>

        {/* 오른쪽: 생애주기별 질병 가이드 */}
        <div className="bg-white rounded-xl border border-[#E8D5C0] p-5 flex-1 flex flex-col min-h-0">
          <div className="flex items-baseline gap-2 mb-3 shrink-0">
            <h3 className="text-[14px] text-[#222]" style={{ fontWeight: 600 }}>
              <AlertTriangle className="w-4 h-4 inline mr-1.5 text-[#E17055]" />
              {pet.name} 생애주기별 질병 예상 비용 가이드
            </h3>
            <span className="text-[11px] text-[#BBB]">KB 펫 보험 약관 기준</span>
          </div>

          <div className="grid grid-cols-2 gap-3 flex-1 min-h-0">
            {guide.map((stage, si) => (
              <div
                key={si}
                className="rounded-xl p-3 border flex flex-col"
                style={{ borderColor: `${stageColors[si]}30`, background: `${stageColors[si]}08` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-[11px] px-2 py-0.5 rounded-full text-white"
                    style={{ background: stageColors[si], fontWeight: 600 }}
                  >
                    {stage.stage}
                  </span>
                  <span className="text-[11px] text-[#888]">{stage.ageRange}</span>
                </div>
                <div className="space-y-1.5">
                  {stage.diseases.map((d, di) => (
                    <div key={di} className="flex items-center justify-between text-[11px]">
                      <span className="text-[#555]">{d.name}</span>
                      <span style={{ color: "#FF6B6B", fontWeight: 500 }}>{d.cost}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}