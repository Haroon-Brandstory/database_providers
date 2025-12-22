"use client";
import PricingBanner from "@/components/pricingPlans/pricingBanner";
import { useState } from "react";

export default function PricingPlans() {
    const [plan,setPlan] = useState("bulk");
    return (
        <PricingBanner onChange={setPlan} />
    );
}