import Image from "next/image";
import Stripes from "@/public/images/stripes-dark.svg";

export default function Cta() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 mt-10">
        <div
          className="relative overflow-hidden rounded-2xl text-center shadow-xl before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-gray-900"
          data-aos="zoom-y-out"
        >
          {/* Stripes illustration */}
          <div
            className="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/2 transform"
            aria-hidden="true"
          >
            <Image
              className="max-w-none"
              src={Stripes}
              width={768}
              height={432}
              alt="Stripes"
            />
          </div>
          <div className="px-4 py-12 md:px-12 md:py-20">
            <h2 className="mb-6 border-y text-3xl font-bold text-gray-200 [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-700/.7),transparent)1] md:mb-12 md:text-4xl">
              Присоединяйся к Pro-сообществу сегодня
            </h2>
            {/* Pricing Section (light theme, Russian) */}
            <div
              id="pricing"
              className="mt-12 flex flex-col md:flex-row gap-8 bg-gray-900/90 rounded-2xl shadow-xl p-8 md:p-12 max-w-5xl mx-auto border border-gray-700"
            >
              {/* Тарифы */}
              <div className="flex-1 flex flex-col gap-6">
                <span className="inline-block mb-2 px-3 py-1 text-xs font-semibold text-blue-200 bg-blue-900/60 rounded-full w-max">
                  Скидка для ранних пользователей
                </span>
                <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-4 h-full">
                  <div className="text-lg font-semibold mb-2 text-gray-100">
                    Месячная подписка
                  </div>
                  <div className="text-3xl font-bold mb-1 text-white">
                    4 990 ₽ или 55 €{" "}
                    <span className="text-base font-normal text-gray-400">
                      /мес
                    </span>
                  </div>
                  <div className="text-gray-500 line-through text-sm">
                    Обычно 6 990 ₽ или 75 €
                  </div>
                  <div className="text-green-400 text-sm font-semibold">
                    17% скидка
                  </div>
                </div>
                <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 relative ">
                  <span className="inline-block mb-2 px-3 py-1 text-xs font-semibold text-blue-200 bg-blue-900/60 rounded-full w-max">
                    ЛУЧШАЯ ЦЕНА
                  </span>
                  <div className="text-lg font-semibold mb-2 text-gray-100">
                    Годовая подписка
                  </div>
                  <div className="text-3xl font-bold mb-1 text-white">
                    49 900 ₽ или 550 €{" "}
                    <span className="text-base font-normal text-gray-400">
                      /год
                    </span>
                  </div>
                  <div className="text-gray-500 line-through text-sm">
                    Обычно 69 900 ₽ или 750 €
                  </div>
                  <div className="text-green-400 text-sm font-semibold">
                    33% скидка
                  </div>
                </div>
              </div>
              {/* Преимущества */}
              <div className="flex-1 flex flex-col justify-between bg-gray-800 rounded-xl border border-gray-700 p-6 text-left">
                <div>
                  <div className="text-lg font-bold mb-4 text-gray-100 text-left">
                    Что входит:
                  </div>
                  <ul className="space-y-3 mb-6 text-left">
                    <li className="flex items-center gap-2 text-green-400">
                      <span className="text-xl">✅</span> Доступ ко всем текущим
                      и будущим материалам
                    </li>
                    <li className="flex items-center gap-2 text-green-400">
                      <span className="text-xl">✅</span> Регулярно
                      пополняющийся материал про ИИ
                    </li>
                    <li className="flex items-center gap-2 text-green-400">
                      <span className="text-xl">✅</span> Приватное сообщество
                    </li>
                    <li className="flex items-center gap-2 text-green-400">
                      <span className="text-xl">✅</span> Шаблоны и ресурсы для
                      ИИ-агентов
                    </li>
                    <li className="flex items-center gap-2 text-yellow-400">
                      <span className="text-xl">🎁</span> БОНУС — Эксклюзивные
                      знания про ИИ-агентов
                    </li>
                    <li className="flex items-center gap-2 text-yellow-400">
                      <span className="text-xl">🎁</span> БОНУС — Эксклюзивный
                      нетворкинг
                    </li>
                  </ul>
                </div>
                <a
                  className="btn group mb-4 w-full bg-gradient-to-t from-blue-700 to-blue-500 text-white shadow-sm hover:from-blue-600 hover:to-blue-400 sm:mb-0 sm:w-auto"
                  href="https://t.me/iishenka_pro_bot"
                  target="blank"
                >
                  <span className="relative inline-flex items-center">
                    Я с вами! Вступить в Pro{" "}
                    <span className="ml-1 tracking-normal text-blue-300 transition-transform group-hover:translate-x-0.5">
                      -&gt;
                    </span>
                  </span>
                </a>
                <span className="text-sm font-normal text-gray-400 text-center">
                  Вы будете перенаправлены в Телеграм-бота для вступления
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
