import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  Dog,
  Cat,
  HeartPulse,
  Info,
  CheckCircle2,
  CalendarDays
} from "lucide-react";
import pome from "../../assets/pome.png";
import catImg from "../../assets/cat-character.png";

const getImgSrc = (img: any): string => typeof img === 'string' ? img : (img?.src || (img as string));

/* ───────────── 반려동물 데이터 ───────────── */
const pets = [
  { id: "choco", name: "초코", icon: Dog, color: "var(--app-primary)", breed: "말티즈", age: 3, img: pome },
  { id: "nabi", name: "나비", icon: Cat, color: "var(--app-success)", breed: "코리안숏헤어", age: 7, img: catImg },
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

  /* 현재 나이에 해당하는 stage index 찾기 */
  const currentStageIdx = activePet === "choco" ? 1 : 2; // 초코=청년기, 나비=중년기

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

         {/* 오른쪽: 생애주기별 규칙 기반 리스트 (새로운 가이드 레이아웃) */}
        <div className="bg-white rounded-xl border border-[var(--app-border)] flex-1 flex flex-col lg:h-full min-h-[400px] lg:min-h-0 overflow-hidden shadow-sm">
          {/* 상단 타이틀 */}
          <div className="flex items-center gap-2 px-5 pt-5 pb-3 shrink-0 border-b border-[var(--app-bg-secondary)]">
            <HeartPulse className="w-4 h-4 text-[var(--app-primary-dark)]" />
            <h3 className="text-[15px] lg:text-[15px] text-[#222]" style={{ fontWeight: 700 }}>
              {pet.name} 생애주기 맞춤 정보
            </h3>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar bg-[var(--app-bg-secondary)] p-4 space-y-4">
            {guide.map((stage, idx) => (
               <div 
                 key={idx} 
                 className={`flex flex-col bg-white rounded-2xl p-4 border transition-shadow ${currentStageIdx === idx ? 'border-[var(--app-primary)] shadow-md relative' : 'border-[#EAEAEA] shadow-sm'}`}
               >
                 {currentStageIdx === idx && (
                    <div className="absolute top-4 right-4 bg-[var(--app-primary)] text-white px-2.5 py-1 rounded-full text-[10px] font-bold shadow-sm">
                      현재 단계
                    </div>
                 )}
                 <div className="flex items-center gap-3 mb-3">
                   <div 
                     className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                     style={{ background: `${stageColors[idx]}20` }}
                   >
                      <CalendarDays className="w-5 h-5" style={{ color: stageColors[idx] }} />
                   </div>
                   <div>
                     <h4 className="text-[14px] text-[#222]" style={{ fontWeight: 700 }}>
                       {stage.stage} <span className="text-[11px] text-[#888] font-normal ml-1 border border-[#DDD] rounded px-1.5 py-0.5">{stage.ageRange}</span>
                     </h4>
                     <p className="text-[11px] text-[#6B4F3A] mt-0.5 font-bold">{stage.title}</p>
                   </div>
                 </div>

                 <div className="bg-[#FAF9F6] p-3 rounded-xl border border-[#F2EFE9] mb-3">
                    <p className="text-[12px] text-[#555] leading-relaxed">
                      {stage.description}
                    </p>
                 </div>
                 
                 <ul className="space-y-1.5 px-1">
                   {stage.points.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2 text-[12px] text-[#444] leading-snug">
                         <CheckCircle2 className="w-3.5 h-3.5 text-[var(--app-primary)] shrink-0 mt-[1.5px]" />
                         <span>{point}</span>
                      </li>
                   ))}
                 </ul>
               </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}