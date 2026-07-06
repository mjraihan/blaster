const defaultTemplate = `Halo Bapak/Ibu {nama},

Dengan penuh rasa syukur kami mengundang Bapak/Ibu untuk menghadiri acara kami.

Silakan buka undangan melalui tautan berikut:

{link}

Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu berkenan hadir.

Terima kasih.`;

$(document).ready(function () {

    // isi template pertama kali
    loadSettings();
    renderPreview();

    $("#domain, #template").on("change", saveSettings);
    $("#domain, #guestName, #template").on("input", renderPreview);
    $("#copyMessage").click(function(){copy(getMessage());});
    $("#copyLink").click(function(){copy(getInvitationLink());});
    $("#sendWA").click(function(){sendWhatsApp();});
    $("#sendTelegram").click(function(){sendTelegram();});
    
});

function renderPreview() {

    const domain = $("#domain").val().trim();

    const guestName = $("#guestName").val().trim();

    const template = $("#template").val();

    const cleanDomain = domain.replace(/\/$/, "");

    const invitationLink = cleanDomain
    ? `${cleanDomain}/?to=${encodeURIComponent(guestName)}`
    : "{link}";

    const message = template
        .replaceAll("{nama}", guestName || "{nama}")
        .replaceAll("{link}", invitationLink);

    $("#preview").text(message);

}