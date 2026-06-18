import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import BuildSequence from "@/components/sections/BuildSequence";
import Projects from "@/components/sections/Projects";
import HospitalityPreview from "@/components/sections/HospitalityPreview";
import Partners from "@/components/sections/Partners";
import RentalForm from "@/components/sections/RentalForm";
import Careers from "@/components/sections/Careers";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <BuildSequence />
      <Projects />
      <HospitalityPreview />
      <Partners />
      <RentalForm />
      <Careers />
      <Contact />
    </>
  );
}
