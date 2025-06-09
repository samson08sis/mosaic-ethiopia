export default function ResetPasswordLoading() {
  return (
    <div className="pt-20 pb-16 bg-theme min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">
                Loading reset form...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
