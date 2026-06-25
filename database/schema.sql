-- ==========================
-- HOSPITAL MANAGEMENT SYSTEM
-- DATABASE SCHEMA
-- ==========================

CREATE TABLE Patients (
    patient_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    gender VARCHAR(10),
    dob DATE,
    phone VARCHAR(20),
    email VARCHAR(100),
    address TEXT
);

CREATE TABLE Departments (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL,
    location VARCHAR(100)
);

CREATE TABLE Doctors (
    doctor_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    specialization VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(100),
    salary NUMERIC(10,2)
);

CREATE TABLE Doctor_Departments (
    doctor_department_id SERIAL PRIMARY KEY,
    doctor_id INT REFERENCES Doctors(doctor_id) ON DELETE CASCADE,
    department_id INT REFERENCES Departments(department_id) ON DELETE CASCADE
);

CREATE TABLE Appointments (
    appointment_id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES Patients(patient_id),
    doctor_id INT REFERENCES Doctors(doctor_id),
    appointment_date TIMESTAMP,
    status VARCHAR(50)
);

CREATE TABLE Medical_Records (
    record_id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES Patients(patient_id),
    doctor_id INT REFERENCES Doctors(doctor_id),
    diagnosis TEXT,
    treatment TEXT,
    record_date DATE
);

CREATE TABLE Prescriptions (
    prescription_id SERIAL PRIMARY KEY,
    record_id INT REFERENCES Medical_Records(record_id),
    doctor_id INT REFERENCES Doctors(doctor_id),
    patient_id INT REFERENCES Patients(patient_id),
    prescription_date DATE
);

CREATE TABLE Medicines (
    medicine_id SERIAL PRIMARY KEY,
    medicine_name VARCHAR(100),
    price NUMERIC(10,2),
    stock_quantity INT
);

CREATE TABLE Prescription_Medicines (
    id SERIAL PRIMARY KEY,
    prescription_id INT REFERENCES Prescriptions(prescription_id),
    medicine_id INT REFERENCES Medicines(medicine_id),
    dosage VARCHAR(100),
    quantity INT
);

CREATE TABLE Rooms (
    room_id SERIAL PRIMARY KEY,
    room_number VARCHAR(20),
    room_type VARCHAR(50),
    availability BOOLEAN DEFAULT TRUE
);

CREATE TABLE Admissions (
    admission_id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES Patients(patient_id),
    room_id INT REFERENCES Rooms(room_id),
    admission_date DATE,
    discharge_date DATE
);

CREATE TABLE Nurses (
    nurse_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone VARCHAR(20)
);

CREATE TABLE Nurse_Assignments (
    assignment_id SERIAL PRIMARY KEY,
    nurse_id INT REFERENCES Nurses(nurse_id),
    patient_id INT REFERENCES Patients(patient_id),
    shift VARCHAR(20)
);

CREATE TABLE Bills (
    bill_id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES Patients(patient_id),
    total_amount NUMERIC(10,2),
    payment_status VARCHAR(30),
    bill_date DATE
);

CREATE TABLE Payments (
    payment_id SERIAL PRIMARY KEY,
    bill_id INT REFERENCES Bills(bill_id),
    amount_paid NUMERIC(10,2),
    payment_method VARCHAR(50),
    payment_date DATE
);

CREATE TABLE Laboratory_Tests (
    test_id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES Patients(patient_id),
    doctor_id INT REFERENCES Doctors(doctor_id),
    test_name VARCHAR(100),
    test_result TEXT,
    test_date DATE
);

CREATE TABLE Staff (
    staff_id SERIAL PRIMARY KEY,
    staff_name VARCHAR(100),
    designation VARCHAR(100),
    salary NUMERIC(10,2)
);

CREATE TABLE Inventory (
    inventory_id SERIAL PRIMARY KEY,
    medicine_id INT REFERENCES Medicines(medicine_id),
    stock_added INT,
    stock_date DATE
);