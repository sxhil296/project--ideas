import { NextResponse } from "next/server";
import axios from "axios";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
console.log("Using OpenAI API Key:", OPENAI_API_KEY);

export async function POST(req: Request) {
  try {
    const reqData = await req.json();
    const { category, complexity, audience } = reqData;

    const prompt = `Give me some project ideas for the following criteria:
    Category: ${category}
    Complexity: ${complexity}
    Audience: ${audience}
    Please suggest a few interesting and feasible project ideas that align with the above criteria.`;

    // Send the request to OpenAI API
    const openAiResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that provides project ideas.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 100,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    const projectIdeas = openAiResponse.data.choices[0].message.content;

    return NextResponse.json({
      status: 200,
      result: projectIdeas,
    });
  } catch (error) {
    console.error("Error occurred:", error);

    if (axios.isAxiosError(error)) {
      console.error("Axios error response:", error.response?.data);
    }

    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}
