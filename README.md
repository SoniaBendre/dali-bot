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

## Git Repository Setup

To set up this project in a Git repository:

1. Initialize a Git repository:
   ```bash
   git init
   ```

2. Make sure your `.env` file is in `.gitignore` to avoid exposing sensitive tokens.

3. Add and commit your files:
   ```bash
   git add .
   git commit -m "Initial commit"
   ```

4. Create a repository on GitHub, GitLab, or your preferred Git hosting service.

5. Add the remote repository and push:
   ```bash
   git remote add origin https://github.com/yourusername/dali-bot.git
   git branch -M main
   git push -u origin main
   ```

## Deployment

For deployment, you have several options:

1. **Heroku**:
   - Create a Procfile with: `web: npm start`
   - Add your environment variables in the Heroku dashboard
   - Connect your GitHub repository

2. **Railway**:
   - Connect your GitHub repository
   - Add environment variables in the Railway dashboard

3. **AWS/GCP/Azure**:
   - Deploy to a virtual machine
   - Set up environment variables
   - Use PM2 or similar for process management

## Features

- Responds to direct messages with personalized tech recruiting advice
- Maintains conversation context for each user
- Provides DALI Lab and Dartmouth-specific tech recruiting guidance
- Focuses on internships and new grad positions in tech
- Offers interview preparation advice
- Suggests resume and portfolio improvements
- Explains tech company application processes
- Always online presence

## Tech Stack

- TypeScript
- Slack Bolt Framework with Socket Mode
- OpenAI GPT-4 Turbo
- Zod for validation
- ESM modules 