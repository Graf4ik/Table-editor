import React from 'react';
import './App.scss';
import { ButtonGroup, Button } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import * as axios from 'axios';
import Editor from './Components/Editor.js';
import MyTable from "./Components/MyTable";
import $ from 'jquery';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.save = this.save.bind(this);
        this.handleDragEnter = this.handleDragEnter.bind(this);
        this.handleDragLeave = this.handleDragLeave.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.openEditor = this.openEditor.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onColorChange = this.onColorChange.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
        this.deleteEmployer = this.deleteEmployer.bind(this);
        this.state = {
            peoples: [],
            name: "",
            type: "main",
            value: "#000000",
            editedId: -1,
            cardList: 1
        };
        this.emptyPeople = {
            name: this.state.name,
            type: "main",
            value: "#000000"
        };
    }
    componentDidMount() {
        const localStorageRef = localStorage.getItem('peoples')
        if (localStorageRef) {
            //this.setState({peoples: JSON.parse(localStorageRef)})
        }
        console.log('localStorageRef', localStorageRef)
        this.getUsers();
    };

    handleDragEnter = e => {
        e.preventDefault();
        e.stopPropagation();
    };
    handleDragLeave = e => {
        e.preventDefault();
        e.stopPropagation();
    };
    handleDragOver = e => {
        e.preventDefault();
        e.stopPropagation();
    };
    handleDrop = e => {
        e.preventDefault();
        e.stopPropagation();
    };

    openEditor(e) {
        let dataIndex = e.target.getAttribute('data-index') || $(e.target).closest("tr").attr('data-index');
        let index = parseInt(dataIndex);
        $(".table tr").removeClass("active")
        let item;
        if (index !== -1) {

            $(e.target).closest("tr").addClass("active");
            item = this.state.peoples[index];
        } else {
            item = this.emptyPeople;
        }

        this.setState({
            type: item.type,
            name: item.name,
            value: item.value,
            editedId: index
        });
    }

    deleteEmployer(e) {
        e.preventDefault();
        $(".table tr").removeClass("active")
        let newPeoples;
        if (this.state.editedId === -1 ) {
            alert("Вы должны выбрать поле для удаления!");
            return;
        }
        else {
            newPeoples = this.state.peoples;
            newPeoples.splice(this.state.editedId, 1);
        }
        this.setState({
            peoples: newPeoples,
            editedId: -1
        });
    }


    onNameChange(e) {
        this.setState({
            name: e.target.value
        });
    };

    dndChange() {

    }

    onTypeChange(e) {
        this.setState({
            type: e.target.value
        });
    };

    onColorChange(e) {
        this.setState({
            value: e.target.value
        });
    };

    getUsers() {
        axios.get('./assets/default_data.json')
            .then((res) => {
                this.setState({
                    peoples: res.data.table
                });
            })
            .catch((err) => {});
    }

    save(e) {
        e.preventDefault();
        $(".table tr").removeClass("active")
        let people =
            {
                name: this.state.name,
                type: this.state.type,
                value: this.state.value
            };

        let newPeoples = this.state.peoples;
        if (this.state.editedId === -1 ) {
            if (this.state.name === "") {
                alert("Пожалуйста введите имя!")
                return
            }
            if (newPeoples.filter(
                i => i.name === people.name).length > 0) {
                alert("Пользователь с таким именем уже существует!");
                return;
            }
            newPeoples.push(people);
            this.state.name = '';
            localStorage.setItem('peoples', JSON.stringify(people))
        }
        else {
            newPeoples[this.state.editedId]=people
        }
        this.setState({
            peoples: newPeoples
        });

    }

    render() {
        return (
            <div className="App">
                <h1>Table editor</h1>
                <Container>
                    <ButtonGroup aria-label="Basic example">
                        <Button
                            variant="success"
                            onClick={this.openEditor}
                            data-index="-1"
                            title="Add employer"
                        >Add
                        </Button>
                        <Button
                            variant="danger"
                            onClick={this.deleteEmployer}
                        >Delete
                        </Button>
                    </ButtonGroup>
                </Container>
                <div>
                    <Row className="my-1 p-3">
                        <Col col="12 lg-6" className="panel">
                            <MyTable
                                handleDragEnter={this.handleDragEnter}
                                handleDragLeave={this.handleDragLeave}
                                handleDragOver={this.handleDragOver}
                                handleDrop={this.handleDrop}
                                peoples={this.state.peoples}
                                openEditor={this.openEditor}
                            />
                        </Col>
                        <Col col="12 lg-6" className="card">
                            Editor
                            <Editor
                                   onSaveClick={this.save}
                                   onNameChange={this.onNameChange}
                                   onTypeChange={this.onTypeChange}
                                   onChange={this.onColorChange}
                                   type={this.state.type}
                                   name={this.state.name}
                                   value={this.state.value}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default App;
