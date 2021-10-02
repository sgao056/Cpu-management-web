import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { withRouter } from 'react-router'

export class UpdateItem extends Component {

    state={
        id:this.props.history.location.state.id,
        createdAt:this.props.history.location.state.createdAt,
        modifiedAt:this.props.history.location.state.modifiedAt,
        description:this.props.history.location.state.description,
        label:this.props.history.location.state.label,
        price:this.props.history.location.state.price,
        speed:this.props.history.location.state.speed,
        status:this.props.history.location.state.status,
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

    emptyObj = (obj)=>{
        return Object.keys(obj).length === 0
    }


    handleChange= e => {
        const name = e.target.name
        const value = e.target.value
        this.setState({
            [name]:value
        })
    }

    handleUpdate = (e)=>{
        e.preventDefault();
        let errors = this.validateForm()
        if(this.emptyObj(errors)){
            if(window.confirm("Update?")){
                fetch(`http://localhost:8002/api/v1/cpus/${this.state.id}`,{
                        method:'PUT',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify(this.state)
                })
                .then(res=>res.json())
                .then(
                    res=>{
                        alert("Updated successful");
                        // this.props.history.push('/')
                    }
                )  
            }
        }
        else {
            this.setState({
              errors: errors
            })
        }   
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
        if (this.state.price === 0) {
            errors.price = "price cannot be 0"
          }
        if (this.state.speed === 0) {
            errors.speed = "speed cannot be 0"
        }

        if (this.state.alert.price==='Active'&&this.state.alert.speed==='Inactive'&&this.state.price!==''){
            errors.price = "price must be a number"
        }

        if (this.state.alert.speed==='Active'&&this.state.alert.price==='Inactive'&&this.state.speed!==''){
            errors.speed = "speed must be a number"
        }
        
        if (this.state.alert.speed==='Active'&&this.state.alert.price==='Active'&&this.state.price!==''&&this.state.speed!==''){
            errors.price = "price must be a number"
            errors.speed = "speed must be a number"
        }

        return errors
      }

    render() {
        return (
            <div>
                {
                    console.log(this.state)
                }
                <div className="create_page">
                    <div className="container flex_center" id="newItem">
                        <div className="center_panel">
                            <div>
                                <h1>
                                    Update a CPU data
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
                                <button className="btn btn-primary" id="new_button" onClick={this.handleUpdate}>Update</button>
                                <Link to='/'>
                                    <button className="btn btn-secondary">Back to homepage</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(UpdateItem)
