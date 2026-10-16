/** Typography scale used across the application. */
export function TypographySample() {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <div className="text-xs uppercase tracking-wide text-muted-foreground">Display</div>
        <div className="text-4xl font-semibold tracking-tight">CommerceFlow</div>
      </div>
      <div className="space-y-1">
        <div className="text-xs uppercase tracking-wide text-muted-foreground">Heading</div>
        <div className="text-2xl font-semibold tracking-tight">Inventory overview</div>
      </div>
      <div className="space-y-1">
        <div className="text-xs uppercase tracking-wide text-muted-foreground">Body</div>
        <p className="max-w-2xl text-base text-muted-foreground">
          The quick brown fox jumps over the lazy dog. Body copy stays readable at
          comfortable line lengths for both Latin and Arabic scripts.
        </p>
      </div>
      <div className="space-y-1">
        <div className="text-xs uppercase tracking-wide text-muted-foreground">Caption</div>
        <p className="text-sm text-muted-foreground">Updated just now</p>
      </div>
    </div>
  );
}
