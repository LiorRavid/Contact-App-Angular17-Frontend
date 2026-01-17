# ContactManager - Angular 17 Technical Challenge

A modern, high-performance contact management application built with **Angular 17**, focusing on clean architecture, reactive state management, and professional UI/UX.

## 🚀 Key Features

- **Modern Architecture**: Built with Standalone Components and the new Angular 17 Control Flow (`@if`, `@for`).
- **Reactive State Management**: Powered by **Angular Signals** for granular reactivity and optimized change detection.
- **Dynamic Search**: Real-time filtering with RxJS `debounceTime` to ensure smooth performance.
- **Infinite Scroll**: Seamless data loading using the Intersection Observer API.
- **Modular Forms**: Advanced Reactive Forms featuring custom **ControlValueAccessor** components for specialized inputs (Phone, Image Upload).
- **Security & Navigation**: Implemented `UnsavedChangesGuard` to prevent data loss and `ContactsResolver` for pre-fetching data.
- **Local Persistence**: Integrated with `localStorage` to persist contact updates across sessions.
- **Accessibility (A11y)**: Fully accessible with ARIA labels, semantic HTML, and intuitive focus management.
- **Responsive Design**: Fluid layouts optimized for Mobile, Tablet, and Desktop.

## 🛠️ Built With

- **Angular 17.3**
- **Angular Material** (UI Components)
- **SCSS** (Modular Styling)
- **RandomUser API** (Data Source)

## 🏁 Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- Angular CLI

### Installation
1. Clone the repository
2. Run `npm install`
3. Start the dev server with `npm start`
4. Navigate to `http://localhost:4200/`

## 📂 Project Structure
- `src/app/core`: Singleton services, guards, and resolvers.
- `src/app/shared`: Reusable components, pipes, models, and directives.
- `src/app/features`: Feature-based modules (List, Form).
