import { AuthLayout } from "@/ui/layout/auth-layout";
import { APP_DOMAIN, constructMetadata } from "@universallinks/utils";
import RegisterPageClient from "./page-client";

export const metadata = constructMetadata({
  title: "Create your Universal Links account",
  canonicalUrl: `${APP_DOMAIN}/register`,
});

export default function RegisterPage() {
  return (
    <AuthLayout showTerms="app">
      <RegisterPageClient />
    </AuthLayout>
  );
}
