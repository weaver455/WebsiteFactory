const customers = [];

const submitCustomerBtn = document.getElementById("submitCustomerBtn");
const phoneInput = document.getElementById("phone");
const visitDateInput = document.getElementById("question2");

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

if (visitDateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    visitDateInput.min = formatDate(tomorrow);

    const validateVisitDate = () => {
        const selectedDate = visitDateInput.value;
        if (!selectedDate) {
            visitDateInput.setCustomValidity("");
            return;
        }

        const [year, month, day] = selectedDate.split("-").map(Number);
        const date = new Date(year, month - 1, day);

        if (selectedDate <= formatDate(new Date())) {
            visitDateInput.setCustomValidity("Choose a date in the future.");
        } else if (date.getDay() === 0) {
            visitDateInput.setCustomValidity("We are closed on Sundays. Choose another date.");
        } else {
            visitDateInput.setCustomValidity("");
        }
    };

    visitDateInput.addEventListener("input", validateVisitDate);
    visitDateInput.addEventListener("change", validateVisitDate);
}

if (phoneInput) {
    phoneInput.addEventListener("input", () => {
        phoneInput.value = phoneInput.value.replace(/\D/g, "");
    });
}

if (submitCustomerBtn) {
    submitCustomerBtn.addEventListener("click", () => {
        for (const form of document.querySelectorAll(".customer-form")) {
            if (!form.reportValidity()) {
                return;
            }
        }

        const customer = {
            id: customers.length + 1,
            name: document.getElementById("name")?.value.trim() || "",
            email: document.getElementById("email")?.value.trim() || "",
            phone: document.getElementById("phone")?.value.trim() || "",
            bundle: document.getElementById("bundle")?.value || "",
            isFirstTimeVisitor: document.querySelector('input[name="question1"]:checked')?.value || "",
            visitDate: document.getElementById("question2")?.value || "",
            username: document.getElementById("username")?.value.trim() || "",
            password: document.getElementById("password")?.value || ""
        };

        customers.push(customer);
        console.clear();
        console.log(customers);
    });
}
