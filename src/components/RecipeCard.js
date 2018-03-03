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
      editIngredientValue: ''
    }
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
      return (<Panel eventKey={i + 1}>
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
          <Button onClick={this.handleEditRecipeModalHide}>Edit</Button>
          <Button bsStyle="danger">Delete</Button>
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
                row="2"
                value={this.state.addIngredientValue}
                placeholder="e.g. eggs, flour, tomato sauce, water"
                onChange={this.handleChangeIngredientValue}
              />
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleAddRecipeModalHide}>Add Recipe</Button>
          <Button onClick={this.handleAddRecipeModalHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  renderEditRecipeModal = () => {
    console.log('he')
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
                placeholder="e.g. Lasagna"
                onChange={this.handleChangeEditRecipeValue}
              />
              <ControlLabel>Ingredients</ControlLabel>
              <FormControl
                type="text"
                row="2"
                value={this.state.editIngredientValue}
                placeholder="e.g. eggs, flour, tomato sauce, water"
                onChange={this.handleChangeEditIngredientValue}
              />
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button>Add Recipe</Button>
          <Button onClick={this.handleAddRecipeModalHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
  render() {
    return (<div>
      <PanelGroup accordion="accordion" id="accordion-example">
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
