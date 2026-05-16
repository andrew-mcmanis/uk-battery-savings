import GuidePageLayout from "@/components/GuidePageLayout";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Is a Home Battery Worth It Without Solar in the UK?",
  description:
    "Learn how a home battery can work without solar panels by charging from cheap off-peak electricity and discharging during expensive periods.",
  alternates: {
    canonical: "/home-battery-without-solar-uk",
  },
};

export default function HomeBatteryWithoutSolarPage() {
  return (
    <GuidePageLayout
      eyebrow="Home battery guide"
      title="Is a home battery worth it without solar?"
      description="A home battery does not always need solar panels. Some households use cheap overnight electricity to charge a battery, then use that stored energy during more expensive hours."
    >
      <div className="guide-content space-y-8">
        <section>
          <h2>Can you use a home battery without solar?</h2>
          <p>
            Yes. A home battery can be used without solar panels if it charges
            from the grid during cheaper off-peak periods and discharges when
            electricity is more expensive.
          </p>
          <p>
            This approach depends heavily on having a suitable tariff and enough
            electricity usage during expensive periods to make the battery useful.
          </p>
        </section>

        <section>
          <h2>How the saving works</h2>
          <p>The basic idea is simple:</p>
          <ul>
            <li>Charge the battery when electricity is cheap.</li>
            <li>Use the battery when electricity is expensive.</li>
            <li>The saving is the difference between those rates, minus losses.</li>
          </ul>
        </section>

        <section>
          <h2>Why battery efficiency matters</h2>
          <p>
            A battery is not perfectly efficient. If the battery has 90%
            round-trip efficiency, you need to buy more electricity than the
            battery later delivers.
          </p>
          <p>
            That means the off-peak rate must be low enough to still leave a
            useful saving after efficiency losses.
          </p>
        </section>

        <section>
          <h2>When it can work well</h2>
          <ul>
            <li>You have access to a cheap overnight electricity rate.</li>
            <li>You use significant electricity during peak-rate hours.</li>
            <li>Your battery is large enough to cover useful evening usage.</li>
            <li>The installed cost is low enough for a reasonable payback period.</li>
          </ul>
        </section>

        <section>
          <h2>When it may not work well</h2>
          <ul>
            <li>The off-peak rate is not much cheaper than the peak rate.</li>
            <li>You do not use much electricity in the evening.</li>
            <li>The battery is oversized for your usage.</li>
            <li>The installed cost is high compared with the yearly saving.</li>
          </ul>
        </section>

        <section>
          <h2>Solar can improve the picture, but it is not required</h2>
          <p>
            Solar panels can improve the economics because the battery may store
            excess solar generation instead of exporting it. But for this first
            calculator, the focus is deliberately simpler: grid charging on cheap
            off-peak electricity.
          </p>
        </section>

        <section>
          <h2>Best next step</h2>
          <p>
            Try the{" "}
            <Link
              href="/#calculator"
              className="font-semibold text-emerald-700 hover:text-emerald-800"
            >
              UK home battery savings calculator
            </Link>{" "}
            using your own peak rate, off-peak rate and battery quote.
          </p>
        </section>
      </div>
    </GuidePageLayout>
  );
}
