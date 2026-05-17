export function DysonLogo({ size = 24, className = '' }) {
  return (
    <svg
      className={`icon icon--logo ${className}`}
      role="img"
      aria-label="Dyson"
      width={size * 3}
      height={size}
      viewBox="0 0 72 24"
    >
      <title>Dyson</title>
      <use href="https://www.dyson.in/static/version1778076294/frontend/Dyson/commerce/en_US/images/icons/icons.sprite.svg#logo" />
    </svg>
  )
}
