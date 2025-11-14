# Frontend Architecture Documentation

This document outlines the new frontend architecture based on Atomic Design methodology and modern React best practices.

## Directory Structure

```
blockchain-betting/
├── app/                          # Next.js app directory
├── ui/                           # UI Design System (Private Component Library)
│   ├── atoms/                    # Basic building blocks
│   │   ├── Button.tsx           # Button component
│   │   ├── Input.tsx            # Input component
│   │   ├── Select.tsx           # Select component
│   │   ├── Dropdown.tsx         # Dropdown component
│   │   ├── icons/               # Icon components
│   │   └── index.ts             # Export all atoms
│   ├── molecules/                # Combinations of atoms
│   │   ├── SearchBar.tsx        # Search bar (Input + Button)
│   │   ├── FormField.tsx        # Form field wrapper
│   │   └── index.ts             # Export all molecules
│   ├── organisms/                # Complex UI sections
│   ├── templates/                # Page-level layouts
│   ├── pages/                    # Specific page instances
│   └── index.ts                  # Export all UI components
├── components/                    # Business-specific components
│   ├── atoms/                    # Business atoms
│   ├── molecules/                # Business molecules
│   │   ├── cards/                # Game cards, casino cards
│   │   ├── slider/               # Swiper slider
│   │   └── AuthButton.tsx        # Authentication button
│   ├── organisms/                # Business organisms
│   │   ├── Header.tsx            # Site header
│   │   ├── Footer.tsx            # Site footer
│   │   ├── Sidebar.tsx           # Navigation sidebar
│   │   ├── Bottombar.tsx         # Mobile bottom bar
│   │   ├── MainContent.tsx       # Main content area
│   │   └── auth/                 # Authentication forms
│   ├── templates/                # Business templates
│   ├── pages/                    # Business pages
│   └── providers/                # Context providers
├── hooks/                        # Custom React hooks
│   ├── useForm.ts                # Form management hook
│   └── index.ts                  # Export all hooks
├── types/                        # TypeScript type definitions
│   └── index.ts                  # Application types
├── stories/                      # Storybook stories
│   └── Button.stories.tsx        # Button component stories
├── lib/                          # Utility functions and constants
└── public/                       # Static assets
```

## Architecture Principles

### 1. Atomic Design Methodology

- **Atoms**: Basic HTML elements and primitive components (Button, Input, Icon)
- **Molecules**: Functional units combining atoms (SearchBar, FormField)
- **Organisms**: Complex UI sections (Header, Sidebar, UserCard)
- **Templates**: Page-level layouts
- **Pages**: Specific instances with real data

### 2. Component Separation

#### Presentational vs Container Components

- **Presentational**: UI-only components in `ui/` folder
- **Container**: Business logic components in `components/` folder

#### Smart vs Dumb Components

- **Smart**: State management, API calls, business logic
- **Dumb**: Stateless, prop-driven, reusable

### 3. Design System

The `ui/` folder serves as the project's internal design system:

- Consistent visual foundation
- Reusable UI primitives
- Standardized styling patterns
- Design token implementation

### 4. Custom Hooks

Business logic is encapsulated in custom hooks:

- `useForm`: Form state management and validation
- Separation of concerns between logic and presentation
- Reusable across components

## Component Guidelines

### UI Components (ui/ folder)

- Must be purely presentational
- Accept data through props only
- No business logic or API calls
- Highly reusable and testable
- Follow consistent naming conventions

### Business Components (components/ folder)

- Can contain business logic
- May use custom hooks
- Can make API calls
- Specific to application features
- Built using UI components

## Development Workflow

### 1. Component-Driven Development (CDD)

1. Start with atoms (basic UI elements)
2. Combine into molecules (functional units)
3. Assemble organisms (complex sections)
4. Create templates (page layouts)
5. Build pages (final views)

### 2. Storybook Integration

- Develop components in isolation
- Document component variations
- Test different states and props
- Collaborate with designers

### 3. Testing Strategy

- Unit tests for UI components
- Integration tests for business components
- Visual regression tests via Storybook
- Component testing in isolation

## Styling Approach

### Tailwind CSS + Headless UI

- Utility-first CSS framework
- Unstyled, logic-only components
- Full design control
- Consistent design tokens
- Responsive design patterns

## Migration Guide

### From Old Structure

1. Basic UI components moved to `ui/atoms/`
2. Business components moved to `components/`
3. Icons moved to `ui/atoms/icons/`
4. Forms moved to `components/organisms/auth/`

### Import Updates

```typescript
// Old imports
import Button from '../component/buttons/Button'

// New imports
import { Button } from '../ui/atoms'
```

## Best Practices

### 1. Component Naming

- Use PascalCase for components
- Descriptive, semantic names
- Consistent file naming

### 2. Props Interface

- Define clear prop interfaces
- Use TypeScript for type safety
- Document complex props

### 3. State Management

- Use custom hooks for business logic
- Keep components focused on presentation
- Minimize component state

### 4. Performance

- Memoize expensive computations
- Use React.memo for pure components
- Lazy load when appropriate

## Future Enhancements

### 1. Monorepo Setup

- Share components across projects
- Centralized design system
- Version management

### 2. Design Token System

- CSS custom properties
- Theme switching
- Consistent spacing and colors

### 3. Component Testing

- Visual regression testing
- Accessibility testing
- Cross-browser compatibility

## Conclusion

This architecture promotes:

- **Reusability**: Components can be used across the application
- **Maintainability**: Clear separation of concerns
- **Scalability**: Easy to add new features
- **Consistency**: Unified design system
- **Developer Experience**: Clear structure and guidelines

Follow these principles to maintain a clean, scalable, and maintainable frontend codebase.
