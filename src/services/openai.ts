import OpenAI from 'openai';
import type { ConversationContext } from '../types/slack';

export class OpenAIService {
    private openai: OpenAI;
    private contexts: Map<string, ConversationContext>;

    constructor(apiKey: string) {
        this.openai = new OpenAI({ apiKey });
        this.contexts = new Map();
    }

    private getSystemPrompt(): string {
        return `You are a specialized tech recruiting assistant for students at the DALI Lab at Dartmouth College.

ABOUT DALI LAB:
The DALI Lab is Dartmouth's premier digital arts and innovation lab where students collaborate on software development, design, and digital solutions.

YOUR ROLE:
- Help DALI Lab students navigate the tech recruiting landscape
- Provide specific guidance on internships and new grad positions in the tech industry
- Share insights about interview preparation, resume building, and portfolio development
- Offer advice on tech company application processes and timelines
- Explain different tech roles and career paths
- Discuss compensation expectations and negotiation strategies
- Provide resources for technical interview preparation

FOCUS AREAS:
- College tech recruiting (internships and new grad positions)
- Software engineering, product management, UX/UI design, and data science roles
- Big tech companies, startups, and tech-adjacent industries
- Technical interview preparation (coding challenges, system design, behavioral)
- Resume and portfolio optimization for tech roles
- Networking strategies in the tech industry

TONE AND APPROACH:
- Be professional but approachable and student-friendly
- Provide specific, actionable advice based on current industry practices
- Balance honesty about the competitive nature of tech recruiting with encouragement
- Acknowledge the unique perspective of Dartmouth and DALI Lab students
- Use concrete examples when possible
- Ask clarifying questions when needed to provide better guidance
- Keep responses concise but informative

CONSTRAINTS:
- Don't make promises about specific outcomes
- Avoid giving outdated information about tech recruiting
- Don't claim to represent specific companies
- Maintain confidentiality and professionalism`;
    }

    private getContext(userId: string): ConversationContext {
        if (!this.contexts.has(userId)) {
            this.contexts.set(userId, {
                userId,
                messages: [
                    {
                        role: 'system',
                        content: this.getSystemPrompt(),
                    },
                ],
                lastInteraction: new Date(),
            });
        }
        return this.contexts.get(userId)!;
    }

    public async getResponse(userId: string, userName: string, message: string): Promise<string> {
        const context = this.getContext(userId);

        // For first-time users, add a personalized greeting
        if (context.messages.length === 1) { // Only system message exists
            const greeting = `Hi ${userName}! 👋 I'm Recru, the DALI Lab Tech Recruiting Assistant. I can help you with questions about tech internships, new grad positions, interview prep, resume building, and navigating the tech industry as a Dartmouth student. What would you like to know about tech recruiting?`;

            // Add assistant greeting to context
            context.messages.push({
                role: 'assistant',
                content: greeting,
            });

            // Return the greeting for first-time users
            return greeting;
        }

        // Add user message to context
        context.messages.push({
            role: 'user',
            content: message,
        });

        try {
            const completion = await this.openai.chat.completions.create({
                model: 'gpt-4-turbo-preview',
                messages: context.messages,
                temperature: 0.7,
                max_tokens: 800,
            });

            const responseText = completion.choices[0]?.message?.content ||
                'I apologize, but I am unable to provide a response at this time.';

            // Add assistant response to context
            context.messages.push({
                role: 'assistant',
                content: responseText,
            });

            // Update last interaction time
            context.lastInteraction = new Date();

            // Trim context if it gets too long (keep last 10 messages)
            if (context.messages.length > 11) { // 1 system message + 10 conversation messages
                context.messages = [
                    context.messages[0], // Keep system message
                    ...context.messages.slice(-10), // Keep last 10 messages
                ];
            }

            return responseText;
        } catch (error) {
            console.error('OpenAI API Error:', error);
            throw new Error('Failed to generate response');
        }
    }
} 