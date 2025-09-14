"use client";

import Image from "next/image";
import PlanetImg from "@/public/images/planet.png";
import PlanetOverlayImg from "@/public/images/planet-overlay.svg";
import PlanetTagImg01 from "@/public/images/planet-tag-01.png";
import PlanetTagImg02 from "@/public/images/planet-tag-02.png";
import PlanetTagImg03 from "@/public/images/planet-tag-03.png";
import PlanetTagImg04 from "@/public/images/planet-tag-04.png";
import FAgents from "@/public/images/f-agents.png";
import FAssistant from "@/public/images/f-assistant.png";
import FData from "@/public/images/f-data.png";
import FIntegration from "@/public/images/f-integrations.png";
import FModels from "@/public/images/f-models.png";
import FSearch from "@/public/images/f-search.png";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Для Next.js используйте переменные окружения с префиксом NEXT_PUBLIC_
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Реальные иконки из public/images
const techs = [
  { name: "Pydantic AI", icon: "/images/logo-01.svg" },
  { name: "n8n", icon: "/images/logo-02.svg" },
  { name: "LangGraph", icon: "/images/logo-03.svg" },
  { name: "Model Context Protocol", icon: "/images/logo-04.svg" },
  { name: "Docker", icon: "/images/logo-05.svg" },
  { name: "React", icon: "/images/logo-06.svg" },
  { name: "Supabase", icon: "/images/logo-07.svg" },
  { name: "Stripe", icon: "/images/logo-08.svg" },
];
const ides = [
  { name: "Cursor", icon: "/images/logo-01.svg" },
  { name: "Windsurf", icon: "/images/logo-02.svg" },
  { name: "Cline", icon: "/images/logo-03.svg" },
  { name: "Roo Code", icon: "/images/logo-04.svg" },
];
const llms = [
  { name: "OpenAI", icon: "/images/logo-05.svg" },
  { name: "Claude", icon: "/images/logo-06.svg" },
  { name: "Qwen", icon: "/images/logo-07.svg" },
  { name: "Mistral", icon: "/images/logo-08.svg" },
];

export default function Features() {
  return (
    <section className="relative bg-white before:hidden">
      
      {/* Course Curriculum Section */}
      <section className="relative bg-white py-12 md:py-20 border-t border-slate-100">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center mb-10">
            <h3 className="text-3xl font-bold mb-6 border-y [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-300/.8),transparent)1]">
              Из чего состоит{" "}
              <span className="text-blue-400">Pro-сообщество</span>
            </h3>
            <p
              className="mb-8 text-lg text-gray-700"
              data-aos="zoom-y-out"
              data-aos-delay={300}
            >
              Огромное количество материалов доступно сразу при вступлении в
              сообщество. Ещё больше материалов будут выходить по мере готовности.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Module 1 */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold bg-green-100 text-green-600 rounded px-2 py-0.5">
                  Доступно при вступлении
                </span>
              </div>
              <div className="font-bold text-lg mb-1">
                Экспертные инструкции
              </div>
              <div className="text-gray-600 text-sm">
                Изучите основы AI-агентов и получите общее представление об
                автоматизациях.
              </div>
            </div>
            {/* Module 2 */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold bg-green-100 text-green-600 rounded px-2 py-0.5">
                  Доступно при вступлении
                </span>
              </div>
              <div className="font-bold text-lg mb-1">Экспертное общение</div>
              <div className="text-gray-600 text-sm">
                Участвуйте в дискуссиях с участниками и экспертами в области ИИ.
              </div>
            </div>
            {/* Module 3 */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold bg-green-100 text-green-600 rounded px-2 py-0.5">
                  Доступно при вступлении
                </span>
              </div>
              <div className="font-bold text-lg mb-1">
                Создание AI-агентов в n8n
              </div>
              <div className="text-gray-600 text-sm">
                Создавайте прототипы AI-агентов с помощью n8n — платформы
                no-code автоматизации.
              </div>
            </div>
            {/* Module 4 */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold bg-green-100 text-green-600 rounded px-2 py-0.5">
                  Доступно при вступлении
                </span>
              </div>
              <div className="font-bold text-lg mb-1">
                Технические материалы
              </div>
              <div className="text-gray-600 text-sm">
                Настройте доступ из n8n к внешним сервисам и обратно.
              </div>
            </div>
            {/* Module 5 */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold bg-green-100 text-green-600 rounded px-2 py-0.5">
                  Доступно при вступлении
                </span>
              </div>
              <div className="font-bold text-lg mb-1">Комьюнити боты</div>
              <div className="text-gray-600 text-sm">
                Получите доступ к автоматизациям, созданными участниками
                сообщества.
              </div>
            </div>
            {/* Module 6 */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold bg-green-100 text-green-600 rounded px-2 py-0.5">
                  Доступно при вступлении
                </span>
              </div>
              <div className="font-bold text-lg mb-1">Pro-боты</div>
              <div className="text-gray-600 text-sm">
                Пользуйтесь автоматизациями, созданными основателями сообщества.
              </div>
            </div>
            {/* Module 7 */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold bg-yellow-100 text-yellow-700 rounded px-2 py-0.5">
                  Скоро
                </span>
              </div>
              <div className="font-bold text-lg mb-1">n8n для новичков</div>
              <div className="text-gray-600 text-sm">
                Изучите n8n с нуля и постройте свою первую автоматизацию.
              </div>
            </div>
            {/* Module 8 */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold bg-yellow-100 text-yellow-700 rounded px-2 py-0.5">
                  Скоро
                </span>
              </div>
              <div className="font-bold text-lg mb-1">RAG для новичков</div>
              <div className="text-gray-600 text-sm">
                Узнайте основы и стратегии RAG, а также освойте векторые БД.
              </div>
            </div>
            {/* Module 9 */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold bg-yellow-100 text-yellow-700 rounded px-2 py-0.5">
                  Скоро
                </span>
              </div>
              <div className="font-bold text-lg mb-1">
                Локальные ИИ-автоматизации для новичков
              </div>
              <div className="text-gray-600 text-sm">
                Узнайте, как развернуть автоматизации на собственном компьютере
                по шагам.
              </div>
            </div>
            {/* Module 10 */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col col-span-1 sm:col-span-2 md:col-span-3 items-center">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold bg-green-100 text-green-600 rounded px-2 py-0.5">
                  Доступно при вступлении
                </span>
              </div>
              <div className="font-bold text-lg mb-1">Бонусные материалы</div>
              <div className="text-gray-600 text-sm text-center max-w-md">
                Дополнительные гайды и техники для прокачки ваших AI-навыков от сообщества.
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Community Materials Section */}
      <section className="relative bg-white py-12 md:py-20 border-t border-slate-100">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center mb-10">
            <h3 className="text-3xl font-bold mb-6 border-y [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-300/.8),transparent)1]">
              Материалы сообщества,{" "}
              <span className="text-blue-400">
                доступные <br />
                уже сегодня
              </span>
            </h3>
            <p
              className="mb-8 text-lg text-gray-700"
              data-aos="zoom-y-out"
              data-aos-delay={300}
            >
              Откройте для себя всю базу знаний, собранную участниками и
              экспертами сообщества. Все материалы доступны после покупки
              доступа.
            </p>
          </div>
          {/* Получение и отображение данных из Supabase */}
          {(() => {
            const [materials, setMaterials] = useState<any[]>([]);
            const [loading, setLoading] = useState(true);

            useEffect(() => {
              async function fetchLinks() {
                const { data, error } = await supabase
                  .from("ii_pro_navigation")
                  .select("id, created_at, name, category");
                if (!error && data) setMaterials(data);
                setLoading(false);
              }
              fetchLinks();
            }, []);

            // Группировка по категориям
            const grouped = materials.reduce((acc: any, item: any) => {
              if (!item.category) return acc;
              if (!acc[item.category]) acc[item.category] = [];
              acc[item.category].push(item);
              return acc;
            }, {});

            if (loading) {
              return (
                <div className="text-center text-gray-500 py-10">
                  Загрузка материалов…
                </div>
              );
            }
            if (!materials.length) {
              return (
                <div className="text-center text-gray-500 py-10">
                  Материалы не найдены.
                </div>
              );
            }
            return Object.entries(grouped).map(
              ([category, items]: [string, any]) => (
                <div key={category} className="mb-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-semibold text-blue-600">
                      {category}
                    </span>
                    <span className="text-xs font-semibold bg-slate-100 text-slate-700 rounded px-2 py-0.5">
                      {(items as any[]).length} материалов
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {(items as any[]).map((item) => (
                      <div
                        key={item.id}
                        className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col h-full"
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <span className="text-xs bg-blue-50 text-blue-500 rounded px-2 py-0.5">
                            {item.created_at
                              ? new Date(item.created_at).toLocaleDateString(
                                  "ru-RU",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )
                              : ""}
                          </span>
                        </div>
                        <div className="font-bold text-base text-slate-800 mb-1">
                          {item.name}
                        </div>
                        {/* Можно добавить краткое описание, если появится поле */}
                      </div>
                    ))}
                  </div>
                </div>
              )
            );
          })()}
        </div>
      </section>
    </section>
  );
}
