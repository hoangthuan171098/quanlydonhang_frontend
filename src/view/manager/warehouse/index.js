import React, {Component} from 'react'
import {Route,Switch} from 'react-router-dom'
import './style/index.scss'

import List from './list'
import Import from './import'
import Export from './export'
import Info from './info'
import ImportInfo from './importInfo'
import ExportInfo from './exportInfo'

export default class ManagerWarehouse extends Component{
    render(){
        return(
            <div className="ManagerWarehouse">
                <Switch>
                    <Route exact path='/manager/warehouse' component={List} />
                    <Route exact path='/manager/warehouse/import' component={Import} />
                    <Route path='/manager/warehouse/import/:id' component={ImportInfo} />
                    <Route exact path='/manager/warehouse/export' component={Export} />
                    <Route path='/manager/warehouse/export/:id' component={ExportInfo} />
                    <Route path='/manager/warehouse/:id' component={Info} />
                </Switch>
            </div>
        )
    }
}
