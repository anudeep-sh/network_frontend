import React, { useRef, useState } from "react";
import SiteHeader from "../../Components/SiteHeader";
import HeroSection from "../../Components/HeroSection";
import SellMoreSection from "../../Components/SellMoreSection";
import StartEarning from "../../Components/StartEarning";
import BenefitSection from "../../Components/BenefitSection";
import CTASection from "../../Components/CTASection";
import Footer from "../../Components/Footer";

const LandingPage = () => {
  const sellMoreSectionRef = useRef(null);
  const footerRef = useRef(null);

  const [tabIndex, setTabIndex] = useState(0);
  const scrollToTab = (tabIndex) => {
    sellMoreSectionRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setTabIndex(tabIndex);
  };
  const scrollToFooter = () => {
    footerRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  return (
    <div>
      <SiteHeader scrollToTab={scrollToTab} scrollToFooter={scrollToFooter}/>
      <HeroSection />
      <SellMoreSection refs={sellMoreSectionRef} tabIndex={tabIndex} />
      <StartEarning />
      <BenefitSection />
      <CTASection />
      <Footer scrollToTab={scrollToTab} footerRef={footerRef}/>
    </div>
  );
};

export default LandingPage;
