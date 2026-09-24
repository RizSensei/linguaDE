# Linguade

Linguade is a small, browser-based German vocabulary reference. Browse learning themes to see German words and their English translations, with example sentences where provided. Theme pages also show adjectives, adverbs, and theme-level example sentences when those are included in the data.

## Features

- Browse vocabulary by topic from the home page or navigation bar.
- View German–English word pairs and optional translated example sentences.
- Open topic routes directly; unknown topics show a not-found page.
- Responsive layout for desktop and mobile screens.

## Topics

Topics are loaded from JSON files in `src/data`. Current topics include:

Accidents, Asking for Directions, Bank, Breakfast, Cooking, Daily Routine, Family, Feelings, Festival, Friendship, Gym, Health, Hiking, Hobbies, Home, Household Chores, Human Body, Library, Money and Payments, Pets, Relationships, Shopping, Sleep, Socializing, Social Media, Swimming, Technology, Train Station, Transportation, and Weather.

## Requirements

- Node.js (compatible with the Vite version in `package.json`)
- npm

## Run locally

Install dependencies and start the development server:

```sh
npm install
npm run dev
```

Vite prints the local URL in the terminal. To create and serve a production build locally:

```sh
npm run build
npm run preview
```

## Content format

Each file in `src/data` represents one topic. Its filename is used to create the route (for example, `daily_routine.json` is available at `/daily_routine`). A topic can contain `words`, `adjectives`, `adverbs`, and `sentences` arrays. Word-like entries use German and English values and may include paired example sentences:

```json
{
  "theme": "Daily Routine",
  "words": [
    {
      "de": "der Tagesablauf",
      "en": "daily routine",
      "sentence_de": "Mein Tagesablauf ist ziemlich ähnlich.",
      "sentence_en": "My daily routine is pretty similar."
    }
  ],
  "sentences": [
    { "de": "Guten Morgen!", "en": "Good morning!" }
  ]
}
```

The app discovers topic files automatically through Vite, so adding a valid JSON file to `src/data` makes it available without editing a separate topic registry.

## Project structure

```text
src/
  components/   Topic detail and not-found views
  data/         Topic vocabulary and sentence JSON files
  router/       Vue Router configuration
  services/     Topic data loading helpers
  views/        Home page and topic selection
  App.vue       Shared application layout and navigation
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and build the production assets |
| `npm run preview` | Serve the production build locally |

The project is configured for Vercel deployment with `dist` as the build output directory.
