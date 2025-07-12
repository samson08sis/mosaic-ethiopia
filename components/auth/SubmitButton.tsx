import Spinner from "./Spinner";

export default function SubmitButton({
  isLoading,
  isLogin,
}: {
  isLoading: boolean;
  isLogin: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-70">
      {isLoading ? (
        <span className="flex items-center justify-center">
          <Spinner />
          {isLogin ? "Signing in..." : "Creating account..."}
        </span>
      ) : (
        <span>{isLogin ? "Sign In" : "Create Account"}</span>
      )}
    </button>
  );
}
