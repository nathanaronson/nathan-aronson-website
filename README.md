# Nathan Aronson – Personal Website

Live: [seas.upenn.edu/~narons/](https://seas.upenn.edu/~narons/)

## Structure
```
src/
├── components/
│   ├── Navigation.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Experiences.tsx
│   ├── Projects.tsx
│   └── Footer.tsx
├── css/
│   └── main.css
├── assets/
│   └── *.png
├── App.tsx
├── main.tsx
└── vite-env.d.ts
```

## Tech Stack
- React 18
- TypeScript 5
- Vite
- CSS3
- Font Awesome, Google Fonts

## Setup
1. Clone:
   ```bash
   git clone <repository-url>
   cd website
   ```
2. Install:
   ```bash
   npm install
   ```
3. Develop:
   ```bash
   npm run dev
   ```

## Scripts
- `npm run dev` — Development server
- `npm run build` — Production build
- `npm run preview` — Preview build
- `npm run format` — Format all files (Prettier)
- `npm run format:check` — Check if files need formatting (Prettier)

## Deployment
1. Build: `npm run build`
2. Deploy the `dist` folder to your static host
