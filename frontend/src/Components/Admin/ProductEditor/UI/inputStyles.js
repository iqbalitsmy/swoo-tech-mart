export const fieldClass = (error) =>
    `w-full rounded-md border px-3 py-2 text-sm text-gray-800 transition placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
        error
            ? "border-red-300 focus:border-red-400 focus:ring-red-100"
            : "border-gray-200 focus:border-primary focus:ring-primary/15"
    }`;

export const compactFieldClass = (error) =>
    `w-full rounded border px-2 py-1.5 text-xs text-gray-800 transition focus:outline-none focus:ring-2 ${
        error
            ? "border-red-300 focus:border-red-400 focus:ring-red-100"
            : "border-gray-200 focus:border-primary focus:ring-primary/15"
    }`;