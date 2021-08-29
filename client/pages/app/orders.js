import React, { useContext, useEffect, useState } from 'react';
import { TitleContext } from '../../layout/Dashboard/Dashboard';
import { useFetch } from '../../hooks/useFetch';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Collapse, Grid } from '@material-ui/core';

//TODO: Refactor

const OrdersListWrapper = styled.div``;

const useRowStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const InnerCell = styled(TableCell)`
  padding: 0;
  border-bottom: none;
`;

const InnerGrid = styled(Grid)`
  flex-grow: 0;
  max-width: 31.333333%;
  flex-basis: 31.333333%;
  margin-right: 3%;

  &:last-child {
    margin-right: 0;
  }
`;

function Row ({ order }) {
    const [open, setOpen] = useState(false);
    const classes = useRowStyles();

    return (
        <>
            <TableRow className={classes.root}>
                <TableCell component="th" scope="row">{order.order_id}</TableCell>
                <TableCell>
                    {order.name}
                </TableCell>
                <TableCell>{order.total_price}</TableCell>
                <TableCell>{new Date(order.date).toLocaleDateString(
                    'pl-PL',
                    {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    },
                )}</TableCell>
                <TableCell>{order.order_status}</TableCell>
                <TableCell>{order.plots}</TableCell>
                <TableCell align="right">
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <InnerCell colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box borderBottom={1} padding={2}>
                            <Typography variant="h6" gutterBottom component="div">
                                Szczegóły
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid container item xs={12}>
                                    <InnerGrid item>
                                        <Paper className={classes.paper}>ID zamówienia: {order.order_id}</Paper>
                                    </InnerGrid>
                                    <InnerGrid item>
                                        <Paper className={classes.paper}>POOL KEY: {order.pool_key}</Paper>
                                    </InnerGrid>
                                    <InnerGrid item>
                                        <Paper className={classes.paper}>FARMER KEY: {order.farmer_key}</Paper>
                                    </InnerGrid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Collapse>
                </InnerCell>
            </TableRow>
        </>
    );
}

const Orders = () => {
    const { setTitle } = useContext(TitleContext);
    const { data, states, compareState, fetchData } = useFetch(process.env.NEXT_PUBLIC_URL + 'user/orders', true, null, { method: 'GET' }, true);

    useEffect(() => {
        setTitle('Zamówienia');
    }, []);

    return (
        <OrdersListWrapper>
            {data ?
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell><strong>Produkt</strong></TableCell>
                                <TableCell>Ploty</TableCell>
                                <TableCell>Data</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Kwota</TableCell>
                                <TableCell align="right">Więcej</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data && data.map((order) => (
                                <Row key={order.order_id} order={order}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                :
                <Typography variant="h4" align="center">
                    Brak zamówień
                </Typography>
            }
        </OrdersListWrapper>
    );
};

export default Orders;
