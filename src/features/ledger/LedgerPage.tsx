import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
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
  PlusCircle,
  Receipt,
  Pencil,
  Check,
  Search,
  CreditCard,
  ArrowUpRight,
} from "lucide-react";
import SwipeCarousel from "../../shared/components/SwipeCarousel";
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

// 펫 스티커 이미지
import stickerThumbsup from "../../assets/pome_thumbsup.png";
import stickerSad from "../../assets/pome_sad.png";
import stickerEating from "../../assets/pome_eating.png";
import stickerGrooming from "../../assets/pome_grooming.png";
import stickerHospital from "../../assets/pome_hospital.png";
import stickerSnack from "../../assets/pome_snack.png";
import stickerToys from "../../assets/pome_toys.png";

// 고양이 스티커 이미지
import catThumbsup from "../../assets/cat_thumbsup.png";
import catSad from "../../assets/cat_sad.png";
import catEating from "../../assets/cat_eating.png";
import catGrooming from "../../assets/cat_grooming.png";
import catHospital from "../../assets/cat_hospital.png";
import catSnack from "../../assets/cat_snack.png";
import catToys from "../../assets/cat_toys.png";

import PetAvatar from "../../shared/components/figma/PetAvatar";

const getImgSrc = (img: any) => typeof img === 'string' ? img : img?.src || img;

const categories = [
  { name: "사료", color: "var(--app-primary)" },
  { name: "간식", color: "var(--app-warning)" },
  { name: "위생/소모품", color: "var(--app-success)" },
  { name: "병원/의료", color: "#EF4444" },
  { name: "약/영양제", color: "#FDCB6E" },
  { name: "미용", color: "#FD79A8" },
  { name: "용품", color: "#74B9FF" },
  { name: "돌봄/서비스", color: "var(--app-primary-dark)" },
  { name: "보험/저축", color: "#8B5CF6" },
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

// ═══ 카드 데이터 (거래 내역 + 품목별 하위 항목) ═══
type SubItem = { label: string; amount: number; category: string };
type CardTransaction = {
  id: number; date: string; time: string; store: string; amount: number;
  category: string; isPet: boolean; pets: string[];
  subItems: SubItem[];
};
type Card = { id: number; alias: string; company: string; color: string; transactions: CardTransaction[] };

const cardList: Card[] = [
  {
    id: 1, alias: "토스 체크카드", company: "토스뱅크", color: "#3182F6",
    transactions: [
      // 12.01
      { id: 1, date: "12.01", time: "17:00", store: "미용실 멍멍이", amount: 50000, category: "미용", isPet: true, pets: ["초코"], subItems: [
        { label: "전체 미용", amount: 35000, category: "미용" },
        { label: "발톱 손질", amount: 10000, category: "미용" },
        { label: "귀 청소", amount: 5000, category: "미용" },
      ] },
      // 12.02
      { id: 2, date: "12.02", time: "15:20", store: "쿠팡", amount: 12500, category: "간식", isPet: true, pets: ["초코"], subItems: [
        { label: "저키 세트", amount: 8500, category: "간식" },
        { label: "덴탈껌", amount: 4000, category: "간식" },
      ] },
      // 12.03
      { id: 3, date: "12.03", time: "18:15", store: "동물병원", amount: 150000, category: "병원/의료", isPet: true, pets: ["초코"], subItems: [
        { label: "진료비", amount: 30000, category: "병원/의료" },
        { label: "혈액검사", amount: 50000, category: "병원/의료" },
        { label: "약 처방", amount: 70000, category: "병원/의료" },
      ] },
      { id: 4, date: "12.03", time: "12:30", store: "배달의민족", amount: 18500, category: "음식", isPet: false, pets: [], subItems: [
        { label: "치킨", amount: 18500, category: "음식" },
      ] },
      // 12.05
      { id: 5, date: "12.05", time: "14:23", store: "펫프렌즈", amount: 45000, category: "사료", isPet: true, pets: ["초코"], subItems: [
        { label: "오리젠 사료 1kg", amount: 32000, category: "사료" },
        { label: "습식 사료 캔 (3개)", amount: 13000, category: "사료" },
      ] },
      { id: 6, date: "12.05", time: "11:05", store: "스타벅스", amount: 6500, category: "카페", isPet: false, pets: [], subItems: [
        { label: "아메리카노", amount: 4500, category: "카페" },
        { label: "마들렌", amount: 2000, category: "카페" },
      ] },
      // 12.06
      { id: 7, date: "12.06", time: "20:10", store: "쿠팡", amount: 62110, category: "사료", isPet: true, pets: ["초코", "나비"], subItems: [
        { label: "로얄캐닌 4kg", amount: 52110, category: "사료" },
        { label: "캣 캔 (5개)", amount: 10000, category: "사료" },
      ] },
      { id: 8, date: "12.06", time: "22:00", store: "편의점", amount: 5000, category: "기타", isPet: false, pets: [], subItems: [
        { label: "음료수", amount: 2000, category: "기타" },
        { label: "과자", amount: 3000, category: "기타" },
      ] },
      // 12.08
      { id: 9, date: "12.08", time: "10:00", store: "동물병원", amount: 250000, category: "병원/의료", isPet: true, pets: ["초코"], subItems: [
        { label: "수술비", amount: 180000, category: "병원/의료" },
        { label: "입원비", amount: 50000, category: "병원/의료" },
        { label: "약 처방", amount: 20000, category: "병원/의료" },
      ] },
      { id: 10, date: "12.08", time: "09:30", store: "택시", amount: 31000, category: "기타", isPet: false, pets: [], subItems: [
        { label: "택시비 (병원)", amount: 31000, category: "기타" },
      ] },
      // 12.09
      { id: 11, date: "12.09", time: "10:00", store: "약국", amount: 17000, category: "약/영양제", isPet: true, pets: ["초코"], subItems: [
        { label: "소염진통제", amount: 12000, category: "약/영양제" },
        { label: "연고", amount: 5000, category: "약/영양제" },
      ] },
      // 12.12
      { id: 12, date: "12.12", time: "14:00", store: "쿠팡", amount: 11000, category: "위생/소모품", isPet: true, pets: ["초코", "나비"], subItems: [
        { label: "배변패드 50매", amount: 8000, category: "위생/소모품" },
        { label: "물티슈", amount: 3000, category: "위생/소모품" },
      ] },
      // 12.14
      { id: 13, date: "12.14", time: "14:00", store: "오리젠 쇼핑몰", amount: 22000, category: "사료", isPet: true, pets: ["초코"], subItems: [
        { label: "사료 리필 1kg", amount: 22000, category: "사료" },
      ] },
      // 12.17
      { id: 14, date: "12.17", time: "09:00", store: "펫보험", amount: 15000, category: "보험/저축", isPet: true, pets: ["초코"], subItems: [
        { label: "월 보험료 (초코)", amount: 15000, category: "보험/저축" },
      ] },
      // 12.19
      { id: 15, date: "12.19", time: "16:00", store: "펫샵", amount: 15000, category: "간식", isPet: true, pets: ["초코"], subItems: [
        { label: "수제 간식 세트", amount: 15000, category: "간식" },
      ] },
      // 12.20
      { id: 16, date: "12.20", time: "10:00", store: "동물병원", amount: 80000, category: "병원/의료", isPet: true, pets: ["초코", "나비"], subItems: [
        { label: "초코 정기검진", amount: 40000, category: "병원/의료" },
        { label: "나비 정기검진", amount: 40000, category: "병원/의료" },
      ] },
      { id: 17, date: "12.20", time: "11:30", store: "약국", amount: 28000, category: "약/영양제", isPet: true, pets: ["초코"], subItems: [
        { label: "관절 영양제", amount: 18000, category: "약/영양제" },
        { label: "유산균", amount: 10000, category: "약/영양제" },
      ] },
      // 12.22
      { id: 18, date: "12.22", time: "14:00", store: "미용실", amount: 14000, category: "미용", isPet: true, pets: ["초코"], subItems: [
        { label: "전체 미용", amount: 14000, category: "미용" },
      ] },
      // 12.24
      { id: 19, date: "12.24", time: "18:00", store: "펫프렌즈", amount: 38460, category: "사료", isPet: true, pets: ["초코", "나비"], subItems: [
        { label: "로얄캐닌 미니 인도어 2kg", amount: 28460, category: "사료" },
        { label: "캣 사료 500g", amount: 10000, category: "사료" },
      ] },
      { id: 20, date: "12.24", time: "20:00", store: "쿠팡", amount: 12000, category: "용품", isPet: true, pets: ["초코"], subItems: [
        { label: "크리스마스 반다나", amount: 5000, category: "용품" },
        { label: "장난감 뼈다귀", amount: 7000, category: "용품" },
      ] },
      // 12.27
      { id: 21, date: "12.27", time: "20:00", store: "쿠팡", amount: 24890, category: "간식", isPet: true, pets: ["초코", "나비"], subItems: [
        { label: "져키 대용량", amount: 15890, category: "간식" },
        { label: "동결 건조 간식", amount: 9000, category: "간식" },
      ] },
      // 12.29
      { id: 22, date: "12.29", time: "22:00", store: "편의점", amount: 2900, category: "간식", isPet: true, pets: ["초코"], subItems: [
        { label: "강아지 간식", amount: 2900, category: "간식" },
      ] },
      // 12.31
      { id: 23, date: "12.31", time: "13:00", store: "미용실", amount: 5300, category: "미용", isPet: true, pets: ["초코"], subItems: [
        { label: "발톱 정리", amount: 5300, category: "미용" },
      ] },
    ],
  },
  {
    id: 2, alias: "삼성카드", company: "삼성카드", color: "#1428A0",
    transactions: [
      // 12.01
      { id: 101, date: "12.01", time: "08:30", store: "이마트", amount: 18000, category: "위생/소모품", isPet: true, pets: ["초코", "나비"], subItems: [
        { label: "강아지 패드", amount: 12000, category: "위생/소모품" },
        { label: "물티슈 (대용량)", amount: 6000, category: "위생/소모품" },
      ] },
      // 12.02
      { id: 102, date: "12.02", time: "11:30", store: "다이소", amount: 7500, category: "용품", isPet: true, pets: ["나비"], subItems: [
        { label: "장난감 공", amount: 3500, category: "용품" },
        { label: "스크래쳐", amount: 4000, category: "용품" },
      ] },
      // 12.03
      { id: 103, date: "12.03", time: "09:45", store: "네이버쇼핑", amount: 23000, category: "용품", isPet: true, pets: ["초코", "나비"], subItems: [
        { label: "노즈워크 매트", amount: 15000, category: "용품" },
        { label: "장난감 뼈다귀", amount: 8000, category: "용품" },
      ] },
      // 12.05
      { id: 104, date: "12.05", time: "09:15", store: "동물병원", amount: 60000, category: "병원/의료", isPet: true, pets: ["나비"], subItems: [
        { label: "종합 예방접종", amount: 45000, category: "병원/의료" },
        { label: "심장사상충 검사", amount: 15000, category: "병원/의료" },
      ] },
      // 12.06
      { id: 105, date: "12.06", time: "10:00", store: "약국", amount: 35000, category: "약/영양제", isPet: true, pets: ["초코"], subItems: [
        { label: "심장사상충 약", amount: 25000, category: "약/영양제" },
        { label: "유산균", amount: 10000, category: "약/영양제" },
      ] },
      // 12.08
      { id: 106, date: "12.08", time: "15:00", store: "약국", amount: 45000, category: "약/영양제", isPet: true, pets: ["초코"], subItems: [
        { label: "소염진통제", amount: 25000, category: "약/영양제" },
        { label: "항생제", amount: 20000, category: "약/영양제" },
      ] },
      // 12.10
      { id: 107, date: "12.10", time: "16:40", store: "마이펫방", amount: 17000, category: "용품", isPet: true, pets: ["나비"], subItems: [
        { label: "고양이 해먹", amount: 12000, category: "용품" },
        { label: "캣닢", amount: 5000, category: "용품" },
      ] },
      // 12.13
      { id: 108, date: "12.13", time: "12:00", store: "네이버쇼핑", amount: 6000, category: "간식", isPet: true, pets: ["초코"], subItems: [
        { label: "오리 져키", amount: 6000, category: "간식" },
      ] },
      // 12.15
      { id: 109, date: "12.15", time: "11:00", store: "미용실", amount: 8200, category: "미용", isPet: true, pets: ["나비"], subItems: [
        { label: "발톱 손질", amount: 5200, category: "미용" },
        { label: "귀 청소", amount: 3000, category: "미용" },
      ] },
      { id: 110, date: "12.15", time: "15:30", store: "다이소", amount: 6000, category: "용품", isPet: true, pets: ["초코", "나비"], subItems: [
        { label: "밥그릇", amount: 3000, category: "용품" },
        { label: "산책줄", amount: 3000, category: "용품" },
      ] },
      // 12.16
      { id: 111, date: "12.16", time: "10:30", store: "동물병원", amount: 30000, category: "병원/의료", isPet: true, pets: ["초코"], subItems: [
        { label: "스케일링", amount: 30000, category: "병원/의료" },
      ] },
      // 12.19
      { id: 112, date: "12.19", time: "09:00", store: "쿠팡", amount: 24842, category: "위생/소모품", isPet: true, pets: ["초코", "나비"], subItems: [
        { label: "배변패드 100매", amount: 14842, category: "위생/소모품" },
        { label: "샴푸", amount: 10000, category: "위생/소모품" },
      ] },
      { id: 113, date: "12.19", time: "00:00", store: "펫보험", amount: 15000, category: "보험/저축", isPet: true, pets: ["나비"], subItems: [
        { label: "월 보험료 (나비)", amount: 15000, category: "보험/저축" },
      ] },
      // 12.20
      { id: 114, date: "12.20", time: "20:00", store: "네이버쇼핑", amount: 18484, category: "용품", isPet: true, pets: ["나비"], subItems: [
        { label: "캣타워 부품", amount: 12484, category: "용품" },
        { label: "장난감 낚시대", amount: 6000, category: "용품" },
      ] },
      // 12.21
      { id: 115, date: "12.21", time: "18:00", store: "편의점", amount: 3500, category: "간식", isPet: true, pets: ["초코"], subItems: [
        { label: "강아지 간식", amount: 3500, category: "간식" },
      ] },
      { id: 116, date: "12.21", time: "21:00", store: "쿠팡", amount: 6500, category: "용품", isPet: true, pets: ["나비"], subItems: [
        { label: "캣닢 장난감", amount: 6500, category: "용품" },
      ] },
      // 12.23
      { id: 117, date: "12.23", time: "10:00", store: "펫프렌즈", amount: 14000, category: "사료", isPet: true, pets: ["나비"], subItems: [
        { label: "캣 사료 리필", amount: 14000, category: "사료" },
      ] },
      // 12.25
      { id: 118, date: "12.25", time: "19:00", store: "편의점", amount: 3500, category: "기타", isPet: false, pets: [], subItems: [
        { label: "음료", amount: 2000, category: "기타" },
        { label: "간식", amount: 1500, category: "기타" },
      ] },
      { id: 119, date: "12.25", time: "11:00", store: "주차장", amount: 3000, category: "기타", isPet: false, pets: [], subItems: [
        { label: "주차 요금", amount: 3000, category: "기타" },
      ] },
      // 12.26
      { id: 120, date: "12.26", time: "09:00", store: "동물병원", amount: 60000, category: "병원/의료", isPet: true, pets: ["나비"], subItems: [
        { label: "광견병 접종", amount: 35000, category: "병원/의료" },
        { label: "구충제", amount: 25000, category: "병원/의료" },
      ] },
      { id: 121, date: "12.26", time: "10:00", store: "약국", amount: 15000, category: "약/영양제", isPet: true, pets: ["초코"], subItems: [
        { label: "피부 연고", amount: 15000, category: "약/영양제" },
      ] },
      { id: 122, date: "12.26", time: "15:30", store: "펫샵", amount: 35000, category: "용품", isPet: true, pets: ["초코", "나비"], subItems: [
        { label: "터그놀이 장난감", amount: 15000, category: "용품" },
        { label: "자동 레이저 장난감", amount: 20000, category: "용품" },
      ] },
      // 12.27
      { id: 123, date: "12.27", time: "12:30", store: "네이버쇼핑", amount: 24500, category: "위생/소모품", isPet: true, pets: ["초코", "나비"], subItems: [
        { label: "배변패드 100매", amount: 16500, category: "위생/소모품" },
        { label: "소독 스프레이", amount: 8000, category: "위생/소모품" },
      ] },
    ],
  },
];

// ═══ 카드 거래 → 캘린더 상세 내역 자동 생성 (카테고리별 묶음) ═══
type DayTransaction = {
  store: string; amount: number; category: string; time: string;
  pets: string[]; cardAlias: string;
  subItems: SubItem[];
};

function buildCalendarDetails(cards: Card[]): Record<number, DayTransaction[]> {
  const dayMap: Record<number, DayTransaction[]> = {};
  cards.forEach(card => {
    card.transactions.forEach(tx => {
      const dayNum = parseInt(tx.date.split('.')[1]);
      if (!dayMap[dayNum]) dayMap[dayNum] = [];
      dayMap[dayNum].push({
        store: tx.store, amount: tx.amount, category: tx.category,
        time: tx.time, pets: tx.pets, cardAlias: card.alias,
        subItems: tx.subItems,
      });
    });
  });
  // Sort each day's transactions by time
  Object.values(dayMap).forEach(txs => txs.sort((a, b) => a.time.localeCompare(b.time)));
  return dayMap;
}

function buildCalData(details: Record<number, DayTransaction[]>): Record<number, { exp?: number }> {
  const result: Record<number, { exp?: number }> = {};
  Object.entries(details).forEach(([day, txs]) => {
    const petOnly = txs.filter(t => t.pets.length > 0);
    if (petOnly.length > 0) result[Number(day)] = { exp: petOnly.reduce((s, t) => s + t.amount, 0) };
  });
  return result;
}

const computedCalendarDetails = buildCalendarDetails(cardList);
const computedCalData = buildCalData(computedCalendarDetails);

export default function LedgerPage() {
  const router = useRouter();
  const [selectedPet, setSelectedPet] = useState<string>("전체");
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  
  // Modals state
  const [showAdd, setShowAdd] = useState(false);
  const [showPendingModal, setShowPendingModal] = useState(false);
  const [editTransaction, setEditTransaction] = useState<any>(null);
  const [showCardModal, setShowCardModal] = useState(false);
  const [txFilter, setTxFilter] = useState<"전체" | "펫 사용" | "일반 사용">("전체");
  const [selectedCardIdx, setSelectedCardIdx] = useState(0);
  const [expandedDayTx, setExpandedDayTx] = useState<number | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedEditTx, setSelectedEditTx] = useState<DayTransaction | null>(null);
  
  // Inline edit interactive states
  const [inlineTag, setInlineTag] = useState('');
  const [inlinePets, setInlinePets] = useState<string[]>([]);
  const [inlineAmount, setInlineAmount] = useState('');
  const [inlineLabel, setInlineLabel] = useState('');
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const [showPetDropdown, setShowPetDropdown] = useState(false);
  
  const isCat = selectedPet === "나비" || selectedPet === "고양이";

  // 선택된 카드의 거래 내역
  const currentCardTxs = cardList[selectedCardIdx]?.transactions || [];
  const bankTransactions = currentCardTxs;

  // 캘린더 상세 내역 및 지출 데이터 (카드 데이터에서 자동 계산)
  const calendarDetails = computedCalendarDetails;
  const [calData, setCalData] = useState<Record<number, { exp?: number }>>(computedCalData);

  // New Data: Recent Purchases (replaces category bubble chart)
  const [recentPurchases, setRecentPurchases] = useState([
    { id: 101, date: "2023-12-05", store: "펫프렌즈", amount: 45000, category: "사료" },
    { id: 102, date: "2023-12-10", store: "동물병원", amount: 150000, category: "병원/의료" },
    { id: 103, date: "2023-12-15", store: "쿠팡", amount: 12500, category: "간식" },
    { id: 104, date: "2023-12-22", store: "멍멍토이", amount: 32000, category: "용품" },
    { id: 105, date: "2023-12-28", store: "이마트", amount: 18000, category: "위생/소모품" },
  ]);

  // New Data: Pending Transactions (from the + button)
  const [pendingTransactions, setPendingTransactions] = useState([
    { id: 201, date: "2023-12-01", store: "네이버펫", amount: 28000, category: "사료" },
    { id: 202, date: "2023-12-08", store: "동물약국", amount: 35000, category: "약/영양제" },
    { id: 203, date: "2023-12-19", store: "바잇미", amount: 15000, category: "간식" },
  ]);

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < startDay; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  // 날짜별 펫 스티커 매핑 (활동 유형에 따라 다른 스티커)
  const calendarStickers: Record<number, { img: any; label: string }> = {
    1: { img: isCat ? catGrooming : stickerGrooming, label: "미용" },
    2: { img: isCat ? catThumbsup : stickerThumbsup, label: "저축" },
    3: { img: isCat ? catHospital : stickerHospital, label: "검진" },
    5: { img: isCat ? catEating : stickerEating, label: "간식" },
    6: { img: isCat ? catSad : stickerSad, label: "과소비" },
    8: { img: isCat ? catSad : stickerSad, label: "과소비" },
    9: { img: isCat ? catThumbsup : stickerThumbsup, label: "저축" },
    12: { img: isCat ? catThumbsup : stickerThumbsup, label: "저축" },
    14: { img: isCat ? catEating : stickerEating, label: "사료" },
    17: { img: isCat ? catThumbsup : stickerThumbsup, label: "저축" },
    20: { img: isCat ? catSad : stickerSad, label: "과소비" },
    24: { img: isCat ? catThumbsup : stickerThumbsup, label: "저축" },
    26: { img: isCat ? catHospital : stickerHospital, label: "병원" },
    27: { img: isCat ? catEating : stickerEating, label: "간식" },
    31: { img: isCat ? catGrooming : stickerGrooming, label: "미용" },
  };

  return (
    <>
    <div className="space-y-3 overflow-hidden" style={{ maxHeight: 'calc(100vh - 100px)' }}>
      {/* Pet Selector */}
      <div className="flex gap-2">
        <div
          onClick={() => setSelectedPet("전체")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer transition-all ${selectedPet === "전체" ? "bg-gradient-to-r from-[var(--app-primary)] to-[var(--app-primary-dark)] text-white shadow-md" : "bg-[var(--app-bg-main)] border border-[var(--app-border)] text-[var(--app-text-sub)] hover:border-[var(--app-primary)]/40"}`}
        >
          <span className="text-[13px]" style={{ fontWeight: selectedPet === "전체" ? 600 : 500 }}>전체</span>
        </div>
        <div
          onClick={() => setSelectedPet("초코")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer transition-all ${selectedPet === "초코" || selectedPet === "강아지" ? "bg-[var(--app-primary-light)] border border-[var(--app-primary)]/50 text-[#6B4F3A]" : "bg-[var(--app-bg-main)] border border-[var(--app-border)] text-[var(--app-text-sub)] hover:border-[var(--app-primary)]/40"}`}
        >
          <PetAvatar pet="choco" size="xs" border={false} />
          <span className="text-[13px]" style={{ fontWeight: selectedPet === "초코" ? 600 : 500 }}>초코</span>
        </div>
        <div
          onClick={() => setSelectedPet("나비")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer transition-all ${selectedPet === "나비" || selectedPet === "고양이" ? "bg-[#E8DFD0] border border-[#C4A684]/50 text-[var(--app-text-secondary)]" : "bg-[var(--app-bg-main)] border border-[var(--app-border)] text-[var(--app-text-sub)] hover:border-[#C4A684]/40"}`}
        >
          <PetAvatar pet="nabi" size="xs" border={false} />
          <span className="text-[13px]" style={{ fontWeight: selectedPet === "나비" ? 600 : 500 }}>나비</span>
        </div>
      </div>
      <div className="hidden lg:grid grid-cols-[1.1fr_1fr] gap-5" style={{ height: 'calc(100vh - 160px)' }}>
        {/* ═══ Left Column: Calendar Box ═══ */}
        <div className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col h-full relative">
          {selectedDay === null ? (
            <>
              {/* Calendar Header */}
              <div className="px-5 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-[18px] font-bold text-[var(--app-text-main)] flex items-center gap-1.5">
                    12월 내 소비
                    <ChevronDown className="w-5 h-5 text-[var(--app-text-tertiary)]" strokeWidth={1.5} />
                  </h2>
                </div>
                <div className="py-3 border-b border-[var(--app-border)] flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-4 mb-1">
                      <span className="text-[13px] text-[var(--app-text-sub)] w-8">소비</span>
                      <span className="text-[17px] font-bold text-[var(--app-text-main)]" style={{ fontFamily: "'Nunito', sans-serif" }}>1,625,560 원</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#D9C8B4]" strokeWidth={1.5} />
                </div>
              </div>
              {/* Calendar Grid */}
              <div className="px-5 pb-4 pt-2 flex-1 flex flex-col">
                <div className="grid grid-cols-7 text-center mb-1">
                  {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
                    <div key={d} className="text-[13px] text-[var(--app-text-tertiary)] font-medium py-2">{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 text-center gap-y-0.5 flex-1">
                  {calendarDays.map((day, i) => (
                    <div
                      key={i}
                      className={`min-h-[72px] flex flex-col items-center rounded-xl transition-colors relative pt-1 ${day ? "cursor-pointer hover:bg-[var(--app-bg-secondary)]" : ""}`}
                      onClick={() => { if (day) { setSelectedDay(day); setExpandedDayTx(null); setEditMode(false); } }}
                    >
                      {day && (
                        <>
                          {calendarStickers[day] && (
                            <img
                              src={getImgSrc(calendarStickers[day].img)}
                              alt={calendarStickers[day].label}
                              className="w-[32px] h-[32px] object-contain absolute -top-1 -right-1 drop-shadow-sm z-10 pointer-events-none"
                              style={{ opacity: 0.9 }}
                            />
                          )}
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] ${day === 31 ? "bg-[var(--app-primary-light)] text-[#6B4F3A] font-bold" : "text-[var(--app-text-secondary)]"}`}>
                            {day}
                          </div>
                          <div className="mt-0.5 space-y-[1px]">
                            {calData[day]?.exp ? (
                              <div className="text-[10px] text-[var(--app-text-tertiary)] font-medium leading-none">-{calData[day].exp.toLocaleString()}</div>
                            ) : null}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (() => {
            /* ═══ Inline Day Detail View (replaces calendar) ═══ */
            const allDayItems = calendarDetails[selectedDay as number] || [];
            const dayItems = allDayItems.filter(t => t.pets.length > 0);
            const dayTotal = dayItems.reduce((s, item) => s + item.amount, 0);
            const MODAL_COLORS = ["#F59E0B", "#3B82F6", "#10B981", "#EF4444", "#8B5CF6", "#EC4899", "#14B8A6", "#F97316"];

            // Category-grouped data (for normal mode)
            type CatGroup = { category: string; totalAmount: number; items: typeof dayItems; allSubItems: SubItem[] };
            const categoryGroups: CatGroup[] = [];
            if (!editMode) {
              const catMap: Record<string, CatGroup> = {};
              dayItems.forEach(tx => {
                if (!catMap[tx.category]) catMap[tx.category] = { category: tx.category, totalAmount: 0, items: [], allSubItems: [] };
                catMap[tx.category].totalAmount += tx.amount;
                catMap[tx.category].items.push(tx);
                catMap[tx.category].allSubItems.push(...tx.subItems);
              });
              Object.values(catMap).sort((a, b) => b.totalAmount - a.totalAmount).forEach(g => categoryGroups.push(g));
            }
            const barData = editMode
              ? dayItems.map(i => ({ category: i.category, amount: i.amount }))
              : categoryGroups.map(g => ({ category: g.category, amount: g.totalAmount }));

            return (
              <motion.div
                key={`day-${selectedDay}-${editMode}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col h-full"
              >
                {/* Header */}
                <div className="flex justify-between items-center px-5 pt-4 pb-3 border-b border-[var(--app-border)] shrink-0">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => { setSelectedDay(null); setExpandedDayTx(null); setEditMode(false); setSelectedEditTx(null); }}
                      className="w-8 h-8 rounded-full bg-[var(--app-bg-main)] flex items-center justify-center hover:bg-[var(--app-bg-secondary)] transition-colors"
                    >
                      <ChevronRight className="w-4 h-4 text-[var(--app-text-secondary)] rotate-180" strokeWidth={2} />
                    </button>
                    {calendarStickers[selectedDay as number] && (
                      <img src={getImgSrc(calendarStickers[selectedDay as number].img)} alt={calendarStickers[selectedDay as number].label} className="w-[40px] h-[40px] object-contain drop-shadow-md" />
                    )}
                    <div>
                      <h3 className="text-[17px] font-bold text-[var(--app-text-main)]">12월 {selectedDay}일 {editMode ? '거래 내역' : '소비 내역'}</h3>
                      <span className="text-[13px] font-semibold text-[#EF4444]" style={{ fontFamily: "'Nunito', sans-serif" }}>총 -{dayTotal.toLocaleString()}원</span>
                    </div>
                  </div>
                  {editMode && (
                    <button onClick={() => { setEditMode(false); setExpandedDayTx(null); setSelectedEditTx(null); }} className="text-[10px] font-bold text-[var(--app-text-tertiary)] px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 transition-colors">돌아가기</button>
                  )}
                </div>

                {/* Proportion Bar */}
                {barData.length > 0 && (
                  <div className="px-5 py-2.5 border-b border-[var(--app-border)] shrink-0">
                    <p className="text-[10px] font-bold text-[var(--app-text-tertiary)] uppercase tracking-wide mb-1.5">금액 비율</p>
                    <div className="relative w-full h-6 rounded-lg overflow-hidden flex" style={{ background: 'var(--app-bg-main)', border: '1px solid var(--app-border)' }}>
                      {barData.map((item, idx) => {
                        const pct = dayTotal > 0 ? (item.amount / dayTotal) * 100 : 0;
                        const color = MODAL_COLORS[idx % MODAL_COLORS.length];
                        return (
                          <div key={idx} className="h-full flex items-center justify-center" style={{ width: `${pct}%`, background: `${color}20`, borderRight: idx < barData.length - 1 ? `2px solid ${color}` : 'none' }}>
                            <span className="text-[8px] font-bold truncate px-0.5" style={{ color, fontFamily: "'Nunito', sans-serif" }}>{Math.round(pct)}%</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {barData.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full" style={{ background: MODAL_COLORS[idx % MODAL_COLORS.length] }} />
                          <span className="text-[9px] text-[var(--app-text-secondary)] font-medium">{item.category}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="px-5 py-3 flex-1 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                  {!editMode ? (
                    <>
                      <p className="text-[12px] font-bold text-[var(--app-text-secondary)] mb-2">카테고리별 소비</p>
                      {categoryGroups.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2">
                          {categoryGroups.map((group, idx) => {
                            const color = MODAL_COLORS[idx % MODAL_COLORS.length];
                            const catColor = categories.find(c => c.name === group.category)?.color || 'var(--app-text-tertiary)';
                            const isExpanded = expandedDayTx === idx;
                            const groupPets = [...new Set(group.items.flatMap(i => i.pets))];
                            return (
                              <motion.div
                                key={idx} layout
                                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                                className={`relative rounded-xl p-2.5 flex flex-col gap-1 cursor-pointer transition-all ${isExpanded ? "col-span-2 bg-white border-2 shadow-[0_4px_20px_rgba(0,0,0,0.08)]" : "bg-white border border-[var(--app-primary)]/30 shadow-[0_2px_8px_rgba(245,158,11,0.1)] hover:shadow-[0_4px_16px_rgba(245,158,11,0.15)]"}`}
                                style={{ borderColor: isExpanded ? color : undefined }}
                                onClick={() => setExpandedDayTx(isExpanded ? null : idx)}
                              >
                                <div className="w-full h-1 rounded-full mb-0.5" style={{ background: color }} />
                                <div className="flex flex-wrap gap-1">
                                  <span className="text-[9px] px-1.5 py-0.5 rounded-md font-semibold" style={{ background: catColor + '20', color: catColor }}>{group.category}</span>
                                  {groupPets.map(pet => (
                                    <span key={pet} className="text-[9px] px-1.5 py-0.5 rounded-md font-semibold bg-[var(--app-primary)]/10 text-[var(--app-primary)]">🐾 {pet}</span>
                                  ))}
                                </div>
                                <div className="text-[11px] font-semibold text-[var(--app-text-main)]">{group.category}</div>
                                <div className="text-[9px] text-[var(--app-text-tertiary)]">{group.items.length}건 결제</div>
                                <div className="text-[13px] font-bold text-[var(--app-text-main)]" style={{ fontFamily: "'Nunito', sans-serif" }}>-{group.totalAmount.toLocaleString()}원</div>
                                {isExpanded && group.allSubItems.length > 0 && (
                                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-1.5 pt-1.5 border-t border-[var(--app-border)]">
                                    <p className="text-[9px] font-bold text-[var(--app-text-tertiary)] mb-1 uppercase tracking-wide">품목 상세</p>
                                    <div className="space-y-0.5">
                                      {group.allSubItems.map((sub, si) => (
                                        <div key={si} className="flex items-center justify-between py-1.5 px-1.5 rounded-lg bg-[var(--app-bg-main)]" onClick={(e) => e.stopPropagation()}>
                                          <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-[var(--app-primary-light)] flex items-center justify-center"><Receipt className="w-3 h-3 text-[var(--app-primary)]" strokeWidth={1.5} /></div>
                                            <span className="text-[11px] font-semibold text-[var(--app-text-main)]">{sub.label}</span>
                                          </div>
                                          <span className="text-[12px] font-bold text-[var(--app-text-main)]" style={{ fontFamily: "'Nunito', sans-serif" }}>-{sub.amount.toLocaleString()}원</span>
                                        </div>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                                <div className="flex items-center justify-center mt-0.5"><ChevronDown className={`w-3 h-3 text-[var(--app-text-tertiary)] transition-transform ${isExpanded ? 'rotate-180' : ''}`} strokeWidth={2} /></div>
                              </motion.div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-[12px] text-[var(--app-text-tertiary)] text-center py-5 bg-[var(--app-bg-main)] rounded-xl border border-[var(--app-border)] border-dashed">이 날의 반려동물 소비 내역이 없습니다.</p>
                      )}
                    </>
                  ) : selectedEditTx ? (
                    /* ─── Edit Mode: Selected Transaction Inline AddModal-like View ─── */
                    <motion.div
                      key={`edit-tx-${selectedEditTx.store}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col gap-3"
                    >
                      {/* Transaction Header */}
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-[16px] font-bold text-[var(--app-text-main)]">{selectedEditTx.store}</h4>
                          <span className="text-[13px] text-[var(--app-text-secondary)]" style={{ fontFamily: "'Nunito', sans-serif" }}>전체 금액: {selectedEditTx.amount.toLocaleString()}원</span>
                        </div>
                        <button
                          onClick={() => { setSelectedEditTx(null); setInlineTag(''); setInlinePets([]); setInlineAmount(''); setInlineLabel(''); setShowTagDropdown(false); setShowPetDropdown(false); }}
                          className="w-7 h-7 rounded-full bg-[var(--app-bg-main)] flex items-center justify-center hover:bg-gray-200 transition-colors"
                        >
                          <X className="w-4 h-4 text-[var(--app-text-secondary)]" />
                        </button>
                      </div>

                      {/* Tag / Pet / Amount Input Row (Interactive) */}
                      <div className="flex items-center gap-2 flex-wrap relative">
                        {/* Tag Dropdown */}
                        <div className="relative">
                          <button
                            onClick={() => { setShowTagDropdown(!showTagDropdown); setShowPetDropdown(false); }}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-white text-[12px] font-bold cursor-pointer hover:opacity-80 transition-opacity"
                            style={{ background: categories.find(c => c.name === (inlineTag || selectedEditTx.category))?.color || 'var(--app-primary)' }}
                          >
                            <Tag className="w-3 h-3" />
                            {inlineTag || selectedEditTx.category || '태그 선택'}
                            <ChevronDown className="w-3 h-3" />
                          </button>
                          {showTagDropdown && (
                            <div className="absolute top-full left-0 mt-1 w-36 bg-white rounded-xl shadow-lg border border-[var(--app-border)] py-1 z-50 max-h-48 overflow-y-auto">
                              {categories.map(cat => (
                                <button
                                  key={cat.name}
                                  onClick={() => { setInlineTag(cat.name); setShowTagDropdown(false); }}
                                  className="w-full text-left px-3 py-1.5 text-[12px] font-semibold hover:bg-[var(--app-bg-main)] transition-colors flex items-center gap-2"
                                >
                                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: cat.color }} />
                                  {cat.name}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Pet Multi-Select Dropdown */}
                        <div className="relative">
                          <button
                            onClick={() => { setShowPetDropdown(!showPetDropdown); setShowTagDropdown(false); }}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[var(--app-bg-main)] border border-[var(--app-border)] text-[12px] font-semibold text-[var(--app-text-secondary)] cursor-pointer hover:bg-white transition-colors"
                          >
                            🐾 {inlinePets.length > 0 ? inlinePets.join(', ') : (selectedEditTx.pets.length > 0 ? selectedEditTx.pets.join(', ') : '반려동물')}
                            <ChevronDown className="w-3 h-3" />
                          </button>
                          {showPetDropdown && (
                            <div className="absolute top-full left-0 mt-1 w-32 bg-white rounded-xl shadow-lg border border-[var(--app-border)] py-1 z-50">
                              {['초코', '나비'].map(pet => {
                                const isSelected = inlinePets.includes(pet);
                                return (
                                  <button
                                    key={pet}
                                    onClick={() => {
                                      setInlinePets(prev => isSelected ? prev.filter(p => p !== pet) : [...prev, pet]);
                                    }}
                                    className={`w-full text-left px-3 py-1.5 text-[12px] font-semibold hover:bg-[var(--app-bg-main)] transition-colors flex items-center gap-2 ${isSelected ? 'text-[var(--app-primary)]' : 'text-[var(--app-text-secondary)]'}`}
                                  >
                                    <div className={`w-4 h-4 rounded border flex items-center justify-center ${isSelected ? 'bg-[var(--app-primary)] border-[var(--app-primary)]' : 'border-gray-300'}`}>
                                      {isSelected && <Check className="w-3 h-3 text-white" />}
                                    </div>
                                    🐾 {pet}
                                  </button>
                                );
                              })}
                              <button
                                onClick={() => setShowPetDropdown(false)}
                                className="w-full text-center py-1 text-[10px] font-bold text-[var(--app-primary)] hover:bg-[var(--app-primary-light)] transition-colors mt-0.5"
                              >
                                확인
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Amount Input */}
                        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--app-bg-main)] border border-[var(--app-border)]">
                          <input
                            type="text"
                            placeholder="금액"
                            value={inlineAmount}
                            onChange={(e) => setInlineAmount(e.target.value.replace(/[^0-9]/g, ''))}
                            className="w-16 text-[12px] font-semibold text-[var(--app-text-main)] bg-transparent outline-none text-right"
                            style={{ fontFamily: "'Nunito', sans-serif" }}
                          />
                          <span className="text-[11px] text-[var(--app-text-tertiary)]">원</span>
                        </div>

                        {/* Add Record Button */}
                        <button
                          onClick={() => {
                            setShowTagDropdown(false);
                            setShowPetDropdown(false);
                            const amt = parseInt(inlineAmount || '0');
                            if (amt <= 0) return;
                            const tag = inlineTag || selectedEditTx.category;
                            const label = inlineLabel || `${tag} 항목`;
                            const newSub = { label, amount: amt, category: tag };
                            setSelectedEditTx(prev => prev ? {
                              ...prev,
                              pets: inlinePets.length > 0 ? inlinePets : prev.pets,
                              subItems: [...prev.subItems, newSub],
                            } : null);
                            setInlineAmount('');
                            setInlineLabel('');
                          }}
                          className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                          style={{ background: 'var(--app-primary-light)' }}
                        >
                          <Plus className="w-4 h-4 text-[var(--app-primary)]" />
                        </button>
                      </div>

                      {/* Item Label Input */}
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--app-bg-main)] border border-[var(--app-border)]">
                        <Pencil className="w-3 h-3 text-[var(--app-text-tertiary)]" />
                        <input
                          type="text"
                          placeholder="품목명 (예: 오리젠 사료 1kg)"
                          value={inlineLabel}
                          onChange={(e) => setInlineLabel(e.target.value)}
                          className="flex-1 text-[12px] text-[var(--app-text-main)] bg-transparent outline-none"
                        />
                      </div>

                      {/* Proportion Bar */}
                      {(() => {
                        const totalAllocated = selectedEditTx.subItems.reduce((s, sub) => s + sub.amount, 0);
                        const remaining = selectedEditTx.amount - totalAllocated;
                        const SUB_COLORS = ["#F59E0B", "#3B82F6", "#10B981", "#EF4444", "#8B5CF6", "#EC4899"];
                        return (
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-[11px] font-bold text-[var(--app-text-tertiary)]">금액 비율</p>
                              <span className="text-[11px] font-semibold text-[var(--app-text-secondary)]" style={{ fontFamily: "'Nunito', sans-serif" }}>남은 금액: {remaining.toLocaleString()}원</span>
                            </div>
                            {selectedEditTx.subItems.length > 0 ? (
                              <div className="w-full h-6 rounded-lg overflow-hidden flex" style={{ background: 'var(--app-bg-main)', border: '1px solid var(--app-border)' }}>
                                {selectedEditTx.subItems.map((sub, si) => {
                                  const pct = selectedEditTx.amount > 0 ? (sub.amount / selectedEditTx.amount) * 100 : 0;
                                  const c = SUB_COLORS[si % SUB_COLORS.length];
                                  return (
                                    <div key={si} className="h-full flex items-center justify-center" style={{ width: `${pct}%`, background: `${c}20`, borderRight: si < selectedEditTx.subItems.length - 1 ? `2px solid ${c}` : 'none' }}>
                                      <span className="text-[8px] font-bold truncate px-0.5" style={{ color: c, fontFamily: "'Nunito', sans-serif" }}>{Math.round(pct)}%</span>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <div className="w-full h-6 rounded-lg flex items-center justify-center" style={{ background: 'var(--app-bg-main)', border: '1px solid var(--app-border)' }}>
                                <span className="text-[10px] text-[var(--app-text-tertiary)]">기록을 추가하면 비율이 표시됩니다</span>
                              </div>
                            )}
                          </div>
                        );
                      })()}

                      {/* Previously Added Sub-items (records) */}
                      {selectedEditTx.subItems.length > 0 ? (
                        <div className="space-y-1.5">
                          {selectedEditTx.subItems.map((sub, si) => {
                            const subCatColor = categories.find(c => c.name === sub.category)?.color || 'var(--app-text-tertiary)';
                            const SUB_COLORS = ["#F59E0B", "#3B82F6", "#10B981", "#EF4444", "#8B5CF6", "#EC4899"];
                            const c = SUB_COLORS[si % SUB_COLORS.length];
                            return (
                              <div key={si} className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-white border border-[var(--app-border)] shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                                  <div>
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-[12px] font-semibold text-[var(--app-text-main)]">{sub.label}</span>
                                      <span className="text-[9px] px-1.5 py-0.5 rounded font-bold" style={{ background: subCatColor + '15', color: subCatColor }}>{sub.category}</span>
                                    </div>
                                  </div>
                                </div>
                                <span className="text-[13px] font-bold text-[var(--app-text-main)]" style={{ fontFamily: "'Nunito', sans-serif" }}>-{sub.amount.toLocaleString()}원</span>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="py-6 px-4 rounded-xl border-2 border-dashed border-[var(--app-border)] bg-[var(--app-bg-main)] text-center">
                          <p className="text-[13px] text-[var(--app-text-tertiary)]">태그, 반려동물, 금액을 선택하고 +를 눌러 기록을 추가하세요</p>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-1">
                        <button
                          onClick={() => { setSelectedEditTx(null); setInlineTag(''); setInlinePets([]); setInlineAmount(''); setInlineLabel(''); setShowTagDropdown(false); setShowPetDropdown(false); }}
                          className="flex-1 py-2.5 rounded-xl border border-[var(--app-border)] text-[13px] font-bold text-[var(--app-text-secondary)] bg-white hover:bg-gray-50 transition-colors"
                        >
                          취소
                        </button>
                        <button
                          className="flex-1 py-2.5 rounded-xl text-[13px] font-bold text-white hover:opacity-90 transition-colors"
                          style={{ background: 'linear-gradient(135deg, var(--app-primary), var(--app-primary-dark))' }}
                        >
                          저장하기 ({selectedEditTx.subItems.length}건)
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    /* ─── Edit Mode: Per-Transaction List ─── */
                    <>
                      <p className="text-[12px] font-bold text-[var(--app-text-secondary)] mb-2">결제 거래 내역</p>
                      {dayItems.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2">
                          {dayItems.map((item, idx) => {
                            const color = MODAL_COLORS[idx % MODAL_COLORS.length];
                            const catColor = categories.find(c => c.name === item.category)?.color || 'var(--app-text-tertiary)';
                            return (
                              <motion.div
                                key={idx} layout
                                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                                className="relative rounded-xl p-2.5 flex flex-col gap-1 cursor-pointer transition-all bg-white border border-[var(--app-primary)]/30 shadow-[0_2px_8px_rgba(245,158,11,0.1)] hover:shadow-[0_4px_16px_rgba(245,158,11,0.15)]"
                                onClick={() => setSelectedEditTx(item)}
                              >
                                <div className="w-full h-1 rounded-full mb-0.5" style={{ background: color }} />
                                <div className="flex flex-wrap gap-1">
                                  <span className="text-[9px] px-1.5 py-0.5 rounded-md font-semibold" style={{ background: catColor + '20', color: catColor }}>{item.category}</span>
                                  {item.pets.length > 0 && item.pets.map(pet => (
                                    <span key={pet} className="text-[9px] px-1.5 py-0.5 rounded-md font-semibold bg-[var(--app-primary)]/10 text-[var(--app-primary)]">🐾 {pet}</span>
                                  ))}
                                  {'cardAlias' in item && <span className="text-[8px] px-1 py-0.5 rounded font-bold bg-blue-50 text-blue-500">{(item as any).cardAlias}</span>}
                                </div>
                                <div className="text-[11px] font-semibold text-[var(--app-text-main)]">{item.store}</div>
                                <div className="text-[9px] text-[var(--app-text-tertiary)]">{item.time}</div>
                                <div className="text-[13px] font-bold text-[var(--app-text-main)]" style={{ fontFamily: "'Nunito', sans-serif" }}>-{item.amount.toLocaleString()}원</div>
                              </motion.div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-[12px] text-[var(--app-text-tertiary)] text-center py-5 bg-[var(--app-bg-main)] rounded-xl border border-[var(--app-border)] border-dashed">이 날의 소비 내역이 없습니다.</p>
                      )}
                    </>
                  )}
                </div>

                {/* Action Button (normal mode only) */}
                {!editMode && (
                  <div className="p-3 border-t border-[var(--app-border)] bg-[var(--app-bg-main)] shrink-0">
                    <button
                      onClick={() => { setEditMode(true); setExpandedDayTx(null); setSelectedEditTx(null); }}
                      className="w-full flex items-center justify-center gap-2 py-3 text-white rounded-xl font-bold text-[14px] hover:opacity-90 active:scale-[0.98] transition-all"
                      style={{ background: "linear-gradient(135deg, var(--app-primary), var(--app-primary-dark))", boxShadow: "0 4px 12px rgba(245,158,11,0.3)" }}
                    >
                      <Pencil className="w-4 h-4" />
                      수정하기
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })()}





          {/* Pending Transactions Modal */}
          {showPendingModal && (
            <PendingTransactionsModal 
              transactions={pendingTransactions} 
              onClose={() => setShowPendingModal(false)}
              onSelect={(tx) => {
                setShowPendingModal(false);
                setSelectedEditTx({
                  store: tx.store,
                  amount: tx.amount,
                  category: tx.category,
                  time: '00:00',
                  pets: [],
                  cardAlias: '',
                  subItems: [],
                });
              }}
            />
          )}
        </div>

        {/* ═══ Right Column: Card-based Transactions (Full Height) ═══ */}
        <div className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-3 shrink-0">
            <h3 className="text-[17px] font-bold text-[var(--app-text-main)]">
              <CreditCard className="w-4 h-4 inline mr-1.5 text-[var(--app-primary)]" strokeWidth={1.5} />
              {editMode && selectedDay ? `12월 ${selectedDay}일 거래 내역` : '카드별 거래 내역'}
            </h3>
            {editMode && selectedDay ? (
              <button
                className="text-[11px] font-bold text-[var(--app-text-tertiary)] px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 transition-colors"
                onClick={() => setEditMode(false)}
              >
                수정 종료
              </button>
            ) : (
              <button
                className="text-[11px] font-bold text-[var(--app-primary)] px-2 py-1 rounded bg-[var(--app-primary)]/10 hover:bg-[var(--app-primary)]/20 transition-colors"
                onClick={() => router.push("/transactions")}
              >
                거래 관리
              </button>
            )}
          </div>

          {/* Card Selector Chips */}
          {!editMode && (
            <div className="flex gap-2 mb-3 shrink-0 flex-wrap">
              {cardList.map((card, idx) => (
                <button
                  key={card.id}
                  onClick={() => setSelectedCardIdx(idx)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] transition-all ${
                    selectedCardIdx === idx
                      ? "text-white font-bold shadow-sm"
                      : "bg-[var(--app-bg-main)] border border-[var(--app-border)] text-[var(--app-text-sub)] hover:border-[var(--app-primary)]/40"
                  }`}
                  style={selectedCardIdx === idx ? { background: card.color } : {}}
                >
                  <CreditCard className="w-3 h-3" strokeWidth={1.5} />
                  {card.alias}
                </button>
              ))}
              <button
                onClick={() => router.push("/transactions")}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[12px] border border-dashed border-[var(--app-primary)]/40 text-[var(--app-primary)] font-medium hover:bg-[var(--app-primary)]/5 transition-colors"
              >
                <Plus className="w-3 h-3" strokeWidth={2} />
                카드 등록
              </button>
            </div>
          )}

          {/* Filter Tabs */}
          {!editMode && (
            <div className="flex gap-1.5 mb-3 shrink-0">
              {["전체", "펫 사용", "일반 사용"].map((f) => (
                <button
                  key={f}
                  onClick={() => setTxFilter(f as any)}
                  className={`px-3 py-1 text-[12px] rounded-full transition-all ${
                    txFilter === f
                      ? "bg-[var(--app-primary)] text-white font-bold shadow-sm"
                      : "bg-[var(--app-bg-main)] text-[var(--app-text-sub)] border border-[var(--app-border)] hover:border-[var(--app-primary)]/40"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          )}

          {/* Transaction List */}
          <div className="flex-1 overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin' }}>
            {(() => {
              // In edit mode, show transactions for the selected day's date
              let txSource = bankTransactions;
              if (editMode && selectedDay) {
                const dayStr = `12.${String(selectedDay).padStart(2, '0')}`;
                // Gather all card transactions for this date
                const allCardTxs = cardList.flatMap(card => card.transactions.map(tx => ({ ...tx, cardAlias: card.alias })));
                txSource = allCardTxs.filter(tx => tx.date === dayStr);
              }
              const filtered = txSource.filter(tx => {
                if (!editMode) {
                  if (txFilter === "펫 사용") return tx.isPet;
                  if (txFilter === "일반 사용") return !tx.isPet;
                }
                return true;
              });
              if (filtered.length === 0) {
                return (
                  <div className="flex-1 flex flex-col items-center justify-center gap-3 py-12">
                    <CreditCard className="w-10 h-10 text-[var(--app-text-tertiary)]" strokeWidth={1.2} />
                    <p className="text-[14px] text-[var(--app-text-tertiary)] font-medium text-center">
                      {editMode ? '이 날짜의 카드 거래 내역이 없습니다' : '이 카드의 거래 내역이 없습니다'}
                    </p>
                  </div>
                );
              }
              const groups = filtered.reduce((acc, tx) => {
                if (!acc[tx.date]) acc[tx.date] = [];
                acc[tx.date].push(tx);
                return acc;
              }, {} as Record<string, typeof bankTransactions>);
              return Object.entries(groups).map(([date, txs]) => (
                <div key={date} className="mb-4">
                  <div className="text-[15px] font-bold text-[var(--app-text-main)] mb-2 pb-1 border-b border-[var(--app-border)]">{date}</div>
                  <div className="space-y-1">
                    {txs.map((tx) => (
                      <div
                        key={tx.id}
                        className="flex items-center justify-between py-2.5 px-1 hover:bg-[var(--app-bg-main)] rounded-lg cursor-pointer transition-colors"
                        onClick={() => {
                          const dayNum = parseInt(tx.date.split('.')[1]);
                          if (tx.isPet) {
                            // Already in ledger: navigate to that day's detail
                            setSelectedDay(dayNum);
                            setExpandedDayTx(null);
                            setEditMode(false);
                            setSelectedEditTx(null);
                          } else {
                            // Not in ledger: show inline add modal
                            if (!selectedDay) setSelectedDay(dayNum);
                            setEditMode(true);
                            setSelectedEditTx({
                              store: tx.store,
                              amount: tx.amount,
                              category: tx.category,
                              time: tx.time,
                              pets: tx.pets,
                              cardAlias: cardList[selectedCardIdx]?.alias || '',
                              subItems: [],
                            });
                          }
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            tx.isPet ? "bg-[var(--app-primary-light)]" : "bg-gray-100"
                          }`}>
                            {tx.isPet
                              ? <Receipt className="w-4 h-4 text-[var(--app-primary)]" strokeWidth={1.5} />
                              : <ArrowUpRight className="w-4 h-4 text-gray-400" strokeWidth={2} />
                            }
                          </div>
                          <div>
                            <div className="text-[13px] font-semibold text-[var(--app-text-main)] flex items-center gap-1.5">
                              {tx.store}
                              {tx.isPet && <span className="text-[9px] px-1 py-0.5 rounded bg-[var(--app-primary)]/10 text-[var(--app-primary)] font-bold">펫</span>}
                              {tx.isPet
                                ? <span className="text-[9px] px-1 py-0.5 rounded bg-green-50 text-green-500 font-bold">등록됨</span>
                                : <span className="text-[9px] px-1 py-0.5 rounded bg-blue-50 text-blue-500 font-bold">추가</span>
                              }
                            </div>
                            <div className="text-[11px] text-[var(--app-text-tertiary)]">{tx.time} | {tx.category}</div>
                          </div>
                        </div>
                        <div className="text-[14px] font-bold text-[var(--app-text-main)]" style={{ fontFamily: "'Nunito', sans-serif" }}>
                          -{tx.amount.toLocaleString()} 원
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ));
            })()}
          </div>
        </div>
      </div>

      {/* Mobile Swipe Carousel */}
      <div className="block lg:hidden h-[calc(100vh-[var(--safe-area-bottom,0px)]-210px)]">
        <SwipeCarousel
          views={[
            // View 1: Calendar 
            <div key="cal" className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col h-full w-full relative">
              {/* Header */}
              <div className="px-5 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-[18px] font-bold text-[var(--app-text-main)] flex items-center gap-1.5">
                    12월 내 소비
                    <ChevronDown className="w-5 h-5 text-[var(--app-text-tertiary)]" strokeWidth={1.5} />
                  </h2>
                </div>

                {/* Summary */}
                <div className="py-3 border-b border-[var(--app-border)] flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-4 mb-1">
                      <span className="text-[13px] text-[var(--app-text-sub)] w-8">소비</span>
                      <span className="text-[17px] font-bold text-[var(--app-text-main)]" style={{ fontFamily: "'Nunito', sans-serif" }}>1,625,560 원</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#D9C8B4]" strokeWidth={1.5} />
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="px-5 pb-4 pt-2 flex-1 flex flex-col min-h-0">
                <div className="grid grid-cols-7 text-center mb-1 shrink-0">
                  {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
                    <div key={d} className="text-[13px] text-[var(--app-text-tertiary)] font-medium py-2">{d}</div>
                  ))}
                </div>

                <div className="grid grid-cols-7 text-center gap-y-0.5 flex-1 min-h-[0px] overflow-y-auto">
                  {calendarDays.map((day, i) => (
                    <div
                      key={i}
                      className={`min-h-[60px] flex flex-col items-center rounded-xl transition-colors relative pt-1 ${day ? "cursor-pointer hover:bg-[var(--app-bg-secondary)]" : ""}`}
                      onClick={() => day && setSelectedDay(day)}
                    >
                      {day && (
                        <>
                          {/* 펫 스티커 */}
                          {calendarStickers[day] && (
                            <img
                              src={getImgSrc(calendarStickers[day].img)}
                              alt={calendarStickers[day].label}
                              className="w-[28px] h-[28px] object-contain absolute -top-1 -right-1 drop-shadow-sm z-10 pointer-events-none"
                              style={{ opacity: 0.9 }}
                            />
                          )}

                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[12px] ${day === 31
                            ? "bg-[var(--app-primary-light)] text-[#6B4F3A] font-bold"
                            : "text-[var(--app-text-secondary)]"
                            }`}>
                            {day}
                          </div>

                          <div className="mt-0.5 space-y-[1px]">
                            {calData[day]?.exp ? (
                              <div className="text-[9px] text-[var(--app-text-tertiary)] font-medium leading-none">
                                -{calData[day].exp.toLocaleString()}
                              </div>
                            ) : null}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>,

            // View 2: Card-based Transactions
            <div key="txns" className="flex flex-col gap-4 h-full w-full overflow-y-auto pb-6">
              <div className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5 flex flex-col flex-1 min-h-0 overflow-hidden">
                <h3 className="text-[17px] font-bold text-[var(--app-text-main)] mb-3">
                  <CreditCard className="w-4 h-4 inline mr-1.5 text-[var(--app-primary)]" strokeWidth={1.5} />
                  카드별 거래 내역
                </h3>

                {/* Card Chips */}
                <div className="flex gap-1.5 mb-3 flex-wrap">
                  {cardList.map((card, idx) => (
                    <button
                      key={card.id}
                      onClick={() => setSelectedCardIdx(idx)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] transition-all ${
                        selectedCardIdx === idx
                          ? "text-white font-bold shadow-sm"
                          : "bg-[var(--app-bg-main)] border border-[var(--app-border)] text-[var(--app-text-sub)]"
                      }`}
                      style={selectedCardIdx === idx ? { background: card.color } : {}}
                    >
                      <CreditCard className="w-3 h-3" strokeWidth={1.5} />
                      {card.alias}
                    </button>
                  ))}
                  <button
                    onClick={() => router.push("/transactions")}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] border border-dashed border-[var(--app-primary)]/40 text-[var(--app-primary)] font-medium"
                  >
                    <Plus className="w-3 h-3" strokeWidth={2} />
                    카드 등록
                  </button>
                </div>

                {/* Filter */}
                <div className="flex gap-1.5 mb-3">
                  {["전체", "펫 사용", "일반 사용"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setTxFilter(f as any)}
                      className={`px-3 py-1 text-[12px] rounded-full transition-all ${
                        txFilter === f
                          ? "bg-[var(--app-primary)] text-white font-bold shadow-sm"
                          : "bg-[var(--app-bg-main)] text-[var(--app-text-sub)] border border-[var(--app-border)]"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto pr-1" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                  {(() => {
                    const filtered = bankTransactions.filter(tx => {
                      if (txFilter === "펫 사용") return tx.isPet;
                      if (txFilter === "일반 사용") return !tx.isPet;
                      return true;
                    });
                    const groups = filtered.reduce((acc, tx) => {
                      if (!acc[tx.date]) acc[tx.date] = [];
                      acc[tx.date].push(tx);
                      return acc;
                    }, {} as Record<string, typeof bankTransactions>);
                    return Object.entries(groups).map(([date, txs]) => (
                      <div key={date} className="mb-4">
                        <div className="text-[15px] font-bold text-[var(--app-text-main)] mb-2 pb-1 border-b border-[var(--app-border)]">{date}</div>
                        <div className="space-y-1">
                          {txs.map((tx) => (
                            <div key={tx.id} className="flex items-center justify-between py-2.5 px-1 hover:bg-[var(--app-bg-main)] rounded-lg cursor-pointer transition-colors" onClick={() => { setEditTransaction({...tx}); setShowAdd(true); }}>
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  tx.isPet ? "bg-[var(--app-primary-light)]" : "bg-gray-100"
                                }`}>
                                  {tx.isPet
                                    ? <Receipt className="w-4 h-4 text-[var(--app-primary)]" strokeWidth={1.5} />
                                    : <ArrowUpRight className="w-4 h-4 text-gray-400" strokeWidth={2} />
                                  }
                                </div>
                                <div>
                                  <div className="text-[13px] font-semibold text-[var(--app-text-main)] flex items-center gap-1.5">
                                    {tx.store}
                                    {tx.isPet && <span className="text-[9px] px-1 py-0.5 rounded bg-[var(--app-primary)]/10 text-[var(--app-primary)] font-bold">펫</span>}
                                  </div>
                                  <div className="text-[11px] text-[var(--app-text-tertiary)]">{tx.time} | {tx.category}</div>
                                </div>
                              </div>
                              <div className="text-[14px] font-bold text-[var(--app-text-main)]" style={{ fontFamily: "'Nunito', sans-serif" }}>
                                -{tx.amount.toLocaleString()} 원
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </div>
            </div>
          ]}
        />
      </div>
    </div>

    {/* 카드 등록 — 거래 관리 페이지로 라우팅 */}
    </>
  );
}

const MODAL_CATEGORIES = [
  { name: "사료", emoji: "🥣" },
  { name: "병원/의료", emoji: "🏥" },
  { name: "미용", emoji: "✂️" },
  { name: "위생/소모품", emoji: "🪥" },
  { name: "간식", emoji: "🍖" },
  { name: "약/영양제", emoji: "💊" },
  { name: "용품", emoji: "🛒" },
  { name: "돌봄/서비스", emoji: "🏠" },
];

interface PaymentRecord {
  id: string;
  tags: string[];
  pets: string[];
  amount: number;
}

const PETS = [
  { name: "초코", avatar: "dog1" },
  { name: "나비", avatar: "cat1" },
];

function AddModal({ initData, onSave, onClose }: { initData?: any; onSave: (data: any) => void; onClose: () => void }) {
  // 선택된 태그들 (다중 선택)
  const [selectedTags, setSelectedTags] = useState<string[]>(initData?.category ? [initData.category] : []);
  // 선택된 반려동물들 (다중 선택)
  const [selectedPets, setSelectedPets] = useState<string[]>([]);
  // 금액 입력
  const [amount, setAmount] = useState<number>(0);
  // 추가된 결제 기록 리스트
  const [records, setRecords] = useState<PaymentRecord[]>([]);
  // 비율 배열 (각 레코드의 비율, 합 = 1.0)
  const [proportions, setProportions] = useState<number[]>([]);
  // 각 레코드의 수동 입력 금액
  const [manualAmounts, setManualAmounts] = useState<number[]>([]);
  // 수정 중인 레코드 인덱스 (-1 = 신규 추가 모드)
  const [editingIdx, setEditingIdx] = useState<number>(-1);
  // Dropdown 열림 상태
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const [showPetDropdown, setShowPetDropdown] = useState(false);
  const tagRef = useRef<HTMLDivElement>(null);
  const petRef = useRef<HTMLDivElement>(null);

  const storeName = initData?.store || "거래처";
  const baseAmount = initData?.amount || 0;
  const getRecordAmount = (idx: number) => manualAmounts[idx] || 0;
  const totalAllocated = manualAmounts.reduce((sum, a) => sum + a, 0);
  const remaining = baseAmount - totalAllocated;

  // 세그먼트 색상 팔레트
  const SEGMENT_COLORS = [
    "#F59E0B", "#3B82F6", "#10B981", "#EF4444", "#8B5CF6",
    "#EC4899", "#14B8A6", "#F97316", "#6366F1", "#06B6D4",
  ];

  // 비율 재계산 유틸
  const recalcProportions = (amounts: number[]) => {
    const total = amounts.reduce((s, a) => s + a, 0);
    return total > 0 ? amounts.map(a => a / total) : amounts.map(() => 1 / (amounts.length || 1));
  };

  // 태그 토글
  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  // 반려동물 토글
  const togglePet = (pet: string) => {
    setSelectedPets(prev =>
      prev.includes(pet) ? prev.filter(p => p !== pet) : [...prev, pet]
    );
  };

  // + 버튼 또는 수정 완료
  const addOrUpdateRecord = () => {
    if (selectedTags.length === 0 || selectedPets.length === 0 || amount <= 0) return;

    if (editingIdx >= 0) {
      // 수정 모드
      const newRecords = [...records];
      newRecords[editingIdx] = { ...newRecords[editingIdx], tags: [...selectedTags], pets: [...selectedPets] };
      setRecords(newRecords);
      const newAmounts = [...manualAmounts];
      newAmounts[editingIdx] = amount;
      setManualAmounts(newAmounts);
      setProportions(recalcProportions(newAmounts));
      setEditingIdx(-1);
      setSelectedTags([]);
      setSelectedPets([]);
      setAmount(0);
    } else {
      // 신규 추가
      const newRecord: PaymentRecord = {
        id: `record-${Date.now()}`,
        tags: [...selectedTags],
        pets: [...selectedPets],
        amount,
      };
      const newAmounts = [...manualAmounts, amount];
      setManualAmounts(newAmounts);
      setProportions(recalcProportions(newAmounts));
      setRecords(prev => [...prev, newRecord]);
      setSelectedTags([]);
      setSelectedPets([]);
      setAmount(0);
    }
  };

  // 레코드 클릭 → 수정 모드 진입
  const startEditing = (idx: number) => {
    const record = records[idx];
    setEditingIdx(idx);
    setSelectedTags([...record.tags]);
    setSelectedPets([...record.pets]);
    setAmount(manualAmounts[idx] || 0);
  };

  // 수정 취소
  const cancelEditing = () => {
    setEditingIdx(-1);
    setSelectedTags([]);
    setSelectedPets([]);
    setAmount(0);
  };

  // 추가된 기록 삭제
  const removeRecord = (id: string) => {
    const idx = records.findIndex(r => r.id === id);
    if (idx === -1) return;
    if (editingIdx === idx) cancelEditing();
    else if (editingIdx > idx) setEditingIdx(editingIdx - 1);
    const newAmounts = manualAmounts.filter((_, i) => i !== idx);
    setManualAmounts(newAmounts);
    setProportions(recalcProportions(newAmounts));
    setRecords(prev => prev.filter(r => r.id !== id));
  };

  // 저장
  const handleSave = () => {
    if (records.length === 0) return;
    const finalRecords = records.map((r, i) => ({ ...r, amount: getRecordAmount(i) }));
    onSave({
      id: initData?.id,
      date: new Date().toISOString().split("T")[0],
      amount: totalAllocated,
      category: finalRecords[0]?.tags[0] || "기타",
      store: storeName,
      isPending: initData?.isPending,
      records: finalRecords,
    });
  };

  // 카테고리 색상 매핑
  const getCategoryColor = (name: string) => {
    const cat = categories.find(c => c.name === name);
    return cat?.color || "var(--app-text-tertiary)";
  };

  // 태그 요약 텍스트
  const tagSummary = selectedTags.length === 0
    ? "태그 선택"
    : selectedTags.length <= 2
      ? selectedTags.join(", ")
      : `${selectedTags[0]} 외 ${selectedTags.length - 1}`;

  // 펫 요약 텍스트
  const petSummary = selectedPets.length === 0
    ? "반려동물"
    : selectedPets.join(", ");

  return (
    <div
      className="absolute inset-0 bg-black/40 flex items-center justify-center z-50 p-5 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
        if (tagRef.current && !tagRef.current.contains(e.target as Node)) setShowTagDropdown(false);
        if (petRef.current && !petRef.current.contains(e.target as Node)) setShowPetDropdown(false);
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-visible flex flex-col max-h-[90vh]"
        onClick={() => {
          setShowTagDropdown(false);
          setShowPetDropdown(false);
        }}
      >
        {/* ── 헤더 ── */}
        <div className="flex justify-between items-center px-5 pt-5 pb-3 border-b border-[var(--app-border)]">
          <div>
            <h3 className="text-[18px] font-bold text-[var(--app-text-main)]">{storeName}</h3>
            <span className="text-[14px] text-[var(--app-text-tertiary)] mt-0.5 block" style={{ fontFamily: "'Nunito', sans-serif" }}>
              전체 금액: <span className="font-bold text-[var(--app-text-main)]">{baseAmount.toLocaleString()}원</span>
            </span>
          </div>
          <button onClick={onClose} className="text-[var(--app-text-tertiary)] hover:text-[var(--app-text-secondary)] transition-colors">
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        {/* ── 입력 바: [태그▼] [반려동물▼] [금액 원] [+/✓] ── */}
        <div className="px-5 py-3 relative z-20 border-b border-[var(--app-border)]">
          {editingIdx >= 0 && (
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-[11px] font-bold text-[var(--app-primary)]">✏️ 수정 중</span>
              <button onClick={cancelEditing} className="text-[10px] text-[var(--app-text-tertiary)] underline hover:text-[var(--app-text-secondary)]">취소</button>
            </div>
          )}
          <div className="flex items-center gap-2">
            {/* 태그 드롭다운 */}
            <div className="relative" ref={tagRef} onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => { setShowTagDropdown(v => !v); setShowPetDropdown(false); }}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-[13px] border transition-all whitespace-nowrap"
                style={{
                  background: selectedTags.length > 0 ? "var(--app-primary)" : "var(--app-bg-main)",
                  borderColor: selectedTags.length > 0 ? "var(--app-primary)" : "var(--app-border)",
                  color: selectedTags.length > 0 ? "#fff" : "var(--app-text-secondary)",
                  fontWeight: selectedTags.length > 0 ? 600 : 400,
                }}
              >
                <Tag className="w-3.5 h-3.5" strokeWidth={2} />
                {tagSummary}
                <ChevronDown className="w-3.5 h-3.5 ml-0.5" strokeWidth={2} />
              </button>
              {showTagDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-full left-0 mb-1.5 bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-[var(--app-border)] p-3 z-50 w-[280px]"
                >
                  <p className="text-[11px] font-bold text-[var(--app-text-tertiary)] mb-2 uppercase tracking-wide">결제 태그 (다중 선택)</p>
                  <div className="flex flex-wrap gap-1.5 max-h-[200px] overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
                    {MODAL_CATEGORIES.map((c) => {
                      const active = selectedTags.includes(c.name);
                      return (
                        <button
                          key={c.name}
                          onClick={() => toggleTag(c.name)}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[12px] border transition-all"
                          style={{
                            background: active ? "var(--app-primary)" : "var(--app-bg-main)",
                            borderColor: active ? "var(--app-primary)" : "var(--app-border)",
                            color: active ? "#fff" : "var(--app-text-secondary)",
                            fontWeight: active ? 600 : 400,
                          }}
                        >
                          <span className="text-[13px]">{c.emoji}</span>
                          {c.name}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </div>

            {/* 반려동물 드롭다운 */}
            <div className="relative" ref={petRef} onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => { setShowPetDropdown(v => !v); setShowTagDropdown(false); }}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-[13px] border transition-all whitespace-nowrap"
                style={{
                  background: selectedPets.length > 0 ? "var(--app-primary)" : "var(--app-bg-main)",
                  borderColor: selectedPets.length > 0 ? "var(--app-primary)" : "var(--app-border)",
                  color: selectedPets.length > 0 ? "#fff" : "var(--app-text-secondary)",
                  fontWeight: selectedPets.length > 0 ? 600 : 400,
                }}
              >
                🐾
                {petSummary}
                <ChevronDown className="w-3.5 h-3.5 ml-0.5" strokeWidth={2} />
              </button>
              {showPetDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-full left-0 mb-1.5 bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-[var(--app-border)] p-3 z-50 w-[200px]"
                >
                  <p className="text-[11px] font-bold text-[var(--app-text-tertiary)] mb-2 uppercase tracking-wide">대상 반려동물</p>
                  <div className="flex flex-col gap-1.5">
                    {PETS.map((p) => {
                      const active = selectedPets.includes(p.name);
                      return (
                        <button
                          key={p.name}
                          onClick={() => togglePet(p.name)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] border transition-all text-left"
                          style={{
                            background: active ? "var(--app-primary)" : "var(--app-bg-main)",
                            borderColor: active ? "var(--app-primary)" : "var(--app-border)",
                            color: active ? "#fff" : "var(--app-text-secondary)",
                            fontWeight: active ? 600 : 400,
                          }}
                        >
                          <PetAvatar pet={p.avatar} size="xs" border={false} />
                          {p.name}
                          {active && <span className="ml-auto text-[11px]">✓</span>}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </div>

            {/* 금액 입력 */}
            <div className="relative flex-1 min-w-0">
              <input
                type="number"
                value={amount || ""}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="금액"
                className="w-full py-2.5 px-3 rounded-xl bg-[var(--app-bg-main)] border border-[var(--app-border)] focus:outline-none focus:border-[var(--app-primary)] focus:bg-white text-[14px] font-bold transition-colors pr-8"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] font-bold text-[var(--app-text-tertiary)]">원</span>
            </div>

            {/* +/✓ 버튼 */}
            <button
              onClick={addOrUpdateRecord}
              disabled={selectedTags.length === 0 || selectedPets.length === 0 || amount <= 0}
              className="w-10 h-10 flex items-center justify-center rounded-xl font-bold text-white hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              style={{
                background: editingIdx >= 0
                  ? "linear-gradient(135deg, #3B82F6, #2563EB)"
                  : "linear-gradient(135deg, var(--app-primary), var(--app-primary-dark))",
                boxShadow: editingIdx >= 0
                  ? "0 4px 12px rgba(59,130,246,0.3)"
                  : "0 4px 12px rgba(245,158,11,0.3)",
              }}
            >
              {editingIdx >= 0 ? <Check className="w-5 h-5" strokeWidth={2.5} /> : <Plus className="w-5 h-5" strokeWidth={2.5} />}
            </button>
          </div>
        </div>

        {/* ══ 비율 바 (항상 표시) ══ */}
        <div className="px-5 py-3 border-b border-[var(--app-border)]">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[11px] font-bold text-[var(--app-text-tertiary)] uppercase tracking-wide">금액 비율</p>
            <span className="text-[11px] font-medium" style={{ color: remaining >= 0 ? 'var(--app-text-tertiary)' : '#EF4444', fontFamily: "'Nunito', sans-serif" }}>
              {remaining >= 0 ? `남은 금액: ${remaining.toLocaleString()}원` : `초과: ${Math.abs(remaining).toLocaleString()}원`}
            </span>
          </div>
          <div
            className="relative w-full h-8 rounded-xl overflow-hidden flex select-none"
            style={{ background: "var(--app-bg-main)", border: "1px solid var(--app-border)" }}
          >
            {records.length === 0 ? (
              <div className="h-full w-full flex items-center justify-center">
                <span className="text-[10px] text-[var(--app-text-tertiary)]">기록을 추가하면 비율이 표시됩니다</span>
              </div>
            ) : (
              records.map((record, idx) => {
                const pct = (proportions[idx] || 0) * 100;
                const color = SEGMENT_COLORS[idx % SEGMENT_COLORS.length];
                return (
                  <div
                    key={record.id}
                    className="h-full flex items-center justify-center relative transition-all"
                    style={{
                      width: `${pct}%`,
                      background: `${color}20`,
                      borderRight: idx < records.length - 1 ? `2px solid ${color}` : "none",
                    }}
                  >
                    <span className="text-[10px] font-bold truncate px-0.5" style={{ color, fontFamily: "'Nunito', sans-serif" }}>
                      {getRecordAmount(idx).toLocaleString()}원 ({Math.round(pct)}%)
                    </span>
                  </div>
                );
              })
            )}
          </div>
          {records.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-1.5">
              {records.map((record, idx) => {
                const color = SEGMENT_COLORS[idx % SEGMENT_COLORS.length];
                return (
                  <div key={record.id} className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                    <span className="text-[9px] text-[var(--app-text-secondary)] font-medium">{record.tags.join(", ")}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── 결제 기록 (스크롤 영역) ── */}
        <div className="px-5 py-4 overflow-y-auto flex-1">
          {records.length > 0 && (
            <div>
              <p className="text-[13px] font-bold text-[var(--app-text-secondary)] mb-2">결제 기록</p>
              <div className="grid grid-cols-3 gap-2">
                {records.map((record, idx) => {
                  const isEditing = editingIdx === idx;
                  const color = SEGMENT_COLORS[idx % SEGMENT_COLORS.length];
                  return (
                    <motion.div
                      key={record.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`relative rounded-xl p-3 flex flex-col gap-1.5 cursor-pointer transition-all ${
                        isEditing
                          ? "bg-blue-50 border-2 border-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.2)]"
                          : "bg-white border border-[var(--app-primary)]/30 shadow-[0_2px_8px_rgba(245,158,11,0.1)] hover:shadow-[0_4px_16px_rgba(245,158,11,0.15)]"
                      }`}
                      onClick={() => startEditing(idx)}
                    >
                      <button
                        onClick={(e) => { e.stopPropagation(); removeRecord(record.id); }}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#EF4444] text-white flex items-center justify-center hover:brightness-90 transition-all shadow-sm"
                      >
                        <X className="w-3 h-3" strokeWidth={3} />
                      </button>
                      <div className="w-full h-1 rounded-full mb-0.5" style={{ background: color }} />
                      <div className="flex flex-wrap gap-1">
                        {record.tags.map(tag => (
                          <span
                            key={tag}
                            className="text-[10px] px-1.5 py-0.5 rounded-md font-semibold"
                            style={{ background: getCategoryColor(tag) + "20", color: getCategoryColor(tag) }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1">
                        {record.pets.map(pet => (
                          <span key={pet} className="text-[11px] text-[var(--app-text-secondary)] font-medium">🐾 {pet}</span>
                        ))}
                      </div>
                      <div className="text-[14px] font-bold text-[var(--app-text-main)]" style={{ fontFamily: "'Nunito', sans-serif" }}>
                        {getRecordAmount(idx).toLocaleString()}원
                      </div>
                      {isEditing && (
                        <span className="text-[9px] text-blue-500 font-bold">수정 중...</span>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
          {records.length === 0 && (
            <p className="text-[13px] text-[var(--app-text-tertiary)] text-center py-8 bg-[var(--app-bg-main)] rounded-xl border border-[var(--app-border)] border-dashed">
              태그, 반려동물, 금액을 선택하고 +를 눌러 기록을 추가하세요
            </p>
          )}
        </div>

        {/* ── 하단 버튼 ── */}
        <div className="px-5 pb-5 pt-2 flex gap-3 border-t border-[var(--app-border)]">
          <button
            onClick={onClose}
            className="flex-1 py-3.5 rounded-xl border border-[var(--app-border)] text-[15px] font-bold text-[var(--app-text-secondary)] hover:bg-[var(--app-bg-main)] transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            disabled={records.length === 0}
            className="flex-1 py-3.5 text-white rounded-xl font-bold text-[15px] hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: "linear-gradient(135deg, var(--app-primary), var(--app-primary-dark))", boxShadow: "0 4px 12px rgba(245,158,11,0.3)" }}
          >
            저장하기 ({records.length}건)
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* ════════════════════════════════════════════
   미등록 거래 기록 (Pending Transactions) 모달
════════════════════════════════════════════ */
function PendingTransactionsModal({ transactions, onSelect, onClose }: { transactions: any[], onSelect: (tx: any) => void, onClose: () => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMode, setFilterMode] = useState<"all" | "store" | "category">("all");

  const filters = [
    { key: "all" as const, label: "통합 검색" },
    { key: "store" as const, label: "거래처" },
    { key: "category" as const, label: "소비 내역" },
  ];

  const filtered = transactions.filter((tx) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    switch (filterMode) {
      case "store":
        return tx.store.toLowerCase().includes(q);
      case "category":
        return tx.category.toLowerCase().includes(q);
      default: // "all"
        return tx.store.toLowerCase().includes(q) || tx.category.toLowerCase().includes(q) || tx.date?.includes(q);
    }
  });

  return (
    <div
      className="absolute inset-0 bg-black/40 flex items-center justify-center z-50 p-5 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-5 pt-5 pb-3 border-b border-[var(--app-border)]">
          <div>
            <h3 className="text-[18px] font-bold text-[var(--app-text-main)]">미반영 거래 기록</h3>
            <span className="text-[12px] text-[var(--app-text-tertiary)] mt-0.5 block">가계부에 아직 등록되지 않은 내역입니다.</span>
          </div>
          <button onClick={onClose} className="text-[var(--app-text-tertiary)] hover:text-[var(--app-text-secondary)] transition-colors">
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        {/* Search + Filter */}
        <div className="px-5 pt-4 pb-2 space-y-3 shrink-0">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-[var(--app-text-tertiary)] absolute left-3 top-1/2 -translate-y-1/2" strokeWidth={2} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={filterMode === "store" ? "거래처명으로 검색..." : filterMode === "category" ? "카테고리로 검색..." : "거래처, 카테고리로 검색..."}
              className="w-full pl-9 pr-3 py-2.5 text-[13px] rounded-xl border border-[var(--app-border)] bg-[var(--app-bg-main)] focus:border-[var(--app-primary)] focus:ring-1 focus:ring-[var(--app-primary)]/30 outline-none transition-all placeholder:text-[var(--app-text-tertiary)]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--app-text-tertiary)] hover:text-[var(--app-text-secondary)]"
              >
                <X className="w-3.5 h-3.5" strokeWidth={2} />
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-1.5">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilterMode(f.key)}
                className={`flex-1 text-[12px] py-1.5 rounded-lg font-semibold transition-all ${
                  filterMode === f.key
                    ? "bg-[var(--app-primary)] text-white shadow-sm"
                    : "bg-[var(--app-bg-main)] text-[var(--app-text-tertiary)] border border-[var(--app-border)] hover:bg-[var(--app-bg-secondary)]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Transaction List */}
        <div className="px-5 pb-5 pt-1 flex-1 overflow-y-auto space-y-2" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {filtered.length > 0 ? filtered.map((tx) => (
            <div
              key={tx.id}
              onClick={() => onSelect(tx)}
              className="flex justify-between items-center bg-[var(--app-bg-main)] hover:bg-[var(--app-bg-secondary)] p-3 rounded-xl border border-[var(--app-border)] cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-[var(--app-border)]">
                  <Receipt className="w-5 h-5 text-[var(--app-primary)]" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-[14px] font-bold text-[var(--app-text-main)] flex items-center gap-2">
                    {tx.store}
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[var(--app-primary-light)] text-[#6B4F3A]">{tx.category}</span>
                  </div>
                  <div className="text-[12px] text-[var(--app-text-tertiary)] mt-0.5">{tx.date}</div>
                </div>
              </div>
              <div className="text-[15px] font-bold text-[var(--app-text-main)]" style={{ fontFamily: "'Nunito', sans-serif" }}>
                -{tx.amount.toLocaleString()}원
              </div>
            </div>
          )) : (
            <div className="text-center py-8">
              <Search className="w-8 h-8 text-[var(--app-border)] mx-auto mb-3" strokeWidth={1.5} />
              <p className="text-[13px] text-[var(--app-text-tertiary)]">
                {searchQuery ? "검색 결과가 없습니다." : "모든 거래 내역이 등록되었습니다."}
              </p>
            </div>
          )}
        </div>

        {/* Result Count */}
        {searchQuery && filtered.length > 0 && (
          <div className="px-5 py-2 border-t border-[var(--app-border)] bg-[var(--app-bg-main)]">
            <span className="text-[11px] text-[var(--app-text-tertiary)]">
              검색 결과: <span className="font-bold text-[var(--app-primary)]">{filtered.length}</span>건
            </span>
          </div>
        )}
      </motion.div>
    </div>
  );
}

