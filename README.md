# Portfolio with Dashboard Access

This project provides a portfolio website with convenient access to its admin dashboard. The portfolio and dashboard remain separate applications but are connected for easy navigation.

## Features

- Portfolio website with professional design
- Easy access to the admin dashboard via navigation links
- Each application maintains its own functionality and UI

## Setup

1. Quick setup (install all dependencies):
   ```bash
   # Install dependencies for both portfolio and dashboard
   npm run setup
   ```

   Or install them manually:
   ```bash
   # Install portfolio dependencies
   npm install

   # Install dashboard dependencies
   cd dashboard && npm install
   ```

2. Start both applications:
   ```bash
   # Option 1: Run both in separate terminals
   # In the portfolio directory
   npm run dev
   
   # In a separate terminal, in the dashboard directory
   cd dashboard
   npm run dev
   
   # Option 2: Run both with a single command
   npm run dev:all
   ```

## How It Works

- The portfolio runs on port 5173 (default)
- The dashboard runs on port 5175
- The portfolio's vite.config.js is set up to proxy requests from http://localhost:5173/dashboard to http://localhost:5175
- Navigation links are configured to use the portfolio's URL (localhost:5173/dashboard)
- This allows users to access both applications from the same domain/port

## Development

When developing:
1. Run both applications in development mode with `npm run dev:all`
2. Make changes to each application independently
3. Access the dashboard through http://localhost:5173/dashboard
4. The portfolio will proxy requests to the dashboard application

## Deployment

For production:
1. Build both applications:
   ```bash
   # Build both portfolio and dashboard
   npm run build:all
   
   # Or build them separately
   npm run build        # Build portfolio only
   npm run build:dashboard  # Build dashboard only
   ```
   
2. Deploy the built files:
   - The main application from the `dist` directory
   - The dashboard is built into `public/dashboard` and included in the dist folder

## Port Configuration

The applications use the following ports:
- Portfolio: http://localhost:5173
- Dashboard: http://localhost:5175
- Dashboard access through portfolio: http://localhost:5173/dashboard

This setup allows both applications to run independently while providing a seamless experience for users who access the dashboard through the portfolio.

## Troubleshooting

If you encounter issues:

1. **Dashboard not accessible via portfolio**: 
   - Check that both applications are running
   - Verify the proxy configuration in portfolio/vite.config.js points to port 5175
   - Make sure the dashboard is configured to run on port 5175
   - Try accessing the dashboard directly at http://localhost:5175/dashboard

2. **API errors**: Verify that the backend API server is running on port 4000

3. **Navigation issues**: 
   - Make sure all links pointing to the dashboard use the correct URL (localhost:5173/dashboard)
   - Check that the Layout and Hero components have updated dashboard links

4. **Build errors**: Make sure both applications have their necessary dependencies installed before building
