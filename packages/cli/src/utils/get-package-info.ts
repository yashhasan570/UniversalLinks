import packageJson from "package-json";
import type { PackageJson } from "type-fest";

export async function getPackageInfo() {
  const packageInfo = await packageJson("universallinks-cli");
  return packageInfo as PackageJson;
}
