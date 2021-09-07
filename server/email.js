//Send email to confirm new user
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const notificationOps = require("./notificationOps");
//const authenticationOps = require('./authenticationOps')

async function sendNewMemberConfirmation(userEmail, verificationCode, userID) {
  console.log("starting sendNewMemberConfirmation");

  const mailBody =
    "<h1>Welcome to StoriesForUs!</h1>" +
    "<h3>You are almost ready to start sharing family stories across generations. </h3>" +
    "<h3>Just click on the button below to confirm you are ready to go!</h3>" +
    '<a href="http://localhost:8700/verify?verifyCode=' +
    verificationCode +
    "&userID=" +
    userID +
    '">' +
    "<button>Click To Verify</button></a>";

  console.log("mailBody reads: ", mailBody);

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
  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

async function sendInvitationCharter2(email, invitedBy, invitationID) {
  var setLink =
    '<a href="http://localhost:8080/acceptinvitation/' +
    invitationID +
    '">' +
    "<button>Click To Get Started</button></a>";
  console.log("starting sendInvitation email, setLink is: ", setLink);
  console.log("starting sendInvitation email");

  const mailBody =
    "<h1>" +
    "You have been invited to join StoriesForUs as a charter member!</h1>" +
    "<p></p>StoriesForUs is a great place to keep generations connected by saving and sharing your stories. " +
    "As an early charter member, you will have a FREE life time membership when you sign up. Plus, the first 10 people you invite will have a FREE lifetime membership too!</p>" +
    "<h3>Click on the button below to start your free 30 day trial.</h3>" +
    setLink;

  console.log("mailBody reads: ", mailBody);

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
  console.log("mail sent", info);
  console.log("Message sent: %s", info.messageId);
  return info.accepted;
}

async function sendInvitationCharter3(email, invitedBy, invitationID) {
  var setLink =
    '<a href="http://localhost:8080/acceptinvitation/' +
    invitationID +
    '">' +
    "<button>Click To Get Started</button></a>";
  console.log("starting sendInvitation email, setLink is: ", setLink);
  console.log("starting sendInvitation email");

  const mailBody =
    "<h1>" +
    "You have been invited to join StoriesForUs as a charter member!</h1>" +
    "<p></p>StoriesForUs is a great place to keep generations connected by saving and sharing your stories. " +
    "As a charter member, you will have a FREE life time membership when you sign up. Plus, the first 5 people you invite will have a FREE lifetime membership too!</p>" +
    "<h3>Click on the button below to start your free 30 day trial.</h3>" +
    setLink;

  console.log("mailBody reads: ", mailBody);

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
  console.log("mail sent", info);
  console.log("Message sent: %s", info.messageId);
  return info.accepted;
}

async function sendInvitationCharter4(email, invitedBy, invitationID) {
  var setLink =
    '<a href="http://localhost:8080/acceptinvitation/' +
    invitationID +
    '">' +
    "<button>Click To Get Started</button></a>";
  console.log("starting sendInvitation email, setLink is: ", setLink);
  console.log("starting sendInvitation email");

  const mailBody =
    "<h1>" +
    "You have been invited to join StoriesForUs as a charter member!</h1>" +
    "<p></p>StoriesForUs is a great place to keep generations connected by saving and sharing your stories. " +
    "As a charter member, you have a FREE life time membership when you sign up.</p>" +
    "<h3>Click on the button below to start your free 30 day trial.</h3>" +
    setLink;

  console.log("mailBody reads: ", mailBody);

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
  console.log("mail sent", info);
  console.log("Message sent: %s", info.messageId);
  return info.accepted;
}
async function sendInvitationMonthly(email, invitedBy, invitationID) {
  var setLink =
    '<a href="http://localhost:8080/acceptinvitation/' +
    invitationID +
    '">' +
    "<button>Click To Get Started</button></a>";
  console.log("starting sendInvitation email, setLink is: ", setLink);

  const mailBody =
    "<h1>" +
    invitedBy +
    " has invited you to join them on StoriesForUs!</h1>" +
    "<h3>Click on the button below to start your free 30 day trial.</h3>" +
    setLink;

  console.log("mailBody reads: ", mailBody);

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
  console.log("mail sent", info);
  console.log("Message sent: %s", info.messageId);
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
  console.log("starting sendEmailChange email, link is: ", encodedLink);

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

  console.log("mailBody reads: ", mailBody);

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
  console.log("mail sent", info);
  console.log("Message sent: %s", info.messageId);
  return info.accepted;
}

async function forgot(email, userUUID) {
  console.log("starting emailOps.forgot");

  const mailBody =
    "<h1>Forgot Your Password Verification</h1>" +
    "<h3>We received a notice that you forgot your StoriesForUs password.</h3>" +
    "<h3>If you want to proceed, please click on the button below.</h3>" +
    '<a href="http://localhost:8080/newpassword?verifyCode=' +
    userUUID +
    '">' +
    "<button>Click To Change Password</button></a>";

  console.log("mailBody reads: ", mailBody);

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
  console.log("Message sent: %s", info.messageId);

}

module.exports = {
  sendNewMemberConfirmation: sendNewMemberConfirmation,
  sendEmailChange: sendEmailChange,
  sendInvitationCharter2: sendInvitationCharter2,
  sendInvitationCharter3: sendInvitationCharter3,
  sendInvitationCharter4: sendInvitationCharter4,
  sendInvitationMonthly: sendInvitationMonthly,
  forgot : forgot
};
