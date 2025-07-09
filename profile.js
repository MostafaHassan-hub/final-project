

document.addEventListener("DOMContentLoaded", function () {
    const logoutBtn = document.getElementById("logout-btn");
    const modal = document.getElementById("logout-modal");
    const cancelBtn = document.getElementById("cancel-btn");

    logoutBtn.addEventListener("click", function (event) {
        event.preventDefault();
        modal.classList.add("show");
    });

    cancelBtn.addEventListener("click", function () {
        modal.classList.remove("show");
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.classList.remove("show");
        }
    });
});
