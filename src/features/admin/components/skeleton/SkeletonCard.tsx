// Compatibility shim — the skeleton chrome now lives in SkeletonBlock.tsx
// as named exports `Block` and `Card`. This file preserves the old default
// export so any stale import of SkeletonCard still compiles.
export { Card as default } from './SkeletonBlock';
