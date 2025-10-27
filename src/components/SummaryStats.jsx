import React, { useMemo } from "react";

/*
  Stats required (>=3):
  - total fetched (breweries.length)
  - number of unique cities
  - median brewery name length (as a statistic)
  - plus a small breakdown counts by brewery_type (optional visual)
*/

function median(numbers) {
  if (!numbers.length) return 0;
  const arr = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(arr.length / 2);
  if (arr.length % 2 === 1) return arr[mid];
  return (arr[mid - 1] + arr[mid]) / 2;
}

export default function SummaryStats({ data = [], filtered = [] }) {
  const stats = useMemo(() => {
    const totalFetched = data.length;
    const uniqueCities = new Set(data.map((d) => d.city).filter(Boolean)).size;
    const nameLengths = data.map((d) => (d.name ? d.name.length : 0));
    const medianNameLen = median(nameLengths);

    // breakdown counts by type (top types)
    const byType = data.reduce((acc, b) => {
      const t = b.brewery_type || "unknown";
      acc[t] = (acc[t] || 0) + 1;
      return acc;
    }, {});
    return { totalFetched, uniqueCities, medianNameLen, byType, totalDisplayed: filtered.length };
  }, [data, filtered]);

  // prepare a small list of top types
  const typeEntries = Object.entries(stats.byType).sort((a, b) => b[1] - a[1]).slice(0, 5);

  return (
    <section className="stats">
      <div className="stat">
        <div className="stat-title">Total fetched</div>
        <div className="stat-value">{stats.totalFetched}</div>
      </div>

      <div className="stat">
        <div className="stat-title">Unique cities</div>
        <div className="stat-value">{stats.uniqueCities}</div>
      </div>

      <div className="stat">
        <div className="stat-title">Median name length</div>
        <div className="stat-value">{stats.medianNameLen.toFixed(1)}</div>
      </div>

      <div className="stat stat-mini">
        <div className="stat-title">Displayed</div>
        <div className="stat-value">{stats.totalDisplayed}</div>
      </div>

      <div className="stat breakdown">
        <div className="stat-title">Top types</div>
        <ul>
          {typeEntries.map(([t, c]) => (
            <li key={t}>
              {t} — {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
