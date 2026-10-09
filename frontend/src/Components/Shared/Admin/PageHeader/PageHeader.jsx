import React from "react";

const PageHeader = ({ title, description, action }) => {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>

        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>

      {action}
    </div>
  );
};

export default PageHeader;
