import React, { useContext, useEffect, useState } from 'react';
import { TitleContext } from '../../layout/Dashboard/Dashboard';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import { Box, Collapse, Grid } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { getUserRole } from '../../utils/accessToken';
import { useFetch } from '../../hooks/useFetch';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';

// TODO: Redirect if not legged in
// TODO: Refactor, common component for users & orders?

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
                <TableCell component="th" scope="row">{order.user_id}</TableCell>
                <TableCell>
                    {order.username}
                </TableCell>
                <TableCell>{order.email}</TableCell>
                <TableCell>{order.active ? 'Aktywyny': 'Zablokowany'}</TableCell>
                <TableCell>{order.permission}</TableCell>
                {/*<TableCell><Button variant="contained" color="secondary">*/}
                {/*    {order.active ? 'Zablokuj': 'Odblokuj'}*/}
                {/*</Button></TableCell>*/}

            </TableRow>
        </>
    );
}

const Users = () => {
    const { setTitle } = useContext(TitleContext);
    useEffect(() => {
        setTitle('Użytkownicy');
    }, []);

    const url = process.env.NEXT_PUBLIC_URL + ('users');
    const { data, states, compareState, fetchData } = useFetch(url, true, null, { method: 'GET' }, true);

    return (
        <OrdersListWrapper>
            {data ?
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell><strong>Nazwa</strong></TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Rola</TableCell>
                                {/*<TableCell align="right">Więcej</TableCell>*/}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data && data.map((order) => (
                                <Row key={order.user_id} order={order}/>
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

export default Users;