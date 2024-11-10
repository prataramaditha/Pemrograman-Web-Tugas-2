document.addEventListener('DOMContentLoaded', () => {
  const daftarBuku = [];
  const riwayatPeminjaman = [];

  // Fungsi untuk menambahkan buku
  document.getElementById('form-tambah-buku').addEventListener('submit', function(e) {
    e.preventDefault();
    const judul = document.getElementById('judul-buku').value;
    const stok = document.getElementById('stok-buku').value;

    daftarBuku.push({ judul, stok });
    renderDaftarBuku();
    e.target.reset();
  });

  // Fungsi untuk menambah riwayat peminjaman
  document.getElementById('form-peminjaman').addEventListener('submit', function(e) {
    e.preventDefault();
    const namaAnggota = document.getElementById('nama-anggota').value;
    const judulBuku = document.getElementById('judul-buku-pinjaman').value;

    const buku = daftarBuku.find(b => b.judul === judulBuku && b.stok > 0);
    if (buku) {
      buku.stok--;
      riwayatPeminjaman.push({ namaAnggota, judulBuku, tanggal: new Date() });
      renderRiwayatPeminjaman();
      renderDaftarBuku();
    } else {
      alert('Buku tidak tersedia');
    }
    e.target.reset();
  });

  // Fungsi untuk merender daftar buku
  function renderDaftarBuku() {
    const daftarBukuDiv = document.getElementById('daftar-buku');
    daftarBukuDiv.innerHTML = '<h4>Daftar Buku</h4>';
    daftarBuku.forEach((buku, index) => {
      daftarBukuDiv.innerHTML += `
        <div class="card">
          <p>Judul: ${buku.judul}</p>
          <p>Stok: ${buku.stok}</p>
          <button onclick="hapusBuku(${index})">Hapus</button>
        </div>
      `;
    });
  }

  // Fungsi untuk menghapus buku berdasarkan index
  window.hapusBuku = function(index) {
    daftarBuku.splice(index, 1);
    renderDaftarBuku();
  };

  // Fungsi untuk merender riwayat peminjaman
  function renderRiwayatPeminjaman() {
    const riwayatDiv = document.getElementById('riwayat-peminjaman');
    riwayatDiv.innerHTML = '<h4>Riwayat Peminjaman</h4>';
    riwayatPeminjaman.forEach((item, index) => {
      riwayatDiv.innerHTML += `
        <div class="card">
          <p>Nama Anggota: ${item.namaAnggota}</p>
          <p>Judul Buku: ${item.judulBuku}</p>
          <p>Tanggal: ${item.tanggal.toLocaleDateString()}</p>
          <button onclick="hapusPeminjaman(${index})">Hapus</button>
        </div>
      `;
    });
  }

  // Fungsi untuk menghapus anggota dari riwayat peminjaman berdasarkan index
  window.hapusPeminjaman = function(index) {
    riwayatPeminjaman.splice(index, 1);
    renderRiwayatPeminjaman();
  };
});
