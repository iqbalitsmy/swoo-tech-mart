import React from "react";

const Pager = ({ page, totalPages, onChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-4 flex items-center justify-end gap-3 text-sm text-gray-500">
      <button
        className="rounded border px-3 py-1 disabled:opacity-40"
        disabled={!page}
        onClick={() => onChange(page - 1)}
      >
        Previous
      </button>

      <span>
        {page + 1} / {totalPages}
      </span>

      <button
        className="rounded border px-3 py-1 disabled:opacity-40"
        disabled={page >= totalPages - 1}
        onClick={() => onChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pager;
