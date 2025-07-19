import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google AI SDK
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');

export async function analyzeDeploymentIssue(errorLogs: string, codebaseInfo: string) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
    I'm having persistent deployment issues with my Next.js app on Vercel. Here are the error logs and codebase information:

    ERROR LOGS:
    ${errorLogs}

    CODEBASE INFO:
    ${codebaseInfo}

    Please analyze this and provide:
    1. Root cause of the deployment failure
    2. Specific steps to fix the issue
    3. Code changes needed
    4. Any configuration issues

    Be very specific and actionable in your response.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return 'Failed to analyze with Gemini. Please check your API key and try again.';
  }
}

export async function analyzeCodeStructure() {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
    Analyze this Next.js project structure and identify potential issues:

    Project Structure:
    - app/ (Next.js app directory)
      - lib/mock-data.ts (exports mockVoters)
      - lib/utils.ts (exports cn function)
      - minivan/page.tsx (imports mockVoters)
      - the-van/page.tsx (imports mockVoters)
    - components/ (UI components)
      - main-nav.tsx (imports utils)
      - ui/ (shadcn/ui components)
    - lib/ (root lib directory)
      - mock-data.ts (exports mockVoters)
      - utils.ts (exports cn function)
    - tsconfig.json (path mapping: "@/*": ["./*", "./app/*"])

    Common Issues:
    1. Module resolution problems
    2. Path mapping conflicts
    3. Import/export mismatches
    4. Build configuration issues

    What specific issues do you see and how should they be fixed?
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return 'Failed to analyze code structure with Gemini.';
  }
}

export async function generateFixStrategy(issue: string) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
    I have this deployment issue: ${issue}

    Please provide a step-by-step fix strategy including:
    1. Immediate actions to take
    2. Code changes needed
    3. Configuration updates
    4. Testing steps
    5. Alternative approaches if the first doesn't work

    Be very specific with file names, code snippets, and commands.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return 'Failed to generate fix strategy with Gemini.';
  }
} 