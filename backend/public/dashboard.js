const API = "/analytics";


// ======================
// DASHBOARD CARDS
// ======================

async function loadCards() {

    try {

        const patients =
        await fetch(`${API}/total-patients`)
        .then(res => res.json());

        const doctors =
        await fetch(`${API}/total-doctors`)
        .then(res => res.json());

        const appointments =
        await fetch(`${API}/total-appointments`)
        .then(res => res.json());

        const revenue =
        await fetch(`${API}/total-revenue`)
        .then(res => res.json());

        document.getElementById("patientsCount").innerText =
        patients.total_patients;

        document.getElementById("doctorsCount").innerText =
        doctors.total_doctors;

        document.getElementById("appointmentsCount").innerText =
        appointments.total_appointments;

        document.getElementById("revenueCount").innerText =
        revenue.revenue;

    }
    catch(error){

        console.error(error);

    }

}


// ======================
// BAR CHART
// ======================

async function departmentChart() {

    const data =
    await fetch(`${API}/department-patients`)
    .then(res => res.json());

    new Chart(
        document.getElementById("departmentChart"),
        {
            type: "bar",

            data: {

                labels:
                data.map(item => item.department_name),

                datasets: [{
                    label: "Patients",

                    data:
                    data.map(item => item.total_patients)
                }]
            }
        }
    );
}


// ======================
// PIE CHART
// ======================

async function specializationChart() {

    const data =
    await fetch(`${API}/doctor-specializations`)
    .then(res => res.json());

    new Chart(
        document.getElementById("specializationChart"),
        {
            type: "pie",

            data: {

                labels:
                data.map(item => item.specialization),

                datasets: [{
                    data:
                    data.map(item => item.total)
                }]
            }
        }
    );
}


// ======================
// LINE CHART
// ======================

async function revenueChart() {

    const data =
    await fetch(`${API}/monthly-revenue`)
    .then(res => res.json());

    new Chart(
        document.getElementById("revenueChart"),
        {
            type: "line",

            data: {

                labels:
                data.map(item => item.month),

                datasets: [{
                    label: "Revenue",

                    data:
                    data.map(item => item.revenue)
                }]
            }
        }
    );
}


// ======================
// DOUGHNUT CHART
// ======================

async function paymentChart() {

    const data =
    await fetch(`${API}/payment-methods`)
    .then(res => res.json());

    new Chart(
        document.getElementById("paymentChart"),
        {
            type: "doughnut",

            data: {

                labels:
                data.map(item => item.payment_method),

                datasets: [{
                    data:
                    data.map(item => item.total)
                }]
            }
        }
    );
}


// ======================
// AREA CHART
// ======================

async function appointmentChart() {

    const data =
    await fetch(`${API}/appointments-monthly`)
    .then(res => res.json());

    new Chart(
        document.getElementById("appointmentChart"),
        {
            type: "line",

            data: {

                labels:
                data.map(item => item.month),

                datasets: [{

                    label: "Appointments",

                    fill: true,

                    data:
                    data.map(item => item.total)

                }]
            }
        }
    );
}


// ======================
// START APPLICATION
// ======================

loadCards();

departmentChart();

specializationChart();

revenueChart();

paymentChart();

appointmentChart();