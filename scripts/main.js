import { Employees } from "./Employees.js"

const container = document.getElementById("container")
const render = async () => {
	const employeeHTML = await Employees()

	container.innerHTML = `
    ${employeeHTML}
    `
}

render()
