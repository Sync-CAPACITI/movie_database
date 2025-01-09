import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../Pages/watchHistory.css'; // Import the CSS file for styling

const WatchHistory = () => {
  // Simulated watch history (can be replaced with dynamic data or API call)
  const watchHistory = [
    {
      id: 1,
      title: "Inception",
      genre: "Sci-Fi, Thriller",
      watchedOn: "2025-01-05",
      posterUrl: "https://image.tmdb.org/t/p/w500/8h58MwXYdp3Xj0dwtC3V3z2lW8s.jpg", // Sample poster image
    },
    {
      id: 2,
      title: "The Dark Knight",
      genre: "Action, Crime, Drama",
      watchedOn: "2025-01-01",
      posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haM3dJzq.jpg", // Sample poster image
    },
    {
      id: 3,
      title: "Stranger Things",
      genre: "Drama, Fantasy, Horror",
      watchedOn: "2024-12-30",
      posterUrl: "https://image.tmdb.org/t/p/w500/2p9bZx3m98uS3pniVrMww9eKfJ7.jpg", // Sample poster image
    },
  ];

  return (
    <Container>
      <h2 className="mt-4">Your Watch History</h2>
      <Row className="mt-4">
        {watchHistory.map((movie) => (
          <Col key={movie.id} md={4} className="mb-4">
            <Card className="watch-history-card">
              <Card.Img variant="top" src={movie.posterUrl} />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>
                  <strong>Genre:</strong> {movie.genre}
                  <br />
                  <strong>Watched on:</strong> {movie.watchedOn}
                </Card.Text>
                <Button variant="primary" href={`#movie-${movie.id}`}>
                  Watch Again
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default WatchHistory;
