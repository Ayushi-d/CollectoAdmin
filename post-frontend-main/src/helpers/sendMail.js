const nodemailer = require('nodemailer');

export async function SendMail() {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>',
    to: 'user@yopmail.com',
    subject: 'Hello ✔',
    text: 'Hello world?',
    html: '<b>Hello world?</b>',
  });
}
