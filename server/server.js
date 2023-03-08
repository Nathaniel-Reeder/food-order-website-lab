const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const { getOrders, createOrder, deleteOrder } = require("./ctrl")

app.get("/api/orders", getOrders);
app.post("/api/orders", createOrder);
app.delete("/api/orders/:id", deleteOrder);


app.listen(4004, () => console.log("Server listening on port 4004"))