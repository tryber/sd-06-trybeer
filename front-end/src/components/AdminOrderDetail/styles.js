import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  mainContainer: {
    display: 'flex',
    backgroundColor: '#fbb80f',
    height: '100vh',
    justifyContent: 'center',
  },
  cardGrid: {
    display: 'flex',
    flexDirection: 'column',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    width: '80vw',
    // Os 3 primeiros ajeitam o card com header/entre si
    padding: '0px 10px 0px 10px',
    margin: '20px 10px 100px 10px',
    transform: 'translateY(70px)',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
  },
  orderNumberContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderFont: {
    margin: '10px 5px 5px 5px',
    fontSize: '40px',
    fontWeight: '600',
  },
  productsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productFont: {
    margin: '5px 5px 5px 5px',
    fontSize: '30px',
    fontWeight: '600',
  },
  totalValue: {
    textAlign: 'right',
    margin: '5px 5px 5px 5px',
    fontSize: '35px',
    fontWeight: '600',
  },
  buttonContainer: {
    backgroundColor: '#32325b',
    color: 'white',
    fontWeight: '600',
    fontSize: '30px',
    // '&:hover': {
    //   backgroundColor: '#32325b',
    //   textDecoration: 'none',
    // },
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
  },
}));

export default useStyles;
