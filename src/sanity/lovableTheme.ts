// lovableTheme.ts
// A dark, Lovable.dev–inspired theme for Sanity Studio
// Drop this file in your Studio root and import it in sanity.config.ts
// Docs: https://www.sanity.io/docs/studio/theming

import {buildLegacyTheme} from "sanity";

// Palette inspired by lovable.dev (purple/pink/cyan on near-black)
const props = {
  // base
  "--lovable-black": "#0B0D12",
  "--lovable-elevated": "#11141F",
  "--lovable-border": "#23273A",
  "--lovable-text": "#E8EAF2",
  "--lovable-muted": "#A7AEC4",

  // brand accents
  "--lovable-purple": "#6C47FF",
  "--lovable-pink": "#FF1E8C",
  "--lovable-cyan": "#21D4FD",

  // states
  "--lovable-green": "#22C55E",
  "--lovable-yellow": "#FACC15",
  "--lovable-red": "#EF4444",
};

export const lovableTheme = buildLegacyTheme({
  /* Base theme colors */
  "--black": props["--lovable-black"],
  "--white": "#ffffff",

  // greys & component surfaces
  "--gray": props["--lovable-muted"],
  "--gray-base": props["--lovable-muted"],
  "--component-bg": props["--lovable-elevated"],
  "--component-text-color": props["--lovable-text"],

  // borders & focus
  //"--hairline-color": props["--lovable-border"],
  "--focus-color": props["--lovable-purple"],

  /* Brand */
  "--brand-primary": props["--lovable-purple"],

  /* Buttons */
  "--default-button-color": props["--lovable-muted"],
  "--default-button-primary-color": props["--lovable-purple"],
  "--default-button-success-color": props["--lovable-green"],
  "--default-button-warning-color": props["--lovable-yellow"],
  "--default-button-danger-color": props["--lovable-red"],

  /* States */
  "--state-info-color": props["--lovable-cyan"],
  "--state-success-color": props["--lovable-green"],
  "--state-warning-color": props["--lovable-yellow"],
  "--state-danger-color": props["--lovable-red"],

  /* Navbar */
  "--main-navigation-color": props["--lovable-black"],
  "--main-navigation-color--inverted": props["--lovable-text"],

});
