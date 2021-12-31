import { useState } from "react";
import AddLink from "../components/AddLink";
import AddText from "../components/AddText";
import Navbar from "../components/Navbar";

export default function AddPage() {
  const [isText, setIsText] = useState(false);

  return (
    <>
      <Navbar />
      <div className="min-h-full flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="p-4 max-w-lg w-full space-y-5">
          <div className="tabs justify-center">
            <div
              className={`${isText ? "" : "tab-active"} tab tab-bordered`}
              onClick={() => setIsText(false)}
            >
              Add Link
            </div>
            <div
              className={`${isText ? "tab-active" : ""} tab tab-bordered`}
              onClick={() => setIsText(true)}
            >
              Add Text
            </div>
          </div>
          {isText ? <AddText /> : <AddLink />}
        </div>
      </div>
    </>
  );
}
