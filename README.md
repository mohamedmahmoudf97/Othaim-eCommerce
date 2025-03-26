# Othaim E-Commerce

A modern e-commerce web application built with Next.js, TypeScript, and Tailwind CSS. This application allows users to browse products, add them to a shopping cart, and complete orders with a smooth user experience.

## Application Structure

The application follows a clean architecture approach with separation of concerns:

```
othaim-ecommerce/
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js App Router pages
│   │   ├── checkout/   # Checkout and confirmation pages
│   │   ├── products/   # Product listing and details
│   │   └── cart/       # Shopping cart page
│   ├── components/     # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Header.tsx
│   │   ├── ProductCard.tsx
│   │   └── CartItem.tsx
│   ├── data/           # API services and data fetching
│   │   └── api.ts      # Axios instance and API helpers
│   ├── lib/            # Business logic and state management
│   │   ├── store.ts    # Zustand store for cart management
│   │   ├── types.ts    # TypeScript type definitions
│   │   └── hooks/      # Custom React hooks
│   └── tests/          # Test files
│       ├── components/ # Component tests
│       ├── data/       # API service tests
│       ├── lib/        # Store and hooks tests
│       └── pages/      # Page component tests
├── jest.config.ts      # Jest configuration
├── jest.setup.ts       # Test setup and global mocks
├── tailwind.config.js  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Environment Setup

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/othaim-ecommerce.git
   cd othaim-ecommerce
   ```

2. Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_API_BASE_URL=https://fakestoreapi.com
   ```

### Installation

```bash
# Install dependencies
npm install
# or
yarn install
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Technologies and Packages

### Core Technologies

- **Next.js 15** - React framework with App Router for server and client components
  - Chosen for its hybrid rendering capabilities, built-in routing, and optimized performance
  - App Router provides a more intuitive file-based routing system

- **TypeScript** - For type safety and better developer experience
  - Enables early error detection and improves code maintainability
  - Configured with strict mode for maximum type safety

- **Tailwind CSS** - For styling and responsive design
  - Utility-first approach speeds up development
  - Reduces CSS bundle size through PurgeCSS integration
  - Consistent design system across the application

### State Management & Data Fetching

- **Zustand** - Lightweight state management solution
  - Chosen for its simplicity compared to Redux
  - Smaller bundle size (2KB vs Redux's 42KB)
  - Easy integration with React hooks
  - Immutable state updates with immer integration
  - Persistence with localStorage for cart state

- **Axios** - For API requests
  - Consistent interface across browsers
  - Request/response interception capabilities
  - Automatic JSON transformation
  - Better error handling than native fetch

### Testing Tools

- **Jest** - JavaScript testing framework
  - Fast parallel test execution
  - Built-in code coverage reports
  - Snapshot testing capabilities

- **React Testing Library** - Component testing utilities
  - Encourages testing from a user perspective
  - Avoids testing implementation details
  - Simulates real user interactions

## Testing Approach

The application follows Test-Driven Development (TDD) principles, where tests are written before implementation code. The testing strategy includes:

### Unit Tests

- **Component Tests**: Verify that UI components render correctly and respond to user interactions
  - Button component tests ensure proper rendering and click handling
  - ProductCard tests verify product information display and add-to-cart functionality
  - Header tests check navigation links and cart icon behavior

- **Store Tests**: Validate state management logic
  - Cart operations (add, remove, update quantity)
  - Total price calculations
  - Persistence with localStorage

- **Service Tests**: Ensure API interactions work correctly
  - Product fetching and error handling
  - Mock API responses for consistent testing

### Integration Tests

- **Page Tests**: Test complete page components with their dependencies
  - Checkout page tests validate form submission and validation
  - Product listing tests verify filtering and sorting functionality

### Test Coverage Areas

The tests cover:
- Component rendering and user interactions
- State management operations
- Form validation logic
- API service functions
- Navigation and routing
- Error states and loading indicators

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage report
npm test -- --coverage

# Run tests in watch mode during development
npm test -- --watch

# Run specific test file
npm test -- src/tests/components/Button.test.tsx
```

## Deployment

The application can be deployed on any platform that supports Next.js applications, such as Vercel, Netlify, or AWS Amplify.

### Build for Production

```bash
npm run build
# or
yarn build
```

## Future Improvements

- Implement user authentication and account management
- Add product details page with related products
- Enhance offline capabilities with service workers
- Add more payment options and integration with payment gateways
- Implement order history and tracking
- Add product reviews and ratings system
- Optimize image loading with Next.js Image optimization

## License

This project is open source and available under the [MIT License](LICENSE).
