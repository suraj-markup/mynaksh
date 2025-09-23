# 🔮 Astro Journal App: Development & Design Guide

This document outlines the objectives, design system, architecture, and development plan for the Astro Journal App, based on the assignment requirements.

-----

## \#\# 🎨 Design System

To ensure a consistent and appealing user experience, we'll adopt a "Celestial Night" theme. It's modern, calming, and fits the astrological context of the app.

### \#\#\# Color Palette

The palette is designed for clarity and a mystical feel, focusing on dark mode.

  * **Primary Background:** A deep, dark blue that mimics the night sky.
      * Hex: `#0D1B2A`
  * **Card/Surface Background:** A slightly lighter, muted blue for containers.
      * Hex: `#1B263B`
  * **Accent Color:** A vibrant, warm gold for buttons, active states, and highlights.
      * Hex: `#FFD700`
  * **Primary Text:** A soft, off-white for high readability.
      * Hex: `#E0E1DD`
  * **Secondary Text:** A light gray for placeholders, dates, and less important information.
      * Hex: `#A9A9A9`

### \#\#\# Typography

We'll use two complementary fonts to balance elegance with readability. You can fetch these from Google Fonts.

  * **Headings (`<h1>`, `<h2>`):** **Lora** (Serif)
      * Use for screen titles and major headings. It has a classic, mystical feel.
  * **Body & UI Text:** **Lato** (Sans-serif)
      * Use for horoscope text, journal entries, button text, and labels. It's clean and highly readable on mobile screens.

### \#\#\# Component Styling

  * **Buttons:** Solid background with the accent color (`#FFD700`), white text (`#E0E1DD`), and rounded corners (`borderRadius: 8`).
  * **Cards:** Use the surface background color (`#1B263B`) with a subtle border or shadow, and rounded corners (`borderRadius: 12`).
  * **Inputs:** A simple underline or a full-box design with the surface background color, with primary text color for the input.

### \#\#\# Iconography

Use a consistent icon library. **Feather Icons** from `react-native-vector-icons` is recommended for its clean and modern look.

  * **Example Icons:** `chevron-down` for the dropdown, `edit-3` for the journal button, `save` for the save button.

-----

## \#\# ✅ Core Features Checklist

[cite\_start]Use this checklist to track your progress. [cite: 3, 4, 5, 6, 7]

  * [ ] **Home Screen:**
      * [ ] Display today's date.
      * [ ] Fetch and show the daily horoscope for the selected zodiac sign.
      * [ ] Implement a dropdown to select a zodiac sign.
      * [ ] "Write Journal" button to navigate to the Journal Screen.
  * [ ] **Journal Screen:**
      * [ ] Editable text area for the user to write their journal entry.
      * [ ] Load and display any previously saved entry for the current day.
      * [ ] Save the journal entry to local storage.
  * [ ] **Navigation:**
      * [ ] Set up stack navigation between Home and Journal screens using `React Navigation`.
  * [ ] **Persistence:**
      * [ ] Use `AsyncStorage` to store journal entries.
      * [ ] Ensure journal data persists across app restarts.
  * [ ] **Architecture:**
      * [ ] Implement the specified folder structure (`/src`, `/components`, etc.).
      * [ ] Use Redux Toolkit for state management.

-----

## \#\# 🏗️ App Architecture & Tech Stack

This project will follow a clean, scalable architecture as required.

### [cite\_start]\#\#\# Tech Stack [cite: 22]

  * **Framework:** React Native
  * **State Management:** Redux Toolkit
  * **Routing:** React Navigation
  * **Local Storage:** AsyncStorage
  * **Styling:** StyleSheet API (Functional, consistent, responsive)

### [cite\_start]\#\#\# Folder Structure [cite: 24, 25, 26, 27, 28, 29, 30]

```
/src
├── /components       # Reusable UI components (e.g., CustomButton, HoroscopeCard)
├── /hooks            # Custom hooks (e.g., useJournal, useHoroscope)
├── /screens          # Screen components (HomeScreen, JournalScreen)
├── /services         # API calls and other external services (e.g., astrologyApi.js)
├── /store            # Redux Toolkit setup (slices, store.js)
├── /utils            # Helper functions (e.g., date formatters, constants)
App.js                # Root component, navigation container
```

-----

## \#\# 🧩 Screen & Component Breakdown

This section details the components needed for each screen.

### [cite\_start]\#\#\# Home Screen [cite: 10]

  * **State Needed:** `selectedSign`, `horoscopeData`, `isLoading`, `error`.
  * **Components:**
      * [cite\_start]`ZodiacSelector.js`: A dropdown component to select a zodiac sign[cite: 12]. It will dispatch an action to update the `selectedSign` in the Redux store.
      * [cite\_start]`HoroscopeCard.js`: A card component to display the fetched horoscope text, date, and sign[cite: 11].
      * [cite\_start]`JournalButton.js`: A button that navigates the user to the `JournalScreen` for the current day[cite: 13].

### [cite\_start]\#\#\# Journal Screen [cite: 14]

  * **State Needed:** `journalText`, `isSaved`.
  * **Components:**
      * `DateHeader.js`: Displays the current date.
      * [cite\_start]`JournalInput.js`: A large, multiline `TextInput` for the journal entry[cite: 15]. [cite\_start]It should fetch and display the saved entry for the day on load[cite: 16].
      * [cite\_start]`SaveButton.js`: A button to explicitly save the journal entry[cite: 17]. This will dispatch an action to save the text to the Redux store (which will then be persisted).

-----

## \#\# ⚙️ State & Data Management Plan

### \#\#\# State Management (Redux Toolkit)

We will create two slices:

1.  **`horoscopeSlice.js`**

      * **State:** `{ data: {}, status: 'idle' | 'loading' | 'succeeded' | 'failed', error: null }`
      * **Actions:** `fetchHoroscope(sign)` (async thunk).
      * **Purpose:** Manages fetching and caching daily horoscopes to avoid redundant API calls.

2.  **`journalSlice.js`**

      * **State:** `{ entries: { 'YYYY-MM-DD': 'journal text...' }, selectedSign: 'Aries' }`
      * **Actions:** `updateJournalEntry({ date, text })`, `setSelectedSign(sign)`.
      * **Purpose:** Stores all journal entries keyed by date and manages the currently selected zodiac sign.

### \#\#\# Data Persistence (AsyncStorage)

  * We'll use AsyncStorage to save and retrieve the `journalSlice.entries`.
  * **Strategy:**
    1.  When the app loads, read the journal entries from AsyncStorage and dispatch an action to hydrate the Redux store.
    2.  Whenever `updateJournalEntry` is successfully dispatched, subscribe to store updates and write the new state of `journalSlice.entries` back to AsyncStorage.

-----

## \#\# 🚀 Development Roadmap: A Step-by-Step Guide

Follow these steps for a structured development process.

1.  **Project Setup:**

      * Initialize a new React Native project.
      * Install dependencies: `react-navigation`, `redux-toolkit`, `react-redux`, `async-storage`, `axios`.
      * Create the folder structure as defined above.

2.  **Setup Redux Store:**

      * Create `horoscopeSlice.js` and `journalSlice.js`.
      * Configure the main store in `store/store.js`.
      * Wrap your `App.js` in the `<Provider>` component.

3.  **API Service Layer:**

      * [cite\_start]In `services/horoscopeService.js`, create a function to call the aztro API[cite: 37]. Handle loading and error states.
      * [cite\_start]Start with mock data in a config file to build the UI without relying on the API[cite: 39].

4.  **Build the Home Screen:**

      * Create the static UI for `HomeScreen.js` using the defined components.
      * Implement the `ZodiacSelector` dropdown.
      * Connect the screen to Redux to dispatch `fetchHoroscope` when the sign changes.
      * Display the horoscope data or a loading/error message.

5.  **Setup Navigation:**

      * [cite\_start]Configure a Stack Navigator in `App.js` with `Home` and `Journal` screens[cite: 19, 20].
      * Implement the navigation from the "Write Journal" button on the Home screen to the Journal screen.

6.  **Build the Journal Screen:**

      * Create the UI for `JournalScreen.js`.
      * Connect the `TextInput` to Redux state.
      * Implement the `SaveButton` to dispatch the `updateJournalEntry` action.

7.  **Implement Persistence:**

      * Write the logic to save the journal entries to AsyncStorage whenever they change.
      * Write the logic to load the entries from AsyncStorage when the app starts.

8.  **Final Touches & Polish:**

      * Ensure the styling is consistent and responsive.
      * Add loading indicators and user feedback.
      * Test the offline functionality thoroughly.
      * Write the `README.md` with setup instructions and future scope ideas.
      * [cite\_start]Record a demo video of the app flow[cite: 43].