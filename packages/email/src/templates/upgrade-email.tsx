import { capitalize } from "@universallinks/utils";
import { Body, Head, Html, Link, Preview, Text } from "@react-email/components";
import {
  bodyStyle,
  footerLinkStyle,
  footerStyle,
  linkStyle,
  pStyle,
} from "./trial/styles-constants";

export default function UpgradeEmail({
  name = "Brendon Urie",
  plan = "Business",
}: {
  name: string | null;
  email: string;
  plan: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>
        Feel free to reach out if you have any questions or feedback!
      </Preview>
      <Body style={bodyStyle}>
        <Text style={pStyle}>Hi {name ? name.split(" ")[0] : "there"},</Text>

        <Text style={pStyle}>
          My name is Steven, and I&apos;m the founder of Universal Links. I wanted to
          personally reach out to thank you for upgrading to{" "}
          <strong>Universal Links {capitalize(plan)}</strong>! Your support means the world
          to us and helps us continue to build and improve Universal Links.
        </Text>

        <Text style={pStyle}>
          If you have any questions or feedback about Universal Links, please don&apos;t
          hesitate to reach out (you can just reply to this email) – I&apos;m
          always happy to help!
        </Text>

        <Text style={{ ...pStyle, marginBottom: 0 }}>
          Best,
          <br />
          Steven – Founder,{" "}
          <Link href="https://universallinks.co" style={linkStyle}>
            Universal Links.co
          </Link>
        </Text>

        <Text style={footerStyle}>
          If you don't want to receive these emails, you can adjust your email
          preferences{" "}
          <Link
            href="https://app.universallinks.co/account/settings"
            style={footerLinkStyle}
          >
            here
          </Link>
        </Text>
      </Body>
    </Html>
  );
}
