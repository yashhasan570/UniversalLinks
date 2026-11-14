// User-level notification preferences for email communications
export const NOTIFICATION_PREFERENCE_TYPES = [
  "dubLinks", // Universal Links Links product updates on app.universallinks.co
] as const;

export type NotificationPreferenceType =
  (typeof NOTIFICATION_PREFERENCE_TYPES)[number];

// Mapping from preference type to UserNotificationPreferences schema field names
// (1:1 mapping since we're using the same names as the schema)
export const NOTIFICATION_PREFERENCE_FIELD_MAP: Record<
  NotificationPreferenceType,
  "dubLinks"
> = {
  dubLinks: "dubLinks",
};

// Default all preferences to true (opted in)
export const DEFAULT_NOTIFICATION_PREFERENCES: Record<
  NotificationPreferenceType,
  boolean
> = {
  dubLinks: true,
};

export const NOTIFICATION_PREFERENCE_LABELS: Record<
  NotificationPreferenceType,
  { title: string; description: string; link: string }
> = {
  dubLinks: {
    title: "Universal Links Links",
    description:
      "New Universal Links Links features and guides on how to manage and track your links",
    link: "https://universallinks.co/links",
  },
};
