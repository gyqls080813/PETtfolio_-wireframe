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

  return (
    <div className="space-y-5">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-[#E8E0D5] p-5 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #F59E0B, #F97316)" }}>
          <User className="w-7 h-7 text-white" strokeWidth={1.5} />
        </div>
        <div>
          <div className="text-[18px] text-[#111827]" style={{ fontWeight: 600 }}>김집사</div>
          <div className="text-[13px] text-[#9CA3AF]">kim@example.com</div>
          <div className="flex items-center gap-1 mt-1">
            <Crown className="w-3.5 h-3.5 text-[#FDCB6E]" strokeWidth={1.5} />
            <span className="text-[12px] text-[#E17055]">호스트</span>
            <span className="text-[12px] text-[#9CA3AF] ml-2">초코네 가족</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#F1F5F9] rounded-xl p-1">
        {[
          { key: "account" as const, label: "계정 관리", icon: Shield },
          { key: "pets" as const, label: "반려동물 관리", icon: Heart },
          { key: "group" as const, label: "그룹 관리", icon: Users },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => { setTab(t.key); setSelectedPet(null); }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[13px] transition-all ${
              tab === t.key ? "bg-white text-[#D97706] shadow-sm" : "text-[#9CA3AF]"
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
        <div className="bg-white rounded-2xl border border-[#E8E0D5] divide-y divide-[#F0EBE3]">
          <button className="w-full flex items-center justify-between px-5 py-4 hover:bg-[#FAF8F5] transition-colors">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-[#9CA3AF]" strokeWidth={1.5} />
              <span className="text-[14px] text-[#374151]">비밀번호 변경</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#D1C4B0]" strokeWidth={1.5} />
          </button>
          <button
            className="w-full flex items-center justify-between px-5 py-4 hover:bg-[#FAF8F5] transition-colors"
            onClick={() => navigate("/login")}
          >
            <div className="flex items-center gap-3">
              <LogOut className="w-5 h-5 text-[#9CA3AF]" strokeWidth={1.5} />
              <span className="text-[14px] text-[#374151]">로그아웃</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#D1C4B0]" strokeWidth={1.5} />
          </button>
          <button className="w-full flex items-center justify-between px-5 py-4 hover:bg-[#FFF0F0] transition-colors">
            <div className="flex items-center gap-3">
              <Trash2 className="w-5 h-5 text-[#EF4444]" strokeWidth={1.5} />
              <span className="text-[14px] text-[#EF4444]">회원 탈퇴</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#D1C4B0]" strokeWidth={1.5} />
          </button>
        </div>
      )}

      {/* Pet Management */}
      {tab === "pets" && selectedPet === null && (
        <div className="space-y-3">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="bg-white rounded-2xl border border-[#E8E0D5] p-4 flex items-center justify-between cursor-pointer hover:shadow-sm transition-shadow"
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
                  <div className="text-[15px] text-[#111827]" style={{ fontWeight: 600 }}>{pet.name}</div>
                  <div className="text-[12px] text-[#9CA3AF]">{pet.breed} · {pet.gender} · {pet.weight}kg</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#D1C4B0]" strokeWidth={1.5} />
            </div>
          ))}
          <button className="w-full bg-white rounded-2xl border-2 border-dashed border-[#E8E0D5] p-4 flex items-center justify-center gap-2 text-[14px] text-[#9CA3AF] hover:border-[#F59E0B] hover:text-[#D97706] transition-colors">
            <Plus className="w-5 h-5" strokeWidth={1.5} />
            반려동물 추가
          </button>
        </div>
      )}

      {/* Pet Detail */}
      {tab === "pets" && selectedPet !== null && (() => {
        const pet = pets.find((p) => p.id === selectedPet);
        if (!pet) return null;
        return (
          <div className="bg-white rounded-2xl border border-[#E8E0D5] p-5 space-y-4">
            <button className="text-[13px] text-[#9CA3AF] hover:text-[#374151]" onClick={() => setSelectedPet(null)}>
              ← 목록으로
            </button>
            <div className="flex items-center gap-4">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center relative ${pet.type === "dog" ? "bg-[#E17055]/10" : "bg-[#FDCB6E]/10"}`}>
                {pet.type === "dog" ? (
                  <Dog className="w-10 h-10 text-[#E17055]" strokeWidth={1.5} />
                ) : (
                  <Cat className="w-10 h-10 text-[#FDCB6E]" strokeWidth={1.5} />
                )}
                <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-white border border-[#E8E0D5] rounded-full flex items-center justify-center">
                  <Camera className="w-3.5 h-3.5 text-[#9CA3AF]" strokeWidth={1.5} />
                </button>
              </div>
              <div>
                <div className="text-[20px] text-[#111827]" style={{ fontWeight: 700 }}>{pet.name}</div>
                <div className="text-[13px] text-[#9CA3AF]">{pet.breed}</div>
              </div>
              <div className="ml-auto flex gap-2">
                <button className="flex items-center gap-1 px-3 py-1.5 border border-[#E8E0D5] rounded-xl text-[12px] text-[#6B7280]">
                  <Edit3 className="w-3.5 h-3.5" strokeWidth={1.5} /> 수정
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 border border-[#EF4444]/30 rounded-xl text-[12px] text-[#EF4444]">
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
                <div key={i} className="p-3 bg-[#FAF8F5] rounded-xl">
                  <div className="text-[11px] text-[#9CA3AF]">{item.label}</div>
                  <div className="text-[14px] text-[#374151] mt-0.5" style={{ fontWeight: 500 }}>{item.value}</div>
                </div>
              ))}
            </div>

            <div>
              <h4 className="text-[14px] text-[#111827] mb-2" style={{ fontWeight: 600 }}>건강 특이사항</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-[#FAF8F5] rounded-xl">
                  <span className="text-[13px] text-[#374151]">중성화</span>
                  <span className={`text-[13px] ${pet.neutered ? "text-[#14B8A6]" : "text-[#EF4444]"}`} style={{ fontWeight: 500 }}>
                    {pet.neutered ? "완료" : "미완료"}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#FAF8F5] rounded-xl">
                  <span className="text-[13px] text-[#374151]">예방접종</span>
                  <span className={`text-[13px] ${pet.vaccinated ? "text-[#14B8A6]" : "text-[#EF4444]"}`} style={{ fontWeight: 500 }}>
                    {pet.vaccinated ? "완료" : "미완료"}
                  </span>
                </div>
                <div className="p-3 bg-[#FAF8F5] rounded-xl">
                  <span className="text-[13px] text-[#374151] block mb-1">보유 질환</span>
                  {pet.diseases.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {pet.diseases.map((d, i) => (
                        <span key={i} className="px-2 py-0.5 bg-[#EF4444]/10 text-[#EF4444] rounded text-[12px]">{d}</span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-[12px] text-[#9CA3AF]">등록된 질환 없음</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Group Management */}
      {tab === "group" && (
        <div className="space-y-4">
          {/* Invite Code */}
          <div className="bg-white rounded-2xl border border-[#E8E0D5] p-5">
            <h3 className="text-[15px] text-[#111827] mb-3" style={{ fontWeight: 600 }}>초대 코드</h3>
            <div className="flex items-center gap-2">
              <div className="flex-1 px-4 py-3 bg-[#FAF8F5] border border-[#E8E0D5] rounded-xl text-[16px] text-[#374151] tracking-widest" style={{ fontWeight: 600, fontFamily: "monospace" }}>
                AX7K-M2PQ
              </div>
              <button className="p-3 bg-[#FEF3C7] text-[#D97706] rounded-xl hover:bg-[#FDE68A] transition-colors">
                <Copy className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>
            <p className="text-[11px] text-[#9CA3AF] mt-2">이 코드를 공유하여 그룹에 구성원을 초대하세요</p>
          </div>

          {/* Members */}
          <div className="bg-white rounded-2xl border border-[#E8E0D5] p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[15px] text-[#111827]" style={{ fontWeight: 600 }}>그룹 구성원</h3>
              <span className="text-[12px] text-[#9CA3AF]">초코네 가족</span>
            </div>
            <div className="space-y-2">
              {groupMembers.map((m, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-[#FAF8F5] rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#FEF3C7] flex items-center justify-center">
                      <User className="w-4 h-4 text-[#D97706]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[14px] text-[#374151]" style={{ fontWeight: 500 }}>{m.name}</span>
                        {m.role === "host" && <Crown className="w-3.5 h-3.5 text-[#FDCB6E]" strokeWidth={1.5} />}
                      </div>
                      <div className="text-[11px] text-[#9CA3AF]">{m.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {m.role === "host" ? (
                      <span className="px-2 py-0.5 bg-[#FEF3C7] text-[#D97706] rounded text-[11px]">호스트</span>
                    ) : (
                      <>
                        <button className="p-1.5 rounded hover:bg-white transition-colors" title="호스트 변경">
                          <Crown className="w-3.5 h-3.5 text-[#D1C4B0]" strokeWidth={1.5} />
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
          <div className="bg-white rounded-2xl border border-[#E8E0D5] p-5">
            <h3 className="text-[15px] text-[#111827] mb-3" style={{ fontWeight: 600 }}>가입 대기</h3>
            <div className="flex items-center justify-between p-3 bg-[#FAF8F5] rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#F1F5F9] flex items-center justify-center">
                  <UserPlus className="w-4 h-4 text-[#9CA3AF]" strokeWidth={1.5} />
                </div>
                <div>
                  <span className="text-[14px] text-[#374151]">박집사</span>
                  <div className="text-[11px] text-[#9CA3AF]">park@example.com</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1.5 text-white rounded-xl text-[12px] hover:opacity-90 active:scale-95 transition-all"
                  style={{ background: "linear-gradient(135deg, #F59E0B, #F97316)", fontWeight: 600 }}
                >수락</button>
                <button className="px-3 py-1.5 border border-[#E8E0D5] text-[#9CA3AF] rounded-xl text-[12px]">거절</button>
              </div>
            </div>
          </div>

          {/* Leave Group */}
          <div className="bg-white rounded-2xl border border-[#E8E0D5] p-5">
            <button className="flex items-center gap-2 text-[14px] text-[#EF4444]">
              <LogOut className="w-4 h-4" strokeWidth={1.5} />
              그룹 탈퇴
            </button>
            <p className="text-[11px] text-[#9CA3AF] mt-1 ml-6">
              호스트는 구성원이 본인뿐일 때만 탈퇴 가능하며, 탈퇴 시 그룹이 삭제됩니다.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}