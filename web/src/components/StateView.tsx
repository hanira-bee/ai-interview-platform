import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface StateViewProps {
  loading: boolean;
  error?: string | null;
  empty?: boolean;
  onRetry: () => void;
  emptyContent?: ReactNode;
  loadingContent?: ReactNode;
  children: ReactNode;
}

export default function StateView({
  loading,
  error,
  empty = false,
  onRetry,
  emptyContent = <p className="text-sm text-muted-foreground">No data available.</p>,
  loadingContent,
  children,
}: StateViewProps) {
  if (loading) {
    return loadingContent ?? (
      <div className="space-y-2" aria-label="Loading">
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        role="alert"
        className="flex flex-wrap items-center justify-between gap-3 border border-destructive/40 rounded-lg p-4 text-sm text-destructive"
      >
        <p>{error}</p>
        <Button variant="outline" size="sm" onClick={onRetry}>
          Retry
        </Button>
      </div>
    );
  }

  if (empty) {
    return (
      <div className="border rounded-lg p-8 text-center">
        {emptyContent}
      </div>
    );
  }

  return <>{children}</>;
}
