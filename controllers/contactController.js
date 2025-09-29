const nodemailer = require('nodemailer');

exports.sendMessage = async (req, res) => {
  try {
    console.log("Body recibido: ", req.body);
    const { nombre, correo, mensaje } = req.body;

   if (!nombre || !correo || !mensaje) {
      return res.status(400).json({ success: false, message: "Faltan datos en el formulario" });
    }

    // Configurar transporte
    const transporter = nodemailer.createTransport({
      service: 'gmail', // o smtp de tu hosting
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Definir correo
    await transporter.sendMail({
      from: correo,
      to: process.env.EMAIL_USER, // tu correo donde recibes
      subject: `Nuevo mensaje de ${nombre}`,
      text: mensaje
    });

    res.status(200).json({ success: true, message: 'Mensaje enviado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al enviar mensaje' });
  }
};