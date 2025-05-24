function validateForm() {
  const messageBox = document.getElementById("formMessage");
  messageBox.innerHTML = "";
  messageBox.className = "";

  // Remove previous field highlights
  document.querySelectorAll('.error-field').forEach(el => {
    el.classList.remove('error-field');
  });

  // Collect form values
  const nama = document.getElementById("nama").value.trim();
  const program = document.getElementById("program").value.trim();
  const noId = document.getElementById("noId").value.trim();
  const telefon = document.getElementById("telefon").value.trim();
  const aktiviti = document.getElementById("aktiviti").value.trim();
  const tarikh = document.getElementById("tarikh").value;
  const tempat = document.getElementById("tempat").value.trim();
  const masa = document.getElementById("masa").value;

  const errorMessages = [];
  let isValid = true;

  // Validate fields
  if (!nama) {
    markError("nama");
    errorMessages.push("Sila isi nama pengguna.");
    isValid = false;
  }

  if (!program) {
    markError("program");
    errorMessages.push("Sila isi program.");
    isValid = false;
  }

  if (!noId) {
    markError("noId");
    errorMessages.push("Sila isi nombor staf/pelajar.");
    isValid = false;
  } else if (!/^\d{10}$/.test(noId)) {
    markError("noId");
    errorMessages.push("Nombor staf/pelajar mesti mengandungi tepat 10 digit.");
    isValid = false;
  }

  if (!telefon) {
    markError("telefon");
    errorMessages.push("Sila isi nombor telefon.");
    isValid = false;
  } else if (!/^\d{11}$/.test(telefon)) {
    markError("telefon");
    errorMessages.push("Nombor telefon mesti mengandungi tepat 11 digit.");
    isValid = false;
  }

  if (!aktiviti) {
    markError("aktiviti");
    errorMessages.push("Sila isi tajuk aktiviti.");
    isValid = false;
  }

  if (!tarikh) {
    markError("tarikh");
    errorMessages.push("Sila pilih tarikh.");
    isValid = false;
  }

  if (!tempat) {
    markError("tempat");
    errorMessages.push("Sila isi tempat.");
    isValid = false;
  }

  if (!masa) {
    markError("masa");
    errorMessages.push("Sila pilih masa.");
    isValid = false;
  }

  // Equipment selection
  const equipmentIds = [
    "khemah", "mejaBulat", "mejaPanjang", "kerusiBanquet",
    "kerusiLengan", "kerusiPlastik", "rostrum", "platform",
    "backdrop", "sofa"
  ];

  let totalItems = 0;
  for (const id of equipmentIds) {
    totalItems += parseInt(document.getElementById(id).value);
  }

  if (totalItems === 0) {
    errorMessages.push("Sila pilih sekurang-kurangnya satu (1) peralatan dari senarai.");
    isValid = false;
  } else if (totalItems >= 10) {
    errorMessages.push("Jumlah maksimum pinjaman peralatan ialah 10 unit sahaja!");
    isValid = false;
  }

  // Display error or success
  if (!isValid) {
    messageBox.innerHTML = errorMessages.map(msg => `<p>${msg}</p>`).join("");
    messageBox.className = "error-box";
    window.scrollTo({ top: messageBox.offsetTop - 20, behavior: 'smooth' });
    return false;
  }

  // Success
  showSuccess("Permohonan berjaya dihantar!");
  displayResult();
  return false;
}

function markError(fieldId) {
  const field = document.getElementById(fieldId);
  field.classList.add("error-field");
}

function showSuccess(message) {
  const box = document.getElementById("formMessage");
  box.innerHTML = `<p>${message}</p>`;
  box.className = "success-box";
}

function displayResult() {
  const result = document.getElementById("result");

  const nama = document.getElementById("nama").value;
  const program = document.getElementById("program").value;
  const noId = document.getElementById("noId").value;
  const telefon = document.getElementById("telefon").value;
  const aktiviti = document.getElementById("aktiviti").value;
  const tarikh = document.getElementById("tarikh").value;
  const tempat = document.getElementById("tempat").value;
  const masa = document.getElementById("masa").value;

  const items = {
    khemah: "KHEMAH 20' X 20'",
    mejaBulat: "MEJA MAKAN BULAT",
    mejaPanjang: "MEJA PANJANG",
    kerusiBanquet: "KERUSI BANQUET",
    kerusiLengan: "KERUSI BANQUET BERLENGAN",
    kerusiPlastik: "KERUSI PLASTIK",
    rostrum: "ROSTRUM",
    platform: "PLATFORM 4' X 8'",
    backdrop: "BACKDROP 4 X 8'",
    sofa: "SOFA (Dewan Seri Semarak Sahaja)"
  };

  let itemList = "";
  for (const [id, label] of Object.entries(items)) {
    const val = parseInt(document.getElementById(id).value);
    if (val > 0) {
      itemList += `<li>${label}: ${val} unit</li>`;
    }
  }

  result.innerHTML = `
    <div class="success-box" id="printArea">
      <h3>Maklumat Permohonan:</h3>
      <p><strong>Nama:</strong> ${nama}</p>
      <p><strong>Program:</strong> ${program}</p>
      <p><strong>No ID:</strong> ${noId}</p>
      <p><strong>Telefon:</strong> ${telefon}</p>
      <p><strong>Aktiviti:</strong> ${aktiviti}</p>
      <p><strong>Tarikh:</strong> ${tarikh}</p>
      <p><strong>Tempat:</strong> ${tempat}</p>
      <p><strong>Masa:</strong> ${masa}</p>
      <h4>Peralatan Dimohon:</h4>
      <ul>${itemList}</ul>
    </div>

    <button onclick="window.print()" class="btn btn-print">Cetak Permohonan</button>
  `;
}













































