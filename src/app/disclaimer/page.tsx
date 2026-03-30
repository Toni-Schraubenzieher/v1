import LegalPage from "@/components/LegalPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Legal disclaimer, regulatory information, and risk disclosure for Kensho Ventures, a BaFin-regulated venture capital fund.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer">
      <h2>
        Legal Disclaimer
      </h2>
      <p>
        The information provided on this website is intended for general
        information purposes only and does not constitute investment advice. All
        information is provided &quot;as is&quot; without any warranties of any
        kind. The contents of this website are not intended to be a
        comprehensive treatment of the subjects discussed and should not be
        construed as legal, tax, or investment advice. Decisions based on
        information contained on this website are the sole responsibility of the
        visitor, and in exchange for using this site, the visitor agrees to hold
        Kensho Ventures, its officers, and employees harmless against any claims
        for damages arising from any decision the visitor makes based on such
        information.
      </p>

      <h2>
        Regulatory Information
      </h2>
      <p>
        Kensho Ventures is a closed-ended venture capital fund focused on
        investments in alternative assets, primarily equity, and is regulated as
        an Alternative Investment Fund (AIF) under the German Capital Investment
        Code (Kapitalanlagegesetzbuch - KAGB). The management of Kensho
        Ventures is authorized and supervised by the German Federal Financial
        Supervisory Authority (BaFin), in accordance with the licensing and
        operational requirements set forth in §§ 135-139 KAGB for AIF management
        companies. The fund&apos;s operations comply with the specific
        provisions for closed-ended funds as detailed in §§ 261-271 KAGB, and it
        adheres to the manager obligations outlined in §§ 294-335 KAGB. This
        authorization permits Kensho Ventures to offer targeted investment
        opportunities to eligible investors under strict German and EU regulatory
        standards.
      </p>

      <h2>
        Risk Disclosure
      </h2>
      <p>
        Investments in venture capital are associated with substantial risks and
        are suitable only for investors who can bear the loss of their entire
        investment. Past performance is not necessarily indicative of future
        results. The value of investments and the income from them can fall as
        well as rise, and investors might not get back the amount originally
        invested.
      </p>

      <h2>
        Intellectual Property Rights
      </h2>
      <p>
        All content on this website is owned by Kensho Ventures or its content
        suppliers and is protected by international copyright laws. The
        unauthorized reproduction, modification, or distribution of any material
        on this site is strictly prohibited.
      </p>

      <h2>
        No Offer or Solicitation
      </h2>
      <p>
        The information provided on this website is for informational purposes
        only and should not be interpreted as an offer to sell, or a
        solicitation of an offer to buy, any securities. Such offers can only be
        made where lawful under applicable law.
      </p>

      <h2>
        Limitation of Liability
      </h2>
      <p>
        Kensho Ventures does not guarantee the accuracy, completeness, or
        usefulness of any information on this site and expressly disclaims any
        liability for errors or omissions in this information. Kensho Ventures
        will not be liable for any loss or damage that could result from
        interception by third parties of any information made available to you
        via this site.
      </p>

      <h2>
        Contact Information
      </h2>
      <p>
        For further information or inquiries about investment opportunities,
        please contact at{" "}
        <a
          href="mailto:info@kensho.vc"
          className="text-[#FEB180] hover:underline"
        >
          info@kensho.vc
        </a>
        .
      </p>
    </LegalPage>
  );
}
