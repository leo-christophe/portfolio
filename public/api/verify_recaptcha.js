import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { recaptchaToken } = req.body;
  const secretKey = process.env.RECAPTCHA_SECRET_KEY; // Set this in Vercel environment variables

  if (!recaptchaToken) {
    return res.status(400).json({ success: false, message: 'CAPTCHA token is missing.' });
  }

  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify`;
  const data = {
    secret: secretKey,
    response: recaptchaToken,
  };

  try {
    const googleResponse = await fetch(verifyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data),
    });

    const verificationResult = await googleResponse.json();

    if (verificationResult.success && verificationResult.score >= 0.5) {
      // CAPTCHA verified successfully
      return res.status(200).json({ success: true, message: 'CAPTCHA passed.' });
    } else {
      // CAPTCHA verification failed
      return res.status(400).json({
        success: false,
        message: 'CAPTCHA failed. Low score or invalid token.',
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error.', error });
  }
}
