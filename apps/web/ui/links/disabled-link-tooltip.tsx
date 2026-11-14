import { StatusBadge, Tooltip } from "@universallinks/ui";

export const DisabledLinkTooltip = () => {
  return (
    <Tooltip content="This link is disabled. It will redirect to its [domain's not found URL](https://universallinks.co/help/article/setting-not-found-url), and its stats will be excluded from [your overall stats](https://universallinks.co/help/article/universallinks-analytics).">
      <StatusBadge variant="neutral" size="sm" icon={null}>
        Disabled
      </StatusBadge>
    </Tooltip>
  );
};
