const RecipeApp = (function () {
    console.log("RecipeApp initializing...");

    /* ---------------- DATA ---------------- */
    const recipes = [
        {
            id: 1,
            title: "Pasta",
            difficulty: "Easy",
            ingredients: [
                "Pasta",
                "Salt",
                "Olive Oil",
                "Garlic",
                "Tomato Sauce"
            ],
            steps: [
                "Boil water",
                "Add pasta",
                {
                    text: "Prepare sauce",
                    substeps: [
                        "Heat oil",
                        "Add garlic",
                        {
                            text: "Add spices",
                            substeps: ["Chili flakes", "Oregano"]
                        }
                    ]
                },
                "Mix pasta and sauce",
                "Serve hot"
            ]
        },
        // 👉 add remaining recipes similarly
    ];

    const recipeContainer = document.querySelector("#recipe-container");

    /* ---------------- RECURSION ---------------- */
    const renderSteps = (steps, level = 0) => {
        let html = "<ol class='step-level-" + level + "'>";

        steps.forEach(step => {
            if (typeof step === "string") {
                html += `<li>${step}</li>`;
            } else {
                html += `<li>
                    ${step.text}
                    ${renderSteps(step.substeps, level + 1)}
                </li>`;
            }
        });

        html += "</ol>";
        return html;
    };

    const createStepsHTML = (recipe) => {
        return `
            <div class="steps-container" data-id="${recipe.id}">
                ${renderSteps(recipe.steps)}
            </div>
        `;
    };

    /* ---------------- CARD TEMPLATE ---------------- */
    const createRecipeCard = (recipe) => {
        return `
            <div class="recipe-card" data-id="${recipe.id}">
                <h3>${recipe.title}</h3>

                <button class="toggle-btn" data-toggle="steps" data-id="${recipe.id}">
                    Show Steps
                </button>

                <button class="toggle-btn" data-toggle="ingredients" data-id="${recipe.id}">
                    Show Ingredients
                </button>

                ${createStepsHTML(recipe)}

                <ul class="ingredients-container" data-id="${recipe.id}">
                    ${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}
                </ul>
            </div>
        `;
    };

    /* ---------------- RENDER ---------------- */
    const updateDisplay = () => {
        recipeContainer.innerHTML = recipes.map(createRecipeCard).join("");
    };

    /* ---------------- EVENT DELEGATION ---------------- */
    const handleToggleClick = (e) => {
        if (!e.target.classList.contains("toggle-btn")) return;

        const id = e.target.dataset.id;
        const type = e.target.dataset.toggle;

        const container = document.querySelector(
            `.${type}-container[data-id="${id}"]`
        );

        container.classList.toggle("visible");

        e.target.textContent = container.classList.contains("visible")
            ? `Hide ${type.charAt(0).toUpperCase() + type.slice(1)}`
            : `Show ${type.charAt(0).toUpperCase() + type.slice(1)}`;
    };

    const setupEventListeners = () => {
        recipeContainer.addEventListener("click", handleToggleClick);
        console.log("Event listeners attached!");
    };

    /* ---------------- PUBLIC API ---------------- */
    const init = () => {
        updateDisplay();
        setupEventListeners();
        console.log("RecipeApp ready!");
    };

    return {
        init,
        updateDisplay
    };
})();

RecipeApp.init();
