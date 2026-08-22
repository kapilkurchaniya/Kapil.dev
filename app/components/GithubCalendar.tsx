"use client";

import { useEffect, useState } from "react";

type Day = {
  contributionCount: number;
  date: string;
  color: string;
};

type Week = {
  contributionDays: Day[];
};

export default function GithubCalendar() {
  const [weeks, setWeeks] = useState<Week[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const res = await fetch("/api/github");
        const data = await res.json();
        
        if (data?.data?.user?.contributionsCollection) {
          const calendar = data.data.user.contributionsCollection.contributionCalendar;
          setWeeks(calendar.weeks);
          setTotal(calendar.totalContributions);
        }
      } catch (err) {
        console.error("Failed to fetch github contributions", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-48 flex flex-col items-center justify-center border border-white/5 bg-white/5 rounded-2xl gap-4">
        <div className="animate-pulse flex space-x-2">
          <div className="rounded-full bg-cyan-400/50 h-3 w-3"></div>
          <div className="rounded-full bg-cyan-400/50 h-3 w-3 delay-75"></div>
          <div className="rounded-full bg-cyan-400/50 h-3 w-3 delay-150"></div>
        </div>
        <p className="text-xs text-white/40 tracking-widest uppercase">Fetching Commits...</p>
      </div>
    );
  }

  const getColor = (count: number) => {
    if (count === 0) return "bg-white/5 border-white/5";
    if (count < 3) return "bg-cyan-900/60 border-cyan-800/50";
    if (count < 6) return "bg-cyan-600/70 border-cyan-500/50";
    if (count < 10) return "bg-cyan-400/80 border-cyan-300/50";
    return "bg-cyan-300 border-cyan-200 shadow-[0_0_8px_rgba(103,232,249,0.4)]";
  };

  return (
    <div className="w-full p-6 lg:p-8 border border-white/10 bg-white/5 backdrop-blur-md rounded-3xl flex flex-col gap-6 relative overflow-hidden group">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-2 relative z-10">
        <div>
          <h3 className="text-2xl font-medium text-white mb-1">GitHub Contributions</h3>
          <p className="text-sm text-white/50">Tracking my open source activity</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-cyan-300">{total}</span>
          <span className="text-xs uppercase tracking-widest text-white/50">Total<br/>Commits</span>
        </div>
      </div>
      
      {/* Scrollable container for mobile */}
      <div className="w-full overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent relative z-10 cursor-grab active:cursor-grabbing mask-image-fade">
        <div className="flex gap-1.5 min-w-max">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1.5">
              {week.contributionDays.map((day, dayIndex) => (
                <div
                  key={day.date}
                  className={`w-3.5 h-3.5 rounded-[3px] border transition-all duration-300 hover:scale-[1.3] hover:z-10 ${getColor(day.contributionCount)}`}
                  title={`${day.contributionCount} contributions on ${day.date}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-end gap-2 text-xs text-white/40 relative z-10 mt-2">
        <span>Less</span>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-[2px] bg-white/5"></div>
          <div className="w-3 h-3 rounded-[2px] bg-cyan-900/60"></div>
          <div className="w-3 h-3 rounded-[2px] bg-cyan-600/70"></div>
          <div className="w-3 h-3 rounded-[2px] bg-cyan-400/80"></div>
          <div className="w-3 h-3 rounded-[2px] bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.4)]"></div>
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
