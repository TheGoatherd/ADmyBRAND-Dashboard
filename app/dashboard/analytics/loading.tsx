export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-muted rounded animate-pulse" />
          <div className="h-4 w-32 bg-muted rounded animate-pulse" />
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-3 p-6 border rounded-lg animate-pulse">
            <div className="h-4 w-24 bg-muted rounded" />
            <div className="h-6 w-16 bg-muted rounded" />
            <div className="h-3 w-20 bg-muted rounded" />
          </div>
        ))}
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="space-y-4 p-6 border rounded-lg animate-pulse">
            <div className="h-6 w-32 bg-muted rounded" />
            <div className="h-80 bg-muted rounded" />
          </div>
        ))}
      </div>
    </div>
  )
} 