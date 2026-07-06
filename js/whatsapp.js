function sendWhatsApp(){

    const phone = $("#phone").val().trim();

    if(phone==""){
        Swal.fire("Oops","Nomor WhatsApp belum diisi","warning");
        return;
    }

    const url =
`https://wa.me/${phone}?text=${encodeURIComponent(getMessage())}`;

    window.open(url,"_blank");

}