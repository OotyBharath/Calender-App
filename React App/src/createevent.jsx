import React from 'react';
import { Container, Row, Col, NavItem, NavLink, Nav } from 'reactstrap';
import Axios from 'axios';
import CalenMenu from './calmenu';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider'
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

//Material UI styles for Dialog Box
const styles = theme => ({
    root: {
      margin: 0,
      padding: theme.spacing(5),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });
  
  const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose} >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  
  const DialogContent = withStyles(theme => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);
  
  const DialogActions = withStyles(theme => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);
  

export default class Event extends React.Component{ 
    constructor(props){
        super(props);
        this.state={
            open: false,
            ev_id: '',
            chap_id: [],
            ev_desc: 'Seminar / Conference',
            ev_name: '',
            fr_dt: new Date(),
            startDate: '',
            to_dt: new Date(),
            endDate: '',
            goToMenu: false
        }
        this.logChange = this.logChange.bind(this);
        this.selChapId = this.selChapId.bind(this);
        this.setDesc = this.setDesc.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.dateChangedFr = this.dateChangedFr.bind(this);
        this.dateChangedTo = this.dateChangedTo.bind(this);
        this.clearFr = this.clearFr.bind(this);
        this.clearTo = this.clearTo.bind(this);
        this.handleSave = this.handleSave.bind(this)
    }

    //Setting state values for chapter ID using checkboxes.
    handleSave()
    {
        var chapidlist = [];
        var checkboxes = document.querySelectorAll('input[name=chapID]:checked')
        if(checkboxes.length == 7)
        {
            this.setState({chap_id: ['RR000'], open: false});            
        }
        else
        {
        for (var i = 0; i < checkboxes.length; i++) {
        chapidlist.push(checkboxes[i].value);
        }
        //this.setState({ chap_id: [...this.state.chap_id, chapidlist] }) Append using spread operator
        //var chapArr = JSON.parse("[" + chapidlist + "]");
        this.setState({ chap_id: chapidlist, open: false })
        //for(var i in this.state.chap_id)
        //alert(this.state.chap_id[i]);
    }
    }
    
    dateChangedFr(d){
        this.setState({fr_dt: d}); 

        //var start = this.state.fr_dt.toDateString()    
        let year = this.state.fr_dt.getFullYear()
        let month = this.state.fr_dt.getMonth()
        let date = this.state.fr_dt.getDate()
        let seconds = this.state.fr_dt.getSeconds()
        let minutes = this.state.fr_dt.getMinutes()
        let hours = this.state.fr_dt.getHours()
        var start = year + '/' + month + '/' + date + ' ' + hours + ':' + minutes+ ':' + seconds
        this.setState({startDate: start})
      }

      dateChangedTo(d){
        this.setState({to_dt: d})
        //var year = this.state.to_dt.toDateString()
        let year = this.state.to_dt.getFullYear()
        let month = this.state.to_dt.getMonth()
        let date = this.state.to_dt.getDate()
        let seconds = this.state.to_dt.getSeconds()
        let minutes = this.state.to_dt.getMinutes()
        let hours = this.state.to_dt.getHours()
        var end = year + '/' + month + '/' + date + ' ' + hours + ':' + minutes+ ':' + seconds
        this.setState({endDate: end})
    }
    
      clearFr(){
        this.setState({fr_dt: null});
      }

      clearTo(){
        this.setState({to_dt: null});
      }

    selChapId() {
        //alert(document.getElementById('ALL').checked);
        if(document.getElementById('ALL').checked == true)
        {
            for(var i=0; i < document.getElementsByName('chapID').length; i++)
            {  
                document.getElementsByName('chapID')[i].checked = true;
            }
        }
        else
        {
            for(var i=0; i < document.getElementsByName('chapID').length; i++)
            {   
                document.getElementsByName('chapID')[i].checked = false;
            }
        }
    }

    logChange(e) {
        this.setState({
            [e.target.name]: e.target.value //setting value edited by the admin in state.
        });
    }

    setDesc(){
        var descval = document.querySelector('#evDesc').value;
        this.setState({ev_desc: descval});
    }

    handleCreate(e)
    {
        e.preventDefault();
        const evdet = {
            ev_id: this.state.ev_id,
            chap_id: this.state.chap_id,
            ev_desc: this.state.ev_desc,
            ev_name: this.state.ev_name,
            ev_date_from: this.state.startDate,
            ev_date_to: this.state.endDate,
            ev_status:  this.state.ev_status 
              }
              console.log(evdet);
              Axios.post('/createevent', {edetail: JSON.stringify(evdet)})
              .then(res => {
                  console.log(res.data);
                  if(res.data == 'OK')
                  {
                      alert('Event Created with entered details!');
                      this.setState({goToMenu: true});
                  }
              }).catch(error => {
                  if(error){
                      console.log(error); 
                      alert('Error in creating event. ' + error)}});
    }

    handleClickOpen = () => {
        this.setState({
          open: true,
        });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };

    render(){
        if(this.state.goToMenu == true)
        {
            return(
                <div>
                    <CalenMenu />
                </div>
            );
        }

        return(
    <form id='createEvent'>
        <h1>Create Event:</h1>
        <Container>
            <Row style={{'padding-top': '40px', 'align': 'center'}}>
                <Col xs='3'>Event Id:</Col>
                <Col xs='6'><label>
                        <input type="number" name='ev_id' value={this.state.ev_id} onChange={this.logChange}/></label></Col>
                <Col xs='3'></Col>
            </Row>
            <Row style={{'padding-top': '30px', 'align': 'center'}}>
                <Col xs='3'>Chapter Id:</Col>
                <Col xs='6'>
                    <Button variant="outlined" color="secondary" onClick={this.handleClickOpen}>
                    SELECT CHAPTERS
                    </Button>
                    <Dialog
                    onClose={this.handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={this.state.open}
                    >
                    <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                        Select Required Chapters
                    </DialogTitle>
                    <DialogContent dividers>
                        <Typography gutterBottom>
                            <label style={{'padding-left': '5px', 'align': 'center'}}><input type="checkbox" name='selAllChap' value='ALL' id='ALL' onClick={this.selChapId} />Select All</label>
                      </Typography>
                      <Divider />
                      <Typography gutterBottom>
                      <label style={{'padding-left': '5px', 'align': 'center'}}><input type="checkbox" name='chapID' value='SR001' id='sr001' />SR001</label>
                      </Typography>
                      <Typography gutterBottom>    
                        <label style={{'padding-left': '5px', 'align': 'center'}}><input type="checkbox" name='chapID' value='SR002' id='sr002' />SR002</label>
                      </Typography>
                      <Typography gutterBottom>
                      <label style={{'padding-left': '5px', 'align': 'center'}}><input type="checkbox" name='chapID' value='NR001' id='nr001' />NR001</label>
                      </Typography>
                      <Typography gutterBottom>
                      <label style={{'padding-left': '5px', 'align': 'center'}}><input type="checkbox" name='chapID' value='NR002' id='nr002' />NR002</label>
                      </Typography>
                      <Typography gutterBottom>
                      <label style={{'padding-left': '5px', 'align': 'center'}}><input type="checkbox" name='chapID' value='WR001' id='wr001' />WR001</label>
                      </Typography>
                      <Typography gutterBottom>
                      <label style={{'padding-left': '5px', 'align': 'center'}}><input type="checkbox" name='chapID' value='WR002' id='wr002' />WR002</label>
                      </Typography>
                      <Typography gutterBottom>
                    <label style={{'padding-left': '5px', 'align': 'center'}}><input type="checkbox" name='chapID' value='ER003' id='er003' />ER003</label>
                      </Typography>
                    </DialogContent>
                    <DialogActions>                        
                        <Button onClick={this.handleSave} color="primary">
                        Save changes
                        </Button>
                    </DialogActions>
                    </Dialog>
                    </Col>
                <Col xs='3'></Col>
            </Row>
            <Row style={{'padding-top': '30px', 'align': 'center'}}>
                <Col xs='3'>Event Type:</Col>
                <Col xs='6'>
                    <select id="evDesc" onChange={this.setDesc}>
                        <option value="Seminar / Conference">Seminar / Conference</option>
                        <option value="Team Building Event">Team Building Event</option>
                        <option value="Executive retreat and incentive programs">Executive retreat and incentive programs</option>
                        <option value="Product Launch">Product launch</option>
                        <option value="Board Meeting">Board meeting</option>
                        <option value="Appreciation Event">Appreciation event</option>
                    </select>
                </Col>
            </Row>
            <Row style={{'padding-top': '30px', 'align': 'center'}}>
                <Col xs='3'>Event name:</Col>
                <Col xs='6'><label>
                        <input type="text" name='ev_name' value={this.state.ev_name} onChange={this.logChange}/>
                        </label></Col>
                <Col xs='3'></Col>
            </Row>
            <Row style={{'padding-top': '30px', 'align': 'center'}}>
                <Col xs='3'>From date:</Col>
                <Col xs='6'>
                    <div>
                        <DatePicker 
                        selected={this.state.fr_dt} selectsStart
                        startDate={this.state.startDate} endDate={this.state.to_dt}
                        onChange={this.dateChangedFr} showYearDropdown dateFormatCalendar="MMMM"
                        scrollableYearDropdown yearDropdownItemNumber={15} />
                    <input type="button" onClick={this.clearFr} value="Clear"/>
                    </div>
                </Col>
                <Col xs='3'></Col>
            </Row>
            <Row style={{'padding-top': '30px', 'align': 'center'}}>
                <Col xs='3'>To date:</Col>
                <Col xs='6'>
                <div>
                    <DatePicker
                     selected={this.state.to_dt} selectsEnd
                    startDate={this.state.fr_dt}
                    endDate={this.state.to_dt}
                    onChange={this.dateChangedTo}
                    minDate={this.state.fr_dt} />
                <input type="button" onClick={this.clearTo} value="Clear"/>
                </div>
                </Col>
                <Col xs='3'></Col>
            </Row>
            <Row style={{'padding-top': '30px', 'align': 'center'}}>
                <Col xs='3'>Event Status:</Col>
                <Col xs='6'><label>
                        <input type="text" name='ev_status' value={this.state.ev_status} onChange={this.logChange}/></label></Col>
                <Col xs='3'></Col>
            </Row>
            <Row style={{'padding-top': '30px', 'align': 'center'}}>
                <Col>
                <input type='submit' value='create event' onClick={this.handleCreate} />
                </Col>
            </Row>
        </Container>
    </form>
        );
}
}