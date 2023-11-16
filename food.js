const searchBtn = document.getElementById("search-btn");
const mealList = document.querySelector(".meal");
const mealDetailContent = document.querySelector(".meal-detail__content");
const mealDetailCloseBtn = document.querySelector(".meal-detail__close");
const mealSearchContent = document.querySelector(".meal__search-content");

searchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMealRecipe);

function getMealList() {
    let searchInputText = document.querySelector("#search-input").value.trim();
    
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let htmls = "";
            if (data.meals) {
                data.meals.map(meal => {
                    htmls += `<div class="meal__items" data-id="${meal.idMeal}">
                                <div class="meal__img">
                                    <img src="${meal.strMealThumb}" class= "meal__img-size">
                                </div>
                                <div class="meal__name">
                                    <span>${meal.strMeal}</span>
                                    <a href="#" class="recipe-btn">Get recipe</a>
                                </div>
                            </div>`;
                });
            } else {
                htmls = "Data   not found";
                mealList.classList.add('not-found');
            }
            mealList.innerHTML = htmls;
        })
}

mealSearchContent.addEventListener('keydown', function(e){
    if(e.which === 13)
        getMealList();
});

// get recipe of meal
function getMealRecipe (e) {
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then(data => data.meals)
            .then(function(meal){
               meal = meal[0];
                let  mealDetailHTML  = `
                            <span class ="meal-detail__name">
                                ${meal.strMeal}
                            </span>
                            <p class="meal-detail__category">
                                ${meal.strCategory}
                            </p>
                            <div class="meal-detail__instuctor">
                                <h3>Intruction</h3>
                                <p> ${meal.strInstructions}</p>
                                <div class="meal-detail__img">
                                    <img src="${meal.strMealThumb}" alt="food image" class="meal-detail__img-item">
                                </div>
                                <div class="recipe-link">
                                    <a href="${meal.strYoutube}" target="_blank">Watch video</a>
                                </div>
                            </div>
                         `
                         console.log(mealDetailHTML)
                mealDetailContent.innerHTML = mealDetailHTML;
                mealDetailContent.parentElement.style.display = "block";
            })
    
    }
}

mealDetailCloseBtn.addEventListener("click", function(){
    mealDetailContent.parentElement.style.display = "none";
})