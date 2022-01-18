import Head from "next/head";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Card from "../components/homepage/Card";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="homepage-container">
        <div className="p-4 lg:p-10 homepage-main">
          <div className="flex justify-center align-items-center pt-5 z-10">
            <nav className="flex justify-between w-full max-w-screen-2xl">
              <div className="text-xl font-bold">Reminderse</div>
              <ul className="flex align-items-center">
                <li className="mx-5">
                  <a className="hover:underline" href="">
                    About
                  </a>
                </li>
                <li className="mx-5">
                  <a className="hover:underline" href="">
                    Contact
                  </a>
                </li>
                <li className="mx-5">
                  <Link href="/login">
                    <a className="hover:underline" href="">
                      Log In
                    </a>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="blob">
            <svg
              viewBox="0 0 500 500"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="100%"
              id="blobSvg"
            >
              <path
                id="blob"
                d="M339.5,276.5Q313,303,297.5,367Q282,431,209,439.5Q136,448,90.5,386.5Q45,325,47.5,251Q50,177,124,168Q198,159,236,137.5Q274,116,312,141Q350,166,358,208Q366,250,339.5,276.5Z"
              ></path>
            </svg>
          </div>
          <div className="blob2">
            <svg
              viewBox="0 0 500 500"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="100%"
              id="blobSvg"
            >
              <path
                id="blob"
                d="M398,302Q374,354,328,391.5Q282,429,233.5,396Q185,363,159,328Q133,293,74.5,229Q16,165,94,139.5Q172,114,230,73.5Q288,33,336.5,85Q385,137,403.5,193.5Q422,250,398,302Z"
              ></path>
            </svg>
          </div>
          <div className="blob3">
            <svg
              viewBox="0 0 500 500"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="100%"
              id="blobSvg"
            >
              <path
                id="blob"
                d="M399.5,282Q326,314,307.5,393Q289,472,209,466Q129,460,133.5,375.5Q138,291,157,257Q176,223,193.5,203Q211,183,247.5,119Q284,55,319,108.5Q354,162,413.5,206Q473,250,399.5,282Z"
              ></path>
            </svg>
          </div>
          <div className="main-text">
            <h1 className="text-7xl text-center font-bold">
              The best way to recall information.
            </h1>
            <p className="text-center text-xl max-w-2xl">
              Spaced repetition meets save-for-later. Make remembering
              effortless by leveraging our science-backed learning technique
              algorithm.
            </p>
          </div>
          <div className="flex items-center justify-center p-5">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              <Card
                title="Get reminded later"
                img="/mail.png"
                description="Receive reminders at set intervals"
                date="Paused"
              />
              <Card
                title="Reminderse"
                img="/reminderse.png"
                description="Never forget the things you already know"
                date="Next email goes out when you sign up"
              />
              <Card
                title="Make an entry"
                img="/plus.png"
                description="Save information you've consumed surfing the internet"
                date="Paused"
              />
            </div>
          </div>
          <div className="join">
            <h2 className="text-xl">Join now!</h2>
            <Link href="/register">
              <a className="btn btn-primary">Create a new account</a>
            </Link>
          </div>
        </div>
      </div>
      <footer className="p-4 footer bg-primary text-base-content footer-center lg:p-10">
        <div>
          <div className="grid grid-flow-col gap-4">
            <Link href="/login">
              <a className="hover:underline">Log In</a>
            </Link>
            <Link href="/register">
              <a className="hover:underline">Register</a>
            </Link>
            <Link href="/terms">
              <a className="hover:underline">Terms of Service</a>
            </Link>
            <a href="https://twitter.com/mmvvpp123" className="hover:underline">
              Twitter
            </a>
            <a
              href="mailto:sherzodnimatullo@gmail.com"
              className="hover:underline"
            >
              Email
            </a>
          </div>
        </div>
        <div>
          <Image src="/reminderse-white.svg" width={150} height={50} />
          <p>
            Made by{" "}
            <a href="https://nimatullo.com/" className="hover:underline">
              Sherzod Nimatullo
            </a>
          </p>
          <p className="font-bold text-center">© 2022 Reminderse, Inc.</p>
        </div>
      </footer>
    </>
  );
}
