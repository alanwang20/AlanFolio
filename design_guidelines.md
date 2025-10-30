# Design Guidelines for Alan Wang's Personal Branding Website

## Design Approach
**Healthcare Technology Aesthetic** - Professional, futuristic single-page design combining clean hospital tech aesthetics with modern web design principles. Think Microsoft Health, Philips Healthcare digital interfaces - clinical precision meets accessible technology.

## Core Design Elements

### Typography
- **Primary Font**: Inter or DM Sans via Google Fonts for clean, modern readability
- **Headings**: Bold weights (600-700) for section titles, medium weights (500) for subsections
- **Body Text**: Regular weight (400) for optimal reading
- **Hierarchy**: Large hero text (4xl-6xl), section headers (3xl-4xl), subsection headers (xl-2xl), body (base-lg)

### Layout System
- **Single-page scrolling layout** with smooth scroll behavior between sections
- **Spacing**: Use Tailwind units of 4, 8, 12, 16, 20, and 24 for consistent rhythm
- **Container**: max-w-6xl centered with px-6 on mobile, px-8 on desktop
- **Section Padding**: py-16 on mobile, py-24 on desktop for breathing room

### Color Palette (Healthcare Tech Theme)
- **Primary Blues**: Medical blue gradients from light sky blue to deeper tech blue
- **Backgrounds**: Clean whites with subtle blue-tinted grays
- **Accents**: Subtle gradients for depth and modern feel
- **Text**: Dark slate for primary text, lighter grays for secondary

### Component Library

**Fixed Header Navigation**
- Transparent or semi-transparent background with backdrop blur
- Right-aligned navigation menu with smooth scroll links
- Sticky positioning that remains visible during scroll
- Active section highlighting with underline or color change
- Mobile: Hamburger menu that transforms to full-screen overlay

**Hero/About Section**
- Profile photo on left (rounded or subtle border treatment)
- Name and title prominently displayed with gradient effect on name
- Brief bio paragraph highlighting healthcare analytics passion
- LinkedIn icon link with hover state
- Subtle background gradient or geometric pattern

**Education Section**
- Two institution cards with clean hierarchy
- University logos or icons
- Degree, major, and dates clearly displayed
- Optional: Timeline visualization connecting the two degrees

**Experience Section**
- Centene experience highlighted with role and dates
- Bullet points for responsibilities and achievements
- Use of technical tags/badges for skills used (e.g., Data Engineering, Product Owner)
- Optional: Company logo or icon

**Projects Section**
- Grid layout (2 columns on desktop, 1 on mobile) showcasing key projects
- Project cards with titles, descriptions, and tech stack badges
- Humana-Mays Case Competition featured prominently
- Healthcare data visualization projects with preview imagery or icons
- Hover effects revealing more details or CTA buttons

**Contact Section**
- Clean, centered layout with email and LinkedIn
- Large contact icons from Lucide React
- Simple, accessible contact methods
- Optional: Contact form or direct email button

### Animations & Interactions
- **Scroll-based animations**: Fade-in and slide-in effects using Intersection Observer
- **Stagger timing**: Elements animate sequentially, not all at once
- **Smooth scrolling**: Native smooth scroll behavior between sections
- **Subtle motion**: Gentle hover effects on cards and links
- **Performance**: Use CSS transforms and opacity for smooth 60fps animations

### Icons
- **Library**: Lucide React for all icons
- **Usage**: Education (GraduationCap), Experience (Briefcase), Projects (Folder/Code), Contact (Mail, Linkedin)
- **Size**: Consistent sizing (20-24px) throughout

### Responsive Behavior
- **Desktop (lg+)**: Full navigation visible, multi-column layouts, larger spacing
- **Tablet (md)**: Simplified navigation, 2-column grids collapse thoughtfully
- **Mobile (base)**: Hamburger menu, single-column layouts, optimized touch targets (min 44px)

### Images
- **Profile Photo**: Professional headshot, circular or rounded square, positioned in About section
- **No large hero image**: This is a personal portfolio site focused on content hierarchy rather than visual storytelling
- **Project Previews**: Small thumbnails or icons representing healthcare data visualization work (optional)

### Key UX Principles
- **Clarity over decoration**: Healthcare theme means clean, uncluttered layouts
- **Accessibility**: High contrast ratios, keyboard navigation support, semantic HTML
- **Professional tone**: Balanced between approachable and technically credible
- **Fast loading**: Optimize assets, use modern formats, lazy load below-fold content
- **Mobile-first thinking**: Touch-friendly, readable on small screens, efficient navigation