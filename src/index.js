require('dotenv').config();
const { App } = require('@slack/bolt');

// Initialize your app with your tokens
const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true
});

// Listen for direct messages
app.message(async ({ message, say }) => {
    try {
        // Get user info
        const userInfo = await app.client.users.info({
            user: message.user
        });

        const userName = userInfo.user.real_name || userInfo.user.name;

        // Simple response for now - we can enhance this later with more sophisticated logic
        const response = `Hi ${userName}! 👋 Thanks for your message. I'm here to help with recruiting-related questions. How can I assist you today?`;

        await say(response);
    } catch (error) {
        console.error('Error handling message:', error);
        await say("I'm sorry, I encountered an error processing your message. Please try again later.");
    }
});

// Start the app
(async () => {
    try {
        await app.start();
        console.log('⚡️ Recruiting Bot is running!');
    } catch (error) {
        console.error('Error starting app:', error);
        process.exit(1);
    }
})(); 