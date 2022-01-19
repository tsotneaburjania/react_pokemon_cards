import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Spinner } from 'reactstrap';

function BasePage() {
    const [pokemons, setPokemons] = useState([]);
    const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon/?limit=20');
  
    const getPokemons = () => {
      axios.get(loadMore)
        .then(response => {
          getEachPokemonObject(response.data.results)
          setLoadMore(response.data.next)
          console.log(response.data.next)
        })
        .catch(error => {
          console.log(error);
        });
  
        function getEachPokemonObject(surfaceObjectArray){
          surfaceObjectArray.map(element => {
            axios.get(`https://pokeapi.co/api/v2/pokemon/${element.name}`)
            .then(response => {
              setPokemons(currentList => [...currentList, response.data])
            })
            .catch(error => {
              console.log(error);
            });
          })
        }
    }
    
    useEffect(() => {
      document.title = 'Pokemon Cards';
      getPokemons();
    }, [])
  
    const renderedPokemons = pokemons.length? (
      pokemons.map((pokemon, index) => {
          return ( 
            <div className={`cardHolder ${pokemon.types[0].type.name} shadow-lg p-3 mb-5 bg-white rounded`} key={index}>
                <Card>
                    <CardSubtitle>#{pokemon.id}</CardSubtitle>
                    <CardImg top width="100%" src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} />
                    <CardBody>
                        <CardTitle>NAME: {pokemon.name}</CardTitle>
                        <CardText>TYPE: {pokemon.types[0].type.name}</CardText>
                        <Link to={{
                            pathname: `/`+pokemon.id,
                            state: {id: pokemon.id}
                        }}>
                           <Button>More Info</Button>
                        </Link>
                    </CardBody>
                </Card>
  
            </div>
            
          )
      })
      ) : (
        <div>
          <Spinner color="primary" />
        </div>
        
      )  
    return (
        <div>
            <div className='cardListHolder'>
                {renderedPokemons}
            </div>
            <Button className='loadMore' color="primary" onClick={() => getPokemons()}>Load More</Button>{' '}
        </div>
    )
}

export default BasePage
