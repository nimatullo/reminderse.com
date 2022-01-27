import { Head } from "next/document";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Tabs from "../components/Tabs";

export default function Settings() {
  return (
    <>
      <Head>
        <meta name="theme-color" content="#50287d" />
        <title>Settings</title>
      </Head>
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
