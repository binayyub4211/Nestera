import { Metadata } from "next";
import SupportPage from "./SupportClient";

export const metadata: Metadata = {
  title: "Help & Support",
  description: "Get help with Nestera. Browse FAQs, watch video tutorials, or contact our support team directly.",
  alternates: {
    canonical: "/support",
  },
  openGraph: {
    title: "Help & Support - Nestera",
    description: "Get help with Nestera. Browse FAQs, watch video tutorials, or contact our support team directly.",
    images: ["/api/og?page=support"],
  },
};

export default function Page() {
  return <SupportPage />;
}
