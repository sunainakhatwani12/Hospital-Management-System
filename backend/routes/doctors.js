import express from 'express';
import pool from '../db.js';

const router = express.Router();


// GET ALL DOCTORS
router.get('/', async (req, res) => {

    try {

        const result = await pool.query(
            'SELECT * FROM Doctors ORDER BY doctor_id'
        );

        res.json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


// GET DOCTOR BY ID
router.get('/:id', async (req, res) => {

    try {

        const result = await pool.query(
            'SELECT * FROM Doctors WHERE doctor_id=$1',
            [req.params.id]
        );

        res.json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


// CREATE DOCTOR
router.post('/', async (req, res) => {

    try {

        const {
            first_name,
            last_name,
            specialization,
            phone,
            email,
            salary
        } = req.body;

        const result = await pool.query(
            `INSERT INTO Doctors
            (first_name,last_name,specialization,phone,email,salary)
            VALUES($1,$2,$3,$4,$5,$6)
            RETURNING *`,
            [
                first_name,
                last_name,
                specialization,
                phone,
                email,
                salary
            ]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


// UPDATE DOCTOR
router.put('/:id', async (req, res) => {

    try {

        const {
            first_name,
            last_name,
            specialization,
            phone,
            email,
            salary
        } = req.body;

        const result = await pool.query(
            `UPDATE Doctors
            SET
            first_name=$1,
            last_name=$2,
            specialization=$3,
            phone=$4,
            email=$5,
            salary=$6
            WHERE doctor_id=$7
            RETURNING *`,
            [
                first_name,
                last_name,
                specialization,
                phone,
                email,
                salary,
                req.params.id
            ]
        );

        res.json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


// DELETE DOCTOR
router.delete('/:id', async (req, res) => {

    try {

        const doctorId = req.params.id;

        await pool.query(`
            DELETE FROM prescription_medicines
            WHERE prescription_id IN (
                SELECT prescription_id
                FROM prescriptions
                WHERE doctor_id = $1
            )
        `,[doctorId]);

        await pool.query(
            'DELETE FROM prescriptions WHERE doctor_id = $1',
            [doctorId]
        );

        await pool.query(
            'DELETE FROM medical_records WHERE doctor_id = $1',
            [doctorId]
        );

        await pool.query(
            'DELETE FROM laboratory_tests WHERE doctor_id = $1',
            [doctorId]
        );

        await pool.query(
            'DELETE FROM doctor_departments WHERE doctor_id = $1',
            [doctorId]
        );

        await pool.query(
            'DELETE FROM appointments WHERE doctor_id = $1',
            [doctorId]
        );

        await pool.query(
            'DELETE FROM doctors WHERE doctor_id = $1',
            [doctorId]
        );

        res.json({
            success:true,
            message:'Doctor Deleted Successfully'
        });

    } catch(error){

        console.error(error);

        res.status(500).json({
            error:error.message
        });

    }

});
export default router;