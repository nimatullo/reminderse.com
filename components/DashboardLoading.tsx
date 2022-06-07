import * as React from "react";
import { SkeletonCard } from "./SkeletonCard";

const DashboardLoading = () => {
  return (
    <>
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <SkeletonCard key={i} />
        ))}
    </>
  );
};

export default DashboardLoading;
