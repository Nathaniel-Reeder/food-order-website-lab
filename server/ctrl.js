const orders = require("./db.json")
let globalId = 3

module.exports = {
    getOrders: (req, res) => {
        res.status(200).send(orders)
    },
    createOrder: (req, res) => {
        const {name, meal, side, drink, stayOrGo, pickUp} = req.body
        if(!name || !meal || !side || !drink || !stayOrGo || !pickUp) {
            res.sendStatus(400)
        }
        const copy = {...req.body, id: globalId}
        orders.push(copy);
        globalId++
        res.status(200).send(orders)

    },
    deleteOrder: (req, res) => {
        const {id} = req.params;
        const idx = orders.findIndex(order => order.id === +id)
        if(idx > 0) {
            orders.splice(idx, 1)
            res.status(200).send(orders)
        } else {
            res.sendStatus(404)
        }
    }

}

