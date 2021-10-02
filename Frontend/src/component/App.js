import React, { Component } from 'react'
import Item from './Item'
import '../css/style.css'
import Header from './Header'

export class App extends Component {
    state={
        items : [],
        itemsCopy :[]
    }
    componentDidMount(){
        fetch ('http://localhost:8002/api/v1/cpus',{
            method:"GET"
        })
        .then(response=>response.json())
        .then(response=>{
            this.setState({
                items : response.result,
                itemsCopy : response.result
            })
        console.log(response.result)
        })
    }

    search=(text)=>{
        let _items = [...this.state.itemsCopy]
        _items = _items.filter(p=>{
            const matchArray = p.description.match(new RegExp(text,'gi'))
            return !!matchArray
        })
        this.setState({
            items:_items
        })
    }

    render() {
        return (
            <div >
                <Header search={this.search}/>
                <div id="CpuList">
                {   

                    this.state.items.map((item, index=1)=>{
                        return (       
                                <Item item={item} key={item.id} index={index++}/>
                        )
                    })
                }
                </div>
            </div>
        )
    }
}

export default App
