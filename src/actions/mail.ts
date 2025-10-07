'use server';
import { transporter } from '../lib/transporter';
import { updateUser } from './auth';

export const sendMail = async (values: { email: string }) => {
  try {
    const transportAsync = await transporter();
    const code = crypto.randomUUID();
    await updateUser({
      email: values.email,
      resetPasswordCode: code,
    });
    await transportAsync.sendMail({
      from: `"codewithdamian", <${process.env.EMAIL_FROM}>`, // sender address
      to: `${values.email}`, // list of receivers
      subject: 'Hello', // Subject line
      text: 'Hello world?', // plain text body
      html: `
  <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
    <h2 style="color: #0d6efd;">Restablece tu contraseña</h2>
    <p>Hola,</p>
    <p>Recibimos una solicitud para restablecer tu contraseña. Haz clic en el siguiente botón para continuar:</p>
    <p style="text-align: center; margin: 30px 0;">
      <a 
        href="http://localhost:3000/resetPassword?code=${code}" 
        style="
          background-color: #0d6efd;
          color: #fff;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 6px;
          font-weight: bold;
          display: inline-block;
        "
      >
        Restablecer contraseña
      </a>
    </p>
    <p>Si no solicitaste este cambio, puedes ignorar este correo electrónico.</p>
    <p>Gracias,<br/>El equipo de TuApp</p>
    <hr style="border:none; border-top:1px solid #eee; margin:20px 0;" />
    <p style="font-size: 12px; color: #999;">
      Este enlace expirará en 24 horas. Si el enlace no funciona, copia y pega la siguiente URL en tu navegador:<br/>
      http://localhost:3000/resetPassword?code=${code}
    </p>
  </div>
`,
    });
  } catch (err) {
    console.error('Error while sending mail', err);
  }
};
