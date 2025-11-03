import { buildLegacyTheme, type StudioTheme } from "sanity";

const darkProps = {
  "--lovable-background": "#1C1C1C",
  "--lovable-card": "#0D0D0D",
  "--lovable-secondary": "#262626",
  "--lovable-foreground": "#FCFBF8",
  "--lovable-muted-foreground": "#8C8C8C",
  "--lovable-border": "#404040",
  "--lovable-accent": "#4B73FF",
  "--lovable-destructive": "#D32F2F",
  "--lovable-success": "#1B5E20",
  "--lovable-warning": "#E65100",
};

const lightProps = {
  "--lovable-background": "#FCFBF8",
  "--lovable-card": "#FCFBF8",
  "--lovable-secondary": "#F7F5F0",
  "--lovable-foreground": "#1C1C1C",
  "--lovable-muted-foreground": "#5E5E5E",
  "--lovable-border": "#EAE8E3",
  "--lovable-accent": "#4B73FF",
  "--lovable-destructive": "#D32F2F",
  "--lovable-success": "#1B5E20",
  "--lovable-warning": "#E65100",
};

const darkTheme = buildLegacyTheme({
  "--black": darkProps["--lovable-background"],
  "--white": darkProps["--lovable-foreground"],
  "--gray": darkProps["--lovable-muted-foreground"],
  "--gray-base": darkProps["--lovable-muted-foreground"],
  "--component-bg": darkProps["--lovable-card"],
  "--component-text-color": darkProps["--lovable-foreground"],
  "--focus-color": darkProps["--lovable-foreground"] /* Brand */,
  "--brand-primary": darkProps["--lovable-accent"] /* Buttons */,
  "--default-button-color": darkProps["--lovable-muted-foreground"],
  "--default-button-primary-color": darkProps["--lovable-muted-foreground"],
  "--default-button-success-color": darkProps["--lovable-success"],
  "--default-button-warning-color": darkProps["--lovable-warning"],
  "--default-button-danger-color":
    darkProps["--lovable-destructive"] /* States */,
  "--state-info-color": darkProps["--lovable-accent"],
  "--state-success-color": darkProps["--lovable-success"],
  "--state-warning-color": darkProps["--lovable-warning"],
  "--state-danger-color": darkProps["--lovable-destructive"] /* Navbar */,
  "--main-navigation-color": darkProps["--lovable-background"],
  "--main-navigation-color--inverted": darkProps["--lovable-foreground"],
});

const lightTheme = buildLegacyTheme({
  "--black": lightProps["--lovable-foreground"],
  "--white": lightProps["--lovable-background"],
  "--gray": lightProps["--lovable-muted-foreground"],
  "--gray-base": lightProps["--lovable-muted-foreground"],
  "--component-bg": lightProps["--lovable-card"],
  "--component-text-color": lightProps["--lovable-foreground"],
  "--focus-color": lightProps["--lovable-background"] /* Brand */,
  "--brand-primary": lightProps["--lovable-accent"] /* Buttons */,
  "--default-button-color": lightProps["--lovable-muted-foreground"],
  "--default-button-primary-color": lightProps["--lovable-muted-foreground"],
  "--default-button-success-color": lightProps["--lovable-success"],
  "--default-button-warning-color": lightProps["--lovable-warning"],
  "--default-button-danger-color":
    lightProps["--lovable-destructive"] /* States */,
  "--state-info-color": lightProps["--lovable-accent"],
  "--state-success-color": lightProps["--lovable-success"],
  "--state-warning-color": lightProps["--lovable-warning"],
  "--state-danger-color": lightProps["--lovable-destructive"] /* Navbar */,
  "--main-navigation-color": lightProps["--lovable-background"],
  "--main-navigation-color--inverted": lightProps["--lovable-foreground"],
});

export const lovableDark: StudioTheme = darkTheme;
export const lovableLight: StudioTheme = lightTheme;
