import _ from 'lodash';
import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

export default class TablaClientes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      column: null,
      data: props.data,
      direction: null
    };
  }

  componentWillReceiveProps(props) {
    this.setState({ ...this.state, data: props.data });
  }

  shouldComponentUpdate = (nextProps, nextUpdate) => {
    console.log(nextProps);
    return this.state.data !== nextProps.data;
  };

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending'
      });

      return;
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending'
    });
  };

  render() {
    const { column, data, direction } = this.state;
    return (
      <Table sortable celled striped fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === 'name' ? direction : null}
              onClick={this.handleSort('name')}
            >
              Nombre
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'age' ? direction : null}
              onClick={this.handleSort('age')}
            >
              RFC
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {_.map(data, ({ rfc, id, nombre }) => (
            <Table.Row key={id}>
              <Table.Cell>{nombre}</Table.Cell>
              <Table.Cell>{rfc}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}
