interface ReturnToTopOptions {
    arrowColour?: string
    placement?: string
    color?: string
    shape?: string
}

type ReturnToTopFunction = (
    options?: ReturnToTopOptions,
) => void

type ReturnToTop = ReturnToTopFunction & {
    default: YouTubePlayerFunction
    ReturnToTop: ClassDecorator
}

declare const ReturnToTop: ReturnToTop
declare module 'return-to-top' {
    export = ReturnToTop
}
