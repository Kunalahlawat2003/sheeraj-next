import type { Metadata } from "next";
import { hospitalityPage } from "@/data/site";

import HospHero from "@/components/hospitality/HospHero";
import Vision from "@/components/hospitality/Vision";
import Masterplan from "@/components/hospitality/Masterplan";
import Architecture from "@/components/hospitality/Architecture";
import Sustainability from "@/components/hospitality/Sustainability";
import ResortBuild from "@/components/hospitality/ResortBuild";
import Expansion from "@/components/hospitality/Expansion";
import Community from "@/components/hospitality/Community";
import Investment from "@/components/hospitality/Investment";

export const metadata: Metadata = {
  title: "Hospitality — Building Luxury Amid Paradise",
  description: hospitalityPage.vision.body,
};

export default function HospitalityPage() {
  return (
    <>
      <HospHero />
      <Vision />
      <Masterplan />
      <Architecture />
      <Sustainability />
      <ResortBuild />
      <Expansion />
      <Community />
      <Investment />
    </>
  );
}
