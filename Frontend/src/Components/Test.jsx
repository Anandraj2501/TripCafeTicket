import { useState } from "react";

export default function FlightSearchCard() {
    const [tab, setTab] = useState("flight");     // 'flight' | 'hotel' | 'insurance'
    const [isRoundTrip, setIsRoundTrip] = useState(true);

    const [origin, setOrigin] = useState("Delhi");
    const [destination, setDestination] = useState("Mumbai");
    const [depart, setDepart] = useState("2025-11-25");
    const [ret, setRet] = useState("2025-11-28");
    const [trav, setTrav] = useState("2 Adults");
    const [cls, setCls] = useState("Economy");

    const pillBtn = (name, label, icon) =>
        <button
            onClick={() => setTab(name)}
            className={[
                "rounded-full px-3 py-1.5 text-sm font-semibold transition",
                tab === name
                    ? "bg-orange-50 text-orange-700 ring-1 ring-orange-200"
                    : "text-gray-600 hover:bg-gray-100"
            ].join(" ")}
        >
            <span className="mr-1">{icon}</span>{label}
        </button>;

    return (
        <div className="bg-gray-100">
            {/* hero section just for context */}
            <div className="h-48 bg-[url('https://images.unsplash.com/photo-1544016860-6c59b35fb6f7?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center" />

            {/* search card */}
            <div className="relative z-10 mx-auto -mt-10 max-w-7xl px-1">
                <div className="relative rounded-2xl bg-white p-6 pt-14 shadow-2xl">

                    {/* icons pill sitting above the card */}
                    <div className="absolute -top-6 left-1/2 w-max -translate-x-1/2">
                        <div className="flex items-center gap-2 rounded-full bg-white px-2 py-1 shadow-lg">
                            {pillBtn("flight", "Flight", "✈️")}
                            {pillBtn("hotel", "Hotel", "🏨")}
                            {pillBtn("insurance", "Insurance", "🛡️")}
                        </div>
                    </div>

                    {/* trip type toggle */}
                    <div className="mb-4 flex items-center gap-5 text-sm">
                        <label className="inline-flex cursor-pointer items-center gap-2">
                            <input
                                type="radio"
                                className="accent-orange-600"
                                checked={!isRoundTrip}
                                onChange={() => setIsRoundTrip(false)}
                            />
                            <span>Oneway</span>
                        </label>
                        <label className="inline-flex cursor-pointer items-center gap-2">
                            <input
                                type="radio"
                                className="accent-orange-600"
                                checked={isRoundTrip}
                                onChange={() => setIsRoundTrip(true)}
                            />
                            <span>Round Trip</span>
                        </label>
                    </div>

                    {/* fields */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
                        {/* Origin */}
                        <div className="rounded-xl border border-gray-200 p-3">
                            <div className="text-xs text-gray-500">Origin</div>
                            <input
                                className="w-full bg-transparent text-xl font-semibold outline-none"
                                value={origin}
                                onChange={(e) => setOrigin(e.target.value)}
                                placeholder="City/Country Name"
                            />
                            <div className="text-xs text-gray-400">City/Country Name</div>
                        </div>

                        {/* Destination */}
                        <div className="rounded-xl border border-gray-200 p-3">
                            <div className="text-xs text-gray-500">Destination</div>
                            <input
                                className="w-full bg-transparent text-xl font-semibold outline-none"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                placeholder="City/Country Name"
                            />
                            <div className="text-xs text-gray-400">City/Country Name</div>
                        </div>

                        {/* Departure */}
                        <div className="rounded-xl border border-gray-200 p-3">
                            <div className="text-xs text-gray-500">Departure Date</div>
                            <input
                                type="date"
                                className="w-full bg-transparent text-lg font-semibold outline-none"
                                value={depart}
                                onChange={(e) => setDepart(e.target.value)}
                            />
                        </div>

                        {/* Return (hide if oneway) */}
                        {isRoundTrip ? (
                            <div className="rounded-xl border border-gray-200 p-3">
                                <div className="text-xs text-gray-500">Return Date</div>
                                <input
                                    type="date"
                                    className="w-full bg-transparent text-lg font-semibold outline-none"
                                    value={ret}
                                    onChange={(e) => setRet(e.target.value)}
                                />
                            </div>
                        ) : (
                            <div className="rounded-xl border border-dashed border-gray-200 p-3 text-gray-400">
                                <div className="text-xs">Return Date</div>
                                <div className="text-sm">—</div>
                            </div>
                        )}

                        {/* Travellers & Class */}
                        <div className="rounded-xl border border-gray-200 p-3">
                            <div className="text-xs text-gray-500">Traveler &amp; Class</div>
                            <div className="flex gap-2">
                                <select
                                    className="w-full rounded-lg border border-gray-200 bg-white px-2 py-2 text-sm outline-none"
                                    value={trav}
                                    onChange={(e) => setTrav(e.target.value)}
                                >
                                    <option>1 Adult</option>
                                    <option>2 Adults</option>
                                    <option>3 Adults</option>
                                </select>
                                <select
                                    className="w-full rounded-lg border border-gray-200 bg-white px-2 py-2 text-sm outline-none"
                                    value={cls}
                                    onChange={(e) => setCls(e.target.value)}
                                >
                                    <option>Economy</option>
                                    <option>Premium Economy</option>
                                    <option>Business</option>
                                    <option>First</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-4 flex justify-end">
                        <button
                            className="rounded-xl bg-orange-600 px-5 py-3 font-semibold text-white shadow hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-300"
                            onClick={() =>
                                console.log({ tab, isRoundTrip, origin, destination, depart, ret, trav, cls })
                            }
                        >
                            Search Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
