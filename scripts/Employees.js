// generate html to display employees

export const Employees = async () => {
	const response = await fetch(
		" http://localhost:8088/employees?_expand=computer&_expand=department&_expand=location"
	)
	const employees = await response.json()

	const response2 = await fetch(
		" http://localhost:8088/employeeCustomers?_expand=customer"
	)
	const customerRelationships = await response2.json()

	// get the array of customers names

	let html = `
    <section class='employees'>
        <h1>Employees</h1>
    `

	const employeeHTML = employees
		.map(employee => {
			const relationships = customerRelationships.filter(
				relationship => relationship.employeeId === employee.id
			)
			const assignedCustomers = relationships
				.map(rel => {
					return `<li>${rel.customer.name}</li>`
				})
				.join("")
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
                    <section class='employee-location'>
                        <p>Works at the ${employee.location.location} office</p>
                    </section>
                    <section class='employee-customer'>
                        <p>Has worked for the following customers.</p>
                        <ul>
                            ${assignedCustomers}
                        </ul>
                    </section>
                </div>
                `
		})
		.join("")
	debugger
	return (html += `
        ${employeeHTML}
    </section>
    `)
}
