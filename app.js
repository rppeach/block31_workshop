import express from "express"
const app = express ()
import employees from "./db/employees.js"

app.route('/').get((req, res)=>{
    res.send("Hello employees!");
})

app.route('/employees').get((req, res)=>{
    const e = employees
    res.send(e);
})

app.route('/employees/random').get((req, res)=>{
    if (employees.length === 0){
        return res.status(500).json({ error: "No employee found."});
    }

    const randomIndex = Math.floor(Math.random() * employees.length);
    const selectedEmployee = employees[randomIndex];
    
    res.status(200).json(selectedEmployee);
})

app.route('/employees/:id').get((req, res)=>{
    const id = Number(req.params.id)
    const found = employees.find(emp => emp.id === id)
    if (found){
    res.send(found);
    }else{res.status(404).send("Employee does not exist");}
})




export default app