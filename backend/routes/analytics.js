import express from 'express';
import pool from '../db.js';

const router = express.Router();


// TOTAL PATIENTS
router.get('/total-patients', async (req, res) => {

    const result = await pool.query(
        'SELECT COUNT(*) AS total_patients FROM Patients'
    );

    res.json(result.rows[0]);
});


// TOTAL DOCTORS
router.get('/total-doctors', async (req, res) => {

    const result = await pool.query(
        'SELECT COUNT(*) AS total_doctors FROM Doctors'
    );

    res.json(result.rows[0]);
});


// TOTAL APPOINTMENTS
router.get('/total-appointments', async (req, res) => {

    const result = await pool.query(
        'SELECT COUNT(*) AS total_appointments FROM Appointments'
    );

    res.json(result.rows[0]);
});


// TOTAL REVENUE
router.get('/total-revenue', async (req, res) => {

    const result = await pool.query(
        'SELECT COALESCE(SUM(total_amount),0) AS revenue FROM Bills'
    );

    res.json(result.rows[0]);
});


// DEPARTMENT WISE PATIENTS
router.get('/department-patients', async (req, res) => {

    const result = await pool.query(`
        SELECT
            d.department_name,
            COUNT(a.patient_id) AS total_patients
        FROM Departments d
        LEFT JOIN Doctor_Departments dd
            ON d.department_id = dd.department_id
        LEFT JOIN Doctors doc
            ON dd.doctor_id = doc.doctor_id
        LEFT JOIN Appointments a
            ON doc.doctor_id = a.doctor_id
        GROUP BY d.department_name
        ORDER BY total_patients DESC
    `);

    res.json(result.rows);
});


// DOCTOR SPECIALIZATION
router.get('/doctor-specializations', async (req, res) => {

    const result = await pool.query(`
        SELECT
            specialization,
            COUNT(*) AS total
        FROM Doctors
        GROUP BY specialization
    `);

    res.json(result.rows);
});


// MONTHLY REVENUE
router.get('/monthly-revenue', async (req, res) => {

    const result = await pool.query(`
        SELECT
            TO_CHAR(bill_date,'Mon') AS month,
            SUM(total_amount) AS revenue
        FROM Bills
        GROUP BY month
    `);

    res.json(result.rows);
});


// PAYMENT METHODS
router.get('/payment-methods', async (req, res) => {

    const result = await pool.query(`
        SELECT
            payment_method,
            COUNT(*) AS total
        FROM Payments
        GROUP BY payment_method
    `);

    res.json(result.rows);
});


// APPOINTMENTS PER MONTH
router.get('/appointments-monthly', async (req, res) => {

    const result = await pool.query(`
        SELECT
            TO_CHAR(appointment_date,'Mon') AS month,
            COUNT(*) AS total
        FROM Appointments
        GROUP BY month
    `);

    res.json(result.rows);
});

export default router;