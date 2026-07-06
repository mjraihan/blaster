$(function () {

    $("#excelFile").on("change", importExcel);

    $(document).on("click", ".useGuest", function () {

        $("#guestName").val($(this).data("name"));
        $("#phone").val($(this).data("phone"));

        renderPreview();

        $("html, body").animate({
            scrollTop: $("#guestName").offset().top - 20
        }, 300);

    });

    $(document).on("click", ".sendGuest", function () {
        const name = $(this).data("name");
        const phone = $(this).data("phone");

        $("#guestName").val(name);
        $("#phone").val(phone);

        renderPreview();
        markAsSent(phone);
        renderGuestTable(window.guestRows);
        sendWhatsApp();
    });

    $(document).on("click", ".resetGuest", function(){
        const phone = $(this).data("phone");
        removeStatus(phone);
        renderGuestTable(window.guestRows);
    });

});

function importExcel(e) {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {

        const data = new Uint8Array(event.target.result);

        const workbook = XLSX.read(data, {
            type: "array"
        });

        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        const rows = XLSX.utils.sheet_to_json(sheet, {
            header: 1,
            defval: ""
        });

        renderGuestTable(rows);

    };

    reader.readAsArrayBuffer(file);


}

function renderGuestTable(rows) {
    window.guestRows = rows;

    if (rows.length <= 1) {

        $("#guestTable").html(`
            <tr>
                <td colspan="5" class="text-center py-4">
                    Belum ada data
                </td>
            </tr>
        `);

        return;
    }

    let html = "";

    rows.slice(1).forEach((row, index) => {

        const name = row[0] || "";
        const phone = row[1] || "";
        const sent = isSent(phone);
        const badge = sent
            ? `<span class="badge bg-success">Diproses</span>`
            : `<span class="badge bg-secondary">Belum</span>`;

        if (!name) return;

        html += `
            <tr>
                <td>${index + 1}</td>
                <td>${name}</td>
                <td>${phone}</td>
                <td>${badge}</td>
                <td>
                    <div class="btn-group btn-group-sm">
                        <button
                            class="btn btn-outline-primary useGuest"
                            data-name="${name}"
                            data-phone="${phone}">
                            <i class="bi bi-pencil"></i>
                        </button>

                        <button
                            class="btn btn-success sendGuest"
                            data-name="${name}"
                            data-phone="${phone}">
                            <i class="bi bi-whatsapp"></i>
                        </button>

                        <button
                            class="btn btn-outline-danger resetGuest"
                            data-phone="${phone}">
                            <i class="bi bi-arrow-counterclockwise"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;

    });

    $("#guestTable").html(html);

    $("#guestCount").text(rows.length - 1);

}