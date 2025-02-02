import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { generatePrompt } from '@/services/geminiService';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { category, query } = body;

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = generatePrompt(category, query);

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const cleanText = text
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();

        return NextResponse.json(JSON.parse(cleanText));
    } catch (error) {
        console.error('AI Error:', error);
        return NextResponse.json(
            { error: 'AI servisi şu anda kullanılamıyor' },
            { status: 500 }
        );
    }
} 