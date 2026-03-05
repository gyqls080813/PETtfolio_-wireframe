import { useState } from "react";
import {
  AlertTriangle,
  Sparkles,
  Dog,
  Cat,
  PiggyBank,
  Plus,
  X,
  ChevronRight,
} from "lucide-react";
import pome from "../../../assets/pome.png";

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

/* ───────────── 현재 나이대에 맞는 말풍선 메시지 ───────────── */
const currentDiseaseByPet: Record<string, {
  message: string;
  tip: string;
  stageName: string;
}> = {
  choco: {
    stageName: "청년기 (3~6세)",
    message: "저 요즘 슬개골이\n자꾸 신경 쓰여요 😢",
    tip: "말티즈 3세는 슬개골 탈구 위험이 높아요!\n미리 준비해두면 든든해요 💪",
  },
  nabi: {
    stageName: "중년기 (7~10세)",
    message: "신장이 좀 약해지는\n나이가 됐어요 🐾",
    tip: "코리안숏헤어 7세는 만성 신부전(CKD)에\n주의가 필요한 시기예요!",
  },
};

const stageColors = ["#D4A574", "#A8C5A0", "#E17055", "#A29BFE"];

const aiSuggestionByPet: Record<string, { text: string; disease: string; amount: string }> = {
  choco: { text: "초코(말티즈, 3세) 연령대에서",        disease: "아토피성 피부염",  amount: "월 ₩30,000" },
  nabi:  { text: "나비(코리안숏헤어, 7세) 연령대에서", disease: "만성 신부전(CKD)", amount: "월 ₩90,000" },
};

/* ════════════════════════════════════════════ */
export default function SavingsPage() {
  const [activePet, setActivePet] = useState(pets[0].id);
  const [modalOpen, setModalOpen] = useState(false);
  const [bubbleExpanded, setBubbleExpanded] = useState(false);

  const pet        = pets.find((p) => p.id === activePet)!;
  const fund       = emergencyFundByPet[activePet];
  const guide      = diseaseGuideByPet[activePet];
  const suggestion = aiSuggestionByPet[activePet];
  const current    = currentDiseaseByPet[activePet];

  const pct        = Math.round((fund.current / fund.goal) * 100);
  const remaining  = fund.goal - fund.current;
  const monthsLeft = Math.ceil(remaining / fund.monthlyDeposit);

  /* 현재 나이에 해당하는 stage index 찾기 */
  const currentStageIdx = activePet === "choco" ? 1 : 2; // 초코=청년기, 나비=중년기
  const currentStage = guide[currentStageIdx];

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
              onClick={() => { setActivePet(p.id); setBubbleExpanded(false); }}
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

      {/* ── AI 제안 배너 ── */}
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

        {/* 오른쪽: 캐릭터 + 말풍선 */}
        <div className="bg-white rounded-xl border border-[#E8D5C0] flex-1 flex flex-col min-h-0 overflow-hidden relative">
          {/* 상단 타이틀 */}
          <div className="flex items-center gap-2 px-5 pt-4 pb-2 shrink-0">
            <AlertTriangle className="w-4 h-4 text-[#E17055]" />
            <h3 className="text-[14px] text-[#222]" style={{ fontWeight: 600 }}>
              {pet.name}가 알려주는 질병 예방 가이드
            </h3>
            <span className="text-[11px] text-[#BBB] ml-auto">KB 펫 보험 약관 기준</span>
          </div>

          {/* 캐릭터 + 말풍선 영역 */}
          <div className="flex-1 relative flex items-end px-5 pb-5 min-h-0">
            
            {/* 배경 그라데이션 */}
            <div
              className="absolute inset-0 rounded-b-xl"
              style={{
                background: `radial-gradient(ellipse at bottom center, ${pet.color}15 0%, transparent 70%)`,
              }}
            />

            {/* 강아지 이미지 */}
            <div className="relative z-10 flex items-end justify-center flex-1">
              <img
                src={pome}
                alt="반려동물 캐릭터"
                className="object-contain drop-shadow-md"
                style={{ height: "350px", maxHeight: "100%" }}
              />
            </div>

            {/* 말풍선 — 좌측 상단에 위치 */}
            <div
              className="absolute top-4 left-5 z-20"
              style={{ maxWidth: "320px" }}
            >
              {/* 말풍선 본체 */}
              <button
                onClick={() => setModalOpen(true)}
                className="relative group text-left"
                style={{ cursor: "pointer" }}
              >
                <div
                  className="rounded-2xl px-4 py-3 shadow-md border transition-all duration-200 group-hover:shadow-lg group-hover:scale-[1.02]"
                  style={{
                    background: "white",
                    borderColor: `${pet.color}40`,
                    borderWidth: "1.5px",
                  }}
                >
                  {/* 현재 나이대 배지 */}
                  <div
                    className="inline-flex items-center gap-1 text-[10px] text-white rounded-full px-2 py-0.5 mb-2"
                    style={{ background: stageColors[currentStageIdx], fontWeight: 600 }}
                  >
                    <span>현재</span>
                    <span>{current.stageName}</span>
                  </div>

                  {/* 메시지 텍스트 */}
                  <p
                    className="text-[13px] text-[#333] leading-relaxed whitespace-pre-line"
                    style={{ fontWeight: 500 }}
                  >
                    {current.message}
                  </p>

                  {/* 팁 텍스트 */}
                  <p className="text-[11px] text-[#888] mt-1.5 leading-relaxed whitespace-pre-line">
                    {current.tip}
                  </p>

                  {/* 클릭 유도 */}
                  <div
                    className="flex items-center gap-1 mt-2 text-[11px] transition-colors"
                    style={{ color: pet.color, fontWeight: 600 }}
                  >
                    <span>예상 비용 보기</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </div>

                {/* 말풍선 꼬리 (아래 오른쪽으로) */}
                <div
                  className="absolute"
                  style={{
                    bottom: "-10px",
                    right: "30px",
                    width: 0,
                    height: 0,
                    borderLeft: "8px solid transparent",
                    borderRight: "8px solid transparent",
                    borderTop: `10px solid white`,
                    filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.08))",
                  }}
                />
                {/* 꼬리 테두리 레이어 */}
                <div
                  className="absolute"
                  style={{
                    bottom: "-12px",
                    right: "29px",
                    width: 0,
                    height: 0,
                    borderLeft: "9px solid transparent",
                    borderRight: "9px solid transparent",
                    borderTop: `11px solid ${pet.color}40`,
                    zIndex: -1,
                  }}
                />
              </button>
            </div>

            {/* 우측 하단 보조 정보 */}
            <div className="absolute bottom-5 right-5 z-10 flex flex-col gap-2">
              {guide.slice(0, 3).map((stage, si) => (
                <div
                  key={si}
                  className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-xl px-3 py-1.5 border shadow-sm"
                  style={{ borderColor: `${stageColors[si]}25` }}
                >
                  <span
                    className="text-[9px] px-1.5 py-0.5 rounded-full text-white shrink-0"
                    style={{ background: stageColors[si], fontWeight: 600 }}
                  >
                    {stage.stage}
                  </span>
                  <span className="text-[10px] text-[#555]">{stage.diseases[0].name}</span>
                  <span className="text-[10px] text-[#FF6B6B] ml-auto" style={{ fontWeight: 500 }}>
                    {stage.diseases[0].cost}
                  </span>
                </div>
              ))}
              <button
                onClick={() => setModalOpen(true)}
                className="text-[11px] text-center py-1.5 rounded-xl border transition-all hover:shadow-md"
                style={{
                  color: pet.color,
                  borderColor: `${pet.color}40`,
                  background: `${pet.color}10`,
                  fontWeight: 600,
                }}
              >
                전체 질병 비용 보기 →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ 모달: 전체 생애주기 질병 비용 ═══ */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl overflow-hidden"
            style={{ width: "480px", maxHeight: "80vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 모달 헤더 */}
            <div
              className="px-6 py-4 flex items-center gap-3"
              style={{ background: `linear-gradient(135deg, ${pet.color}20, ${pet.color}05)` }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: pet.color }}
              >
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-[16px] text-[#222]" style={{ fontWeight: 700 }}>
                  {pet.name} 생애주기별 예상 질병 비용
                </h2>
                <p className="text-[11px] text-[#999]">KB 펫 보험 약관 기준</p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#F5F5F5] transition-colors"
              >
                <X className="w-4 h-4 text-[#888]" />
              </button>
            </div>

            {/* 모달 본문 */}
            <div className="px-6 py-4 overflow-y-auto" style={{ maxHeight: "calc(80vh - 80px)" }}>
              <div className="space-y-4">
                {guide.map((stage, si) => (
                  <div
                    key={si}
                    className="rounded-xl border overflow-hidden"
                    style={{
                      borderColor: `${stageColors[si]}30`,
                      background: si === currentStageIdx ? `${stageColors[si]}08` : "white",
                    }}
                  >
                    {/* 스테이지 헤더 */}
                    <div
                      className="flex items-center gap-3 px-4 py-2.5"
                      style={{ background: `${stageColors[si]}12` }}
                    >
                      <span
                        className="text-[12px] px-2.5 py-0.5 rounded-full text-white"
                        style={{ background: stageColors[si], fontWeight: 600 }}
                      >
                        {stage.stage}
                      </span>
                      <span className="text-[12px] text-[#666]">{stage.ageRange}</span>
                      {si === currentStageIdx && (
                        <span
                          className="ml-auto text-[10px] px-2 py-0.5 rounded-full text-white"
                          style={{ background: "#FF6B6B", fontWeight: 600 }}
                        >
                          현재 나이
                        </span>
                      )}
                    </div>

                    {/* 질병 목록 */}
                    <div className="px-4 py-3 space-y-2">
                      {stage.diseases.map((d, di) => (
                        <div
                          key={di}
                          className="flex items-center justify-between py-1.5 border-b last:border-0"
                          style={{ borderColor: "#F0F0F0" }}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className="w-1.5 h-1.5 rounded-full shrink-0"
                              style={{ background: stageColors[si] }}
                            />
                            <span className="text-[13px] text-[#444]">{d.name}</span>
                          </div>
                          <span
                            className="text-[13px]"
                            style={{ color: "#FF6B6B", fontWeight: 600 }}
                          >
                            {d.cost}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* 모달 하단 저축 제안 */}
              <div
                className="mt-4 rounded-xl p-4"
                style={{ background: `${pet.color}10`, border: `1px solid ${pet.color}30` }}
              >
                <p className="text-[13px] text-[#444] leading-relaxed">
                  <span style={{ fontWeight: 700, color: pet.color }}>💡 저축 TIP</span><br />
                  {suggestion.text} <span style={{ fontWeight: 600, color: "#FF6B6B" }}>{suggestion.disease}</span> 발생률이
                  높아요. 예상 치료비 기준 <span style={{ fontWeight: 700 }}>{suggestion.amount}</span> 적립을 권장합니다.
                </p>
                <button
                  className="mt-3 w-full py-2.5 rounded-xl text-white text-[13px] transition-all hover:opacity-90 active:scale-[0.99]"
                  style={{ background: `linear-gradient(135deg, ${pet.color}, ${pet.color}CC)`, fontWeight: 600 }}
                  onClick={() => setModalOpen(false)}
                >
                  저축 목표 설정하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}