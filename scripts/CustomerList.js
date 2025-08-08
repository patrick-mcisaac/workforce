// export function to create customer html

//  fetch customers data

//  fetch employeeCustomer data and expand employee

//  Set up html

//  loop over every customer with map
//      create a new array of employeeCustomer relations with filter()
//          we filter if its customerId matches our customers id
//
//      then we loop over that new array of relationships with map saved to a variable
//          return our list items for that array
//      we join that map to a string

//      then we add the rest of our html with ` `
//      use the mapped list item array in ${} when we need it

export const Customers = async () => {
	const response = await fetch("http://localhost:8088/customers")
	const customers = await response.json()

	const response2 = await fetch(
		"http://localhost:8088/employeeCustomers?_expand=employee"
	)
	const relationships = await response2.json()
	let html = `
    <section class='customers'>
        <h1>Customers</h1>
    `

	const customerHTML = customers
		.map(customer => {
			const relationship = relationships.filter(
				rel => rel.customerId === customer.id
			)
			const assignedCustomers = relationship
				.map(assign => {
					return `<li>${assign.employee.firstName} ${assign.employee.lastName}</li>`
				})
				.join("")

			return `
            <div class='customer'>
                <header>
                    <h2>${customer.name}</h2>
                </header>
                <section>
                    <p>These employees have worked for us</p>
                    <ul>
                        ${assignedCustomers}
                    </ul>
                </section>
            </div>
            `
		})
		.join("")

	return (html += `
        ${customerHTML}
    </section>
    `)
}
