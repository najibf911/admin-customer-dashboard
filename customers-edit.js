// Harus Dirubah <!>
const API_URL = "http://localhost:5500/customers.json";

// Fetch and render table
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
        <td>
          <button class="btn btn-sm btn-warning" onclick="editCustomer('${c.purchaseId}')">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteCustomer('${c.purchaseId}')">Delete</button>
        </td>
      </tr>`;
  });
}

// Add/Edit customer
document.getElementById("customerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const purchaseId = document.getElementById("purchaseId").value;
  const customerData = {
    customerId: document.getElementById("customerId").value,
    name: document.getElementById("name").value,
    item: document.getElementById("item").value,
    price: parseFloat(document.getElementById("price").value),
    currency: "USD",
    date: new Date().toISOString().split("T")[0]
  };

  if (purchaseId) {
    // Update
    await fetch(`${API_URL}/${purchaseId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customerData),
    });
  } else {
    // Create
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customerData),
    });
  }

  document.getElementById("customerForm").reset();
  document.getElementById("formTitle").textContent = "Add New Purchase";
  loadCustomers();
});

// Edit
async function editCustomer(purchaseId) {
  const res = await fetch(API_URL);
  const data = await res.json();
  const c = data.find(x => x.purchaseId === purchaseId);

  document.getElementById("purchaseId").value = c.purchaseId;
  document.getElementById("customerId").value = c.customerId;
  document.getElementById("name").value = c.name;
  document.getElementById("item").value = c.item;
  document.getElementById("price").value = c.price;

  document.getElementById("formTitle").textContent = "Edit Purchase";
}

// Delete
async function deleteCustomer(purchaseId) {
  if (confirm("Are you sure?")) {
    await fetch(`${API_URL}/${purchaseId}`, { method: "DELETE" });
    loadCustomers();
  }
}

// Cancel edit
document.getElementById("cancelBtn").addEventListener("click", () => {
  document.getElementById("customerForm").reset();
  document.getElementById("formTitle").textContent = "Add New Purchase";
});

// Initial load
loadCustomers();
