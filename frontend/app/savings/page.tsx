import { Metadata } from "next";
import GoalBasedSavingsPage from "./SavingsClient";

export const metadata: Metadata = {
  title: "Goal-Based Savings",
  description: "Create savings targets, track progress, and stay on course toward your personal financial goals with Nestera's decentralized platform.",
  alternates: {
    canonical: "/savings",
  },
  openGraph: {
    title: "Goal-Based Savings - Nestera",
    description: "Create savings targets, track progress, and stay on course toward your personal financial goals with Nestera's decentralized platform.",
    images: ["/api/og?page=savings"],
  },
};

export default function Page() {
  return <GoalBasedSavingsPage />;
}