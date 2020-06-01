const nodemailer = require("nodemailer");

class Email {
  constructor(user, message) {
    this.to = user.email;
    this.from = `Jon ${process.env.EMAIL_FROM}`;
    this.message = message;
    this.firstName = user.name.split(" ")[0];
  }

  createTransport() {
    if (process.env.NODE_ENV === "development") {
      return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      service: "SendGrid",
      auth: {
        user: process.env.SENDGRID_USERNAME,
        pass: process.env.SENDGRID_PASSWORD,
      },
    });
  }

  async send(subject) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      text: this.message,
    };

    await this.createTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send(`Hi! Thanks for signing ${this.firstName}`);
  }

  async resetPassword() {
    await this.send(`Forgot your password?`);
  }
}

module.exports = Email;
