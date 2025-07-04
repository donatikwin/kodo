
const nodemailer = require('nodemailer');

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      }  
    })
  }

  async sendActivationMail(to, link, username) {

    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Активация аккаунта ${process.env.API_URL}`,
      text: '',
      html: 
      `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Добро пожаловать в <strong>Kodo</strong>!</h2>
          <p>Здравствуйте, <strong>${username}</strong>!</p>
          <p>Благодарим вас за регистрацию в нашем сервисе!</p>
          <br>
          <p>С уважением,</p>
          <p>Команда <strong>Kodo</strong></p>
          <small>© 2025 Kodo Team</small>
        </div>
      `
    })
  }
}

module.exports = new MailService();