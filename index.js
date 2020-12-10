const nodemailer = require('nodemailer');
const cp = require('child_process');
const util = require('util');
const cron = require('node-cron');

async function main() {
  const log = await util.promisify(cp.execFile)('logwatch', [
    '--detail',
    '10',
    '--range',
    'yesterday',
    '--service',
    'all',
    '--format',
    'html',
  ]);

  let transporter = nodemailer.createTransport({
    host: 'smtp.163.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.User || '[username]', // modify it
      pass: process.env.Pass || '[password]', // modify it
    },
  });

  let info = await transporter.sendMail({
    from: process.env.From || '"logwatch" <[mail]>', // modify it
    to: process.env.To || '[receiver]', // modify it
    subject: 'Logwatch Daily Report',
    html: log.stdout,
  });

  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

cron.schedule('0 0 0 * * *', () => {
  console.log(new Date().toLocaleString(), 'begin schedule');
  main().catch(console.error);
});

console.log('success to run');
