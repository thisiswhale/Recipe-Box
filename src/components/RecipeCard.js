import React, {Component} from 'react'
import {
  Modal,
  PanelGroup,
  Panel,
  Button,
  ListGroup,
  ListGroupItem,FormGroup,
ControlLabel,
FormControl
} from 'react-bootstrap'

export default class RecipeCard extends Component {

  constructor() {
    super()
    this.state = {
      recipes: [
        {
          name: 'Chicken Alfredo',
          ingredients: ['noodles', 'alfredo sauce', 'chicken']
        }, {
          name: 'Cheese Omlette',
          ingredients: ['Eggs', 'Cheddar Cheese']
        }
      ],
      showAddModal: false,
      showEditModal: false,
      addRecipeValue: '',
      addIngredientValue: '',
      editRecipeValue: '',
      editIngredientValue: '',
      currentEditIndex: 0
    }
  }
  deleteRecipe = (thisIndex) => {
    let object = this.state.recipes;
    object.splice(thisIndex,1)
    this.setState({recipes: object});
    this.handleEditRecipeModalHide();
  }

  updateRecipe = (thisIndex) =>{
    let object = this.state.recipes;
    object[thisIndex].name = this.state.editRecipeValue;
    const regExp = /\s*,\s*/;
    object[thisIndex].ingredients = this.state.editIngredientValue.split(regExp);
    this.setState({recipes:object,  editRecipeValue:'', editIngredientValue:''});
    this.handleEditRecipeModalHide();
  }

  addRecipe = (addRecipe) => {
    let object = this.state.recipes;
    object.push(addRecipe)
    this.setState({recipes: object, addRecipeValue:'', addIngredientValue:''})
    //FIGURE OUT TO SAVE INTO COOKIE
  }

  handleAddRecipe = (e) => {
    e.preventDefault();
    this.setState({showAddModal: true});
    const regExp = /\s*,\s*/;
    let newRecipeName = this.state.addRecipeValue;
    let newIngredients = this.state.addIngredientValue.split(regExp);
    let newRecipe = {name: newRecipeName, ingredients: newIngredients};
    this.addRecipe(newRecipe);
    this.handleAddRecipeModalHide();
  }

  handleEditRecipe = (thisRecipeIndex) => {
    this.setState({showEditModal: true, currentEditIndex: thisRecipeIndex});
     let editRecipeName = this.state.recipes[thisRecipeIndex].name;
     let editIngredients = this.state.recipes[thisRecipeIndex].ingredients.join(", ");
     this.setState({editRecipeValue: editRecipeName, editIngredientValue: editIngredients})
  }

  handleAddRecipeModalHide = () => {
    this.setState({showAddModal: false});
  }
  handleEditRecipeModalHide = () => {
    this.setState({showEditModal: false});
  }

  handleChangeRecipeValue = (e) => {
    this.setState({ addRecipeValue: e.target.value });
  }

  handleChangeIngredientValue = (e) => {
    this.setState({ addIngredientValue: e.target.value });
  }

  handleChangeEditRecipeValue = (e) => {
    this.setState({ editRecipeValue: e.target.value });
  }

  handleChangeEditIngredientValue = (e) => {
    this.setState({ editIngredientValue: e.target.value });
  }
  //fdsfsdfsdfdsfdsfsdf
    //fdsfsdfsdfdsfdsfsdf
      //fdsfsdfsdfdsfdsfsdf
        //fdsfsdfsdfdsfdsfsdf

  renderRecipeCard = () => {
    return (this.state.recipes.map((recipe, i) => {
      return (<Panel eventKey={i+0} updateRecipeText={this.updateRecipe} deleteRecipeCard={this.deleteRecipe}>
        <Panel.Heading>
          <Panel.Title toggle="toggle">{recipe.name}</Panel.Title>
        </Panel.Heading>
        <Panel.Body collapsible="collapsible">
          <ListGroup>
            {
              recipe.ingredients.map(ingredient => {
                return (<ListGroupItem>{ingredient}</ListGroupItem>);
              })
            }
          </ListGroup>
          <Button bsStyle="primary" onClick={() => this.handleEditRecipe(i)}>Edit</Button>
          <Button bsStyle="danger" onClick={() => this.deleteRecipe(i)}>Delete</Button>
        </Panel.Body>
      </Panel>);
    }))
  }
  //fdsfsdfsdfdsfdsfsdf
    //fdsfsdfsdfdsfdsfsdf
      //fdsfsdfsdfdsfdsfsdf
        //fdsfsdfsdfdsfdsfsdf
          //fdsfsdfsdfdsfdsfsdf

  renderAddRecipeModal = () => {
    return(
      <Modal show={this.state.showAddModal} onHide={this.handleAddRecipeModalHide} container={this} aria-labelledby="contained-modal-title">
        <Modal.Header closeButton="closeButton">
          <Modal.Title id="contained-modal-title">
            Add A Recipe
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup
              controlId="formBasicText"
            >
              <ControlLabel>Recipe</ControlLabel>
              <FormControl
                type="text"
                value={this.state.addRecipeValue}
                placeholder="e.g. Lasagna"
                onChange={this.handleChangeRecipeValue}
              />
              <ControlLabel>Ingredients</ControlLabel>
              <FormControl
                type="text"
                value={this.state.addIngredientValue}
                placeholder="e.g. eggs, flour, tomato sauce, water"
                onChange={this.handleChangeIngredientValue}
              />
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={this.handleAddRecipe} >Add Recipe</Button>
          <Button onClick={this.handleAddRecipeModalHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }


  renderEditRecipeModal = (e) => {
    return (
      <Modal show={this.state.showEditModal} onHide={this.handleEditRecipeModalHide} container={this} aria-labelledby="contained-modal-title">
        <Modal.Header closeButton="closeButton">
          <Modal.Title id="contained-modal-title">
            Edit Recipe
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup
              controlId="formBasicText"
            >
              <ControlLabel>Recipe</ControlLabel>
              <FormControl
                type="text"
                value={this.state.editRecipeValue}
                onChange={this.handleChangeEditRecipeValue}
              />
              <ControlLabel>Ingredients</ControlLabel>
              <FormControl
                type="text"
                value={this.state.editIngredientValue}
                onChange={this.handleChangeEditIngredientValue}
              />
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.updateRecipe(this.state.currentEditIndex)}>Save Recipe</Button>
          <Button onClick={this.handleEditRecipeModalHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
  render() {
    return (<div>
      <PanelGroup accordion="accordion" id="accordion">
        {this.renderRecipeCard()}
      </PanelGroup>
      <Button bsStyle="primary" onClick={() => this.setState({showAddModal: true})}>
        Add Recipe
      </Button>
      {this.renderAddRecipeModal()}
      {this.renderEditRecipeModal()}
    </div>);
  }
}
