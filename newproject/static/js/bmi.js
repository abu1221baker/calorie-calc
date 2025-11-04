let weight = document.querySelector("#weight");
let height = document.querySelector("#height");
let calculate_bmi = document.querySelector("#calculate-bmi");
let bmi_result = document.querySelector("#bmi-result");
let bmi_category = document.querySelector("#bmi-category");
let label = document.querySelectorAll("label")

calculate_bmi.addEventListener("click", (event) => {
    event.preventDefault();
    if (weight.value === "" || weight.value <= 0) {
        weight.style.border = "2px solid red";
        label[0].innerText = "Error Enter Valid Weight";
        label[0].style.color = "red";
    }
    if (height.value === "" || height.value <= 0) {
        height.style.border = "2px solid red";
        label[1].innerText = "Error Enter Valid Height";
        label[1].style.color = "red";
    }
    if (weight.value != "" || weight.value >0) {
        if (height.value != "" || height.value >0) {
            let height_meter = height.value / 100;
            let bmi = weight.value / (height_meter * height_meter);
            weight.style.border = "1px solid white";
            label[0].innerText = "Weight (kg)";
            label[0].style.color = "white";
            height.style.border = "1px solid white";
            label[1].innerText = "height (cm)";
            label[1].style.color = "white";
            bmi_result.innerHTML = Math.round(bmi);
            if (bmi < 18.5) {
                bmi_category.innerHTML = "Underweight";
                bmi_category.style.color = "#4cc9f0"
            } else if (bmi >= 18.5 && bmi <= 24.9) {
                bmi_category.innerHTML = "Normal weight";
                bmi_category.style.color = "#4ade80"
            } else if (bmi >= 25 && bmi <= 29.9) {
                bmi_category.innerHTML = "Overweight";
                bmi_category.style.color = "#f59e0b"
            } else {
                bmi_category.innerHTML = "Obese";
                bmi_category.style.color = "#f87171"
            }
        }
    }

});
