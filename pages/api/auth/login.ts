import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const BACKEND_URL = process.env.BACKEND_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { email, password } = req.body;

    const response = await axios.post(
      `${BACKEND_URL}api/auth/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
        headers: {
          Cookie: req.headers.cookie || "",
        },
      }
    );

    // Forward cookies from Express
    if (response.headers["set-cookie"]) {
      res.setHeader("Set-Cookie", response.headers["set-cookie"]);
    }

    return res.status(200).json(response.data);
  } catch (error: any) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || "Login failed";
    return res.status(status).json({ message });
  }
}
