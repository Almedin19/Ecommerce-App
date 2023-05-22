import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function Products() {
  return (
    <Container className="mt-5 mb-5">
      <h2 className="text-center mt-5 mb-5">Categories</h2>
      <Row>
        <Col>
          <Card style={{ textAlign: "center" }}>
            <Card.Img
              variant="top"
              src="https://wallpapers.com/images/featured/nucb4z97b3q78mjk.jpg"
              style={{ height: "175px" }}
            />
            <Card.Body>
              <Card.Title>TECHNOLOGY</Card.Title>
              <Card.Text>
                Technology is the application of knowledge for achieving
                practical goals in a reproducible way.The word technology can
                also mean the products resulting from such efforts,including
                both tangible tools such as utensils or machines,and intangible
                ones such as software.
              </Card.Text>
              <Link to="https://en.wikipedia.org/wiki/Technology">
                <Button variant="primary">View Technology</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ textAlign: "center" }}>
            <Card.Img
              variant="top"
              style={{ height: "175px" }}
              src="https://burst.shopifycdn.com/photos/makeup-and-jewelry.jpg?width=1200&format=pjpg&exif=1&iptc=1"
            />
            <Card.Body>
              <Card.Title>ACCESSORIES</Card.Title>
              <Card.Text>
                In fashion, an accessory is an item used to contribute,in a
                secondary manner, to an individual's outfit.Accessories are
                often chosen to complete an outfit and complement the wearer's
                look.They have the capacity to further express an individual's
                identity and personality.
              </Card.Text>
              <Link to="https://en.wikipedia.org/wiki/Fashion_accessory">
                <Button variant="primary">View Accessories</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ textAlign: "center" }}>
            <Card.Img
              style={{ height: "175px" }}
              variant="top"
              src="https://wallpapercave.com/wp/wp2036897.jpg"
            />
            <Card.Body>
              <Card.Title>BOOKS</Card.Title>
              <Card.Text>
                A book is a medium for recording information in the form of
                writing or images,typically composed of many pages made of
                papyrus,parchment,vellum,or paper bound together and protected
                by a cover.The technical term for this physical arrangement is
                codex plural.
              </Card.Text>
              <Link to="https://en.wikipedia.org/wiki/Book">
                {" "}
                <Button variant="primary">View Book</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ textAlign: "center" }}>
            <Card.Img
              variant="top"
              src="https://wallpapers.com/images/featured/zl3vngxpvv04a30j.jpg"
              style={{ height: "175px" }}
            />
            <Card.Body>
              <Card.Title>GAMING</Card.Title>
              <Card.Text>
                I believe the following bullet should be moved to the bottom of
                the list or even removed. Staying at the top might misrepresent
                the meaning of "gaming". Legalized gambling, playing games of
                chance for money, often referred to in law as "gaming",or games
                involving an artistic layout.
              </Card.Text>
              <Link to="">
                <Button variant="primary">View Gaming</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Products;
