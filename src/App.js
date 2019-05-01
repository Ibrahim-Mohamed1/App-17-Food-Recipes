import React, { Component } from 'react';
import { withData } from './DataProvider';
import "./App.css"

class App extends Component {
  constructor(){
    super()
    this.state={
      search: ""
    }
  }

  componentWillMount(){
    this.props.getRecipes()
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({
      search: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.getRecipes(this.state.search)
    this.setState({
      search: ""
    })
  }

  render() {
    const styles={
      form:{
        textAlign:"center",
        zoom: 2.3,
      },
      button:{
        display: "block",
        margin: "auto",
        marginTop:"1em",
        zoom: 1,
        border:"white solid",
        borderRadius: 5,
        outline: "none",
        backgroundColor: "gold"
      },
      title:{
        textAlign:"center", 
        width: "8 0%", 
        display:"block",
        margin:"auto",
        backgroundColor: '#000000a6',
        color: "white"
      },
      box:{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill,minmax(350px, 1fr))",
        gridGap: 10,
        marginTop: 20
      }
    }
    const mappedRecipes = this.props.recipes.map(food => {
        return (
          <div key={food.href} style={{ border: "solid gold", textAlign:'center'}}>
            <a style={{textDecorationColor: "blue"}} href={food.href} target="_blank" rel="noopener noreferrer"><h1 style={{margin: 7,color:'white', textAlign:"center"}}>{food.title}</h1></a>
            <h3 style={{color:"gold"}}>Ingredients</h3>
            <p style={{color:'white', margin: 7}}>{food.ingredients}</p>
          </div>
        )
    })
    return (
      <div>
        <h1 style={{ color: 'gold', textAlign:'center', fontSize: 50, padding: 0, margin: 5}}>Food Recipes</h1>
        <form style={styles.form} onSubmit={this.handleSubmit} action="">
          <input 
            style={{outline:"none", borderRadius: 2, border: "white solid", textAlign:"center"}}
            type="text" 
            name="search" 
            value={this.state.search}
            onChange={this.handleChange}
            autoFocus
            autoComplete='off'
            placeholder="Desired food"
            required
          />
          <button className='button' style={styles.button}>Search</button>
        </form>
        <div style={styles.box}>
          {mappedRecipes}
        </div>
      </div>
    );
  }
}

export default withData(App);