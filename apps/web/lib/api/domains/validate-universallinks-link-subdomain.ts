import { ErrorCode } from "@/lib/api/error-codes";
import { DEFAULT_REDIRECTS, RESERVED_SLUGS, validSlugRegex } from "@universallinks/utils";
import * as z from "zod/v4";

const UNIVERSALLINKS_LINK_SUFFIX = ".universallinks.link";

type ApiErrorCode = z.infer<typeof ErrorCode>;

function validateDubLinkLabel(
  label: string,
): { error: string; code: ApiErrorCode } | null {
  if (!label || label.includes(".")) {
    return {
      error: "Invalid .universallinks.link subdomain format.",
      code: "unprocessable_entity",
    };
  }

  if (label.length < 4) {
    return {
      error: "Subdomain must be at least 4 characters.",
      code: "unprocessable_entity",
    };
  }

  if (!validSlugRegex.test(label)) {
    return {
      error: "Invalid subdomain format.",
      code: "unprocessable_entity",
    };
  }

  if (
    RESERVED_SLUGS.includes(label) ||
    DEFAULT_REDIRECTS[label as keyof typeof DEFAULT_REDIRECTS]
  ) {
    return {
      error: "This subdomain is reserved.",
      code: "unprocessable_entity",
    };
  }

  return null;
}

export function validateDubLinkSubdomain(
  slug: string,
): { error: string; code: ApiErrorCode } | null {
  const lower = slug.trim().toLowerCase();

  if (!lower.endsWith(UNIVERSALLINKS_LINK_SUFFIX)) {
    return null;
  }

  return validateDubLinkLabel(lower.slice(0, -UNIVERSALLINKS_LINK_SUFFIX.length));
}
