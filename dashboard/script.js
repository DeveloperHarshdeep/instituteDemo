const students = [
    { name: "Harshdeep", roll: "12873", password: "@@@@@", dob: "12/07/2006", image: "https://i.imgur.com/0y0y0y0.png" },
    { name: "Sahil",     roll: "178071", password: "240120012", dob: "12/01/2012", image: "https://i.imgur.com/dyKX2A5.jpeg" }
  ];
  
  function renderTable(data) {
    const table = document.getElementById("studentTable");
    table.innerHTML = "";
    data.forEach((s, i) => {
      table.innerHTML += `
        <tr>
          <td>${i+1}</td>
          <td><img src="${s.image}" /></td>
          <td>${s.name}</td>
          <td>${s.roll}</td>
          <td>${s.password}</td>
          <td>${s.dob}</td>
          <td>
            <div class="actions" onclick="toggleDropdown(this)">
              <span class="dots">⋮</span>
              <div class="dropdown">
                <button onclick="editStudent(${i})">Edit</button>
                <button onclick="deleteStudent(${i})">Delete</button>
                <button onclick="uploadCertificate(${i})">Upload Certificate</button>
              </div>
            </div>
          </td>
        </tr>`;
    });
  }
  
  // three-dot dropdown
  function toggleDropdown(el) {
    document.querySelectorAll('.actions').forEach(a => a!==el && a.classList.remove('open'));
    el.classList.toggle('open');
  }
  
  // search, sort, add
  function searchStudents() {
    const q = document.getElementById("searchInput").value.toLowerCase();
    renderTable(students.filter(s => s.name.toLowerCase().includes(q)));
  }
  function sortStudents() {
    const v = document.getElementById("sortSelect").value;
    const sorted = [...students].sort((a,b) => v==="az" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
    renderTable(sorted);
  }
  function addStudent()          { alert("Add Student clicked!"); }
  function editStudent(i)        { alert(`Edit ${students[i].name}`); }
  function deleteStudent(i)      { alert(`Delete ${students[i].name}`); }
  function uploadCertificate(i)  { alert(`Upload cert for ${students[i].name}`); }
  
  renderTable(students);
  
  // close any open dropdown if clicked outside
  window.addEventListener("click", e => {
    if (!e.target.closest(".actions")) {
      document.querySelectorAll(".actions").forEach(a => a.classList.remove("open"));
    }
  });
  
  // sidebar & mobile menu toggles
  const sidebar      = document.querySelector(".sidebar");
  const sidebarToggle= document.getElementById("sidebarToggle");
  const mobileToggle = document.getElementById("mobileMenuToggle");
  const mobileMenu   = document.getElementById("mobileMenu");
  
  sidebarToggle.addEventListener("click", () => sidebar.classList.toggle("collapsed"));
  mobileToggle.addEventListener("click", () => mobileMenu.classList.toggle("show"));
  