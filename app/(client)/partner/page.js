"use client";

import React from "react";
import { PartnerHero } from "@/components/site/partner/PartnerHero";
import { PartnerBenefits } from "@/components/site/partner/PartnerBenefits";
import { PartnerStats } from "@/components/site/partner/PartnerStats";
import { PartnerTestimonials } from "@/components/site/partner/PartnerTestimonials";
import { PartnerCTA } from "@/components/site/partner/PartnerCTA";

export default function PartnerPage() {
    return (
        <>
            <PartnerHero />
            <PartnerStats />
            <PartnerBenefits />
            <PartnerTestimonials />
            <PartnerCTA />
        </>
    );
}
