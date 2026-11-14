import { DomainProps } from "@/lib/types";
import { useRouterStuff } from "@universallinks/ui";
import {
  UNIVERSALLINKS_DOMAINS,
  UNIVERSALLINKS_WORKSPACE_ID,
  SHORT_DOMAIN,
  fetcher,
} from "@universallinks/utils";
import { useMemo } from "react";
import useSWR from "swr";
import { prefixWorkspaceId } from "../api/workspaces/workspace-id";
import useDefaultDomains from "./use-default-domains";
import useWorkspace from "./use-workspace";

export default function useDomains({
  ignoreParams,
  opts,
}: {
  ignoreParams?: boolean;
  opts?: Record<string, string>;
} = {}) {
  const { id: workspaceId } = useWorkspace();
  const { getQueryString } = useRouterStuff();

  const { data, error, mutate } = useSWR<
    (DomainProps & { linkRetentionDays?: number })[]
  >(
    workspaceId &&
      `/api/domains${
        ignoreParams
          ? "?" +
            new URLSearchParams({
              ...opts,
              workspaceId,
            }).toString()
          : getQueryString({
              ...opts,
              workspaceId,
            })
      }`,
    fetcher,
    {
      dedupingInterval: 60000,
    },
  );
  const {
    defaultDomains: workspaceDefaultDomains,
    loading: loadingDefaultDomains,
  } = useDefaultDomains(opts);

  const allWorkspaceDomains = useMemo(() => data || [], [data]);
  const activeWorkspaceDomains = useMemo(
    () => data?.filter((domain) => !domain.archived),
    [data],
  );

  const activeDefaultDomains = useMemo(
    () =>
      (workspaceDefaultDomains &&
        UNIVERSALLINKS_DOMAINS.filter((d) => workspaceDefaultDomains?.includes(d.slug))) ||
      UNIVERSALLINKS_DOMAINS,
    [workspaceDefaultDomains],
  );

  const allDomains = useMemo(
    () => [
      ...allWorkspaceDomains,
      ...(workspaceId === prefixWorkspaceId(UNIVERSALLINKS_WORKSPACE_ID)
        ? []
        : UNIVERSALLINKS_DOMAINS),
    ],
    [allWorkspaceDomains, workspaceId],
  );
  const allActiveDomains = useMemo(
    () => [
      ...(activeWorkspaceDomains || []),
      ...(workspaceId === prefixWorkspaceId(UNIVERSALLINKS_WORKSPACE_ID)
        ? []
        : activeDefaultDomains),
    ],
    [activeWorkspaceDomains, activeDefaultDomains, workspaceId],
  );

  const primaryDomain = useMemo(() => {
    if (activeWorkspaceDomains && activeWorkspaceDomains.length > 0) {
      return (
        activeWorkspaceDomains.find(({ primary }) => primary)?.slug ||
        activeWorkspaceDomains[0].slug
      );
    }
    return SHORT_DOMAIN;
  }, [activeDefaultDomains, activeWorkspaceDomains]);

  return {
    activeWorkspaceDomains, // active workspace domains
    activeDefaultDomains, // active default Universal Links domains
    allWorkspaceDomains, // all workspace domains (active + archived)
    allActiveDomains, // all active domains (active workspace domains + active default Universal Links domains)
    allDomains, // all domains (all workspace domains + all default Universal Links domains)
    primaryDomain,
    loading: (!data && !error) || loadingDefaultDomains,
    mutate,
    error,
  };
}
