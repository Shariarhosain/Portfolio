# 🚀 Quick Start Guide

## Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Open in Browser**
   - Navigate to `http://localhost:3000`

## 🎨 Customization Guide

### Step 1: Update Personal Information

Edit `src/data/portfolio.js`:
- Update your name, email, phone, location
- Add your social media links (GitHub, LinkedIn, Twitter)

### Step 2: Update Projects

In `src/data/portfolio.js`, modify the `projectsData` array:
- Add your own project details
- Update images (use your own or Unsplash links)
- Add GitHub and live demo links

### Step 3: Customize About Section

Edit `src/components/About.jsx`:
- Update your bio and background
- Modify feature highlights

### Step 4: Update Skills

Edit `src/components/Skills.jsx`:
- Add/remove technologies you work with
- Update skill categories

### Step 5: Customize Colors (Optional)

Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#YOUR_COLOR',
  secondary: '#YOUR_COLOR',
  accent: '#YOUR_COLOR',
}
```

## 📁 File Structure Overview

- `src/components/` - All React components
- `src/data/` - Data files for easy customization
- `public/` - Static files
- `tailwind.config.js` - Tailwind configuration

## 🐛 Troubleshooting

### Issue: Module not found
**Solution**: Run `npm install` again

### Issue: Port 3000 already in use
**Solution**: 
- Kill the process using port 3000, OR
- Run `npm start` and choose 'Y' to use a different port

### Issue: Tailwind styles not applying
**Solution**: Make sure `postcss.config.js` and `tailwind.config.js` exist

## 🚀 Deployment

### Deploy to Vercel (Easiest):
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Click Deploy

### Deploy to Netlify:
1. Build the project: `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag and drop the `build` folder

## 💡 Tips

- Replace placeholder images with your own
- Update meta tags in `public/index.html` for SEO
- Add your resume/CV link in the Hero section
- Connect the contact form to a backend or service like Formspree

---

Need help? Check the main README.md for detailed documentation!
