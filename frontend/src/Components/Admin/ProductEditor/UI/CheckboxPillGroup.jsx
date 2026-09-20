

export default function CheckboxPillGroup({ options, selectedIds, onToggle, empty }) {
    if (!options?.length) {
        return <p className="text-sm text-gray-400">{empty ?? "Nothing to select."}</p>;
    }

    return (
        <div className="flex flex-wrap gap-2">
            {options.map((option) => {
                const active = selectedIds.includes(option.value);
                return (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => onToggle(option.value)}
                        className={`rounded-full border px-3 py-1 text-xs font-medium transition ${active
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                            }`}
                    >
                        {option.label}
                    </button>
                );
            })}
        </div>
    );
}