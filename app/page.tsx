import type { Metadata } from "next";
import { Presentation } from "./presentation";

export const metadata: Metadata = {
  title: "Designing the AI-Native Organisation | Cha Lee",
  description:
    "A keynote-style interview presentation for Macquarie Bank on how AI changes people, ways of working, tools, and operating models.",
};

export default function Home() {
  return <Presentation />;
}
