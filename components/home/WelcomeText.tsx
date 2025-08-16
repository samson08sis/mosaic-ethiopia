const fullText =
  "Ethiopia, the land of origins, invites you to discover its ancient wonders, diverse cultures, and breathtaking landscapes. From the rock-hewn churches of Lalibela to the otherworldly landscapes of the Danakil Depression, our carefully curated tours will take you on an unforgettable journey through one of Africa's most fascinating countries.";

export default function WelcomeText() {
  return (
    <div className="text-lg mb-4">
      {/* Mobile: Toggleable text using <details> */}
      <details className="md:hidden mb-6">
        <summary className="text-primary font-medium hover:underline cursor-pointer">
          Show More
        </summary>
        <p className="mt-2">{fullText}</p>
      </details>

      {/* Desktop: Always show full text */}
      <div className="hidden md:block">
        <p>{fullText}</p>
      </div>
    </div>
  );
}
