import Image from "next/image";
import TestimonialImg from "@/public/images/large-testimonial.jpg";

export default function LargeTestimonial() {
  return (
    <section>
      {/* Верхний блок с плитками */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-6 md:py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-10">
            <div
              className="bg-white rounded-xl border border-gray-200 shadow-sm relative overflow-hidden"
              style={{
                background:
                  "radial-gradient(circle at 60% 40%, #e0e7ff 0%, #101828 100%)",
              }}
            >
              <img
                src="/images/ava.png"
                alt="Аватар"
                className="w-full h-auto object-cover rounded-xl"
                style={{ display: "block" }}
              />
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <span className="inline-block mb-2 px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full w-max">
                Кто я?
              </span>
              <div>
                <br />
                Приятно познакомиться! <br />
                <br /> Меня зовут Илья Бовкунов — я энтузиаст в области
                технологий, продуктовый менеджер и дизайнер с пятнадцатилетним
                опытом в сфере технологий и искусственного интеллекта. А также
                основатель своих ИИ-стартапов.
                <br />
                <br /> На моих публичных каналах уже несколько тысяч
                подписчиков, и я помог сотням людей освоить и использовать ИИ
                для решения реальных задач. На своем пути я работал директором
                по продукту и продуктовому дизайну в международных компаниях и
                консультировал множество стартапов, помогая им выстраивать
                ИИ-стратегии и внедрять технологии. <br />
                <br />Я на собственном опыте убедился как в огромном потенциале
                ИИ, так и в подводных камнях, поэтому могу делиться практичными
                и действенными знаниями, которые помогут развить ваши навыки и
                бизнес.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="space-y-3 text-center">
            <div className="relative inline-flex">
              <svg
                className="absolute -left-6 -top-2 -z-10"
                width={40}
                height={49}
                viewBox="0 0 40 49"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.7976 -0.000136375L39.9352 23.4746L33.4178 31.7234L13.7686 11.4275L22.7976 -0.000136375ZM9.34947 17.0206L26.4871 40.4953L19.9697 48.7441L0.320491 28.4482L9.34947 17.0206Z"
                  fill="#D1D5DB"
                />
              </svg>
              <Image
                className="rounded-full"
                src="/images/avatar-01.jpg"
                width={48}
                height={48}
                alt="Large testimonial"
              />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              "Пересмотрел десятки видео блогеров, кто в лес кто по дрова! Тут
              же всё чётко и детально, с ошибками, решения этих ошибок! Спасибо,
              очень помог понять как работают многие инструменты!"
            </p>
            <div className="text-sm font-medium text-gray-500">
              <span className="text-gray-700">
                Иван, участник Pro-сообщества
              </span>{" "}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-6 md:py-10 rounded-2xl">
          {/* Первый блок: преимущества сообщества */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="mb-3 text-blue-500 text-2xl">💬</div>
              <div className="font-bold text-gray-900 mb-1 text-sm">
                Круто! До этого не понимал суть векторизации. Спасибо!
              </div>
              <div className="text-gray-500 text-sm">Подпичик на YouTube</div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="mb-3 text-blue-500 text-2xl">💬</div>
              <div className="font-bold text-gray-900 mb-1 text-sm">
                Имба, ничего не сказать. Грузанул файлик на 150 страниц,
                отработал хорошо. Спасибо!
              </div>
              <div className="text-gray-500 text-sm">Подпичик на YouTube</div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="mb-3 text-blue-500 text-2xl">💬</div>
              <div className="font-bold text-gray-900 mb-1 text-sm">
                Самый толковый иишник! Спасибо большое!
              </div>
              <div className="text-gray-500 text-sm">Подпичик на YouTube</div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="mb-3 text-blue-500 text-2xl">💬</div>
              <div className="font-bold text-gray-900 mb-1 text-sm">
                Видео крутое. Вот это я понимаю - прямо на пальцах и узнать за
                каких-то полчаса очень полезную штуку сделать для бизнеса.
              </div>
              <div className="text-gray-500 text-sm">Подпичик на YouTube</div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="mb-3 text-blue-500 text-2xl">💬</div>
              <div className="font-bold text-gray-900 mb-1 text-sm">
                Ролики очень высокого уровня, все четко и без ошибок!
              </div>
              <div className="text-gray-500 text-sm">Подпичик на YouTube</div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="mb-3 text-blue-500 text-2xl">💬</div>
              <div className="font-bold text-gray-900 mb-1 text-sm">
                Огромное спасибо за шаблоны и видео, всё доступно рассказано.
              </div>
              <div className="text-gray-500 text-sm">Подпичик на YouTube</div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="mb-3 text-blue-500 text-2xl">💬</div>
              <div className="font-bold text-gray-900 mb-1 text-sm">
                Сразу заметно качество контента когда человек понимает всю
                картину целиком.{" "}
              </div>
              <div className="text-gray-500 text-sm">Подпичик на YouTube</div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="mb-3 text-blue-500 text-2xl">💬</div>
              <div className="font-bold text-gray-900 mb-1 text-sm">
                Огромное спасибо за шаблон! Пробовал собрать сам, но выходила
                ошибка. И только когда скачал шаблон, понял, где я ошибся!
                Update для RAG - это крутяк!
              </div>
              <div className="text-gray-500 text-sm">Подпичик на YouTube</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
