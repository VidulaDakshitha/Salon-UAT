import React from 'react';



const Staff=React.lazy(()=>import('./views/Theme/Staff')); //Added staff page
const Calendar=React.lazy(()=>import('./views/Theme/Calendar'));//Added calendar
const List=React.lazy(()=>import('./views/Theme/Calendar/List'));//Added calendar
const Client=React.lazy(()=>import('./views/Theme/Client'));//Added client
const Services=React.lazy(()=>import('./views/Theme/Services'));//Added Services

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const MonthlyView=React.lazy(()=>import('./views/Theme/Calendar/MonthlyView')); //Home view Added
const TableView=React.lazy(()=>import('./views/Theme/Calendar/TableView')); 
const Catergory=React.lazy(()=>import('./views/Theme/Catergory/Catergory')); //Home view Added
const Location=React.lazy(()=>import('./views/Theme/Location/Location')); 


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
 
  
  
  // { path: '/', exact: true, name: 'Home'},
  // localStorage.getItem("AccessToken")!==""&&(localStorage.getItem("type")==="2")?{ path: '/dashboard', name: 'Dashboard', component: Dashboard }:window.location.href="/#/login",
  
 
  // localStorage.getItem("AccessToken")!==""&&(localStorage.getItem("type")==="2")?{path:'/saloon/Staff',name:'Staff',component:Staff}:window.location.href="/#/login", //Added Staff Route
  // {path:'/saloon/Calendar',name:'Calendar',component:Calendar},
  // {path:'/saloon/List',name:'List',component:List}, 
  // {path:'/saloon/Client',name:'Client',component:Client},
  // localStorage.getItem("AccessToken")!==""&&(localStorage.getItem("type")==="2")?{path:'/saloon/Services',name:'Services',component:Services}:window.location.href="/#/login",
  // {path:'/saloon/catergory',name:'Catergory',component:Catergory},
  // {path:'/saloon/monthly',name:'MonthlyView',component:MonthlyView},
  // {path:'/saloon/location',name:'MonthlyView',component:Location},

  { path: '/', exact: true, name: 'Home'},
{ path: '/dashboard', name: 'Dashboard', component: Dashboard },
  
 
{path:'/saloon/Staff',name:'Staff',component:Staff}, //Added Staff Route
  {path:'/saloon/Calendar',name:'Calendar',component:Calendar},
  {path:'/saloon/List',name:'List',component:List}, 
  {path:'/saloon/Client',name:'Client',component:Client},
{path:'/saloon/Services',name:'Services',component:Services},
  {path:'/saloon/catergory',name:'Catergory',component:Catergory},
  {path:'/saloon/monthly',name:'MonthlyView',component:MonthlyView},
  {path:'/saloon/table',name:'TableView',component:TableView},
  {path:'/saloon/location',name:'MonthlyView',component:Location},
];

export default routes;
