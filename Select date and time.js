const monthYearText = document.getElementById("current-month-year");
const calendarDates = document.getElementById("calendar-dates");
const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");
const timeSlots = document.querySelectorAll(".time");
const appointmentBtn = document.querySelector(".appointment-btn");

let currentDate = new Date();
let selectedDay = null;
let selectedTime = null;

// تحديث التقويم عند تغيير الشهر
function updateCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    monthYearText.textContent = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(currentDate);

    calendarDates.innerHTML = "";
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    // إضافة أيام فارغة للبداية
    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptySpan = document.createElement("span");
        calendarDates.appendChild(emptySpan);
    }

    // إضافة أيام الشهر
    for (let day = 1; day <= totalDays; day++) {
        const daySpan = document.createElement("span");
        daySpan.textContent = day;
        daySpan.classList.add("day");
        daySpan.addEventListener("click", () => selectDay(day, year, month));
        calendarDates.appendChild(daySpan);
    }
}

// اختيار اليوم
function selectDay(day, year, month) {
    document.querySelectorAll(".calendar-dates .day").forEach(el => el.classList.remove("selected"));

    selectedDay = new Date(year, month, day);
    const selectedElement = [...calendarDates.children].find(el => el.textContent == day);
    selectedElement.classList.add("selected");

    console.log(`Selected Date: ${selectedDay.toDateString()}`);
}

// اختيار الساعة
timeSlots.forEach(slot => {
    slot.addEventListener("click", () => {
        document.querySelectorAll(".time").forEach(el => el.classList.remove("selected"));
        slot.classList.add("selected");
        selectedTime = slot.textContent;
        console.log(`Selected Time: ${selectedTime}`);
    });
});

// تخزين البيانات عند الضغط على زر الموعد
appointmentBtn.addEventListener("click", () => {
    if (!selectedDay || !selectedTime) {
        alert("Please select a date and a time before making an appointment.");
        return;
    }

    const appointmentData = {
        date: selectedDay.toDateString(),
        time: selectedTime
    };

    localStorage.setItem("appointment", JSON.stringify(appointmentData));
    alert("Appointment saved successfully!");
});

// التنقل بين الأشهر
prevMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
});

nextMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
});

// تحديث التقويم عند بدء الصفحة
updateCalendar();
