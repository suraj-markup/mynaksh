# 🔮 MyNaksh - Astro Journal App

A beautiful and intuitive astrology-powered journal app built with React Native and Expo. Combine daily horoscope insights with personal reflection to create a meaningful journaling experience.

## 📱 Features

### Current Features
- **Daily Horoscopes**: Get personalized daily horoscope readings for all 12 zodiac signs
- **Smart Journal**: Write and organize your daily thoughts and reflections
- **Zodiac Integration**: Select your zodiac sign and get tailored astrological insights
- **Persistent Storage**: All journal entries are saved locally and persist across app sessions
- **Beautiful UI**: Celestial night theme with modern, calming design
- **Cross-Platform**: Works on iOS, Android, and web

### Key Highlights
- 🌟 **Celestial Design**: Dark theme with gold accents for a mystical experience
- 📝 **Rich Journal Experience**: Full-featured text editor with entry management
- 🔄 **Smart Caching**: Horoscope data is cached to minimize API calls
- 💾 **Local Storage**: Uses AsyncStorage for reliable data persistence
- 🏗️ **Redux Architecture**: Clean state management with Redux Toolkit
- 📱 **Responsive Design**: Optimized for all screen sizes

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mynaksh
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on your preferred platform**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Press `w` for web browser
   - Scan QR code with Expo Go app on your device

### Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint for code quality

## 🏗️ Architecture

### Tech Stack
- **Framework**: React Native with Expo
- **State Management**: Redux Toolkit
- **Navigation**: Expo Router (file-based routing)
- **Storage**: AsyncStorage for local data persistence
- **API**: Aztro API for horoscope data
- **Styling**: React Native StyleSheet with custom theme system

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── CustomButton.tsx
│   ├── CustomCard.tsx
│   ├── DateHeader.tsx
│   ├── FloatingActionButton.tsx
│   ├── HoroscopeCard.tsx
│   ├── JournalButton.tsx
│   ├── JournalInput.tsx
│   ├── SaveButton.tsx
│   └── ZodiacSelector.tsx
├── screens/             # Screen components
│   ├── HomeScreen.tsx
│   ├── JournalScreen.tsx
│   └── JournalEntryScreen.tsx
├── store/               # Redux store and slices
│   ├── store.ts
│   ├── horoscopeSlice.ts
│   └── journalSlice.ts
├── services/            # API services
│   └── horoscopeService.ts
└── utils/               # Helper functions and constants
    ├── constants.ts
    └── theme.ts
```

## 🎨 Design System

### Color Palette
- **Primary Background**: `#0D1B2A` (Deep night sky)
- **Card Background**: `#1B263B` (Muted blue for containers)
- **Accent Color**: `#FFD700` (Warm gold for highlights)
- **Primary Text**: `#E0E1DD` (Soft off-white)
- **Secondary Text**: `#A9A9A9` (Light gray)

### Typography
- **Headings**: Lora (Serif) for mystical elegance
- **Body Text**: Lato (Sans-serif) for clean readability

## 📖 Usage Guide

### Home Screen
1. Select your zodiac sign from the dropdown
2. View your daily horoscope
3. Tap "Write Journal" to create or edit today's entry

### Journal Screen
1. Browse all your journal entries
2. Tap any entry to edit it
3. Use the floating action button (+) to create new entries

### Journal Entry Screen
1. Write or edit your journal entry
2. Tap "Save" to persist your changes
3. Navigate back to see your entry in the journal list

## 🔮 Future Enhancements

### Phase 1: Enhanced Personalization
- **User Profiles**: Create detailed astrological profiles with birth chart information
- **Custom Horoscope Preferences**: Choose between daily, weekly, and monthly readings
- **Mood Tracking**: Integrate mood indicators with journal entries
- **Tarot Integration**: Daily tarot card draws with interpretations

### Phase 2: Social & Sharing Features
- **Community Journals**: Share selected entries with the community (anonymously)
- **Astrology Insights**: AI-powered insights based on journal patterns and astrological events
- **Friend Connections**: Connect with friends and share horoscope compatibility
- **Entry Templates**: Pre-designed journal templates for different occasions

### Phase 3: Advanced Analytics & Insights
- **Personal Analytics**: Visualize journaling habits and mood patterns over time
- **Astrological Correlations**: Analyze how planetary movements affect your mood and entries
- **Goal Setting**: Set and track personal goals aligned with astrological guidance
- **Meditation Integration**: Guided meditations based on your zodiac sign and current planetary positions

### Phase 4: Premium Features
- **Premium Horoscopes**: Detailed, personalized readings from professional astrologers
- **Birth Chart Analysis**: Complete natal chart readings and interpretations
- **Compatibility Reports**: Detailed relationship compatibility analysis
- **Custom Themes**: Additional visual themes and customization options
- **Export & Backup**: Cloud backup and PDF export of journal entries

### Phase 5: AI & Machine Learning
- **Smart Insights**: AI-powered analysis of journal entries for personal growth recommendations
- **Predictive Astrology**: Machine learning models to predict optimal times for different activities
- **Personalized Content**: AI-curated content based on individual astrological profile and interests
- **Voice Journaling**: Speech-to-text integration for hands-free journaling

### Long-term Vision
- **Wellness Integration**: Connect with fitness and health apps for holistic well-being
- **Professional Astrologer Network**: Direct consultations with certified astrologers
- **Educational Content**: Comprehensive astrology learning modules and courses
- **Global Community**: International community features with cultural astrology variations

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines
1. Follow the existing code style and architecture
2. Add appropriate tests for new features
3. Update documentation as needed
4. Ensure all linting checks pass

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Aztro API** for providing horoscope data
- **Expo Team** for the amazing development platform
- **React Native Community** for the robust ecosystem
- **Design Inspiration** from modern astrology and wellness apps

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](../../issues) page for existing solutions
2. Create a new issue with detailed information
3. Include device information, OS version, and steps to reproduce

---

**Made with ❤️ and ✨ for astrology enthusiasts and journal lovers**