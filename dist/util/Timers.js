import { isUndefined } from "@mjt-engine/object";
let depth = 0;
const STYLE = "background: #222; color: #bada55";
export const enabled = false;
export const stopwatch = (label) => {
    const padding = "".padStart(depth * 2);
    depth += 1;
    label = padding + label;
    if (enabled) {
        console.log(`%c${label} start`, STYLE);
    }
    const start = Date.now();
    return (checkpoint) => {
        const time = Date.now() - start;
        const labelCheckpoint = [label, checkpoint ?? ""].join(" ");
        if (enabled) {
            console.log(`%c${labelCheckpoint} ${(time / 1000).toFixed(2)}`, STYLE);
            if (isUndefined(checkpoint)) {
                depth -= 1;
            }
        }
    };
};
// export function time<T>(expr: () => T, label: string): T;
// export async function time<T>(
//   expr: () => Promise<T>,
//   label: string
// ): Promise<T>;
export function time(expr, label = expr.name) {
    const sw = stopwatch(label);
    const result = expr();
    sw();
    return result;
}
export async function timeP(expr, label = expr.name) {
    const sw = stopwatch(label);
    const result = await expr();
    sw();
    return result;
}
export const Timers = {
    time,
    timeP,
};
//# sourceMappingURL=Timers.js.map