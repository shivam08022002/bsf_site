# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# BSF User Site

## Project Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment on Vercel

1. Make sure all dependencies are installed:
```bash
npm install
```

2. Push your code to GitHub

3. Connect your GitHub repository to Vercel

4. Configure the build settings in Vercel:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Framework Preset: `Vite`

5. Deploy and enjoy!

## Troubleshooting Deployment

If you encounter build errors:

1. Check that all dependencies are installed:
```bash
npm install
```

2. Verify your package.json has no syntax errors and includes vite as a dependency

3. Ensure your vite.config.js is properly configured

4. Try running the build locally to identify any issues:
```bash
npm run build
```
