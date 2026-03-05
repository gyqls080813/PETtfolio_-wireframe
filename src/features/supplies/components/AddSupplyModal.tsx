"use client";
import { useAtom } from "jotai";
import { showAddSupplyModalAtom } from "../store";

export function AddSupplyModal() {
    const [showAdd, setShowAdd] = useAtom(showAddSupplyModalAtom);

    if (!showAdd) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-xl">
                <button
                    className="absolute top-4 right-4 text-[#AAA] hover:text-[#333] transition-colors"
                    onClick={() => setShowAdd(false)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
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
    );
}
