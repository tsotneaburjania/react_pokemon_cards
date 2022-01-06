import axios from 'axios';
import React from 'react'
import {useLocation, Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Spinner } from 'reactstrap';

import '../App.css'

function PokemonDetailPage() {
    const id = useLocation();
    console.log(id.pathname)
    const [pokemon, setPokemon] = useState({});
    const [image, setImage] = useState([]);
    const [type, setType] = useState("");
    const [hp, setHp] = useState("");


    const getPokemon = () => {
        axios.get(`https://pokeapi.co/api/v2/pokemon`+id.pathname)
        .then(response => {
            console.log(response.data)
            setPokemon(response.data);
            setImage(response.data.sprites.front_default);
            setType(response.data.types[0].type.name);
            setHp(response.data.stats[0].base_stat);
        })
    }
    useEffect(() => {
        getPokemon();
    }, [])

    const renderedPokemon = pokemon? (
        <div className={`cardHolder ${type} shadow-lg p-3 mb-5 bg-white rounded`}>
            <Card>
                <CardSubtitle>#{pokemon.id}</CardSubtitle>
                <CardImg top width="50%%" src={image} alt="Card image cap" />
                <CardBody>
                    <CardTitle>NAME: {pokemon.name}</CardTitle>
                    <CardText>TYPE: {type}</CardText>
                    <CardText>HP : {hp}</CardText>
                </CardBody>
            </Card>
        </div>
    ) : (
        <div>
          <Spinner color="primary" />
        </div>
    )
    return (
        <div>
        {renderedPokemon}
            <Link to="/">
                <Button>Back</Button>
            </Link>
        </div>
    )
}

export default PokemonDetailPage
