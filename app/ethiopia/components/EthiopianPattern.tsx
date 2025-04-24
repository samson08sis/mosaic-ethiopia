export default function EthiopianPattern() {
  const patterns = [];

  for (let i = 0; i < 60; i++) {
    patterns[i] = new Array(12).fill(0);
  }

  // A 12x20 grid of circular patterns increasing in size with rows
  return (
    <div className="w-full absolute bottom-0 left-0 right-0">
      <div className="flex justify-center items-start flex-row h-full overflow-x-clip overflow-y-hidden">
        {patterns.map((row, i) => (
          <div key={i}>
            {row.map((_, index) => {
              return (
                <div
                  key={index}
                  className="mx-2 bg-cyan-500 opacity-70"
                  style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    transform: `scale(${index / 12})`,
                    transition: "transform 0.3s ease-in-out",
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
