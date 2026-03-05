import { useNavigate } from "react-router";
import { useState } from "react";
import {
  User,
  Dog,
  Cat,
  Users,
  LogOut,
  Trash2,
  Lock,
  Edit3,
  Copy,
  Crown,
  UserMinus,
  UserPlus,
  ChevronRight,
  Plus,
  Camera,
  Shield,
  Heart,
} from "lucide-react";

const pets = [
  {
    id: 1,
    name: "초코",
    type: "dog",
    breed: "말티즈",
    birth: "2023-05-15",
    gender: "수컷",
    weight: 4.2,
    neutered: true,
    vaccinated: true,
    diseases: ["슬개골 탈구 주의"],
  },
  {
    id: 2,
    name: "나비",
    type: "cat",
    breed: "코리안숏헤어",
    birth: "2024-01-10",
    gender: "암컷",
    weight: 3.8,
    neutered: true,
    vaccinated: false,
    diseases: [],
  },
];

const groupMembers = [
  { name: "김집사", role: "host", email: "kim@example.com" },
  { name: "이집사", role: "guest", email: "lee@example.com" },
];

export default function MyPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"account" | "pets" | "group">("account");
  const [selectedPet, setSelectedPet] = useState<number | null>(null);
  const [showAddPet, setShowAddPet] = useState(false);
  const [showEditPet, setShowEditPet] = useState(false);

  return (
    <div className="space-y-5">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-[#E8D5C0] p-5 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #D4A574, #C4956A)" }}>
          <User className="w-7 h-7 text-white" strokeWidth={1.5} />
        </div>
        <div>
          <div className="text-[18px] text-[#3D3229]" style={{ fontWeight: 600 }}>김집사</div>
          <div className="text-[13px] text-[#B4A08A]">kim@example.com</div>
          <div className="flex items-center gap-1 mt-1">
            <Crown className="w-3.5 h-3.5 text-[#FDCB6E]" strokeWidth={1.5} />
            <span className="text-[12px] text-[#E17055]">호스트</span>
            <span className="text-[12px] text-[#B4A08A] ml-2">초코네 가족</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#F5EDDF] rounded-xl p-1">
        {[
          { key: "account" as const, label: "계정 관리", icon: Shield },
          { key: "pets" as const, label: "반려동물 관리", icon: Heart },
          { key: "group" as const, label: "그룹 관리", icon: Users },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => { setTab(t.key); setSelectedPet(null); }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[13px] transition-all ${
              tab === t.key ? "bg-white text-[#6B4F3A] shadow-sm" : "text-[#B4A08A]"
            }`}
            style={{ fontWeight: tab === t.key ? 600 : 400 }}
          >
            <t.icon className="w-4 h-4" strokeWidth={1.5} />
            {t.label}
          </button>
        ))}
      </div>

      {/* Account Management */}
      {tab === "account" && (
        <div className="bg-white rounded-2xl border border-[#E8D5C0] divide-y divide-[#E8D5C0]">
          <button className="w-full flex items-center justify-between px-5 py-4 hover:bg-[#FFF8EE] transition-colors">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-[#B4A08A]" strokeWidth={1.5} />
              <span className="text-[14px] text-[#5C4A3A]">비밀번호 변경</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#D9C8B4]" strokeWidth={1.5} />
          </button>
          <button
            className="w-full flex items-center justify-between px-5 py-4 hover:bg-[#FFF8EE] transition-colors"
            onClick={() => navigate("/login")}
          >
            <div className="flex items-center gap-3">
              <LogOut className="w-5 h-5 text-[#B4A08A]" strokeWidth={1.5} />
              <span className="text-[14px] text-[#5C4A3A]">로그아웃</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#D9C8B4]" strokeWidth={1.5} />
          </button>
          <button className="w-full flex items-center justify-between px-5 py-4 hover:bg-[#FFF0F0] transition-colors">
            <div className="flex items-center gap-3">
              <Trash2 className="w-5 h-5 text-[#EF4444]" strokeWidth={1.5} />
              <span className="text-[14px] text-[#EF4444]">회원 탈퇴</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#D9C8B4]" strokeWidth={1.5} />
          </button>
        </div>
      )}

      {/* Pet Management */}
      {tab === "pets" && selectedPet === null && (
        <div className="space-y-3">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="bg-white rounded-2xl border border-[#E8D5C0] p-4 flex items-center justify-between cursor-pointer hover:shadow-sm transition-shadow"
              onClick={() => setSelectedPet(pet.id)}
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${pet.type === "dog" ? "bg-[#E17055]/10" : "bg-[#FDCB6E]/10"}`}>
                  {pet.type === "dog" ? (
                    <Dog className="w-6 h-6 text-[#E17055]" strokeWidth={1.5} />
                  ) : (
                    <Cat className="w-6 h-6 text-[#FDCB6E]" strokeWidth={1.5} />
                  )}
                </div>
                <div>
                  <div className="text-[15px] text-[#3D3229]" style={{ fontWeight: 600 }}>{pet.name}</div>
                  <div className="text-[12px] text-[#B4A08A]">{pet.breed} · {pet.gender} · {pet.weight}kg</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#D9C8B4]" strokeWidth={1.5} />
            </div>
          ))}
          <button 
            className="w-full bg-white rounded-2xl border-2 border-dashed border-[#E8D5C0] p-4 flex items-center justify-center gap-2 text-[14px] text-[#B4A08A] hover:border-[#D4A574] hover:text-[#6B4F3A] transition-colors"
            onClick={() => setShowAddPet(true)}
          >
            <Plus className="w-5 h-5" strokeWidth={1.5} />
            반려동물 추가
          </button>
        </div>
      )}

      {/* Add Pet Modal */}
      {showAddPet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-xl">
            <button 
              className="absolute top-4 right-4 text-[#AAA] hover:text-[#333] transition-colors" 
              onClick={() => setShowAddPet(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
            <h3 className="text-[18px] text-[#3D3229] mb-5" style={{ fontWeight: 700 }}>반려동물 추가</h3>
            <div className="space-y-4">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 rounded-full bg-[#F5EDDF] flex items-center justify-center relative cursor-pointer hover:bg-[#E8D5C0] transition-colors">
                  <Camera className="w-8 h-8 text-[#B4A08A]" strokeWidth={1.5} />
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-white border border-[#E8D5C0] rounded-full flex items-center justify-center shadow-sm">
                    <Plus className="w-4 h-4 text-[#6B4F3A]" strokeWidth={2} />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="text-[13px] text-[#333] mb-1 block" style={{ fontWeight: 600 }}>이름</label>
                  <input placeholder="반려동물 이름" className="w-full border border-[#E8E8E8] rounded-xl px-3 py-2.5 bg-white text-[14px] outline-none placeholder:text-[#AAA] focus:border-[#D4A574]" />
                </div>
                <div>
                  <label className="text-[13px] text-[#333] mb-1 block" style={{ fontWeight: 600 }}>종류</label>
                  <select className="w-full border border-[#E8E8E8] rounded-xl px-3 py-2.5 bg-white text-[14px] outline-none focus:border-[#D4A574]">
                    <option>강아지</option>
                    <option>고양이</option>
                    <option>기타</option>
                  </select>
                </div>
                <div>
                  <label className="text-[13px] text-[#333] mb-1 block" style={{ fontWeight: 600 }}>품종</label>
                  <input placeholder="예: 말티즈" className="w-full border border-[#E8E8E8] rounded-xl px-3 py-2.5 bg-white text-[14px] outline-none placeholder:text-[#AAA] focus:border-[#D4A574]" />
                </div>
                <div>
                  <label className="text-[13px] text-[#333] mb-1 block" style={{ fontWeight: 600 }}>생년월일</label>
                  <input type="date" className="w-full border border-[#E8E8E8] rounded-xl px-3 py-2.5 bg-white text-[14px] outline-none focus:border-[#D4A574] text-[#333]" />
                </div>
                <div>
                  <label className="text-[13px] text-[#333] mb-1 block" style={{ fontWeight: 600 }}>몸무게 (kg)</label>
                  <input type="number" step="0.1" placeholder="0.0" className="w-full border border-[#E8E8E8] rounded-xl px-3 py-2.5 bg-white text-[14px] outline-none placeholder:text-[#AAA] focus:border-[#D4A574]" />
                </div>
                <div className="col-span-2">
                  <label className="text-[13px] text-[#333] mb-1 block" style={{ fontWeight: 600 }}>특이사항 (선택)</label>
                  <textarea placeholder="보유 질환 등 건강 특이사항을 적어주세요" className="w-full border border-[#E8E8E8] rounded-xl px-3 py-2.5 bg-white text-[14px] outline-none placeholder:text-[#AAA] focus:border-[#D4A574] h-20 resize-none"></textarea>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button 
                className="flex-1 py-3 border border-[#E8E8E8] rounded-xl text-[14px] text-[#666] hover:bg-[#F9F9F9] transition-colors" 
                onClick={() => setShowAddPet(false)}
              >
                취소
              </button>
              <button 
                className="flex-1 py-3 text-white rounded-xl text-[14px] hover:opacity-90 active:scale-95 transition-all" 
                style={{ background: "#E8A365", fontWeight: 600 }} 
                onClick={() => setShowAddPet(false)}
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pet Detail */}
      {tab === "pets" && selectedPet !== null && (() => {
        const pet = pets.find((p) => p.id === selectedPet);
        if (!pet) return null;
        return (
          <div className="bg-white rounded-2xl border border-[#E8D5C0] p-5 space-y-4">
            <button className="text-[13px] text-[#B4A08A] hover:text-[#5C4A3A]" onClick={() => setSelectedPet(null)}>
              ← 목록으로
            </button>
            <div className="flex items-center gap-4">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center relative ${pet.type === "dog" ? "bg-[#E17055]/10" : "bg-[#FDCB6E]/10"}`}>
                {pet.type === "dog" ? (
                  <Dog className="w-10 h-10 text-[#E17055]" strokeWidth={1.5} />
                ) : (
                  <Cat className="w-10 h-10 text-[#FDCB6E]" strokeWidth={1.5} />
                )}
                <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-white border border-[#E8D5C0] rounded-full flex items-center justify-center">
                  <Camera className="w-3.5 h-3.5 text-[#B4A08A]" strokeWidth={1.5} />
                </button>
              </div>
              <div>
                <div className="text-[20px] text-[#3D3229]" style={{ fontWeight: 700 }}>{pet.name}</div>
                <div className="text-[13px] text-[#B4A08A]">{pet.breed}</div>
              </div>
              <div className="ml-auto flex gap-2">
                <button 
                  className="flex items-center gap-1 px-3 py-1.5 border border-[#E8D5C0] rounded-xl text-[12px] text-[#8B7355] hover:bg-[#F5EDDF] transition-colors"
                  onClick={() => setShowEditPet(true)}
                >
                  <Edit3 className="w-3.5 h-3.5" strokeWidth={1.5} /> 수정
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 border border-[#EF4444]/30 rounded-xl text-[12px] text-[#EF4444] hover:bg-[#FFF0F0] transition-colors">
                  <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} /> 삭제
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "생년월일", value: pet.birth },
                { label: "성별", value: pet.gender },
                { label: "몸무게", value: `${pet.weight}kg` },
                { label: "종", value: pet.type === "dog" ? "강아지" : "고양이" },
              ].map((item, i) => (
                <div key={i} className="p-3 bg-[#FFF8EE] rounded-xl">
                  <div className="text-[11px] text-[#B4A08A]">{item.label}</div>
                  <div className="text-[14px] text-[#5C4A3A] mt-0.5" style={{ fontWeight: 500 }}>{item.value}</div>
                </div>
              ))}
            </div>

            <div>
              <h4 className="text-[14px] text-[#3D3229] mb-2" style={{ fontWeight: 600 }}>건강 특이사항</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-[#FFF8EE] rounded-xl">
                  <span className="text-[13px] text-[#5C4A3A]">중성화</span>
                  <span className={`text-[13px] ${pet.neutered ? "text-[#A8C5A0]" : "text-[#EF4444]"}`} style={{ fontWeight: 500 }}>
                    {pet.neutered ? "완료" : "미완료"}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#FFF8EE] rounded-xl">
                  <span className="text-[13px] text-[#5C4A3A]">예방접종</span>
                  <span className={`text-[13px] ${pet.vaccinated ? "text-[#A8C5A0]" : "text-[#EF4444]"}`} style={{ fontWeight: 500 }}>
                    {pet.vaccinated ? "완료" : "미완료"}
                  </span>
                </div>
                <div className="p-3 bg-[#FFF8EE] rounded-xl">
                  <span className="text-[13px] text-[#5C4A3A] block mb-1">보유 질환</span>
                  {pet.diseases.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {pet.diseases.map((d, i) => (
                        <span key={i} className="px-2 py-0.5 bg-[#EF4444]/10 text-[#EF4444] rounded text-[12px]">{d}</span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-[12px] text-[#B4A08A]">등록된 질환 없음</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Edit Pet Modal */}
      {showEditPet && selectedPet !== null && (() => {
        const pet = pets.find((p) => p.id === selectedPet);
        if (!pet) return null;
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-xl">
              <button 
                className="absolute top-4 right-4 text-[#AAA] hover:text-[#333] transition-colors" 
                onClick={() => setShowEditPet(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
              <h3 className="text-[18px] text-[#3D3229] mb-5" style={{ fontWeight: 700 }}>반려동물 수정</h3>
              <div className="space-y-4">
                <div className="flex justify-center mb-6">
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center relative cursor-pointer hover:opacity-90 transition-opacity ${pet.type === "dog" ? "bg-[#E17055]/10" : "bg-[#FDCB6E]/10"}`}>
                    {pet.type === "dog" ? (
                      <Dog className="w-10 h-10 text-[#E17055]" strokeWidth={1.5} />
                    ) : (
                      <Cat className="w-10 h-10 text-[#FDCB6E]" strokeWidth={1.5} />
                    )}
                    <div className="absolute bottom-0 right-0 w-8 h-8 bg-white border border-[#E8D5C0] rounded-full flex items-center justify-center shadow-sm">
                      <Camera className="w-4 h-4 text-[#6B4F3A]" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className="text-[13px] text-[#333] mb-1 block" style={{ fontWeight: 600 }}>이름</label>
                    <input defaultValue={pet.name} placeholder="반려동물 이름" className="w-full border border-[#E8E8E8] rounded-xl px-3 py-2.5 bg-white text-[14px] outline-none placeholder:text-[#AAA] focus:border-[#D4A574]" />
                  </div>
                  <div>
                    <label className="text-[13px] text-[#333] mb-1 block" style={{ fontWeight: 600 }}>종류</label>
                    <select defaultValue={pet.type === "dog" ? "강아지" : pet.type === "cat" ? "고양이" : "기타"} className="w-full border border-[#E8E8E8] rounded-xl px-3 py-2.5 bg-white text-[14px] outline-none focus:border-[#D4A574]">
                      <option>강아지</option>
                      <option>고양이</option>
                      <option>기타</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[13px] text-[#333] mb-1 block" style={{ fontWeight: 600 }}>품종</label>
                    <input defaultValue={pet.breed} placeholder="예: 말티즈" className="w-full border border-[#E8E8E8] rounded-xl px-3 py-2.5 bg-white text-[14px] outline-none placeholder:text-[#AAA] focus:border-[#D4A574]" />
                  </div>
                  <div>
                    <label className="text-[13px] text-[#333] mb-1 block" style={{ fontWeight: 600 }}>생년월일</label>
                    <input type="date" defaultValue={pet.birth} className="w-full border border-[#E8E8E8] rounded-xl px-3 py-2.5 bg-white text-[14px] outline-none focus:border-[#D4A574] text-[#333]" />
                  </div>
                  <div>
                    <label className="text-[13px] text-[#333] mb-1 block" style={{ fontWeight: 600 }}>몸무게 (kg)</label>
                    <input type="number" step="0.1" defaultValue={pet.weight} placeholder="0.0" className="w-full border border-[#E8E8E8] rounded-xl px-3 py-2.5 bg-white text-[14px] outline-none placeholder:text-[#AAA] focus:border-[#D4A574]" />
                  </div>
                  <div className="col-span-2">
                    <label className="text-[13px] text-[#333] mb-1 block" style={{ fontWeight: 600 }}>특이사항 (선택)</label>
                    <textarea defaultValue={pet.diseases.join(", ")} placeholder="보유 질환 등 건강 특이사항을 적어주세요" className="w-full border border-[#E8E8E8] rounded-xl px-3 py-2.5 bg-white text-[14px] outline-none placeholder:text-[#AAA] focus:border-[#D4A574] h-20 resize-none"></textarea>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <button 
                  className="flex-1 py-3 border border-[#E8E8E8] rounded-xl text-[14px] text-[#666] hover:bg-[#F9F9F9] transition-colors" 
                  onClick={() => setShowEditPet(false)}
                >
                  취소
                </button>
                <button 
                  className="flex-1 py-3 text-white rounded-xl text-[14px] hover:opacity-90 active:scale-95 transition-all" 
                  style={{ background: "#E8A365", fontWeight: 600 }} 
                  onClick={() => setShowEditPet(false)}
                >
                  수정 완료
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Group Management */}
      {tab === "group" && (
        <div className="space-y-4">
          {/* Invite Code */}
          <div className="bg-white rounded-2xl border border-[#E8D5C0] p-5">
            <h3 className="text-[15px] text-[#3D3229] mb-3" style={{ fontWeight: 600 }}>초대 코드</h3>
            <div className="flex items-center gap-2">
              <div className="flex-1 px-4 py-3 bg-[#FFF8EE] border border-[#E8D5C0] rounded-xl text-[16px] text-[#5C4A3A] tracking-widest" style={{ fontWeight: 600, fontFamily: "monospace" }}>
                AX7K-M2PQ
              </div>
              <button className="p-3 bg-[#F5E6D0] text-[#6B4F3A] rounded-xl hover:bg-[#E8D5C0] transition-colors">
                <Copy className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>
            <p className="text-[11px] text-[#B4A08A] mt-2">이 코드를 공유하여 그룹에 구성원을 초대하세요</p>
          </div>

          {/* Members */}
          <div className="bg-white rounded-2xl border border-[#E8D5C0] p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[15px] text-[#3D3229]" style={{ fontWeight: 600 }}>그룹 구성원</h3>
              <span className="text-[12px] text-[#B4A08A]">초코네 가족</span>
            </div>
            <div className="space-y-2">
              {groupMembers.map((m, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-[#FFF8EE] rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#F5E6D0] flex items-center justify-center">
                      <User className="w-4 h-4 text-[#6B4F3A]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[14px] text-[#5C4A3A]" style={{ fontWeight: 500 }}>{m.name}</span>
                        {m.role === "host" && <Crown className="w-3.5 h-3.5 text-[#FDCB6E]" strokeWidth={1.5} />}
                      </div>
                      <div className="text-[11px] text-[#B4A08A]">{m.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {m.role === "host" ? (
                      <span className="px-2 py-0.5 bg-[#F5E6D0] text-[#6B4F3A] rounded text-[11px]">호스트</span>
                    ) : (
                      <>
                        <button className="p-1.5 rounded hover:bg-white transition-colors" title="호스트 변경">
                          <Crown className="w-3.5 h-3.5 text-[#D9C8B4]" strokeWidth={1.5} />
                        </button>
                        <button className="p-1.5 rounded hover:bg-[#FFF0F0] transition-colors" title="내보내기">
                          <UserMinus className="w-3.5 h-3.5 text-[#EF4444]" strokeWidth={1.5} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Requests */}
          <div className="bg-white rounded-2xl border border-[#E8D5C0] p-5">
            <h3 className="text-[15px] text-[#3D3229] mb-3" style={{ fontWeight: 600 }}>가입 대기</h3>
            <div className="flex items-center justify-between p-3 bg-[#FFF8EE] rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#F5EDDF] flex items-center justify-center">
                  <UserPlus className="w-4 h-4 text-[#B4A08A]" strokeWidth={1.5} />
                </div>
                <div>
                  <span className="text-[14px] text-[#5C4A3A]">박집사</span>
                  <div className="text-[11px] text-[#B4A08A]">park@example.com</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1.5 text-white rounded-xl text-[12px] hover:opacity-90 active:scale-95 transition-all"
                  style={{ background: "linear-gradient(135deg, #D4A574, #C4956A)", fontWeight: 600 }}
                >수락</button>
                <button className="px-3 py-1.5 border border-[#E8D5C0] text-[#B4A08A] rounded-xl text-[12px]">거절</button>
              </div>
            </div>
          </div>

          {/* Leave Group */}
          <div className="bg-white rounded-2xl border border-[#E8D5C0] p-5">
            <button className="flex items-center gap-2 text-[14px] text-[#EF4444]">
              <LogOut className="w-4 h-4" strokeWidth={1.5} />
              그룹 탈퇴
            </button>
            <p className="text-[11px] text-[#B4A08A] mt-1 ml-6">
              호스트는 구성원이 본인뿐일 때만 탈퇴 가능하며, 탈퇴 시 그룹이 삭제됩니다.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}