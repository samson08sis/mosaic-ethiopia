import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  console.log("Registration data:", req.body);

  // Mock response - replace with your actual registration logic
  res.status(200).json({
    success: true,
    user: {
      id: "123",
      name: req.body.name,
      email: req.body.email,
    },
  });
}
