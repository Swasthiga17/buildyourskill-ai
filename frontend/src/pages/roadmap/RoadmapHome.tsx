import React from 'react';
import { Link } from 'react-router-dom';
import { Map, Lock, Sprout, ArrowRight } from 'lucide-react';

export const RoadmapHome: React.FC = () => {
  const stages = [
    {
      id: 'python',
      code: '01',
      title: 'Python & Programming',
      path: '/study/python',
      icon: '🐍',
      progress: 85,
      status: 'Skipped ✓ (Mastered)',
      isUnlocked: true,
      imageUrl:
        'https://images.openai.com/static-rsc-4/qi_WWRaeeVgt1fyQyBG6HgRp3UH0B0R6DryZAV8LL5O2ebVoUSMRsg5_NOrW5cjvoqyNny89kqAwyjau84afqSM_yI1Y8BsjpHexAMl53z6lpPoDgroxuK6j_yAIn8OmFT68aSXCnlackyZ1zgFnWkTNTsR9PqK-PuPJCE_jyVxf1-TI0Pb1196jpRUNQXs7?purpose=fullsize'
    },
    {
      id: 'math',
      code: '02',
      title: 'Mathematics & Statistics',
      path: '/study/math',
      icon: '📐',
      progress: 65,
      status: 'In Progress',
      isUnlocked: true,
      imageUrl:
        'https://images.openai.com/static-rsc-4/SDaD0wgXYyL9dpK4jWJ8EdRSBP05SGUTfFFcIGHsbFLphi7MdXNGq1sEC9d21eOknlCC4JTLnkwK86BupNiY1LeForQ470iJqlIPJaN3ssBh9WhFH7CXu7UJwHE7pAHQjkvpCJ6QFUKMfmbM-LaQYa_Buh42uZqav31mfEPZzdwf2m1bGC2tb6yh1q_Y5DzC?purpose=fullsize'
    },
    {
      id: 'ml',
      code: '03',
      title: 'Machine Learning',
      path: '/study/ml',
      icon: '📊',
      progress: 60,
      status: 'Active Focus ⚡',
      isUnlocked: true,
      imageUrl:
        'https://images.openai.com/static-rsc-4/eXgq3-3uiyNd5kSt83eKKs3lbcxiMX3WedUn-voFBfEMIYxJRO0sxkCsfEspyKQuuLskuDnvgcgAejl2dPmPVxM-MdqFaQQrjWT0ol9-NcdfU6Vt-et6_y3dd_wMavsWcfSjYG7sv__HpDKqzzcmYJjwzIFAOAizE51v5Pzt7XUHLd_HH-HHFRmjawDtskOO?purpose=fullsize'
    },
    {
      id: 'dl',
      code: '04',
      title: 'Deep Learning',
      path: '/study/dl',
      icon: '🧠',
      progress: 48,
      status: 'Priority Gap',
      isUnlocked: true,
      imageUrl:
        'https://images.openai.com/static-rsc-4/YJ3Ya3dS4JhRly-JPKwr7s_VfVr42F2nrSmbwPtrSPF1VVH51hKlIVPNA7-Yx9A6d1qfv0v6W0rvWXCpfPNToqRajdhDDMSJ7h-RIiB-97FZ5fNv75Z54XOGCM0aTAKGh5EiyP4cJbAvWK-2WSNuZs_dzu62wH6jlHaGt4MxdQ4hs4xqPsNMAgt-t7rlJ7oq?purpose=fullsize'
    },
    {
      id: 'nlp-cv',
      code: '05',
      title: 'NLP & Computer Vision',
      path: '/study/nlp-cv',
      icon: '🔤',
      progress: 65,
      status: 'Upcoming',
      isUnlocked: false,
      imageUrl:
        'https://images.openai.com/static-rsc-4/EANigXqC_J7XQY-m_OAZ6ZzNgjbyVuLf8rKTX3m050MNiTLTzeh33-WEE_Rr3sJoFeHWKbmbKg-dsbhcXzzY38JVeomWtMu8vvnRO_E1XoKHuXtkA9oVsgWmOMSGHwgsCDA_760i1zDxtBdSX1rFH6Ge6Af8OhXGUGwmKRGoig_ku_apDlTf7WJVAEFp9vhg?purpose=fullsize'
    },
    {
      id: 'transformers',
      code: '06',
      title: 'Transformers',
      path: '/study/transformers',
      icon: '⚡',
      progress: 70,
      status: 'Upcoming',
      isUnlocked: false,
      imageUrl:
        'https://images.openai.com/static-rsc-4/vYND5sgbADTAKuA2ORJPABGnaHyV2HNjhjiTXrPsQos3G-pMZQ7i-aJ1nVu6QnhoFIAOkNJTUv358mp81aIK6SSjkZdCIa5HegUmVeGCSCH9BTZl2tDHkvB0kNymYxdhmwGjLFIjS4Gvc2AFYRUYbqw4TW0DMV37vbACeUWyngQLZmAUxknJcfD_9_QiT2_4?purpose=fullsize'
    },
    {
      id: 'llms',
      code: '07',
      title: 'LLM Engineering',
      path: '/study/llms',
      icon: '🤖',
      progress: 78,
      status: 'Upcoming',
      isUnlocked: false,
      imageUrl:
        'https://images.openai.com/static-rsc-4/WYykrp6dJxcZ4HYyWjyZ6sV84yGTcI2YaJr7BFoQAs4tltEXxncwmzfgUDs0j0mXnvmaEl9HezilGTlRRBv3wrClUQkDkbEXpby3c7wxhDH2LUnfS1Yzibf-TWl-2A2Lnb5Ja0DDUO4ANf3LkCYyps-S8x8YSS7ghkQGCBFrhV3-ePrKOZ4B5e0uHzAqk91g?purpose=fullsize'
    },
    {
      id: 'rag',
      code: '08',
      title: 'RAG Engineering',
      path: '/study/rag',
      icon: '🔎',
      progress: 82,
      status: 'Upcoming',
      isUnlocked: false,
      imageUrl:
        'https://images.openai.com/static-rsc-4/2VFt2zcWjP77K5djvaHoabE0GKB1Ymyt20xoEgVROjwyqqMC8LI28N7tInBtMY5mRgqCpv4c9yK-4JoQQ8B7R_9drLmR9ROxdM8Q44if0x64MrFe8J_pNdzknP2nMzhM9alg-iTOLWeq_xGzwP6Rjzr-OlUUlVaXDbeMt1-j5q9L4dAGmbTfnFaFwiOsoXx5?purpose=fullsize'
    },
    {
      id: 'agents',
      code: '09',
      title: 'Agentic AI',
      path: '/study/agents',
      icon: '🕸️',
      progress: 72,
      status: 'Upcoming',
      isUnlocked: false,
      imageUrl:
        'https://images.openai.com/static-rsc-4/giQw5eazZ-ZJnjy8etV17Lu7jWsTGVAWEELzYB1nh83Dj2MhkibmpyAjV1hJ607eSwboS-JuN6MpXNHtBHcFFqWqn1GIdztuba1kZWLQpqntyAQnYg2yuiToKIzQCNvNsFIFbFGkIZBltT-h84vYEhadfT2Rq4cB76QN0VWXf5HeWfCFhJnPiEGZphXasiKg?purpose=fullsize'
    },
    {
      id: 'mlops',
      code: '10',
      title: 'MLOps',
      path: '/study/mlops',
      icon: '🚀',
      progress: 35,
      status: 'Priority Gap',
      isUnlocked: false,
      imageUrl:
        'https://images.openai.com/static-rsc-4/3EIrut8xqb2lLZ9McA4SVL4r-9FScTqcUrbni7lEoBqaisTcirQlCPrRFfrlnYxEl2Jkq_rPiurBat7FzlU_Q86N-dAOhub5R3VyNRUupQjtZPJV8QUQyszjYxc-5zfSbjB-08SgZHBXysSuuE8WEl-NgXkk5drTIt7v8Yrp-eid3VYG30Cze8UtP18ktm9j?purpose=fullsize'
    },
    {
      id: 'system-design',
      code: '11',
      title: 'AI System Design',
      path: '/study/system-design',
      icon: '🏗️',
      progress: 40,
      status: 'Upcoming',
      isUnlocked: false,
      imageUrl:
        'https://images.openai.com/static-rsc-4/omYS3Tn61k75Hxsl72tIF0JEUyxNdTqRTZoSOs-ZJHxBJS-hoILMdVBdXbkhLmJovXLqn9ca2fZXdAOuwXuxlIyTJatoQlZqE504me-da9tFvTxKWjzSkMCWU-AUQIP_aPv6lb2xdBbNeZPbYNBc_kTvNqQDyN32zpXFESr-ZknuKFwuXyvHwZAi4RMWKHPX?purpose=fullsize'
    },
    {
      id: 'career',
      code: '12',
      title: 'AI/ML Engineer Career',
      path: '/study/career',
      icon: '🏆',
      progress: 82,
      status: 'Destination',
      isUnlocked: false,
      imageUrl:
        'https://images.openai.com/static-rsc-4/98SYmdqrXxwS79flTFui-3h_839-lYbZTqWUvtYPVLyQRVoBjVpA7K9k0dPpgdI5Nux5uDO4F4_XlO8cgL3r81zwAsESuB8VcZsw5_7C5ZahKsCSAw1WkoJTBLXix_7SVYmWSYWN5_-tPSQesgMQDLAuxyvvH7WKfp5-enshOt2lcv0_X1eUoGCfkXJGpc-x?purpose=fullsize'
    }
  ];

  return (
    <div className="space-y-10 select-none text-slate-900">
      {/* Visual Roadmap Header */}
      <div className="glass-panel-glow p-8 sm:p-10 rounded-3xl border border-emerald-300 space-y-6 bg-white/90 backdrop-blur-md shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-mono font-black tracking-wider">
              <Sprout className="w-4 h-4 text-emerald-600" />
              <span>AI/ML ROADMAP GRAPH</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-xs font-mono text-amber-900 font-bold">
              12 Stages Timeline
            </span>
          </div>

          <Link
            to="/study"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-emerald-600 to-blue-600 text-white font-black text-xs inline-flex items-center space-x-1.5 shadow-md hover:scale-105 transition-all"
          >
            <span>Open Study Preparation Hub</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight">
            AI/ML Engineer <span className="text-gradient-emerald">Roadmap</span>
          </h1>
          <p className="text-base text-slate-700 font-sans font-medium">
            Personalized 12-stage adaptive skill graph. Click any unlocked stage to open its step-by-step preparation notes.
          </p>
        </div>

        {/* Overall Progress Meter */}
        <div className="p-5 rounded-2xl bg-white/80 border border-emerald-200 space-y-3 font-mono">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-800 font-bold">Overall Progress: 38%</span>
            <span className="text-emerald-700 font-black">4 / 12 Stages Mastered</span>
          </div>
          <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden p-0.5 border border-slate-200">
            <div className="bg-gradient-to-r from-amber-400 via-emerald-500 to-blue-600 h-full rounded-full w-[38%]" />
          </div>
        </div>
      </div>

      {/* 🖼️ Pure Visual 12-Stage Roadmap Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-3">
            <Map className="w-6 h-6 text-emerald-600" />
            <span>AI/ML ENGINEER STAGE GRAPH</span>
          </h2>
          <span className="text-xs font-mono text-slate-600 font-bold">12 Visual Stage Cards</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stages.map((stage) => (
            <Link
              key={stage.id}
              to={stage.isUnlocked ? stage.path : '#locked'}
              className={`relative group rounded-3xl overflow-hidden border transition-all duration-300 cursor-pointer flex flex-col justify-between h-64 select-none bg-white/90 backdrop-blur-md shadow-md ${
                stage.isUnlocked
                  ? 'border-emerald-300 hover:border-emerald-500 hover:scale-[1.03] hover:shadow-xl'
                  : 'border-slate-200/60 opacity-60 cursor-not-allowed'
              }`}
            >
              <img
                src={stage.imageUrl}
                alt={stage.title}
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ${
                  stage.isUnlocked ? 'opacity-85 group-hover:opacity-100 group-hover:scale-110' : 'opacity-30 blur-[1px]'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />

              <div className="relative z-10 p-4 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-white/95 border border-emerald-300 text-xs font-mono font-black text-emerald-700 shadow-sm">
                  {stage.code} {stage.icon}
                </span>
                {!stage.isUnlocked ? (
                  <span className="px-3 py-1 rounded-full bg-white/90 border border-slate-300 text-xs font-mono text-slate-600 flex items-center space-x-1.5 font-bold shadow-sm">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Locked</span>
                  </span>
                ) : (
                  <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-lg animate-pulse" />
                )}
              </div>

              <div className="relative z-10 p-5 space-y-2">
                <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug drop-shadow-sm group-hover:text-emerald-700 transition-colors">
                  {stage.title}
                </h3>
                <div className="flex items-center justify-between text-xs font-mono text-slate-800 pt-2 border-t border-slate-200">
                  <span className="font-bold">{stage.progress}% Mastered</span>
                  <span
                    className={`font-black ${
                      !stage.isUnlocked ? 'text-slate-500' : 'text-emerald-700'
                    }`}
                  >
                    {!stage.isUnlocked ? 'Locked 🔒' : stage.status}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
