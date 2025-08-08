// generate html to display employees
export const Employees = async () => {
	const response = await fetch(
		" http://localhost:8088/employees?_expand=computer&_expand=department"
	)
	const employees = await response.json()
	let html = `
    <section class='employees'>
        <h1>Employees</h1>
    `

	const employeeHTML = employees
		.map(employee => {
			return `
        <div class='employee'>
            <header class='employee-name'>
                <h2>${employee.firstName} ${employee.lastName}</h2>
            </header>
            <section class='employee-computer'>
                <p>${employee.computer.model} ${employee.computer.year}</p>
            </section>
            <section class='employee-department'>
                <p>Works in the ${employee.department.name}</p>
            </section>
        </div>
        `
		})
		.join("")
	return (html += `
        ${employeeHTML}
    </section>
    `)
}
