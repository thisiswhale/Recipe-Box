import React, {Component} from 'react'
import {
  Modal,
  Button,
  ListGroup,
  ListGroupItem,
  FormGroup,
  ControlLabel,
  FormControl
} from 'react-bootstrap'

export default class AddRecipeModal extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (<Modal show={this.props.showModal} onHide={this.props.closeModal} container={this} aria-labelledby="contained-modal-title">
      <Modal.Header closeButton="closeButton">
        <Modal.Title id="contained-modal-title">
          Add A Recipe
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <FormGroup controlId="formBasicText">
            <ControlLabel>Recipe</ControlLabel>
            <FormControl
              type="text"
              value={this.props.inputRecipe}
              placeholder="e.g. Lasagna"
              onChange={this.props.handleRecipe}/>
            <ControlLabel>Ingredients</ControlLabel>
            <FormControl
              type="text"
              value={this.props.inputIngredient}
              placeholder="e.g. eggs, flour, tomato sauce, water"
              onChange={this.props.handleIngredient}/>
          </FormGroup>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="primary" className='btn-add' onClick={this.props.handleAdd}>Add Recipe</Button>
        <Button onClick={this.props.closeModal}>Close</Button>
      </Modal.Footer>
    </Modal>);
  }
}
