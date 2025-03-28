export default function EthiopianPattern() {
  return (
    <div className="w-full h-8 relative overflow-hidden">
      <div className="absolute inset-0 flex">
        {/* Repeating Ethiopian-inspired pattern */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="flex-shrink-0">
            <div className="w-8 h-8 bg-primary-600 dark:bg-primary-500 transform rotate-45"></div>
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex" style={{ marginLeft: "16px" }}>
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="flex-shrink-0">
            <div className="w-8 h-8 bg-green-600 dark:bg-green-500 transform rotate-45"></div>
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex" style={{ marginLeft: "32px" }}>
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="flex-shrink-0">
            <div className="w-8 h-8 bg-yellow-500 dark:bg-yellow-400 transform rotate-45"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
