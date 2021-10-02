import React, { Component } from 'react'
import {withRouter, Link} from 'react-router-dom'

export class CreateItem extends Component {
    state={
        description:'',
        label:'',
        price:'',
        speed:'',
        errors:{
            description:'',
            label:'',
            price:'',
            speed:''
        },
        alert:{
            price:'Inactive',
            speed:'Inactive'
        }
    }

    handleChange= e => {
        const name = e.target.name
        const value = e.target.value
        this.setState({
            [name]:value,
        })
    }

    emptyObj = (obj)=>{
        return Object.keys(obj).length === 0
    }

    handleCreate = (e)=>{
        e.preventDefault();
        let errors = this.validateForm()
        if(this.emptyObj(errors)){
            if(window.confirm("create?")){
                fetch('http://localhost:8002/api/v1/cpus',{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify(this.state)
                })
                .then(response => {
                console.log(response)
                if (!response.ok){
                    if(response.status === 400){
                        throw "invalid form data"
                    }
                    else {
                        throw "internal server error, try again later"
                    }
                }
                else{
                alert("created successful");
                this.props.history.push('/')
                  return response.json()
                }})
            }  
        }
        else {
            this.setState({
              errors: errors
            })
        }    
        console.log(this.state.price)
    }

    regularExpCheck = async e=>{
        const name = e.target.name
        const value = e.target.value
        this.setState({
            [name]:value
        })
        console.log(e.target.value)
        if(!e.target.value.match(/^(:?(:?\d+.\d+)|(:?\d+))$/)){
            await this.setState({
                alert:{
                    ...this.state.alert,
                    [name]:'Active'
                }
            })
        }
        else{
            await this.setState({
                alert:{
                    ...this.state.alert,
                    [name]:'Inactive'
                }
            })
        }
        console.log(this.state.alert)
    }

    validateForm = () => {
        let errors = {}
        if (this.state.description.trim() === "") {
          errors.description = "description is required"
        }
        if (this.state.label.trim() === "") {
          errors.label = "label is required"
        }
        if (this.state.price.trim() === "0") {
            errors.price = "price cannot be 0"
          }
        if (this.state.speed.trim() === "0") {
            errors.speed = "speed cannot be 0"
        }
        if (this.state.price.trim() === "") {
            errors.price = "price cannot be empty"
          }
        if (this.state.speed.trim() === "") {
            errors.speed = "speed cannot be empty"
        }

        if (this.state.alert.price==='Active'&&this.state.alert.speed==='Inactive'){
            errors.price = "price must be a number"
        }

        if (this.state.alert.speed==='Active'&&this.state.alert.price==='Inactive'){
            errors.speed = "speed must be a number"
        }
        
        if (this.state.alert.speed==='Active'&&this.state.alert.price==='Active'){
            errors.price = "price must be a number"
            errors.speed = "speed must be a number"
        }

        return errors
      }

    clearAll = ()=>{
      this.setState({
        description:'',
        label:'',
        price:'',
        speed:'',
        errors:{
            description:'',
            label:'',
            price:'',
            speed:'' 
        },
        alert:{
            price:'Inactive',
            speed:'Inactive'
        }
      })
      this.myInput.focus()
    }
    
    render() {
        return (
            <div className="create_page">
            <form onSubmit={this.handleCreate}>
            <div className="container flex_center" id="newItem">
                    <div className="center_panel">
                        <div>
                            <h1>
                                Create a new CPU
                            </h1>
                        </div>
                        <div className="row">
                            <div className="col-lg-2"></div>
                            <div className="col-lg-4 badge badge-secondary">
                                <h5>
                                    Description
                                </h5>
                            </div>
                            <div className="col-lg-6 row">
                                <div className="col-lg-7">
                                <input 
                                    className="form-control" 
                                    name="description" 
                                    type="text"
                                    value={this.state.description}
                                    onChange={this.handleChange}
                                    ref={myInput=>this.myInput=myInput}
                                    placeholder="description"/>
                                </div>
                                <div className="text-danger col-lg-5">{this.state.errors.description}</div>                
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-2"></div>
                            <div className="col-lg-4 badge badge-secondary">
                                <h5>
                                    Label
                                </h5>
                            </div>
                            <div className="col-lg-6 row">
                                <div className="col-lg-7">
                                <input 
                                    className="form-control" 
                                    name="label" 
                                    type="text"
                                    value={this.state.label}
                                    onChange={this.handleChange}
                                    ref={myInput=>this.myInput=myInput}
                                    placeholder="label"/>
                                </div>
                                <div className="text-danger col-lg-5">{this.state.errors.label}</div>                
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-2"></div>
                            <div className="col-lg-4 badge badge-secondary">
                                <h5>
                                    Price
                                </h5>
                            </div>
                            <div className="col-lg-6 row">
                                <div className="col-lg-7">
                                <input 
                                    className="form-control" 
                                    name="price" 
                                    type="text"
                                    value={this.state.price}
                                    onChange={this.regularExpCheck}
                                    ref={myInput=>this.myInput=myInput}
                                    placeholder="price"/>
                                </div>
                                <div className="text-danger col-lg-5">{this.state.errors.price}</div>                
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-2"></div>
                            <div className="col-lg-4 badge badge-secondary">
                                <h5>
                                    Speed
                                </h5>
                            </div>
                            <div className="col-lg-6 row">
                                <div className="col-lg-7">
                                <input 
                                    className="form-control" 
                                    name="speed" 
                                    type="text"
                                    value={this.state.speed}
                                    onChange={this.regularExpCheck}
                                    ref={myInput=>this.myInput=myInput}
                                    placeholder="speed"/>
                                </div>
                                <div className="text-danger col-lg-5">{this.state.errors.speed}</div>                
                            </div>
                        </div>
                        <div className="button_box">
                            <button className="btn btn-primary" id="new_button" type="submit">Create</button>
                            <button className="btn btn-danger" type='button' onClick={this.clearAll}>Clear</button>
                            <Link to='/'>
                                <button type='button' className="btn btn-secondary">Back to homepage</button>
                            </Link>                        
                        </div>
                    </div>
                </div> 
            </form>
            </div>
        )
    }
}
export default withRouter(CreateItem)
