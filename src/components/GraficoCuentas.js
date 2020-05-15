/**
 * *Componente destinado a crear el componente de un grafico que muestre el % de
 * *ingresos destinados a cada cuenta por el usuario
 * 2020.05.09
 */
import React, { Component } from "react";
import { withStyles, Paper, Typography, Box } from "@material-ui/core";
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  Cell,
  ResponsiveContainer
} from "recharts";

const styles = theme => ({
  fondoGrafico: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    [theme.breakpoints.up("md")]: {
      height: "calc(100vh - 64px)"
    },
    height: "40vh",
    maxHeight: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  titular: {
    position: "absolute",
    display: "block",
    alignSelf: "auto",
    [theme.breakpoints.up("md")]: {
      fontWeight: "bold",
      fontSide: "large"
    }
  }
});
class GraficoCuentas extends Component {
  /**
   * Constructor de la clase
   * @param {*} props
   */
  constructor(props) {
    super(props);
  }
  /**
   * Función para renderizar el componente
   */
  render() {
    //Constante para poder usar los estilos de styles
    const { classes } = this.props;
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      percent,
      index
    }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor="middle"
          dominantBaseline="central"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };
    /**
     * Devolvemos la visualización por pantalla del componenete
     */
    return (
      <Paper
        elevation={0}
        variant="outlined"
        square
        className={classes.fondoGrafico}
      >
        <Typography variant="h6" className={classes.titular}>
          Distribución
          <br /> de Ingresos
        </Typography>

        <ResponsiveContainer width={"100%"} height={"90%"}>
          <PieChart>
            <Pie
              isAnimationActive={true}
              data={this.props.data}
              fill="#8884d8"
              label={renderCustomizedLabel}
              labelLine={false}
              innerRadius={"55%"}
              paddingAngle={2}
            >
              {this.props.data.map(cuenta => (
                <Cell fill={cuenta.color} />
              ))}
            </Pie>
            <Tooltip payload={[{ unit: "%" }]} />
          </PieChart>
        </ResponsiveContainer>
      </Paper>
    );
  }
}
/**
 * Exportamos la clase
 */
export default withStyles(styles)(GraficoCuentas);
