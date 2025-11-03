import { Studio } from "sanity";
import config from "@/sanity/sanity.config.ts";

export default function AdminPage() {
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
      <Studio  config={config} unstable_noAuthBoundary />
    </div>
  );
}

