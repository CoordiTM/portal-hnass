import React from 'react';
import { TrendingUp, Monitor, FileText, ExternalLink } from 'lucide-react';

const iconMap = {
  TrendingUp,
  Monitor,
  FileText
};

const colorMap = {
  indigo: 'from-indigo-500 to-blue-600 shadow-indigo-500/30',
  cyan: 'from-cyan-500 to-teal-600 shadow-cyan-500/30',
  amber: 'from-amber-500 to-orange-600 shadow-amber-500/30',
  green: 'from-green-500 to-emerald-600 shadow-green-500/30',
  purple: 'from-purple-500 to-violet-600 shadow-purple-500/30',
  red: 'from-red-500 to-rose-600 shadow-red-500/30',
  pink: 'from-pink-500 to-rose-500 shadow-pink-500/30'
};

const buttonColorMap = {
  indigo: 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/25',
  cyan: 'bg-cyan-600 hover:bg-cyan-700 shadow-cyan-600/25',
  amber: 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/25',
  green: 'bg-green-600 hover:bg-green-700 shadow-green-600/25',
  purple: 'bg-purple-600 hover:bg-purple-700 shadow-purple-600/25',
  red: 'bg-red-600 hover:bg-red-700 shadow-red-600/25',
  pink: 'bg-pink-600 hover:bg-pink-700 shadow-pink-600/25'
};

export default function SystemCard({ system, index }) {
  const IconComponent = iconMap[system.icon] || ExternalLink;
  const colorClass = colorMap[system.color] || colorMap.indigo;
  const btnColor = buttonColorMap[system.color] || buttonColorMap.indigo;

  return (
    <div className={`animate-fade-in-up opacity-0 delay-${(index % 3) * 100}`}>
      <div className="card-hover glass rounded-2xl p-6 h-full flex flex-col shimmer cursor-pointer">
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center text-white mb-4 shadow-lg`}>
          <IconComponent size={28} />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">{system.name}</h3>
        <p className="text-slate-500 text-sm mb-6 flex-grow">{system.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">EsSalud</span>
          <a
            href={system.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-5 py-2.5 ${btnColor} text-white text-sm font-medium rounded-xl transition-colors shadow-lg`}
          >
            Ingresar →
          </a>
        </div>
      </div>
    </div>
  );
}
