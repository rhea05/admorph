import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    console.log("📩 API Request Received");

    const { prompt, feedback } = await req.json();
    console.log("📜 Prompt Received:", prompt);
    console.log("💬 User Feedback:", feedback || "No feedback provided");

    // Adjust the prompt based on feedback
    const refinedPrompt = feedback
      ? `${prompt}. Adjust according to the following feedback: ${feedback}`
      : prompt;

    // Call Hugging Face API
    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: refinedPrompt }),
      }
    );

    if (!response.ok) {
      throw new Error(`Hugging Face API error: ${response.status}`);
    }

    // Convert response to a Buffer
    const imageBuffer = await response.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString("base64");

    // Construct a data URL
    const imageUrl = `data:image/png;base64,${base64Image}`;

    console.log("📸 Generated Image URL:", imageUrl.substring(0, 50) + "...");

    return NextResponse.json({ imageUrl }, { status: 200 });
  } catch (error) {
    console.error("🚨 Hugging Face API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate image." },
      { status: 500 }
    );
  }
}
