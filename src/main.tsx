import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PostHogErrorBoundary } from "@posthog/react";
import { App } from "./features/prototype/app";
import { prototypeLogger } from "./lib/posthog-logger";
import posthog from "posthog-js";
import "./app/globals.css";

const posthogKey = import.meta.env.VITE_POSTHOG_KEY;
const posthogHost = import.meta.env.VITE_POSTHOG_HOST;

if (posthogKey && posthogHost) {
  posthog.init(posthogKey, {
    api_host: posthogHost,
    logs: {
      serviceName: "doroboty-ai-case-web",
      environment: import.meta.env.MODE,
    },
  });
  prototypeLogger.info("prototype client initialized", {
    event: "prototype.client_initialized",
    deployment_mode: import.meta.env.MODE,
  });
} else if (import.meta.env.DEV) {
  const missingVariable = posthogKey ? "VITE_POSTHOG_HOST" : "VITE_POSTHOG_KEY";
  throw new Error(
    `${missingVariable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${missingVariable} is configured`,
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PostHogErrorBoundary>
      <App />
    </PostHogErrorBoundary>
  </StrictMode>,
);
