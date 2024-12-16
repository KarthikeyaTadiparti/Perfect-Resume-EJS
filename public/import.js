let modifiedData = []; // Declare the variable that holds your modified data

// Function to send the modified data to the server
function sendModifiedDataToServer() {
    if (modifiedData.length === 0) {
        alert("No data to submit.");
        return;
    }

    // Redirect to the edit route with the modified data as a query string
    const queryString = `?data=${encodeURIComponent(JSON.stringify(modifiedData))}`;
    window.location.href = `/home/resume/edit${queryString}`; // This will trigger a redirect to the new page
}

// Function to handle the file selection and conversion to JSON
const folderInput = document.getElementById("csvFolderInput");
const fileList = document.getElementById("fileList");
const jsonDataDisplay = document.getElementById("jsonData");

folderInput.addEventListener("change", (event) => {
    const files = event.target.files;
    fileList.innerHTML = ""; // Clear previous list

    if (files.length === 0) {
        fileList.innerHTML = "<li>No files uploaded yet.</li>";
        return;
    }

    Array.from(files).forEach((file) => {
        // Only process CSV files
        if (file.type === "text/csv" || file.name.endsWith(".csv")) {
            const listItem = document.createElement("li");
            listItem.textContent = file.name;
            fileList.appendChild(listItem);

            // Event listener to read and convert file content
            listItem.addEventListener("click", () => {
                readAndConvertCSV(file);
            });
        }
    });

    // If no CSV files found
    if (!fileList.children.length) {
        fileList.innerHTML =
            "<li>No CSV files found in the selected folder.</li>";
    }
});

function readAndConvertCSV(file) {
    const reader = new FileReader();
    reader.onload = () => {
        const csvContent = reader.result;
        let jsonDataVariable = csvToJson(csvContent); // Convert CSV to JSON
        jsonDataDisplay.textContent = JSON.stringify(jsonDataVariable, null, 2); // Display JSON with indentation

        let modifiedDataTemp = [];
        for (let data of jsonDataVariable) {
            let obj = {
                name: data.Name,
                authority: data.Authority,
                startedOn: data["Started On"],
            };
            modifiedDataTemp.push(obj);
        }

        modifiedData = modifiedDataTemp; // Store the modified data globally
    };
    reader.onerror = () => {
        jsonDataDisplay.textContent = "Error reading file.";
    };
    reader.readAsText(file); // Read file as text
}

function csvToJson(csv) {
    const lines = csv.split("\n").filter((line) => line.trim() !== ""); // Remove empty lines
    const headers = lines[0].split(",").map((header) => header.trim()); // First row is the header
    const rows = lines.slice(1); // Remaining rows are data

    const jsonData = rows.map((row) => {
        const values = row.split(",").map((value) => value.trim());
        const jsonRow = {};
        headers.forEach((header, index) => {
            jsonRow[header] = values[index] || null; // Assign values to headers
        });
        return jsonRow;
    });

    return jsonData;
}
