import { useMemo, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import type { Source } from "@/data/stories";

const US_STATES_URL = "/maps/us-states.json";
const WORLD_URL = "/maps/world-countries.json";
const TOTAL_LENS_SOURCES = 125;

// ISO alpha-2 state → FIPS code (used as `id` in us-atlas topojson)
const STATE_TO_FIPS: Record<string, string> = {
  AL: "01", AK: "02", AZ: "04", AR: "05", CA: "06", CO: "08", CT: "09",
  DE: "10", DC: "11", FL: "12", GA: "13", HI: "15", ID: "16", IL: "17",
  IN: "18", IA: "19", KS: "20", KY: "21", LA: "22", ME: "23", MD: "24",
  MA: "25", MI: "26", MN: "27", MS: "28", MO: "29", MT: "30", NE: "31",
  NV: "32", NH: "33", NJ: "34", NM: "35", NY: "36", NC: "37", ND: "38",
  OH: "39", OK: "40", OR: "41", PA: "42", RI: "44", SC: "45", SD: "46",
  TN: "47", TX: "48", UT: "49", VT: "50", VA: "51", WA: "53", WV: "54",
  WI: "55", WY: "56",
};
const FIPS_TO_STATE: Record<string, string> = Object.fromEntries(
  Object.entries(STATE_TO_FIPS).map(([s, f]) => [f, s]),
);

const STATE_NAMES: Record<string, string> = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
  CO: "Colorado", CT: "Connecticut", DE: "Delaware", DC: "Washington, D.C.",
  FL: "Florida", GA: "Georgia", HI: "Hawaii", ID: "Idaho", IL: "Illinois",
  IN: "Indiana", IA: "Iowa", KS: "Kansas", KY: "Kentucky", LA: "Louisiana",
  ME: "Maine", MD: "Maryland", MA: "Massachusetts", MI: "Michigan",
  MN: "Minnesota", MS: "Mississippi", MO: "Missouri", MT: "Montana",
  NE: "Nebraska", NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey",
  NM: "New Mexico", NY: "New York", NC: "North Carolina", ND: "North Dakota",
  OH: "Ohio", OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania",
  RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota", TN: "Tennessee",
  TX: "Texas", UT: "Utah", VT: "Vermont", VA: "Virginia", WA: "Washington",
  WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming",
};

// ISO alpha-2 country → ISO 3166-1 numeric (used as `id` in world-atlas topojson)
const COUNTRY_TO_NUMERIC: Record<string, string> = {
  US: "840", GB: "826", FR: "250", QA: "634", CZ: "203", CA: "124",
  DE: "276", IT: "380", ES: "724", JP: "392", CN: "156", IN: "356",
  RU: "643", BR: "076", AU: "036", MX: "484", KR: "410", IL: "376",
  AE: "784", SA: "682", TR: "792", EG: "818", ZA: "710", NG: "566",
  KE: "404", PL: "616", NL: "528", SE: "752", NO: "578", CH: "756",
};
const NUMERIC_TO_COUNTRY: Record<string, string> = Object.fromEntries(
  Object.entries(COUNTRY_TO_NUMERIC).map(([c, n]) => [n, c]),
);

const COUNTRY_NAMES: Record<string, string> = {
  US: "United States", GB: "United Kingdom", FR: "France", QA: "Qatar",
  CZ: "Czech Republic", CA: "Canada", DE: "Germany", IT: "Italy",
  ES: "Spain", JP: "Japan", CN: "China", IN: "India", RU: "Russia",
  BR: "Brazil", AU: "Australia", MX: "Mexico", KR: "South Korea",
  IL: "Israel", AE: "United Arab Emirates", SA: "Saudi Arabia",
  TR: "Turkey", EG: "Egypt", ZA: "South Africa", NG: "Nigeria",
  KE: "Kenya", PL: "Poland", NL: "Netherlands", SE: "Sweden",
  NO: "Norway", CH: "Switzerland",
};

const COVERED_FILL = "#1a1a2e";
const COVERED_HOVER = "#2d2d4a";
const UNCOVERED_FILL = "#e5e7eb";
const BORDER_COLOR = "#ffffff";

export default function CoverageMap({ sources }: { sources: Source[] }) {
  const { stateToSources, countryToSources, usMajority, total } = useMemo(() => {
    const stateMap = new Map<string, Source[]>();
    const countryMap = new Map<string, Source[]>();
    let usCount = 0;
    let nonUsCount = 0;

    for (const s of sources) {
      const { country, usState } = s.location;
      if (country === "US" && usState) {
        usCount++;
        const arr = stateMap.get(usState) ?? [];
        arr.push(s);
        stateMap.set(usState, arr);
      } else {
        nonUsCount++;
      }
      const carr = countryMap.get(country) ?? [];
      carr.push(s);
      countryMap.set(country, carr);
    }

    return {
      stateToSources: stateMap,
      countryToSources: countryMap,
      usMajority: usCount >= nonUsCount,
      total: sources.length,
    };
  }, [sources]);

  const [view, setView] = useState<"us" | "world">(usMajority ? "us" : "world");
  const [selected, setSelected] = useState<string | null>(null);

  if (total === 0) {
    return (
      <div className="mt-6 pt-3 border-t border-border/60">
        <h4 className="text-xs font-semibold text-navy/70 uppercase tracking-wider mb-2">
          Coverage Map
        </h4>
        <p className="text-sm text-text-muted italic">
          Coverage Map data unavailable for this story.
        </p>
      </div>
    );
  }

  let selectedSources: Source[] = [];
  let selectedLabel = "";
  if (selected) {
    if (view === "us") {
      const state = FIPS_TO_STATE[selected];
      if (state) {
        selectedSources = stateToSources.get(state) ?? [];
        selectedLabel = STATE_NAMES[state] ?? state;
      }
    } else {
      const country = NUMERIC_TO_COUNTRY[selected];
      if (country) {
        selectedSources = countryToSources.get(country) ?? [];
        selectedLabel = COUNTRY_NAMES[country] ?? country;
      }
    }
  }

  const coveredStates = Array.from(stateToSources.keys()).sort();

  const switchView = (next: "us" | "world") => {
    setView(next);
    setSelected(null);
  };

  return (
    <div className="mt-6 pt-3 border-t border-border/60">
      <h4 className="text-xs font-semibold text-navy/70 uppercase tracking-wider mb-2">
        Coverage Map
      </h4>
      <p className="text-xs text-text-muted mb-3 leading-relaxed">
        Shows where this story was reported. Not a measure of how important the story is.
      </p>

      {/* Toggle */}
      <div className="flex gap-1 mb-3 p-1 rounded-lg bg-warm-gray">
        <button
          onClick={() => switchView("us")}
          className={`flex-1 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
            view === "us" ? "bg-white text-navy shadow-sm" : "text-text-muted"
          }`}
        >
          U.S.
        </button>
        <button
          onClick={() => switchView("world")}
          className={`flex-1 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
            view === "world" ? "bg-white text-navy shadow-sm" : "text-text-muted"
          }`}
        >
          World
        </button>
      </div>

      {/* Map */}
      <div className="w-full rounded-lg bg-white border border-border overflow-hidden">
        {view === "us" ? (
          <ComposableMap
            projection="geoAlbersUsa"
            projectionConfig={{ scale: 550 }}
            width={400}
            height={250}
            style={{ width: "100%", height: "auto" }}
          >
            <Geographies geography={US_STATES_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const fips = String(geo.id);
                  const stateCode = FIPS_TO_STATE[fips];
                  const covered = stateCode ? stateToSources.has(stateCode) : false;
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => {
                        if (covered) {
                          setSelected((prev) => (prev === fips ? null : fips));
                        }
                      }}
                      style={{
                        default: {
                          fill: covered ? COVERED_FILL : UNCOVERED_FILL,
                          stroke: BORDER_COLOR,
                          strokeWidth: 0.5,
                          outline: "none",
                          cursor: covered ? "pointer" : "default",
                        },
                        hover: {
                          fill: covered ? COVERED_HOVER : UNCOVERED_FILL,
                          stroke: BORDER_COLOR,
                          strokeWidth: 0.5,
                          outline: "none",
                          cursor: covered ? "pointer" : "default",
                        },
                        pressed: {
                          fill: covered ? COVERED_FILL : UNCOVERED_FILL,
                          outline: "none",
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        ) : (
          <ComposableMap
            projection="geoEqualEarth"
            projectionConfig={{ scale: 90 }}
            width={400}
            height={200}
            style={{ width: "100%", height: "auto" }}
          >
            <Geographies geography={WORLD_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const numId = String(geo.id);
                  const countryCode = NUMERIC_TO_COUNTRY[numId];
                  const covered = countryCode
                    ? countryToSources.has(countryCode)
                    : false;
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => {
                        if (covered) {
                          setSelected((prev) => (prev === numId ? null : numId));
                        }
                      }}
                      style={{
                        default: {
                          fill: covered ? COVERED_FILL : UNCOVERED_FILL,
                          stroke: BORDER_COLOR,
                          strokeWidth: 0.3,
                          outline: "none",
                          cursor: covered ? "pointer" : "default",
                        },
                        hover: {
                          fill: covered ? COVERED_HOVER : UNCOVERED_FILL,
                          stroke: BORDER_COLOR,
                          strokeWidth: 0.3,
                          outline: "none",
                          cursor: covered ? "pointer" : "default",
                        },
                        pressed: {
                          fill: covered ? COVERED_FILL : UNCOVERED_FILL,
                          outline: "none",
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        )}
      </div>

      {/* Selection tooltip (below map, avoids screen-edge cutoff) */}
      {selected && selectedSources.length > 0 && (
        <div className="mt-2 p-3 rounded-lg bg-navy text-warm-white text-xs animate-[fadeIn_0.15s_ease-out]">
          <div className="font-semibold mb-1">{selectedLabel}</div>
          <div className="text-warm-white/80 leading-relaxed">
            {selectedSources.map((s) => s.name).join(", ")}
          </div>
        </div>
      )}

      {/* Summary */}
      <p className="mt-3 text-xs text-text-muted text-center">
        {total} of {TOTAL_LENS_SOURCES} Lens sources covered this story
      </p>

      {/* Mobile fallback text list for US view (small states have tap targets under 40px) */}
      {view === "us" && (
        <div className="mt-3 pt-3 border-t border-border/60">
          <p className="text-[11px] font-semibold text-navy/60 uppercase tracking-wider mb-1.5">
            States that covered this story
          </p>
          {coveredStates.length > 0 ? (
            <ul className="flex flex-col gap-1.5 mb-3">
              {coveredStates.map((s) => {
                const sourcesInState = stateToSources.get(s) ?? [];
                return (
                  <li key={s} className="text-xs text-text-secondary leading-snug">
                    <span className="font-medium text-navy">{STATE_NAMES[s] ?? s}</span>
                    <span className="text-text-muted"> — {sourcesInState.map((src) => src.name).join(", ")}</span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-xs text-text-muted mb-3">None</p>
          )}
          <p className="text-[11px] font-semibold text-navy/60 uppercase tracking-wider mb-1">
            States that did not
          </p>
          <p className="text-xs text-text-muted">
            All other U.S. states and territories.
          </p>
        </div>
      )}
    </div>
  );
}
