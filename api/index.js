import dotenv from "dotenv";
import { body, validationResult } from "express-validator";
import { send } from "@emailjs/nodejs";
import fetch from "node-fetch";

dotenv.config();

export default async function handler(request, response) {

  const allowedOrigins = [
    'https://portfolio.leochristophe.fr',
    'https://leochristophe.fr', 
    'https://leochristophe.vercel.app',
    'http://localhost:3000',
    'http://localhost:8080'
  ];
  
  const origin = request.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  // For preflight requests
  if (request.method === 'OPTIONS') {
    response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    response.setHeader('Access-Control-Max-Age', '86400'); // 24 hours
    return response.status(200).end();
  }


  const secretKey1 = process.env.RECAPTCHA_SECRET_KEY;
  const emailjsService = process.env.EMAILJS_SERVICE_ID;
  const emailjsTemplate = process.env.EMAILJS_TEMPLATE_ID;
  const emailjsPublicKey = process.env.EMAILJS_PUBLIC_KEY;
  const emailjsPrivateKey = process.env.EMAILJS_PRIVATE_KEY;
  
  // Vérifier que toutes les variables sont définies
  if (!secretKey1 || !emailjsService || !emailjsTemplate || !emailjsPublicKey || !emailjsPrivateKey) {
    console.error('Variables d\'environnement manquantes');
    return response.status(500).json({ success: false, message: "Configuration serveur incomplète" });
  }

  // Validation des données
  await Promise.all([
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Le nom est requis")
      .isLength({ min: 2, max: 50 })
      .withMessage("Le nom doit contenir entre 2 et 50 caractères")
      .run(request),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("L'email est requis")
      .isEmail()
      .withMessage("L'email n'est pas valide")
      .run(request),
    body("message")
      .trim()
      .notEmpty()
      .withMessage("Le message est requis")
      .isLength({ min: 10, max: 1000 })
      .withMessage("Le message doit contenir entre 10 et 1000 caractères")
      .run(request),
  ]);

  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ success: false, errors: errors.array() });
  }

  const { token, name, email, message } = request.body;
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!token) {
    return response.status(400).json({ success: false, message: "Token manquant" });
  }

  try {
    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    let recaptchaData = undefined;
    try {
      recaptchaData = await recaptchaResponse.json();
    } catch (error) {
      console.error('Erreur de parsing reCAPTCHA:', error);
      return response.status(500).json({ success: false, message: "Erreur de traitement reCAPTCHA" });
    }

    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      return response.status(400).json({ success: false, message: "Validation reCAPTCHA échouée" });
    }

    await send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      { name, email, message },
      { publicKey: process.env.EMAILJS_PUBLIC_KEY, privateKey: process.env.EMAILJS_PRIVATE_KEY }
    );


    response.json({ success: true, message: "Email envoyé avec succès" });
  } catch (error) {
    console.error("Erreur:", error);
    response.status(500).json({ success: false, message: "Erreur serveur" });
  }
}