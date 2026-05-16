import GuidePageLayout from "@/components/GuidePageLayout";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Is a Home Battery Worth It in the UK?",
  description:
    "A plain-English guide to when a UK home battery may be worth it, when it may not be, and which numbers matter most.",
  alternates: {
    canonical: "/is-a-home-battery-worth-it-uk",
  },
};

export default function IsAHomeBatteryWorthItPage() {
  return (
    <GuidePageLayout
      eyebrow="Home battery guide"
      title="Is a home battery worth it in the UK?"
      description="A home battery can make sense for some households, but the answer depends heavily on your tariff, battery cost, usage pattern and whether you can charge cheaply."
    >
      <div className="guide-content space-y-8">
        <section>
          <h2>The short answer</h2>
          <p>
            A home battery is more likely to be worth it when you can charge it
            cheaply and use that stored electricity instead of buying expensive
            peak-rate electricity later.
          </p>
          <p>
            It is less likely to be worth it when the battery is expensive, the
            difference between peak and off-peak rates is small, or you do not
            use enough electricity during the times when the battery can help.
          </p>
        </section>

        <section>
          <h2>The main numbers that matter</h2>
          <ul>
            <li>
              <strong>Installed battery cost:</strong> the full price you pay,
              including installation.
            </li>
            <li>
              <strong>Usable battery capacity:</strong> how many kWh the battery
              can actually deliver.
            </li>
            <li>
              <strong>Peak electricity rate:</strong> the expensive rate the
              battery helps you avoid.
            </li>
            <li>
              <strong>Off-peak electricity rate:</strong> the cheaper rate used
              to charge the battery.
            </li>
            <li>
              <strong>Battery efficiency:</strong> energy is lost when charging
              and discharging.
            </li>
            <li>
              <strong>Cycles per year:</strong> how often the battery is charged
              and discharged.
            </li>
          </ul>
        </section>

        <section>
          <h2>When a battery is more likely to make sense</h2>
          <p>A battery is usually more attractive when:</p>
          <ul>
            <li>You have a large gap between peak and off-peak rates.</li>
            <li>You use a lot of electricity during expensive periods.</li>
            <li>You can cycle the battery regularly.</li>
            <li>The installed cost is reasonable.</li>
            <li>You plan to stay in the property long enough to benefit.</li>
          </ul>
        </section>

        <section>
          <h2>When a battery may not be worth it</h2>
          <p>A battery may be harder to justify when:</p>
          <ul>
            <li>Your electricity usage is already low.</li>
            <li>Your tariff has little difference between day and night rates.</li>
            <li>The battery quote is expensive compared with the likely saving.</li>
            <li>You cannot use most of the stored energy.</li>
            <li>The payback period is longer than you are comfortable with.</li>
          </ul>
        </section>

        <section>
          <h2>Simple example</h2>
          <p>
            If a battery saves around £600 per year and costs £5,000 installed,
            the rough payback period is about 8.3 years.
          </p>
          <p>
            That does not automatically mean it is good or bad. It gives you a
            starting point for comparing the saving against the cost, warranty
            period and your own plans.
          </p>
        </section>

        <section>
          <h2>Best next step</h2>
          <p>
            Use the{" "}
            <Link
              href="/#calculator"
              className="font-semibold text-emerald-700 hover:text-emerald-800"
            >
              home battery savings calculator
            </Link>{" "}
            to test your own battery size, tariff rates and installed cost.
          </p>
        </section>
      </div>
    </GuidePageLayout>
  );
}
