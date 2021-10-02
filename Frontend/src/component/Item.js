import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export class Item extends Component { 
    state = {
        id:this.props.item.id,
        createdAt:this.props.item.createdAt,
        modifiedAt:this.props.item.modifiedAt,
        description:this.props.item.description,
        label:this.props.item.label,
        price:this.props.item.price,
        speed:this.props.item.speed,
        status:this.props.item.status
    }
    

    handleDelete = ()=>{
        if(window.confirm("Delete?")){
            fetch(`http://localhost:8002/api/v1/cpus/${this.state.id}`,{
                    method:'DELETE'
            })
            .then(res=>res.json())
            .then(
                res=>{
                    alert("delete successful");
                    window.location.reload();
                }
            )  
        }
    }
    
    render() {
        return (
                    <div className={this.props.index%2===0 ? "container item1" : "container item2"}>
                        <div className="col-xl-12 col-lg-6 col-md-6 col-sm-6 col-xs-6 row height">
                            <div className="col-xl-1 cell"><p>ID</p></div>
                            <div className="col-xl-2 cell"><p>Create Time</p></div>
                            <div className="col-xl-2 cell"><p>Modify Time</p></div> 
                            <div className="col-xl-1 cell"><p>Description</p></div>
                            <div className="col-xl-1 cell"><p>Label</p></div>
                            <div className="col-xl-1 cell"><p>Price</p></div>
                            <div className="col-xl-1 cell"><p>Speed</p></div>
                            <div className="col-xl-1 cell"><p>Status</p></div>
                            <div className="col-xl-1 cell"><p>Update</p></div>
                            <div className="col-xl-1 cell"><p>Delete</p></div>
                        </div>
                        <div className="col-xl-12 col-lg-6 col-md-6 col-sm-6 col-xs-6 row">
                            <div className="col-xl-1 height_50 cell"><p>{this.state.id}</p></div>
                            <div className="col-xl-2 height_50 cell"><p>{this.state.createdAt}</p></div>
                            <div className="col-xl-2 height_50 cell"><p>{this.state.modifiedAt}</p></div> 
                            <div className="col-xl-1 height_50 cell"><p>{this.state.description}</p></div>
                            <div className="col-xl-1 height_50 cell"><p>{this.state.label}</p></div>
                            <div className="col-xl-1 height_50 cell"><p>{this.state.price}</p></div>
                            <div className="col-xl-1 height_50 cell"><p>{this.state.speed}</p></div>
                            <div className="col-xl-1 height_50 cell"><p>{this.state.status}</p></div>
                            <div className="col-xl-1 height_50 cell">
                               <Link 
                               to = {{pathname : '/update/'+ this.state.id, 
                                      state : {
                                        id : this.state.id,
                                        createdAt : this.state.createdAt,
                                        modifiedAt:this.state.modifiedAt,
                                        description:this.state.description,
                                        label:this.state.label,
                                        price:this.state.price,
                                        speed:this.state.speed,
                                        status:this.state.status
                                    }}}>
                                    <button className="btn btn-primary button_inside">
                                        Update
                                    </button>
                               </Link>
                            </div>
                            <div className="col-xl-1 height_50 cell">
                                <button 
                                className="btn btn-danger button_inside" 
                                onClick={this.handleDelete}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
        )
    }
}

export default Item
