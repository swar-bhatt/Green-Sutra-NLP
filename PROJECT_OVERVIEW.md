
# Green Sutra: Project File Overview

This document provides a summary of the key files and directories in the Green Sutra project, explaining the purpose of each one.

| File / Directory | Purpose |
| :--- | :--- |
| **Core Application (`src/app`)** | |
| `src/app/layout.tsx` | The root layout of the application. It sets up the main HTML structure, loads global CSS and fonts, and wraps the application in necessary context providers like `LanguageProvider`. |
| `src/app/page.tsx` | The main entry point for the application's user interface. It renders the primary `DashboardPage` component. |
| `src/app/actions.ts` | Defines the Next.js **Server Actions**. These are server-side functions that are securely called from the client to perform backend tasks, such as validating form input and calling the AI flows. |
| `src/app/globals.css` | Contains global styles, Tailwind CSS definitions, and the application's color theme defined as CSS variables for both light and dark modes. |
| **Artificial Intelligence (`src/ai`)** | |
| `src/ai/genkit.ts` | Configures and initializes the **Genkit** framework with the Google AI (Gemini) plugin, establishing the connection to the language model. |
| `src/ai/flows/` | This directory holds the logic for specific AI tasks. Each file defines a "flow" that contains the prompt and schema for interacting with the AI. |
| ` ... crop-recommendation-engine.ts` | Defines the flow for getting a crop recommendation. It contains the prompt that instructs the AI on how to process farm data. |
| ` ... chatbot-assistance-in-local-language.ts` | Defines the flow for the chatbot, instructing the AI to answer user questions in their selected language. |
| **UI Components (`src/components`)** | |
| `src/components/dashboard/` | Contains the main, high-level components that compose the dashboard UI. |
| ` ... DashboardPage.tsx` | The primary component that orchestrates the dashboard, managing state for recommendations and handling form submission logic. |
| ` ... CropRecommendationForm.tsx` | The form where users input their farm details. It uses `react-hook-form` for state management. |
| ` ... RecommendationResult.tsx` | The component responsible for displaying the AI-generated recommendation in a structured card layout. |
| ` ... Chatbot.tsx` | Implements the floating chatbot feature using a `Sheet` component, managing the conversation state. |
| `src/components/layout/` | Components that define the overall structure and persistent elements of the application. |
| ` ... AppLayout.tsx` | Defines the main layout structure, including the sidebar and the main content area where pages are rendered. |
| ` ... Header.tsx` | The top header bar of the application, containing the language switcher and sidebar trigger for mobile. |
| ` ... LanguageSwitcher.tsx` | The dropdown menu component that allows users to switch between English and Gujarati. |
| `src/components/ui/` | The **ShadCN UI** component library. This directory contains all the base UI primitives like `button.tsx`, `card.tsx`, `select.tsx`, etc., which are used to build the application's interface. |
| **Libraries & Context (`src/lib`, `src/context`)** | |
| `src/lib/translations.ts` | A dictionary file containing all the translation strings for English (`en`) and Gujarati (`gu`), used by the language context. |
| `src/lib/data.ts` | Contains static data used to populate form dropdowns, such as lists of cities, soil types, and crops. |
| `src/context/LanguageContext.tsx` | A React Context provider that manages the application's global language state, allowing components to access the current language and the translation function (`t`). |
| **Configuration Files** | |
| `package.json` | Defines the project's dependencies (like React, Next.js, Genkit), scripts for running and building the app, and general project metadata. |
| `tailwind.config.ts` | The configuration file for Tailwind CSS, where the application's theme (colors, fonts, etc.) is extended. |
| `next.config.ts` | The configuration file for Next.js. Used here to set up image domains and other framework-level settings. |

