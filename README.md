# Zumetrix Labs - Premium Software Development Agency Website

A world-class, data-driven website built with React, TypeScript, and Tailwind CSS. Features luxurious dark theme, smooth animations, and comprehensive SEO optimization for global reach.

## 🚀 Features

- **Data-Driven Architecture**: All content managed through `/src/data/` files
- **Google Sheets Integration**: Contact forms automatically save to Google Sheets
- **International SEO**: Optimized for global markets (US, UK, EU, Canada, APAC, Middle East)
- **Luxurious Dark Theme**: Premium reading experience with perfect typography
- **Smooth Animations**: Lightning-fast transitions (0.1s) for buttery smooth interactions
- **Project Portfolio**: Complete project showcase with detail pages
- **Article System**: Professional blog with Table of Contents and sharing
- **FAQ System**: Page-specific FAQs with structured data
- **Performance Optimized**: 90+ Lighthouse scores across all metrics

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── data/               # All editable content (DATA-DRIVEN)
│   ├── projects.ts     # Portfolio projects
│   ├── articles.js     # Blog articles
│   ├── faqs/          # Page-specific FAQs
│   └── services.js    # Service offerings
├── config/            # Site configuration
│   ├── site.ts        # Main site config (from .env)
│   └── seo.config.ts  # SEO configuration
├── pages/             # Page components
└── styles/            # Global styles
```

## 🛠️ How to Update Content

### 1. Projects (Portfolio)
Edit `/src/data/projects.ts`:
```typescript
{
  id: 1,
  slug: "project-url-slug",
  title: "Project Name",
  client: {
    name: "Client Name",
    country: "United States",
    industry: "Technology"
  },
  // ... more fields
}
```

### 2. Articles (Blog)
Edit `/src/data/articles.js`:
```javascript
{
  id: 1,
  slug: "article-url-slug",
  title: "Article Title",
  content: `<h2>Your HTML content here</h2>`,
  // ... more fields
}
```

### 3. Services
Edit `/src/data/services.js`:
```javascript
{
  id: "service-id",
  title: "Service Name",
  description: "Service description",
  // ... more fields
}
```

### 4. FAQs
Edit files in `/src/data/faqs/`:
- `home.ts` - Homepage FAQs
- `services.ts` - Services page FAQs
- `portfolio.ts` - Portfolio page FAQs
- `contact.ts` - Contact page FAQs

### 5. Site Configuration
Edit `.env` file:
```env
VITE_COMPANY_NAME=Your Company
VITE_COMPANY_EMAIL=hello@yourcompany.com
VITE_FOUNDER_1_NAME=Founder Name
# ... more variables
```

## 🔧 Setup Instructions

1. **Clone and Install**:
```bash
git clone <repository>
cd zumetrix-website
npm install
```

2. **Environment Setup**:
```bash
cp .env.example .env
# Edit .env with your actual values
```

3. **Google Sheets Integration**:
   - Create a Formspree account at https://formspree.io
   - Create a new form and get the endpoint URL
   - Add the endpoint to `VITE_CONTACT_FORM_ENDPOINT` in `.env`
   - Optional: Set up Zapier webhook for backup data storage

4. **Development**:
```bash
npm run dev
```

5. **Build for Production**:
```bash
npm run build
```

## 📊 Google Sheets Integration

The contact form automatically saves data to Google Sheets through:

1. **Primary**: Formspree integration (recommended)
   - Set `VITE_CONTACT_FORM_ENDPOINT` in `.env`
   - Configure Formspree to forward to Google Sheets

2. **Backup**: Direct webhook integration
   - Set `VITE_GOOGLE_SHEETS_WEBHOOK` in `.env`
   - Use Zapier or similar service to create webhook

## 🎨 Design System

- **Colors**: Custom beige/gold primary (#C48A64) with dark theme
- **Typography**: Inter font with perfect readability
- **Animations**: Ultra-smooth 0.1s transitions
- **Components**: Consistent hover states and micro-interactions

## 📈 SEO Features

- **Structured Data**: Organization, Article, FAQ, Project schemas
- **International Targeting**: Multi-region keyword optimization
- **Meta Optimization**: Dynamic titles and descriptions
- **Sitemap**: Auto-generated with all pages
- **Performance**: Optimized for Core Web Vitals

## 🌍 International Markets

Optimized for these key markets:
- **North America**: US, Canada
- **Europe**: UK, Germany, Netherlands, France
- **Asia Pacific**: Australia, Singapore, Japan
- **Middle East**: UAE, Saudi Arabia, Qatar

## 🚀 Performance

- **Lighthouse Scores**: 90+ across all metrics
- **Core Web Vitals**: Optimized for speed
- **Image Optimization**: WebP format with lazy loading
- **Code Splitting**: Optimized bundle sizes

## 📞 Support

For technical support or questions about updating content, contact the development team or refer to this README for guidance on making changes to the data files.

---

Built with ❤️ by Zumetrix Labs - Pakistan's #1 Software Development Agency