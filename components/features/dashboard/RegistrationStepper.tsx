// components/features/dashboard/RegistrationStepper.tsx
import {
  Check,
  Users,
  Lock,
  UserPen,
  CreditCard,
  CloudUpload,
} from "lucide-react";

interface RegistrationStepperProps {
  isProfileComplete: boolean;
  isTeamComplete: boolean;
  isPaymentComplete: boolean;
}

export default function RegistrationStepper({
  isProfileComplete,
  isTeamComplete,
  isPaymentComplete,
}: RegistrationStepperProps) {
  // Tentukan status tiap step secara berurutan
  const steps = [
    {
      label: "Lengkapi Profil",
      status: isProfileComplete ? "completed" : "active",
      icon: isProfileComplete ? (
        <Check className="w-6 h-6" />
      ) : (
        <UserPen className="w-5 h-5" />
      ),
    },
    {
      label: "Bentuk Tim",
      status: !isProfileComplete
        ? "locked"
        : isTeamComplete
          ? "completed"
          : "active",
      icon: isTeamComplete ? (
        <Check className="w-6 h-6" />
      ) : isProfileComplete ? (
        <Users className="w-5 h-5" />
      ) : (
        <Lock className="w-5 h-5" />
      ),
    },
    {
      label: "Pembayaran",
      status: !isTeamComplete
        ? "locked"
        : isPaymentComplete
          ? "completed"
          : "active",
      icon: isPaymentComplete ? (
        <Check className="w-6 h-6" />
      ) : isTeamComplete ? (
        <CreditCard className="w-5 h-5" />
      ) : (
        <Lock className="w-5 h-5" />
      ),
    },
    {
      label: "Unggah Karya",
      status: !isPaymentComplete ? "locked" : "active",
      icon: isPaymentComplete ? (
        <CloudUpload className="w-5 h-5" />
      ) : (
        <Lock className="w-5 h-5" />
      ),
    },
  ];

  // Warna garis penghubung ANTAR step
  const segmentColor = steps
    .slice(0, -1)
    .map((step) =>
      step.status === "completed" ? "bg-blue-600" : "bg-slate-200",
    );

  return (
    <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900 mb-8">
        Status Pendaftaran
      </h3>

      <div className="grid grid-cols-4 max-w-4xl mx-auto">
        {steps.map((step, i) => (
          <div key={step.label} className="relative flex flex-col items-center">
            {/* Separuh garis kiri */}
            {i > 0 && (
              <div
                className={`absolute right-1/2 top-6 w-1/2 h-0.5 ${segmentColor[i - 1]}`}
              />
            )}
            {/* Separuh garis kanan */}
            {i < steps.length - 1 && (
              <div
                className={`absolute left-1/2 top-6 w-1/2 h-0.5 ${segmentColor[i]}`}
              />
            )}

            {/* Lingkaran ikon */}
            <div
              className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center shadow-sm ${
                step.status === "completed"
                  ? "bg-[#2F2FE4] text-white"
                  : step.status === "active"
                    ? "bg-white border-2 border-[#2F2FE4] text-[#2F2FE4]"
                    : "bg-slate-50 border border-slate-100 text-slate-300 shadow-none"
              }`}
            >
              {step.icon}
            </div>

            <span
              className={`relative z-10 mt-3 text-sm font-medium text-center px-2 ${
                step.status === "completed"
                  ? "text-slate-900"
                  : step.status === "active"
                    ? "text-[#2F2FE4]"
                    : "text-slate-400"
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
