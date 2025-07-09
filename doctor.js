// document.addEventListener("DOMContentLoaded", function () {
//     const bookButtons = document.querySelectorAll(".book-btn");

//     bookButtons.forEach(button => {
//         button.addEventListener("click", function (event) {
//             event.preventDefault();

//             const doctorCard = this.closest(".doctor-card");
//             const doctorImage = doctorCard.querySelector("img").getAttribute("src");
//             const doctorName = doctorCard.querySelector("h4").textContent.trim();
//             const doctorDescription = doctorCard.querySelector("p").textContent.trim();

//             const doctorData = {
//                 name: doctorName,
//                 image: doctorImage,
//                 description: doctorDescription
//             };

//             localStorage.setItem("selectedDoctor", JSON.stringify(doctorData));

//             console.log("Doctor data saved:", doctorData);

//             window.location.href = "booking.html";
//         });
//     });
// });


document.addEventListener("DOMContentLoaded", function () {
    const bookButtons = document.querySelectorAll(".book-btn");

    bookButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();

            const doctorCard = this.closest(".doctor-card");
            const doctorImage = doctorCard.querySelector("img").getAttribute("src");
            const doctorName = doctorCard.querySelector("h4").textContent.trim();
            const doctorDescription = doctorCard.querySelector("p").textContent.trim();

            const doctorData = {
                name: doctorName,
                image: doctorImage,
                description: doctorDescription
            };

            // الحصول على البيانات الموجودة مسبقاً أو إنشاء مصفوفة جديدة
            let doctorsList = JSON.parse(localStorage.getItem("selectedDoctors")) || [];

            // التحقق من عدم وجود الدكتور مسبقاً (بناءً على الاسم)
            const doctorExists = doctorsList.some(doctor => doctor.name === doctorName);

            if (!doctorExists) {
                // إضافة الدكتور الجديد إذا لم يكن موجوداً
                doctorsList.push(doctorData);
                localStorage.setItem("selectedDoctors", JSON.stringify(doctorsList));
                console.log("New doctor added:", doctorData);
            } else {
                console.log("Doctor already exists in the list:", doctorName);
            }

            window.location.href = "booking.html";
        });
    });
});