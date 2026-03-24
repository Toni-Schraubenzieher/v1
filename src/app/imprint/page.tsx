import LegalPage from "@/components/LegalPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Imprint — Kensho Ventures",
};

export default function ImprintPage() {
  return (
    <LegalPage title="Imprint">
      <p>
        Liability and information according to the German § 5 TMG:
      </p>

      <div>
        <p>Kensho Ventures</p>
        <p>Rosenthaler Straße 72 A</p>
        <p>10119 Berlin</p>
        <p>Germany</p>
      </div>

      <p>
        Email:{" "}
        <a
          href="mailto:info@kensho.vc"
          className="text-[#FEB180] hover:underline"
        >
          info@kensho.vc
        </a>
      </p>

      <p>Trade Register: Amtsgericht Charlottenburg, HRB 251114 B</p>
      <p>
        Regulatory Authority: Bundesanstalt für Finanzdienstleistungen (BaFin)
      </p>

      <p>
        Represented by the Managing Directors: Wolfgang Sachsenhofer and David
        Skigin
      </p>
    </LegalPage>
  );
}
