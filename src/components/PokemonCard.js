import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';

function PokemonCard(id, name, image, type, key) {
    return (
        <div key={key}>
            <Card>
                <CardImg top width="100%" src={image} alt="Card image cap" />
                <CardBody>
                    <CardSubtitle>{id}</CardSubtitle>
                    <CardTitle>{name}</CardTitle>
                    <CardText>{type}</CardText>
                    <Button>Button</Button>
                </CardBody>
            </Card>
        </div>
    )
}

export default PokemonCard

