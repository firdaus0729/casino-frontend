# Vercel Deployment Guide - Frontend

This is a quick reference guide for deploying the OK777 frontend to Vercel.

## Quick Start

1. **Create Vercel Project**
   - Go to https://vercel.com
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Select the frontend directory

2. **Configure Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add: `NEXT_PUBLIC_API_BASE_URL`
   - Value: Your Railway backend URL (e.g., `https://ok777-backend.up.railway.app`)
   - Add for: Production, Preview, and Development

3. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy
   - Your site will be live at: `https://your-project.vercel.app`

4. **Get Your Frontend URL**
   - Copy your Vercel domain
   - Use this URL in backend `FRONTEND_URL` environment variable

## Configuration Files

- `vercel.json`: Vercel-specific configuration
- `next.config.js`: Next.js configuration
- `package.json`: Contains build scripts

## Build Process

Vercel will automatically:
1. Install dependencies: `npm install`
2. Build Next.js app: `npm run build`
3. Deploy to edge network

## Environment Variables

**Required:**
- `NEXT_PUBLIC_API_BASE_URL`: Your Railway backend URL

**Note:** Only variables prefixed with `NEXT_PUBLIC_` are accessible in the browser.

## Integration with Backend

1. **Set Backend URL**
   - In Vercel: `NEXT_PUBLIC_API_BASE_URL=https://your-backend.up.railway.app`

2. **Update Backend CORS**
   - In Railway: Set `FRONTEND_URL=https://your-frontend.vercel.app`
   - Backend will automatically allow requests from your Vercel domain

3. **Redeploy Both**
   - After changing environment variables, both services will auto-redeploy

## Troubleshooting

### Build Fails
- Check Vercel logs: Deployments → View Logs
- Verify all dependencies in `package.json`
- Check for TypeScript errors

### API Connection Errors
- Verify `NEXT_PUBLIC_API_BASE_URL` is set correctly
- Check browser console for network errors
- Ensure backend is running and accessible
- Verify CORS is configured on backend

### Environment Variables Not Working
- Variables must be prefixed with `NEXT_PUBLIC_`
- Redeploy after adding/changing variables
- Clear browser cache if needed

## Vercel CLI Commands

```bash
# Install CLI
npm i -g vercel

# Login
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs

# List deployments
vercel ls
```

## Important Notes

- Vercel automatically provides HTTPS
- Environment variables trigger auto-redeploy
- Preview deployments are created for every PR
- Custom domains can be added in project settings

## Next.js Configuration

The project uses:
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- React 18+

Build output: `.next` directory (auto-handled by Vercel)

