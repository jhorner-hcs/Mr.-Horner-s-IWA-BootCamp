/* =============================================
   Mr. Horner's IWA Bootcamp — script.js
   ============================================= */

"use strict";

// ── Utility ──────────────────────────────────────────────────────────────────

const $ = id => document.getElementById(id);

// ── Scroll Reveal ─────────────────────────────────────────────────────────────

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealElements.forEach(el => observer.observe(el));
} else {
  // Fallback: show everything immediately
  revealElements.forEach(el => el.classList.add("is-visible"));
}

// ── Theme Toggle ──────────────────────────────────────────────────────────────

const themeToggle = $("themeToggle");
const themeLabel  = document.querySelector(".theme-label");

function applyTheme(theme) {
  document.body.setAttribute("data-theme", theme);
  if (themeToggle) themeToggle.checked = theme === "dark";
  if (themeLabel)  themeLabel.textContent = theme === "dark" ? "Dark mode" : "Light mode";
  localStorage.setItem("theme", theme);
}

if (themeToggle) {
  const prefersDark  = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const storedTheme  = localStorage.getItem("theme");
  applyTheme(storedTheme || (prefersDark ? "dark" : "light"));
  themeToggle.addEventListener("change", () =>
    applyTheme(themeToggle.checked ? "dark" : "light")
  );
}

// ── Bootcamp Tracker (progress bar) ──────────────────────────────────────────

const checklist     = document.querySelectorAll('.bootcamp-checklist input[type="checkbox"]');
const progressFill  = $("progressFill");
const progressText  = $("progressText");
const progressBar   = progressFill ? progressFill.closest('[role="progressbar"]') : null;

function updateProgress() {
  if (!progressFill || !progressText || checklist.length === 0) return;

  const checked = Array.from(checklist).filter(item => item.checked).length;
  const percent = Math.round((checked / checklist.length) * 100);
  progressFill.style.width = `${percent}%`;
  progressText.textContent = `${percent}% complete`;

  if (progressBar) progressBar.setAttribute("aria-valuenow", percent);
}

checklist.forEach(box => box.addEventListener("change", updateProgress));
updateProgress();

// ── Safe bind helper ─────────────────────────────────────────────────────────

function bindClick(buttonId, handler) {
  const btn = $(buttonId);
  if (btn) btn.addEventListener("click", handler);
}

// ── Lab: Research Question Builder ───────────────────────────────────────────

bindClick("rqGenerate", () => {
  const topic   = $("rqTopic")?.value.trim()   || "your topic";
  const context = $("rqContext")?.value.trim()  || "a specific context";
  const stake   = $("rqStake")?.value.trim()    || "a meaningful outcome";
  const lens    = $("rqLens")?.value.trim()     || "";
  const output  = $("rqOutput");
  if (!output) return;

  const lensPhrase = lens ? `, especially through a ${lens} lens` : "";
  output.textContent =
    `To what extent does ${topic} shape outcomes for ${context}, ` +
    `and why does it matter for ${stake}${lensPhrase}?`;
});

// ── Lab: Thesis Forge ────────────────────────────────────────────────────────

bindClick("thesisGenerate", () => {
  const rq         = $("thesisRQ")?.value.trim()         || "this research question";
  const claim      = $("thesisClaim")?.value.trim()      || "a specific claim";
  const reason     = $("thesisReason")?.value.trim()     || "evidence-based reasoning";
  const implication = $("thesisImplication")?.value.trim() || "";
  const output     = $("thesisOutput");
  if (!output) return;

  const implicationSentence = implication ? ` This matters because ${implication}.` : "";
  output.textContent =
    `In response to ${rq}, ${claim} because ${reason}.${implicationSentence}`;
});

// ── Lab: Perspective Mixer ───────────────────────────────────────────────────

bindClick("perspGenerate", () => {
  const a       = $("perspA")?.value.trim()       || "Source A argues";
  const b       = $("perspB")?.value.trim()       || "Source B contends";
  const tension = $("perspTension")?.value.trim() || "a key connection between them";
  const output  = $("perspOutput");
  if (!output) return;

  output.textContent =
    `${a}, while ${b}. The key connection is ${tension}, ` +
    "which reveals implications and limitations that must be addressed in your argument.";
});

// ── Lab: Argument Mapper ─────────────────────────────────────────────────────

bindClick("argGenerate", () => {
  const claim     = $("argClaim")?.value.trim()     || "your claim";
  const evidence  = $("argEvidence")?.value.trim()  || "key evidence";
  const reasoning = $("argReasoning")?.value.trim() || "clear commentary";
  const impact    = $("argImpact")?.value.trim()    || "a clear impact on the conclusion";
  const output    = $("argOutput");
  if (!output) return;

  output.textContent =
    `Claim: ${claim}. Evidence: ${evidence}. Commentary: ${reasoning}. Impact: ${impact}.`;
});

// ── Lab: Evidence Quality Snapcheck ─────────────────────────────────────────

bindClick("evGenerate", () => {
  const source  = $("evSource")?.value.trim()  || "a credible source";
  const support = $("evSupport")?.value.trim() || "clear evidence";
  const gap     = $("evGap")?.value.trim()     || "additional supporting evidence";
  const output  = $("evOutput");
  if (!output) return;

  output.textContent =
    `Credibility: ${source}. Support: ${support}. ` +
    `Next step: add ${gap} so your evidence is sufficient and well-rounded. ` +
    `Reminder: encyclopedias and dictionaries do not count as well-vetted sources.`;
});

// ── Lab: Citation + Style Mini-Check ────────────────────────────────────────

bindClick("citeGenerate", () => {
  const example = $("citeExample")?.value.trim() || "an in-text citation";
  const entry   = $("citeEntry")?.value.trim()   || "a full bibliography entry";
  const rewrite = $("styleRewrite")?.value.trim() || "";
  const output  = $("citeMiniOutput");
  if (!output) return;

  const styleNote = rewrite
    ? ` Style check: revise "${rewrite}" into formal, precise academic language.`
    : " Style check: confirm your tone is consistently academic and your word choices are precise.";

  output.textContent =
    `In-text: ${example}. Bibliography: ${entry}. ` +
    `Verify both are present and that the style is consistent and complete.${styleNote}`;
});

// ── Evidence Quality Lab (Row 5 checkboxes) ───────────────────────────────────

const evRelevant   = $("evRelevant");
const evCredible   = $("evCredible");
const evSufficient = $("evSufficient");
const evidenceOutput = $("evidenceOutput");

function updateEvidence() {
  if (!evRelevant || !evCredible || !evSufficient || !evidenceOutput) return;

  if (!evRelevant.checked && !evCredible.checked && !evSufficient.checked) {
    evidenceOutput.textContent =
      "Row 5 check: confirm your evidence is relevant, credible, and sufficient.";
    return;
  }

  if (!evRelevant.checked || !evCredible.checked) {
    evidenceOutput.textContent =
      "Row 5 risk: evidence may be irrelevant or lacking credibility. Re-check source quality " +
      "and alignment with your claims. A 0 is possible if no well-vetted sources are present.";
    return;
  }

  if (!evSufficient.checked) {
    evidenceOutput.textContent =
      "Row 5 middle band (6 pts): evidence is mostly relevant and credible, but more " +
      "purposeful analysis or additional scholarly sources may be needed for the top band.";
    return;
  }

  evidenceOutput.textContent =
    "Row 5 alignment looks strong (9 pts): evidence is relevant, credible, and sufficient, " +
    "with consistent attribution and purposeful analysis. Make sure at least one well-vetted " +
    "source (scholarly, peer-reviewed, government, or credentialed author) is present beyond " +
    "the stimulus materials.";
}

[evRelevant, evCredible, evSufficient]
  .filter(Boolean)
  .forEach(box => box.addEventListener("change", updateEvidence));
updateEvidence();

// ── Citation Consistency Check (Row 6 checkboxes) ────────────────────────────

const citeInText    = $("citeInText");
const citeBib       = $("citeBib");
const citeConsistent = $("citeConsistent");
const citeOutput    = $("citeOutput");

function updateCitations() {
  if (!citeInText || !citeBib || !citeConsistent || !citeOutput) return;

  if (!citeInText.checked || !citeBib.checked) {
    citeOutput.textContent =
      "Row 6 risk (0 pts): having a bibliography without in-text citations — or vice versa — " +
      "earns a 0. Both are required.";
    return;
  }

  if (!citeConsistent.checked) {
    citeOutput.textContent =
      "Row 6 middle band (3 pts): citations are present but consistency or essential elements " +
      "(author, title, publication, date) need attention. An organizational principle in the " +
      "bibliography (alphabetical or numerical) is also required.";
    return;
  }

  citeOutput.textContent =
    "Row 6 alignment looks strong (5 pts): in-text citations and bibliography are both present, " +
    "consistently styled, and include essential elements. Any citation style is acceptable as long " +
    "as it is complete and consistent.";
}

[citeInText, citeBib, citeConsistent]
  .filter(Boolean)
  .forEach(box => box.addEventListener("change", updateCitations));
updateCitations();

// ── Academic Tone Meter (Row 7 sliders) ──────────────────────────────────────

const clarityRange  = $("clarityRange");
const toneRange     = $("toneRange");
const styleOutput   = $("styleOutput");

function updateStyle() {
  if (!clarityRange || !toneRange || !styleOutput) return;

  const clarity = Number(clarityRange.value);
  const tone    = Number(toneRange.value);
  const average = (clarity + tone) / 2;

  // Update aria-valuenow for accessibility
  clarityRange.setAttribute("aria-valuenow", clarity);
  toneRange.setAttribute("aria-valuenow", tone);

  if (average >= 4) {
    styleOutput.textContent =
      "Row 7 alignment (3 pts): clear, varied sentences and consistent academic tone. " +
      "A few minor errors are acceptable as long as they do not impede understanding. " +
      "Remember: scorers evaluate only your own words, not quoted material.";
    return;
  }

  if (average >= 2.5) {
    styleOutput.textContent =
      "Row 7 middle band (2 pts): mostly clear, but check for run-on sentences, fragments, " +
      "colloquial language, imprecise word choices, or overly dense prose that sacrifices coherence.";
    return;
  }

  styleOutput.textContent =
    "Row 7 risk (0 pts): significant errors or informal style may make the response difficult " +
    "to understand, or your writing may be indistinguishable from your sources. Revise for " +
    "academic tone, sentence clarity, and precise word choice.";
}

[clarityRange, toneRange]
  .filter(Boolean)
  .forEach(slider => slider.addEventListener("input", updateStyle));
updateStyle();
