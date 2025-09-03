const API_URL = "http://localhost:5500/customers.json";

    async function loadCustomers() {
      const res = await fetch(API_URL);
      const data = await res.json();
      const tbody = document.querySelector("#customerTable tbody");
      tbody.innerHTML = "";
      data.forEach((c, index) => {
        tbody.innerHTML += `
          <tr>
            <td>${index + 1}</td>
            <td>${c.customerId}</td>
            <td>${c.purchaseId}</td>
            <td>${c.name}</td>
            <td>${c.item}</td>
            <td>$${c.price} ${c.currency}</td>
            <td>${c.date}</td>
          </tr>`;
      });
    }

    loadCustomers();