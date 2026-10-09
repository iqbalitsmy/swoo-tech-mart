

export default function CheckboxPillGroup({
  options,
  selectedIds,
  onToggle,
  empty,
}) {
  // One handler for every pill: the clicked button carries its value.
  // button.value is always a string, so we look up the original option
  // to pass the real value (e.g. a number id) to onToggle.
  const handleClick = (e) => {
    const clicked = e.currentTarget.value;
    const option = options.find((item) => String(item.value) === clicked);
    if (option) onToggle(option.value);
  };

  if (!options?.length) {
    return (
      <p className="text-sm text-gray-400">{empty ?? "Nothing to select."}</p>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        // Highlight the pill if its value is in the selected list
        const active = selectedIds.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            value={option.value}
            onClick={handleClick}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
              active
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
