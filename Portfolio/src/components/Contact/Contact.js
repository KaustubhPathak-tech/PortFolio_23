import React from "react";
import Particle from "../Particle";
import { Container } from "react-bootstrap";
import ContactForm from "./ContactForm";

const Contact = () => {
  return (
    <Container fluid className="contact-section">
      <Particle />
      <ContactForm />
    </Container>
  );
};

export default Contact;
