"use client";

type SocialLoginButtonsProps = {
  onSocialLogin: (provider: string) => void;
};

export default function SocialLoginButtons({
  onSocialLogin,
}: SocialLoginButtonsProps) {
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

      <div className="mt-6 grid grid-cols-3 gap-3">
        <button
          type="button"
          onClick={() => onSocialLogin("google")}
          className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
          <svg
            className="h-5 w-5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 24 24">
            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => onSocialLogin("facebook")}
          className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
          <svg
            className="h-5 w-5 text-blue-600"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => onSocialLogin("apple")}
          className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
          <svg
            className="h-5 w-5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M12.146 0c.66.028 1.465.2 2.225.6a5.097 5.097 0 011.71 1.866c.203.427.305.935.407 1.866-.61.234-1.32.702-1.827 1.298-.508.596-.914 1.426-.914 2.267 0 .84.406 1.67.914 2.266.508.596 1.218 1.064 1.827 1.298-.102.932-.204 1.44-.407 1.866a5.097 5.097 0 01-1.71 1.866c-.76.4-1.564.573-2.225.6-.66-.027-1.465-.2-2.225-.6a5.097 5.097 0 01-1.71-1.866c-.203-.427-.305-.934-.407-1.866.61-.234 1.32-.702 1.827-1.298.508-.596.914-1.426.914-2.266 0-.84-.406-1.67-.914-2.267-.508-.596-1.218-1.064-1.827-1.298.102-.931.204-1.44.407-1.866a5.097 5.097 0 011.71-1.866c.76-.4 1.564-.572 2.225-.6zM8.12 10.464c.254-.572.508-1.143.66-1.714.153-.572.203-1.143.203-1.714 0-.572-.05-1.143-.203-1.714-.152-.572-.406-1.143-.66-1.715.254-.571.508-1.143.66-1.714.153-.571.203-1.143.203-1.714h7.56c0 .571.05 1.143.203 1.714.152.571.406 1.143.66 1.714-.254.572-.508 1.143-.66 1.715-.153.571-.203 1.142-.203 1.714 0 .571.05 1.142.203 1.714.152.571.406 1.142.66 1.714-.254.571-.508 1.143-.66 1.714-.153.571-.203 1.143-.203 1.714H9.186c0-.571-.05-1.143-.203-1.714-.152-.571-.406-1.143-.66-1.714z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
