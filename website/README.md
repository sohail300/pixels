# Pixels website

Next.js 14 site at https://pixels.sohailcodes.xyz: the landing page with the app download (QR code and Download APK button), the privacy policy, the terms of service, and an upload page for accounts with upload permission.

```bash
npm install
cp .env.example .env   # fill in the values
npm run dev            # http://localhost:3000
npm run build          # production build check
```

- **Environment variables:** [docs/DEPLOYMENT.md](../docs/DEPLOYMENT.md#website-websiteenv)
- **Hosting (Netlify, custom domain, HTTPS):** [docs/DEPLOYMENT.md](../docs/DEPLOYMENT.md#website-on-netlify)

The download button and `public/qr_code.png` both point at `https://github.com/sohail300/pixels/releases/latest/download/pixels.apk`, so they always serve the newest release without changes here.
