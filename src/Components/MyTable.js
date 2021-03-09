import React from "react";

class MyTable extends React.Component {
	render() {
		return (
			<table className='table table-bordered'>
				<thead>
				<tr>
					<th>id</th>
					<th>name</th>
					<th>type</th>
					<th>color</th>
				</tr>
				</thead>
				<tbody>
				{this.props.peoples.map((d, index) => {
					return (
						<tr className='p-4' key={ index }
							data-index={index}
							onClick={this.props.openEditor}
						>
							<td className='index'> { index } </td>
							<td> { d.name } </td>
							<td> { d.type } </td>
							<td> { d.value } </td>
						</tr>
					)})}
				</tbody>
			</table>
		)
	}
}

export default MyTable;
