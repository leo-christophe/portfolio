/**
 * Permet de connecter l'application à EmailJs
 * 
 * @param {emailJs} emailJsObject 
 * @return {void}
 */
function emailJsInitialize(emailJsObject){
    
    const initResult = emailJsObject.init({
      publicKey: process.env.VITE_EMAILJS_PUBLIC_KEY,
    });
}