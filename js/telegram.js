function sendTelegram(){

    const username=$("#telegram").val().trim();

    if(username==""){
        Swal.fire("Oops","Username Telegram belum diisi","warning");
        return;
    }

    window.open(
        `https://t.me/${username.replace("@","")}`,
        "_blank"
    );

}