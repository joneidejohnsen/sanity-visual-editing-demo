import { Studio } from "sanity";
import config from "../../sanity.config";

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
      <Studio config={config} />
    </div>
  );
}

