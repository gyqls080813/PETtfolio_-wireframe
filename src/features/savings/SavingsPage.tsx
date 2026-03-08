import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  Dog,
  Cat,
  HeartPulse,
  Info,
  CheckCircle2,
  CalendarDays,
  CheckSquare,
  Square
} from "lucide-react";
import pome from "../../assets/pome.png";
import cat from "../../assets/cat.png";

import pomeBaby from "../../assets/pome_baby.png";
import pomeYouth from "../../assets/pome_youth.png";
import pomeMiddle from "../../assets/pome_middle.png";
import pomeSenior from "../../assets/pome_senior.png";

import catBaby from "../../assets/cat_baby.png";
import catYouth from "../../assets/cat_youth.png";
import catMiddle from "../../assets/cat_middle.png";
import catSenior from "../../assets/cat_senior.png";

const lifeCycleImages: Record<string, any[]> = {
  choco: [pomeBaby, pomeYouth, pomeMiddle, pomeSenior],
  nabi: [catBaby, catYouth, catMiddle, catSenior],
};

const guideCoords: Record<string, { top: string, left: string, label: string }[][]> = {
  choco: [
    [ { label: "예방접종(전신)", top: "35%", left: "30%" }, { label: "사상충(내부)", top: "60%", left: "45%" }, { label: "사회화(행동)", top: "25%", left: "70%" } ],
    [ { label: "슬개골(다리)", top: "80%", left: "35%" }, { label: "치석(구강)", top: "30%", left: "45%" }, { label: "산책(활동량)", top: "75%", left: "75%" } ],
    [ { label: "심장(가슴)", top: "50%", left: "40%" }, { label: "체중(복부)", top: "65%", left: "55%" }, { label: "종합검진(전신)", top: "25%", left: "25%" } ],
    [ { label: "백내장(안구)", top: "25%", left: "55%" }, { label: "소화(위장)", top: "65%", left: "45%" }, { label: "관절 무리(다리)", top: "85%", left: "40%" } ]
  ],
  nabi: [
    [ { label: "종합백신(전신)", top: "35%", left: "30%" }, { label: "환경적응(행동)", top: "25%", left: "70%" }, { label: "양치(구강)", top: "30%", left: "45%" } ],
    [ { label: "비뇨기(하복부)", top: "75%", left: "55%" }, { label: "음수량(구강)", top: "30%", left: "40%" }, { label: "사냥놀이(활동)", top: "50%", left: "75%" } ],
    [ { label: "신부전(신장)", top: "60%", left: "55%" }, { label: "갑상선(목)", top: "40%", left: "50%" }, { label: "관절(다리)", top: "85%", left: "40%" } ],
    [ { label: "소화기관(복부)", top: "65%", left: "50%" }, { label: "심/호흡(가슴)", top: "50%", left: "40%" }, { label: "건강검진(전신)", top: "25%", left: "25%" } ]
  ]
};

const getImgSrc = (img: any): string => typeof img === 'string' ? img : (img?.src || (img as string));

/* ───────────── 반려동물 데이터 ───────────── */
const pets = [
  { id: "choco", name: "초코", icon: Dog, color: "var(--app-primary)", breed: "말티즈", age: 3, img: pome },
  { id: "nabi", name: "나비", icon: Cat, color: "var(--app-success)", breed: "코리안숏헤어", age: 7, img: cat },
];

/* ───────────── 생애주기별 가이드 데이터 ───────────── */
const lifeCycleGuideByPet: Record<string, {
  stage: string; ageRange: string; title: string; description: string; points: string[];
}[]> = {
  choco: [
    {
      stage: "유년기", ageRange: "0~2세", title: "기초 면역과 사회화 단계", 
      description: "면역력이 약한 시기로 철저한 예방접종과 다양한 환경에 노출시켜주는 사회화 훈련이 가장 중요합니다.",
      points: ["기초 5차 예방접종 및 광견병 접종 완료", "월 1회 내외부 기생충(심장사상충) 예방", "다양한 사람과 강아지를 만나는 사회화 훈련"]
    },
    {
      stage: "청년기", ageRange: "3~6세", title: "활동량 증가와 골관절 주의",
      description: "가장 활동적인 시기로 충분한 운동을 제공해야 하며, 소형견 특성상 관절 건강에 유의해야 합니다.",
      points: ["슬개골 탈구 예방을 위한 미끄럼 방지 매트 설치", "매일 꾸준하고 적절한 산책(30분~1시간)", "치석 예방을 위한 양치질 습관화"]
    },
    {
      stage: "중년기", ageRange: "7~10세", title: "신체 변화 시작 및 정기 검진 선제 조치",
      description: "활동량이 서서히 줄어들면서 체중이 증가하기 쉬우며, 본격적인 노화성 질환이 나타나기 시작합니다.",
      points: ["연 1회 이상 종합 건강 파노라마 검진 실시", "심장 질환(판막증) 초기 발견을 위한 청진", "체중 관리를 위한 맞춤형 식단 조절"]
    },
    {
      stage: "노년기", ageRange: "11세~", title: "집중 케어 및 삶의 질 유지",
      description: "감각 기관이 둔화되고 면역력이 낮아집니다. 질환에 대한 적극적인 대처와 편안한 환경 조성이 필요합니다.",
      points: ["백내장 등 안구 질환 정기 체크", "소화가 잘되고 부드러운 노령견 전용 식단 교체", "과도한 운동을 피하고 짧고 가벼운 산책 위주"]
    },
  ],
  nabi: [
    {
      stage: "유년기", ageRange: "0~2세", title: "기초 예방과 환경 적응",
      description: "고양이 범백혈구감소증 등 치명적인 전염병을 막기 위해 꼼꼼한 접종과 스트레스 없는 환경 적응이 필요합니다.",
      points: ["고양이 3종/4종 종합백신 완료", "화장실(모래) 및 캣타워 등 수직 공간 적응", "구강 질환 예방을 위한 이른 양치질 교육"]
    },
    {
      stage: "청년기", ageRange: "3~6세", title: "활동성 파악과 비뇨기 질환 예방",
      description: "에너지가 넘치는 시기이며, 특히 수컷의 경우 하부 요로계 질환(FLUTD) 발생 가능성이 상승합니다.",
      points: ["충분한 음수량 확보를 위한 다양한 형태의 물그릇/분수대 배치", "비만 예방을 위한 하루 15분 이상 사냥 놀이", "정기적인 소변량/형태 모니터링"]
    },
    {
      stage: "중년기", ageRange: "7~10세", title: "기초 대사량 감소 및 만성 질환 체크",
      description: "체중 관리가 필수적이며, 만성 신부전이나 갑상선 질환 등 서서히 진행되는 질병에 주의해야 합니다.",
      points: ["만성 신부전 선별을 위한 혈액/뇨 정기 검사", "갑상선 기능 항진증 대비 체중 감소 유무 관찰", "관절 무리를 줄이기 위한 낮은 스텝 설치"]
    },
    {
      stage: "노년기", ageRange: "11세~", title: "정밀 건강 모니터링",
      description: "면역력과 활력이 급감하며 숨겨진 통증을 잘 표현하지 않으므로 보호자의 세심한 관찰이 중요합니다.",
      points: ["연 2회 반기별 정밀 건강 검진", "소화 흡수율을 고려한 노묘용 처방식 검토", "심박수와 호흡수 주기적 체크"]
    },
  ],
};

/* ───────────── 현재 상태 말풍선 ───────────── */
const currentStatusByPet: Record<string, {
  message: string;
  tip: string;
  stageName: string;
}> = {
  choco: {
    stageName: "청년기 (3~6세)",
    message: "저 요즘 슬개골이\n자꾸 신경 쓰여요 😢",
    tip: "말티즈 3세는 슬개골 탈구 방지를 위해\n미끄럼 방지 등 일상 관리를 꼭 챙겨주세요.",
  },
  nabi: {
    stageName: "중년기 (7~10세)",
    message: "신장이 좀 약해지는\n나이가 됐어요 🐾",
    tip: "코리안숏헤어 7세부터는 만성 신부전(CKD)\n각별한 모니터링과 음수량 관리가 필수예요!",
  },
};

const stageColors = ["var(--app-primary)", "var(--app-success)", "var(--app-warning)", "#A29BFE"];

export default function SavingsPage() {
  const router = useRouter();
  const [activePet, setActivePet] = useState(pets[0].id);

  const pet = pets.find((p) => p.id === activePet)!;
  const guide = lifeCycleGuideByPet[activePet];
  const current = currentStatusByPet[activePet];

  /* 현재 나이에 해당하는 stage index 도출 */
  const defaultStageIdx = activePet === "choco" ? 1 : 2; // 초코=청년기, 나비=중년기
  const currentStageIdx = defaultStageIdx;

  // 탭 선택을 위한 selectedStageIdx
  const [selectedStageIdx, setSelectedStageIdx] = useState(defaultStageIdx);

  // 펫 종류가 바뀌면 초기화
  useEffect(() => {
    setSelectedStageIdx(activePet === "choco" ? 1 : 2);
  }, [activePet]);

  // 스케줄링(체크리스트) 상태 관리
  // key 형태: `${petId}-${stageIdx}-${taskIdx}`
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({});

  const toggleTask = (pId: string, sIdx: number, tIdx: number) => {
    const key = `${pId}-${sIdx}-${tIdx}`;
    setCheckedTasks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col gap-3 h-full min-h-max lg:h-full lg:min-h-0 lg:overflow-hidden pb-20 lg:pb-0">

      {/* ── 탭 행 ── */}
      <div className="flex items-center gap-2 auto-cols-max shrink-0">
        {pets.map((p) => {
          const Icon = p.icon;
          const isActive = p.id === activePet;
          return (
            <button
              key={p.id}
              onClick={() => setActivePet(p.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-[14px] transition-all"
              style={{
                background: isActive ? p.color : "var(--app-bg-tertiary)",
                color: isActive ? "#fff" : "#888",
                fontWeight: isActive ? 600 : 400,
                boxShadow: isActive ? `0 2px 8px ${p.color}40` : "none",
              }}
            >
              <Icon className="w-4 h-4" />
              {p.name}
            </button>
          );
        })}
      </div>

      {/* ── 메인 레이아웃 (모바일: 1열 세로 스크롤, 데스크탑: 2열 가로 배치) ── */}
      <div className="flex flex-col lg:flex-row gap-3 flex-1 lg:min-h-0 min-h-max">

        {/* 왼쪽: 캐릭터 + 질병 예방 가이드 (기존 오른쪽 요소 였음) */}
        <div className="bg-white rounded-xl border border-[var(--app-border)] p-0 lg:p-0 flex flex-col justify-between w-full lg:w-96 shrink-0 relative overflow-hidden shadow-sm lg:h-full min-h-[400px] lg:min-h-0">
          {/* 상단 타이틀 */}
          <div className="flex items-center gap-2 px-5 pt-4 pb-2 shrink-0 z-20">
            <AlertTriangle className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-[var(--app-warning)]" />
            <h3 className="text-[13px] lg:text-[14px] text-[#222]" style={{ fontWeight: 600 }}>
              {pet.name}의 질병 예방 가이드
            </h3>
            <span className="text-[11px] text-[#BBB] ml-auto">{pet.breed} {pet.age}세</span>
          </div>

          {/* 캐릭터 + 말풍선 영역 */}
          <div className="flex-1 relative flex items-end px-3 lg:px-5 pb-3 lg:pb-5 min-h-0">

            {/* 배경 그라데이션 */}
            <div
              className="absolute inset-0 rounded-b-xl"
              style={{
                background: `radial-gradient(ellipse at bottom left, ${pet.color}15 0%, transparent 70%)`,
              }}
            />

            {/* 펫 이미지 */}
            <div className="relative z-10 flex items-end justify-center flex-1 w-full translate-x-4 lg:h-full lg:min-h-0">
              <img
                src={getImgSrc(pet.img)}
                alt="반려동물 캐릭터"
                className="object-contain drop-shadow-md h-[260px] lg:h-full max-h-[85%] lg:max-h-[300px]"
              />
            </div>

            {/* 말풍선 — 좌측 상단에 위치 */}
            <div className="absolute top-4 lg:top-8 left-4 lg:left-6 z-20 max-w-[220px] lg:max-w-[280px]">
              <div className="relative text-left">
                <div
                  className="rounded-[20px] px-3 py-2.5 lg:px-4 lg:py-3 shadow-md border"
                  style={{
                    background: "white",
                    borderColor: "#4A3C31",
                    borderWidth: "2px",
                  }}
                >
                  {/* 현재 나이대 배지 */}
                  <div
                    className="inline-flex items-center gap-1 text-[11px] text-white rounded-full px-2.5 py-0.5 mb-2"
                    style={{ background: stageColors[currentStageIdx], fontWeight: 600 }}
                  >
                    <span>현재</span>
                    <span>{current.stageName}</span>
                  </div>

                  {/* 메시지 텍스트 */}
                  <p
                    className="text-[13px] lg:text-[15px] text-[#222]"
                    style={{ fontWeight: 600, lineHeight: 1.5 }}
                  >
                    {current.message.split("\n").map((line, i) => (
                       <span key={i}>{line}<br/></span>
                    ))}
                  </p>

                  {/* 팁 텍스트 */}
                  <div className="bg-[#FAF9F6] rounded-xl p-2.5 mt-2.5">
                     <p className="text-[11px] lg:text-[12px] text-[#6B4F3A] leading-relaxed font-medium hidden sm:block">
                       {current.tip}
                     </p>
                  </div>
                </div>

                {/* 꼬리 테두리 (border) 역할 */}
                <div
                  className="absolute"
                  style={{
                    bottom: "-14px",
                    right: "26px",
                    width: 0,
                    height: 0,
                    borderLeft: "8px solid transparent",
                    borderRight: "8px solid transparent",
                    borderTop: `16px solid #4A3C31`,
                    zIndex: -1,
                  }}
                />
                {/* 실체 말풍선 꼬리 (흰색) */}
                <div
                  className="absolute"
                  style={{
                    bottom: "-11px",
                    right: "28px",
                    width: 0,
                    height: 0,
                    borderLeft: "6px solid transparent",
                    borderRight: "6px solid transparent",
                    borderTop: `13px solid white`,
                    zIndex: 10,
                  }}
                />
              </div>
            </div>
           </div>
        </div>

        {/* 오른쪽: 생애주기별 해부상/포인트 가이드 */}
        <div className="bg-white rounded-xl border border-[var(--app-border)] flex-1 flex flex-col lg:h-full min-h-[500px] lg:min-h-0 overflow-hidden shadow-sm">
          {/* 상단 타이틀 & 탭 */}
          <div className="px-5 pt-5 pb-4 border-b border-[var(--app-bg-secondary)] shrink-0">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-[var(--app-primary-dark)]" />
                <h3 className="text-[15px] text-[#222]" style={{ fontWeight: 700 }}>
                  {pet.name} 연령별 건강 지도
                </h3>
              </div>
              <span className="text-[11px] text-white px-2.5 py-1 rounded-full" style={{ background: stageColors[currentStageIdx], fontWeight: 600 }}>
                현재 나이: {guide[currentStageIdx].stage}
              </span>
            </div>

            {/* 연령 탭 */}
            <div className="flex items-center gap-2">
              {guide.map((st, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedStageIdx(idx)}
                  className="flex-1 py-2 text-[12px] font-bold rounded-lg transition-colors border"
                  style={{
                    background: selectedStageIdx === idx ? stageColors[idx] : "transparent",
                    color: selectedStageIdx === idx ? "#fff" : "#888",
                    borderColor: selectedStageIdx === idx ? stageColors[idx] : "#EAEAEA"
                  }}
                >
                  {st.stage}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto w-full custom-scrollbar bg-[#FAFAF8]" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            <div className="relative w-full min-h-full flex flex-col items-center p-6 pb-24">
              
              {/* Content Container */}
              <div className="flex flex-col lg:flex-row w-full max-w-[800px] gap-10 lg:gap-16 items-center lg:items-center justify-center relative z-10 shrink-0 mb-6 mt-4">
                 
                 {/* Left: Checklist */}
                 <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-4 order-2 lg:order-1">
                   <div className="flex items-center justify-between mb-1 px-1">
                     <span className="text-[13px] font-bold text-[#444] bg-white px-2 py-0.5 rounded shadow-sm">필수 체크리스트 목록</span>
                     <span className="text-[11px] text-white bg-[#444] px-2 py-0.5 rounded-full font-bold">
                       {guide[selectedStageIdx].points.filter((_, i) => checkedTasks[`${pet.id}-${selectedStageIdx}-${i}`]).length} / {guide[selectedStageIdx].points.length} 완료
                     </span>
                   </div>
                   
                   {guide[selectedStageIdx].points.map((pointText, pIdx) => {
                     const isChecked = checkedTasks[`${pet.id}-${selectedStageIdx}-${pIdx}`];
                     const label = guideCoords[pet.id][selectedStageIdx][pIdx].label;
                     return (
                       <div 
                         key={pIdx}
                         onClick={() => toggleTask(pet.id, selectedStageIdx, pIdx)}
                         className={`checklist-card flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all shrink-0 ${isChecked ? 'bg-[var(--app-success)]/10 border-[var(--app-success)]/40 shadow-sm' : 'bg-white border-[#EAEAEA] shadow-sm hover:border-[var(--app-primary)]/50'}`}
                       >
                         <button className="mt-0.5 shrink-0 transition-colors">
                           {isChecked ? (
                             <CheckSquare className="w-5 h-5 text-[var(--app-success)]" />
                           ) : (
                             <Square className="w-5 h-5 text-[#CCC]" />
                           )}
                         </button>
                         <div className="flex-1 flex flex-col gap-1">
                           <span className={`text-[12px] font-bold ${isChecked ? 'text-[var(--app-success)]' : 'text-[#444]'}`}>
                             {label}
                           </span>
                           <span className={`text-[12px] leading-snug ${isChecked ? 'text-[#888]' : 'text-[#555]'}`}>
                             {pointText}
                           </span>
                         </div>
                       </div>
                     );
                   })}
                 </div>

                 {/* Right: Image & Hotspots */}
                 <div className="relative w-[200px] lg:w-[280px] aspect-square flex items-center justify-center shrink-0 order-1 lg:order-2">
                    <img
                      src={getImgSrc(lifeCycleImages[pet.id][selectedStageIdx])}
                      alt={guide[selectedStageIdx].stage}
                      className="w-full h-full object-contain pointer-events-none drop-shadow-sm"
                      style={{ opacity: 0.5, filter: "grayscale(10%) saturate(120%)" }}
                    />

                    {/* 포인트(Hotspots) 영구 라벨 표시 */}
                    {guideCoords[pet.id][selectedStageIdx].map((coord, pIdx) => {
                      const isChecked = checkedTasks[`${pet.id}-${selectedStageIdx}-${pIdx}`];
                      const pColor = isChecked ? "var(--app-success)" : stageColors[selectedStageIdx];
                      return (
                        <div 
                          key={pIdx}
                          className="absolute z-10 flex flex-col items-center"
                          style={{ top: coord.top, left: coord.left, transform: "translate(-50%, -50%)" }}
                        >
                          <div className="anatomy-dot relative flex items-center justify-center w-5 h-5 mb-1">
                             <span className={`absolute inline-flex h-full w-full rounded-full opacity-30 ${isChecked ? '' : 'animate-pulse'}`} style={{ backgroundColor: pColor }}></span>
                             <span className="relative inline-flex rounded-full w-3 h-3 shadow-md" style={{ backgroundColor: pColor }}></span>
                          </div>
                          
                          {/* 라벨 (항상 켜져 있음) */}
                           <div 
                             className="whitespace-nowrap px-1.5 py-0.5 rounded shadow-sm text-[9px] lg:text-[10px] font-bold transition-colors" 
                             style={{ 
                               backgroundColor: isChecked ? "var(--app-success)" : "white", 
                               color: isChecked ? "white" : pColor, 
                               border: isChecked ? "none" : `1px solid ${pColor}40` 
                             }}
                           >
                             {coord.label}
                           </div>
                        </div>
                      );
                    })}
                 </div>
              </div>
              
              {/* 하단 요약 설명 박스 */}
              <div className="w-full max-w-[800px] bg-white/70 rounded-xl p-4 border border-[#F0F0F0] mt-auto z-10 shrink-0">
                 <div className="flex gap-2">
                   <CheckCircle2 className="w-4 h-4 shrink-0 mt-[2px]" style={{ color: stageColors[selectedStageIdx] }} />
                   <p className="text-[12px] text-[#555] leading-relaxed font-medium">
                     {guide[selectedStageIdx].description}
                   </p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}