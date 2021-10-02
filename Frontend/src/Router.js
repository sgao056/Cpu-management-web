import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import App from './component/App'
import CreateItem from './component/CreateItem'
import UpdateItem from './component/UpdateItem'
const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={App}/>
            <Route path="/create" component={CreateItem}/>
            <Route path="/update/:id" component={UpdateItem}/>    
        </Switch>
    </BrowserRouter>
)

export default Router;