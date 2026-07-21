import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { StrictMode } from "react";

const container = document.getElementById("root");
const root = createRoot(container!);

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const { worker } = await import("./mocks/browser");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start({
    serviceWorker: {
      url: "/kubernetes/mockServiceWorker.js",
    },
    onUnhandledRequest: "bypass",
  });
}

enableMocking().then(() =>
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  ),
);
