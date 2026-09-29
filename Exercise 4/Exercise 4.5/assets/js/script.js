/* FAQ ACCORDION */

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(function (question) {

    question.addEventListener("click", function () {

        const faqItem = question.parentElement;

        /*
         * Close other FAQ items.
         * This makes the accordion behave so that
         * only one answer is open at a time.
         */

        document.querySelectorAll(".faq-item").forEach(function (item) {

            if (item !== faqItem) {
                item.classList.remove("open");

                const icon = item.querySelector(".faq-icon");

                if (icon) {
                    icon.textContent = "+";
                }
            }

        });


        /*
         * Open or close the selected FAQ item.
         */

        faqItem.classList.toggle("open");


        /*
         * Change the plus symbol to a minus symbol
         * when the FAQ answer is open.
         */

        const icon = question.querySelector(".faq-icon");

        if (faqItem.classList.contains("open")) {
            icon.textContent = "−";
        } else {
            icon.textContent = "+";
        }

    });

});


/* CURRENT YEAR */

const yearElement = document.getElementById("current-year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}