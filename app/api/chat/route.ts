import { NextResponse } from 'next/server';

const GOOGLE_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
const API_KEY = process.env.GEMINI_API_KEY!;

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
    }

    const payload = {
      contents: [
        {
          parts: [
            { text: message },
          ],
        },
      ],
    };

    const response = await fetch(`${GOOGLE_API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("data: ", data)
    console.log('Full Response from API:', JSON.stringify(data, null, 2));

    // Extract generated text
    const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from AI.';


    if (!generatedText) {
      return NextResponse.json({ response: 'No response from AI.' });
    }

    return NextResponse.json({ response: generatedText });
  } catch (error: any) {
    console.error('Chatbot Error:', error);
    return NextResponse.json({ error: 'Failed to get response from chatbot.', details: error.message }, { status: 500 });
  }
}
