import React from "react";
import {Modal, Button, Form, FormGroup, Label, Input} from "reactstrap";
import PropTypes from "prop-types";
import FilterButton from "./FilterButton";


class CustomModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.modal
    };
  }

  composeFormInputs(obj) {
    const keys = Object.keys(obj.inputs);
    return (
      <Form>
        {keys.map(key => {
          return (
            <FormGroup key={key}>
              <Label for={`id-${key}`}>
                {obj.inputs[key].label}{obj.inputs[key].required ? '*' : ''}
              </Label>
              <Input
                id={`id-${key}`}
                className="form-control-alternative"
                placeholder={obj.inputs[key].placeholder}
                type={obj.inputs[key].type}
                value={obj.inputs[key].value}
                required={obj.inputs[key].required}
                onChange={(event) => obj.onChange(event.target.value, obj.id, key)}
              />
            </FormGroup>
          )}
        )}
      </Form>
    )
  }

  disableButton(inputs) {
    let disable = false;
    const keys = Object.keys(inputs);
    keys.forEach(key => {
      if (inputs[key].required) {
        let value = inputs[key].value.length;
        if (value < inputs[key].minLength || value > inputs[key].maxLength) {
          disable = true;
        }
      }
    });
    return disable;
  }

  render() {
    return (
      <Modal
        className="modal-dialog-centered"
        isOpen={this.props.modal.open}
      >
        <div className="modal-header">
          <h5 className="modal-title" id="post-modal">
            {this.props.modal.title}
          </h5>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => this.props.modal.toggleMethod(this.props.modal.id)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          {this.composeFormInputs(this.props.modal)}
        </div>
        <div className="modal-footer">
          <Button
            outline
            color="secondary"
            data-dismiss="modal"
            type="button"
            onClick={() => this.props.modal.toggleMethod(this.props.modal.id)}
          >
            Cancelar
          </Button>
          <Button
            color="primary"
            type="button"
            disabled={this.disableButton(this.props.modal.inputs)}
            onClick={() => this.props.modal.submitMethod()}
          >
            Postar
          </Button>
        </div>
      </Modal>
    )
  }
}

CustomModal.propTypes = {
  modal: PropTypes.shape({
    id: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    inputs: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        placeholder: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        required: PropTypes.bool.isRequired,
        minLength: PropTypes.number.isRequired,
        maxLength: PropTypes.number.isRequired,
      }),
    ),
    onChange: PropTypes.func.isRequired,
    toggleMethod: PropTypes.func.isRequired,
    submitMethod: PropTypes.func.isRequired
  })
};

export default CustomModal;