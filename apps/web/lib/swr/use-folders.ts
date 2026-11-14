import { Folder } from "@/lib/types";
import { useRouterStuff } from "@universallinks/ui";
import { fetcher } from "@universallinks/utils";
import useSWR, { SWRConfiguration } from "swr";
import useWorkspace from "./use-workspace";

export default function useFolders({
  includeParams = [],
  query,
  options,
}: {
  includeParams?: string[];
  query?: Record<string, any>;
  options?: SWRConfiguration;
} = {}) {
  const { id: workspaceId, plan } = useWorkspace();
  const { getQueryString } = useRouterStuff();

  const {
    data: folders,
    isValidating,
    isLoading,
  } = useSWR<Folder[]>(
    workspaceId
      ? `/api/folders${getQueryString(
          { workspaceId, ...query },
          { include: includeParams },
        )}`
      : null,
    fetcher,
    {
      dedupingInterval: 60000,
      ...options,
    },
  );

  return {
    folders,
    loading: isLoading,
    isValidating,
  };
}
