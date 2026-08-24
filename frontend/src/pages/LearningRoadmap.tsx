import React, { useState } from 'react';
import { initialRoadmap } from '../data/mockData';
import { StageLearningView } from '../components/StageLearningView';
import { RoadmapPhase } from '../types';
import {
  Map,
  Sparkles,
  Trophy,
  FastForward,
  Award,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Zap,
  BookOpen,
  Code,
  Rocket
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LearningRoadmap: React.FC = () => {
  const [selectedStageId, setSelectedStageId] = useState<number>(1); // Default to Stage 1: Python
  const [knowledgeScore, setKnowledgeScore] = useState<number>(72);

  const stageThumbnails = [
    {
      id: 1,
      code: '01',
      title: 'Python & Programming',
      icon: '🐍',
      progress: 80,
      status: 'Almost Mastered',
      imageUrl:
        'https://images.openai.com/static-rsc-4/qi_WWRaeeVgt1fyQyBG6HgRp3UH0B0R6DryZAV8LL5O2ebVoUSMRsg5_NOrW5cjvoqyNny89kqAwyjau84afqSM_yI1Y8BsjpHexAMl53z6lpPoDgroxuK6j_yAIn8OmFT68aSXCnlackyZ1zgFnWkTNTsR9PqK-PuPJCE_jyVxf1-TI0Pb1196jpRUNQXs7?purpose=fullsize'
    },
    {
      id: 2,
      code: '02',
      title: 'Mathematics & Statistics',
      icon: '📐',
      progress: 65,
      status: 'In Progress',
      imageUrl:
        'https://images.openai.com/static-rsc-4/SDaD0wgXYyL9dpK4jWJ8EdRSBP05SGUTfFFcIGHsbFLphi7MdXNGq1sEC9d21eOknlCC4JTLnkwK86BupNiY1LeForQ470iJqlIPJaN3ssBh9WhFH7CXu7UJwHE7pAHQjkvpCJ6QFUKMfmbM-LaQYa_Buh42uZqav31mfEPZzdwf2m1bGC2tb6yh1q_Y5DzC?purpose=fullsize'
    },
    {
      id: 3,
      code: '03',
      title: 'Machine Learning',
      icon: '📊',
      progress: 60,
      status: 'In Progress',
      imageUrl:
        'https://images.openai.com/static-rsc-4/eXgq3-3uiyNd5kSt83eKKs3lbcxiMX3WedUn-voFBfEMIYxJRO0sxkCsfEspyKQuuLskuDnvgcgAejl2dPmPVxM-MdqFaQQrjWT0ol9-NcdfU6Vt-et6_y3dd_wMavsWcfSjYG7sv__HpDKqzzcmYJjwzIFAOAizE51v5Pzt7XUHLd_HH-HHFRmjawDtskOO?purpose=fullsize'
    },
    {
      id: 4,
      code: '04',
      title: 'Deep Learning',
      icon: '🧠',
      progress: 48,
      status: 'Priority Gap',
      imageUrl:
        'https://images.openai.com/static-rsc-4/YJ3Ya3dS4JhRly-JPKwr7s_VfVr42F2nrSmbwPtrSPF1VVH51hKlIVPNA7-Yx9A6d1qfv0v6W0rvWXCpfPNToqRajdhDDMSJ7h-RIiB-97FZ5fNv75Z54XOGCM0aTAKGh5EiyP4cJbAvWK-2WSNuZs_dzu62wH6jlHaGt4MxdQ4hs4xqPsNMAgt-t7rlJ7oq?purpose=fullsize'
    },
    {
      id: 5,
      code: '05',
      title: 'NLP & Computer Vision',
      icon: '🔤',
      progress: 65,
      status: 'Upcoming',
      imageUrl:
        'https://images.openai.com/static-rsc-4/EANigXqC_J7XQY-m_OAZ6ZzNgjbyVuLf8rKTX3m050MNiTLTzeh33-WEE_Rr3sJoFeHWKbmbKg-dsbhcXzzY38JVeomWtMu8vvnRO_E1XoKHuXtkA9oVsgWmOMSGHwgsCDA_760i1zDxtBdSX1rFH6Ge6Af8OhXGUGwmKRGoig_ku_apDlTf7WJVAEFp9vhg?purpose=fullsize'
    },
    {
      id: 6,
      code: '06',
      title: 'Transformers',
      icon: '⚡',
      progress: 70,
      status: 'Upcoming',
      imageUrl:
        'https://images.openai.com/static-rsc-4/vYND5sgbADTAKuA2ORJPABGnaHyV2HNjhjiTXrPsQos3G-pMZQ7i-aJ1nVu6QnhoFIAOkNJTUv358mp81aIK6SSjkZdCIa5HegUmVeGCSCH9BTZl2tDHkvB0kNymYxdhmwGjLFIjS4Gvc2AFYRUYbqw4TW0DMV37vbACeUWyngQLZmAUxknJcfD_9_QiT2_4?purpose=fullsize'
    },
    {
      id: 7,
      code: '07',
      title: 'LLM Engineering',
      icon: '🤖',
      progress: 78,
      status: 'Upcoming',
      imageUrl:
        'https://images.openai.com/static-rsc-4/WYykrp6dJxcZ4HYyWjyZ6sV84yGTcI2YaJr7BFoQAs4tltEXxncwmzfgUDs0j0mXnvmaEl9HezilGTlRRBv3wrClUQkDkbEXpby3c7wxhDH2LUnfS1Yzibf-TWl-2A2Lnb5Ja0DDUO4ANf3LkCYyps-S8x8YSS7ghkQGCBFrhV3-ePrKOZ4B5e0uHzAqk91g?purpose=fullsize'
    },
    {
      id: 8,
      code: '08',
      title: 'RAG Engineering',
      icon: '🔎',
      progress: 82,
      status: 'Upcoming',
      imageUrl:
        'https://images.openai.com/static-rsc-4/2VFt2zcWjP77K5djvaHoabE0GKB1Ymyt20xoEgVROjwyqqMC8LI28N7tInBtMY5mRgqCpv4c9yK-4JoQQ8B7R_9drLmR9ROxdM8Q44if0x64MrFe8J_pNdzknP2nMzhM9alg-iTOLWeq_xGzwP6Rjzr-OlUUlVaXDbeMt1-j5q9L4dAGmbTfnFaFwiOsoXx5?purpose=fullsize'
    },
    {
      id: 9,
      code: '09',
      title: 'Agentic AI',
      icon: '🕸️',
      progress: 72,
      status: 'Upcoming',
      imageUrl:
        'https://images.openai.com/static-rsc-4/giQw5eazZ-ZJnjy8etV17Lu7jWsTGVAWEELzYB1nh83Dj2MhkibmpyAjV1hJ607eSwboS-JuN6MpXNHtBHcFFqWqn1GIdztuba1kZWLQpqntyAQnYg2yuiToKIzQCNvNsFIFbFGkIZBltT-h84vYEhadfT2Rq4cB76QN0VWXf5HeWfCFhJnPiEGZphXasiKg?purpose=fullsize'
    },
    {
      id: 10,
      code: '10',
      title: 'MLOps',
      icon: '🚀',
      progress: 35,
      status: 'Priority Gap',
      imageUrl:
        'https://images.openai.com/static-rsc-4/3EIrut8xqb2lLZ9McA4SVL4r-9FScTqcUrbni7lEoBqaisTcirQlCPrRFfrlnYxEl2Jkq_rPiurBat7FzlU_Q86N-dAOhub5R3VyNRUupQjtZPJV8QUQyszjYxc-5zfSbjB-08SgZHBXysSuuE8WEl-NgXkk5drTIt7v8Yrp-eid3VYG30Cze8UtP18ktm9j?purpose=fullsize'
    },
    {
      id: 11,
      code: '11',
      title: 'AI System Design',
      icon: '🏗️',
      progress: 40,
      status: 'Upcoming',
      imageUrl:
        'https://images.openai.com/static-rsc-4/omYS3Tn61k75Hxsl72tIF0JEUUyxNdTqRTZoSOs-ZJHxBJS-hoILMdVBdXbkhLmJovXLqn9ca2fZXdAOuwXuxlIyTJatoQlZqE504me-da9tFvTxKWjzSkMCWU-AUQIP_aPv6lb2xdBbNeZPbYNBc_kTvNqQDyN32zpXFESr-ZknuKFwuXyvHwZAi4RMWKHPX?purpose=fullsize'
    },
    {
      id: 12,
      code: '12',
      title: 'AI/ML Engineer Destination',
      icon: '🏆',
      progress: 82,
      status: 'Destination',
      imageUrl:
        'https://images.openai.com/static-rsc-4/98SYmdqrXxwS79flTFui-3h_839-lYbZTqWUvtYPVLyQRVoBjVpA7K9k0dPpgdI5Nux5uDO4F4_XlO8cgL3r81zwAsESuB8VcZsw5_7C5ZahKsCSAw1WkoJTBLXix_7SVYmWSYWN5_-tPSQesgMQDLAuxyvvH7WKfp5-enshOt2lcv0_X1eUoGCfkXJGpc-x?purpose=fullsize'
    }
  ];

  const activeStageData = initialRoadmap.find((p) => p.id === selectedStageId) || initialRoadmap[0];

  const handleUpdateScore = (pts: number) => {
    setKnowledgeScore((prev) => Math.min(100, prev + pts));
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white p-6 sm:p-8 lg:p-10 max-w-[1800px] w-full mx-auto space-y-8 select-none">
      {/* Header with Knowledge Score Badge & Overall Progress */}
      <div className="glass-panel-glow p-6 sm:p-8 rounded-3xl border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-4 max-w-2xl relative z-10">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>IMAGE-DRIVEN AI/ML ROADMAP</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300 font-bold">
              My Knowledge {knowledgeScore}%
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            AI/ML Engineer <span className="text-gradient-gold">Roadmap</span>
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Your personalized path from your current skills to becoming an AI/ML Engineer. Click any image thumbnail below to enter its dedicated learning sub-page.
          </p>

          {/* Overall Progress Bar */}
          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 font-semibold">Overall Completion Progress</span>
              <span className="text-amber-400 font-bold">32% • 4/12 Stages Complete</span>
            </div>
            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-700">
              <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-cyan-400 h-full rounded-full w-[32%]" />
            </div>
          </div>
        </div>

        {/* Hero Journey Illustration Header */}
        <div className="relative z-10 w-full md:w-80 h-48 rounded-2xl overflow-hidden border border-amber-500/30 shadow-xl shrink-0">
          <img
            src="https://images.openai.com/static-rsc-4/fEUdeu-_mvx55nKjwalW1E4gaT9Fabis62JGRtNCz9UlEyhI4K3nmh_0FigMP5rpqZ-8UosryMbdQDTWh3gjfJAmzAHmNYkNA_tcJmE2QgPTnO1VWQD7nJL-EVH5wdCmLiCbTeI5OjTjxioFwLYa9AdtZWVXHZZdEkVoOMFHsgt2azBbhmDryB2FZqDQ676t?purpose=fullsize"
            alt="AI Engineer Journey"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent p-3 flex items-end">
            <span className="text-[11px] font-bold text-amber-300 font-mono">
              Your Journey to AI/ML Engineering
            </span>
          </div>
        </div>
      </div>

      {/* 🖼️ Image Stage Tabs Showcase Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Map className="w-5 h-5 text-amber-400" />
            <span>Explore Your Roadmap (Click Image to Open Dedicated Page)</span>
          </h2>
          <span className="text-xs font-mono text-slate-400">12 Visual Stage Entry Points</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {stageThumbnails.map((item) => {
            const isSelected = selectedStageId === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedStageId(item.id)}
                className={`relative group rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer flex flex-col justify-between h-44 select-none ${
                  isSelected
                    ? 'border-amber-400 ring-2 ring-amber-400/50 shadow-xl shadow-amber-500/20 scale-[1.03]'
                    : 'border-slate-800 hover:border-slate-600 bg-slate-900'
                }`}
              >
                {/* Thumbnail Image */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-60 group-hover:opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/40 to-transparent" />

                {/* Top Badge */}
                <div className="relative z-10 p-2 flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full bg-[#0B0F19]/80 border border-slate-700 text-[10px] font-mono font-bold text-amber-400">
                    {item.code} {item.icon}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-amber-400 shadow-md animate-pulse" />
                  )}
                </div>

                {/* Bottom Details */}
                <div className="relative z-10 p-3 space-y-1">
                  <h4 className="text-xs font-extrabold text-white leading-tight drop-shadow-md">
                    {item.title}
                  </h4>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-300 pt-1">
                    <span>{item.progress}%</span>
                    <span
                      className={`font-bold ${
                        item.progress >= 80
                          ? 'text-emerald-400'
                          : item.progress >= 60
                          ? 'text-amber-400'
                          : 'text-slate-400'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 📖 Selected Stage Dedicated Sub-Page (StageLearningView) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedStageId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <StageLearningView stage={activeStageData} onUpdateScore={handleUpdateScore} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
