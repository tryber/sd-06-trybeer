import { makeStyles } from '@material-ui/core/styles';

const TWO = 2;
const EIGHT = 8;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 20,
  },
  cardGrid: {
    paddingTop: theme.spacing(EIGHT),
    paddingBottom: theme.spacing(EIGHT),
    margin: 15,
  },
  card: {
    height: '100%',
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(TWO),
  },
  cardContent: {
    flexGrow: 1,
  },
  orderContainer: {
    display: 'flex',
    paddingTop: theme.spacing(TWO),
    paddingBottom: theme.spacing(TWO),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: theme.spacing(2),
  },
  orderDetails: {
    display: 'flex',
    justifyContent: 'flex-start',
    paddingBottom: theme.spacing(TWO),
    direction: 'row',
  },
}));

export default useStyles;
