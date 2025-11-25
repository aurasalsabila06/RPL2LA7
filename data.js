// Data untuk laporan
const reportData = {
    sales: {
        title: "Laporan Penjualan Bulanan",
        company: "PT. NEXUS SOLUTIONS",
        department: "Departemen Penjualan",
        columns: ["No", "Produk", "Kuantitas", "Harga Satuan", "Total"],
        data: [
            { no: 1, product: "Laptop Dell XPS 13", qty: 5, price: 15000000, total: 75000000 },
            { no: 2, product: "Monitor LG 27 inch", qty: 12, price: 3500000, total: 42000000 },
            { no: 3, product: "Keyboard Mechanical", qty: 20, price: 1200000, total: 24000000 },
            { no: 4, product: "Mouse Gaming", qty: 15, price: 450000, total: 6750000 },
            { no: 5, product: "Webcam HD", qty: 8, price: 800000, total: 6400000 },
            { no: 6, product: "Printer HP LaserJet", qty: 3, price: 5000000, total: 15000000 },
            { no: 7, product: "Network Switch", qty: 4, price: 2000000, total: 8000000 },
            { no: 8, product: "UPS 2000VA", qty: 6, price: 3500000, total: 21000000 },
        ],
        summary: {
            totalQty: 73,
            totalRevenue: 198150000,
            avgValue: 24768750,
            topProduct: "Laptop Dell XPS 13"
        }
    },
    inventory: {
        title: "Laporan Stok Barang",
        company: "PT. NEXUS SOLUTIONS",
        department: "Departemen Gudang",
        columns: ["No", "Kode Barang", "Nama Barang", "Stok", "Min. Stok", "Status"],
        data: [
            { no: 1, code: "BRG001", name: "Laptop Dell XPS 13", stock: 15, min: 5, status: "✓ Normal" },
            { no: 2, code: "BRG002", name: "Monitor LG 27 inch", stock: 8, min: 10, status: "⚠ Rendah" },
            { no: 3, code: "BRG003", name: "Keyboard Mechanical", stock: 45, min: 20, status: "✓ Normal" },
            { no: 4, code: "BRG004", name: "Mouse Gaming", stock: 3, min: 10, status: "⚠ Rendah" },
            { no: 5, code: "BRG005", name: "Webcam HD", stock: 12, min: 5, status: "✓ Normal" },
            { no: 6, code: "BRG006", name: "Printer HP LaserJet", stock: 2, min: 3, status: "⚠ Rendah" },
            { no: 7, code: "BRG007", name: "Network Switch", stock: 25, min: 10, status: "✓ Normal" },
            { no: 8, code: "BRG008", name: "UPS 2000VA", stock: 18, min: 8, status: "✓ Normal" },
        ],
        summary: {
            totalItems: 128,
            lowStock: 3,
            normalStock: 5,
            warehouseValue: "Rp. 450.000.000"
        }
    },
    financial: {
        title: "Laporan Keuangan Kuartal",
        company: "PT. NEXUS SOLUTIONS",
        department: "Departemen Keuangan",
        columns: ["No", "Kategori", "Periode", "Nilai", "Persentase"],
        data: [
            { no: 1, category: "Pendapatan Operasional", period: "Q1 2024", value: 500000000, percentage: "35%" },
            { no: 2, category: "Pendapatan Penjualan", period: "Q1 2024", value: 450000000, percentage: "31%" },
            { no: 3, category: "Biaya Operasional", period: "Q1 2024", value: -250000000, percentage: "-17%" },
            { no: 4, category: "Biaya Personel", period: "Q1 2024", value: -180000000, percentage: "-12%" },
            { no: 5, category: "Biaya Utilitas", period: "Q1 2024", value: -50000000, percentage: "-3%" },
            { no: 6, category: "Laba Kotor", period: "Q1 2024", value: 470000000, percentage: "32%" },
        ],
        summary: {
            totalIncome: 950000000,
            totalExpense: 480000000,
            netProfit: 470000000,
            margin: "49.47%"
        }
    }
};

// Format currency
function formatCurrency(value) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

// Format number
function formatNumber(value) {
    return new Intl.NumberFormat('id-ID').format(value);
}

// Get current date
function getCurrentDate() {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    return today.toLocaleDateString('id-ID', options);
}
