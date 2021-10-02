import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export class Header extends Component {
    state={
        searchText:''
    }
    handleChange = (event)=>{
        const value = event.target.value
        this.setState({
            searchText: value
        })
        this.props.search(value)
    }

    handleClick = ()=>{
        this.setState({
            searchText:''
        })
        this.props.search('')
    }
    render() {
        return (

                <div className="header">
                    <div className="row">
                        <div className="col-lg-2 flex_center">
                            <div className="border_1">
                                <span>
                                <i class="fas fa-database"></i>
                                </span>
                                <h5>
                                    My Cpu Hub
                                </h5>
                            </div>
                        </div>
                        <div className="col-lg-8 flex_center">
                            <div className="col-lg-2"></div>
                            <div className="col-lg-8">
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    placeholder="Search" 
                                    aria-label="Recipient's username" 
                                    aria-describedby="basic-addon2"
                                    onChange={this.handleChange} 
                                    value={this.state.searchText}/>
                            </div>
                            <div className="col-lg-2">
                            <button className="btn btn-primary button_header" onClick={this.handleClick}>Clear</button>
                            </div>
                        </div>
                        <div className="col-lg-2 flex_center">
                            <Link to='/create'>
                                <button className="btn btn-danger">new one</button>
                            </Link>
                        </div>
                    </div>
                </div>

        )
    }
}

export default Header
