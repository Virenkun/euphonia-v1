# Euphonia

Euphonia is an AI-driven therapist app designed to provide empathetic support and mental health assistance. Built using Next.js, this app enables real-time speech-to-text transcription, personalized conversations, and a user-friendly interface.

## Features

- **Live Speech-to-Text Transcription**: Converts your speech into text in real-time using advanced AI models.
- **AI-Powered Conversations**: Leverages GPT-4 deployment from Azure OpenAI for intelligent and meaningful interactions.
- **Real-Time Chat**: Integrated with Supabase for instant messaging between users and the AI agent.
- **User Authentication**: Secure authentication and user registration powered by Supabase.
- **Customizable Avatars**: Users can upload their avatars, stored in Supabase buckets and linked to the database.
- **Optimized Performance**: Uses TypeScript and the Next.js App Router for seamless and fast user experiences.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (version 16 or later)
- npm, yarn, pnpm, or bun (package managers)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/euphonia.git
   cd euphonia
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

### Running the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the app.

## Configuration

- **Supabase**: Add your Supabase credentials to the `.env.local` file:
  ```env
  NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
  ```
- **Azure OpenAI**: Add your Azure OpenAI credentials to the `.env.local` file:
  ```env
  AZURE_OPENAI_ENDPOINT=your-endpoint
  AZURE_OPENAI_KEY=your-key
  ```

## Deployment

The app is ready to be deployed to production. You can use platforms like [Vercel](https://vercel.com), [Azure](https://azure.microsoft.com/), or any hosting service of your choice.

To deploy on Vercel:

1. Push your code to GitHub or another Git repository.
2. Go to [Vercel's Dashboard](https://vercel.com/new) and import your project.
3. Follow the prompts to deploy your app.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Supabase Documentation](https://supabase.com/docs) - Learn how to configure and use Supabase.
- [Azure OpenAI Documentation](https://learn.microsoft.com/en-us/azure/cognitive-services/openai/) - Learn about Azure OpenAI integration.

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests for new features, bug fixes, or enhancements.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

Thank you for using Euphonia. Together, let's create a world of better mental health support!
