import posthog from "posthog-js";

type PrototypeLogAttributes = Record<string, string | number | boolean>;

const posthogConfigured = Boolean(
  import.meta.env.VITE_POSTHOG_KEY && import.meta.env.VITE_POSTHOG_HOST,
);

export const prototypeLogger = {
  info(message: string, attributes: PrototypeLogAttributes) {
    if (posthogConfigured) posthog.logger.info(message, attributes);
  },
};
