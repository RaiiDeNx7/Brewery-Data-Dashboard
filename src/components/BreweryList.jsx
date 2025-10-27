import React from "react";
import BreweryRow from "./BreweryRow";

export default function BreweryList({ items = [] }) {
  if (!items.length) return <div className="info">No breweries match your search / filter.</div>;

  // ensure at least 10 rows visible? The API returns many; we'll just display all filtered items.
  return (
    <table className="breweries">
      <thead>
        <tr>
          <th>Name</th>
          <th>City, State</th>
          <th>Type</th>
          <th>Website / Phone</th>
        </tr>
      </thead>
      <tbody>
        {items.map((b) => (
          <BreweryRow key={`${b.id || b.name}-${b.latitude}-${b.longitude}`} brewery={b} />
        ))}
      </tbody>
    </table>
  );
}
