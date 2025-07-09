// document.addEventListener("DOMContentLoaded", function () {
//     const savedDoctors = localStorage.getItem("selectedDoctors");
//     const savedAppointment = localStorage.getItem("appointment");
//     const container = document.querySelector(".appointments-container"); // افتراض وجود حاوية لجميع البطاقات

//     if (savedDoctors) {
//         const doctorsList = JSON.parse(savedDoctors);

//         // إذا لم يكن هناك حاوية، سنستخدم العنصر الأول الموجود
//         const existingCard = document.querySelector(".appointment-card");

//         // مسح المحتوى الحالي إذا كنت تستخدم حاوية
//         if (container) {
//             container.innerHTML = "";
//         }

//         // عرض بطاقة لكل دكتور
//         doctorsList.forEach((doctorData, index) => {
//             // إنشاء بطاقة جديدة
//             const card = existingCard.cloneNode(true);

//             // تحديث بيانات الدكتور
//             card.querySelector(".doctor-img-my").src = doctorData.image;
//             card.querySelector(".appointment-info h3").innerHTML = `
//                 ${doctorData.name} <i class="fa-regular fa-heart"></i>
//             `;
//             card.querySelector(".appointment-info p").textContent = doctorData.description;

//             // إذا كان هناك بيانات موعد (افتراض أنها مرتبطة بالدكتور الأول فقط أو تحتاج إلى تعديل)
//             if (savedAppointment && index === 0) { // عرض الموعد للدكتور الأول فقط كمثال
//                 const appointmentData = JSON.parse(savedAppointment);
//                 card.querySelector(".appointment-time").textContent =
//                     `${appointmentData.date} | ${appointmentData.time}`;
//             } else {
//                 card.querySelector(".appointment-time").textContent = "No appointment scheduled";
//             }

//             // إضافة البطاقة إلى الحاوية إذا وجدت
//             if (container) {
//                 container.appendChild(card);
//             }
//         });

//         // إذا لم يكن هناك حاوية، نترك البطاقة الأولى فقط محدثة
//         if (!container && doctorsList.length > 0) {
//             console.log("Multiple doctors found but no container specified. Showing first doctor only.");
//         }

//     } else {
//         console.log("No doctor data found in localStorage.");
//     }
// });


document.addEventListener("DOMContentLoaded", function () {
    const savedDoctors = localStorage.getItem("selectedDoctors");
    const savedAppointment = localStorage.getItem("appointment");
    const container = document.querySelector(".appointments-container");

    if (savedDoctors) {
        const doctorsList = JSON.parse(savedDoctors);
        const existingCard = document.querySelector(".appointment-card");

        if (container) {
            container.innerHTML = "";
        }

        doctorsList.forEach((doctorData, index) => {
            const card = existingCard.cloneNode(true);

            card.querySelector(".doctor-img-my").src = doctorData.image;
            card.querySelector(".appointment-info h3").innerHTML = `
                ${doctorData.name} <i class="fa-regular fa-heart"></i>
            `;
            card.querySelector(".appointment-info p").textContent = doctorData.description;

            if (savedAppointment && index === 0) {
                const appointmentData = JSON.parse(savedAppointment);
                card.querySelector(".appointment-time").textContent =
                    `${appointmentData.date} | ${appointmentData.time}`;
            } else {
                card.querySelector(".appointment-time").textContent = "No appointment scheduled";
            }

            const cancelButton = card.querySelector(".cancel");
            cancelButton.addEventListener("click", function () {
                const updatedDoctorsList = doctorsList.filter(doc => doc.name !== doctorData.name);

                localStorage.setItem("selectedDoctors", JSON.stringify(updatedDoctorsList));

                location.reload();

            });

            if (container) {
                container.appendChild(card);
            }
        });

        if (!container && doctorsList.length > 0) {
            console.log("Multiple doctors found but no container specified. Showing first doctor only.");
        }
    } else {
        console.log("No doctor data found in localStorage.");
    }
});