"use strict";

const apps = {
  employees: {
    title: "Employee tracking dashboard",
    description:
      "A responsive staff directory for adding team members, finding records, and updating work status.",
    storageKey: "mmt-portfolio-employees-v1",
    fields: [
      { name: "name", label: "Employee name", placeholder: "e.g. Amina Rahman" },
      { name: "role", label: "Role", placeholder: "e.g. Warehouse operator" },
      { name: "department", label: "Department", placeholder: "e.g. Warehouse" },
      {
        name: "status",
        label: "Work status",
        type: "select",
        options: ["On shift", "On leave", "Off duty"],
      },
    ],
    columns: [
      { key: "name", label: "Employee" },
      { key: "role", label: "Role" },
      { key: "department", label: "Department" },
      { key: "status", label: "Status", kind: "status" },
    ],
    statusOptions: ["On shift", "On leave", "Off duty"],
    metrics(records) {
      return [
        { label: "Team members", value: records.length },
        {
          label: "On shift",
          value: records.filter((record) => record.status === "On shift").length,
        },
        {
          label: "On leave",
          value: records.filter((record) => record.status === "On leave").length,
        },
      ];
    },
    seed: [
      { id: "emp-1", name: "Amina Rahman", role: "Team lead", department: "Warehouse", status: "On shift" },
      { id: "emp-2", name: "Omar Hassan", role: "Inventory clerk", department: "Inventory", status: "On shift" },
      { id: "emp-3", name: "Sara Malik", role: "Dispatch coordinator", department: "Transport", status: "On leave" },
    ],
  },
  inventory: {
    title: "Inventory tracker dashboard",
    description:
      "A stock ledger for registering SKUs, adjusting quantities, checking reorder levels, and locating items.",
    storageKey: "mmt-portfolio-inventory-v1",
    fields: [
      { name: "name", label: "Item name", placeholder: "e.g. Safety gloves" },
      { name: "sku", label: "SKU", placeholder: "e.g. PPE-104" },
      { name: "quantity", label: "Quantity on hand", type: "number", min: 0, step: 1, value: 0 },
      { name: "reorderLevel", label: "Reorder level", type: "number", min: 0, step: 1, value: 5 },
      { name: "location", label: "Storage location", placeholder: "e.g. WH-A / Rack 02" },
    ],
    columns: [
      { key: "sku", label: "SKU" },
      { key: "name", label: "Item" },
      { key: "quantity", label: "On hand", kind: "quantity" },
      { key: "location", label: "Location" },
      { key: "stockStatus", label: "Stock status", kind: "stockStatus" },
    ],
    metrics(records) {
      return [
        { label: "SKUs", value: records.length },
        {
          label: "Units on hand",
          value: records.reduce((total, record) => total + record.quantity, 0),
        },
        {
          label: "Reorder needed",
          value: records.filter((record) => record.quantity <= record.reorderLevel).length,
        },
      ];
    },
    seed: [
      { id: "sku-1", sku: "PPE-104", name: "Safety gloves", quantity: 42, reorderLevel: 10, location: "WH-A / Rack 02" },
      { id: "sku-2", sku: "PKG-208", name: "Packing cartons", quantity: 8, reorderLevel: 12, location: "WH-B / Rack 04" },
      { id: "sku-3", sku: "MRO-317", name: "Hand pallet jack", quantity: 3, reorderLevel: 2, location: "Workshop / Bay 1" },
    ],
  },
  fleet: {
    title: "Fleet dispatch board",
    description:
      "A simple dispatch log for assigning a vehicle, driver, and route, then following movement status.",
    storageKey: "mmt-portfolio-fleet-v1",
    fields: [
      { name: "vehicle", label: "Vehicle ID", placeholder: "e.g. TRK-024" },
      { name: "driver", label: "Driver", placeholder: "e.g. Faisal Ahmed" },
      { name: "route", label: "Route / destination", placeholder: "e.g. Dammam → Al Khobar" },
      {
        name: "status",
        label: "Movement status",
        type: "select",
        options: ["Planned", "In transit", "Delivered"],
      },
    ],
    columns: [
      { key: "vehicle", label: "Vehicle" },
      { key: "driver", label: "Driver" },
      { key: "route", label: "Route" },
      { key: "status", label: "Status", kind: "status" },
    ],
    statusOptions: ["Planned", "In transit", "Delivered"],
    metrics(records) {
      return [
        { label: "Movements", value: records.length },
        {
          label: "In transit",
          value: records.filter((record) => record.status === "In transit").length,
        },
        {
          label: "Delivered",
          value: records.filter((record) => record.status === "Delivered").length,
        },
      ];
    },
    seed: [
      { id: "trip-1", vehicle: "TRK-024", driver: "Faisal Ahmed", route: "Dammam → Al Khobar", status: "In transit" },
      { id: "trip-2", vehicle: "VAN-011", driver: "Noura Saleh", route: "Jubail → Dammam", status: "Planned" },
      { id: "trip-3", vehicle: "TRK-008", driver: "Khalid Amin", route: "Al Khobar → Dhahran", status: "Delivered" },
    ],
  },
  safety: {
    title: "Safety action register",
    description:
      "A practical HSE follow-up list for recording hazards, assigning an owner, setting risk, and closing actions.",
    storageKey: "mmt-portfolio-safety-v1",
    fields: [
      { name: "hazard", label: "Hazard / action", placeholder: "Describe the observation" },
      { name: "location", label: "Area", placeholder: "e.g. Loading bay" },
      {
        name: "risk",
        label: "Risk level",
        type: "select",
        options: ["Low", "Medium", "High"],
      },
      { name: "owner", label: "Action owner", placeholder: "e.g. Shift supervisor" },
      {
        name: "status",
        label: "Action status",
        type: "select",
        options: ["Open", "In progress", "Closed"],
      },
    ],
    columns: [
      { key: "hazard", label: "Hazard / action" },
      { key: "location", label: "Area" },
      { key: "risk", label: "Risk", kind: "risk" },
      { key: "owner", label: "Owner" },
      { key: "status", label: "Status", kind: "status" },
    ],
    statusOptions: ["Open", "In progress", "Closed"],
    metrics(records) {
      return [
        { label: "Action items", value: records.length },
        {
          label: "Open actions",
          value: records.filter((record) => record.status !== "Closed").length,
        },
        {
          label: "High risk · open",
          value: records.filter((record) => record.risk === "High" && record.status !== "Closed").length,
        },
      ];
    },
    seed: [
      { id: "hse-1", hazard: "Pallets stored outside marked area", location: "Loading bay", risk: "Medium", owner: "Shift supervisor", status: "Open" },
      { id: "hse-2", hazard: "Inspect damaged extension lead", location: "Workshop", risk: "High", owner: "Maintenance lead", status: "In progress" },
      { id: "hse-3", hazard: "Refresh pedestrian walkway markings", location: "Warehouse aisle 3", risk: "Low", owner: "Facilities", status: "Closed" },
    ],
  },
};

const appKey = new URLSearchParams(window.location.search).get("app");
const app = apps[appKey] ? apps[appKey] : apps.employees;
const activeAppKey = apps[appKey] ? appKey : "employees";
const storageAvailable = (() => {
  try {
    return Boolean(window.localStorage);
  } catch {
    return false;
  }
})();

const titleElement = document.getElementById("app-title");
const descriptionElement = document.getElementById("app-description");
const metricsElement = document.getElementById("metrics");
const formElement = document.getElementById("record-form");
const fieldsElement = document.getElementById("form-fields");
const headElement = document.getElementById("records-head");
const bodyElement = document.getElementById("records-body");
const searchElement = document.getElementById("record-search");
const messageElement = document.getElementById("status-message");
const emptyElement = document.getElementById("empty-state");
let records = readRecords();

function createId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `record-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function copySeedRecords() {
  return app.seed.map((record) => ({ ...record }));
}

function readRecords() {
  if (!storageAvailable) return copySeedRecords();
  try {
    const saved = window.localStorage.getItem(app.storageKey);
    if (saved === null) {
      const initial = copySeedRecords();
      window.localStorage.setItem(app.storageKey, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed) || parsed.some((record) => !record || typeof record.id !== "string")) {
      throw new Error("Saved demo data has an unexpected format.");
    }
    return parsed;
  } catch (error) {
    setMessage(`Could not load saved browser data: ${error.message}`, true);
    return copySeedRecords();
  }
}

function saveRecords() {
  if (!storageAvailable) {
    setMessage("Browser storage is unavailable. Changes will last only until this page closes.", true);
    return false;
  }
  try {
    window.localStorage.setItem(app.storageKey, JSON.stringify(records));
    return true;
  } catch (error) {
    setMessage(`Could not save changes in this browser: ${error.message}`, true);
    return false;
  }
}

function setMessage(message, isError = false) {
  messageElement.textContent = message;
  messageElement.classList.toggle("is-error", isError);
}

function addOptions(select, options, selectedValue) {
  options.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    option.selected = value === selectedValue;
    select.append(option);
  });
}

function renderForm() {
  fieldsElement.replaceChildren();
  app.fields.forEach((field) => {
    const wrapper = document.createElement("div");
    wrapper.className = "field";
    const label = document.createElement("label");
    label.htmlFor = `field-${field.name}`;
    label.textContent = field.label;
    let control;
    if (field.type === "select") {
      control = document.createElement("select");
      addOptions(control, field.options, field.options[0]);
    } else {
      control = document.createElement("input");
      control.type = field.type || "text";
      control.placeholder = field.placeholder || "";
      if (field.type === "number") {
        control.min = String(field.min);
        control.step = String(field.step);
        control.value = String(field.value);
      }
    }
    control.id = `field-${field.name}`;
    control.name = field.name;
    control.required = true;
    wrapper.append(label, control);
    fieldsElement.append(wrapper);
  });
}

function renderMetrics() {
  metricsElement.replaceChildren();
  app.metrics(records).forEach((item) => {
    const card = document.createElement("article");
    card.className = "metric";
    const label = document.createElement("span");
    label.textContent = item.label;
    const value = document.createElement("strong");
    value.textContent = String(item.value);
    card.append(label, value);
    metricsElement.append(card);
  });
}

function makeStatusSelect(record, fieldName) {
  const select = document.createElement("select");
  select.className = "row-select";
  const recordName =
    record.name || record.sku || record.vehicle || record.hazard || "record";
  select.setAttribute("aria-label", `Update ${recordName} ${fieldName}`);
  select.dataset.recordId = record.id;
  select.dataset.field = fieldName;
  addOptions(select, app.statusOptions, record[fieldName]);
  return select;
}

function makeDeleteButton(record) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "mini-button delete";
  button.textContent = "×";
  button.title = "Delete record";
  button.setAttribute("aria-label", `Delete ${record.name || record.sku || record.vehicle || record.hazard}`);
  button.dataset.action = "delete";
  button.dataset.recordId = record.id;
  return button;
}

function makeStockControls(record) {
  const wrapper = document.createElement("div");
  wrapper.className = "stock-actions";
  const quantity = document.createElement("span");
  quantity.className = "stock-quantity";
  quantity.textContent = String(record.quantity);
  quantity.classList.toggle("is-low", record.quantity <= record.reorderLevel);
  const decrease = document.createElement("button");
  decrease.type = "button";
  decrease.className = "mini-button";
  decrease.textContent = "−";
  decrease.title = "Remove one unit";
  decrease.setAttribute("aria-label", `Remove one ${record.name}`);
  decrease.disabled = record.quantity < 1;
  decrease.dataset.action = "decrease-stock";
  decrease.dataset.recordId = record.id;
  const increase = document.createElement("button");
  increase.type = "button";
  increase.className = "mini-button";
  increase.textContent = "+";
  increase.title = "Add one unit";
  increase.setAttribute("aria-label", `Add one ${record.name}`);
  increase.dataset.action = "increase-stock";
  increase.dataset.recordId = record.id;
  wrapper.append(decrease, quantity, increase);
  return wrapper;
}

function appendCell(row, record, column) {
  const cell = document.createElement("td");
  const value = record[column.key] ?? "";
  if (column.kind === "status") {
    cell.append(makeStatusSelect(record, column.key));
  } else if (column.kind === "quantity") {
    cell.append(makeStockControls(record));
  } else if (column.kind === "stockStatus") {
    const low = record.quantity <= record.reorderLevel;
    const badge = document.createElement("span");
    badge.className = `status-pill${low ? " is-alert" : ""}`;
    badge.textContent = low ? "Reorder" : "In stock";
    cell.append(badge);
  } else if (column.kind === "risk") {
    const badge = document.createElement("span");
    badge.className = `status-pill${value === "High" ? " is-alert" : ""}`;
    badge.textContent = value;
    cell.append(badge);
  } else {
    cell.textContent = String(value);
  }
  row.append(cell);
}

function renderTable() {
  const headerRow = document.createElement("tr");
  app.columns.forEach((column) => {
    const heading = document.createElement("th");
    heading.scope = "col";
    heading.textContent = column.label;
    headerRow.append(heading);
  });
  const manageHeading = document.createElement("th");
  manageHeading.scope = "col";
  manageHeading.textContent = "Manage";
  headerRow.append(manageHeading);
  headElement.replaceChildren(headerRow);

  const query = searchElement.value.trim().toLocaleLowerCase();
  const visibleRecords = records.filter((record) =>
    app.columns.some((column) =>
      String(record[column.key] ?? "").toLocaleLowerCase().includes(query),
    ),
  );
  const fragment = document.createDocumentFragment();
  visibleRecords.forEach((record) => {
    const row = document.createElement("tr");
    app.columns.forEach((column) => appendCell(row, record, column));
    const manageCell = document.createElement("td");
    const actions = document.createElement("div");
    actions.className = "row-actions";
    actions.append(makeDeleteButton(record));
    manageCell.append(actions);
    row.append(manageCell);
    fragment.append(row);
  });
  bodyElement.replaceChildren(fragment);
  emptyElement.hidden = visibleRecords.length > 0;
}

function render() {
  renderMetrics();
  renderTable();
}

function renderApp() {
  document.title = `${app.title} | Muhammad Mohsin Tallat`;
  titleElement.textContent = app.title;
  descriptionElement.textContent = app.description;
  document.getElementById("records-title").textContent =
    activeAppKey === "employees" ? "Team members" :
      activeAppKey === "inventory" ? "Stock items" :
        activeAppKey === "fleet" ? "Vehicle movements" : "Safety actions";
  document.getElementById("form-title").textContent =
    activeAppKey === "employees" ? "Add team member" :
      activeAppKey === "inventory" ? "Register stock item" :
        activeAppKey === "fleet" ? "Plan movement" : "Log safety action";
  document.getElementById("submit-record").textContent =
    activeAppKey === "employees" ? "Add team member" :
      activeAppKey === "inventory" ? "Add stock item" :
        activeAppKey === "fleet" ? "Add movement" : "Add safety action";
  document.querySelectorAll("[data-app-link]").forEach((link) => {
    if (link.dataset.appLink === activeAppKey) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
  renderForm();
  render();
}

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!formElement.reportValidity()) return;
  const formData = new FormData(formElement);
  const record = { id: createId() };
  app.fields.forEach((field) => {
    const value = String(formData.get(field.name) ?? "").trim();
    record[field.name] = field.type === "number" ? Number(value) : value;
  });
  if (
    activeAppKey === "inventory" &&
    records.some((existing) => existing.sku.toLocaleLowerCase() === record.sku.toLocaleLowerCase())
  ) {
    setMessage("That SKU already exists. Use the existing row to adjust its quantity.", true);
    return;
  }
  records.unshift(record);
  const saved = saveRecords();
  render();
  formElement.reset();
  if (saved) setMessage("Record added.");
});

searchElement.addEventListener("input", renderTable);

bodyElement.addEventListener("change", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLSelectElement) || !target.dataset.recordId) return;
  const record = records.find((item) => item.id === target.dataset.recordId);
  if (!record || !app.statusOptions.includes(target.value)) return;
  record[target.dataset.field] = target.value;
  const saved = saveRecords();
  render();
  if (saved) setMessage("Status updated.");
});

bodyElement.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const recordIndex = records.findIndex((item) => item.id === button.dataset.recordId);
  if (recordIndex < 0) return;
  if (button.dataset.action === "delete") {
    records.splice(recordIndex, 1);
    const saved = saveRecords();
    render();
    if (saved) setMessage("Record deleted.");
    return;
  }
  if (activeAppKey !== "inventory") return;
  if (button.dataset.action === "increase-stock") records[recordIndex].quantity += 1;
  if (button.dataset.action === "decrease-stock") {
    records[recordIndex].quantity = Math.max(0, records[recordIndex].quantity - 1);
  }
  const saved = saveRecords();
  render();
  if (saved) setMessage("Stock quantity updated.");
});

document.getElementById("reset-demo").addEventListener("click", () => {
  records = copySeedRecords();
  const saved = saveRecords();
  searchElement.value = "";
  render();
  if (saved) setMessage("Sample records restored for this project.");
});

renderApp();
if (!storageAvailable && !messageElement.textContent) {
  setMessage("Browser storage is unavailable. Changes will last only until this page closes.", true);
}
