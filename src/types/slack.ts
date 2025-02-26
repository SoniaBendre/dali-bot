import { z } from 'zod';

// Environment variables schema
export const envSchema = z.object({
    SLACK_BOT_TOKEN: z.string().startsWith('xoxb-'),
    SLACK_APP_TOKEN: z.string().startsWith('xapp-'),
    OPENAI_API_KEY: z.string(),
});

// Infer the environment variables type
export type Env = z.infer<typeof envSchema>;

// Message types
export interface SlackMessage {
    user: string;
    text: string;
    ts: string;
    channel: string;
    type: 'message';
}

// User info types
export interface SlackUserInfo {
    real_name: string;
    name: string;
    id: string;
}

// Conversation context
export interface ConversationContext {
    userId: string;
    messages: Array<{
        role: 'system' | 'user' | 'assistant';
        content: string;
    }>;
    lastInteraction: Date;
} 