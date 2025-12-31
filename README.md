# Countertop Calendar PWA

A beautiful, feature-rich calendar planner app designed for iPad, built with React and optimized as a Progressive Web App.

## Features

- **Calendar Views**: Switch between Month, Week, and Day views
- **Event Management**: Create, edit, and delete events with custom colors and times
- **Sticky Notes**: Draggable notes with different colors for quick reminders
- **Photo Gallery**: Upload and view photos with a beautiful gallery interface
- **PWA Support**: Install on your iPad home screen for a native app experience
- **Offline Ready**: Works offline with local storage for all your data
- **Touch Optimized**: Designed with touch interactions in mind for iPad

## Installation

### Development

```bash
npm install
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

## Using as a PWA on iPad

1. Open the app in Safari on your iPad
2. Tap the Share button
3. Select "Add to Home Screen"
4. The app will now appear on your home screen and work like a native app!

## Features Guide

### Calendar
- Use the Month/Week/Day buttons to switch views
- Click on any date to add a new event
- Click on an existing event to edit or delete it
- Use the arrow buttons to navigate between dates
- Click "Today" to quickly return to the current date

### Sticky Notes
- Click "New Note" to create a sticky note
- Drag notes around to organize them
- Click and drag the grip icon (⋮⋮) to move notes
- Type directly in the note to edit content
- Click the trash icon to delete a note

### Photo Gallery
- Click "Upload Photos" to add images
- Click on any photo to view it in full screen
- Hover over a photo and click the trash icon to delete it

## Technology Stack

- React 18
- TypeScript
- Vite
- date-fns for date manipulation
- Lucide React for icons
- Vite PWA Plugin for Progressive Web App functionality

## Browser Support

Best experienced on:
- Safari on iPad
- Chrome on iPad
- Modern desktop browsers

## Data Storage

All data is stored locally in your browser using localStorage. Your events, notes, and photos are private and never leave your device.
