// utils/mail.js
function sendMail_asClient(address, subject='', body='') {
    if (!address || typeof address !== 'string' || address.trim() === '') {
        console.warn('Aucune adresse mail n\'a été renseignée. Veuillez contacter l\'administrateur du site.');
        return;
    }

    address = address.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(address)) {
        console.warn('L\'adresse mail renseignée est incorrecte. Veuillez contacter l\'administrateur du site.');
        return;
    }

    window.location.href = 'mailto:' + address + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
}

/**
 * Vérifie si le numéro de téléphone est correct
 * 
 * @param {string} number 
 * @returns boolean
 */
const verifyNumber = (number) => {
    if (!number || typeof number !== 'string' || number.trim() === ''){
        console.warn('Aucun numéro de téléphone n\'a été renseigné. Veuillez contacter l\'administrateur du site.');
        return false;
    }

    number = number.trim();

    const phoneRegex = /^\+?[0-9]{1,3}[0-9]{9}$/;
    if (!phoneRegex.test(number)){
        console.warn('Le numéro de téléphone renseigné est incorrect. Veuillez contacter l\'administrateur du site.');
        return false;
    }

    return true;
}

function callNumber_asClient(number){
    if (verifyNumber(number)){
        window.location.href = 'tel:' + number;
    }
}

function sendSMS_asClient(number, body){
    if (verifyNumber(number)){
        window.location.href = 'sms:' + number + '?body=' + encodeURIComponent(body);
    }
}

export { sendMail_asClient, callNumber_asClient, sendSMS_asClient };
