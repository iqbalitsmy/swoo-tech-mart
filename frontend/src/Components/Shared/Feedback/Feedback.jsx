import { AlertCircle, Loader2 } from "lucide-react";
import React from "react";

const Feedback = ({ loading, error, empty, children }) => {
  if (loading) {
    return (
      <div className="flex justify-center py-16 text-sm text-gray-400">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex gap-2 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-600">
        <AlertCircle className="h-4 w-4 shrink-0" />
        {error?.response?.data?.message ||
          "Something went wrong. Please try again."}
      </div>
    );
  }

  if (empty) {
    return (
      <div className="rounded-md border border-dashed border-gray-200 py-12 text-center text-sm text-gray-400">
        Nothing to show yet.
      </div>
    );
  }

  return children;
};

export default Feedback;
