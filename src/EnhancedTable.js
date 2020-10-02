import React from 'react';
import PropTypes from 'prop-types';
import {  
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TablePagination, 
  TableRow, 
  TableSortLabel, 
  Toolbar, 
  Typography, 
  Paper, 
  IconButton, 
  Tooltip } from '@material-ui/core';
import { FilterList as FilterListIcon, Refresh as RefreshIcon } from '@material-ui/icons';
import Axios from 'axios';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  console.log(array);
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'userId', label: 'User ID' },
  { id: 'query', label: 'Query' },
  { id: 'queryTime', label: 'Query Time' },
  { id: 'platform', label: 'Platform'},
  { id: 'answer', label: 'Answer' },
  { id: 'responseTime', label: 'Answer Time' }
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='center'
            padding= 'default'
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired
};

class EnhancedTable extends React.Component {
  classes = {
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: '20px',
    },
    table: {
      minWidth: '750px',
    },
    visuallyHidden: {
      border: '0px',
      clip: 'rect(0 0 0 0)',
      height: '1px',
      margin: '-1px',
      overflow: 'hidden',
      padding: '0px',
      position: 'absolute',
      top: '20px',
      width: '1px',
      visibility: 'hidden'
    },
  }
 constructor(props){
  super(props)
  
  this.state = {
    order: 'asc',
    orderBy: 'userId',
    page: 0,
    rowsPerPage: 15,
    rows: []
  }
 }

 setOrder = (_order) => {this.setState({order: _order})}
 setOrderBy = (_orderBy) => {this.setState({orderBy: _orderBy})}
 setPage = (_page) => {this.setState({page: _page})}
 setRowsPerPage =( _rowPerPage) => {this.setState({rowsPerPage: _rowPerPage})}
 setData = (_Data) => {this.setState({rows: _Data})}

  handleRequestSort = (event, property) => {
    const isAsc = this.state.orderBy === property && this.state.order === 'asc';
    this.setOrder(isAsc ? 'desc' : 'asc');
    this.setOrderBy(property);
  };

  handleChangePage = (event, newPage) => {
    this.setPage(newPage);
  };

  handleChangeRowsPerPage = (event) => {
    this.setRowsPerPage(parseInt(event.target.value, 10));
    this.setPage(0);
  };

  componentDidMount = ()=> {
    this.loadData()
  }

  loadData = () => {
    Axios.get('https://damp-atoll-00850.herokuapp.com/userhistory/getAll', {}).then(response => {
      this.setData(response.data)
    }).catch(error => {
      console.log(error);
    })
  }

  render = () => {
    const classes = this.classes
    const {
      order,
      orderBy,
      page,
      rowsPerPage,
      rows
    } = this.state;
    
    const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.state.rows.length - this.state.page * this.state.rowsPerPage);
    return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
      <Toolbar>
        <Typography style={{flex: '1 1 100%'}} variant="h6" id="tableTitle" component="div">
          User Hits
        </Typography>
        <Tooltip title="Refresh Data">
          <IconButton aria-label="Refresh" onClick={this.loadData}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>

        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size= 'medium'
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.name}
                    >
                      <TableCell component="th" id={labelId} scope="row" align="center" padding="default">
                        {row.userId}
                      </TableCell>
                      <TableCell align="center">{row.userQuery}</TableCell>
                      <TableCell align="center">{row.platform}</TableCell>
                      <TableCell align="center">{row.queryAskTime}</TableCell>
                      <TableCell align="center">{row.answerBySystem}</TableCell>
                      <TableCell align="center">{row.answerTime}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[15, 25, 50]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  )}
}

export default EnhancedTable