import Navbar from "../components/Navbar";

export default function Terms() {
  return (
    <>
      <Navbar />
      <div className="p-10">
        <h1 className="text-2xl font-bold">Privacy Policy for Reminderse</h1>
				<div className="divider"></div>
        <p>
          At Reminderse, accessible from{" "}
          <a href="https://reminderse.com" className="underline">
            https://reminderse.com
          </a>
          , one of our main priorities is the privacy of our visitors. This
          Privacy Policy document contains types of information that is
          collected and recorded by Reminderse and how we use it.
        </p>
        <p>
          If you have additional questions or require more information about our
          Privacy Policy, do not hesitate to contact us. Our Privacy Policy was
          created with the help of the{" "}
          <a className="underline" href="https://www.generateprivacypolicy.com">
            Privacy Policy Generator
          </a>
          .
        </p>
        <h2 className="text-xl font-bold">Log Files</h2>
        <p>
          Reminderse follows a standard procedure of using log files. These
          files log visitors when they visit websites. All hosting companies do
          this and a part of hosting services' analytics. The information
          collected by log files include internet protocol (IP) addresses,
          browser type, Internet Service Provider (ISP), date and time stamp,
          referring/exit pages, and possibly the number of clicks. These are not
          linked to any information that is personally identifiable. The purpose
          of the information is for analyzing trends, administering the site,
          tracking users' movement on the website, and gathering demographic
          information.
        </p>

        <h2 className="text-xl font-bold">Cookies and Web Beacons</h2>

        <p>
          Reminderse uses cookies to store user information. All cookies are
          cookies and are automatically deleted from your computer when you log
          out of Reminderse. Reminderse does not store any other cookies on your computer
          or devices that are used to identify you in any way.
        </p>

        <h2 className="text-xl font-bold">Privacy Policies</h2>

        <p>
          Reminderse does not use any third party ad services to collect
          information about you.
        </p>

        <h2 className="text-xl font-bold">Children's Information</h2>

        <p>
          Another part of our priority is adding protection for children while
          using the internet. We encourage parents and guardians to observe,
          participate in, and/or monitor and guide their online activity.
        </p>

        <p>
          Reminderse does not knowingly collect any Personal Identifiable
          Information from children under the age of 13. If you think that your
          child provided this kind of information on our website, we strongly
          encourage you to contact us immediately and we will do our best
          efforts to promptly remove such information from our records.
        </p>

        <h2 className="text-xl font-bold">Online Privacy Policy Only</h2>

        <p>
          This Privacy Policy applies only to our online activities and is valid
          for visitors to our website with regards to the information that they
          shared and/or collect in Reminderse. This policy is not applicable to
          any information collected offline or via channels other than this
          website.
        </p>

        <h2 className="text-xl font-bold">Consent</h2>

        <p>
          By using our website, you hereby consent to our Privacy Policy and
          agree to its Terms and Conditions.
        </p>
      </div>
    </>
  );
}
