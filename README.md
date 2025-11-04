# Alan Wang - Personal Portfolio Website

A modern, responsive personal branding website built with React, TypeScript, and Tailwind CSS on Replit. Features smooth scroll animations, an interactive mouse-follow gradient background, and comprehensive project showcases.

## 🚀 Quick Start

### Running Locally on Replit
This project is already configured to run on Replit. Simply click the "Run" button or use:
```bash
npm run dev
```

The application will start on `http://0.0.0.0:5000` and automatically open in Replit's webview.

### Running Locally on Your Machine

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd <project-directory>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5000`

## 📁 Project Structure

```
.
├── client/                          # Frontend React application
│   ├── src/
│   │   ├── components/              # React components
│   │   │   ├── AnimatedBackground.tsx    # Mouse-follow gradient & particles
│   │   │   ├── Navigation.tsx            # Fixed header navigation
│   │   │   ├── HeroSection.tsx           # Landing/About section
│   │   │   ├── EducationSection.tsx      # Education credentials
│   │   │   ├── ExperienceSection.tsx     # Professional experience
│   │   │   ├── SkillsSection.tsx         # Technical skills & certifications
│   │   │   ├── ProjectsSection.tsx       # Personal & academic projects
│   │   │   ├── ProjectModal.tsx          # Modal for viewing project details
│   │   │   ├── LeadershipSection.tsx     # Leadership & advocacy
│   │   │   ├── AcademicExperienceSection.tsx  # Academic roles
│   │   │   ├── ContactSection.tsx        # Contact information
│   │   │   └── ui/                       # Reusable UI components (buttons, cards, etc.)
│   │   ├── hooks/                   # Custom React hooks
│   │   │   └── useScrollAnimation.ts     # Intersection Observer for scroll animations
│   │   ├── lib/                     # Utility libraries
│   │   │   └── queryClient.ts            # TanStack Query configuration
│   │   ├── pages/                   # Page components
│   │   │   ├── Home.tsx                  # Main landing page
│   │   │   └── not-found.tsx             # 404 page
│   │   ├── App.tsx                  # Main app component with routing
│   │   ├── main.tsx                 # Application entry point
│   │   └── index.css                # Global styles & Tailwind config
│   └── index.html                   # HTML template
├── server/                          # Backend Express server
│   ├── index.ts                     # Server entry point
│   ├── routes.ts                    # API routes
│   └── vite.ts                      # Vite dev server configuration
├── attached_assets/                 # Static assets (PDFs, images, etc.)
├── shared/                          # Shared types and schemas
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
├── tailwind.config.ts               # Tailwind CSS configuration
├── vite.config.ts                   # Vite build configuration
└── README.md                        # This file
```

## ✏️ Making Edits

### Updating Personal Information

#### About Section (Hero)
**File:** `client/src/components/HeroSection.tsx`
- **Name & Title:** Update the `<h1>` and `<p>` tags around lines 20-25
- **Bio:** Modify the paragraph text in the `<div className="space-y-4">` section
- **Profile Image:** Replace `profileImage` import at the top with your own image path

#### Education
**File:** `client/src/components/EducationSection.tsx`
- Edit the `education` array (lines 7-35) with your degrees
- Update: school, degree, GPA, dates, location, coursework

#### Professional Experience
**File:** `client/src/components/ExperienceSection.tsx`
- Edit the `experiences` array (lines 7-95)
- For each role, update: title, company, period, location, description, skills
- Set `isUpcoming: true` for future positions to show the "Incoming" badge

#### Skills & Certifications
**File:** `client/src/components/SkillsSection.tsx`
- **Languages, Tools, etc.:** Edit `skillCategories` array (lines 7-35)
- **Certifications:** Edit `certifications` array (lines 37-41)

#### Projects
**File:** `client/src/components/ProjectsSection.tsx`
- **Personal Projects:** Edit `personalProjects` array (lines 10-25)
- **Academic Projects:** Edit `academicProjects` array (lines 27-140)
- **Adding Project Details:**
  - For PDFs: Add `pdfPath: '/attached_assets/your-file.pdf'`
  - For GitHub: Add `githubLink: 'https://github.com/username/repo'`
  - For text files: Add `contentPath: '/attached_assets/your-file.txt'`
- Upload files to `attached_assets/` folder

#### Leadership
**File:** `client/src/components/LeadershipSection.tsx`
- Edit the `leadership` array (lines 7-50)
- Each organization can have multiple roles with descriptions

#### Academic Experience
**File:** `client/src/components/AcademicExperienceSection.tsx`
- Edit the `academicExperiences` array (lines 7-60)
- Structure: institution → roles → description & skills

#### Contact Information
**File:** `client/src/components/ContactSection.tsx`
- Edit the `contactMethods` array (lines 7-30)
- Update: email, LinkedIn, GitHub, phone number

### Changing Design & Colors

#### Color Scheme
**File:** `client/src/index.css`
- Lines 10-70 contain CSS variables for light and dark modes
- Update colors using HSL format: `H S% L%` (e.g., `210 100% 50%`)
- Key variables:
  - `--primary`: Main brand color (currently healthcare blue)
  - `--background`: Page background
  - `--foreground`: Text color
  - `--card`: Card backgrounds
  - `--muted`: Secondary backgrounds

#### Animation Speed
**File:** `client/src/components/AnimatedBackground.tsx`
- **Mouse-follow speed:** Lines 56-57, adjust the `0.35` multiplier (higher = faster)
- **Particle count:** Line 40, change number of particles
- **Particle speed:** Lines 44-45, adjust velocity ranges

#### Navigation Items
**File:** `client/src/components/Navigation.tsx`
- Add/remove navigation links in the `navItems` array (lines 8-17)
- Each item needs: `label` and `href` (matching section `id`)

### Adding New Sections

1. **Create the component** in `client/src/components/`
2. **Import and add to Home.tsx:**
   ```tsx
   import YourSection from '@/components/YourSection';
   
   // Add inside <main> where you want it to appear
   <YourSection />
   ```
3. **Add navigation link** in `Navigation.tsx`
4. **Add scroll animation** using the `useScrollAnimation` hook

## 🎨 Component Responsibilities

### Core Components

| Component | Purpose |
|-----------|---------|
| `AnimatedBackground` | Canvas-based mouse-follow gradient effect with particle network |
| `Navigation` | Fixed header with smooth scroll navigation & mobile menu |
| `HeroSection` | Landing section with profile photo and bio |
| `EducationSection` | Academic credentials with GPAs |
| `ExperienceSection` | Professional work history with badges |
| `SkillsSection` | Technical skills organized by category + certifications |
| `ProjectsSection` | Personal and academic projects with view buttons |
| `ProjectModal` | Modal popup for displaying PDFs and project details |
| `LeadershipSection` | Leadership roles and advocacy work |
| `AcademicExperienceSection` | Teaching and research positions |
| `ContactSection` | Contact information with clickable links |

### Hooks

| Hook | Purpose |
|------|---------|
| `useScrollAnimation` | Intersection Observer hook for fade-in animations on scroll |

### Utilities

| File | Purpose |
|------|---------|
| `queryClient.ts` | TanStack Query configuration for data fetching |
| `index.css` | Global styles, Tailwind setup, and CSS custom properties |

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript
- **Styling:** Tailwind CSS, shadcn/ui components
- **Animations:** Framer Motion, custom canvas animations
- **Routing:** Wouter (lightweight router)
- **State Management:** TanStack Query
- **Build Tool:** Vite
- **Backend:** Express (serves frontend)
- **Deployment:** Replit

## 📦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

## 🎯 Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark mode support
- ✅ Smooth scroll animations
- ✅ Interactive mouse-follow gradient background
- ✅ Modal popups for project details (PDF viewer)
- ✅ Fixed navigation with active section highlighting
- ✅ Mobile-friendly hamburger menu
- ✅ SEO optimized
- ✅ Fast performance with Vite

## 🚢 Deployment

### Deploying on Replit
1. Click the "Publish" button in Replit
2. Follow the prompts to configure your deployment
3. Your site will be live at `https://your-repl-name.repl.co`

### Deploying Elsewhere
1. Build the project:
   ```bash
   npm run build
   ```
2. Deploy the `dist` folder to your hosting service (Netlify, Vercel, etc.)

## 🔧 Troubleshooting

### Animations not working
- Ensure `AnimatedBackground` is imported in `HeroSection`
- Check browser console for errors

### PDF not displaying in modal
- Verify file path in `attached_assets` folder
- Check that file path starts with `/attached_assets/`

### Scroll navigation not working
- Ensure section `id` matches navigation `href` (without #)
- Check that all sections have unique IDs

### Styles not applying
- Run `npm run dev` to rebuild
- Clear browser cache
- Check Tailwind classes are correct

## 📝 License

Personal portfolio website - All rights reserved.

## 🤝 Contact

- **Email:** alanwang2020@gmail.com
- **LinkedIn:** [linkedin.com/in/alanwang2020](https://www.linkedin.com/in/alanwang2020/)
- **GitHub:** [github.com/alanwang20](https://github.com/alanwang20)
