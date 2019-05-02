import React, { Component } from 'react'
import {
  FormGroup, Label, Input,
  FormText, FormFeedback } from 'reactstrap'

export default class InputGroup extends Component {
  render() {
    let {
      label = ' ', type="text", name, placeholder,
      invalid, value, onChange, text, feedback } = this.props

    let divText
    let divFeedback
    if (text) divText = (<FormText>{text}</FormText>)
    if (feedback) divFeedback = (<FormFeedback>{feedback}</FormFeedback>)

    return (
      <FormGroup>
        <Label>{label}</Label>
        <Input
          type={type}
          name={name}
          placeholder={placeholder}
          invalid={invalid}
          value={value}
          onChange={onChange} />
        {divText}
        {divFeedback}
      </FormGroup>
    );
  }
}
