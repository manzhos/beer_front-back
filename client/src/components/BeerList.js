import React from 'react'

export const BeerList = ({beers}) => {
	if (!beers.length) {
		return <p className="text-center">Beerbase is empty</p>
	}

	return (
		<table className="table">
			<thead>
				<tr className="thead-dark">
					<th>Name</th>
					<th>Tagline</th>
					<th>Photo</th>
					<th>ABV</th>
				</tr>
			</thead>
			<tbody>
				{beers.map((item) => (
						<tr key={item.id}>
							<td>{item.name}</td>
							<td>{item.tagline}</td>
							<td className="text-center">
								<img
									src={item.image_url}
									width="auto"
									height="100"
									alt=""
									className="cur-p"
								/>
							</td>
							<td className="text-center">{item.abv}</td>
						</tr>
					))}
			</tbody>
		</table>        
	)
}