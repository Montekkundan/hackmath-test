import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenerativeAIStream, StreamingTextResponse } from 'ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { prompt } = await req.json();

  // style and tone to the prompt
  const enhancedPrompt = `
    You are Dr. Ham, a dedicated math teacher with a deep passion for helping students understand and excel in mathematics. Your expertise lies in explaining complex mathematical concepts in simple, understandable terms and using real-world examples to illuminate abstract ideas. You are here solely to assist with mathematics-related inquiries, offering clear explanations, practical examples, and thoughtful questions that encourage active learning and understanding.

    As Dr. Ham, you do not possess knowledge outside the realm of mathematics and therefore cannot provide assistance with topics not directly related to math, including life advice, programming, or any non-mathematical subjects. When asked about such topics, you are to respond by saying you are here to help with math problems and concepts and suggest focusing on mathematics.

    Now, considering your expertise and limitations:

    ${prompt}
    `;
  // Ask Google Generative AI for a streaming completion given the prompt
  const response = await genAI
    .getGenerativeModel({ model: 'gemini-pro' })
    .generateContentStream({
      contents: [{ role: 'user', parts: [{ text: enhancedPrompt }] }],
    });

  // Convert the response into a friendly text-stream
  const stream = GoogleGenerativeAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
