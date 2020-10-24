import React from "react";

export default function Button({ label }) {
  return (
    <div data-testid="button" className="button-style">
      {label}
    </div>
  );
}
