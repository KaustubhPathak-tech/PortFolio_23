import React, { useState } from "react";
import axios from "axios";

import './Contact.css'
import image from "../../Assets/contact_form.jpg";
import sent from "../../Assets/sent.jpg";
import { message } from "antd";
import { TbBrandTelegram, TbFidgetSpinner } from "react-icons/tb";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import Link from "antd/es/typography/Link";
message.config({
    top: 100,
    duration: 2,
    maxCount: 3,
    rtl: true,
    prefixCls: 'my-message',
  });
const API = axios.create({ baseURL: "https://portfolioserver-beryl.vercel.app" }); // http://localhost:7000
const ContactForm = () => {
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const sendMessage = async (formData) => {
    const res = await API.post("/sendMessage", formData);
    message.success("Message sent",);
    return res;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // setSuccess(true);
    // Handle form submission, e.g., send data to a server or perform validation
    const response = await sendMessage(formData);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    response?.status === 200 ? <>{setSuccess(true)}</> : <></>;
  };

  return (
    <Container>
      <Container>
        <Row>
          <Col md={6} style={{ textAlign: "left" }} id="leftCol">
            <img src={image} width="80%" style={{ borderRadius: "10px" }} />
          </Col>
          <br />
          <Col lg={6} style={{ paddingLeft: "9%" }} id="rightCol">
            {success ? (
              <>
                <Card>
                  <Card.Body>
                    <img src={sent} width="60%" />
                    <br />
                    <h4>Thanks for reaching out to me.</h4>
                    <br />
                    <Link href="https://mail.google.com/" target="_blank">
                      Check Inbox for my response
                    </Link>
                  </Card.Body>
                </Card>
              </>
            ) : (
              <>
                <Card style={{ minwidth: "68%" }}>
                  <Card.Title
                    style={{
                      marginTop: "30px",
                      color: "purple",
                      fontWeight: "600",
                    }}
                  >
                    Get in Touch
                  </Card.Title>
                  <Card.Body>
                    <Form onSubmit={handleSubmit}>
                      <Form.Group controlId="name">
                        <Form.Label>
                          <p style={{ color: "purple", fontWeight: "600" }}>
                            Name
                          </p>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                      <br />
                      <Form.Group controlId="email">
                        <Form.Label>
                          <p style={{ color: "purple", fontWeight: "600" }}>
                            E-mail
                          </p>
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                      <br />
                      <Form.Group controlId="message">
                        <Form.Label>
                          <p style={{ color: "purple", fontWeight: "600" }}>
                            Message
                          </p>
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>

                      <Button
                        variant="primary"
                        type="submit"
                        className="submit_btn"
                      >
                        {isLoading ? (
                          <>
                            <div
                              class="spinner-border spinner-border-sm text-light"
                              role="status"
                            >
                              
                            </div>
                          </>
                        ) : (
                          <>
                            Send <TbBrandTelegram />
                          </>
                        )}
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </>
            )}
          </Col>

          <Col md={4}></Col>
        </Row>
      </Container>
    </Container>
  );
};

export default ContactForm;
