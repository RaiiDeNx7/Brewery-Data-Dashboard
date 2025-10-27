import React, { useEffect, useState, useMemo } from "react";
import SearchBar from "./components/SearchBar";
import FilterByType from "./components/FilterByType";
import SummaryStats from "./components/SummaryStats";
import BreweryList from "./components/BreweryList";

/*
  App Responsibilities:
  - fetch data via useEffect + async/await
  - hold search / filter state
  - compute derived stats
*/

export default function App() {
  const [breweries, setBreweries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  useEffect(() => {
    let cancelled = false;
    async function fetchBreweries() {
      setLoading(true);
      setError(null);
      try {
        // Using the user's URL
        const res = await fetch("https://api.openbrewerydb.org/v1/breweries");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          setBreweries(data);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchBreweries();
    return () => (cancelled = true);
  }, []);

  // Derive the available types for the filter
  const breweryTypes = useMemo(() => {
    const set = new Set(breweries.map((b) => b.brewery_type).filter(Boolean));
    return ["all", ...Array.from(set).sort()];
  }, [breweries]);

  // Filter + search applied to list
  const filtered = useMemo(() => {
    return breweries
      .filter((b) => {
        if (typeFilter === "all") return true;
        return b.brewery_type === typeFilter;
      })
      .filter((b) => {
        if (!query.trim()) return true;
        return b.name.toLowerCase().includes(query.toLowerCase());
      });
  }, [breweries, query, typeFilter]);

  return (
    <div className="container">
      <header>
        <h1>Open Brewery Dashboard</h1>
      </header>

      <section className="controls">
        <SearchBar value={query} onChange={setQuery} placeholder="Search by brewery name..." />
        <FilterByType types={breweryTypes} value={typeFilter} onChange={setTypeFilter} />
      </section>

      <SummaryStats data={breweries} filtered={filtered} />

      <main>
        {loading && <div className="info">Loading breweries...</div>}
        {error && <div className="error">Error: {error}</div>}
        {!loading && !error && <BreweryList items={filtered} />}
      </main>

      <footer>
        <small>Data from Open Brewery DB — https://api.openbrewerydb.org/v1/breweries</small>
      </footer>
    </div>
  );
}
