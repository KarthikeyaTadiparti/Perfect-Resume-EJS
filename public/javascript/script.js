let educationCount = 1;

function addEducationSection() {
    // Select the container that holds all education sections
    const educationContainer = document.getElementById("education-container");

    // Select the first education section as a template
    const firstSection = document.querySelector(".education-section");

    if (firstSection) {
        // Clone the first education section
        const newSection = firstSection.cloneNode(true);

        // Clear all input values in the cloned section
        const inputs = newSection.querySelectorAll("input");
        inputs.forEach(input => {
            input.value = ""; // Clear the value
        });

        // Append the cloned section to the container
        educationContainer.appendChild(newSection);
    } else {
        console.error("No template education section found!");
    }

    // Optionally scroll to the newly added section (UX improvement)
    const newSection = educationContainer.lastElementChild;
    if (newSection) {
        newSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

function updatePreview() {
    // Get the preview box element
    const previewBox = document.getElementById("previewBox");

    // Clear the preview box
    previewBox.innerHTML = "";

    // Update Personal Information Preview
    const firstName = document.getElementById("firstName").value || "";
    const lastName = document.getElementById("lastName").value || "";
    const email = document.getElementById("email").value || "";
    const number = document.getElementById("number").value || "";
    const city = document.getElementById("city").value || "";
    const state = document.getElementById("state").value || "";
    const objective = document.getElementById("message").value || "";

    const personalPreview = `
        <div class="personal">
            <p class="fullname">${firstName} ${lastName}</p>
            <div class="personal-details">
                <p class="email">${email}</p> |
                <p class="mobile">${number}</p> |
                <p class="address">${city}, ${state}</p>
            </div>
            
            <h1 class="objective-heading">Career Objective</h1>
            <p class="objective">${objective}</p>
        </div>
    `;

    previewBox.innerHTML += personalPreview;

    // Update Education Section Preview
    const educationSections = document.querySelectorAll(".education-section");
    let educationPreview = `
        <div>
            <h2 class="font-bold text-lg mb-2">Education</h2>
    `;

    educationSections.forEach((section, index) => {
        const institution = section.querySelector(".institution").value || "";
        const field = section.querySelector(".field").value || "";
        const degree = section.querySelector(".degree").value || "";
        const percentage = section.querySelector(".percentage").value || "";
        const from = section.querySelector(".from").value || "";
        const to = section.querySelector(".to").value || "";

        if (institution || degree || field || percentage) {
            educationPreview += `
                <div class="mb-4">
                    <p><strong>Institution ${index + 1}:</strong> ${institution}</p>
                    <p><strong>Field of Study:</strong> ${field}</p>
                    <p><strong>Degree:</strong> ${degree}</p>
                    <p><strong>Percentage:</strong> ${percentage}</p>
                    <p><strong>From:</strong> ${from} <strong>To:</strong> ${to}</p>
                </div>
            `;
        }
    });

    educationPreview += "</div>";
    previewBox.innerHTML += educationPreview;
}

// Attach updatePreview to all input fields
document.querySelectorAll(".inputFields").forEach((input) => {
    input.addEventListener("input", updatePreview);
});

// Trigger initial preview
updatePreview();

function download() {
    const element = document.getElementById("previewBox");
    html2pdf()
        .from(element)
        .set({
            margin: 1,
            filename: "download.pdf",
            html2canvas: {
                scale: 4,
                dpi: 300,
            },
            jsPDF: {
                unit: "mm",
                format: "a4",
                orientation: "portrait",
            },
        })
        .save();
}
