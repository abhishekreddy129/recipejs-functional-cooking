const RecipeApp = (() => {
  console.log("RecipeApp initializing...");

  /* ---------- DATA ---------- */
  const recipes = [
    {
      id: 1,
      title: "Spaghetti Carbonara",
      description: "Classic creamy pasta",
      time: 25,
      difficulty: "easy",
      ingredients: ["Pasta", "Eggs", "Cheese", "Black Pepper"],
      steps: [
        "Boil pasta",
        {
          text: "Prepare sauce",
          substeps: [
            "Beat eggs",
            "Add cheese",
            {
              text: "Season",
              substeps: ["Add salt", "Add pepper"]
            }
          ]
        },
        "Mix everything together"
      ]
    },
    {
      id: 2,
      title: "Chicken Tikka Masala",
      description: "Creamy Indian curry",
      time: 45,
      difficulty: "medium",
      ingredients: ["Chicken", "Tomato", "Cream", "Spices"],
      steps: [
        "Marinate chicken",
        "Cook chicken",
        {
          text: "Make sauce",
          substeps: [
            "Heat oil",
            "Add spices",
            "Add tomato puree"
          ]
        },
        "Combine chicken and sauce"
      ]
    }
  ];

  const container = document.getElementById("recipe-container");

  /* ---------- RECURSION ---------- */
  const renderSteps = (steps) => {
    let html = "<ul>";
    steps.forEach(step => {
      if (typeof step === "string") {
        html += `<li>${step}</li>`;
      } else {
        html += `<li>${step.text}</li>`;
        html += renderSteps(step.substeps);
      }
    });
    html += "</ul>";
    return html;
  };

  /* ---------- CARD ---------- */
  const createRecipeCard = (recipe) => `
    <div class="recipe-card">
      <h3>${recipe.title}</h3>
      <p>${recipe.description}</p>
      <p>⏱ ${recipe.time} min | ${recipe.difficulty}</p>

      <button class="toggle-btn" data-id="${recipe.id}" data-type="steps">
        Show Steps
      </button>
      <div class="steps-container" id="steps-${recipe.id}">
        ${renderSteps(recipe.steps)}
      </div>

      <button class="toggle-btn" data-id="${recipe.id}" data-type="ingredients">
        Show Ingredients
      </button>
      <div class="ingredients-container" id="ingredients-${recipe.id}">
        <ul>
          ${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}
        </ul>
      </div>
    </div>
  `;

  /* ---------- RENDER ---------- */
  const renderRecipes = () => {
    container.innerHTML = recipes.map(createRecipeCard).join("");
  };

  /* ---------- EVENT DELEGATION ---------- */
  container.addEventListener("click", (e) => {
    if (!e.target.classList.contains("toggle-btn")) return;

    const id = e.target.dataset.id;
    const type = e.target.dataset.type;
    const box = document.getElementById(`${type}-${id}`);

    box.classList.toggle("visible");

    e.target.textContent = box.classList.contains("visible")
      ? `Hide ${type}`
      : `Show ${type}`;
  });

  /* ---------- INIT ---------- */
  const init = () => {
    renderRecipes();
    console.log("RecipeApp ready!");
  };

  return { init };
})();

RecipeApp.init();
