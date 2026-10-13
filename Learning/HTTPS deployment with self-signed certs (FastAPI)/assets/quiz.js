// Reusable quiz widget. Usage:
// <div class="quiz" data-answer="A">
//   <div class="q">Question text</div>
//   <label><input type="radio" name="qN" value="A"> option</label>
//   ...
//   <div class="feedback correct">Why this is right.</div>
//   <div class="feedback wrong">Nudge toward the right idea, not the answer.</div>
// </div>
(function () {
  function init() {
    document.querySelectorAll(".quiz").forEach(function (quiz) {
      var answer = quiz.getAttribute("data-answer");
      var correctEl = quiz.querySelector(".feedback.correct");
      var wrongEl = quiz.querySelector(".feedback.wrong");
      quiz.querySelectorAll('input[type="radio"]').forEach(function (input) {
        input.addEventListener("change", function () {
          var isCorrect = input.value === answer;
          if (correctEl) correctEl.classList.toggle("show", isCorrect);
          if (wrongEl) wrongEl.classList.toggle("show", !isCorrect);
          quiz.querySelectorAll("label").forEach(function (label) {
            label.style.borderColor = "";
          });
          var label = input.closest("label");
          if (label) label.style.borderColor = isCorrect ? "#2f5a2f" : "#7a3320";
        });
      });
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
