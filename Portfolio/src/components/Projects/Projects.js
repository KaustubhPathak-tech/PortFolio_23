import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";

import medhos from "../../Assets/Projects/medhos.png";
import stack from "../../Assets/Projects/stackflow.png";
import e_commerce from "../../Assets/Projects/e-commerce.png";
import febshine from "../../Assets/Projects/febshine.png"
import shyamtrust from "../../Assets/Projects/Shyam Trust.png"

import Particle from "../Particle";
import leaf from "../../Assets/Projects/leaf.png";
import emotion from "../../Assets/Projects/emotion.png";
import editor from "../../Assets/Projects/codeEditor.png";
import chatify from "../../Assets/Projects/chatify.png";
import suicide from "../../Assets/Projects/suicide.png";
import bitsOfCode from "../../Assets/Projects/blog.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={medhos}
              isBlog={false}
              title="MedHos.com"
              description=" An e-Pharmacy website where people can consult doctors, book apointments with doctors, buy medicines, ask path labs to generate reports, and other medical services."
              ghLink="https://github.com/KaustubhPathak-tech/MedHos-client"
              demoLink="https://medhos.vercel.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={stack}
              isBlog={false}
              title="Otiva EduCart"
              description="It is a platform to ask questions related to programming and other technical stuffs concerned with IT. User's can subscribe to various plans paying bills accordingly and ask their doubts."
              ghLink="https://github.com/KaustubhPathak-tech/Otiva-Educart-Front-End"
              demoLink="https://otivaeducart.vercel.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={e_commerce}
              isBlog={false}
              title="ZetaCart"
              description="It is MERN stack implementation of e-commerce platform to expand B2C Business of people."
              ghLink="https://github.com/KaustubhPathak-tech/ZetaCart"
              demoLink="https://zetacart.vercel.app/"
            />
          </Col>
        </Row>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={febshine}
              isBlog={false}
              title="Feb & Shine"
              description="It's the official website of Feb & Shine , Vasai, India. The comapany manufactures and supplies various types of pharmaceutical products."
              ghLink="https://github.com/KaustubhPathak-tech/Feb-and-Shine"
              demoLink="https://febandshine.vercel.app/"
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={shyamtrust}
              isBlog={false}
              title="Shyam Trust"
              description="It's the official website of Shyam Trust for handicapped, Bhiwadi, India. The Trust provides resources to handicapped, free education to children. It also provides free medical services to the needy."
              ghLink="https://github.com/KaustubhPathak-tech/Shyam_Trust"
              demoLink="https://shyamtrust.vercel.app/"
            />
          </Col>

          
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
