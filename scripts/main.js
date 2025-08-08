import { Employees } from "./Employees.js"
import { Customers } from "./CustomerList.js"

const container = document.getElementById("container")
const render = async () => {
	const employeeHTML = await Employees()
	const customerHTML = await Customers()

	container.innerHTML = `
    ${employeeHTML}
    ${customerHTML}
    `
}

render()
