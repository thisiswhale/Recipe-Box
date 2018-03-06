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
import EditRecipeModal from './children/EditRecipeModal'
import AddRecipeModal from './children/AddRecipeModal'

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
    (retrievedObject) ? this.setState({recipes: retrievedObject}) : this.setState({recipes: this.state.recipes})
  }

  addRecipe = (addRecipe) => {
  let object = this.state.recipes;
  object.push(addRecipe)
  this.setState({recipes: object, addRecipeValue:'', addIngredientValue:''})
  this.saveRecipesLocalStorage();
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

  handleAddRecipe = (e) => {
    e.preventDefault();
    this.setState({showAddModal: true});
    const regExp = /\s*,\s*/;
    let newRecipeName = this.state.addRecipeValue;
    let newIngredients = this.state.addIngredientValue.split(regExp);
    let newRecipe = {
      name: newRecipeName,
      ingredients: newIngredients
    };
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
  handleChangeRecipeValue = (e) => {
    this.setState({addRecipeValue: e.target.value});
  }

  handleChangeIngredientValue = (e) => {
    this.setState({addIngredientValue: e.target.value});
  }

  handleEditRecipeModalHide = () => {
    this.setState({showEditModal: false});
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

  render() {
    return (<div>
      <PanelGroup accordion="accordion" id="accordion">
        {this.renderRecipeCard()}
      </PanelGroup>
      <Button bsStyle="primary" onClick={() => this.setState({showAddModal: true})}>
        Add Recipe
      </Button>
      <AddRecipeModal
        inputRecipe = {this.state.addRecipeValue}
        handleRecipe= {this.handleChangeRecipeValue}
        inputIngredient = {this.state.addIngredientValue}
        handleIngredient = {this.handleChangeIngredientValue}
        showModal= {this.state.showAddModal}
        handleAdd = {this.handleAddRecipe}
        closeModal = {this.handleAddRecipeModalHide}
      />
      <EditRecipeModal
        inputRecipe = {this.state.editRecipeValue}
        handleRecipe= {this.handleChangeEditRecipeValue}
        inputIngredient = {this.state.editIngredientValue}
        handleIngredient = {this.handleChangeEditIngredientValue}
        showModal = {this.state.showEditModal}
        handleUpdate = {this.updateRecipe}
        closeModal = {this.handleEditRecipeModalHide}
        recipe = {this.state.recipes}
        thisIndex = {this.state.currentEditIndex}
      />
    </div>);
  }
}
