let macros_protein = document.querySelector(".macros-protein");
let macros_carb = document.querySelector(".macros-carb");
let macros_fat = document.querySelector(".macros-fat");
let meal_calories = document.querySelector(".meal-calories");
let calories_consumed = document.querySelector(".calories-consumed");

let food = document.querySelector("#food");
let grams = document.querySelector("#g");
let quick_add_btn = document.querySelector("#submit");

let base_gram = 100;

quick_add_btn.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("this is the js")
    if (food.value.trim() === "") {
        alert("Enter some food item for calculation");
    } else {
        calorie(food.value.trim());
    }
});

let calorie = async (foodName) => {
    console.log("data loding...")
    const response = await fetch("/static/js/foodcal.json");
    const data = await response.json();
    console.log("data loaded...")

    const foodItem = data.find(item =>
        item.name.toLowerCase() === foodName.toLowerCase()
    );

    if (!foodItem) {
        alert("Food is not mentioned in the database");
        return;
    }

    // Get grams from input, default to 100 if empty or invalid
    let gramsValue = parseFloat(grams.value);
    if (isNaN(gramsValue) || gramsValue <= 0) {
        gramsValue = base_gram;
    }

    let factor = gramsValue / base_gram;

    // Calculate scaled values (remove .00 if unnecessary)
    let protein = cleanNumber(foodItem.protein * factor);
    let carbs = cleanNumber(foodItem.carbs * factor);
    let fat = cleanNumber(foodItem.fat * factor);
    let calories = cleanNumber(foodItem.calories * factor);

    // Display results
    macros_protein.innerText = `Protein: ${protein}g`;
    macros_carb.innerText = `Carbs: ${carbs}g`;
    macros_fat.innerText = `Fats: ${fat}g`;
    meal_calories.innerText = `${calories} kcal for ${gramsValue}g`;
    calories_consumed.innerText = `${calories} kcal`;
};

// Helper function to remove .00 if whole number
function cleanNumber(num) {
    return Number.isInteger(num) ? num : parseFloat(num.toFixed(2));
}
