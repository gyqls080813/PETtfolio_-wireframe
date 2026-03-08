import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Trophy,
  Dog,
  Cat,
  PawPrint,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// 펫 커스텀 스티커 이미지
import pomeImg from "../../assets/pome.png";
import catImg from "../../assets/cat.png";
import pomeThumbsup from "../../assets/pome_thumbsup.png";
import pomeSad from "../../assets/pome_sad.png";
import catThumbsup from "../../assets/cat_thumbsup.png";
import catSad from "../../assets/cat_sad.png";

const getImgSrc = (img: any): string => typeof img === 'string' ? img : (img?.src || (img as string));

// ─── Per-pet expense data ───
const petExpenseData: Record<
  string,
  { name: string; value: number; color: string }[]
> = {
  초코: [
    { name: "사료", value: 120000, color: "var(--app-primary)" },
    { name: "병원/의료", value: 45000, color: "#EF4444" },
    { name: "미용", value: 50000, color: "#FD79A8" },
    { name: "간식", value: 20000, color: "var(--app-warning)" },
    { name: "용품", value: 18000, color: "#74B9FF" },
  ],
  나비: [
    { name: "사료", value: 69000, color: "var(--app-primary)" },
    { name: "병원/의료", value: 60000, color: "#EF4444" },
    { name: "약/영양제", value: 35000, color: "#FDCB6E" },
    { name: "간식", value: 12500, color: "var(--app-warning)" },
    { name: "용품", value: 15000, color: "#74B9FF" },
  ],
};

// Build "전체" by merging all pets
function buildAllExpenseData() {
  const merged: Record<string, { name: string; value: number; color: string }> = {};
  for (const petData of Object.values(petExpenseData)) {
    for (const item of petData) {
      if (merged[item.name]) {
        merged[item.name].value += item.value;
      } else {
        merged[item.name] = { ...item };
      }
    }
  }
  return Object.values(merged).sort((a, b) => b.value - a.value);
}
petExpenseData["전체"] = buildAllExpenseData();

// ─── Per-pet member contributions ───
const petMemberRank: Record<
  string,
  { name: string; expense: number; savings: number; rank: number }[]
> = {
  초코: [
    { name: "김집사", expense: 420000, savings: 200000, rank: 1 },
    { name: "이집사", expense: 158000, savings: 120000, rank: 2 },
    { name: "박집사", expense: 75000, savings: 50000, rank: 3 },
  ],
  나비: [
    { name: "이집사", expense: 89000, savings: 60000, rank: 1 },
    { name: "김집사", expense: 270000, savings: 150000, rank: 1 },
    { name: "박집사", expense: 48000, savings: 30000, rank: 3 },
  ],
};

// Recalculate ranks for 나비
petMemberRank["나비"] = petMemberRank["나비"]
  .sort((a, b) => b.expense - a.expense)
  .map((m, i) => ({ ...m, rank: i + 1 }));

// Build "전체" member rank
function buildAllMemberRank() {
  const merged: Record<string, { name: string; expense: number; savings: number }> = {};
  for (const petData of Object.values(petMemberRank)) {
    for (const m of petData) {
      if (merged[m.name]) {
        merged[m.name].expense += m.expense;
        merged[m.name].savings += m.savings;
      } else {
        merged[m.name] = { name: m.name, expense: m.expense, savings: m.savings };
      }
    }
  }
  return Object.values(merged)
    .sort((a, b) => b.expense - a.expense)
    .map((m, i) => ({ ...m, rank: i + 1 }));
}
petMemberRank["전체"] = buildAllMemberRank();

// ─── Per-pet breed comparison data ───
const petBreedData: Record<
  string,
  {
    pet: string;
    breed: string;
    icon: typeof Dog;
    iconColor: string;
    myExpense: number;
    avgExpense: number;
    stdDev: number;
    percentile: number;
    totalUsers: number;
  }[]
> = {
  초코: [
    {
      pet: "초코",
      breed: "말티즈 · 3세 · 강아지",
      icon: Dog,
      iconColor: "var(--app-warning)",
      myExpense: 253000,
      avgExpense: 220000,
      stdDev: 60000,
      percentile: 29,
      totalUsers: 3842,
    },
  ],
  나비: [
    {
      pet: "나비",
      breed: "코리안숏헤어 · 2세 · 고양이",
      icon: Cat,
      iconColor: "#FDCB6E",
      myExpense: 191500,
      avgExpense: 180000,
      stdDev: 45000,
      percentile: 40,
      totalUsers: 2156,
    },
  ],
  전체: [
    {
      pet: "마리당 평균",
      breed: "반려동물 2마리 · 전체 사육인 대상",
      icon: PawPrint,
      iconColor: "var(--app-primary)",
      myExpense: 222250,
      avgExpense: 185000,
      stdDev: 55000,
      percentile: 25,
      totalUsers: 12480,
    },
  ],
};

const budgetMap: Record<string, number> = {
  초코: 400000,
  나비: 300000,
  전체: 700000,
};

const pets = [
  { key: "전체", icon: PawPrint, color: "var(--app-primary)", type: "모든 반려동물" },
  { key: "초코", img: pomeImg, color: "var(--app-warning)", type: "강아지" },
  { key: "나비", img: catImg, color: "#FDCB6E", type: "고양이" },
];

export default function ReportPage() {
  const [period, setPeriod] = useState("month");
  const [selectedPet, setSelectedPet] = useState<string>("전체");

  const isCat = selectedPet === "나비" || selectedPet === "고양이";
  const rank1Img = isCat ? catThumbsup : pomeThumbsup;
  const rank2Img = isCat ? catImg : pomeImg;
  const rank3Img = isCat ? catSad : pomeSad;
  const donutData = useMemo(() => petExpenseData[selectedPet] ?? [], [selectedPet]);
  const totalExpense = useMemo(() => donutData.reduce((s, d) => s + d.value, 0), [donutData]);
  const memberRank = useMemo(() => petMemberRank[selectedPet] ?? [], [selectedPet]);
  const breedList = useMemo(() => petBreedData[selectedPet] ?? [], [selectedPet]);
  const budget = budgetMap[selectedPet] ?? 700000;

  // ── Mobile carousel state ──
  const mobileCardLabels = ["총 지출", "랭킹 · 상위 비교"];
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    setActiveCard(idx);
  }, []);

  const scrollTo = useCallback((idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: idx * el.clientWidth, behavior: "smooth" });
    setActiveCard(idx);
  }, []);

  useEffect(() => {
    scrollTo(0);
  }, [selectedPet, scrollTo]);

  // ── Shared card content ──
  const ExpenseCard = (
    <div className="bg-white rounded-2xl border border-[var(--app-border)] p-4 flex flex-col h-full">
      <div className="mb-1.5">
        <span className="text-[13px] text-[var(--app-text-tertiary)]">
          {selectedPet === "전체" ? "전체" : selectedPet} 이달 총 지출
        </span>
        <div className="text-[28px] text-[var(--app-text-main)] mt-0.5" style={{ fontWeight: 700, fontFamily: "'Nunito', sans-serif" }}>
          ₩{totalExpense.toLocaleString()}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-[11px] text-[var(--app-text-tertiary)]">예산</span>
          <div className="flex-1 bg-[#F5EDDF] rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all duration-700"
              style={{
                width: `${Math.min((totalExpense / budget) * 100, 100)}%`,
                background: "linear-gradient(90deg, var(--app-primary), var(--app-primary-dark))"
              }}
            />
          </div>
          <span className="text-[11px] text-[var(--app-text-sub)]" style={{ fontFamily: "'Nunito', sans-serif" }}>₩{budget.toLocaleString()}</span>
        </div>
        <div className="text-[12px] text-[var(--app-success)] mt-1">
          예산 대비 {Math.round((totalExpense / budget) * 100)}% 사용
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center pt-3 mt-2 border-t border-[var(--app-border)]">
        <div className="relative w-full flex justify-center mt-2 overflow-visible">
          <PieChart width={280} height={230}>
            <Pie
              data={donutData}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={70}
              dataKey="value"
              stroke="none"
              labelLine={false}
              label={({ cx, cy, midAngle, outerRadius, percent, name, fill }) => {
                const RADIAN = Math.PI / 180;
                const radius = outerRadius + 22; // push label outward
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);
                return percent > 0.05 ? (
                  <text
                    x={x}
                    y={y}
                    fill={fill} // use slice color
                    textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline="central"
                    fontSize="11"
                    fontWeight="600"
                  >
                    {`${name} ${(percent * 100).toFixed(0)}%`}
                  </text>
                ) : null;
              }}
            >
              {donutData.map((d, i) => (
                <Cell key={i} fill={d.color} />
              ))}
            </Pie>
          </PieChart>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            {selectedPet === "전체" ? (
              <PawPrint className="w-8 h-8 text-[var(--app-primary)]" strokeWidth={1.5} />
            ) : selectedPet === "초코" ? (
              <img src={getImgSrc(pomeImg)} alt="초코" className="w-10 h-10 object-contain drop-shadow-sm" />
            ) : (
              <img src={getImgSrc(catImg)} alt="나비" className="w-10 h-10 object-contain drop-shadow-sm" />
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const RankingCard = (
    <div className="bg-white rounded-2xl border border-[var(--app-border)] p-3 flex-1 min-h-0 flex flex-col">
      <h3 className="text-[13px] text-[var(--app-text-main)] mb-1" style={{ fontWeight: 600 }}>
        <Trophy className="w-3.5 h-3.5 inline mr-1 text-[#FDCB6E]" strokeWidth={1.5} />
        랭킹
      </h3>
      <div className="flex-1 flex justify-center items-end px-1 min-h-0">
        {memberRank.length >= 2 && (
          <div className="flex flex-col items-center z-10" style={{ marginRight: -6 }}>
            <span className="text-[12px] text-[#6B4F3A]" style={{ fontWeight: 600 }}>{memberRank[1].name}</span>
            <span className="text-[10px] text-[var(--app-text-tertiary)] mb-1" style={{ fontFamily: "'Nunito', sans-serif" }}>{(memberRank[1].expense + memberRank[1].savings).toLocaleString()}원</span>
            <div className="w-[90px] h-[56px] bg-[var(--app-primary-light)] rounded-t-xl flex flex-col items-center justify-center gap-0.5 relative mt-6">
              <img src={getImgSrc(rank2Img)} alt="평범" className="absolute -top-6 w-9 h-9 object-contain drop-shadow-sm z-10" />
              <div className="mt-2" />
              <div className="flex items-center gap-1 text-[9px]">
                <span className="text-[#EF4444]" style={{ fontWeight: 500 }}>지출</span>
                <span className="text-[var(--app-text-secondary)]" style={{ fontWeight: 600 }}>{memberRank[1].expense.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1 text-[9px]">
                <span className="text-[var(--app-success)]" style={{ fontWeight: 500 }}>저축</span>
                <span className="text-[var(--app-text-secondary)]" style={{ fontWeight: 600 }}>{memberRank[1].savings.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
        {memberRank.length >= 1 && (
          <div className="flex flex-col items-center z-20">
            <span className="text-[13px] text-[#6B4F3A]" style={{ fontWeight: 700 }}>{memberRank[0].name}</span>
            <span className="text-[10px] text-[var(--app-text-tertiary)] mb-1" style={{ fontFamily: "'Nunito', sans-serif" }}>{(memberRank[0].expense + memberRank[0].savings).toLocaleString()}원</span>
            <div
              className="w-[110px] h-[95px] rounded-t-xl flex flex-col items-center justify-center relative mt-7"
              style={{ background: "linear-gradient(to top, var(--app-primary), var(--app-primary-dark))" }}
            >
              <img src={getImgSrc(rank1Img)} alt="최고" className="absolute -top-8 w-12 h-12 object-contain drop-shadow-md z-10" />
              <div className="mt-2" />
              <span className="px-2 py-0.5 bg-white/20 text-white rounded-full text-[8px] mb-1" style={{ fontWeight: 600 }}>MASTER PAYER</span>
              <div className="flex items-center gap-1 text-[9px] mb-0.5">
                <span className="text-white/80" style={{ fontWeight: 500 }}>지출</span>
                <span className="text-white" style={{ fontWeight: 600 }}>{memberRank[0].expense.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1 text-[9px]">
                <span className="text-white/80" style={{ fontWeight: 500 }}>저축</span>
                <span className="text-white" style={{ fontWeight: 600 }}>{memberRank[0].savings.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
        {memberRank.length >= 3 && (
          <div className="flex flex-col items-center z-10" style={{ marginLeft: -6 }}>
            <span className="text-[12px] text-[#6B4F3A]" style={{ fontWeight: 600 }}>{memberRank[2].name}</span>
            <span className="text-[10px] text-[var(--app-text-tertiary)] mb-1" style={{ fontFamily: "'Nunito', sans-serif" }}>{(memberRank[2].expense + memberRank[2].savings).toLocaleString()}원</span>
            <div className="w-[80px] h-[38px] bg-[var(--app-primary-light)] rounded-t-xl flex flex-col items-center justify-center gap-0.5 relative mt-6">
              <img src={getImgSrc(rank3Img)} alt="슬픔" className="absolute -top-6 w-9 h-9 object-contain drop-shadow-sm z-10" />
              <div className="mt-2" />
              <div className="flex items-center gap-1 text-[9px]">
                <span className="text-[#EF4444]" style={{ fontWeight: 500 }}>지출</span>
                <span className="text-[var(--app-text-secondary)]" style={{ fontWeight: 600 }}>{memberRank[2].expense.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1 text-[9px]">
                <span className="text-[var(--app-success)]" style={{ fontWeight: 500 }}>저축</span>
                <span className="text-[var(--app-text-secondary)]" style={{ fontWeight: 600 }}>{memberRank[2].savings.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const BreedCard = (
    <>
      {breedList.map((item) => (
        <BreedDistribution key={item.pet} item={item} />
      ))}
    </>
  );

  return (
    <div className="space-y-3">
      {/* Pet Selector + Period */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2 overflow-x-auto">
          {pets.map((p) => (
            <button
              key={p.key}
              onClick={() => setSelectedPet(p.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[13px] transition-all shrink-0 ${selectedPet === p.key
                ? "bg-[var(--app-primary-light)] text-[#6B4F3A] border border-[var(--app-primary)]/40"
                : "bg-white text-[var(--app-text-tertiary)] border border-[var(--app-border)] hover:border-[var(--app-primary)]/30"
                }`}
              style={{ fontWeight: selectedPet === p.key ? 600 : 400 }}
            >
              {p.img ? (
                <img src={getImgSrc(p.img)} alt={p.key} className="w-5 h-5 object-contain opacity-90 grayscale-0 transition-all" style={{ filter: selectedPet === p.key ? 'none' : 'grayscale(100%) opacity(50%)' }} />
              ) : p.icon ? (
                <p.icon
                  className="w-4 h-4"
                  strokeWidth={1.5}
                  style={{ color: selectedPet === p.key ? p.color : "#D9C8B4" }}
                />
              ) : null}
              {p.key}
            </button>
          ))}
        </div>
        <select
          className="border border-[var(--app-border)] rounded-xl px-3 py-1.5 text-[13px] text-[var(--app-text-sub)] outline-none bg-[var(--app-bg-main)] appearance-none shrink-0 focus:border-[var(--app-primary)]"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option value="month">이번 달</option>
          <option value="3month">최근 3개월</option>
          <option value="6month">최근 6개월</option>
          <option value="year">연간</option>
        </select>
      </div>

      {/* ═══════════ Mobile: Swipe Carousel ═══════════ */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => scrollTo(Math.max(0, activeCard - 1))}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${activeCard > 0 ? "bg-[var(--app-primary-light)] text-[#6B4F3A]" : "text-[var(--app-border)]"
              }`}
            disabled={activeCard === 0}
          >
            <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
          </button>
          <span className="text-[13px] text-[var(--app-text-secondary)]" style={{ fontWeight: 600 }}>
            {mobileCardLabels[activeCard]}
          </span>
          <button
            onClick={() => scrollTo(Math.min(1, activeCard + 1))}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${activeCard < 1 ? "bg-[var(--app-primary-light)] text-[#6B4F3A]" : "text-[var(--app-border)]"
              }`}
            disabled={activeCard === 1}
          >
            <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
        >
          <div className="w-full shrink-0 snap-center px-0.5">{ExpenseCard}</div>
          <div className="w-full shrink-0 snap-center px-0.5 space-y-2.5">
            {RankingCard}
            {BreedCard}
          </div>
        </div>

        <div className="flex justify-center gap-1.5 mt-3">
          {mobileCardLabels.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`rounded-full transition-all ${activeCard === i
                ? "w-5 h-2 bg-[var(--app-primary)]"
                : "w-2 h-2 bg-[var(--app-border)]"
                }`}
            />
          ))}
        </div>
      </div>

      {/* ═══════════ Desktop: 2-column grid ═══════════ */}
      <div className="hidden md:grid md:grid-cols-[1fr_1fr] gap-3 md:items-stretch">
        {ExpenseCard}
        <div className="flex flex-col gap-2.5 h-full">
          {RankingCard}
          {BreedCard}
        </div>
      </div>
    </div>
  );
}

/* ─── Reusable sub-components ─── */

function BreedDistribution({
  item,
}: {
  item: {
    pet: string;
    breed: string;
    icon: typeof Dog;
    iconColor: string;
    myExpense: number;
    avgExpense: number;
    stdDev: number;
    percentile: number;
    totalUsers: number;
  };
}) {
  const points = 100;
  const curvePath: string[] = [];
  const areaPath: string[] = [];
  const svgWidth = 500;
  const svgHeight = 120;
  const padding = 40;
  const chartWidth = svgWidth - padding * 2;
  const zMin = -3;
  const zMax = 3;
  const myZ = (item.myExpense - item.avgExpense) / item.stdDev;
  const myX = padding + ((myZ - zMin) / (zMax - zMin)) * chartWidth;

  for (let i = 0; i <= points; i++) {
    const z = zMin + (i / points) * (zMax - zMin);
    const y = Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI);
    const x = padding + (i / points) * chartWidth;
    const yPos = svgHeight - 20 - y * (svgHeight - 40) * 2.2;
    if (i === 0) {
      curvePath.push(`M ${x} ${yPos}`);
      areaPath.push(`M ${x} ${svgHeight - 20}`);
      areaPath.push(`L ${x} ${yPos}`);
    } else {
      curvePath.push(`L ${x} ${yPos}`);
      areaPath.push(`L ${x} ${yPos}`);
    }
  }
  areaPath.push(`L ${padding + chartWidth} ${svgHeight - 20} Z`);

  const percentileZ = zMin + ((100 - item.percentile) / 100) * (zMax - zMin);
  const shadedPath: string[] = [];
  for (let i = 0; i <= points; i++) {
    const z = zMin + (i / points) * (zMax - zMin);
    if (z > percentileZ) break;
    const y = Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI);
    const x = padding + (i / points) * chartWidth;
    const yPos = svgHeight - 20 - y * (svgHeight - 40) * 2.2;
    if (shadedPath.length === 0) {
      shadedPath.push(`M ${padding} ${svgHeight - 20}`);
      shadedPath.push(`L ${x} ${yPos}`);
    } else {
      shadedPath.push(`L ${x} ${yPos}`);
    }
  }
  const endShadedX = padding + ((percentileZ - zMin) / (zMax - zMin)) * chartWidth;
  shadedPath.push(`L ${endShadedX} ${svgHeight - 20} Z`);

  const isAboveAvg = item.myExpense > item.avgExpense;

  return (
    <div className="bg-white rounded-2xl border border-[var(--app-border)] p-3 flex-1 min-h-0 flex flex-col justify-between">
      {/* Percentile badge */}
      <div className="flex items-center justify-end mb-1">
        <span
          className={`px-2.5 py-0.5 rounded-full text-[12px] ${isAboveAvg ? "bg-[#EF4444]/10 text-[#EF4444]" : "bg-[var(--app-success)]/10 text-[var(--app-success)]"
            }`}
          style={{ fontWeight: 600 }}
        >
          상위 {item.percentile}%
        </span>
      </div>

      {/* SVG curve */}
      <div className="relative flex-1 min-h-0 flex items-center justify-center">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight + 25}`} className="w-full" style={{ maxHeight: 110 }}>
          <path d={areaPath.join(" ")} fill="var(--app-bg-secondary)" />
          <path d={shadedPath.join(" ")} fill="var(--app-primary)" opacity="0.2" />
          <path d={curvePath.join(" ")} fill="none" stroke="var(--app-primary)" strokeWidth="2.5" />
          <line
            x1={padding + chartWidth / 2}
            y1={10}
            x2={padding + chartWidth / 2}
            y2={svgHeight - 20}
            stroke="var(--app-border)"
            strokeDasharray="4 3"
            strokeWidth="1"
          />
          <text x={padding + chartWidth / 2} y={svgHeight - 4} textAnchor="middle" fill="#D9C8B4" fontSize="11">
            평균 ₩{(item.avgExpense / 10000).toFixed(0)}만
          </text>
          <line x1={myX} y1={10} x2={myX} y2={svgHeight - 20} stroke="var(--app-primary)" strokeWidth="2" />
          <circle cx={myX} cy={18} r="5" fill="var(--app-primary)" />
          <rect x={myX - 40} y={0} width="80" height="22" rx="11" fill="var(--app-primary)" />
          <text x={myX} y={15} textAnchor="middle" fill="white" fontSize="11" fontWeight="600">
            나 ₩{(item.myExpense / 10000).toFixed(1)}만
          </text>
          <text x={padding} y={svgHeight + 16} textAnchor="middle" fill="#D9C8B4" fontSize="10">적음</text>
          <text x={padding + chartWidth} y={svgHeight + 16} textAnchor="middle" fill="#D9C8B4" fontSize="10">많음</text>
        </svg>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 mt-2">
        <div className="text-center py-1.5 px-1 bg-[var(--app-bg-main)] rounded-xl">
          <div className="text-[10px] text-[var(--app-text-tertiary)]">내 지출</div>
          <div className="text-[13px] text-[var(--app-primary)] mt-0.5" style={{ fontWeight: 600, fontFamily: "'Nunito', sans-serif" }}>
            ₩{item.myExpense.toLocaleString()}
          </div>
        </div>
        <div className="text-center py-1.5 px-1 bg-[var(--app-bg-main)] rounded-xl">
          <div className="text-[10px] text-[var(--app-text-tertiary)]">평균</div>
          <div className="text-[13px] text-[var(--app-text-secondary)] mt-0.5" style={{ fontWeight: 600, fontFamily: "'Nunito', sans-serif" }}>
            ₩{item.avgExpense.toLocaleString()}
          </div>
        </div>
        <div className="text-center py-1.5 px-1 bg-[var(--app-bg-main)] rounded-xl">
          <div className="text-[10px] text-[var(--app-text-tertiary)]">비교 대상</div>
          <div className="text-[13px] text-[var(--app-text-secondary)] mt-0.5" style={{ fontWeight: 600, fontFamily: "'Nunito', sans-serif" }}>
            {item.totalUsers.toLocaleString()}명
          </div>
        </div>
      </div>
    </div>
  );
}