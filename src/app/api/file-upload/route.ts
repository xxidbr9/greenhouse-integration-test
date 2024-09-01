import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import stream from "stream";
import { promisify } from "util";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const pipeline = promisify(stream.pipeline);
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as Blob;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadResult = await new Promise<UploadApiResponse>(
      (resolve, reject) =>
        cloudinary.uploader
          .upload_stream(
            {
              folder: "form-apply", // specify a folder in Cloudinary
              resource_type: "auto", // automatically detect the file type
            },
            (error, result) => {
              if (error) reject(error);
              resolve(result as UploadApiResponse);
            },
          )
          .end(buffer),
    );

    return NextResponse.json({ success: true, data: uploadResult });
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
