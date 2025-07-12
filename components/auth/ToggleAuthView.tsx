export default function ToggleAuthView({
  isLogin,
  onToggle,
}: {
  isLogin: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="mt-6 text-center">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button
          type="button"
          onClick={onToggle}
          className="ml-1 font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
          {isLogin ? "Sign up" : "Sign in"}
        </button>
      </p>
    </div>
  );
}
