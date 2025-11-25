let currentReport = 'sales';

// Show report berdasarkan tipe
function showReport(reportType) {
    currentReport = reportType;
    
    // Update active menu
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.classList.add('active');
    
    generateReport();
}

// Generate laporan
function generateReport() {
    const reportType = currentReport;
    const data = reportData[reportType];
    
    if (!data) {
        showToast('Laporan tidak tersedia', 'error');
        return;
    }
    
    const reportDate = document.getElementById('reportDate').value || new Date().toISOString().split('T')[0];
    const department = document.getElementById('department').value || data.department;
    
    let html = `
        <div class="report" id="printableReport">
            <!-- Header Laporan -->
            <div class="report-header">
                <div class="report-title">${data.title}</div>
                <div class="report-subtitle">${data.company}</div>
                <div class="report-subtitle">${department}</div>
                <div class="report-date">Tanggal: ${new Date(reportDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
            </div>

            <!-- Info Laporan -->
            <div class="report-info">
                <div class="info-item">
                    <span class="info-label">Perusahaan:</span>
                    <span class="info-value">${data.company}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Departemen:</span>
                    <span class="info-value">${department}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Periode:</span>
                    <span class="info-value">${new Date(reportDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Dicetak:</span>
                    <span class="info-value">${getCurrentDate()}</span>
                </div>
            </div>
    `;

    // Render tabel data
    html += renderTable(data);

    // Summary box
    html += renderSummary(data);

    // Footer dan signature
    html += `
            <div class="report-footer">
                <p>Laporan ini adalah dokumen resmi dan bersifat rahasia perusahaan.</p>
                <p>Dibuat oleh: Sistem Laporan Terpadu | Halaman: <span class="page-number">1</span></p>
            </div>

            <div class="signature-section">
                <div class="signature-item">
                    <div class="signature-name">Manajer Divisi</div>
                    <div class="signature-date">Jakarta, ${new Date(reportDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                </div>
                <div class="signature-item">
                    <div class="signature-name">Kepala Departemen</div>
                </div>
                <div class="signature-item">
                    <div class="signature-name">Direktur Utama</div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('reportContainer').innerHTML = html;
    showToast('Laporan berhasil dibuat', 'success');
}

// Render tabel
function renderTable(data) {
    let html = `
        <div class="table-responsive">
            <table>
                <thead>
                    <tr>
    `;

    // Header tabel
    data.columns.forEach(col => {
        html += `<th>${col}</th>`;
    });

    html += `
                    </tr>
                </thead>
                <tbody>
    `;

    // Data rows
    data.data.forEach((row, index) => {
        html += `<tr>`;
        data.columns.forEach(col => {
            let value = row[col.toLowerCase().replace(/\s+/g, '')] || row[col.toLowerCase()];
            
            // Format currency jika nilai numerik besar
            if (typeof value === 'number' && value > 1000) {
                value = formatCurrency(value);
            } else if (typeof value === 'number') {
                value = formatNumber(value);
            }
            
            html += `<td>${value}</td>`;
        });
        html += `</tr>`;
    });

    html += `
                </tbody>
            </table>
        </div>
    `;

    return html;
}

// Render summary
function renderSummary(data) {
    let html = `<div class="summary-box">`;

    if (data.summary) {
        const keys = Object.keys(data.summary);
        keys.forEach(key => {
            const value = data.summary[key];
            const label = key
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, str => str.toUpperCase())
                .trim();
            
            let displayValue = value;
            if (typeof value === 'number' && value > 1000) {
                displayValue = formatCurrency(value);
            }
            
            html += `
                <div class="summary-item">
                    <div class="summary-label">${label}</div>
                    <div class="summary-value">${displayValue}</div>
                </div>
            `;
        });
    }

    html += `</div>`;
    return html;
}

// Print laporan
function printReport() {
    const printableReport = document.getElementById('printableReport');
    
    if (!printableReport) {
        showToast('Laporan belum dibuat', 'error');
        return;
    }

    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Print Laporan</title>
            <link rel="stylesheet" href="styles.css">
            <style>
                body { margin: 0; padding: 20px; }
                .report { box-shadow: none; }
            </style>
        </head>
        <body>
            ${printableReport.innerHTML}
        </body>
        </html>
    `);
    
    printWindow.document.close();
    
    setTimeout(() => {
        printWindow.print();
    }, 250);
    
    showToast('Membuka dialog cetak...', 'success');
}

// Export ke PDF
function exportToPDF() {
    const reportContainer = document.getElementById('printableReport');
    
    if (!reportContainer) {
        showToast('Laporan belum dibuat', 'error');
        return;
    }

    showToast('Memproses PDF...', 'success');

    const element = reportContainer;
    const opt = {
        margin: [10, 10, 10, 10],
        filename: `Laporan-${currentReport}-${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, allowTaint: true },
        jsPDF: { 
            orientation: 'portrait', 
            unit: 'mm', 
            format: 'a4',
            compress: true
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    // Gunakan html2pdf jika tersedia
    if (typeof html2pdf !== 'undefined') {
        html2pdf().set(opt).from(element).save();
        showToast('PDF berhasil diunduh!', 'success');
    } else {
        // Fallback: gunakan jsPDF + html2canvas
        html2canvas(element, { scale: 2, allowTaint: true }).then(canvas => {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
                compress: true
            });

            const imgData = canvas.toDataURL('image/jpeg', 0.98);
            const imgWidth = 190;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            
            let heightLeft = imgHeight;
            let position = 10;

            pdf.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight);
            heightLeft -= (297 - 20);

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight);
                heightLeft -= 277;
            }

            pdf.save(`Laporan-${currentReport}-${new Date().toISOString().split('T')[0]}.pdf`);
            showToast('PDF berhasil diunduh!', 'success');
        }).catch(err => {
            console.error('Error generating PDF:', err);
            showToast('Gagal membuat PDF', 'error');
        });
    }
}

// Toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Set default date to today
document.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('reportDate').value = today;
});
