import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  mainContainer: {
    display: 'flex',
    backgroundColor: '#fbb80f',
    paddingBottom: '100px',
    height: '100vh',
    justifyContent: 'center',
  },
  cardGrid: {
    display: 'flex',
    flexDirection: 'column',
  },
  card: {
    display: 'flex',
    // Os 3 primeiros ajeitam o card com header/entre si
    padding: '0px 10px 0px 10px',
    margin: '20px 10px auto 10px',
    transform: 'translateY(70px)',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
    '&:hover': {
      backgroundColor: '#32325b',
      color: 'white',
    },
  },
  titleContainer: {
    fontSize: '35px',
    fontWeight: '600',
    // justifyContent: 'flex-start',
  },
  dateContainer: {
    fontSize: '35px',
    fontWeight: '600',
    // justifyContent: 'center',
  },
  priceContainer: {
    fontSize: '35px',
    fontWeight: '600',
  },
}));

export default useStyles;
