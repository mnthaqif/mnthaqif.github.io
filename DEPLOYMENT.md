# Deployment Guide

This guide explains how to deploy your portfolio website to GitHub Pages.

## Prerequisites

- GitHub account
- Repository named `<username>.github.io` (e.g., `mnthaqif.github.io`)

## Deployment Methods

### Method 1: GitHub Actions (Recommended)

This repository includes a GitHub Actions workflow that automatically deploys your site when you push to the `main` branch.

#### Setup:

1. Go to your repository settings on GitHub
2. Navigate to **Settings** > **Pages**
3. Under **Build and deployment**, select:
   - Source: **GitHub Actions**
4. Push your code to the `main` branch
5. The workflow will automatically build and deploy your site
6. Your site will be available at `https://<username>.github.io`

### Method 2: Manual Deployment with gh-pages

You can also deploy manually using the `gh-pages` package:

```bash
# Build and deploy
npm run deploy
```

This command:
1. Runs `npm run build` to create the production build
2. Deploys the `dist` folder to the `gh-pages` branch

#### Setup for Manual Deployment:

1. Go to your repository settings on GitHub
2. Navigate to **Settings** > **Pages**
3. Under **Build and deployment**, select:
   - Source: **Deploy from a branch**
   - Branch: **gh-pages** / **root**
4. Run `npm run deploy`
5. Your site will be available at `https://<username>.github.io`

## Custom Domain (Optional)

To use a custom domain:

1. Add your domain in **Settings** > **Pages** > **Custom domain**
2. Create a `CNAME` file in the `public` folder with your domain name
3. Configure your DNS settings with your domain provider:
   - Add an A record pointing to GitHub's IP addresses
   - Or add a CNAME record pointing to `<username>.github.io`

## Troubleshooting

### Site not loading

- Check that the `base` URL in `vite.config.js` matches your deployment path
- For user/organization pages, use `base: '/'`
- For project pages, use `base: '/<repository-name>/'`

### 404 errors

- Ensure the `dist` folder is being deployed
- Check that all asset paths are relative

### Workflow not running

- Verify that GitHub Actions is enabled in your repository settings
- Check the workflow file syntax in `.github/workflows/deploy.yml`
- Ensure you have the correct permissions set in the workflow

## Viewing Deployment Status

- Go to the **Actions** tab in your GitHub repository
- Click on the latest workflow run to see build and deployment logs
- If deployment succeeds, your site will be live at `https://<username>.github.io`
