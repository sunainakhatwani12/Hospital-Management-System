import express from 'express';
import pool from '../db.js';

const router = express.Router();


// GET ALL APPOINTMENTS
// GET ALL APPOINTMENTS
router.get('/', async (req, res) => {

    try {

        const result = await pool.query(`

            SELECT

                a.appointment_id,
                a.patient_id,
                a.doctor_id,
                a.appointment_date,
                a.status,

                p.first_name || ' ' || p.last_name
                AS patient_name,

                d.first_name || ' ' || d.last_name
                AS doctor_name

            FROM appointments a

            JOIN patients p
            ON a.patient_id = p.patient_id

            JOIN doctors d
            ON a.doctor_id = d.doctor_id

            ORDER BY a.appointment_id

        `);

        res.json(result.rows);

    }
    catch(error){

        console.error(error);

        res.status(500).json({
            error:error.message
        });

    }

});

// GET APPOINTMENT BY ID
router.get('/:id', async (req, res) => {
    try {

        const result = await pool.query(
            'SELECT * FROM Appointments WHERE appointment_id=$1',
            [req.params.id]
        );

        res.json(result.rows[0]);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// CREATE APPOINTMENT
router.post('/', async (req, res) => {

    try {

        const {
            patient_id,
            doctor_id,
            appointment_date,
            status
        } = req.body;

        const result = await pool.query(
            `INSERT INTO Appointments
            (patient_id,doctor_id,appointment_date,status)
            VALUES($1,$2,$3,$4)
            RETURNING *`,
            [
                patient_id,
                doctor_id,
                appointment_date,
                status
            ]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// UPDATE APPOINTMENT
router.put('/:id', async (req, res) => {

    try {

        const {
            patient_id,
            doctor_id,
            appointment_date,
            status
        } = req.body;

        const result = await pool.query(
            `UPDATE Appointments
             SET
             patient_id=$1,
             doctor_id=$2,
             appointment_date=$3,
             status=$4
             WHERE appointment_id=$5
             RETURNING *`,
            [
                patient_id,
                doctor_id,
                appointment_date,
                status,
                req.params.id
            ]
        );

        res.json(result.rows[0]);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// DELETE APPOINTMENT
router.delete('/:id', async (req, res) => {

    try {

        await pool.query(
            'DELETE FROM Appointments WHERE appointment_id=$1',
            [req.params.id]
        );

        res.json({
            message: 'Appointment Deleted Successfully'
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;