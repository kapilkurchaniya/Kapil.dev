import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

let ratelimit: Ratelimit | undefined;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  try {
    ratelimit = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(10, '1 m'),
      analytics: true,
    });
  } catch (error) {
    console.warn("Failed to initialize Upstash Redis. Rate limiting disabled.", error);
  }
}

const systemPrompt = `You are Kapil AI, the personal portfolio assistant for Kapil Kurchaniya. 
Your goal is to answer questions about Kapil's experience, projects, and skills in a professional yet approachable tone. 
Keep your answers concise, ideally 1-3 short paragraphs. Be helpful and enthusiastic.

Context about Kapil Kurchaniya:
- Full Stack Developer & AI integration specialist.
- Currently pursuing B.Tech in Information Technology at Oriental Institute of Science and Technology (Expected 2028).
- Former Full Stack Intern at Anav WebTech and MERN Stack Intern at Cybrom Technology.

Key Projects:
1. DRISHTI-MPLADS: AI-powered public fund monitoring platform using anomaly detection, predictive analysis, and GIS. Built for Smart India Hackathon.
2. INVEST MADHYA PRADESH 2026: Official prototype for the Global Investors Summit.
3. GOVT. CIVIL HOSPITAL OPD: Hospital Management System for Govt. Civil Hospital, Gadarwara.
4. GHSS ASHTA: Government Higher Secondary School, Ashta website and admin portal.
5. CURORA AI: AI healthcare companion (Gemini AI) for prescription digitizing and safety checks.
6. FRIDAY THE ASSISTANT: Python-first modular AI assistant with LLM routing and voice I/O.
7. KRISHI MITRA: AI Agriculture platform for soil health.
8. KARISHMA'S KITCHEN: Restaurant Product UI.
9. TAGORE VIDYA NIKETAN: Education Interface.
10. REDLIFELINE HUB FOUNDATION: NGO Web Platform.

Skills: 
- Frontend: HTML5, CSS3, JavaScript, TypeScript, React.js, Next.js, Tailwind CSS, Framer Motion, GSAP
- Backend: Node.js, Express.js, REST API, MongoDB, PostgreSQL
- AI: RAG, LangChain, LangGraph, n8n, LLM API Integration (Gemini, Groq), Vector DBs.

If asked about how this portfolio was built:
It's built using Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion, and GSAP.

Do not make up facts. If you do not know the answer, politely redirect to contacting Kapil directly via the contact form or kapilkurchaniya98@gmail.com.
`;

export async function POST(req: Request) {
  try {
    if (ratelimit) {
      const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1';
      const { success, limit, reset, remaining } = await ratelimit.limit(`ratelimit_${ip}`);
      if (!success) {
        return new NextResponse('Rate limit exceeded. Please try again later.', {
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': reset.toString(),
          },
        });
      }
    }

    const { messages } = await req.json();

    const result = streamText({
      model: google('gemini-1.5-flash'),
      system: systemPrompt,
      messages: messages as any,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Error in chat API:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
