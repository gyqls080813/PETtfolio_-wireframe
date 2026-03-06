import { useState, useRef } from "react";
import { Camera, Upload, AlertCircle, CheckCircle2, Info } from "lucide-react";

export default function HealthPage() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const clearFile = () => {
        setSelectedFile(null);
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className="space-y-5 h-full flex flex-col">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--app-success)]/20 flex items-center justify-center">
                    <Camera className="w-5 h-5 text-[var(--app-success)]" />
                </div>
                <div>
                    <h2 className="text-[20px] font-extrabold text-[var(--app-text-main)] mb-0.5 tracking-tight">건강 체크업</h2>
                    <p className="text-[13px] text-[var(--app-text-tertiary)] font-medium tracking-tight">아이의 사진을 찍어 건강 상태를 확인해보세요</p>
                </div>
            </div>

            <div className="bg-[var(--app-bg-main)] rounded-2xl border border-[var(--app-border)] p-5">
                <h3 className="text-[15px] font-bold text-[var(--app-text-main)] mb-3 flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-[var(--app-primary)]" /> 촬영 가이드
                </h3>
                <div className="flex lg:grid lg:grid-cols-3 gap-4 overflow-x-auto pb-2 custom-scrollbar lg:overflow-visible lg:pb-0 text-center">
                    {/* Guide items */}
                    <div className="min-w-[140px] lg:min-w-0 lg:w-full bg-white rounded-xl p-3 border border-[var(--app-border)]/50 shadow-sm flex flex-col items-center gap-2">
                        <div className="w-16 h-16 bg-[#F5E6D0] rounded-full flex items-center justify-center mb-1">
                            <span className="text-[24px]">🐕</span>
                        </div>
                        <span className="text-[13px] font-bold text-[var(--app-text-secondary)]">정면 사진</span>
                        <span className="text-[11px] text-[var(--app-text-tertiary)] leading-tight">얼굴과 가슴이 잘 보이게 밝은 곳에서 찍어주세요</span>
                    </div>
                    <div className="min-w-[140px] lg:min-w-0 lg:w-full bg-white rounded-xl p-3 border border-[var(--app-border)]/50 shadow-sm flex flex-col items-center gap-2">
                        <div className="w-16 h-16 bg-[#F5E6D0] rounded-full flex items-center justify-center mb-1">
                            <span className="text-[24px]">🐈</span>
                        </div>
                        <span className="text-[13px] font-bold text-[var(--app-text-secondary)]">측면 사진</span>
                        <span className="text-[11px] text-[var(--app-text-tertiary)] leading-tight">서 있는 상태에서 몸 전체가 나오도록 찍어주세요</span>
                    </div>
                    <div className="min-w-[140px] lg:min-w-0 lg:w-full bg-white rounded-xl p-3 border border-[var(--app-border)]/50 shadow-sm flex flex-col items-center gap-2">
                        <div className="w-16 h-16 bg-[#FFF0F0] rounded-full flex items-center justify-center mb-1">
                            <AlertCircle className="w-6 h-6 text-[var(--app-danger)]" />
                        </div>
                        <span className="text-[13px] font-bold text-[var(--app-danger)]">주의사항</span>
                        <span className="text-[11px] text-[var(--app-text-tertiary)] leading-tight">흔들린 사진이나 어두운 곳은 피해주세요</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 bg-white rounded-2xl border border-[var(--app-border)] p-6 flex flex-col items-center justify-center relative shadow-sm min-h-[300px]">
                {!preview ? (
                    <>
                        <div className="w-20 h-20 bg-[var(--app-bg-secondary)] rounded-full flex items-center justify-center mb-4 border-2 border-dashed border-[var(--app-primary)]/50">
                            <Upload className="w-8 h-8 text-[var(--app-primary)]" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-[16px] font-bold text-[var(--app-text-main)] mb-2">사진 업로드</h3>
                        <p className="text-[13px] text-[var(--app-text-tertiary)] text-center max-w-[250px] mb-6">
                            위에 안내된 가이드에 맞춰 촬영한 사진을 업로드 해주세요.
                        </p>
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />
                        <button
                            className="px-6 py-3 rounded-xl text-white font-bold text-[14px] shadow-md hover:opacity-90 active:scale-95 transition-all"
                            style={{ background: "linear-gradient(135deg, var(--app-primary), var(--app-primary-dark))" }}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            사진 선택하기
                        </button>
                    </>
                ) : (
                    <div className="w-full h-full flex flex-col items-center">
                        <div className="relative w-full max-w-[300px] aspect-square rounded-2xl overflow-hidden shadow-md mb-6 border border-[var(--app-border)]">
                            <img src={preview} alt="미리보기" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex items-center gap-2 text-[var(--app-success)] mb-6">
                            <CheckCircle2 className="w-5 h-5" />
                            <span className="font-bold text-[15px]">사진이 성공적으로 업로드되었습니다</span>
                        </div>
                        <div className="flex gap-3 w-full max-w-[300px]">
                            <button
                                className="flex-1 py-3 rounded-xl bg-[#F5E6D0] text-[#6B4F3A] font-bold text-[14px] hover:bg-[var(--app-border)] transition-colors"
                                onClick={clearFile}
                            >
                                다시 선택
                            </button>
                            <button
                                className="flex-1 py-3 rounded-xl text-white font-bold text-[14px] shadow-md hover:opacity-90 active:scale-95 transition-all"
                                style={{ background: "linear-gradient(135deg, var(--app-success), #8AAB81)" }}
                                onClick={() => alert("분석이 시작되었습니다. 잠시 기다려주세요.")}
                            >
                                분석 시작
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
