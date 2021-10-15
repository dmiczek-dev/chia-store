import React, {useContext, useEffect, useState} from 'react';
import {TitleContext} from '../../layout/Dashboard/Dashboard';
import {useFetch} from '../../hooks/useFetch';
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
import {makeStyles} from '@material-ui/core/styles';
import {Box, Button, Collapse, Grid, MenuItem, TextField} from '@material-ui/core';
import {getUserRole} from '../../utils/accessToken';
import {Controller, useForm} from "react-hook-form";

//TODO: Refactor

const ProductsListWrapper = styled.div``;

export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;


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
  flex: auto;
  //max-width: 22%;
  //flex-basis: 22%;
  margin-right: 3%;

  &:last-child {
    margin-right: 0;
  }
`;

function Row({product}) {
    const [open, setOpen] = useState(false);
    const classes = useRowStyles();
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: {errors},
    } = useForm(
        {mode: 'onBlur'});
    const onSubmit = async (data) => {
        console.log(data);
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache',
                },
                body: JSON.stringify({username: data.username, password: data.password, email: data.email}),
            });
            if (response.status === 200) {
                const data = await response.json();
                console.dir(data);
                router.push('/login');
            } else {
                console.log('Register failed.');
                let error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
        } catch (error) {
            console.error(
                'You have an error in your code or there are Network issues.',
                error,
            );
            const {response} = error;
            alert('Error aa');
        }
    };


    return (
        <>
            <TableRow className={classes.root}>
                <TableCell component="th" scope="row">{product.product_id}</TableCell>
                <TableCell>
                    {product.name}
                </TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.active ? "TAK" : "NIE"}</TableCell>
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
                                Edytuj
                            </Typography>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Grid container spacing={3}>
                                    <Grid container item xs={12}>
                                        <InnerGrid item>
                                            <Controller
                                                name="username"
                                                control={control}
                                                defaultValue=""
                                                rules={{required: true}}
                                                render={({field}) =>
                                                    <TextField fullWidth error={!!errors.username} autoComplete="off"
                                                               helperText={!!errors.username ? 'Uzupełnij to pole' : ''}
                                                               label="Nazwa produktu" {...field} />}
                                            />
                                        </InnerGrid>
                                        <InnerGrid item>
                                            <Controller
                                                name="username"
                                                control={control}
                                                defaultValue=""
                                                rules={{required: true}}
                                                render={({field}) =>
                                                    <TextField type="number" fullWidth error={!!errors.username}
                                                               autoComplete="off"
                                                               helperText={!!errors.username ? 'Uzupełnij to pole' : ''}
                                                               label="Cena" {...field} />}
                                            />
                                        </InnerGrid>
                                        <InnerGrid item>
                                            <Controller
                                                name="username"
                                                control={control}
                                                defaultValue=""
                                                rules={{required: true}}
                                                render={({field}) =>
                                                    <TextField select fullWidth error={!!errors.username}
                                                               autoComplete="off"
                                                               helperText={!!errors.username ? 'Uzupełnij to pole' : ''}
                                                               label="Aktywny" {...field} >
                                                        <MenuItem key="aa" value="asdasda">
                                                            Tak
                                                        </MenuItem>
                                                        <MenuItem key="bbb" value="dasdas">
                                                            Nie
                                                        </MenuItem>
                                                    </TextField>}
                                            />
                                        </InnerGrid>
                                        <InnerGrid item>
                                            <Button type="submit"
                                                    variant="contained" color="primary"
                                                    size="large">Zapisz</Button>
                                        </InnerGrid>
                                    </Grid>
                                </Grid>
                            </Form>
                        </Box>
                    </Collapse>
                </InnerCell>
            </TableRow>
        </>
    );
}

const Products = () => {
    const {setTitle} = useContext(TitleContext);

    const url = process.env.NEXT_PUBLIC_URL + ('products');
    const {data, states, compareState, fetchData} = useFetch(url, true, null, {method: 'GET'}, true);

    useEffect(() => {
        setTitle('Zamówienia');
    }, []);

    return (
        <ProductsListWrapper>
            {data ?
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell><strong>Produkt</strong></TableCell>
                                <TableCell>Cena</TableCell>
                                <TableCell>Aktywny</TableCell>
                                <TableCell align="right">Zmień</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data && data.map((product) => (
                                <Row key={product.product_id} product={product}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                :
                <Typography variant="h4" align="center">
                    Brak zamówień
                </Typography>
            }
        </ProductsListWrapper>
    );
};

export default Products;
