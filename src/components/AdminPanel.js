import React, { useState, useEffect } from 'react';
import { X, Plus, Edit2, Trash2, Save, TrendingUp, Monitor, FileText, ExternalLink, LayoutDashboard, Stethoscope, ClipboardList, Settings } from 'lucide-react';
import { getAllSystems, saveSystem, deleteSystem, getDefaultSystems } from '../services/dbService';

const ADMIN_KEY = 'Essalud2025*';

const availableIcons = [
  { name: 'TrendingUp', label: 'Gráfico', component: TrendingUp },
  { name: 'Monitor', label: 'Monitor', component: Monitor },
  { name: 'FileText', label: 'Documento', component: FileText },
  { name: 'ExternalLink', label: 'Link', component: ExternalLink },
  { name: 'LayoutDashboard', label: 'Dashboard', component: LayoutDashboard },
  { name: 'Stethoscope', label: 'Estetoscopio', component: Stethoscope },
  { name: 'ClipboardList', label: 'Portapapeles', component: ClipboardList },
  { name: 'Settings', label: 'Configuración', component: Settings }
];

const availableColors = [
  { value: 'indigo', label: 'Indigo' },
  { value: 'cyan', label: 'Cyan' },
  { value: 'amber', label: 'Amber' },
  { value: 'green', label: 'Verde' },
  { value: 'purple', label: 'Púrpura' },
  { value: 'red', label: 'Rojo' },
  { value: 'pink', label: 'Rosa' }
];

export default function AdminPanel({ onClose, onSystemsUpdate }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [systems, setSystems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSystem, setEditingSystem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    url: '',
    icon: 'TrendingUp',
    color: 'indigo',
    order: 0
  });

  useEffect(() => {
    loadSystems();
  }, []);

  const loadSystems = async () => {
    try {
      const data = await getAllSystems();
      if (data.length === 0) {
        const defaults = getDefaultSystems();
        for (const sys of defaults) {
          await saveSystem(sys);
        }
        setSystems(defaults);
      } else {
        setSystems(data);
      }
    } catch (error) {
      console.error('Error cargando sistemas:', error);
      const defaults = getDefaultSystems();
      setSystems(defaults);
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = () => {
    if (password === ADMIN_KEY) {
      setIsAuthenticated(true);
    } else {
      alert('❌ Clave incorrecta');
    }
  };

  const handleSave = async () => {
    if (!formData.name || !formData.url) {
      alert('❌ Nombre y URL son obligatorios');
      return;
    }
    try {
      await saveSystem({
        ...formData,
        id: editingSystem?.id || Date.now().toString()
      });
      await loadSystems();
      setShowForm(false);
      setEditingSystem(null);
      setFormData({ name: '', description: '', url: '', icon: 'TrendingUp', color: 'indigo', order: 0 });
      if (onSystemsUpdate) onSystemsUpdate();
    } catch (error) {
      alert('❌ Error guardando: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este sistema?')) return;
    try {
      await deleteSystem(id);
      await loadSystems();
      if (onSystemsUpdate) onSystemsUpdate();
    } catch (error) {
      alert('❌ Error eliminando: ' + error.message);
    }
  };

  const startEdit = (system) => {
    setEditingSystem(system);
    setFormData({
      name: system.name,
      description: system.description || '',
      url: system.url,
      icon: system.icon || 'TrendingUp',
      color: system.color || 'indigo',
      order: system.order || 0
    });
    setShowForm(true);
  };

  const startAdd = () => {
    setEditingSystem(null);
    setFormData({ name: '', description: '', url: '', icon: 'TrendingUp', color: 'indigo', order: systems.length + 1 });
    setShowForm(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-800">🔧 Panel Admin</h3>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
              <X size={24} />
            </button>
          </div>
          <p className="text-slate-500 text-sm mb-4">Ingresa la clave de administrador</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
            placeholder="Clave admin"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl mb-4 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
          <button
            onClick={handleAuth}
            className="w-full px-4 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition font-semibold"
          >
            Ingresar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-100 p-6 flex justify-between items-center">
          <h3 className="text-xl font-bold text-slate-800">🔧 Panel de Administración</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {loading ? (
            <p className="text-slate-500 text-center py-8">Cargando...</p>
          ) : (
            <>
              <div className="mb-6">
                <h4 className="font-semibold text-slate-700 mb-3">Sistemas Actuales</h4>
                <div className="space-y-2">
                  {systems.map((system) => (
                    <div key={system.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br from-${system.color}-500 to-${system.color}-600 flex items-center justify-center text-white`}>
                          {React.createElement(availableIcons.find(i => i.name === system.icon)?.component || ExternalLink, { size: 16 })}
                        </div>
                        <div>
                          <p className="font-medium text-slate-800 text-sm">{system.name}</p>
                          <p className="text-xs text-slate-400 truncate max-w-[200px]">{system.url}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(system)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(system.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {!showForm && (
                <button
                  onClick={startAdd}
                  className="w-full px-4 py-3 border-2 border-dashed border-indigo-300 text-indigo-600 rounded-xl hover:bg-indigo-50 transition font-medium flex items-center justify-center gap-2"
                >
                  <Plus size={20} />
                  Agregar Nuevo Sistema
                </button>
              )}

              {showForm && (
                <div className="mt-4 p-4 bg-slate-50 rounded-xl">
                  <h4 className="font-semibold text-slate-700 mb-4">
                    {editingSystem ? '✏️ Editar Sistema' : '➕ Nuevo Sistema'}
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-1">Nombre</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ej: Producción TM"
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-1">Descripción</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Descripción del sistema..."
                        rows="2"
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-1">URL</label>
                      <input
                        type="url"
                        value={formData.url}
                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                        placeholder="https://..."
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Icono</label>
                        <select
                          value={formData.icon}
                          onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                        >
                          {availableIcons.map(icon => (
                            <option key={icon.name} value={icon.name}>{icon.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Color</label>
                        <select
                          value={formData.color}
                          onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                        >
                          {availableColors.map(color => (
                            <option key={color.value} value={color.value}>{color.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-1">Orden</label>
                      <input
                        type="number"
                        value={formData.order}
                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => setShowForm(false)}
                      className="flex-1 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium flex items-center justify-center gap-2"
                    >
                      <Save size={16} />
                      Guardar
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
