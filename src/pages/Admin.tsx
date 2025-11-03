import { Studio } from "sanity";
import config from "@/sanity/sanity.config.ts";
import {usePrefersDark} from "@sanity/ui";
import {lovableDark, lovableLight} from "@/sanity/lovableTheme.ts";
import {useMemo} from "react";

export default function AdminPage() {
  const dark = usePrefersDark()

  const configWithTheme = useMemo(() => {
    return {...config, theme: dark ? lovableDark : lovableLight};
  }, [dark])
  return (
    <div
      style={{
        height: '100vh',
        maxHeight: '100dvh',
        overscrollBehavior: 'none',
        WebkitFontSmoothing: 'antialiased',
        overflow: 'auto',
      }}
    >
      <Studio  config={configWithTheme} unstable_noAuthBoundary scheme={dark ? 'dark' : 'light'} />
    </div>
  );
}

