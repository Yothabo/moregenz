type SkeletonProps = {
  className?: string;
};

export default function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-[#e5e5e5] ${className}`}
      style={{ WebkitTapHighlightColor: 'transparent' }}
    />
  );
}
