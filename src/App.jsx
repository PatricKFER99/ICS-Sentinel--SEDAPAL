import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ShieldCheck, ShieldAlert, Activity, Zap, Droplets, Server, Terminal } from 'lucide-react';

const App = () => {
  const [data, setData] = useState([]);
  const [isUnderAttack, setIsUnderAttack] = useState(false);
  const [systemStatus, setSystemStatus] = useState('NORMAL');
  const [rpm, setRpm] = useState(1200);

  // 🔄 SIMULACIÓN DEL SENSOR INDUSTRIAL (PLC)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString();
      let newPressure;

      if (isUnderAttack) {
        // 🚨 MODO ATAQUE: Inyección de datos caóticos (Fuzzing)
        // Genera picos de presión peligrosos entre 150 y 200 PSI
        newPressure = Math.floor(Math.random() * (200 - 150) + 150); 
      } else {
        // ✅ MODO NORMAL: Operación estable
        // Variación natural entre 85 y 95 PSI
        newPressure = Math.floor(Math.random() * (95 - 85) + 85); 
      }

      // 🛡️ ALGORITMO DE DEFENSA (IDS - Intrusion Detection System)
      // Analiza la telemetría en tiempo real
      if (newPressure > 130) {
        setSystemStatus('CRITICAL - ATTACK DETECTED');
      } else if (newPressure > 100) {
        setSystemStatus('WARNING - HIGH PRESSURE');
      } else {
        setSystemStatus('NORMAL - SECURE');
      }

      // Guardamos los datos para la gráfica (solo los últimos 20 segundos)
      setData(prev => {
        const newData = [...prev, { time: now, pressure: newPressure, limit: 120 }];
        if (newData.length > 20) newData.shift();
        return newData;
      });

      // Simular RPM del motor
      setRpm(isUnderAttack ? 3500 : 1200 + Math.floor(Math.random() * 50));

    }, 1000); // Se actualiza cada 1 segundo

    return () => clearInterval(interval);
  }, [isUnderAttack]);

  return (
    <div className="min-h-screen p-6 font-mono bg-slate-900 text-slate-200 selection:bg-cyan-500 selection:text-slate-900">
      
      {/* 1. ENCABEZADO TIPO SCADA */}
      <header className="mb-8 border-b border-slate-700 pb-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
            <Server className="animate-pulse" /> ICS SENTINEL <span className="text-xs bg-cyan-900/50 border border-cyan-500/30 px-2 py-1 rounded text-cyan-200">v2.0.4-OT</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
            <Terminal size={12}/> SISTEMA DE MONITOREO DE INFRAESTRUCTURA CRÍTICA
          </p>
        </div>
        
        {/* Indicador de Estado */}
        <div className={`px-6 py-3 rounded-lg font-bold flex items-center gap-3 transition-all duration-300 border ${
          systemStatus.includes('CRITICAL') 
            ? 'bg-red-950/80 text-red-500 border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.4)] animate-pulse' 
            : 'bg-green-950/50 text-green-400 border-green-800'
        }`}>
          {systemStatus.includes('CRITICAL') ? <ShieldAlert size={28} /> : <ShieldCheck size={28} />}
          <div className="flex flex-col">
            <span className="text-xs opacity-70">ESTADO DE RED OT</span>
            <span>{systemStatus}</span>
          </div>
        </div>
      </header>

      {/* 2. DASHBOARD DE PANELES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* PANEL IZQUIERDO: SENSORES */}
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 backdrop-blur-sm">
          <h2 className="text-sm text-slate-400 mb-6 flex items-center gap-2 font-bold tracking-widest border-b border-slate-700/50 pb-2">
            <Activity size={16}/> TELEMETRÍA PLC-01
          </h2>
          
          <div className="space-y-8">
            {/* Sensor Presión */}
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-500 flex justify-between">
                Presión Hidráulica
                <span className="text-slate-600">Sensor ID: P-402</span>
              </span>
              <div className={`text-5xl font-bold mt-2 font-mono transition-colors duration-300 ${isUnderAttack ? 'text-red-500' : 'text-cyan-400'}`}>
                {data.length > 0 ? data[data.length - 1].pressure : 0} 
                <span className="text-lg text-slate-500 ml-2">PSI</span>
              </div>
            </div>

            {/* Sensor RPM */}
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-500">Rotación Bomba</span>
              <div className="text-3xl font-bold text-yellow-400 flex items-center gap-2 mt-1 font-mono">
                <Zap size={24}/> {rpm} <span className="text-sm text-slate-500">RPM</span>
              </div>
            </div>

            {/* Sensor Flujo */}
            <div>
               <span className="text-xs uppercase tracking-wider text-slate-500">Caudal de Salida</span>
               <div className={`text-3xl font-bold flex items-center gap-2 mt-1 font-mono ${isUnderAttack ? 'text-orange-500' : 'text-blue-400'}`}>
                <Droplets size={24}/> {isUnderAttack ? 'FLUO INESTABLE' : '45.2 L/s'}
              </div>
            </div>
          </div>
        </div>

        {/* PANEL CENTRAL: GRÁFICO EN VIVO */}
        <div className="md:col-span-2 bg-slate-800/50 p-6 rounded-xl border border-slate-700 backdrop-blur-sm flex flex-col relative">
          <h2 className="text-sm text-slate-400 mb-4 font-bold tracking-widest flex justify-between">
            <span>ANÁLISIS DE SEÑAL EN TIEMPO REAL</span>
            <span className="flex items-center gap-2 text-xs normal-case font-normal">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span> Live
            </span>
          </h2>
          
          <div className="flex-1 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tick={{fill: '#64748b'}} />
                <YAxis stroke="#94a3b8" domain={[0, 220]} fontSize={12} tick={{fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f1f5f9' }} 
                  itemStyle={{ color: '#22d3ee' }}
                />
                {/* Línea de Presión */}
                <Line 
                  type="monotone" 
                  dataKey="pressure" 
                  stroke="#22d3ee" 
                  strokeWidth={3} 
                  dot={false} 
                  activeDot={{ r: 8 }} 
                  isAnimationActive={false} 
                />
                {/* Línea de Umbral de Peligro (Límite) */}
                <Line 
                  type="step" 
                  dataKey="limit" 
                  stroke="#ef4444" 
                  strokeDasharray="5 5" 
                  strokeWidth={2} 
                  dot={false} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {/* Leyenda Técnica */}
          <div className="absolute top-6 right-6 flex gap-4 text-xs bg-slate-900/80 p-2 rounded border border-slate-700">
            <div className="flex items-center gap-2"><div className="w-3 h-1 bg-cyan-400"></div> Sensor HMI</div>
            <div className="flex items-center gap-2"><div className="w-3 h-1 bg-red-500 border-t border-dashed border-red-500"></div> Umbral Crítico (120 PSI)</div>
          </div>
        </div>

        {/* 3. ZONA DE CONTROL DE CIBERSEGURIDAD */}
        <div className="md:col-span-3 bg-red-950/20 p-6 rounded-xl border border-red-900/50 mt-2">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div>
              <h2 className="text-red-400 font-bold text-lg flex items-center gap-2 uppercase">
                 <ShieldAlert size={20} /> Simulación de Ataque (Penetration Testing)
              </h2>
              <p className="text-sm text-slate-400 max-w-2xl mt-2">
                Esta herramienta simula una inyección de paquetes falsos en el bus de datos del PLC. 
                El objetivo es validar si el sistema SCADA detecta la anomalía en la presión antes de que ocurra una falla física.
              </p>
            </div>

            <button 
              onClick={() => setIsUnderAttack(!isUnderAttack)}
              className={`px-8 py-4 rounded-lg font-bold transition-all transform active:scale-95 flex items-center gap-3 border-2 ${
                isUnderAttack 
                ? 'bg-green-600 border-green-500 hover:bg-green-700 text-white shadow-[0_0_30px_rgba(34,197,94,0.4)]' 
                : 'bg-transparent border-red-600 text-red-500 hover:bg-red-600/10 hover:shadow-[0_0_20px_rgba(220,38,38,0.2)]'
              }`}
            >
              {isUnderAttack ? (
                <> <ShieldCheck /> ACTIVAR PROTOCOLO DE DEFENSA </>
              ) : (
                <> <Zap /> EJECUTAR ATAQUE (FUZZING) </>
              )}
            </button>
          </div>
        </div>

      </div>

      <footer className="mt-12 text-center text-xs text-slate-600 border-t border-slate-800 pt-6">
        <p className="font-bold text-slate-500">DESARROLLADO POR DATACRAFT VICTORY</p>
        <p>Prototipo de Seguridad OT bajo normativa IEC-62443 | Patrick Fernando Lopez Meza</p>
      </footer>
    </div>
  );
};

export default App;