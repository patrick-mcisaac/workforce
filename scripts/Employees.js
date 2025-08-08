// generate html to display employees
export const Employees = async () => {
	const response = await fetch(
		" http://localhost:8088/employees?_expand=computer"
	)
	const employees = await response.json()
	let html = `
    <section class='employees'>
        <h2>Employees</h2>
    `

	const employeeHTML = employees
		.map(employee => {
			return `
        <section class='employee-info'>
            <p class='name'>${employee.firstName} ${employee.lastName}</p>
            <p class='age'>${employee.age}</p>
            <p class='employee-computer'>${employee.computer.model} ${employee.computer.year}</p>
        </section>
        `
		})
		.join("")
	return (html += `
        ${employeeHTML}
    </section>
    `)
}
