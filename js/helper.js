function getDomain() {
    return $("#domain").val().trim().replace(/\/$/, "");
}

function getGuestName() {
    return $("#guestName").val().trim();
}

function getInvitationLink() {

    const domain = getDomain();
    const guest = getGuestName();

    if (!domain) return "";

    return `${domain}/?to=${encodeURIComponent(guest)}`;
}

function getMessage() {

    const template = $("#template").val();

    return template
        .replaceAll("{nama}", getGuestName())
        .replaceAll("{link}", getInvitationLink());

}

function copy(text){

    navigator.clipboard.writeText(text);

    Swal.fire({
        icon:"success",
        title:"Berhasil",
        text:"Berhasil disalin",
        timer:1200,
        showConfirmButton:false
    });

}