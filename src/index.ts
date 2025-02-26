import { App, LogLevel } from '@slack/bolt';
import { config } from 'dotenv';
import { envSchema, type SlackMessage } from './types/slack';
import { OpenAIService } from './services/openai';

// Load and validate environment variables
config();
const env = envSchema.parse(process.env);

// Initialize services
const openAIService = new OpenAIService(env.OPENAI_API_KEY);

// Initialize the Slack app with TypeScript types
const app = new App({
    token: env.SLACK_BOT_TOKEN,
    appToken: env.SLACK_APP_TOKEN,
    socketMode: true,
    logLevel: LogLevel.DEBUG,
});

// Message handler with proper typing
app.message(async ({ message, say }) => {
    try {
        const typedMessage = message as SlackMessage;

        // Get user info with proper error handling
        const result = await app.client.users.info({
            user: typedMessage.user,
        });

        if (!result.ok || !result.user) {
            throw new Error('Failed to fetch user info');
        }

        const userName = result.user.real_name ?? result.user.name ?? 'there';

        // Show typing indicator
        await app.client.chat.postMessage({
            channel: typedMessage.channel,
            text: '...',
        });

        // Get response from OpenAI
        const response = await openAIService.getResponse(
            typedMessage.user,
            userName,
            typedMessage.text
        );

        // Send the response
        await say({
            text: response,
            blocks: [
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: response,
                    },
                },
            ],
        });
    } catch (error) {
        console.error('Error handling message:', error);

        await say({
            text: "I'm sorry, I encountered an error processing your message. Please try again later.",
            blocks: [
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: '❌ I encountered an error processing your message. Please try again later.',
                    },
                },
            ],
        });
    }
});

// Start the app with proper error handling
const startApp = async (): Promise<void> => {
    try {
        await app.start();
        console.log('⚡️ Recruiting Bot is running!');
    } catch (error) {
        console.error('Failed to start app:', error);
        process.exit(1);
    }
};

// Use void to explicitly mark the promise as handled
void startApp(); 