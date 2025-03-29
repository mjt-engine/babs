export declare const enabled = false;
export declare const stopwatch: (label: string) => (checkpoint?: string) => void;
export declare function time<T>(expr: () => T, label?: string): T;
export declare function timeP<T>(expr: () => Promise<T>, label?: string): Promise<T>;
export declare const Timers: {
    time: typeof time;
    timeP: typeof timeP;
};
