import React from "react";

export default function BreweryRow({ brewery }) {
  const { name, city, state, brewery_type, website_url, phone } = brewery;

  return (
    <tr className="brewery-row">
      <td className="name">
        <strong>{name}</strong>
        <div className="small">{brewery.street}</div>
      </td>
      <td>
        {city || "—"}, {state || "—"}
      </td>
      <td>{brewery_type || "—"}</td>
      <td>
        {website_url ? (
          <a href={website_url} target="_blank" rel="noreferrer">
            website
          </a>
        ) : (
          "—"
        )}{" "}
        {phone && <span className="small"> • {phone}</span>}
      </td>
    </tr>
  );
}
