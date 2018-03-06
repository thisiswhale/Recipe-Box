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
          ingredients: ['2 boneless chicken breast', '1 cup heavy cream', '2/3 cup grated parmesan cheese','1/2 pound spaghetti', '1/4 cup butter', '1 tablespoon olive oil', 'salt and ground black pepper']
        }, {
          name: 'Cheese Omlette',
          ingredients: ['3 large eggs', '1 tablespoon whipping cream or milk', '1/8 teaspoon salt','1 tablespoon butter','1/3 cup shredded cheddar or Swiss cheese']
        },
        {
          name: 'Molten Chocolate Lava Cake',
          ingredients: ['1 stick butter ', '2 ounces bittersweet chocolate ', '2 ounces semisweet chocolate','1 1/4 cups powdered sugar ','2 whole eggs','3 egg yolks','1 teaspoon vanilla ','1/2 cup all-purpose flour','Vanilla ice cream']
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
  componentDidMount() {
    let retrievedObject = JSON.parse(localStorage.getItem('My_Recipes'));
    console.log(retrievedObject);
    (retrievedObject) ? this.setState({recipes: retrievedObject}) : this.setState({recipes: this.state.recipes})
  }

  deleteRecipe = (thisIndex) => {
    let object = this.state.recipes;
    object.splice(thisIndex,1)
    this.setState({recipes: object});
    this.handleEditRecipeModalHide();
    this.saveRecipesLocalStorage();
  }

  saveRecipesLocalStorage = () => {
    localStorage.setItem('My_Recipes', JSON.stringify(this.state.recipes));
  }

  updateRecipe = (thisIndex) =>{
    let object = this.state.recipes;
    object[thisIndex].name = this.state.editRecipeValue;
    const regExp = /\s*,\s*/;
    object[thisIndex].ingredients = this.state.editIngredientValue.split(regExp);
    this.setState({recipes:object,  editRecipeValue:'', editIngredientValue:''});
    this.handleEditRecipeModalHide();
    this.saveRecipesLocalStorage();
  }

  addRecipe = (addRecipe) => {
    let object = this.state.recipes;
    object.push(addRecipe)
    this.setState({recipes: object, addRecipeValue:'', addIngredientValue:''})
    this.saveRecipesLocalStorage();
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

  renderRecipeCard = () => {
    return (this.state.recipes.map((recipe, i) => {
      return (<Panel eventKey={i+0}>
        <Panel.Heading>
          <Panel.Title toggle="toggle" className='recipe-title'>{recipe.name}</Panel.Title>
        </Panel.Heading>
        <Panel.Body collapsible="collapsible">
          <h4 className='panel-header-ingredients'>Ingredients:</h4>
          <ListGroup>
            {
              recipe.ingredients.map(ingredient => {
                return (<ListGroupItem className='ingredients'>{ingredient}</ListGroupItem>);
              })
            }
          </ListGroup>
          <Button bsStyle="primary" onClick={() => this.handleEditRecipe(i)}>Edit</Button>
          <Button bsStyle="danger" className='btn-delete' onClick={() => this.deleteRecipe(i)}>Delete</Button>
        </Panel.Body>
      </Panel>);
    }))
  }

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
          <Button bsStyle="primary" className='btn-add' onClick={this.handleAddRecipe} >Add Recipe</Button>
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
          <Button bsStyle='warning' className='btn-edit' onClick={() => this.updateRecipe(this.state.currentEditIndex)}>Save Recipe</Button>
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
