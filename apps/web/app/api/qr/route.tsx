import { handleAndReturnErrorResponse } from "@/lib/api/errors";
import { ratelimitOrThrow } from "@/lib/api/utils";
import { getShortLinkViaEdge, getWorkspaceViaEdge } from "@/lib/planetscale";
import { getDomainViaEdge } from "@/lib/planetscale/get-domain-via-edge";
import { getQRAsSVG } from "@/lib/qr/api";
import { DEFAULT_BGCOLOR } from "@/lib/qr/constants";
import { QRCodeSVG } from "@/lib/qr/utils";
import { getQRCodeQuerySchema } from "@/lib/zod/schemas/qr";
import { UNIVERSALLINKS_QR_LOGO, getSearchParams, isDubDomain } from "@universallinks/utils";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

const CORS_HEADERS = new Headers({
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
});

export async function GET(req: NextRequest) {
  try {
    const paramsParsed = getQRCodeQuerySchema.parse(getSearchParams(req.url));

    await ratelimitOrThrow(req, "qr");

    const {
      logo,
      url,
      size,
      level,
      fgColor,
      bgColor,
      margin,
      hideLogo,
      format,
    } = paramsParsed;

    const qrCodeLogo = await getQRCodeLogo({ url, logo, hideLogo });

    const qrProps = {
      value: url,
      size,
      level,
      fgColor,
      margin,
      ...(qrCodeLogo
        ? {
            imageSettings: {
              src: qrCodeLogo,
              height: size / 4,
              width: size / 4,
              excavate: true,
            },
          }
        : {}),
    };

    if (format === "svg") {
      const svgString = await getQRAsSVG({
        ...qrProps,
        ...(bgColor ? { bgColor } : {}),
      });
      const headers = new Headers(CORS_HEADERS);
      headers.set("Content-Type", "image/svg+xml");
      headers.set("Content-Disposition", "inline; filename=qr.svg");
      return new Response(svgString, { headers });
    }

    return new ImageResponse(
      QRCodeSVG({
        ...qrProps,
        bgColor: bgColor ?? DEFAULT_BGCOLOR,
        isOGContext: true,
      }),
      {
        width: size,
        height: size,
        headers: CORS_HEADERS,
      },
    );
  } catch (error) {
    return handleAndReturnErrorResponse(error, CORS_HEADERS);
  }
}

const getQRCodeLogo = async ({
  url,
  logo,
  hideLogo,
}: {
  url: string;
  logo: string | undefined;
  hideLogo: boolean;
}) => {
  const shortLink = await getShortLinkViaEdge(url.split("?")[0]);

  // Not a Universal Links link
  if (!shortLink) {
    return UNIVERSALLINKS_QR_LOGO;
  }

  const workspace = await getWorkspaceViaEdge({
    workspaceId: shortLink.projectId,
  });

  if (workspace?.plan === "free") {
    return UNIVERSALLINKS_QR_LOGO;
  }

  // if hideLogo is set, return null
  if (hideLogo) {
    return null;
  }

  // if logo is passed, return it
  if (logo) {
    return logo;
  }

  // if it's a Universal Links owned domain and no  workspace logo is set, use the Universal Links logo
  if (isDubDomain(shortLink.domain) && !workspace?.logo) {
    return UNIVERSALLINKS_QR_LOGO;
  }

  // if it's a custom domain, check if it has a logo
  const domain = await getDomainViaEdge(shortLink.domain);

  // return domain logo if it has one, otherwise fallback to workspace logo, and finally fallback to Universal Links logo
  return domain?.logo || workspace?.logo || UNIVERSALLINKS_QR_LOGO;
};

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}
