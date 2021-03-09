import React from 'react';
import {Button, Form, InputGroup, FormControl, Col } from 'react-bootstrap';

class Editor extends React.Component {
    render() {
        const mainCheked = (this.props.type === "main")
        return (
            <Form className="text-left">
                <Form.Group>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-default">Name</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default" id="name" placeholder="Enter your name"
                            value={this.props.name} onChange={this.props.onNameChange}
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Type</Form.Label>
                    <Form.Control as="select" defaultValue={mainCheked} onChange={this.props.onTypeChange}>
                        <option id="mainRadio" name="typeRadio" value="main">Main</option>
                        <option id="sideRadio" name="typeRadio" value="side">Side</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-default">Color</InputGroup.Text>
                        </InputGroup.Prepend>
                        <div className="colorPicker">
                            <input type="color" value={this.props.value} onChange={this.props.onChange}/>
                            <input type="text" value={this.props.value} onChange={this.props.onChange}/>
                        </div>

                    </InputGroup>
                </Form.Group>

                <Button variant="primary" type="sumbit" onClick={this.props.onSaveClick}>Save</Button>
            </Form>
        )
    }
}

export default Editor;