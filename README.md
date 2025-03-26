# Othaim E-Commerce

A modern e-commerce web application built with Next.js, TypeScript, and Tailwind CSS. This application allows users to browse products, add them to a shopping cart, and complete orders with a smooth user experience.

## Application Structure

The application follows a clean architecture approach with separation of concerns:

- **src/app/** - Next.js App Router structure with pages for products, cart, and checkout
- **src/components/** - Reusable UI components (Button, ProductCard, CartItem, Header)
- **src/data/** - API helpers and services for data fetching
- **src/lib/** - Business logic, hooks, and state management
- **src/tests/** - Test files organized by components, lib, and pages

## Features

- Product listing with search and category filtering
- Shopping cart management with Zustand state management
- Checkout process with form validation
- Order confirmation
- Responsive design for all device sizes
- Offline functionality with local storage caching
- API integration with the Fake Store API

## Technologies Used

### Core Technologies

- **Next.js 15** - React framework with App Router for server and client components
- **TypeScript** - For type safety and better developer experience
- **Tailwind CSS** - For styling and responsive design

### State Management & Data Fetching

- **Zustand** - Lightweight state management solution
  - *Why Zustand?* Chosen for its simplicity, small bundle size, and ease of integration with React hooks compared to Redux or Context API
- **Axios** - For API requests
  - *Why Axios?* Provides a simple API, automatic JSON transformation, and better error handling than fetch

### Offline Functionality

- **LocalStorage** - For caching product data and cart state
  - *Why LocalStorage?* Simple to implement and sufficient for the application's needs. For a more robust solution, IndexedDB could be used in the future.

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Environment Setup

1. Clone the repository
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

## Testing

The application follows Test-Driven Development (TDD) principles. Tests are organized in the `src/tests` directory, mirroring the structure of the application code.

### Running Tests

```bash
npm test
# or
yarn test
```

### Test Coverage

The tests cover:
- Component rendering and interactions
- State management logic
- API service functions
- Hooks behavior

## Deployment

The application can be deployed on any platform that supports Next.js applications, such as Vercel, Netlify, or AWS Amplify.

### Build for Production

```bash
npm run build
# or
yarn build
```

## Future Improvements

- Implement user authentication
- Add product details page
- Enhance offline capabilities with service workers
- Add more payment options
- Implement order history
- Add product reviews

## License

This project is open source and available under the [MIT License](LICENSE).
