import { LogoProps } from './types'

export const Logo = ({ className }: LogoProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      width="240"
      height="240"
      role="img"
      aria-labelledby="title4"
      className={className}
    >
      <circle cx="60" cy="60" r="56" fill="#111827" />
      <g stroke="#fff" strokeOpacity="0.12" strokeWidth="2" fill="#fff">
        <circle cx="36" cy="40" r="6" fill="#60A5FA" />
        <circle cx="84" cy="40" r="6" fill="#34D399" />
        <circle cx="60" cy="78" r="6" fill="#F59E0B" />
        <circle cx="48" cy="64" r="4" fill="#A78BFA" />
        <circle cx="72" cy="64" r="4" fill="#FB7185" />
      </g>
      <g stroke="#ffffff" strokeOpacity="0.12" strokeWidth="2" strokeLinecap="round">
        <path d="M42 44 L56 70" />
        <path d="M78 44 L64 70" />
        <path d="M42 44 L78 44" />
      </g>
      <text
        x="60"
        y="58"
        textAnchor="middle"
        fill="#fff"
        fontSize="18"
        fontFamily="Arial, sans-serif"
        fontWeight="700"
      >
        M
      </text>
    </svg>
  )
}
