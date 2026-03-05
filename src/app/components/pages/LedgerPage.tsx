import { useState, useRef } from "react";
import { motion } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Camera,
  Filter,
  List,
  CalendarDays,
  Tag,
  ChevronDown,
  X,
} from "lucide-react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  Tooltip,
  LabelList,
} from "recharts";

const categories = [
  { name: "사료", color: "#6C5CE7" },
  { name: "간식", color: "#E17055" },
  { name: "위생/소모품", color: "#00B894" },
  { name: "병원/의료", color: "#FF6B6B" },
  { name: "약/영양제", color: "#FDCB6E" },
  { name: "미용", color: "#FD79A8" },
  { name: "용품", color: "#74B9FF" },
  { name: "돌봄/서비스", color: "#A29BFE" },
  { name: "보험/저축", color: "#55EFC4" },
  { name: "기타", color: "#B2BEC3" },
];

const transactions = [
  { date: "03/04", cat: "사료", desc: "오리젠 퍼피", amount: "89,000", type: "auto", pet: "초코" },
  { date: "03/03", cat: "병원/의료", desc: "정기 검진", amount: "45,000", type: "manual", pet: "나비" },
  { date: "03/02", cat: "간식", desc: "져키 간식", amount: "12,500", type: "auto", pet: "초코" },
  { date: "03/01", cat: "미용", desc: "목욕 + 미용", amount: "50,000", type: "manual", pet: "초코" },
  { date: "02/28", cat: "약/영양제", desc: "관절 영양제", amount: "35,000", type: "auto", pet: "나비" },
  { date: "02/27", cat: "용품", desc: "신규 장난감", amount: "18,000", type: "manual", pet: "초코" },
];

const cashFlowData = [
  { date: "10/13", savings: 2500000, expense: 0, balance: 2500000 },
  { date: "10/15", savings: 2150000, expense: 0, balance: 2150000 },
  { date: "10/25", savings: 50000, expense: 0, balance: 50000 },
  { date: "10/28", savings: 0, expense: -160000, balance: -160000 },
  { date: "10/30", savings: 0, expense: -300000, balance: -300000 },
];

const daysInMonth = 31;
const startDay = 6;

export default function LedgerPage() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);

  const topCategories = [
    { id: 1, name: "사료", size: 110, top: "15%", left: "32%", color: "#6C5CE7", sizeText: 20 },
    { id: 2, name: "병원/의료", size: 95, top: "52%", left: "62%", color: "#FF6B6B", sizeText: 17 },
    { id: 3, name: "간식", size: 85, top: "75%", left: "38%", color: "#E17055", sizeText: 16 },
    { id: 4, name: "용품", size: 80, top: "60%", left: "15%", color: "#74B9FF", sizeText: 15 },
    { id: 5, name: "미용", size: 75, top: "22%", left: "68%", color: "#FD79A8", sizeText: 14 },
  ];

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < startDay; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  const calData: Record<number, { exp?: number; inc?: number }> = {
    1: { exp: 1200 }, 2: { exp: 20000, inc: 2530688 }, 3: { exp: 100000, inc: 2 },
    5: { exp: 4999 }, 6: { exp: 102110 },
    8: { exp: 326000 }, 9: { inc: 10000 }, 10: { exp: 17000 }, 11: { exp: 2400 }, 12: { inc: 11000 }, 13: { exp: 6000 }, 14: { exp: 22000 },
    15: { exp: 14200 }, 16: { exp: 30000 }, 17: { inc: 103507 }, 18: { inc: 2 }, 19: { exp: 54842, inc: 5400 }, 20: { exp: 126484 }, 21: { exp: 10000 },
    22: { exp: 14000 }, 23: { exp: 14000 }, 24: { inc: 50460 }, 25: { exp: 6500 }, 26: { exp: 110000 }, 27: { exp: 49390, inc: 24500 }, 28: { inc: 9500 },
    29: { exp: 2900 }, 31: { exp: 5300, inc: 1000 },
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-5 items-stretch">
        {/* ═══ Left Column: Calendar Box ═══ */}
        <div className="bg-white rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col h-full relative">
          {/* Header */}
          <div className="px-5 pt-4">
            <h2 className="text-[18px] font-bold text-[#222] flex items-center gap-1.5 mb-3">
              12월 내 소비
              <ChevronDown className="w-5 h-5 text-[#888]" />
            </h2>



            {/* Summary */}
            <div className="py-3 border-b border-[#F0F0F5] flex justify-between items-center">
              <div>
                <div className="flex items-center gap-4 mb-1">
                  <span className="text-[13px] text-[#555] w-8">소비</span>
                  <span className="text-[17px] font-bold text-[#222]">1,625,560 원</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[13px] text-[#555] w-8">저금</span>
                  <span className="text-[17px] font-bold text-[#147BCE]">2,746,059 원</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#AAA]" />
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="px-5 pb-4 pt-2 flex-1 flex flex-col">
            <div className="grid grid-cols-7 text-center mb-1">
              {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
                <div key={d} className="text-[13px] text-[#999] font-medium py-2">{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 text-center gap-y-1.5 flex-1 content-start">
              {calendarDays.map((day, i) => (
                <div
                  key={i}
                  className={`min-h-[46px] flex flex-col items-center rounded-xl transition-colors ${day ? "cursor-pointer hover:bg-black/5" : ""}`}
                  onClick={() => day && setSelectedDay(day)}
                >
                  {day && (
                    <>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] ${day === 31
                        ? "bg-[#E6F0FF] text-[#147BCE] font-bold"
                        : "text-[#333]"
                        }`}>
                        {day}
                      </div>

                      {/* Daily amounts */}
                      <div className="mt-0.5 space-y-[1px]">
                        {calData[day]?.exp && (
                          <div className="text-[10px] text-[#888] font-medium leading-none">
                            -{calData[day].exp.toLocaleString()}
                          </div>
                        )}
                        {calData[day]?.inc && (
                          <div className="text-[10px] text-[#147BCE] font-medium leading-none">
                            +{calData[day].inc.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Button */}
            <div className="mt-2 text-center">
              <button className="px-5 py-2 bg-[#F0F5FD] text-[#147BCE] rounded-xl text-[13px] font-medium hover:bg-[#E3EDFA] transition-colors">
                11월 달력 확인하기
              </button>
            </div>
          </div>

          {/* Daily Details Modal */}
          {selectedDay !== null && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50 p-5 backdrop-blur-sm" onClick={(e) => e.target === e.currentTarget && setSelectedDay(null)}>
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
              >
                <div className="flex justify-between items-center p-5 border-b border-[#F0F0F5]">
                  <h3 className="text-[18px] font-bold text-[#222]">
                    12월 {selectedDay}일 상세 내역
                  </h3>
                  <button onClick={() => setSelectedDay(null)} className="text-[#888] hover:text-[#222]">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="p-5 flex-1 overflow-y-auto">
                  {/* 소비 내역 */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-[15px] font-bold text-[#FF6B6B]">소비 내역</h4>
                      <span className="text-[14px] font-semibold text-[#FF6B6B]">
                        -{calData[selectedDay as number]?.exp?.toLocaleString() || 0}원
                      </span>
                    </div>
                    {calData[selectedDay as number]?.exp ? (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center bg-[#F8F9FA] p-3 rounded-xl border border-[#F0F0F5]">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[18px] shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
                              🛒
                            </div>
                            <div>
                              <div className="text-[14px] font-bold text-[#222]">지출</div>
                              <div className="text-[12px] text-[#888]">오후 2:30</div>
                            </div>
                          </div>
                          <div className="text-[15px] font-bold text-[#222]">
                            {calData[selectedDay as number]?.exp?.toLocaleString()}원
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-[13px] text-[#888] text-center py-5 bg-[#F8F9FA] rounded-xl border border-[#F0F0F5] border-dashed">소비 내역이 없습니다.</p>
                    )}
                  </div>

                  {/* 저금 내역 */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-[15px] font-bold text-[#147BCE]">저금 내역</h4>
                      <span className="text-[14px] font-semibold text-[#147BCE]">
                        +{calData[selectedDay as number]?.inc?.toLocaleString() || 0}원
                      </span>
                    </div>
                    {calData[selectedDay as number]?.inc ? (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center bg-[#F8F9FA] p-3 rounded-xl border border-[#F0F0F5]">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[18px] shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
                              💰
                            </div>
                            <div>
                              <div className="text-[14px] font-bold text-[#222]">수입/저축</div>
                              <div className="text-[12px] text-[#888]">오전 10:00</div>
                            </div>
                          </div>
                          <div className="text-[15px] font-bold text-[#222]">
                            {calData[selectedDay as number]?.inc?.toLocaleString()}원
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-[13px] text-[#888] text-center py-5 bg-[#F8F9FA] rounded-xl border border-[#F0F0F5] border-dashed">저금 내역이 없습니다.</p>
                    )}
                  </div>
                </div>

                <div className="p-4 border-t border-[#F0F0F5] bg-gray-50 flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedDay(null);
                      setShowAdd(true);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#6C5CE7] text-white rounded-xl font-bold text-[15px] hover:bg-[#5A4BDE] shadow-md shadow-[#6C5CE7]/20 transition-all active:scale-[0.98]"
                  >
                    <Plus className="w-5 h-5" />
                    소비 내역 추가
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {/* Add Modal */}
          {showAdd && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50 p-5 backdrop-blur-sm" onClick={(e) => e.target === e.currentTarget && setShowAdd(false)}>
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
              >
                <div className="flex justify-between items-center p-5 border-b border-[#F0F0F5]">
                  <h3 className="text-[18px] font-bold text-[#222]">소비 내역 추가</h3>
                  <button onClick={() => setShowAdd(false)} className="text-[#888] hover:text-[#222]">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="p-5 space-y-5 overflow-y-auto">
                  <div>
                    <label className="block text-[13px] font-bold text-[#555] mb-2">금액</label>
                    <div className="relative">
                      <input type="text" placeholder="0" className="w-full p-3.5 rounded-xl bg-[#F8F9FA] border border-[#EEE] focus:outline-none focus:border-[#6C5CE7] focus:bg-white text-right font-bold text-[18px] transition-colors pr-8" />
                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 font-bold text-[#888]">원</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-[#555] mb-2">카테고리</label>
                    <div className="grid grid-cols-4 gap-2">
                      {categories.slice(0, 8).map(c => (
                        <button key={c.name} className="py-2.5 px-1 text-[12px] font-medium rounded-xl bg-[#F8F9FA] text-[#555] border border-[#EEE] hover:border-[#6C5CE7] hover:bg-[rgba(108,92,231,0.05)] hover:text-[#6C5CE7] transition-colors flex flex-col items-center justify-center gap-1">
                          {c.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-[#555] mb-2">내용</label>
                    <input type="text" placeholder="어디서 사용했나요?" className="w-full p-3.5 rounded-xl bg-[#F8F9FA] border border-[#EEE] focus:outline-none focus:border-[#6C5CE7] focus:bg-white transition-colors text-[14px]" />
                  </div>
                </div>

                <div className="p-4 border-t border-[#F0F0F5] bg-gray-50">
                  <button
                    onClick={() => setShowAdd(false)}
                    className="w-full py-4 bg-[#6C5CE7] text-white rounded-xl font-bold text-[16px] hover:bg-[#5A4BDE] shadow-md shadow-[#6C5CE7]/30 transition-all active:scale-[0.98]"
                  >
                    저장하기
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </div>

        {/* ═══ Right Column: Charts ═══ */}
        <div className="flex flex-col gap-5 h-full">
          {/* Top Right: Cash Flow Chart (Using existing chart component but framed elegantly) */}
          <div className="bg-white rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[17px] font-bold text-[#222]">분석 보기</h3>
              <button className="text-[12px] text-[#888] flex items-center gap-0.5">
                통계보기 <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="h-[160px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={cashFlowData} margin={{ top: 10, right: 0, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F5" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#888" }} axisLine={false} tickLine={false} dy={10} />
                  <YAxis tick={{ fontSize: 10, fill: "#AAA" }} axisLine={false} tickLine={false} tickFormatter={(v) => v === 0 ? "0" : `${(v / 1000000).toFixed(1)}M`} />
                  <Tooltip
                    contentStyle={{ fontSize: 11, borderRadius: 10, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                    formatter={(value: number, name: string) => {
                      const label = name === "savings" ? "저금" : name === "expense" ? "소비" : "잔고";
                      return [`₩${Math.abs(value).toLocaleString()}`, label];
                    }}
                  />
                  <Bar dataKey="savings" fill="#6C5CE7" radius={[5, 5, 0, 0]} barSize={16} stackId="stack" />
                  <Bar dataKey="expense" fill="#D8D3F5" radius={[0, 0, 5, 5]} barSize={16} stackId="stack" />
                  <Line type="monotone" dataKey="balance" stroke="#999" strokeWidth={1.5} strokeDasharray="4 4" dot={{ r: 3, fill: "#fff", stroke: "#999", strokeWidth: 2 }} activeDot={{ r: 5, fill: "#6C5CE7", stroke: "#fff", strokeWidth: 2 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bottom Right: Transaction Frequency Top 5 Bubble Chart */}
          <div className="bg-white rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5 flex flex-col flex-1 min-h-0">
            <h3 className="text-[17px] font-bold text-[#222] mb-4">카테고리별 분포 (Top 5)</h3>

            <div ref={constraintsRef} className="relative w-full max-w-[280px] aspect-square mx-auto flex-1 min-h-0 my-2">
              {topCategories.map((cat, i) => (
                <motion.div
                  key={cat.id}
                  drag
                  dragConstraints={constraintsRef}
                  whileDrag={{ scale: 1.1, zIndex: 50, cursor: "grabbing" }}
                  whileHover={{ scale: 1.05 }}
                  className="absolute bg-white rounded-full flex flex-col items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.06)] cursor-grab"
                  style={{
                    width: cat.size,
                    height: cat.size,
                    top: cat.top,
                    left: cat.left,
                    border: `2px solid ${cat.color}20`,
                    zIndex: 10 + i,
                  }}
                >
                  <span
                    className="font-bold tracking-tight"
                    style={{ color: cat.color, fontSize: cat.sizeText }}
                  >
                    {cat.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}