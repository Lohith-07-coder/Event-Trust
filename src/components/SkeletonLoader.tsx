interface SkeletonProps {
  width?: string;
  height?: string;
  rounded?: string;
  className?: string;
}

export function Skeleton({ width = "100%", height = "16px", rounded = "8px", className = "" }: SkeletonProps) {
  return (
    <div className={`skeleton ${className}`} style={{ width, height, borderRadius: rounded }} />
  );
}

export function SkeletonCard() {
  return (
    <div className="glass rounded-3xl p-6 border border-white/9 space-y-4">
      <Skeleton height="180px" rounded="16px" />
      <Skeleton height="20px" width="70%" />
      <Skeleton height="14px" width="50%" />
      <div className="flex gap-3">
        <Skeleton height="14px" width="30%" />
        <Skeleton height="14px" width="25%" />
      </div>
    </div>
  );
}

export function SkeletonDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="glass rounded-2xl p-5 border border-white/9 space-y-3">
            <Skeleton height="24px" width="40px" />
            <Skeleton height="32px" width="60%" />
            <Skeleton height="12px" width="80%" />
          </div>
        ))}
      </div>
      {/* Table rows */}
      <div className="glass rounded-2xl border border-white/9 overflow-hidden">
        <div className="px-6 py-4 border-b border-white/7">
          <Skeleton height="20px" width="140px" />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="px-6 py-4 flex items-center gap-4 border-b border-white/5">
            <Skeleton height="36px" width="36px" rounded="12px" className="shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton height="14px" width="60%" />
              <Skeleton height="11px" width="40%" />
            </div>
            <Skeleton height="22px" width="80px" rounded="999px" />
            <Skeleton height="14px" width="60px" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonVenueGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
