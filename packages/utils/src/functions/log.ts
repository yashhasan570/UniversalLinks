const logTypeToEnv = {
  alerts: process.env.UNIVERSALLINKS_SLACK_HOOK_ALERTS,
  cron: process.env.UNIVERSALLINKS_SLACK_HOOK_CRON,
  errors: process.env.UNIVERSALLINKS_SLACK_HOOK_ERRORS,
  links: process.env.UNIVERSALLINKS_SLACK_HOOK_LINKS,
};

export const log = async ({
  message,
  type,
  mention = false,
}: {
  message: string;
  type: "alerts" | "cron" | "errors" | "links";
  mention?: boolean;
}) => {
  /* Log a message to the console */
  console.log(message);

  if (process.env.VERCEL_ENV !== "production") {
    console.log("Skipping log to Universal Links Slack in non-production environment.");
    return;
  }

  const HOOK = logTypeToEnv[type];
  if (!HOOK) return;
  try {
    return await fetch(HOOK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              // prettier-ignore
              text: `${mention ? "<@U0404G6J3NJ> " : ""}${(type === "alerts" || type === "errors") ? ":alert: " : ""}${message}`,
            },
          },
        ],
      }),
    });
  } catch (e) {
    console.log(`Failed to log to Universal Links Slack. Error: ${e}`);
  }
};
