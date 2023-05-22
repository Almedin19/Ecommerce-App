import { Container } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

function Slider() {
  return (
    <Container style={{ width: "100%" }}>
      <Carousel>
        <Carousel.Item interval={1000}>
          <img
            className=" w-100"
            src="https://hhstsyoejx.gjirafa.net/gj50/banners/Gjirafa50-WebBanner-Desktop-1674809015.jpg"
            alt="TECHNOLOGY"
          />
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
            className=" w-100"
            src="https://hhstsyoejx.gjirafa.net/gj50/banners/mb-d-1676644153.jpg"
            alt="ACCESSORIES"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className=" w-100"
            src="https://hhstsyoejx.gjirafa.net/gj50/banners/mb-d-1677936208.jpg"
            alt="BOOKS"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className=" w-100"
            src="https://hhstsyoejx.gjirafa.net/gj50/banners/mb_d-1674553133.jpg"
            alt="GAMING"
          />
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}

export default Slider;
