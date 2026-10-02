document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("quote-form");
  const status = document.querySelector(".form-status");

  if (!form) return;

  const buildMailtoLink = (data) => {
    const subject = encodeURIComponent("Free Quote Request from PrecisionCalibre");
    const bodyLines = [
      "Name: " + (data.name || ""),
      "Phone: " + (data.phone || ""),
      "Email: " + (data.email || ""),
      "House or business: " + (data.property_type || ""),
      "Service: " + (data.service || ""),
      "Address: " + (data.address || ""),
      "Anything else we should know: " + (data.notes || ""),
      ""
    ];

    return `mailto:precisioncalibre@outlook.com?subject=${subject}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const payload = {
      name: formData.get("name")?.toString().trim() || "",
      phone: formData.get("phone")?.toString().trim() || "",
      email: formData.get("email")?.toString().trim() || "",
      property_type: formData.get("property_type")?.toString().trim() || "",
      service: formData.get("service")?.toString().trim() || "",
      address: formData.get("address")?.toString().trim() || "",
      notes: formData.get("notes")?.toString().trim() || ""
    };

    const mailtoLink = buildMailtoLink(payload);
    window.location.href = mailtoLink;

    if (status) {
      status.textContent = "Your request is ready to send via email.";
      status.className = "form-status success";
    }

    form.reset();
  });
});
