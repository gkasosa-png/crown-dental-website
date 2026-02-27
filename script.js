// Crown Dental - Site-wide Branch Memory (localStorage)
(function () {
  const BRANCH = {
    makeni: {
      label: "Makeni Branch",
      phone: "+260975623433",
      waText: "Hello Crown Dental Clinic Makeni, I would like to book an appointment."
    },
    munali: {
      label: "Munali Branch",
      phone: "+260776112421",
      waText: "Hello Crown Dental Clinic Munali, I would like to book an appointment."
    }
  };

  function getSavedBranch() {
    return localStorage.getItem("crown_branch") || "makeni";
  }

  function saveBranch(key) {
    localStorage.setItem("crown_branch", key);
  }

  function waLink(branchKey) {
    const b = BRANCH[branchKey] || BRANCH.makeni;
    return "https://wa.me/" + b.phone.replace("+", "") + "?text=" + encodeURIComponent(b.waText);
  }

  function syncFloatingWhatsApp(branchKey) {
    const floatBtn = document.querySelector(".whatsapp-float");
    if (floatBtn) floatBtn.href = waLink(branchKey);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const saved = getSavedBranch();
    syncFloatingWhatsApp(saved);

    // Any button/link with data-branch will save and update
    document.querySelectorAll("[data-branch]").forEach((el) => {
      el.addEventListener("click", () => {
        const key = el.getAttribute("data-branch");
        if (key === "makeni" || key === "munali") {
          saveBranch(key);
          syncFloatingWhatsApp(key);
        }
      });
    });

    // If the contact page selector exists
    const sel = document.getElementById("branch");
    if (sel) {
      sel.value = saved;
      sel.addEventListener("change", (e) => {
        const key = e.target.value;
        if (key === "makeni" || key === "munali") {
          saveBranch(key);
          syncFloatingWhatsApp(key);
        }
      });
    }
  });
})();