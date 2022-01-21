import React from "react";

export function SkeletonCard() {
  return (
    <div className="main-card rounded-box shadow-sm">
      <div className="animate-pulse flex flex-col space-y-4 grid grid-rows-3">
				<div className="mx-auto imgArea row-span-2">
					<div className="rounded-full bg-secondary-content h-48 w-48"></div>
				</div>
        <div className="bg-primary-content cardInfo space-y-5">
          <div className="h-4 bg-secondary-content rounded"></div>
          <div className="h-3 bg-secondary-content rounded"></div>
          <div className="h-2 bg-secondary-content rounded"></div>
        </div>
      </div>
    </div>
  );
}
