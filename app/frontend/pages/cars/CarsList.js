import { any } from "prop-types";
import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
    textField: {
        margin: "10px",
        width: "200px"
    },
    rightArea: {
        float: "right",
        width: "300px",
    },
    button: {
        width: "100%",
        margin: "10px",
    },
    listForm: {
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        boxShadow: "none",
    },
    listItem: {
        border: "black 1px solid",
        width: "15%",
        minHeight: "220px",
        float: "left",
        marginRight: "10px",
        marginLeft: "10px",
        marginBottom: "10px",
        "&:last-child": {
            paddingBottom: 16,
         },
    },
    listContents: {
        width: "100%",
        float: "left",
        height: "100%",
        minHeight: "24px",
    },
    listContentsSub: {
        width: "30%",
        fontSize: "14px",
        minHeight: "24px",
    },
    listButton: {
        width: "10%",
    }
});

const CarsList = (props) => {
    const carsList = props.cars;
    const classes = useStyles();
    return (
        <Card className={classes.listForm}>
            <div>
            {
            carsList.map((car) => (
            <CardContent className={classes.listItem}>
                <label className={classes.listContents}>{car.carId}</label><br/>
                <label className={classes.listContents}>{car.maker}</label><br/>
                <label className={classes.listContents}>{car.model}</label><br/>
                <label className={classes.listContents}>{car.grade}</label><br/>
                <label className={classes.listContents}>{car.bodyColor}</label><br/>
                <label className={classes.listContents}>{car.price}</label><br/>
                <label className={classes.listContentsSub}>{car.navi === "0" ? " " : "ナビ有 "}</label>
                <label className={classes.listContentsSub}>{car.kawa === "0" ? " " : "革シート "}</label>
                <label className={classes.listContentsSub}>{car.sr === "0" ? " " : "サンルーフ付"}</label>
            </CardContent>
            ))
            }
        </div>
        </Card>
    );
}
// 何故かTSが邪魔しているので
CarsList.propTypes = {
  cars: any
}


export default React.memo(CarsList);
