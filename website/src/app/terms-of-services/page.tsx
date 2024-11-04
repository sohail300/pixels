// app/terms/page.tsx
import React from "react";

export default function page() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-8">
      <h1 className="text-4xl font-bold mt-16 mb-8">Terms of Service</h1>

      <div className="bg-gray-50 rounded-lg mb-8">
        <p className=" mb-4">Last updated: November 04, 2024</p>
        <p className=" mb-4">
          These Terms of Service govern your use of our Service and represent a
          legal agreement between you and us. Please read these terms carefully
          before using the Service.
        </p>
        <p className=" mb-4">
          By accessing or using the Service, you agree to be bound by these
          Terms. If you disagree with any part of the terms, then you may not
          access the Service. These Terms of Service have been created to
          protect both your rights and ours.
        </p>
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="text-3xl font-semibold mb-4">
            1. Acceptance of Terms
          </h2>
          <p className=" mb-3">
            By downloading, installing, or using [Your App Name] ("the App"),
            you agree to be bound by these Terms of Service. If you do not agree
            to these terms, please do not use the App.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">2. Image Usage Rights</h2>
          <p className=" mb-3">
            All wallpapers provided through the App are either owned by us,
            licensed to us, or are in the public domain. Users may download and
            use wallpapers for personal, non-commercial use only.
          </p>
          <ul className="list-disc pl-6 ">
            <li className="mb-2">
              You may use the wallpapers on your personal devices
            </li>
            <li className="mb-2">
              You may not sell, redistribute, or claim ownership of any
              wallpapers
            </li>
            <li className="mb-2">
              You may not use the wallpapers for commercial purposes without
              explicit permission
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">3. User Conduct</h2>
          <p className=" mb-3">Users of the App agree to:</p>
          <ul className="list-disc pl-6 ">
            <li className="mb-2">
              Not attempt to circumvent any download restrictions or technical
              measures
            </li>
            <li className="mb-2">
              Not use automated systems to download wallpapers
            </li>
            <li className="mb-2">
              Not engage in any activity that could harm the App or its services
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">
            4. Privacy and Data Collection
          </h2>
          <p className=" mb-3">
            We collect and process certain user data as described in our Privacy
            Policy. By using the App, you consent to such processing and you
            warrant that all data provided by you is accurate.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">
            5. Service Modifications
          </h2>
          <p className=" mb-3">We reserve the right to:</p>
          <ul className="list-disc pl-6 ">
            <li className="mb-2">
              Modify or discontinue any aspect of the App at any time
            </li>
            <li className="mb-2">Add or remove wallpapers without notice</li>
            <li className="mb-2">Update these terms of service as needed</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">
            6. Intellectual Property
          </h2>
          <p className=" mb-3">
            The App, including its original content, features, and
            functionality, is owned by ©Pixel and is protected by international
            copyright, trademark, patent, trade secret, and other intellectual
            property laws.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">
            7. Limitation of Liability
          </h2>
          <p className=" mb-3">
            The App is provided "as is" without any guarantees or warranty. In
            no event shall Pixel be liable for any damages arising from the use
            or inability to use the App.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">
            8. Contact Information
          </h2>
          <p className=" mb-3">
            For any questions about these Terms of Service, please contact us
            at:
            <br />
            Email: contact@heysohail.me
          </p>
        </section>
      </div>
    </div>
  );
}
