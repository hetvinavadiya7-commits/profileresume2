const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");
const downloadButtons = document.querySelectorAll(".download-button");
const downloadStatus = document.querySelector("#download-status");
const resumeTitle = "Alex Morgan — Software Engineer";

document.querySelector("#current-year").textContent = new Date().getFullYear();

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
  navigation.classList.toggle("is-open", !isExpanded);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    navigation.classList.remove("is-open");
  });
});

function getResumeText() {
  const sections = [...document.querySelectorAll("main > section")]
    .filter((section) => section.id !== "home")
    .map((section) => {
      const heading = section.querySelector("h2")?.textContent.replace(/\s+/g, " ").trim();
      const content = section.innerText
        .replace(/\n{3,}/g, "\n\n")
        .replace(/Download resume/gi, "")
        .trim();
      return heading ? `${heading.toUpperCase()}\n${content}` : content;
    });

  return [
    resumeTitle.toUpperCase(),
    "Software Engineer | Seattle, Washington",
    "alex.morgan@example.com | +1 (206) 555-0142",
    "GitHub: https://github.com/alexmorgan",
    "LinkedIn: https://www.linkedin.com/in/alexmorgan-dev",
    "",
    ...sections,
  ].join("\n\n");
}

downloadButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const resume = new Blob([getResumeText()], { type: "text/plain;charset=utf-8" });
    const downloadUrl = URL.createObjectURL(resume);
    const downloadLink = document.createElement("a");
    downloadLink.href = downloadUrl;
    downloadLink.download = "alex-morgan-resume.txt";
    document.body.append(downloadLink);
    downloadLink.click();
    downloadLink.remove();
    window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
    downloadStatus.textContent = "Resume downloaded.";
  });
});

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}
