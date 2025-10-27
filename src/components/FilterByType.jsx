import React from "react";

export default function FilterByType({ types = [], value, onChange }) {
  return (
    <select className="select" value={value} onChange={(e) => onChange(e.target.value)} aria-label="Filter by type">
      {types.map((t) => (
        <option key={t} value={t}>
          {t === "all" ? "All types" : t}
        </option>
      ))}
    </select>
  );
}
