const form = document.getElementById("food-form")
const ordersContainer = document.querySelector('#orders-container')

const baseURL = `http://localhost:4004/api/orders`

const ordersCallback = ({ data: orders}) => {displayOrders(orders)}
const errCallback = err => console.log(err.response.data)

const getAllOrders = () => axios.get(baseURL).the(ordersCallback).catch(errCallback)
const createOrder = body => axios.post(baseURL, body).then(ordersCallback).catch(errCallback)
const deleteOrder = id => axios.delete(`${baseURL}/${id}`).then(ordersCallback).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    let name = document.querySelector("#person-name")
    let meal = document.querySelector("#meal-name")
    let side = document.querySelector("#side-name")
    let drink = document.querySelector('input[name="drinks"]:checked')
    let stayOrGo = document.querySelector('input[name="stay-or-go"]:checked')
    let pickUp = document.querySelector('input[name="pickup-time"]:checked')

    let bodyObj = {
        name: name.value,
        meal: meal.value,
        side: side.value,
        drink: drink.value,
        stayOrGo: stayOrGo.value,
        pickUp: pickUp.value
    }

    createOrder(bodyObj)

    name.value = ''
    meal.value = ''
    side.value = ''
    drink.value = ''
    stayOrGo.checked = false
    pickUp.value = ''

}

function createOrderCard(order) {
    const orderCard = document.createElement('div')
    orderCard.classList.add('order-card')

    orderCard.innerHTML = `
    <p class="order-number">Order Number: ${order.id}</p>
    <p class="name">Customer: ${order.name}</p>
    <p class="meal">Meal: ${order.meal}</p>
    <p class="side">Side: ${order.side}</p>
    <p class="drink">Drink: ${order.drink}</p>
    <p class="stay-or-go">Stay or Go: ${order.stayOrGo}</p>
    <p class="pick-up">Pick Up Time: ${order.pickUp}</p>
    <button onclick="deleteOrder(${order.id})">delete</button>
    `
    ordersContainer.appendChild(orderCard)
}

function displayOrders(arr) {
    ordersContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createOrderCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllOrders()