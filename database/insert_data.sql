-- ==========================
-- SAMPLE DATA
-- ==========================

-- Patients
INSERT INTO Patients (first_name,last_name,gender,dob,phone,email,address)
VALUES
('Ali','Khan','Male','1998-05-10','03001234567','ali@gmail.com','Karachi'),
('Sara','Ahmed','Female','2000-08-15','03111234567','sara@gmail.com','Lahore'),
('Ahmed','Raza','Male','1995-12-20','03211234567','ahmed@gmail.com','Islamabad'),
('Ayesha','Malik','Female','2001-03-25','03331234567','ayesha@gmail.com','Karachi'),
('Usman','Ali','Male','1999-07-18','03451234567','usman@gmail.com','Hyderabad');

-- Departments
INSERT INTO Departments (department_name,location)
VALUES
('Cardiology','Block A'),
('Neurology','Block B'),
('Orthopedics','Block C'),
('Pediatrics','Block D'),
('Emergency','Ground Floor');

-- Doctors
INSERT INTO Doctors (first_name,last_name,specialization,phone,email,salary)
VALUES
('Imran','Sheikh','Cardiologist','03001111111','imran@hospital.com',150000),
('Fatima','Qureshi','Neurologist','03002222222','fatima@hospital.com',160000),
('Bilal','Khan','Orthopedic','03003333333','bilal@hospital.com',145000),
('Hina','Malik','Pediatrician','03004444444','hina@hospital.com',140000),
('Asad','Raza','General Physician','03005555555','asad@hospital.com',130000);

-- Doctor Departments
INSERT INTO Doctor_Departments (doctor_id,department_id)
VALUES
(1,1),
(2,2),
(3,3),
(4,4),
(5,5);

-- Appointments
INSERT INTO Appointments (patient_id,doctor_id,appointment_date,status)
VALUES
(1,1,'2026-06-01 10:00:00','Completed'),
(2,2,'2026-06-03 11:00:00','Completed'),
(3,3,'2026-06-05 09:30:00','Pending'),
(4,4,'2026-06-06 01:00:00','Completed'),
(5,5,'2026-06-08 03:00:00','Scheduled');

-- Medical Records
INSERT INTO Medical_Records
(patient_id,doctor_id,diagnosis,treatment,record_date)
VALUES
(1,1,'Heart Disease','Medication','2026-06-01'),
(2,2,'Migraine','Painkillers','2026-06-03'),
(3,3,'Fracture','Surgery','2026-06-05'),
(4,4,'Fever','Medication','2026-06-06'),
(5,5,'Flu','Rest & Medicine','2026-06-08');

-- Prescriptions
INSERT INTO Prescriptions
(record_id,doctor_id,patient_id,prescription_date)
VALUES
(1,1,1,'2026-06-01'),
(2,2,2,'2026-06-03'),
(3,3,3,'2026-06-05'),
(4,4,4,'2026-06-06'),
(5,5,5,'2026-06-08');

-- Medicines
INSERT INTO Medicines
(medicine_name,price,stock_quantity)
VALUES
('Panadol',50,500),
('Brufen',80,300),
('Augmentin',250,150),
('Disprin',40,400),
('Paracetamol',30,600);

-- Prescription Medicines
INSERT INTO Prescription_Medicines
(prescription_id,medicine_id,dosage,quantity)
VALUES
(1,1,'2 Times Daily',10),
(2,2,'1 Time Daily',5),
(3,3,'3 Times Daily',15),
(4,4,'2 Times Daily',8),
(5,5,'1 Time Daily',6);

-- Rooms
INSERT INTO Rooms
(room_number,room_type,availability)
VALUES
('101','General',TRUE),
('102','General',TRUE),
('201','Private',FALSE),
('202','ICU',FALSE),
('301','VIP',TRUE);

-- Admissions
INSERT INTO Admissions
(patient_id,room_id,admission_date,discharge_date)
VALUES
(1,3,'2026-06-01','2026-06-05'),
(2,4,'2026-06-03','2026-06-07'),
(3,2,'2026-06-05',NULL);

-- Nurses
INSERT INTO Nurses
(first_name,last_name,phone)
VALUES
('Nadia','Khan','03006666666'),
('Sana','Ali','03007777777'),
('Hafsa','Ahmed','03008888888');

-- Nurse Assignments
INSERT INTO Nurse_Assignments
(nurse_id,patient_id,shift)
VALUES
(1,1,'Morning'),
(2,2,'Evening'),
(3,3,'Night');

-- Bills
INSERT INTO Bills
(patient_id,total_amount,payment_status,bill_date)
VALUES
(1,15000,'Paid','2026-06-05'),
(2,25000,'Paid','2026-06-07'),
(3,18000,'Pending','2026-06-08'),
(4,12000,'Paid','2026-06-06'),
(5,8000,'Pending','2026-06-09');

-- Payments
INSERT INTO Payments
(bill_id,amount_paid,payment_method,payment_date)
VALUES
(1,15000,'Cash','2026-06-05'),
(2,25000,'Card','2026-06-07'),
(4,12000,'JazzCash','2026-06-06');

-- Laboratory Tests
INSERT INTO Laboratory_Tests
(patient_id,doctor_id,test_name,test_result,test_date)
VALUES
(1,1,'ECG','Normal','2026-06-01'),
(2,2,'Brain MRI','Clear','2026-06-03'),
(3,3,'X-Ray','Fracture Found','2026-06-05'),
(4,4,'Blood Test','Normal','2026-06-06'),
(5,5,'Flu Test','Positive','2026-06-08');

-- Staff
INSERT INTO Staff
(staff_name,designation,salary)
VALUES
('Kamran','Receptionist',40000),
('Waqas','Accountant',60000),
('Rashid','Security Guard',30000);

-- Inventory
INSERT INTO Inventory
(medicine_id,stock_added,stock_date)
VALUES
(1,200,'2026-06-01'),
(2,100,'2026-06-02'),
(3,50,'2026-06-03'),
(4,150,'2026-06-04'),
(5,250,'2026-06-05');