import { useState, useEffect } from 'react';
import type { Patient } from './types';

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [patients, setPatients] = useState<Patient[]>([]);
  const [form, setForm] = useState({ fullName: '', age: '', status: 'Stable' });

  const fetchPatients = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/patients?t=${Date.now()}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) throw new Error("Erreur Réseau");

      const data = await res.json();
      console.log("Données reçues du back:", data);

      if (Array.isArray(data)) {
        setPatients(data);
      }
    } catch (err) {
      console.error("Erreur de fetch:", err);
    }
  };

  useEffect(() => {
    if (token) fetchPatients();
  }, [token]);

  const handleLogin = (e: any) => {
    e.preventDefault();
    localStorage.setItem('token', 'connected');
    setToken('connected');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('http://localhost:3001/api/patients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setForm({ fullName: '', age: '', status: 'Stable' });
    fetchPatients();
  };

  if (!token) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px', fontFamily: 'Arial' }}>
        <div style={{ border: '1px solid #ccc', padding: '40px', borderRadius: '10px' }}>
          <h2>🔐 Accès Sécurisé</h2>
          <button
            type="button"
            onClick={handleLogin}
            style={{ padding: '10px 20px', cursor: 'pointer' }}
          >
            Se Connecter (Simulation)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial', maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
        <h1>🏥 Hôpital Management (Groupe A)</h1>
        <button
          onClick={() => { localStorage.clear(); setToken(null); }}
          style={{ background: '#ff4444', color: 'white', border: 'none', padding: '10px', cursor: 'pointer' }}
        >
          Déconnexion
        </button>
      </header>

      <section style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h3>Nouveau Patient</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
          <input
            placeholder="Nom Complet"
            value={form.fullName}
            onChange={e => setForm({ ...form, fullName: e.target.value })}
            required
            style={{ padding: '8px' }}
          />
          <input
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={e => setForm({ ...form, age: e.target.value })}
            required
            style={{ padding: '8px', width: '60px' }}
          />
          <select
            value={form.status}
            onChange={e => setForm({ ...form, status: e.target.value })}
            style={{ padding: '8px' }}
          >
            <option value="Stable">Stable</option>
            <option value="Critique">Critique</option>
            <option value="Sortant">Sortant</option>
          </select>
          <button type="submit" style={{ padding: '8px 20px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
            Ajouter
          </button>
        </form>
      </section>

      {/* Liste des patients */}
      <section>
        <h3>📋 Liste des Patients ({patients.length})</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ background: '#333', color: 'white', textAlign: 'left' }}>
              <th style={{ padding: '12px' }}>Nom</th>
              <th style={{ padding: '12px' }}>Age</th>
              <th style={{ padding: '12px' }}>État</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '12px' }}>{p.fullName}</td>
                <td style={{ padding: '12px' }}>{p.age} ans</td>
                <td style={{ padding: '12px', fontWeight: 'bold', color: p.status === 'Critique' ? 'red' : 'green' }}>
                  {p.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default App;