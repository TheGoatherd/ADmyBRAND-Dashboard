# 📊 ADmyBRAND Dashboard  

A modern, intelligent, and visually immersive marketing analytics dashboard built for brands that demand **clarity, control, and creative insight**.

## 🚀 Live Demo  
👉 https://admybrand-dashboarddd.vercel.app/

---

## 🧩 Core Features  
Unified platform for campaign oversight, audience intelligence, revenue optimization, and real-time analytics. Designed with sleek dark UI and professional polish.

### 🎯 Campaign Management  
- 📈 **Campaign KPIs**: Real-time view of active campaigns, spend, reach, CTR  
- 🧠 **Overview Tabs**: Performance, Audience, and Creative Assets toggle  
- 🗂️ **Campaign List**: Filter by status with actionable insights  
- 📊 **Visual Analytics**: Budget allocation via bar/pie graphs  

### 💰 Revenue Analytics  
- 💹 **Revenue Overview**: Total revenue, MRR, AOV, conversion rate  
- 📉 **Revenue vs Target**: Actual earnings vs business goals  
- 📈 **Trend Visualization**: Monthly performance via line/bar graphs  
- 📊 **Source Breakdown**: Channel-specific revenue growth  

### 🧬 Audience Insights  
- 🧑‍🤝‍🧑 **User Metrics**: Growth, churn, and retention analytics  
- 🧠 **Demographics**: Age, gender, income, behavior patterns  
- 📉 **Loyalty Tracking**: Churn & retention timelines  
- 🔍 **Real-time Activity**: Live engagement monitoring  

### 📡 Advanced Analytics  
- 🌐 **Traffic Trends**: Daily views and behavior patterns  
- 🔍 **Acquisition Channels**: Referral sources (pie charts)  
- 📱 **Device/Geo Insights**: Device/geography breakdowns  
- 📈 **Engagement Metrics**: Bounce rates, session duration  

### 🧠 Executive Dashboard  
- 💰 **Ad Revenue**: Month-by-month performance  
- 📊 **Cross-Platform KPIs**: Conversions & growth sync  
- 🧾 **Campaign Statistics**: Impressions, clicks, CTR tables  
- 📥 **Data Export**: CSV & downloadable reports  

---

## 📱 Responsive Design  
- Mobile-first architecture with **Tailwind CSS**  
- Fully adaptive layouts for mobile, tablet, and desktop  

---

## 🎨 Design System  
- **Atomic component structure** using Tailwind utilities  
- **Reusable UI patterns**: Cards, Graphs, Tabs, Tables  
- **Dark theme** for modern aesthetics and accessibility  
- **Consistent styling**: Spacing, sizing, colors via Tailwind config  

---

## 🛠️ Tech Stack  

| Category    | Technologies               |
|-------------|----------------------------|
| **Frontend**| React.js, TypeScript       |
| **Framework**| Next.js                   |
| **Visualization**| Recharts               |
| **Styling** | Tailwind CSS, Lucide Icons |
| **Deployment**| Vercel                   |

---

## 📂 File Structure

```md
# ADMYBRAND-DASHBOARD File Structure

```bash
ADMYBRAND-DASHBOARD/
├── app/                       # Next.js App Router directory (contains route segments and layouts)
│   └── ...                    # (Placeholder for Next.js 13+ routing structure)
│
├── components/                # All React components organized by feature
│   ├── ui/                    # Reusable UI primitives (buttons, cards, inputs)
│   ├── analytics-page.tsx     # Analytics dashboard page component
│   ├── audience-page.tsx      # Audience demographics page
│   ├── campaigns-page.tsx     # Marketing campaigns management
│   ├── charts-section.tsx     # Data visualization components (Recharts)
│   ├── data-table.tsx         # Tabular data display (likely using TanStack Table)
│   ├── date-range-picker.tsx  # Date selection component for reports
│   ├── header.tsx             # Global header/navigation bar
│   ├── help-page.tsx          # Support/FAQ section
│   ├── landing-page.tsx       # Public-facing homepage
│   ├── metrics-cards.tsx      # KPI summary cards (revenue, users, etc.)
│   ├── overview-page.tsx      # Dashboard summary view
│   ├── revenue-page.tsx       # Financial performance reports
│   ├── settings-page.tsx      # User preferences and account settings
│   ├── sidebar.tsx            # Main navigation sidebar
│   ├── theme-provider.tsx     # Context provider for dark/light theme
│   └── theme-toggle.tsx       # Theme switcher component
│
├── hooks/                     # Custom React hooks
│   ├── use-mobile.tsx         # Detects mobile viewport (e.g. for responsive layouts)
│   └── use-toast.tsx          # Notification toast system (similar to react-hot-toast)
│
├── lib/                       # Third-party libraries/API clients
│   └── ...                    # (External service integrations)
│
├── public/                    # Static assets served at root path
│   ├── placeholder-logo.png   # Fallback brand logo (PNG)
│   ├── placeholder-logo.svg   # Fallback brand logo (vector)
│   ├── placeholder-user.jpg   # Default user avatar
│   ├── placeholder.jpg        # Generic image placeholder
│   └── placeholder.svg        # Generic SVG placeholder
│
├── styles/                    # Global CSS styles
│   └── globals.css            # Main stylesheet (imports Tailwind + custom CSS)
│
### CORE FILES ###
├── dashboard-layout.tsx       # Root layout for dashboard routes (wraps all pages)
├── mock-datats/               # Mock datasets for development (⚠️ typo, suggest renaming to mock-data)
├── utils.tsx                  # Shared utility functions/helpers
│
### CONFIGURATION FILES ###
├── components.json            # UI components registry (used by Shadcn/ui)
├── dashboard.tsx              # Main dashboard entrypoint (legacy pages router)
├── next-env.d.ts              # Next.js TypeScript type declarations
├── next.config.mjs            # Next.js configuration (ES modules)
├── package-lock.json          # NPM dependency tree lockfile
├── package.json               # Project metadata and dependencies
├── pnpm-lock.yaml             # PNPM lockfile (alternative package manager)
├── postcss.config.mjs         # PostCSS configuration (processes Tailwind)
└── tailwind.config.ts         # Tailwind CSS customization
```

## 🔧 Installation  
Run locally in 4 simple steps:  

1. **📥 Clone repository**  
   ```bash
   git clone https://github.com/TheGoatherd/ADmyBRAND-Dashboard.git
   cd ADmyBRAND-Dashboard
2. 📦 Install dependencies
  ```bash
  npm install
  ```
3. 🚀 Start development server
  ```bash
  npm run dev
  ```
4. 🌐 Access dashboard
Open http://localhost:3000 in your browser

## ✨ Development Roadmap

| Feature                      | Status        | Timeline       |
|------------------------------|---------------|----------------|
| 🧠 AI campaign recommendations | ✅ Live       | Q1 2024        |
| 👥 Multi-user collaboration    | ✅ Live       | Q1 2024        |
| 🔌 Ad platform API integrations | 🔄 In progress | Q3 2024        |
| 💾 Exportable custom dashboards | ⬇️ Planned    | Q4 2024        |

---

## 🧑‍💻 Author & Maintenance  
**Ankit** - Lead Developer & Designer  
[![GitHub](https://img.shields.io/badge/-@TheGoatherd-181717?style=flat&logo=github)](https://github.com/TheGoatherd)
[![Email](https://img.shields.io/badge/-Contact_Me-D14836?style=flat&logo=gmail)](mailto:iamankit4435@gmail.com)

> *"Built with passion for data-driven marketing solutions"*  
