import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import patientRoutes from './routes/patients.js';
import doctorRoutes from './routes/doctors.js';
import appointmentRoutes from './routes/appointments.js';
import analyticsRoutes from './routes/analytics.js';

dotenv.config();

const app = express();

// ES Module Support
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ======================
// MIDDLEWARE
// ======================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======================
// STATIC FILES
// ======================

app.use(express.static(path.join(__dirname, 'public')));

// ======================
// API ROUTES
// ======================

app.use('/patients', patientRoutes);
app.use('/doctors', doctorRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/analytics', analyticsRoutes);

// ======================
// FRONTEND ROUTES
// ======================

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/patients.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'patients.html'));
});

app.get('/doctors.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'doctors.html'));
});

app.get('/appointments.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'appointments.html'));
});

// ======================
// 404 HANDLER
// ======================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// ======================
// START SERVER
// ======================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});