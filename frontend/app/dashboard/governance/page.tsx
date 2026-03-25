import React from "react";
import { ShieldCheck } from "lucide-react";
import PassedProposalCard, {
  type PassedProposal,
} from "@/app/components/dashboard/PassedProposalCard";

export const metadata = { title: "Governance – Nestera" };

export default function GovernancePage() {
  const passedProposals: PassedProposal[] = [
    {
      id: "p-001",
      title: "Reduce protocol fees for small deposits",
      category: "Parameters",
      passedOn: "Mar 18, 2026",
      forVotes: 1824,
      againstVotes: 312,
    },
    {
      id: "p-002",
      title: "Add USDT (testnet) as a supported stablecoin",
      category: "Assets",
      passedOn: "Feb 27, 2026",
      forVotes: 1490,
      againstVotes: 410,
    },
    {
      id: "p-003",
      title: "Increase timelock delay to 24 hours",
      category: "Security",
      passedOn: "Jan 30, 2026",
      forVotes: 2055,
      againstVotes: 155,
    },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-linear-to-b from-[#063d3d] to-[#0a6f6f] flex items-center justify-center text-[#5de0e0]">
          <ShieldCheck size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white m-0">Governance</h1>
          <p className="text-[#5e8c96] text-sm m-0">
            Vote on proposals and protocol decisions
          </p>
        </div>
      </div>

      <section className="bg-linear-to-b from-[rgba(6,18,20,0.45)] to-[rgba(4,12,14,0.35)] border border-[rgba(8,120,120,0.06)] rounded-2xl p-[18px] text-[#dff]">
        <div className="flex justify-between items-center mb-3">
          <h4 className="m-0 text-base font-semibold">Passed Proposals</h4>
          <a
            href="#"
            className="text-[#60f0ec] no-underline font-semibold hover:text-[#9ef0f0] transition-colors"
          >
            View all
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {passedProposals.map((proposal) => (
            <PassedProposalCard key={proposal.id} proposal={proposal} />
          ))}
        </div>
      </section>
    </div>
  );
}
