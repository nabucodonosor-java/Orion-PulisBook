import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Form from './Form';
import List from './List';


const Moradores = () => {
    return (
       <div>
           <Switch>
               <Route path="/admin/moradores" exact>
                    <List />
               </Route>
               <Route path="/admin/moradores/:moradorId">
                    <Form />
               </Route>
           </Switch>
       </div>
    );
}

export default Moradores;