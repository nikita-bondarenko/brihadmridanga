export function stack(...args: (string | boolean | null | undefined)[]) {
    return args.filter(item => typeof item === 'string').join(' ')
}
