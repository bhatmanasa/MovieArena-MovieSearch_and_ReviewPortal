import { makeStyles } from '@material-ui/core/styles';
import { AutoComplete } from 'antd';

export default makeStyles((theme) => ({
  // appBar: {
  //   borderRadius: 15,
  //   width: 300,
  //   height: 50,
  //   marginTop : 5,
  //   display: 'flex',
  //   flexDirection: 'row',
  //   backgroundColor: 'white',
  // },

  heading: {
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    color:'rgb(255, 203, 5)'
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
yellow: {
    color: '#ff9800',
},
  Avatar: {
    color: 'black',
    backgroundColor: 'rgb(255, 203, 5)',
    marginRight: '5px',
    marginBottom: '5px'
  },
  logout:{
    backgroundColor: 'black',
    color: 'rgb(255, 203, 5)',
    fontSize: '15px',
    marginLeft: '20px',
    marginBottom: '5px',
    textTransform: 'capitalize'
  },
  sign:{
    backgroundColor: 'black',
    color: '#ff9800',
    fontSize: '15px',
    marginLeft: '100px',
    marginBottom: '5px',
    textTransform: 'capitalize'
  }

}));