import emailjs from "emailjs-com";

const sendEmail = (row) => {
  const templateParams = {
    name: row.name,
    message: `Prescription for ${row.name}`,
    image: row.imageurl,
    time: new Date().toLocaleString(),
    to_email: row.email,
  };

  emailjs
    .send(
      "service_8suutqs",
      "template_36so8th",
      templateParams,
      "QOtM5Pt2PYx1O14LV"
    )
    .then(() => alert("Prescription sent successfully"))
    .catch((err) => {
      console.error("Email error", err);
      alert("Failed to send");
    });
};

export default sendEmail;
