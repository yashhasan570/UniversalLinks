import { PlanProps } from "@/lib/types";
import { Badge } from "@universallinks/ui";
import { capitalize } from "@universallinks/utils";

export default function PlanBadge({ plan }: { plan: PlanProps }) {
  return (
    <Badge
      variant={
        plan === "enterprise"
          ? "violetGradient"
          : plan === "advanced"
            ? "amberGradient"
            : plan.startsWith("business")
              ? "blueGradient"
              : plan === "pro"
                ? "blueGradient"
                : "neutralGradient"
      }
    >
      {capitalize(plan)}
    </Badge>
  );
}
