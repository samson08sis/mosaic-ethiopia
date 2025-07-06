const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

type FetchAPIProps = {
  endpoint: string;
  options?: { body: string; method: string; headers: object };
};

async function fetchAPI({
  endpoint,
  options = { body: "{}", method: "", headers: {} },
}: FetchAPIProps) {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    credentials: "include" as RequestCredentials, // For cookies
  };

  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url, config);
    console.log("XXXXX >>>  ", response);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "API request failed");
    }

    return await response.json();
  } catch (error) {
    console.error("API call error:", error);
    throw error; // Re-throw to let components handle specific errors
  }
}

export default fetchAPI;
