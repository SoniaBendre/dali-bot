# DALI Lab Tech Recruiting Bot

A Slack bot that helps DALI Lab students at Dartmouth with tech recruiting questions. Uses GPT-4 and Slack's Socket Mode.

## About

This bot is designed to assist DALI Lab students with:
- Tech internship and new grad position questions
- Interview preparation for tech roles
- Resume and portfolio optimization
- Tech company application processes
- Career path guidance in tech
- Compensation expectations and negotiation strategies

## Setup

1. Create a Slack App in your workspace
2. Enable Socket Mode in your Slack App settings
3. Add the required bot scopes:
   - im:history
   - im:read
   - im:write
   - users:read
   - chat:write
4. Install the app to your workspace
5. Copy your Bot Token and App Level Token
6. Create a `.env` file with your tokens:
   ```
   SLACK_APP_TOKEN=xapp-your-app-token
   SLACK_BOT_TOKEN=xoxb-your-bot-token
   OPENAI_API_KEY=your-openai-api-key
   ```

## Installation

```bash
npm install
```

## Running the Bot

Development mode with auto-reload:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Production mode:
```bash
npm start
```

## Tech Stack

- TypeScript
- Slack Bolt Framework with Socket Mode
- OpenAI GPT-4 Turbo
- Zod for validation
- ESM modules 