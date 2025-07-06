import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  console.log("Upload request received"); // Debug log

  try {
    const formData = await request.formData();
    console.log("FormData entries:", Array.from(formData.entries())); // Debug log

    const file = formData.get("image") as File | null;
    console.log("Received file:", file?.name, file?.type, file?.size); // Debug log

    if (!file) {
      console.log("No file found in FormData");
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      console.log("Invalid file type:", file.type);
      return NextResponse.json(
        { error: "Invalid file type. Please upload an image." },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    console.log("File buffer created"); // Debug log

    // Generate unique filename
    const filename = `${uuidv4()}${path.extname(file.name)}`;
    const uploadDir = path.join(process.cwd(), "public/uploads");
    const filePath = path.join(uploadDir, filename);
    console.log("Saving to:", filePath); // Debug log

    // Create uploads directory if it doesn't exist
    try {
      await writeFile(filePath, buffer);
      console.log("File saved successfully"); // Debug log
    } catch (err: any) {
      console.error("File save error:", err);
      if (err.code === "ENOENT") {
        const { mkdir } = await import("fs/promises");
        await mkdir(uploadDir, { recursive: true });
        await writeFile(filePath, buffer);
      } else {
        throw err;
      }
    }

    const imageUrl = `/uploads/${filename}`;
    console.log("Upload successful, URL:", imageUrl); // Debug log

    return NextResponse.json(
      {
        message: "File uploaded successfully",
        imageUrl,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
