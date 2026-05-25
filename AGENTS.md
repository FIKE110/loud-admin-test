# Loud! Admin Dashboard — Agent Guide

## Project Overview
Vite + React + TypeScript admin dashboard with Tailwind CSS v4. The app includes login, password reset, and a full dashboard layout with sub-pages for managing platform content.

## Stack
- **Framework**: Vite + React 19 + TypeScript
- **Routing**: `react-router-dom` v7 with `createBrowserRouter`
- **Styling**: Tailwind CSS v4 with `@tailwindcss/vite` plugin (no `tailwind.config.*` or `postcss.config.*`)
- **Icons**: `lucide-react` v1.16.0

## Build & Run
```sh
npm run dev       # dev server
npm run build     # tsc -b && vite build
npm run lint      # eslint
```

## Route Structure
| Path | Component | Description |
|------|-----------|-------------|
| `/` | — | Redirects to `/login` |
| `/login` | `LoginPage` | Brand panel + login form |
| `/reset-password` | `ResetPasswordPage` | Brand panel + reset form |
| `/dashboard` | `DashboardLayout` | Shell with sidebar + header + `<Outlet />` |
| `/dashboard` (index) | `DashboardPage` | Stats cards + charts |
| `/dashboard/users` | `UsersPage` | User management table |
| `/dashboard/posts` | `PostsPage` | Posts moderation table + review modal |
| `/dashboard/birthday-posts` | `BirthdayPostsPage` | Birthday post sender→recipient table |
| `/dashboard/collage-and-groups` | `CollageAndGroupsPage` | Group/community spaces table |
| `/dashboard/stories` | `StoriesPage` | Ephemeral stories table with duration counters |
| `/dashboard/live-streams` | `LiveStreamsPage` | Live streams triage with summary cards + streaming matrix |
| `/dashboard/reports-and-flags` | `ReportsAndFlagsPage` | Report triage with type/priority/status filters |
| `/dashboard/mod-queue` | `ModQueuePage` | AI-powered moderation queue with confidence bars |
| `/dashboard/admin-team` | `AdminTeamPage` | Admin account management with roles & 2FA |
| `/dashboard/finance` | `FinancePage` | Finance overview with KPI cards, charts, transactions |
| `/dashboard/coin-transactions` | `CoinTransactionsPage` | Coin transaction ledger with channel tracking |
| `/dashboard/gift-transactions` | `GiftTransactionsPage` | Gift P2P transaction ledger with sender/recipient |
| `/dashboard/adverts` | `AdvertsPage` | Ad campaign management with metric cards + card grid |
| `/dashboard/analytics` | `AnalyticsPage` | Analytics engine with KPI cards, chart placeholders, notification sidebar |
| `/dashboard/notification` | `NotificationPage` | Full notification center with filters and dismiss |
| `*` | `NotFound` | 404 page |

## Page Implementation Patterns
Each sub-page follows this structure:
1. **Header row** — `h1` title + `p` subtitle in `text-[#6B6375]`
2. **Filter toolbar** — search input in `rounded-xl border` + scope dropdown(s)
3. **Data table** — `overflow-hidden rounded-xl border` container, `bg-[#F8F9FC]` thead with `text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]` headers, `divide-y divide-[#E5E4E7]` tbody, `hover:bg-[#F8F9FC]` rows
4. **Pagination** — "Showing X–Y of Z items" + page number circles (`bg-[#2561EE]` active)
5. **Actions** — Review button in `text-[#2561EE]`, destructive buttons in `text-red-600 border-red-300`

## Sidebar
File: `src/components/Sidebar.tsx`
- Fixed left sidebar, 256px, `bg-[#06102F]`
- 7 labeled sections: Overview, Content, Moderation, Administration, Finance, Advertising, Account
- Data badges: `bg-blue-500` or `bg-red-500` rounded pills
- Active link: `bg-white/10 text-white`, inactive: `text-white/70`

## Color Palette
```css
--sidebar-bg: #06102F;
--primary-blue: #2561EE;
--text-primary: #08060D;
--text-muted: #6B6375;
--text-placeholder: #9CA3AF;
--border: #E5E4E7;
--table-header-bg: #F8F9FC;
--green-badge-text: green-700;
--green-badge-bg: green-100;
--red-badge-text: red-700;
--red-badge-bg: red-100;
```

## Key Conventions
- All sub-pages are under `src/components/` and use a default export
- Routes are defined in `src/router.tsx` under the `/dashboard` layout children
- The Sidebar already has nav items for all planned sub-routes — only need to add the component and route
- No review modal on birthday-posts or collage-and-groups pages
- Soft-delete/remove via local `Set<number>` state
- Numbers formatted with `formatNumber()` helper (1k/10k)
- No router data loaders or actions
- No `PostCSS` config files (Tailwind v4 with `@tailwindcss/vite`)
- No comments in code
