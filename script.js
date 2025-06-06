fetch("https://openaccess-api.clevelandart.org/api/artworks/?limit=10")
  .then(response => response.json())
  .then(data => {
    const tableBody = document.querySelector("#art-table tbody");

    data.data.forEach(work => {
      const row = document.createElement("tr");

      const titleCell = document.createElement("td");
      titleCell.textContent = work.title;
      row.appendChild(titleCell);

      const authorCell = document.createElement("td");
      authorCell.textContent = work.creators?.[0]?.description || "Sconosciuto";
      row.appendChild(authorCell);

      const imageCell = document.createElement("td");
      const button = document.createElement("button");
      button.textContent = "Mostra immagine";
      imageCell.appendChild(button);
      row.appendChild(imageChell);

      button.addEventListener("click", () => {
        const img = document.createElement("img");
        img.src = work.images?.web?.url || "";
        img.alt = "Opera d'arte";
        img.style.maxWidth = "200px";
        imageCell.appendChild(document.createElement("br"));
        imageCell.appendChild(img);
        button.disabled = true;
      });

      imageCell.appendChild(button);
      row.appendChild(imageChell);
      
      tableBody.appendChild(row);
    });
  })
  .catch(error => console.error("Errore nel caricamento dei dati:", error));
