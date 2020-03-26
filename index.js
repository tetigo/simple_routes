const express = require("express");
const port = 3000;
const app = express();

function checkIdExists(req, res, next) {
  const { id } = req.params;
  const obj = projects.find(element => element.id == id)
  if (!obj) {
    return res.status(400).json({ error: "ID do not exists" });
  }
  return next();
}

// global.count = 0
function contador(req, res, next){
  // console.log('contagem:',++global.count)
  console.count("numero de requisicoes")
  next()
}

app.use(express.json());
app.use(contador)

projects = [
  {
    id: "1",
    title: "Novo Projeto",
    tasks: ["Nova Tarefa"]
  }
];

app.get("/projects", (req, res) => {
  return res.json(projects);
});

app.post("/projects", (req, res) => {
  const { id, title } = req.body;
  const obj = {
    id,
    title,
    tasks: []
  };
  projects.push(obj);
  return res.json(projects);
});

app.post("/projects/:id/tasks", checkIdExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  
  // const project = projects.find(element=>element.id == id)
  // project.tasks.push(title)

  projects.forEach(element => {
    if (element.id == id) {
      element.tasks.push(title);
    }
  });
  return res.json(projects);
});

app.put("/projects/:id", checkIdExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  
  // find retorna o primeiro objeto com id 
  // se tiver varios itens com id igual, só altera o primeiro
  const project = projects.find(element=>element.id == id)
  project.title = title
  return res.json(projects);
});

app.delete("/projects/:id", checkIdExists, (req, res) => {
  const { id } = req.params;
  // projects = projects.filter(element => {
  //   return element.id != id;
  // });
  const projectIndex = projects.find(element=>element.id == id)
  projects.splice(projectIndex, 1)
  return res.json(projects);
});



app.listen(port, err => {
  if (err) console.log(`erro: ${err}`);
  else console.log(`listening on port ${port}`);
});
