const root = document.querySelector("#root");

const hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const bulan = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const date = new Date();
const namaHari = hari[date.getDay()];
const namaBulan = bulan[date.getMonth()];

document.querySelector(
  ".header"
).textContent = `${namaHari}, ${date.getDate()} ${namaBulan} ${date.getFullYear()}`;

// Menghitung indeks minggu dalam bulan ini (0-3 untuk minggu ke-1 sampai ke-4, lebih dari itu akan ke minggu ke-5)
let mingguKe = Math.ceil(date.getDate() / 7) - 1;
const isMingguKelima = mingguKe >= 4;

// Jadwal piket normal (minggu 0-3)
const jadwal = [
  {
    senin: ["Hasna", "Gumay", "Adinda", "Nilam", "Rizky"],
    rabu: ["Arlin", "Fadhly", "David", "Intan", "Dani"],
  },
  {
    senin: ["Aldiaz", "Isna", "Albait", "Agnes", "Miati"],
    rabu: ["Hafidz", "Evan", "Fadhil", "Dimas", "Niha"],
  },
  {
    senin: ["Zusi", "Reva", "Radit", "Disca", "Wisnu"],
    rabu: ["Aiko", "Shevan", "Rangga", "Alvin", "Valin"],
  },
  {
    senin: ["Berlin", "Maris", "Putra", "Rayyan", "Kelpin"],
    rabu: ["Adib", "Riki", "Laura", "Azka", "Aning"],
  },
];

// Jika minggu kelima, gunakan algoritma khusus untuk memilih jadwal
if (isMingguKelima) {
  const digitKeduaTanggal = String(date.getDate()).slice(-1);
  const bulanKeberapa = date.getMonth() + 1; // Karena index bulan dari 0
  const hasilAlgoritma = (Number(digitKeduaTanggal) * bulanKeberapa) % 4; // Menghasilkan indeks 0-3 untuk memilih jadwal

  const jadwalMingguKelima = jadwal[hasilAlgoritma]; // Pilih jadwal berdasarkan hasil algoritma

  // Menampilkan jadwal untuk hari ini (Senin atau Rabu)
  if (
    namaHari.toLowerCase() === "selasa" ||
    namaHari.toLowerCase() === "minggu"
  ) {
    document.querySelector(".double").textContent =
      "Tidak ada jadwal hari ini, selamat liburan!!";
  } else {
    const jadwalHariIni = jadwalMingguKelima[namaHari.toLowerCase()];

    if (jadwalHariIni) {
      document.querySelector(".double").textContent =
        "Jadwal piket hari ini (Karna minggu ke-5 diacak ya piketnya):";
      jadwalHariIni.forEach((nama) => {
        const n = document.createElement("li");
        n.textContent = `${nama}`;
        n.classList.add("list-group-item");
        n.classList.add("fw-semibold");
        root.appendChild(n);
      });
    } else {
      document.querySelector(".double").textContent =
        "Hari ini adalah produktif, semangatt!!";
    }
  }
} else {
  // Jika bukan minggu kelima, jalankan logika jadwal normal
  const jadwalMingguIni = jadwal[mingguKe] || {};

  if (
    namaHari.toLowerCase() === "selasa" ||
    namaHari.toLowerCase() === "minggu"
  ) {
    document.querySelector(".double").textContent =
      "Tidak ada jadwal hari ini, selamat liburan!!";
  } else {
    const jadwalHariIni = jadwalMingguIni[namaHari.toLowerCase()];

    if (jadwalHariIni) {
      document.querySelector(".double").textContent = "Jadwal piket hari ini :";
      jadwalHariIni.forEach((nama) => {
        const n = document.createElement("li");
        n.textContent = `${nama}`;
        n.classList.add("list-group-item");
        n.classList.add("fw-semibold");
        root.appendChild(n);
      });
    } else {
      document.querySelector(".double").textContent =
        "Hari ini adalah produktif, semangatt!!";
    }
  }
}

// Menampilkan angka algoritma pada hari Kamis, Jumat, dan Sabtu
if (
  namaHari.toLowerCase() === "kamis" ||
  namaHari.toLowerCase() === "jumat" ||
  namaHari.toLowerCase() === "sabtu"
) {
  const jurnal = document.querySelector(".descju");
  const digitKeduaTanggal = String(date.getDate()).slice(-1);
  const angkaJurnal = `${mingguKe}${digitKeduaTanggal}`;
  jurnal.textContent = `Jadwal ambil & mengembalikan jurnal hari ini presensi :`;
  document.querySelector(".nomerJurnal").textContent = angkaJurnal;
}
