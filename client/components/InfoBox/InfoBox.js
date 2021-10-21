import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './InfoBox.styles';


export default function InfoBox({ title, amount, subtitle, positive = false }) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {title}
                </Typography>
                <Typography className={ positive ? classes.red : '' } variant="h5" component="h2">
                    {amount}
                </Typography>
                <Typography variant="body2" component="p">
                    {subtitle}
                </Typography>
            </CardContent>
        </Card>
    );
}