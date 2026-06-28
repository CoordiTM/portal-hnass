import React, { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import SystemCard from './components/SystemCard';
import AdminPanel from './components/AdminPanel';
import { getAllSystems, getDefaultSystems } from './services/dbService';

export default function App() {
  const [systems, setSystems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    loadSystems();
  }, []);

  const loadSystems = async () => {
    try {
      const data = await getAllSystems();
      if (data.length === 0) {
        const defaults = getDefaultSystems();
        setSystems(defaults);
      } else {
        setSystems(data);
      }
    } catch (error) {
      console.error('Error cargando sistemas:', error);
      setSystems(getDefaultSystems());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

      {/* Admin Button */}
      <button
        onClick={() => setShowAdmin(true)}
        className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full glass-dark text-white/70 hover:text-white flex items-center justify-center transition-all hover:scale-110"
        title="Panel Admin"
      >
        <Settings size={18} />
      </button>

      {/* Admin Panel Modal */}
      {showAdmin && (
        <AdminPanel
          onClose={() => setShowAdmin(false)}
          onSystemsUpdate={loadSystems}
        />
      )}

      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-cyan-500/10"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight">
            Portal de Tecnólogos Médicos
            <span className="block text-indigo-600">en Radiología</span>
          </h1>
          <div className="space-y-1">
            <p className="text-slate-500 text-lg">
              Hospital Nacional Alberto Sabogal Sologuren
            </p>
            <p className="text-slate-400 text-base">
              Servicio de Radiodiagnóstico y Ecografía
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8 pb-20">

        {loading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-400">Cargando sistemas...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {systems.map((system, index) => (
                <SystemCard key={system.id} system={system} index={index} />
              ))}
            </div>

            {systems.length === 0 && (
              <div className="text-center py-20">
                <p className="text-slate-400 text-lg">No hay sistemas configurados</p>
                <p className="text-slate-300 text-sm mt-2">Usa el panel admin para agregar sistemas</p>
              </div>
            )}

            <div className="mt-12 text-center">
              <p className="text-slate-400 text-sm">Más sistemas próximamente...</p>
            </div>
          </>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/60 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center">
          <p className="text-slate-400 text-sm">Todos los derechos reservados — Desarrollado por Flurolab Academy</p>
        </div>
      </footer>

    </div>
  );
}
