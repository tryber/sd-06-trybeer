import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  mainContainer: {
    backgroundColor: '#fbb80f',
    paddingBottom: '10px',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, 350px)',
    justifyContent: 'center',
  },
  card: {
    // Os 3 primeiros ajeitam o card com header/entre si
    margin: '20px 10px auto 10px',
    transform: 'translateY(70px)',
    height: '700px',
    // width: '400px',
    flexDirection: 'column',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
    // maxWidth: 250,
    // overflow: 'visible',
  },
  cardMedia: {
    margin: 'auto',
    width: '80%',
    height: '450px',
    // borderRadius: '4px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
  },
  titleContainer: {
    textAlign: 'center',
    fontSize: '25px',
    fontWeight: '600',
    marginTop: '20px',
  },
  priceContainer: {
    textAlign: 'center',
    fontSize: '35px',
    fontWeight: '800',
    marginTop: '25px',
  },
  quantityButton: {
    '&:focus': {
      outline: 'none',
    },
  },
  totalpriceButton: {
    width: '70%',
    backgroundColor: '#32325b',
    marginTop: '100px',
    height: '80px',
    fontWeight: 600,
    fontSize: '30px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
  },
}));

export default useStyles;
