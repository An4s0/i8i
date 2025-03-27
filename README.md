<h1 align="center">
  <br>
  <a href="http://i8i.pw"><img src="https://i.imgur.com/VubulYB.png" alt="i8i" width="200"></a>
  <br>
  i8i.pw
  <br>
</h1>

<h4 align="center">An open-source, powerful, and simple URL shortener with analytics, password protection, and expiration settings.</h4>

<p align="center">
  <a href="https://github.com/An4s0/i8i/stargazers">
    <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/An4s0/i8i?style=for-the-badge">
</a>
<a href="https://github.com/An4s0/i8i/network/members">
    <img alt="GitHub forks" src="https://img.shields.io/github/forks/An4s0/i8i?style=for-the-badge">
</a>
<a href="https://github.com/An4s0/i8i/issues">
    <img alt="GitHub issues" src="https://img.shields.io/github/issues/An4s0/i8i?style=for-the-badge">
</a>
<a href="https://github.com/An4s0/i8i/discussions">
    <img alt="GitHub discussions" src="https://img.shields.io/github/discussions/An4s0/i8i?style=for-the-badge">
</a>
<a href="https://github.com/An4s0/i8i/blob/main/LICENSE">
    <img alt="GitHub license" src="https://img.shields.io/github/license/An4s0/i8i?style=for-the-badge">
</a>
</p>

<div id="navigation" align="center">
  <a href="#features">Features</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#technologies-used">Technologies Used</a> •
  <a href="#license">License</a> •
  <a href="#contact">Contact</a>
</div>

![screenshot](./screenshots/image.png)

---

<div id="features">

## Features

- **Analytics**: Track clicks, location, OS, and browser.
- **Password Protection**: Secure your shortened links.
- **Expiration Settings**: Set auto-expiring links.
- **QR Code Generation** _(Coming Soon)_.
- **Developer API**: Programmatic access for integration.

</div>

---

<div id="getting-started">

## Getting Started

### Installation & Running Locally

Follow these steps to set up the project on your machine:

```bash
# Clone the repository
git clone https://github.com/An4s0/i8i.git && cd i8i

# Install dependencies
npm install

# Start the development server
npm run dev

# Open in browser
http://localhost:3000
```

### Usage

Once running, you can:

- **Shorten a URL**: Paste a long URL and generate a short one.
- **Track Analytics**: See clicks, location, OS, and browser info.
- **Generate QR Codes** _(Coming Soon)_.

### Deployment

Deploy on **Vercel, Heroku, or DigitalOcean** by following these steps:

1. **Set up a production database** (e.g., MongoDB Atlas).
2. **Configure environment variables**:
   ```env
   MONGODB_URL=your_mongodb_connection_string
   NEXT_PUBLIC_APP_URL=https://i8i.pw
   ```
3. **Deploy to Vercel**:
   ```bash
   vercel
   ```

For other platforms, push your code and configure the deployment settings accordingly.

</div>

---

<div id="technologies-used">

## Technologies Used

- **Next.js** – React framework
- **TypeScript** – Type safety
- **Tailwind CSS** – Styling
- **MongoDB** – Database
- **Vercel** – Deployment & analytics
- **Chart.js** – Data visualization
- **UAParser.js** – User agent parsing

</div>

---

<div id="license">

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

</div>

---

<div id="contact">

## Contact

For any inquiries:

- Email: [me+contact@ianas.me](mailto:me+contact@ianas.me)
- GitHub: [An4s0](https://github.com/An4s0)
- X: [@AnasAlmutary](https://x.com/AnasAlmutary)
- Website: [ianas.me](https://ianas.me)

</div>
