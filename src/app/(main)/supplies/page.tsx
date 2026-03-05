"use client";

import { SuppliesTimeline, AddSupplyModal } from "../../../features/supplies";

export default function SuppliesPage() {
    return (
        <div className="relative">
            <SuppliesTimeline />
            <AddSupplyModal />
        </div>
    );
}
