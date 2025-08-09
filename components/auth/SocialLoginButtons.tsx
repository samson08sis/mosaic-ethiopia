"use client";

import { AppleIcon, FacebookIcon, GoogleIcon } from "../ui/svgs/SocialSVG";

type SocialLoginButtonsProps = {
  onSocialLogin: (provider: string) => void;
};

export default function SocialLoginButtons({
  onSocialLogin,
}: SocialLoginButtonsProps) {
  const socialLoginButtons = [
    {
      onClickParam: "google",
      className:
        "bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 focus:ring-google-500 border border-gray-200 dark:border-gray-700",
      svgIcon: <GoogleIcon />,
      text: "Google",
    },
    // {
    //   onClickParam: "facebook",
    //   className:
    //     "bg-[#1877F2] hover:bg-[#166FE5] text-white focus:ring-facebook-500",
    //   svgIcon: <FacebookIcon />,
    //   text: "Facebook",
    // },
    // {
    //   onClickParam: "apple",
    //   className: "bg-black hover:bg-gray-900 text-white focus:ring-apple-500",
    //   svgIcon: <AppleIcon />,
    //   text: "Apple",
    // },
  ];
  return (
    <div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
            Or continue with
          </span>
        </div>
      </div>

      <div className={`mt-6 grid grid-cols-1 gap-3`}>
        {socialLoginButtons.map((btn) => (
          <button
            key={btn.text}
            type="button"
            onClick={() => onSocialLogin("google")}
            className={`w-full inline-flex justify-center py-2.5 px-4 bg-white rounded-lg shadow-sm ${btn.className} transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2`}>
            {btn.svgIcon}
            <span className="sr-only">Sign in with {btn.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
