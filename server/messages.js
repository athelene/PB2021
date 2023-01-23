//Send email to confirm new user
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();


async function sendNewMemberConfirmation(userEmail, verificationCode, userID) {

  const mailBody =
    "<h1>Welcome to the Cedar Creek Picklball Club App!</h1>" +
    "<h3>You are almost ready to start joining games on our courts. </h3>" +
    "<h3>Just click on the button below to confirm you are ready to go!</h3>" +
    '<a href="http://localhost:8700/verify?verifyCode=' +
    verificationCode +
    "&userID=" +
    userID +
    '">' +
    "<button>Click To Verify</button></a>";

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    name: "mail.storiesforus.com",
    host: "mail.storiesforus.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PW, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"StoriesForUs" <info@storiesforus.com>', // sender address
    to: userEmail, // list of receivers
    subject: "Your New StoriesForUs Account", // Subject line
    html: mailBody, // html body
  });
  await notificationOps.notificationMemberConfirmation(userID, userEmail);
}


async function sendInvitationMonthly(email, invitedBy, invitationID) {
  var setLink =
    '<a href="http://localhost:8080/acceptinvitation/' +
    invitationID +
    '">' +
    "<button>Click To Get Started</button></a>";

  const mailBody =
    "<h1>" +
    invitedBy +
    " has invited you to join them on StoriesForUs!</h1>" +
    "<h3>Click on the button below to start your free 30 day trial.</h3>" +
    setLink;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    name: "mail.storiesforus.com",
    host: "mail.storiesforus.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PW, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"StoriesForUs" <info@storiesforus.com>', // sender address
    to: email, // list of receivers
    subject: invitedBy + " is asking you to join them on StoriesForUs", // Subject line
    html: mailBody, // html body
  });
  return info.accepted;
}

async function sendEmailChange(email, userID, recno) {
  var encodedLink = encodeURI(
    process.env.SERVER_URL +
      "/confirmEmail?userID=" +
      userID +
      "&recno=" +
      recno
  );

  const mailBody =
    "<h1>" +
    "StoriesForUs has received a request to change your registered password to " +
    email +
    ".</h1>" +
    "<h3>If you want to update your email, please click on the button below to confirm.</h3>" +
    '<a href="' +
    encodedLink +
    '">' +
    "<button>Click To Confirm</button></a>";

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    name: "mail.storiesforus.com",
    host: "mail.storiesforus.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PW, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"StoriesForUs" <info@storiesforus.com>', // sender address
    to: email, // list of receivers
    subject: "Email address change request", // Subject line
    html: mailBody, // html body
  });
  return info.accepted;
}

async function forgot(email, userUUID) {

  const mailBody =
    "<h1>Forgot Your Password Verification</h1>" +
    "<h3>We received a notice that you forgot your StoriesForUs password.</h3>" +
    "<h3>If you want to proceed, please click on the button below.</h3>" +
    '<a href="http://localhost:8080/newpassword?verifyCode=' +
    userUUID +
    '">' +
    "<button>Click To Change Password</button></a>";


  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    name: "mail.storiesforus.com",
    host: "mail.storiesforus.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PW, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"StoriesForUs" <info@storiesforus.com>', // sender address
    to: email, // list of receivers
    subject: "Forgot Your Password Verification", // Subject line
    html: mailBody, // html body
  });

}


module.exports = {
  sendNewMemberConfirmation: sendNewMemberConfirmation,
  sendEmailChange: sendEmailChange,
  sendInvitationMonthly: sendInvitationMonthly,
  forgot : forgot
};
