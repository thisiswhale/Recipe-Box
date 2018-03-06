import React, {Component} from 'react'
import {
  Modal,
  Button,
  ListGroup,
  ListGroupItem,FormGroup,
  ControlLabel,
  FormControl
} from 'react-bootstrap'

export default class EditRecipeModal extends Component {

  constructor(){
    super()
  }

  render(){
    return (
      <Modal show={this.props.showModal} onHide={this.props.closeModal} container={this} aria-labelledby="contained-modal-title">
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
                value={this.props.inputRecipe}
                onChange={this.props.handleRecipe}
              />
              <ControlLabel>Ingredients</ControlLabel>
              <FormControl
                type="text"
                value={this.props.inputIngredient}
                onChange={this.props.handleIngredient}
              />
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle='warning' className='btn-edit' onClick={() => this.props.handleUpdate(this.props.thisIndex)}>Save Recipe</Button>
          <Button onClick={this.props.closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
