import React, { Component } from 'react';
import 'isomorphic-fetch';

import Pokemon from './components/Pokemon';

class ComponentLifeCycles extends Component {
    state = {
        name: '',
        image: null,
        id: 0,
        isFetching: false,
    }

    isLoading = () => this.state.isFetching ? 'is-loading' : '';

    fetchPokemon = async () => {
        const id = Math.floor(Math.random() * 150) + 1;
        try {
            this.setState(state => ({ isFetching: true }));
            const response = await fetch(`http://pokeapi.co/api/v2/pokemon/${id}/`);
            const data = await response.json();
            const pokemon = {
                name: data.name,
                image: data.sprites.front_default || data.sprites.back_default
            }
            this.setState(state => ({ id, name: pokemon.name, image: pokemon.image, isFetching: false }));
        }
        catch (e) {
            this.setState(state => ({ isFetching: false }));
            console.log(e);
        }
    }

    render() {
        return (
            <section>
                <button className={`button is-primary ${this.isLoading()}`} onClick={this.fetchPokemon}>Fetch Random Pokémon</button>
                <Pokemon { ...this.state } />
            </section>
        )
    }
}

export default ComponentLifeCycles;