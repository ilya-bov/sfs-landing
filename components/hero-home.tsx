import Image from "next/image";
import PageIllustration from "@/components/page-illustration";
import Avatar01 from "@/public/images/avatar-01.jpg";
import Avatar02 from "@/public/images/avatar-02.jpg";
import Avatar03 from "@/public/images/avatar-03.jpg";
import Avatar04 from "@/public/images/avatar-04.jpg";
import Avatar05 from "@/public/images/avatar-05.jpg";
import Avatar06 from "@/public/images/avatar-06.jpg";
import UI1 from "@/public/images/ui1.png";
import UI2 from "@/public/images/ui2.png";
import UI3 from "@/public/images/ui3.png";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Accordion from "./accordion";
import BusinessCategories from "./business-categories";

export default function HeroHome() {
  return (
    <section className="relative">
      <PageIllustration />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero content */}
        <div className="pb-12 pt-32 md:pb-20 md:pt-40">
          {/* Section header */}
          <div className="pb-12 text-center md:pb-16">
            <div
              className="mb-6 border-y [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-300/.8),transparent)1]"
              data-aos="zoom-y-out"
            >
              <div className="-mx-0.5 flex justify-center -space-x-3">
                <p
                  className="text-blue-500 text-xs font-semibold"
                  data-aos="zoom-y-out"
                  data-aos-delay={300}
                >
                  Присоединяйся к ИИшенка Pro Сообществу сегодня!
                </p>
              </div>
            </div>
            <h1
              className="mb-6 border-y text-5xl font-bold [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-300/.8),transparent)1] md:text-6xl"
              data-aos="zoom-y-out"
              data-aos-delay={150}
            >
              Узнавай ИИ и опережай <br className="max-lg:hidden" />
              конкурентов
            </h1>
            <div className="mx-auto max-w-3xl">
              <p
                className="mb-8 text-lg text-gray-700"
                data-aos="zoom-y-out"
                data-aos-delay={300}
              >
                Присоединяйся к революции искусственного интеллекта. Изучай
                передовые техники, автоматизируй рабочие процессы и опережай
                конкурентов с помощью ИИ.
              </p>
              <div className="relative before:absolute before:inset-0 before:border-y before:[border-image:linear-gradient(to_right,transparent,--theme(--color-slate-300/.8),transparent)1]">
                <div
                  className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center"
                  data-aos="zoom-y-out"
                  data-aos-delay={450}
                >
                  <a
                    className="btn group mb-4 w-full bg-linear-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-sm hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
                    href="#pricing"
                  >
                    <span className="relative inline-flex items-center">
                      Вступить в сообщество{" "}
                      <span className="ml-1 tracking-normal text-blue-300 transition-transform group-hover:translate-x-0.5">
                        -&gt;
                      </span>
                    </span>
                  </a>
                  {/* <a
                    className="btn w-full bg-white text-gray-800 shadow-sm hover:bg-gray-50 sm:ml-4 sm:w-auto"
                    href="#0"
                  >
                    Learn More
                  </a> */}
                </div>
              </div>
            </div>
          </div>
          {/* Hero tabs */}
          <div className="-mx-0.5 flex justify-center items-center">
            <div className="mt-8 w-full flex justify-center items-center">
              <div
                className="relative rounded-2xl px-5 py-3 shadow-xl max-w-5xl w-full before:pointer-events-none before:absolute before:-inset-5 before:border-y before:[border-image:linear-gradient(to_right,transparent,--theme(--color-slate-300/.8),transparent)1] after:absolute after:-inset-5 after:-z-10 after:border-x after:[border-image:linear-gradient(to_bottom,transparent,--theme(--color-slate-300/.8),transparent)1]"
                data-aos="zoom-y-out"
                data-aos-delay={100}
              >
                <video
                  className="box-content rounded-2xl border-2 border-gray-50 max-w-full w-full h-auto"
                  src="https://www.ibillidi.com/wc.mp4"
                  loop
                  controls
                />
              </div>
            </div>
          </div>
         
        </div>
      </div>
    </section>
  );
}
