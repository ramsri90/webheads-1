"use client";

import { GlowCard } from "@/components/ui/spotlight-card";
import { Sparkles, Code, Bot } from "lucide-react";

export function Default() {
  return (
    <div className="w-screen h-screen flex flex-row items-center justify-center gap-10 bg-black text-white p-8">
      <GlowCard glowColor="red" size="md">
        <div className="flex flex-col justify-between h-full p-2">
          <Sparkles className="h-8 w-8 text-rose-400" />
          <div>
            <h3 className="text-lg font-bold">Web Design</h3>
            <p className="text-xs text-white/70 mt-1">Next.js &amp; Tailwind CSS websites.</p>
          </div>
        </div>
      </GlowCard>

      <GlowCard glowColor="purple" size="md">
        <div className="flex flex-col justify-between h-full p-2">
          <Bot className="h-8 w-8 text-purple-400" />
          <div>
            <h3 className="text-lg font-bold">AI Automation</h3>
            <p className="text-xs text-white/70 mt-1">Autonomous 24/7 AI agents.</p>
          </div>
        </div>
      </GlowCard>

      <GlowCard glowColor="blue" size="md">
        <div className="flex flex-col justify-between h-full p-2">
          <Code className="h-8 w-8 text-blue-400" />
          <div>
            <h3 className="text-lg font-bold">Mobile Apps</h3>
            <p className="text-xs text-white/70 mt-1">iOS and Android apps.</p>
          </div>
        </div>
      </GlowCard>
    </div>
  );
}

export default Default;
