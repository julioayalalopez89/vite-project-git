import { useState, useEffect, Component} from 'react'
import reactLogo from './assets/react.svg'
import './App.css'


import './assets/style/style.css';



// data
import { todos } from './assets/jsons/todos.json';
import { checklist3} from './assets/jsons/checklist.json';
import { taskss} from './assets/jsons/taskss.json';

import about from './assets/style/img/about.jpg';
 
//<img src={logo} className="App-logo" alt="logo" />

// subcomponents
import TodoForm from './components/TodoForm';
import Navigation from './components/Navigation';
 

import axios from 'axios';

function App() {

    const [count, setCount] = useState( 4);
    const [theme, setTheme] = useState('blue');
    const [todos1,setTodos] = useState(todos)  ;
    const [checklist,setCheklist]=useState(checklist3);
    const [selection,setSelection] = useState(  checklist3.map((checklist3,index)=>(checklist3.state)) );
    //const [task,setTask] = useState(tasks.map((tasks,index)=>(tasks.accion)) );
    const [tasks,setTasks] = useState(taskss);
    
  //para guardar los cambios localmente
const [data, setData] = useState(null);


console.log('tasks');
console.log(tasks);

useEffect(() => {
    axios.get('/public/jsons/taskss.json').then(response => {
      //setData(response.data);
      setTasks(response.data.taskss);
      //console.log('public');
      //console.log(response.data.taskss);
      
    });
  }, []);

  const guardarCambios = () => {
    //const tasks = { tarea1: 'descripcion1', tarea2: 'descripcion2' };
    axios.post('/public/jsons/taskss.json', taskss)
      .then(response => {
        //console.log('boton');
        //console.log(tasks);
        alert('Los cambios han sido guardados!');
        
      })
      .catch(error => {
        console.log(error);
        alert('Se produjo un error al guardar los cambios.');
      });
  };
  


  /*const state= {
    title: 'Aplicacion de tarea',
    ntareas: 10
  };*/

  const[login,setLogin]=useState('');
  const[errorMessages,setErrorMessages]=useState({});
  const[IsSubmited,setIsSubmited]=useState(false);

  // User Login info
  const database = [
    {
      username: "GEMPIL",
      password: "GEMPIL"
    },
    {
      username: "VITRAL",
      password: "VITRAL"
    }
  ];

  const errors = {
    uname: "Usuario Incorrecto",
    pass: "Contraseña Incorecta"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmited(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
      <div className="input-group">
                    <input id="myinput1" name="uname" required type="text" className="form-control border-light" onChange={(event)=> handleLogin(event)} placeholder="Organización"></input>
                           <input id="myinput1" type="password" name="pass" required  className="form-control border-light" placeholder="Contraseña"></input>
                    
                    <div className="input-group-append">
                  
                            <button className="btn btn-primary px-3" >Identifiquese</button>
                           
                    </div>
                </div>
                
      {renderErrorMessage("uname")}
      {renderErrorMessage("pass")}
      </form>
    </div>
  );


  
 

  const [newtask,setNewtask] = useState(
   {epigrafe: "4.1.1",
    accion: "",
    responsable: "",
    comentarios: "",
    fecha: "",
    participantes: "",
    estado: "nc"} 
  );


  
  function removeTask(index) {
    setTasks(prevTasks => tasks.filter((e, i) => {
      return i !== index
    }))
    
   
};

    function handleChangeCumplimiento(event,i) {
        /*const {value , name} = event.target;
        setNewtask({...newtask,[name]:value});*/
        
        console.log('event',event);
        selection[i]=event.target.value;

        checklist[i].state=event.target.value;
        checklist3[i].state=event.target.value;
        
       // checklist[isonumbers.indexOf(tasks[i].epigrafe)].state="c";
        //checklist3[isonumbers.indexOf(tasks[i].epigrafe)].state="c";
       // setCheklist(checklist3);
        setSelection({...selection});
        console.log('check despues',i);
      }

      function handleChangeTask(event,i) {
        //console.log('selection antes',selection[i]);
        //selection[i]=event.target.value;
        //setSelection( [...selection]);
        const {value , name} = event.target;
        setNewtask({...newtask,[name]:value});
    
      }
      function handleChangeState(i,event) {
        
        tasks[i].estado='c';
        setNewtask({...newtask});
        selection[i]="c";
        checklist[isonumbers.indexOf(tasks[i].epigrafe)].state="c";
        checklist3[isonumbers.indexOf(tasks[i].epigrafe)].state="c";
        setSelection({...selection});
        
      }

  function handleAddTask(e) {
    e.preventDefault();
    setTasks( [...tasks, newtask]);
    //console.log("HOLA",newtask);
  };

  function handleLogin(event){
    /*if($minput.value!=null)*/
    //console.log("volr" ,event.target);
    setLogin(event.target.value);
  }
  
  function Discconect(event){
    
    setIsSubmited(false);
   
     }

  function onButtonClick(event){
    
 fetch('NC-ISO-45001-2018.pdf').then(Response=> {Response.blob().then(blob=>{
    const fileURL = window.URL.createObjectURL(blob);
    let alink= document.createElement('a');
    alink.href=fileURL;
    alink.download='NC-ISO-45001-2018.pdf';
    alink.click();

 })})

  }
  

  /*
  function epigrafe(element)
  {
    return element.isonumber=="4.1.1";
    } console.log('filtro',checklist.filter(epigrafe));
    
const epigrafess=checklist.map( function(check){if(check.isonumber=="4.1.1")return {check}})
*/

const epigrafes=[
    {id:"4", name:"SOBRE EL CONTEXTO DE LA ORGANIZACIÓN"},
    {id:"5", name:"SOBRE EL LIDERAZGO Y PARTICIPACIÓN DE LOS TRABAJADORES"},
    {id:"6", name:"SOBRE LA PLANIFICACIÓN"},
    {id:"7", name:"SOBRE EL APOYO"},
    {id:"8", name:"SOBRE LA OPERACIÓN"},
    {id:"9", name:"SOBRE LA EVALUACION DE DESEMPEÑO"},
    {id:"10", name:"SOBRE LA MEJORA"},
];


const subepigrafes=[
    {id:"4.1" , topid:"4", name: "Comprensión de la organización y de su contexto"},
    {id:"4.2" , topid:"4", name: "Comprensión de las necesidades y expectativas de los trabajadores y de otras partes interesadas"},
    {id:"4.3" , topid:"4", name: "Determinación del alcance del Sistema de gestión de la SST"},
    {id:"4.4", topid:"4", name: "Sistema de gestión de la SST"},
    {id:"5.1" , topid:"5", name: "Liderazgo y compromiso"},
    {id:"5.2" , topid:"5", name: "Política de la SST"},
    {id:"5.3" , topid:"5", name: "Roles, responsabilidades y autoridades en la organización"},
    {id:"5.4" , topid:"5", name: "Consulta y participación de los trabajadores"},
    {id:"6.1" ,  topid:"6",name: "Acciones para abordar riesgos y oportunidades"},
    {id:"6.2" ,  topid:"6",name: "Objetivos de la SST y planificación para lograrlos"},
    {id:"7.1" , topid:"7", name: "Recursos"},
    {id:"7.2" , topid:"7", name: "Competencia"},
    {id:"7.3" , topid:"7", name: "Toma de conciencia"},
    {id:"7.4" , topid:"7", name: "Comunicación"},
    {id:"7.5" , topid:"7", name: "Informacion documentada"},
    {id:"8.1" , topid:"8", name: "Planificación y control operacional"},
    {id:"8.2" , topid:"8", name: "Preparación y respuesta ante emergencias"},
    {id:"9.1" , topid:"9", name: "Evaluación del desempeño "},
    {id:"9.2" , topid:"9", name: "Auditoria interna"},
    {id:"9.3" , topid:"9", name: "Revisión por la dirección"},
    {id:"10.1" , topid:"10", name: "Generalidades"},
    {id:"10.2" , topid:"10", name: "Incidentes, no conformidades y acciones correctivas"},
    {id:"10.3" , topid:"10", name: "Mejora continua"},
];

const isonumbers=checklist3.map( ({isonumber})=>isonumber);

var mascotas = ['perro','pollo','pollo'];
const cumplidos = mascotas.reduce( function (obj,mascota){
    if(!obj[mascota])
    {obj[mascota]=1}
    else
    { obj[mascota]++    }
    return obj;
},{}
);


const cumplidas=[0,0,0,0,0,0,0];
const incumplidas=[0,0,0,0,0,0,0];
const parcumplidas=[0,0,0,0,0,0,0];

//const cantidades=Array.from(checklist3);
//console.log('cant',typeof checklist);
checklist3.map((obj,i)=>{
    
    if(obj.state=="nc")
    {
     for(let i=0; i<epigrafes.length;i++){   
        if(obj.number==epigrafes[i].id)
        incumplidas[i]=incumplidas[i]+1; }
    }
    if(obj.state=="c")
    {
     for(let i=0; i<epigrafes.length;i++){   
        if(obj.number==epigrafes[i].id)
        cumplidas[i]=cumplidas[i]+1; }
    }
    if(obj.state=="pc")
    {
     for(let i=0; i<epigrafes.length;i++){   
        if(obj.number==epigrafes[i].id)
        parcumplidas[i]=parcumplidas[i]+1; }
    }   
    });
console.log("cumplidas",cumplidas);
console.log("incumplidas",incumplidas);
console.log("parcumplidas",parcumplidas);

const totales=[19,21,20,13,16,15,10];

console.log("cumplidas",cumplidas);

const label1 = "% de Cumplimiento por epigrafe"
const etiquetas1 = epigrafes.map( (epigrafes,index)=>("Ep.:"+epigrafes.id));
const datos1 = totales.map( (num,index)=>cumplidas[index]/totales[index]*100);


const label2 = "% de Cumplimiento Total"
const etiquetas2 = ["Requisitos Cumplidos","No cumplidos"];
const datos2 = [cumplidas.reduce((acum,current)=>acum+current,0)/totales.reduce((acum,current)=>acum+current,0)*100,(totales.reduce((acum,current)=>acum+current,0)-cumplidas.reduce((acum,current)=>acum+current,0))/totales.reduce((acum,current)=>acum+current,0)*100];


const labelpie = "% de Respuestas dadas"
const etiquetaspie = ["Cumplidas", "NoCumplidas", "Parcialmente Cumplidas"];
const datospie = [cumplidas.reduce((acum,current)=>acum+current,0),incumplidas.reduce((acum,current)=>acum+current,0),parcumplidas.reduce((acum,current)=>acum+current,0),]

const labelpie1 = "% de Respuestas dadas"
const etiquetaspie1 = ["Tareas Cumplidas", "Tareas Sin Cumplir", ];
const datospie1 = [taskss.reduce((acum,current)=>current.estado=="c"?acum+1:acum,0),taskss.reduce((acum,current)=>current.estado=="nc"?acum+1:acum,0)];

console.log("pie1",taskss.reduce((acum,current)=>current.estado=="nc"?acum+1:acum,0));
console.log("label2",label2);
//totales.map( (num,index)=>cumplidas[index]/totales.reduce((acum,current)=>acum+current,0));

  // Obtener una referencia al elemento canvas del DOM
  const $grafica = document.querySelector("#grafica");
  const $grafica1 = document.querySelector("#grafica1");
  const $grafica2 = document.querySelector("#grafica2");
  const $grafica3 = document.querySelector("#grafica3");
  
  // Las etiquetas son las que van en el eje X. 
  
  //const etiquetas1 = epigrafes.map( (epigrafes,index)=>("Epigrafe:"+epigrafes.id));
  const $minput = document.querySelector("#myinput");

  (async function(){
  // Podemos tener varios conjuntos de datos. Comencemos con uno
  const datos = {
      label: label1,
      data: datos1, // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
      backgroundColor: 'rgba(40, 167, 69, 0.6)', // Color de fondo
      borderColor: 'rgba(200, 200, 200, 1)', // Color del borde
      borderWidth: 1,// Ancho del borde
  };
  const datost = {
    label: label2,
    data: datos2, // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
    backgroundColor: ['rgba(40, 167, 69, 0.6)','rgba(255, 72, 0, 0.6)'], // Color de fondo
    borderColor: 'rgba(200, 200, 200, 1)', // Color del borde
    borderWidth: 1,// Ancho del borde
};
  const datosp = {
    label: labelpie,
    data: datospie, // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
    backgroundColor: ['rgba(40, 167, 69, 0.6)', 'rgba(255, 72, 0, 0.6)','rgba(255, 255, 0, 0.6)'], // Color de fondo
    borderColor: 'rgba(200, 200, 200, 1)', // Color del borde
    borderWidth: 1,// Ancho del borde
};
const datosp1 = {
    label: labelpie1,
    data: datospie1, // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
    backgroundColor: ['rgba(40, 167, 69, 0.6)', 'rgba(255, 72, 03, 0.6)'], // Color de fondo
    borderColor: 'rgba(200, 200, 200, 1)', // Color del borde
    borderWidth: 1,// Ancho del borde
};
  new Chart($grafica, {
      type: 'bar',// Tipo de gráfica
      data: {
          labels: etiquetas1,
          datasets: [
              datos,
              // Aquí más datos...
          ]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }],
          },
      }
  });

  new Chart($grafica1, {
    type: 'doughnut',// Tipo de gráfica
    data: {
        labels: etiquetaspie,
        datasets: [
            datosp,
            // Aquí más datos...
        ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }],
        },
    }
});
new Chart($grafica3, {
    type: 'doughnut',// Tipo de gráfica
    data: {
        labels: etiquetaspie1,
        datasets: [
            datosp1,
            // Aquí más datos...
        ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }],
        },
    }
});


new Chart($grafica2, {
    type: 'pie',// Tipo de gráfica
    data: {
        labels: etiquetas2,
        datasets: [
            datost,
            // Aquí más datos...
        ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }],
        },
    }
});
})();

 
  return (
 
    
    <div className="App">
  
   
    <div className="container-fluid bg-dark">
          <div className="row py-2 px-lg-5">
              <div className="col-lg-6 text-center text-lg-left mb-2 mb-lg-0">
                  <div className="d-inline-flex align-items-center text-white">
                     
                      <small><i className="fa fa-phone-alt mr-2"></i>Gesta</small>
                      <small className="px-3">|</small>
                      <small><i className="fa fa-envelope mr-2"></i>Tarea Final Diplomado de Gestion Empresarial</small>
                      <small className="px-3">|</small>
                      <small><i className="fa fa-envelope mr-2"></i>{login}</small>
                             
                  </div>
              </div>
              <div className="col-lg-6 text-center text-lg-right">
                  <div className="d-inline-flex align-items-center">
                      <a className="text-white px-2" href="">
                          <i className="fab fa-facebook-f"></i>
                      </a>
                      <a className="text-white px-2" href="">
                          <i className="fab fa-twitter"></i>
                      </a>
                      <a className="text-white px-2" href="">
                          <i className="fab fa-linkedin-in"></i>
                      </a>
                      <a className="text-white px-2" href="">
                          <i className="fab fa-instagram"></i>
                      </a>
                      <a className="text-white pl-2" href="">
                          <i className="fab fa-youtube"></i>
                      </a>
                  </div>
              </div>
          </div>
      </div>



     
   

      <div className="container-fluid p-0">
        <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-lg-5">
            <a href="index.html" className="navbar-brand ml-lg-3">
                <h2 className="m-0 display-5 text-uppercase text-primary"><i className="fa fa-truck mr-2"></i>nc iso 45001:2018</h2>
            </a>
            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-between px-lg-3" id="navbarCollapse">
                <div className="navbar-nav m-auto py-0">
                    <a href="#myjumbotron" className="nav-item nav-link active">Inicio</a>
                    <a href="#mydocumentacion" className="nav-item nav-link">Documentación</a>
                    <a href="#mydiagnostic" className="nav-item nav-link">Diagnóstico</a>
                    <a href="#myactions" className="nav-item nav-link">Acciones<span id="tasks" className="badge badge-pill badge-light ml-2 ">
                            {todos1.length}
                            </span></a>
                    <div className="nav-item dropdown">
                        {/*<a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Paginas</a>
                        <div className="dropdown-menu rounded-0 m-0">
                            <a href="blog.html" className="dropdown-item">Blog Grid</a>
                            <a href="single.html" className="dropdown-item">Blog Detail</a>
                        </div>*/}
                    </div>
                    <a href="#mygraficas" className="nav-item nav-link">Gráficas</a>
                </div>
                {IsSubmited ? <a onClick={Discconect} className="btn btn-primary py-2 px-4 d-none d-lg-block">Desconectarse</a> : ''}
                
            
            </div>
        </nav>
    </div>










    <div id="myjumbotron" className="jumbotron jumbotron-fluid mb-5">
        <div className="container text-center py-5">
            <h1 className="text-primary">Sistema de Gestión de Seguridad y Salud en el Trabajo </h1>
            <h1 className="text-white display-3 mb-5">Evaluacion de Requisitos - Lista de chequeo</h1>
            <div className="mx-auto" id="myinput" >
            <div className="input-group">
            {!IsSubmited ?<div hiddenclassName="title">Identifiquese</div>:''}
            <div className="login-form">
                        {IsSubmited ? <div>Bienvenido {login}</div> : renderForm}
                    </div>

                </div>
            </div>
        </div>
    </div>
   



    <div id="mydocumentacion" className="container-fluid py-5">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-5 pb-4 pb-lg-0">
                    <img className="img-fluid w-100" src={about} alt=""></img>
                    <div className="bg-primary text-dark text-center p-4">
                        <h3 className="m-0">NC ISO 45001:2018</h3>
                    </div>
                </div>
                <div className="col-lg-7">
                    <h5 className="text-primary text-uppercase font-weight-bold">Acerca de la Norma</h5>
                    <h1 className="mb-4">Sistemas de gestión de la seguridad y salud en el trabajo — Requisitos con orientación para su uso </h1>
                    <p className="mb-4">Este documento especifica requisitos para un sistema de gestión de la seguridad y salud en el trabajo (SGSST) y proporciona orientación para su uso, para permitir a las organizaciones proporcionar lugares de trabajo seguros y saludables previniendo las lesiones y el deterioro de la salud relacionados con el trabajo, así como mejorando de manera proactiva su desempeño de la SGSST. </p>
                    <div className="d-flex align-items-center pt-2">
                        <button onClick={onButtonClick} type="button" className="btn-play" data-toggle="modal"
                            data-src="https://www.youtube.com/embed/DWRcNpR6Kdc" data-target="#videoModal">
                            <span></span>
                        </button>
                        <h5  className="font-weight-bold m-0 ml-4">Descargar Documentacion</h5>
                    </div>
                </div>
            </div>
        </div>
        <div className="modal fade" id="videoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-body">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>        
                        <div className="embed-responsive embed-responsive-16by9">
                            <iframe className="embed-responsive-item" src="" id="video"  allowscriptaccess="always" allow="autoplay"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>






   {/* <!-- Services Start -->*/}
   <div  id="mydiagnostic" className="container-fluid pt-5 bg-secondary">
        <div className="container">
            <div className="text-center pb-2">
                <h6 className="text-primary text-uppercase font-weight-bold">Autodiagnóstico</h6>
                <h1 className="mb-4">Evalue el cumplimiento de cada requisito</h1>
            </div>
            <div className="row">

            <div className="col-lg-12 col-md-12  mb-5 bg-white p-4 ">
            {epigrafes.map((epig,i)=>{
                return (
                    <div>
                    
                    <div className="d-flex align-items-center justify-content-center bg-primary   mt-3 p-3">
                    <i  className="fa fa-2x fa-plane text-dark pr-3 text-center"><h3>{epig.id} - {epig.name}</h3></i>
                    </div>
                                        
                    {subepigrafes.map((subepig,subi)=>{
                           if(epig.id==subepig.topid)
                            return (
                                <div >
                                <div className="d-flex align-items-center justify-content-center bg-dark mb-2 p-2">
                                <i className="fa fa-2x fa-plane text-dark pr-3"><h5 className='text-white'>{subepig.id} - {subepig.name}</h5></i>
                                </div>
                                                {
                                                checklist.map((checked,cid)=>{
                                                        if(checked.subnumber==subepig.id)
                                                            return (
                                                                <div id="b-border" className='row '>
                                                                <p id="myp" className='col-xl-9 col-lg-9 col-md-8 col-sm-12'>{checked.isonumber} - {checked.title}</p>
                                                                <div className=" col-xl-2 col-lg-2 col-md-3 col-sm-10" >
                                                                <select id="myselect" value={selection[cid]} onChange={(event)=> handleChangeCumplimiento(event,cid)} placeholder="Estado de Cumplimiento" className="custom-select  border-2 px-4  mt-1 " >
                                                                <option value="nc">No Cumplida</option>
                                                                <option value="c">Cumplida</option>
                                                                <option value="pc">Parcialmente Cumplida</option>
                                                                </select>
                                                                </div>
                                                                <div className="col-xl-1 col-lg-1 col-md-1 col-sm-2  mt-2" >
                                                                    <a className="border-bottom text-decoration-none   " >{selection[cid]=='c' ? '':'+'}</a>
                                                                </div>
                                                                </div>
                                                
                                                ) 
                                                })}
                                
                                </div>
                     )})}

                    </div>          
                )
                })}
            {checklist3.map((checklist1,i)=>{
               return( 
                
               
            <div></div>        
                 
            )})}
            </div>


            </div>
           
            <div className="text-center pb-4 ">
                        <a className="border-bottom btn btn-dark btn-block text-decoration-none " href="">VER AUTODIAGNÓSTICO</a>
            </div>
            
        </div>
    </div>
    {/*<!-- Services End -->*/}





    <div className="container-fluid  my-5">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-7 py-5 py-lg-0">
                    <h6 className="text-primary text-uppercase font-weight-bold">Acciones pendientes</h6>
                    <h1 className="mb-4">Introduce una nueva accion</h1>
                    <p className="mb-4">Al planificar el sistema de gestión de la SGSST, la organización debe considerar las cuestiones referidas y los requisitos referidos en todos los apartados determinando las acciones para poder incorporar los mismos a nuestrop sistema actual</p>
                    <div className="row">
                        <div className="col-sm-4">
                            <h1 className="text-primary mb-2" data-toggle="counter-up">{tasks.length}</h1>
                            <h6 className="font-weight-bold mb-4">Acciones planificadas</h6>
                        </div>
                        <div className="col-sm-4">
                            <h1 className="text-primary mb-2" data-toggle="counter-up">{tasks.filter(t => t.estado==="nc").length}</h1>
                            <h6 className="font-weight-bold mb-4">Acciones en proceso</h6>
                        </div>
                        <div className="col-sm-4">
                            <h1 className="text-primary mb-2" data-toggle="counter-up">{tasks.filter(t => t.estado==="c").length}</h1>
                            <h6 className="font-weight-bold mb-4">Acciones ejecutadas</h6>
                        </div>
                    </div>
                </div>
                <div className="col-lg-5">
                    <div className="bg-primary py-5 px-4 px-sm-5">
                        <form onSubmit={handleAddTask.bind(this)} className="py-5">
                             <div className="form-group">
                                <select name="epigrafe" id="myselect" placeholder="Epigrafe a accionar" className="custom-select border-0 px-4" onChange={handleChangeState.bind(this)}>
                                {isonumbers.map((iso,i)=>{
                                    return(
                                    <option value={iso}>{iso} - {checklist3[isonumbers.indexOf(iso)].title}</option>
                                    )})}
                                </select>
                            </div>
                            <div className="form-group">
                                <input name="accion" type="text" className="form-control border-0 p-4" placeholder="Acción a implementar" required="required"  onChange={handleChangeTask}/>
                            </div>
                            <div className="form-group">
                                <input name="responsable"  type="text" className="form-control border-0 p-4" placeholder="Responsable" required="required" onChange={handleChangeTask}/>
                            </div>
                            <div className="form-group">
                                <input  name="participantes"  type="text" className="form-control border-0 p-4" placeholder="Participantes" required="required" onChange={handleChangeTask}/>
                            </div>
                            <div className="form-group">
                                <input name="fecha" type="date" className="form-control border-0 p-4" placeholder="Fecha de Cumplimiento" required="required" onChange={handleChangeTask} />
                            </div>
                            <div className="form-group">
                                <input name="comentarios" type="text" className="form-control border-0 p-4" placeholder="Comentario" required="required" onChange={handleChangeTask} />
                            </div>
                           
                            
                            <div>
                                <button className="btn btn-dark btn-block border-0 py-3" type="submit" onSubmit={handleAddTask.bind(this)}>Crear Acción</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>





    {/*<!-- Pricing Plan Start -->*/}
    <div id="myactions" className="container-fluid pt-5 bg-secondary">
        <div className="container">
            <div className="text-center pb-2">
                <h6 className="text-primary text-uppercase font-weight-bold">Acciones programadas para la implementacion de la norma </h6>
                <h1 className="mb-4"></h1>
            </div>
            <div className="row">

            {tasks.map((tasks1,i)=>{
              
               return(

                    <div className="col-md-4 mb-5" key={i}>
                    <div className="bg-white">
                        
                    <div className="bg-primary text-center p-2">
                            <h4 className="m-0">{tasks1.fecha}</h4>
                        </div>

                        <div className="text-center p-2">
                        <p className='mb-1'>{checklist[isonumbers.indexOf(tasks1.epigrafe)].number}.
                        {epigrafes[checklist[isonumbers.indexOf(tasks1.epigrafe)].number-4].name}</p>
                        <p className='mb-1' id="b-border">{checklist[isonumbers.indexOf(tasks1.epigrafe)].subnumber}.
                        {subepigrafes[checklist[isonumbers.indexOf(tasks1.epigrafe)].number-4].name}</p>
                        
                            <div id="myaction" className="display-4 mb-0">
                               <h5 id="b-border" className="m-0" >{tasks1.epigrafe} - {checklist[isonumbers.indexOf(tasks1.epigrafe)].title}  </h5>                         
                            </div>
                            
                        </div>
                        <div className="bg-primary text-center p-2">
                            <h4 className="m-0">{tasks1.accion}</h4>
                        </div>
                        <div className="d-flex flex-column align-items-center p-2"> 
                            <p id="b-border" className='mb-1'>Responsable: {tasks1.responsable}</p>  
                            <p id="b-border" className='mb-1'>Participantes: {tasks1.participante}</p>     
                            <p id="b-border" className='mb-1'>Comentarios: {tasks1.comentarios}</p>    
                            <a hidden={tasks[i].estado=='c'?true:false} className="btn btn-primary py-2 px-4 my-2" onClick={handleChangeState.bind(this,i)}>Cumplida</a>
                                <div>
                                    <a  id="mybutton1"   className="btn btn-secondary py-2 px-4 my-2">Editar</a>
                                    <a id="mybutton"  className="btn btn-primary py-2 px-4 my-2" onClick={removeTask.bind(this,i)}>Eliminar</a>
                                </div>
                        </div>
                    </div>
                </div>

               )
                   })}


            </div>
        </div>
        
        <div>
    {/* 12Renderiza los datos obtenidos del archivo json */}
    <button id='guardar' onClick={guardarCambios}>Guardar cambios</button>
  </div>

    </div>
    {/*<!-- Pricing Plan End -->*/}




    <div id="mygraficas" className="container-fluid bg-dark">
    <div className="text-center pb-2 pt-2">
                <h1 className="mb-2  text-white">Gráficas de los resultados </h1>
            </div>
    <div className="row">
       <div className="col-lg-6 pb-4 py-2 px-lg-5">
            <canvas id="grafica1"></canvas>
             </div>

          <div className="col-lg-6 pb-4 p-2y px-lg-5">
            <canvas id="grafica"></canvas> 
            </div>

            <div className="col-lg-6 pb-4 p-2y px-lg-5">
            <canvas id="grafica2"></canvas> 
            </div>
            
            <div className="col-lg-6 pb-4 p-2y px-lg-5">
            <canvas id="grafica3"></canvas> 
            </div>
            
            
            </div></div>








      {/* 
      <div className="container">
          <div className="row mt-4">

            <div className="col-md-4 text-center">
                
            <TodoForm onAddTodo={handleAddTodo}></TodoForm>
            </div>

            <div className="col-md-8">
              <div className="row">
                            {todos1.map((todo,i)=>{
                              return(
                                  <div className="col-md-4" key={i}>
                                  <div className="card mt-4">
                                    <div className="card-title text-center">
                                      <h3>{todo.title}</h3>
                                      <span className="badge badge-pill badge-danger ml-2">
                                        {todo.priority}
                                      </span>
                                    </div>
                                    <div className="card-body">
                                      {todo.description}
                                    </div>
                                    <div className="card-footer">
                                    <button
                                            className="btn btn-danger"
                                            onClick={removeTodo.bind(this, i)}
                                            >
                                            Delete
                                          </button>
                                    </div>
                                  </div>
                                </div>
                              )
                            })}

              </div>
            </div>
          </div>
        </div>
*/}

 {/*<!-- Back to Top -->*/}
    <a href="#" className="btn btn-lg btn-primary back-to-top">^<i className="fa fa-angle-double-up"></i></a>




    </div>
  )
}

export default App;