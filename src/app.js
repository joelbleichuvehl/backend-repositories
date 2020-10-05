const express = require("express")
const cors = require("cors")
const { v4: uuid } = require('uuid')

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repository)

  response.status(200).json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body

  const indexUpdate = repositories.findIndex(repository => repository.id === id)

  if (indexUpdate >= 0) {
    const repository = {
      id,
      title,
      url,
      techs,
      likes: repositories[indexUpdate].likes
    }

    repositories[indexUpdate] = repository

    return response.status(200).json(repository)
  } else {
    return response.status(400).json({ error: 'Repository not found' })
  }
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  const indexRemove = repositories.findIndex(repository => repository.id === id)

  if (indexRemove >= 0) {
    repositories.splice(indexRemove)
  } else {
    return response.status(400).json({ error: 'Repository not found' })
  }

  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params

  const index = repositories.findIndex(repository => repository.id === id)

  if (index >= 0) {

    repositories[index].likes += 1

    return response.status(200).json(repositories[index])
  } else {
    return response.status(400).json({ error: 'Repository not found' })
  }
});

module.exports = app;
