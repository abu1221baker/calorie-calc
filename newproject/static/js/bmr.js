let gender = document.querySelector("#gender");

let age = document.querySelector("#age");

let weight = document.querySelector("#weight");

let height = document.querySelector("#height");

let bmr_result = document.querySelector("#bmr-result")

let activity = document.querySelector("#activity");

let calculate_bmr = document.querySelector("#calculate-bmr");

let label = document.querySelectorAll("label")

calculate_bmr.addEventListener("click",(event) => {
    event.preventDefault();
    if (age.value === "" || age.value <= 0) {
        age.style.border = "2px solid red";
        label[1].innerText = "Error Enter Valid Age";
        label[1].style.color = "red";
    }
    if (weight.value === "" || weight.value <= 0) {
        weight.style.border = "2px solid red";
        label[2].innerText = "Error Enter Valid Weight";
        label[2].style.color = "red";
    }
    if (height.value === "" || height.value <= 0) {
        height.style.border = "2px solid red";
        label[3].innerText = "Error Enter Valid Height";
        label[3].style.color = "red";
    }
    if (age.value != "" || age.value > 0) {
        if (weight.value != "" || weight.value > 0) {
            if (height.value != "" || height.value > 0) {
                let BMR = (10 * weight.value) + (6.25 * height.value) - (5 * age.value) + 5;
                bmr_result.innerHTML = Math.round(BMR);
                age.style.border = "1px solid white";
                label[1].innerText = "Age (years)";
                label[1].style.color = "white";
                weight.style.border = "1px solid white";
                label[2].innerText = "Weight (kg)";
                label[2].style.color = "white";
                height.style.border = "1px solid white";
                label[3].innerText = "height (cm)";
                label[3].style.color = "white";

            }
        }
    }
})
