import AuthLeftPanel from "@/components/features/auth/AuthLeftPanel";
import LoginForm from "@/components/features/auth/LoginForm";

export default function RegisterPage() {
  return (
    <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-white">
      <LoginForm />
    </div>
  );
}
