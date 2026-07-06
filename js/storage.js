const STORAGE_KEY = "blast-undangan";
const STATUS_KEY = "blast-undangan-status";

function saveSettings() {

    const settings = {
        domain: $("#domain").val(),
        template: $("#template").val()
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));

}

function loadSettings() {

    const settings = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (!settings) {

        $("#template").val(defaultTemplate);
        return;

    }

    $("#domain").val(settings.domain || "");
    $("#template").val(settings.template || defaultTemplate);

}

function getStatus() {
    return JSON.parse(localStorage.getItem(STATUS_KEY)) || {};
}

function saveStatus(status) {
    localStorage.setItem(STATUS_KEY, JSON.stringify(status));
}

function markAsSent(phone) {

    const status = getStatus();

    status[phone] = true;

    saveStatus(status);

}

function removeStatus(phone){

    const status = getStatus();

    delete status[phone];

    saveStatus(status);

}

function isSent(phone){

    const status = getStatus();

    return status[phone] || false;

}