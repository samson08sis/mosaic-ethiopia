type NoMatchProps = {
  msg: string;
  btnText: string;
  onClear: () => void;
};

export default function NoMatchesFound({
  onClear,
  msg,
  btnText,
}: NoMatchProps) {
  return (
    <div className="text-center py-12">
      <p className="text-xl text-gray-600 dark:text-gray-300">{msg}</p>
      <button
        onClick={onClear}
        className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors">
        {btnText}
      </button>
    </div>
  );
}
