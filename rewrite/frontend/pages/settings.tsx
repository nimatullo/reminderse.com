import { useState } from "react";
import Navbar from "../components/Navbar";
import Tabs from "../components/Tabs";

export default function Settings() {
  return (
    <>
      <Navbar />
      <div className="p-4 lg:p-10">
        <h1 className="my-4 text-4xl font-bold">Settings</h1>
        <div className="min-h-full max-w-lg">
          <Tabs/>
        </div>
      </div>
    </>
  );
}
