"use client";

const missions = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    title: "병목 해결",
    description: "수작업/비효율 업무의 병목을 빠르게 파악하고 해결합니다. IT-현업 접점에서 시작해 전사적 문제를 발굴합니다.",
    color: "bg-[#00694D]",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "Low Cost, Max Efficiency",
    description: "최소 비용으로 최대 효율을 달성하는 MVP 솔루션을 설계하고 구현합니다.",
    color: "bg-[#008C66]",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "속도가 경쟁력",
    description: "빠른 프로토타이핑과 배포로 비즈니스 가치를 신속하게 창출합니다.",
    color: "bg-[#4A9B7F]",
  },
];

export default function Mission() {
  return (
    <section id="mission" className="py-20 px-4 md:px-6 lg:px-[30px] bg-zinc-50 dark:bg-zinc-900/50">
      <div className="max-w-[1280px] mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            AX 팀 미션
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            IT-현업 접점에서 시작해 전사로 AX 문화 확산
          </p>
        </div>

        {/* Mission cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-[30px]">
          {missions.map((mission) => (
            <div
              key={mission.title}
              className="group relative bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-700 hover:shadow-lg hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-300"
            >
              {/* Icon */}
              <div className={`w-14 h-14 ${mission.color} rounded-xl flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform`}>
                {mission.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">
                {mission.title}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {mission.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
