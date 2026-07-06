const defaultTemplate = `_Assalamualaikum Warahmatullahi Wabarakatuh_

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i *{nama}* untuk menghadiri acara kami.

*Berikut link undangan kami*, untuk info lengkap dari acara bisa kunjungi:

{link}

Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu.

*Mohon maaf perihal undangan hanya di bagikan melalui pesan ini.*

Terima kasih banyak atas perhatiannya.

Salam Hormat
Raihan & Mela`;

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