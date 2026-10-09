

export default function FormField({ label, error, className = "", children }) {
    return (
        <label className={`block ${className}`}>
            {label && (
                <span className="mb-1 block text-xs font-medium text-gray-600">{label}</span>
            )}
            {children}
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </label>
    );
}