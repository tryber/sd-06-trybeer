import { makeStyles } from '@material-ui/core/styles';

const EIGHT = 8;
const TEN = 10;

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  container: {
    paddingTop: theme.spacing(TEN),
    paddingBottom: theme.spacing(EIGHT),
  },
}));
export default useStyles;
