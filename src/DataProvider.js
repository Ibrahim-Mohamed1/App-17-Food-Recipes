import React, { Component } from 'react';
import axios from "axios"
const { Provider, Consumer } = React.createContext()

class DataProvider extends Component {
    constructor(){
        super()
        this.state={
            recipes: []
        }
    }

    getRecipes = (search)=> {
        axios.get(`https://vschool-cors.herokuapp.com?url=http://www.recipepuppy.com/api/?q=${search}`).then(res => {
          console.log(res.data)
          this.setState({
            recipes: res.data.results
          })
        })
      }
      
      render() {
        console.log(this.state.Recipes)
        return (
            <Provider value={{
                getRecipes: this.getRecipes,
                ...this.state
            }}
            >
                {this.props.children}
            </Provider>
        );
    }
}

export default DataProvider;

export function withData(C) {
    return props => <Consumer>{value => <C {...value}{...props} />}</Consumer>
}