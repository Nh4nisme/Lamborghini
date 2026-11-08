import {type FormEvent, useState} from "react";
import { useQuery } from "@tanstack/react-query";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */
type TopicLink = { label: string; href: string };
type TopicGroup = { id: string; title: string; links: TopicLink[] };

/* -------------------------------------------------------------------------- */
/*  Mock API — thay bằng fetch/axios tới backend thật của bạn                  */
/* -------------------------------------------------------------------------- */
const TOPICS: TopicGroup[] = [
    {
        id: "models",
        title: "Models",
        links: [
            { label: "Temerario", href: "/models/temerario" },
            { label: "Revuelto", href: "/models/revuelto" },
            { label: "Urus SE", href: "/models/urus-se" },
            { label: "Urus S", href: "/models/urus-s" },
            { label: "Urus Performante", href: "/models/urus-performante" },
        ],
    },
    {
        id: "ownership",
        title: "Ownership",
        links: [
            { label: "Connectivity", href: "/ownership/connectivity" },
            { label: "Customer App", href: "/ownership/customer-app" },
            { label: "Mobility Program", href: "/ownership/mobility-program" },
            { label: "Service", href: "/ownership/service" },
            { label: "Recall Campaign", href: "/ownership/recall-campaign" },
        ],
    },
    {
        id: "custom",
        title: "Custom Solutions",
        links: [
            { label: "Customization", href: "/custom/customization" },
            { label: "Accessories", href: "/custom/accessories" },
            { label: "Financial Services", href: "/custom/financial-services" },
        ],
    },
];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function fetchTopics(): Promise<TopicGroup[]> {
    await sleep(400);
    return TOPICS;
}

async function searchSite(keyword: string): Promise<TopicLink[]> {
    await sleep(400);
    const q = keyword.trim().toLowerCase();
    return TOPICS.flatMap((g) => g.links).filter((l) =>
        l.label.toLowerCase().includes(q)
    );
}

/* -------------------------------------------------------------------------- */
/*  Hooks                                                                      */
/* -------------------------------------------------------------------------- */
const useTopics = () =>
    useQuery({ queryKey: ["topics"], queryFn: fetchTopics, staleTime: 5 * 60_000 });

const useSearch = (keyword: string) =>
    useQuery({
        queryKey: ["search", keyword],
        queryFn: () => searchSite(keyword),
        enabled: keyword.length > 0,
    });

/* -------------------------------------------------------------------------- */
/*  Icons                                                                      */
/* -------------------------------------------------------------------------- */
const SearchIcon = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
         strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
    </svg>
);

const ArrowRight = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
         strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
        <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
);

const ArrowUpRight = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
         strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
        <path d="M7 17 17 7M8 7h9v9" />
    </svg>
);

/* -------------------------------------------------------------------------- */
/*  Components                                                                 */
/* -------------------------------------------------------------------------- */
function SearchBox({ onSubmit }: { onSubmit: (keyword: string) => void }) {
    const [value, setValue] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(value.trim());
    };

    return (
        <form onSubmit={handleSubmit} role="search" className="mt-8">
            <label htmlFor="site-search" className="block text-[11px] text-lambo-secondary">
                Search on the website
            </label>

            <div className="mt-2 flex items-stretch gap-3">
                <div className="relative flex-1">
                    <input
                        id="site-search"
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Search by keyword"
                        className="h-10 w-full border border-lambo-pressed bg-lambo-tertiary px-4 pr-10 text-xs text-white
                       placeholder:text-[#8a8a8a] outline-none transition-colors
                       focus:border-lambo-primary focus:ring-1 focus:ring-lambo-primary"
                    />
                    <SearchIcon className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-lambo-primary" />
                </div>

                <button
                    type="submit"
                    className="flex h-10 w-40 shrink-0 items-center justify-center gap-3 bg-lambo-primary text-[11px]
                     font-semibold uppercase tracking-[0.15em] text-lambo-bold-black transition-colors duration-300
                     hover:bg-lambo-hover active:bg-lambo-pressed
                     focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lambo-hover"
                >
                    Search
                    <ArrowRight className="h-3.5 w-3.5" />
                </button>
            </div>

            <p className="mt-1.5 text-[10px] text-lambo-secondary/70">
                Enter a model, service or topic to begin
            </p>
        </form>
    );
}

function SearchResults({ keyword }: { keyword: string }) {
    const { data, isFetching, isError, refetch } = useSearch(keyword);

    if (!keyword) return null;

    return (
        <div className="mt-6 border border-lambo-tertiary bg-lambo-dark-light p-4" aria-live="polite">
            {isFetching && (
                <div className="flex items-center gap-3 text-xs text-lambo-secondary">
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-lambo-primary border-t-transparent" />
                    Searching “{keyword}”…
                </div>
            )}

            {isError && (
                <p className="text-xs text-red-400">
                    Something went wrong.{" "}
                    <button onClick={() => refetch()} className="underline hover:text-lambo-hover">
                        Try again
                    </button>
                </p>
            )}

            {!isFetching && data && data.length === 0 && (
                <p className="text-xs text-[#a3a3a3]">No results for “{keyword}”. Try a model or service name.</p>
            )}

            {!isFetching && data && data.length > 0 && (
                <ul className="divide-y divide-lambo-tertiary">
                    {data.map((r) => (
                        <li key={r.href}>
                            <a
                                href={r.href}
                                className="flex items-center justify-between py-2.5 text-xs font-medium uppercase tracking-wider
                           text-[#c4c4c4] transition-colors hover:text-lambo-primary"
                            >
                                {r.label}
                                <ArrowUpRight className="h-3.5 w-3.5" />
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

function TopicColumn({ group }: { group: TopicGroup }) {
    return (
        <section className="border-t border-lambo-pressed/70 pt-4">
            <h3 className="font-display text-xl font-semibold uppercase tracking-wide text-lambo-secondary">
                {group.title}
            </h3>
            <ul className="mt-5 space-y-0.5">
                {group.links.map((link) => (
                    <li key={link.href}>
                        <a
                            href={link.href}
                            className="group flex items-center justify-between px-4 py-2 text-[11px] font-medium uppercase
                         tracking-wider text-[#c4c4c4] transition-colors hover:text-lambo-primary
                         focus-visible:outline focus-visible:outline-1 focus-visible:outline-lambo-primary"
                        >
                            {link.label}
                            <ArrowUpRight className="h-3.5 w-3.5 text-[#c4c4c4] transition-colors group-hover:text-lambo-primary" />
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    );
}

function TopicsSkeleton() {
    return (
        <div className="mt-6 grid gap-x-8 gap-y-10 md:grid-cols-3" aria-busy="true">
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="border-t border-lambo-tertiary pt-4">
                    <div className="h-6 w-28 animate-pulse bg-lambo-tertiary" />
                    <div className="mt-5 space-y-3">
                        {Array.from({ length: 4 }).map((__, j) => (
                            <div key={j} className="h-3 animate-pulse bg-lambo-tertiary/70" />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */
export default function SearchPage() {
    const [keyword, setKeyword] = useState("");
    const { data: topics, isLoading, isError, refetch } = useTopics();

    return (
        <main className="min-h-screen bg-lambo-bold-black text-white">
            <div className="mx-auto max-w-[900px] px-6 py-14 md:py-16">
                {/* Hero */}
                <h1 className="font-display text-5xl font-bold uppercase leading-[1.05] text-lambo-secondary md:text-6xl">
                    What are you looking for?
                </h1>
                <p className="mt-4 text-xs text-lambo-secondary">
                    Explore models, ownership and the world of Lamborghini.
                </p>

                <SearchBox onSubmit={setKeyword} />
                <SearchResults keyword={keyword} />

                {/* Main topics */}
                <div className="mt-14 flex flex-wrap items-end justify-between gap-2">
                    <h2 className="font-display text-2xl font-semibold uppercase text-lambo-secondary">
                        Main topics
                    </h2>
                    <span className="text-[10px] text-[#a3a3a3]">Or go directly to what interests you</span>
                </div>

                {isLoading && <TopicsSkeleton />}

                {isError && (
                    <p className="mt-6 text-xs text-red-400">
                        Couldn’t load topics.{" "}
                        <button onClick={() => refetch()} className="underline hover:text-lambo-hover">
                            Retry
                        </button>
                    </p>
                )}

                {topics && (
                    <div className="mt-6 grid gap-x-8 gap-y-10 md:grid-cols-3">
                        {topics.map((g) => (
                            <TopicColumn key={g.id} group={g} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}