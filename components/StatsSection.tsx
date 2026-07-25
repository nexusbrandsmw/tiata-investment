"use client";

import CountUp from "react-countup";

export default function StatsSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-6">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

          {/* STAT 1 */}
          <div>
            <h3 className="text-2xl md:text-3xl font-normal text-[#020f22]">
              <CountUp
                end={30}
                duration={3}
                enableScrollSpy
                scrollSpyOnce
              />
              +
            </h3>

            <p className="text-[#020f22] mt-2 font-normal">
              Teams Served
            </p>
          </div>

          {/* STAT 2 */}
          <div>
            <h3 className="text-2xl md:text-3xl font-normal text-[#020f22]">
              <CountUp
                end={10}
                duration={3}
                enableScrollSpy
                scrollSpyOnce
              />
              +
            </h3>

            <p className="text-[#020f22] mt-2 font-normal">
              Corporate Events Hosted
            </p>
          </div>

          {/* STAT 3 */}
          <div>
            <h3 className="text-2xl md:text-3xl font-normal text-[#020f22]">
              <CountUp
                end={10}
                duration={3}
                enableScrollSpy
                scrollSpyOnce
              />
              +
            </h3>

            <p className="text-[#020f22] mt-2 font-normal">
              Tournaments Organized
            </p>
          </div>

          {/* STAT 4 */}
          <div>
            <h3 className="text-2xl md:text-3xl font-normal text-[#020f22]">
              <CountUp
                end={99}
                duration={3}
                enableScrollSpy
                scrollSpyOnce
              />
              %
            </h3>

            <p className="text-[#020f22] mt-2 font-normal">
              Lighting Uptime
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}