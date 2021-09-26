import React, {useContext, useEffect, useState} from 'react';
import {TitleContext} from '../../layout/Dashboard/Dashboard';
import styled from 'styled-components';
import {makeStyles} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import {Box, Button, Collapse, Grid, Snackbar} from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {getAccessToken, getUserRole} from '../../utils/accessToken';
import {useFetch} from '../../hooks/useFetch';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import {Alert} from "@material-ui/lab";

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

const encode = data => {
    return Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');
};

function Row({order, fetchData}) {
    const classes = useRowStyles();
    const [notify, setNotify] = useState({open: false, error: false});

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotify(prev => {
            return {...prev, open: false}
        });
    };

    const url = process.env.NEXT_PUBLIC_URL + 'toggle-user';

    const handleClick = async (data) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Authorization': 'Bearer ' + getAccessToken(),
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cache-Control': 'no-cache',
                },
                body: encode({
                    userId: data.user_id,
                    active: !data.active
                }),
            });
            if (response.status === 200) {
                setNotify({open: true, error: false});
                fetchData();
            } else {
                let error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
        } catch (error) {
            console.error(
                'You have an error in your code or there are Network issues.',
                error,
            );
            setNotify({open: true, error: true});
        }
    };

    return (
        <>
            <TableRow className={classes.root}>
                <TableCell component="th" scope="row">{order.user_id}</TableCell>
                <TableCell>
                    {order.username}
                </TableCell>
                <TableCell>{order.email}</TableCell>
                <TableCell>{order.active ? 'Aktywyny' : 'Zablokowany'}</TableCell>
                <TableCell>{order.permission}</TableCell>
                <TableCell>
                    <Button onClick={() => handleClick(order)} variant="contained" color={order.active ? 'secondary' : 'primary'}>
                        {order.active ? 'Zablokuj' : 'Odblokuj'}
                    </Button>
                </TableCell>
            </TableRow>
            <Snackbar open={notify.open} autoHideDuration={6000} onClose={handleClose}>
                {notify.error ?
                    <Alert onClose={handleClose} severity="error">
                        Wystąpił błąd, spróbuj ponownie później
                    </Alert>
                    :
                    <Alert onClose={handleClose} severity="success">
                        Operacja zkończona skucesem
                    </Alert>
                }

            </Snackbar>
        </>
    );
}

const Users = () => {
    const {setTitle} = useContext(TitleContext);
    useEffect(() => {
        setTitle('Użytkownicy');
    }, []);

    const url = process.env.NEXT_PUBLIC_URL + ('users');
    const {data, states, compareState, fetchData} = useFetch(url, true, null, {method: 'GET'}, true);

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
                                <TableCell/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data && data.map((order) => (
                                <Row key={order.user_id} order={order} fetchData={fetchData}/>
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