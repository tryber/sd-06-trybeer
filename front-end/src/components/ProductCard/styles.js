import { makeStyles } from '@material-ui/core/styles';

const EIGHT = 8;
const TEN = 10;

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(TEN),
    paddingBottom: theme.spacing(EIGHT),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  cardMedia: {
    paddingTop: '89%', // 16:9 // 50.25
  },
  cardContent: {
    flexGrow: 1,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
}));

export default useStyles;
