import { createDocument } from "zod-openapi";
import { webhookEventSchema } from "../webhook/schemas";
import { DomainSchema } from "../zod/schemas/domains";
import { FolderSchema } from "../zod/schemas/folders";
import { LinkErrorSchema, LinkSchema } from "../zod/schemas/links";
import { LinkTagSchema } from "../zod/schemas/tags";
import { analyticsPath } from "./analytics";
import { customersPaths } from "./customers";
import { domainsPaths } from "./domains";
import { eventsPath } from "./events";
import { foldersPaths } from "./folders";
import { linksPaths } from "./links";
import { qrCodePaths } from "./qr";
import { openApiErrorResponsesComponents } from "./responses";
import { tagsPaths } from "./tags";
import { trackPaths } from "./track";

export const document = createDocument({
  openapi: "3.0.3",
  info: {
    title: "Universal Links API",
    description:
      "Universal Links is the modern link attribution platform for short links and conversion tracking.",
    version: "0.0.1",
    contact: {
      name: "Universal Links Support",
      email: "support@universallinks.co",
      url: "https://universallinks.co/support",
    },
    license: {
      name: "AGPL-3.0 license",
      url: "https://github.com/yashhasan570/UniversalLinks/blob/main/LICENSE.md",
    },
  },
  servers: [
    {
      url: "https://api.universallinks.co",
      description: "Production API",
    },
  ],
  paths: {
    ...linksPaths,
    ...analyticsPath,
    ...eventsPath,
    ...tagsPaths,
    ...foldersPaths,
    ...domainsPaths,
    ...trackPaths,
    ...customersPaths,
    ...qrCodePaths,
  },
  components: {
    schemas: {
      LinkSchema,
      LinkTagSchema,
      FolderSchema,
      DomainSchema,
      webhookEventSchema,
      LinkErrorSchema,
    },
    securitySchemes: {
      token: {
        type: "http",
        description: "Default authentication mechanism",
        scheme: "bearer",
        "x-speakeasy-example": "UNIVERSALLINKS_API_KEY",
      },
    },
    responses: {
      ...openApiErrorResponsesComponents,
    },
  },
});
