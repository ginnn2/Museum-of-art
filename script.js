// Fetch data from the Cleveland Museum of Art API (limit to 10 artworks)
fetch("https://openaccess-api.clevelandart.org/api/artworks/?limit=10")
  .then(response => response.json())  // Convert the response to JSON
  .then(data => {
    // Select the <tbody> of the table where rows will be appended
    const tableBody = document.querySelector("#art-table tbody");

    // Loop through each artwork in the data
    data.data.forEach(work => {
      // Create a new row element
      const row = document.createElement("tr");

      // Create the title cell and insert the artwork title
      const titleCell = document.createElement("td");
      titleCell.textContent = work.title;
      row.appendChild(titleCell);

      // Create the author cell; if no author is available, show "Sconosciuto"
      const authorCell = document.createElement("td");
      authorCell.textContent = work.creators?.[0]?.description || "Sconosciuto";
      row.appendChild(authorCell);

      // Create the image cell and a button to show/hide the image
      const imageCell = document.createElement("td");
      const button = document.createElement("button");
      button.textContent = "Show image";
      imageCell.appendChild(button);
      row.appendChild(imageCell);

      // Variables to track image visibility and the image element
      let imgVisible = false;
      let img = null;

      // Add a click event listener to the button
      button.addEventListener("click", () => {
        if (!imgVisible) {
          // If the image is not visible, create and show it
          img = document.createElement("img");
          img.src = work.images?.web?.url || "";     // Set image source (URL)
          img.alt = "ARTWORKS";
          img.style.maxWidth = "200px";              // Limit image width
          imageCell.appendChild(document.createElement("br")); // Optional line break
          imageCell.appendChild(img);               // Add image to the cell
          button.textContent = "Hide image";        // Update button text
          imgVisible = true;                        // Mark as visible
        } else {
          // If the image is visible, remove it
          imageCell.removeChild(img);               // Remove from DOM
          button.textContent = "Show image";        // Reset button text
          imgVisible = false;                       // Mark as hidden
        }
      });

      // Append the completed row to the table body
      tableBody.appendChild(row);
    });
  })
  .catch(error => console.error("Error loading data:", error)); // Handle any fetch errors
