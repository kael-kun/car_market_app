# UI Design System

## Protocol: UI/UX Pro Max (UUPM) + design-ui.md (Meta-Inspired)

All UI MUST be implemented with **Tailwind CSS** configured to match the Meta Store design system defined in `design-ui.md`.

## Design Tokens (Tailwind Configuration)

### Colors (from design-ui.md)

| Token | Hex | Tailwind Class | Usage |
|-------|-----|----------------|-------|
| **Meta Blue** | `#0064E0` | `bg-primary` / `text-primary` | Primary CTAs, interactive links |
| **Meta Blue Hover** | `#0143B5` | `hover:bg-primary-dark` | Hover state for primary buttons |
| **Meta Blue Pressed** | `#004BB9` | `active:bg-primary-pressed` | Active/pressed button state |
| **Primary Text** | `#050505` / `#1C2B33` | `text-primary-text` | Main body and heading text |
| **Secondary Text** | `#65676B` / `#5D6C7B` | `text-secondary-text` | Supporting copy, labels |
| **White Surface** | `#FFFFFF` | `bg-white` | Primary page canvas, card surfaces |
| **Soft Gray** | `#F1F4F7` | `bg-soft-gray` | Secondary background sections |
| **Near Black** | `#1C1E21` | `bg-dark` | Dark section backgrounds |
| **Success Green** | `#31A24C` | `bg-success` | Positive indicators |
| **Error Red** | `#E41E3F` | `bg-error` | Critical errors, notifications |
| **Divider** | `#CED0D4` | `border-divider` | Content separators, input borders |

### Typography (Optimistic VF)

Configure via CSS custom properties or Tailwind font family extension:

| Role | Size | Weight | Line Height | Tailwind Classes |
|------|------|---------|-------------|------------------|
| Display 1 | 64px | 500 (Medium) | 1.16 | `text-display-1 font-medium` |
| Display 2 | 48px | 500 (Medium) | 1.17 | `text-display-2 font-medium` |
| Heading 1 | 36px | 500 (Medium) | 1.28 | `text-h1 font-medium` |
| Heading 2 | 28px | 300 (Light) | 1.21 | `text-h2 font-light` |
| Heading 3 | 18px | 700 (Bold) | 1.44 | `text-h3 font-bold` |
| Body | 18px | 400 (Regular) | 1.44 | `text-body` |
| Body Compact | 16px | 500 (Medium) | 1.50 | `text-body-sm font-medium tracking-tight` |
| Caption | 14px | 400 (Regular) | 1.43 | `text-caption` |
| Caption Bold | 14px | 700 (Bold) | 1.43 | `text-caption font-bold` |
| Small | 12px | 400 (Regular) | 1.33 | `text-xs` |

Font stack: `Optimistic VF, Montserrat, Helvetica, Arial, Noto Sans` with OpenType features `ss01, ss02`.

### Spacing (8px Base Grid)

| Token | Value | Tailwind Class |
|-------|-------|----------------|
| space-1 | 1px | `border` (hairline) |
| space-3 | 8px | `p-2` / `m-2` / `gap-2` |
| space-4 | 10px | `px-4` / `py-4` |
| space-7 | 16px | `p-4` / `m-4` / `gap-4` |
| space-9 | 24px | `p-6` / `gap-6` |
| space-12 | 48px | `py-12` |
| space-13 | 64px | `py-16` |
| space-14 | 80px | `py-20` |

### Border Radius

| Context | Value | Tailwind Class |
|---------|-------|----------------|
| Inputs, small UI | 8px | `rounded-lg` |
| Cards | 20px | `rounded-[20px]` |
| Feature cards | 24px | `rounded-[24px]` |
| Pill buttons, badges | 100px (fully rounded) | `rounded-full` |

### Elevation (Shadows)

| Level | Treatment | Tailwind Class |
|-------|-------------|----------------|
| Flat | No shadow | `shadow-none` |
| Level 1 | `0 2px 4px 0 rgba(0,0,0,0.1)` | `shadow-sm` |
| Level 2 | `0 12px 28px 0 rgba(0,0,0,0.2), 0 2px 4px 0 rgba(0,0,0,0.1)` | `shadow-xl` |
| Overlay | `rgba(0,0,0,0.6)` | `bg-black/60` |

## Component Styling Rules

### Buttons (Pill-Shaped)

- **Primary**: `bg-[#0064E0] text-white rounded-full px-6 py-2.5 text-sm font-regular tracking-tight hover:bg-[#0143B5] active:scale-90 transition-all`
- **Secondary**: `bg-transparent text-[#1C2B33]/50 border-2 border-[rgba(10,19,23,0.12)] rounded-full px-6 py-2.5 hover:bg-[rgba(70,90,105,0.7)] hover:text-white`
- **Disabled**: `bg-[#DEE3E9] text-[#8595A4] cursor-not-allowed`

### Cards

- Background: `bg-white` or `bg-[#F7F8FA]`
- Radius: `rounded-[20px]`
- Padding: `px-4 py-5`
- Shadow: `shadow-xl`
- Hover: `hover:-translate-y-0.5 hover:shadow-xl transition-transform`

### Inputs

- Background: `bg-white`
- Border: `border border-[#CED0D4] rounded-lg`
- Focus: `focus:border-[hsl(214,89%,52%)] focus:ring-3`
- Error: `border-[hsl(350,87%,55%)]`

## Responsive Breakpoints

| Name | Width | Tailwind Prefix | Key Changes |
|------|-------|-----------------|-------------|
| Mobile | <768px | `sm:` | 1-col grid, hero text 36px, 48px section padding |
| Tablet | 768-1024px | `md:` | 2-col grid, hero text 48px |
| Desktop | 1024-1440px | `lg:` | 3-col grid, hero text 64px, 80px section padding |
| Large Desktop | >1440px | `xl:` | Max-width 1440px centered (`max-w-[1440px] mx-auto`) |

## Interaction States (Per UUPM Protocol)

All interactive elements MUST define 5 states:
1. **Ideal**: Default state (e.g., Meta Blue pill button)
2. **Hover**: `hover:bg-[#0143B5] scale(1.1)`
3. **Active/Pressed**: `active:bg-[#004BB9] scale(0.9) opacity-50`
4. **Focus**: `focus:ring-3 focus:outline-auto`
5. **Disabled**: `disabled:bg-[#DEE3E9] disabled:text-[#8595A4] cursor-not-allowed`

Loading state: Use **skeleton glimmer** (pulsating opacity 0.25→1.0 on `#979A9F` base) instead of generic spinners.

## Accessibility

- All color combinations MUST pass WCAG 2.1 AA contrast check
- Minimum touch targets: 44x44px (`min-h-[44px] min-w-[44px]`)
- Alt text for all product images
- Focus indicators visible on all interactive elements