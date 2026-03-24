import LegalPage from "@/components/LegalPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Kensho Ventures",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy for kensho.vc">
      <p>Effective Date: May 2024</p>

      <p>
        kensho.vc (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is
        committed to protecting your privacy. This Privacy Policy outlines our
        practices regarding the collection, use, and disclosure of your
        information through the operations of our website kensho.vc (the
        &quot;Site&quot;) in accordance with the General Data Protection
        Regulation (GDPR) and other relevant EU legislation. Importantly, our
        Site does not use cookies.
      </p>

      <h2>
        1. Information Collection
      </h2>
      <p>
        We do not employ cookies on our Site; thus, we do not collect any
        personal data automatically. Any personal data collected is limited to
        information you voluntarily provide through direct communications or
        interactions, such as contacting us via email or through a contact form,
        if available.
      </p>

      <h2>
        2. Lawful Basis for Processing
      </h2>
      <p>
        As we do not collect personal information through our Site
        automatically, our processing of your personal data is based on your
        consent when you provide such information directly to us for specific
        purposes, such as responding to your inquiries or providing requested
        services.
      </p>

      <h2>
        3. Information Use
      </h2>
      <p>
        The information you provide is used solely for the purpose it was
        collected, such as responding to your inquiries or fulfilling a service
        request. No automatic data collection methods are used.
      </p>

      <h2>
        4. Data Retention
      </h2>
      <p>
        We retain personal information only for as long as necessary to fulfill
        the purposes for which it was collected, including for the purposes of
        satisfying any legal, accounting, or reporting requirements.
      </p>

      <h2>
        5. Information Sharing and Disclosure
      </h2>
      <p>
        We do not share, sell, rent, or trade personal information with third
        parties for their commercial purposes. Any disclosure of information
        will be in compliance with GDPR and only as necessary to provide
        services requested by you or to comply with legal obligations.
      </p>

      <h2>
        6. Data Security
      </h2>
      <p>
        We implement appropriate technical and organizational measures to
        protect the personal data provided against unauthorized or unlawful
        processing and against accidental loss, destruction, or damage.
      </p>

      <h2>
        7. Your Rights Under GDPR
      </h2>
      <p>
        Under GDPR, you have the right to access, rectify, or erase your
        personal data, the right to restrict or object to its processing, and
        the right to data portability. If you wish to exercise any of these
        rights, please contact us using the details provided below.
      </p>

      <h2>
        8. Children&apos;s Privacy
      </h2>
      <p>
        Our Site is not intended for children under the age of 16, and we do not
        knowingly collect personal information from children under this age. If
        we become aware that we have collected personal data from a child under
        age 16, we will take steps to delete such information from our records.
      </p>

      <h2>
        9. Changes to This Privacy Policy
      </h2>
      <p>
        We may update this Privacy Policy to reflect changes to our information
        practices. If we make any material changes, we will notify you by
        revising the date at the top of the policy and, in some cases, we may
        provide you with more prominent notice.
      </p>

      <h2>10. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy or our privacy
        practices, please contact us at:{" "}
        <a
          href="mailto:info@kensho.vc"
          className="text-[#FEB180] hover:underline"
        >
          info@kensho.vc
        </a>
      </p>

      <p>
        This Privacy Policy is effective as of 31.05.2024 and will remain in
        effect except with respect to any changes in its provisions in the
        future, which will be in effect immediately after being posted on this
        page.
      </p>
    </LegalPage>
  );
}
