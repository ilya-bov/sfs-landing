import Image from "next/image";
import PlanetImg from "@/public/images/planet.png";
import PlanetOverlayImg from "@/public/images/planet-overlay.svg";
import PlanetTagImg01 from "@/public/images/planet-tag-01.png";
import PlanetTagImg02 from "@/public/images/planet-tag-02.png";
import PlanetTagImg03 from "@/public/images/planet-tag-03.png";
import PlanetTagImg04 from "@/public/images/planet-tag-04.png";

export default function FeaturesPlanet() {
  return (
    <section className="relative before:absolute before:inset-0 before:-z-20 before:bg-gray-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20 bg-gray-900 rounded-2xl">
          {/* Первый блок: преимущества сообщества */}
          <div className="mx-auto max-w-3xl pb-16 text-center md:pb-20 ">
            <span className="inline-block mb-4 px-3 py-1 text-xs font-semibold text-blue-400 bg-blue-900/30 rounded-full w-max">Возможности и преимущества</span>
            <h2 className="text-4xl font-semibold text-gray-200 mb-6">
              Прокачай навыки ИИ вместе с <span className="text-blue-400">развивающимся</span> сообществом
            </h2>
            <p className="text-lg text-gray-400">
              Наше сообщество даёт всё необходимое для развития экспертизы в ИИ: от материалов и поддержки до шаблонов и личного общения.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="mb-3 text-blue-400 text-2xl">📘</div>
              <div className="font-bold text-white mb-1">Материалы по ИИ</div>
              <div className="text-gray-400 text-sm">Постоянно обновляемые материалы, чтобы вы всегда были на шаг впереди.</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="mb-3 text-blue-400 text-2xl">⚡️</div>
              <div className="font-bold text-white mb-1">Живое общение</div>
              <div className="text-gray-400 text-sm">Глубокие разборы и интерактивное общение на постоянной основе.</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="mb-3 text-blue-400 text-2xl">💬</div>
              <div className="font-bold text-white mb-1">Поддержка 24/7</div>
              <div className="text-gray-400 text-sm">Постоянная помощь от экспертов и участников по любым вопросам ИИ.</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="mb-3 text-blue-400 text-2xl">🌐</div>
              <div className="font-bold text-white mb-1">Сообщество единомышленников</div>
              <div className="text-gray-400 text-sm">Нетворкинг с профессионалами, которые внедряют ИИ в бизнес и карьеру.</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="mb-3 text-blue-400 text-2xl">🚀</div>
              <div className="font-bold text-white mb-1">Реальные кейсы</div>
              <div className="text-gray-400 text-sm">Практические примеры внедрения ИИ для бизнеса и проектов.</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="mb-3 text-blue-400 text-2xl">🛠️</div>
              <div className="font-bold text-white mb-1">Ресурсы и шаблоны</div>
              <div className="text-gray-400 text-sm">Гайды, инструменты и шаблоны для ускорения вашего развития.</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="mb-3 text-blue-400 text-2xl">🎤</div>
              <div className="font-bold text-white mb-1">Участие экспертов</div>
              <div className="text-gray-400 text-sm">Сами создатели сообщества постоянно на связи.</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="mb-3 text-blue-400 text-2xl">🧩</div>
              <div className="font-bold text-white mb-1">Готовые агенты и решения</div>
              <div className="text-gray-400 text-sm">Быстрый старт с готовыми шаблонами и фреймворками для ИИ.</div>
            </div>
          </div>

          {/* Второй блок: для кого сообщество */}
          <div className="mx-auto max-w-3xl pb-10 text-center md:pb-16">
            <span className="inline-block mb-4 px-3 py-1 text-xs font-semibold text-blue-400 bg-blue-900/30 rounded-full w-max">Для кого это?</span>
            <h2 className="text-4xl font-semibold text-gray-200 mb-6">
              Сообщество для <span className="text-blue-400">тебя</span>
            </h2>
            <p className="text-lg text-gray-400">
              Неважно, строишь ли ты бизнес или развиваешь технические навыки — у нас есть всё, что нужно для роста в ИИ.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-blue-900/40 rounded-xl p-8 border border-blue-800 flex flex-col">
              <div className="mb-3 text-blue-300 text-2xl">🚀</div>
              <div className="font-bold text-white mb-1 text-lg">Для инноваторов и основателей</div>
              <div className="text-gray-300 text-sm">Узнай, как внедрять ИИ-агентов для оптимизации процессов, ускорения роста и превращения идей в реальные результаты.</div>
            </div>
            <div className="bg-blue-900/40 rounded-xl p-8 border border-blue-800 flex flex-col">
              <div className="mb-3 text-blue-300 text-2xl">💻</div>
              <div className="font-bold text-white mb-1 text-lg">Для разработчиков и энтузиастов</div>
              <div className="text-gray-300 text-sm">Освой современные навыки и концепции ИИ, чтобы создавать масштабируемых и готовых к продакшену агентов — и быть на волне развития технологий.</div>
            </div>
          </div>

          {/* Секция: Чему вы научитесь и почему это важно */}
          <section className="mt-20 rounded-2xl px-4 py-16 md:px-12 bg-gray-800/90">
            <div className="mx-auto max-w-4xl text-center mb-12">
              <span className="inline-block mb-4 px-3 py-1 text-xs font-semibold text-blue-400 bg-blue-900/30 rounded-full w-max">Развивайте ключевые навыки</span>
              <h2 className="text-4xl font-semibold text-white mb-4">Что вы <span className="text-blue-400">найдёте в сообществе</span></h2>
              <p className="text-gray-300 text-lg">В этом сообществе вы узнаете про всё необходимое для создания и внедрения ИИ-агентов и других ИИ-решений.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto mb-16">
              <div className="flex items-center gap-3 bg-gray-800/80 rounded-lg px-5 py-4 border border-gray-700">
                <span className="text-blue-400 text-xl">✅</span>
                <span className="font-medium text-white">Создание production-ready ИИ-агентов</span>
              </div>
              <div className="flex items-center gap-3 bg-gray-800/80 rounded-lg px-5 py-4 border border-gray-700">
                <span className="text-blue-400 text-xl">✅</span>
                <span className="font-medium text-white">Архитектура ИИ-агентов</span>
              </div>
              <div className="flex items-center gap-3 bg-gray-800/80 rounded-lg px-5 py-4 border border-gray-700">
                <span className="text-blue-400 text-xl">✅</span>
                <span className="font-medium text-white">Экспертиза в RAG и работе с данными</span>
              </div>
              <div className="flex items-center gap-3 bg-gray-800/80 rounded-lg px-5 py-4 border border-gray-700">
                <span className="text-blue-400 text-xl">✅</span>
                <span className="font-medium text-white">Локальный ИИ (безопасность и приватность)</span>
              </div>
              <div className="flex items-center gap-3 bg-gray-800/80 rounded-lg px-5 py-4 border border-gray-700">
                <span className="text-blue-400 text-xl">✅</span>
                <span className="font-medium text-white">Реальные бизнес-кейсы</span>
              </div>
              <div className="flex items-center gap-3 bg-gray-800/80 rounded-lg px-5 py-4 border border-gray-700">
                <span className="text-blue-400 text-xl">✅</span>
                <span className="font-medium text-white">Использование AI-ассистентов для кода</span>
              </div>
              <div className="flex items-center gap-3 bg-gray-800/80 rounded-lg px-5 py-4 border border-gray-700">
                <span className="text-blue-400 text-xl">✅</span>
                <span className="font-medium text-white">Монетизация ИИ-агентов</span>
              </div>
              <div className="flex items-center gap-3 bg-gray-800/80 rounded-lg px-5 py-4 border border-gray-700">
                <span className="text-blue-400 text-xl">✅</span>
                <span className="font-medium text-white">Создание ИИ-агентов без кода</span>
              </div>
              <div className="flex items-center gap-3 bg-gray-800/80 rounded-lg px-5 py-4 border border-gray-700">
                <span className="text-blue-400 text-xl">✅</span>
                <span className="font-medium text-white">Инструменты и фреймворки для ИИ</span>
              </div>
            </div>
            <div className="mx-auto max-w-3xl text-center mb-10">
              <h3 className="text-3xl font-bold text-white mb-3">Почему эти <span className="text-blue-400">навыки важны</span></h3>
              <p className="text-gray-300">Спрос на экспертизу в области ИИ стремительно растёт во всех сферах.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-gray-800/80 to-blue-900/40 rounded-xl p-6 border border-blue-800 text-left flex flex-col">
                <div className="text-white mb-2 font-medium">92% компаний планируют увеличить инвестиции в ИИ в ближайшие годы, но только 1% считают свои ИИ-решения зрелыми.</div>
                <div className="text-blue-300 text-xs mt-auto">McKinsey & Company</div>
              </div>
              <div className="bg-gradient-to-br from-gray-800/80 to-blue-900/40 rounded-xl p-6 border border-blue-800 text-left flex flex-col">
                <div className="text-white mb-2 font-medium">82% крупных компаний внедрят ИИ-агентов к 2027 году.</div>
                <div className="text-blue-300 text-xs mt-auto">Capgemini Research Institute</div>
              </div>
              <div className="bg-gradient-to-br from-gray-800/80 to-blue-900/40 rounded-xl p-6 border border-blue-800 text-left flex flex-col">
                <div className="text-white mb-2 font-medium">80% всех взаимодействий с клиентами будут обрабатываться ИИ к 2030 году.</div>
                <div className="text-blue-300 text-xs mt-auto">Gartner</div>
              </div>
              <div className="bg-gradient-to-br from-gray-800/80 to-blue-900/40 rounded-xl p-6 border border-blue-800 text-left flex flex-col">
                <div className="text-white mb-2 font-medium">30% компаний из Fortune 500 будут обслуживать клиентов только через AI-каналы к 2028 году.</div>
                <div className="text-blue-300 text-xs mt-auto">Gartner</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
