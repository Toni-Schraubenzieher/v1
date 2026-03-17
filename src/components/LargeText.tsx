export default function LargeText() {
  return (
    <section className="py-14 sm:py-16 lg:py-20">
      <div className="w-full">
        <div className="space-y-3 sm:space-y-4">
          {/* First row - left aligned at screen edge */}
          <div className="text-left pl-3 sm:pl-4">
            <h2
              className="font-heading text-[clamp(3.15rem,9.6vw,8.8rem)] font-bold uppercase leading-[0.88] tracking-tight"
              style={{ color: '#D4FFEF' }}
            >
              KENSHO
              <br />
              VENTURES
            </h2>
          </div>

          {/* Second row - right aligned at screen edge */}
          <div className="text-right pr-3 sm:pr-4">
            <h2
              className="font-heading text-[clamp(3.15rem,9.6vw,8.8rem)] font-bold uppercase leading-[0.88] tracking-tight"
              style={{ color: '#FEB180' }}
            >
              EUROPEAN
              <br />
              DEEP-TECH
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
