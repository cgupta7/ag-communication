import { useId } from 'react'

/**
 * AG Communication brand monogram icon.
 * size prop controls height; width scales to maintain 60:48 aspect ratio.
 */
export function AGLogo({ size = 48, className = '' }) {
  const uid = useId()
  const gradId = `ag-grad-${uid.replace(/:/g, '')}`
  const width = Math.round(size * (60 / 48))

  return (
    <svg
      viewBox="0 0 60 48"
      width={width}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="AG Communication"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#fb923c" />
          <stop offset="50%"  stopColor="#f43f5e" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>

      {/* Badge background */}
      <rect width="60" height="48" rx="11" fill={`url(#${gradId})`} />
      {/* Glassy inner border */}
      <rect width="60" height="48" rx="11" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />

      {/* Letter A */}
      <path
        d="M 4,38 L 14,10 L 24,38"
        fill="none"
        stroke="white"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="9" y1="24" x2="19" y2="24"
        stroke="white" strokeWidth="4.5" strokeLinecap="round"
      />

      {/* Letter G — arc from upper-right opening, sweeping counterclockwise to shelf */}
      <path
        d="M 51,15 A 12,12 0 1,0 55,24 L 43,24"
        fill="none"
        stroke="white"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
