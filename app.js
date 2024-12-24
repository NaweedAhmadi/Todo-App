let checkboxes = document.querySelectorAll(".roundCheckbox");

checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener("click", function() {
        checkbox.classList.toggle("checked");
    });
});


