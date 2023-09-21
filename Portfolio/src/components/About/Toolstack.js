import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  SiVisualstudiocode,
  SiPostman,
  SiSlack,
  SiVercel,
} from "react-icons/si";
import { TbBrandWindows, TbBrandAmazon, TbBrandAndroid,TbBrandVisualStudio,TbBrandGithub } from "react-icons/tb";

function Toolstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <TbBrandWindows />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiVisualstudiocode />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiPostman />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiSlack />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiVercel />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <TbBrandAmazon />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <TbBrandAndroid />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <TbBrandVisualStudio />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <TbBrandGithub />
      </Col>
    </Row>
  );
}

export default Toolstack;
