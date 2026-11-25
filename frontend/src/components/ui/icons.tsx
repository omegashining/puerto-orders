import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

function BaseIcon({ children, className = 'size-5', ...props }: IconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={className}
            {...props}
        >
            {children}
        </svg>
    )
}

export const SearchIcon = (props: IconProps) => (
    <BaseIcon {...props}>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
    </BaseIcon>
)

export const CloseIcon = (props: IconProps) => (
    <BaseIcon {...props}>
        <path d="M18 6 6 18M6 6l12 12" />
    </BaseIcon>
)

export const ChevronLeftIcon = (props: IconProps) => (
    <BaseIcon {...props}>
        <path d="m15 18-6-6 6-6" />
    </BaseIcon>
)

export const ChevronRightIcon = (props: IconProps) => (
    <BaseIcon {...props}>
        <path d="m9 18 6-6-6-6" />
    </BaseIcon>
)

export const BoxIcon = (props: IconProps) => (
    <BaseIcon {...props}>
        <path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" />
        <path d="m3 8 9 5 9-5M12 13v8" />
    </BaseIcon>
)

export const AlertIcon = (props: IconProps) => (
    <BaseIcon {...props}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4M12 16h.01" />
    </BaseIcon>
)
