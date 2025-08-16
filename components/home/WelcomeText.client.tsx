"use client";

import { useState } from "react";

export default function WelcomeText() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const shortText =
    "Ethiopia, the land of origins, invites you to discover its ancient wonders, diverse cultures, and breathtaking landscapes...";

  const fullText =
    "Ethiopia, the land of origins, invites you to discover its ancient wonders, diverse cultures, and breathtaking landscapes. From the rock-hewn churches of Lalibela to the otherworldly landscapes of the Danakil Depression, our carefully curated tours will take you on an unforgettable journey through one of Africa's most fascinating countries.";

  return (
    <>
      <div className="text-lg mb-4">
        {/* Show short text on mobile when not expanded, full text otherwise */}
        <div className="md:hidden">{isExpanded ? fullText : shortText}</div>
        {/* Always show full text on desktop */}
        <div className="hidden md:block">{fullText}</div>
      </div>
      {/* Show More/Less button only on mobile */}
      <div className="md:hidden mb-6">
        <button
          onClick={toggleExpand}
          className="text-primary font-medium hover:underline focus:outline-none">
          {isExpanded ? "Show Less" : "Show More"}
        </button>
      </div>
    </>
  );
}
