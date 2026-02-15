import express, { Request, Response } from 'express';
import cors from 'cors';
import { Patient } from './types';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline'; img-src * data: blob: 'unsafe-inline'; frame-src *; style-src * 'unsafe-inline';");
    next();
});

let patients: Patient[] = [
    { id: '1', fullName: 'Yassine Bounou', age: 32, status: 'Stable', admittedAt: new Date() },
    { id: '2', fullName: 'Riyad Mahrez', age: 33, status: 'Sortant', admittedAt: new Date() }
];

app.get('/api/patients', (req: Request, res: Response) => {
    res.json(patients);
});
app.post('/api/patients', (req: Request, res: Response) => {
    const { fullName, age, status } = req.body;

    if (!fullName || !age) {
        return res.status(400).json({ error: "Nom et Age obligatoires" });
    }

    const newPatient: Patient = {
        id: Date.now().toString(),
        fullName,
        age: Number(age),
        status: status || 'Stable',
        admittedAt: new Date()
    };

    patients.push(newPatient);
    console.log(`✅ Patient ajouté : ${fullName}`);
    res.status(201).json(newPatient);
});

app.get('/', (req, res) => {
    res.send("🚀 Backend is running! Go to /api/patients to see data.");
});

app.post('/api/login', (req: Request, res: Response) => {
    res.json({ token: "fake-jwt-token-123456" });
});

app.listen(PORT, () => {
    console.log(`🚀 Serveur Backend lancé sur http://localhost:${PORT}`);
});