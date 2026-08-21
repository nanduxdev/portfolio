# Nandan Nagane — Personal Portfolio

A modern, responsive personal portfolio website built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Shadcn UI**. Features a project showcase, work experience timeline, AI chat assistant, and a contact form with Telegram integration.

## About

This is the personal portfolio of **Nandan Nagane**, a Full Stack Developer from Pune, India — showcasing my projects, work experience, and technical skills. Built with the same stack I use day-to-day: Next.js, NestJS, TypeScript, and PostgreSQL.

- 🌐 GitHub: [github.com/nanduxdev](https://github.com/nanduxdev)
- 💼 LinkedIn: [linkedin.com/in/nanduxdev](https://linkedin.com/in/nanduxdev)
- 📧 Email: naganenandan@gmail.com

## Features

- **Next.js 15** with App Router
- **Tailwind CSS** + **Shadcn UI** components
- **Dark / Light** mode toggle
- **Responsive** design across all screen sizes
- **MDX** for rich project detail pages
- **AI Chat Assistant** powered by Gemini API
- **Contact Form** with Telegram bot integration
- **Umami Analytics** — privacy-focused, cookie-free web analytics
- **View Transitions** for smooth page navigation
- **SEO** optimized with metadata, OG tags, and sitemap
- **TypeScript** throughout for full type safety

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- Bun (preferred) or npm

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
TELEGRAM_BOT_TOKEN="your-token"
TELEGRAM_CHAT_ID="your-chat-id"
GEMINI_API_KEY="your-api-key"
NODE_ENV="development"
NEXT_PUBLIC_URL="http://localhost:3000"
NEXT_PUBLIC_UMAMI_SRC="your-umami-script-url"
NEXT_PUBLIC_UMAMI_ID="your-umami-website-id"
```

### Setting up Telegram Integration

1. Create a new bot with [@BotFather](https://t.me/botfather) on Telegram
2. Copy the bot token and add it to your `.env` file as `TELEGRAM_BOT_TOKEN`
3. Start a chat with your bot and send any message (e.g., "hello")
4. Get your chat ID:

   ```bash
   # Run the test script to get your chat ID
   bun run test-telegram
   ```

   - The script will show your Chat ID from the message you sent
   - Copy the Chat ID and add it to your `.env` file as `TELEGRAM_CHAT_ID`
   - Run the script again to verify everything works

### Setting up Umami Analytics

1. Visit Umami:
   - Self-host Umami or use [Umami Cloud](https://cloud.umami.is)
   - Follow Umami's [installation guide](https://umami.is/docs/install)

2. Get your credentials:
   - Copy your Umami script URL (ends with `/script.js`)
   - Get your website ID from Umami dashboard

3. Configure environment variables:
   ```env
   NEXT_PUBLIC_UMAMI_SRC="https://[your-umami-instance]/script.js"
   NEXT_PUBLIC_UMAMI_ID="your-website-id"
   ```

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/nanduxdev/portfolio.git
   cd portfolio
   ```

2. Install dependencies:

   ```bash
   # Using bun (recommended)
   bun install

   # Using npm
   npm install
   ```

3. Run the development server:

   ```bash
   # Using bun
   bun dev

   # Using npm
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Configuration

All site content lives in `src/config/` — edit these files to update the site:

| File             | Controls                                                 |
| ---------------- | -------------------------------------------------------- |
| `Hero.tsx`       | Name, headline, description, skills badges, social links |
| `About.tsx`      | About section bio                                        |
| `Experience.tsx` | Work experience timeline entries                         |
| `Projects.tsx`   | Project cards and metadata                               |
| `Contact.tsx`    | Contact form settings                                    |
| `Navbar.tsx`     | Navigation links                                         |
| `Footer.tsx`     | Footer links and content                                 |
| `Meta.tsx`       | SEO metadata, OG image, site URL                         |
| `Resume.ts`      | Resume / CV section                                      |
| `Quote.ts`       | Random quote pool                                        |
| `cat.ts`         | Toggle the Oneko cat easter egg                          |

## Adding Technology Icons

1. Visit [Devicon](https://devicon.dev/) to find the icon SVG
2. Create a new component in `src/components/technologies/`
3. Follow the pattern of existing components:

```tsx
export default function MyTech() {
  return (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      {/* SVG content from Devicon */}
    </svg>
  );
}
```

## Adding Projects

1. Create a new MDX file in `src/data/projects/`
2. Write the project description and tech breakdown in MDX
3. Add a project thumbnail to `public/project/`
4. Register the project entry in `src/config/Projects.tsx`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
