# ID Academy Style System - Complete Analysis

## 📊 Color Palette Extracted from Old Project

### Primary Colors
- **Primary**: `#001645` - Main brand color (dark blue)
- **Primary Hover**: `#001a52` - Darker variant for hover states
- **Primary Foreground**: `#FFFFFF` - Text on primary background

### Secondary Colors
- **Secondary**: `#17BC43` - Success/Action color (green)
- **Secondary Hover**: `#17A03B` - Darker green for hover
- **Secondary Foreground**: `#FFFFFF` - Text on secondary background

### Neutral Colors
- **Background**: `#FFFFFF` - Main background
- **Foreground**: `#001645` - Main text color
- **Muted**: `#F5F7FA` - Light gray background
- **Muted Foreground**: `#8994AB` - Secondary text color
- **Muted Hover**: `#A8A8A8` - Hover state for muted elements
- **Hero Background**: `#39465E` - Dark gray for hero sections

### Semantic Colors
- **Success**: `#17BC43` - Success messages
- **Warning**: `#FFA500` - Warning messages
- **Info**: `#3B82F6` - Info messages
- **Destructive**: `#FF5C5C` - Error/Delete actions
- **Destructive Hover**: `#E54545` - Darker red for hover

### Border & Input Colors
- **Border**: `#C3C9D5` - Default border color
- **Border Light**: `#E2E2E2` - Lighter border variant
- **Input**: `#C3C9D5` - Input border color
- **Gray Dark**: `#707070` - Dark gray for borders

### Utility Colors
- **Link Hover**: `#A8A8A8` - Link hover state
- **Search Hover**: `#F1F1FF` - Search result hover (light mode)
- **Shadow Color**: `rgba(0, 0, 0, 0.1)` - Box shadow color
- **Enrolled Button**: `#1E3A5F` - Enrolled course button
- **Enrolled Button Hover**: `#2C4A6F` - Hover state

## 🎨 Design Patterns Found

### Card Styles
```css
/* Course Cards */
- Shadow: 0px 7px 16px rgba(0, 0, 0, 0.1)
- Border Radius: 15px
- Hover: translateY(-2px) with shadow increase

/* Article Cards */
- Shadow: 0px 7px 16px rgba(0, 0, 0, 0.1)
- Border Radius: 10px
- Hover: underline on title

/* Training Cards */
- Padding: 30px
- Shadow: 0px 7px 16px rgba(0, 0, 0, 0.1)
- Border Radius: 10px
```

### Button Patterns
```css
/* Primary Button */
- Background: #001645
- Color: #FFFFFF
- Hover: #17BC43
- Border Radius: 30px (rounded-full)
- Height: 56px

/* Secondary Button */
- Background: #17BC43
- Color: #FFFFFF
- Hover: #17A03B
- Border Radius: 30px

/* Outline Button */
- Border: 2px solid #001645
- Color: #001645
- Hover: bg-#001645, color-#FFFFFF
```

### Badge Styles
```css
/* Course Type Badges */
- Online: Blue (#3B82F6)
- Presence: Orange (#FFA500)
- Live: Red (#FF5C5C)
- Border Radius: 18px
- Padding: 10px
- Font: Almarai-Bold
```

### Typography Scale
```css
/* Headings */
- H1: 48px (Almarai-Bold)
- H2: 36px (Almarai-Bold)
- H3: 28px (Almarai-Bold)
- H4: 20px (Almarai-Bold)

/* Body Text */
- Large: 20px
- Base: 16px
- Small: 14px
```

### Spacing System
```css
/* Padding/Margin Patterns */
- Section Padding: 80px (desktop), 40px (tablet), 10px (mobile)
- Card Padding: 30px (desktop), 20px (mobile)
- Gap in Grids: 40px (desktop), 20px (mobile)
```

### Border Radius Scale
```css
- sm: 5px
- md: 10px
- lg: 10px (0.625rem)
- xl: 14px
- 2xl: 18px
- 3xl: 18px
- full: 9999px (rounded-full)
```

### Grid Patterns
```css
/* Auto-fit Grid */
grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
gap: 40px;

/* Responsive Grid */
- Desktop: minmax(320px, 1fr)
- Tablet: minmax(250px, 1fr)
- Mobile: 100%
```

### Transition Patterns
```css
- Base: 150ms cubic-bezier(0.4, 0, 0.2, 1)
- Fast: 100ms cubic-bezier(0.4, 0, 0.2, 1)
- Slow: 300ms cubic-bezier(0.4, 0, 0.2, 1)
- Slower: 700ms cubic-bezier(0.4, 0, 0.2, 1)
```

### Z-Index Scale
```css
- Dropdown: 1000
- Sticky: 1020
- Fixed: 1030
- Modal Backdrop: 1040
- Modal: 1050
- Popover: 1060
- Tooltip: 1070
```

## 🔧 Component-Specific Styles

### Search Component
- Input Height: 70px
- Border Radius: 36px (full)
- Border: 0.5px solid #8994AB
- Results Background: #FFFFFF
- Results Hover: #F1F1FF
- Results Border: 1px solid #E2E2E2

### Statistics Cards
- Height: 168px
- Background: #39465E
- Border: 1px solid #707070
- Text Color: #FFFFFF
- Number Size: 48px (Almarai-Bold)

### Carousel Controls
- Size: 40px × 40px (desktop), 30px × 30px (mobile)
- Background: #FFFFFF
- Border: 1px solid #001645
- Border Radius: 25px
- Hover: Background #001645

### Pagination
- Item Size: 40px × 40px
- Border: 2px solid #001645
- Active Background: #001645
- Active Color: #FFFFFF
- Disabled Border: #999999

### Form Inputs
- Height: 44px (standard), 56px (large)
- Border: 1px solid #8994AB
- Border Radius: 5px
- Focus Border: #001645
- Placeholder Color: #8994AB

## 📱 Responsive Breakpoints
```css
/* Mobile */
@media (max-width: 481px)

/* Tablet Small */
@media (min-width: 482px) and (max-width: 767px)

/* Tablet */
@media (min-width: 768px) and (max-width: 991px)

/* Desktop Small */
@media (min-width: 992px) and (max-width: 1280px)

/* Desktop Large */
@media (min-width: 1281px)
```

## ✅ Implementation Status

### ✅ Completed
- [x] All colors extracted and added to CSS variables
- [x] Hover states for all color variants
- [x] Complete border radius scale
- [x] Z-index scale
- [x] Transition timing functions
- [x] Typography scale
- [x] Box shadow variants
- [x] Utility classes for common patterns
- [x] Card component styles
- [x] Button variants
- [x] Badge styles
- [x] Grid patterns
- [x] Search component styles
- [x] Pagination styles
- [x] Form input styles

### 🎯 Usage Examples

#### Using Colors
```tsx
// Primary button
<button className="bg-primary hover:bg-primary-hover text-primary-foreground">
  Click Me
</button>

// Secondary button
<button className="bg-secondary hover:bg-secondary-hover text-secondary-foreground">
  Action
</button>

// Card with shadow
<div className="card-shadow rounded-xl p-6">
  Content
</div>
```

#### Using Utility Classes
```tsx
// Course card
<div className="course-card hover-lift">
  <div className="course-badge">Online</div>
  <h3 className="hover-underline">Course Title</h3>
</div>

// Grid layout
<div className="grid-auto-fit">
  {/* Cards */}
</div>

// Transitions
<div className="transition-base hover-lift">
  Animated content
</div>
```

## 🎨 Design System Principles

### SOLID Principles Applied
1. **Single Responsibility**: Each CSS variable serves one purpose
2. **Open/Closed**: Extensible through CSS variables without modifying core
3. **Liskov Substitution**: Color variants can replace base colors
4. **Interface Segregation**: Separate concerns (colors, spacing, typography)
5. **Dependency Inversion**: Components depend on CSS variables, not hardcoded values

### DRY (Don't Repeat Yourself)
- All colors defined once in CSS variables
- Reusable utility classes
- Consistent spacing and sizing scales

### Consistency
- Unified color naming convention
- Consistent hover states
- Standardized component patterns
- Predictable responsive behavior

## 🚀 Next Steps

1. Create component library using these styles
2. Document component usage patterns
3. Add Storybook for visual documentation
4. Create design tokens for other platforms
5. Set up automated visual regression testing
