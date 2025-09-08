import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: "en" | "jp";
}

const LoginModal = ({ isOpen, onClose, language }: LoginModalProps) => {
  const text = {
    en: {
      continueWithGoogle: "Continue with Google",
      or: "or",
      email: "EMAIL",
      password: "PASSWORD",
      logIn: "Log In",
      useSingleSignOn: "Use single sign-on",
      resetPassword: "Reset password",
      noAccountCreate: "No account? Create one",
      termsText: "By registering, you agree to consent to the KokoroLab Privacy Policy and Terms of Service."
    },
    jp: {
      continueWithGoogle: "Googleで続行",
      or: "または",
      email: "メールアドレス",
      password: "パスワード",
      logIn: "ログイン",
      useSingleSignOn: "シングルサインオンを使用",
      resetPassword: "パスワードをリセット",
      noAccountCreate: "アカウントをお持ちでない方は作成",
      termsText: "登録することで、KokoroLabのプライバシーポリシーおよび利用規約に同意したものとみなされます。"
    }
  };

  const currentText = text[language];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-w-sm w-full p-0 gap-0 bg-white dark:bg-gray-900">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-10"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <div className="p-8 space-y-6">
          {/* Google Sign In */}
          <Button
            variant="outline"
            className="w-full h-12 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {currentText.continueWithGoogle}
          </Button>

          {/* Divider */}
          <div className="flex items-center">
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
            <span className="px-3 text-sm text-gray-500 dark:text-gray-400">{currentText.or}</span>
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">
              {currentText.email}
            </Label>
            <Input
              type="email"
              className="h-12 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">
              {currentText.password}
            </Label>
            <Input
              type="password"
              className="h-12 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
            />
          </div>

          {/* Login Button */}
          <Button className="w-full h-12 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
            {currentText.logIn}
          </Button>

          {/* Additional Links */}
          <div className="text-center space-y-2">
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              {currentText.useSingleSignOn}
            </button>
            <br />
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              {currentText.resetPassword}
            </button>
            <br />
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              {currentText.noAccountCreate}
            </button>
          </div>

          {/* Terms Text */}
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center leading-relaxed">
            {currentText.termsText}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;