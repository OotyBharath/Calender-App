
import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
//import momentPlugin from '@fullcalender/moment'
import { Container, Row, Col } from 'reactstrap'
import Axios from 'axios'
import 'C:/NodeJS/my-app/node_modules/@fullcalendar/core/main.css';
import 'C:/NodeJS/my-app/node_modules/@fullcalendar/daygrid/main.css';

import './calstyle.css';
const history = window.history;
export default class CalView extends React.Component {

  calendarComponentRef = React.Component()
  state = {
    eventData: [],
    calendarWeekends: true,
    startDate: new Date(),
    endDate: new Date(),
    calendarEvents: [ // initial event data
      { title: '', start: new Date(), end: new Date(), color: 'blue', type: '' }
    ]
  }


  componentWillMount()
  {
    Axios.post('/calender', { chname: JSON.stringify(this.props.cname) } )
    .then(res => 
      {
        var evData = []
        var i = 0;
        console.log(res.data)
        Object.keys(res.data)
        .forEach(function(key) 
        { 
          var row = res.data[key];
          
          var evStartDate = new Date(Date.parse(row.ev_date_from))
          var evToDate = new Date(Date.parse(row.ev_date_to))
          //evStartDate.getFullYear() + '-'  + evStartDate.getMonth() + '-'  + evStartDate.getDate()  ---Date Formatting
          //evToDate.getFullYear() + '-'  + evToDate.getMonth() + '-'  + evToDate.getDate()  --Date Formatting
          var resData = 
          {
            ev_id: row.ev_id,
            ev_name: row.ev_name,
            ev_date_from: row.ev_date_from,
            ev_date_to: row.ev_date_to            
          }
          console.log('Row' + i + ': ' + JSON.stringify(resData.ev_date_from))
          evData[i++] = resData
        })
        this.setState({ eventData: evData })
        //console.log('State data: ' + JSON.stringify( this.state.eventData[0].ev_date_to))
        for( var i in this.state.eventData)
        {
          this.setState({  // add new event data
            calendarEvents: this.state.calendarEvents.concat({ // creates a new array
              title: this.state.eventData[i].ev_name,
              start: this.state.eventData[i].ev_date_from,
              end: this.state.eventData[i].ev_date_to,
              description: this.state.eventData[i].ev_desc
              //allDay: arg.AllDay
            })
          }) 
        }
    })
    .catch(error => {
      alert(error)})       
  }

  render() {
    return (
      <div className='demo-app'>
        <div className='demo-app-top'>
          <button onClick={ this.toggleWeekends }>toggle weekends</button>&nbsp;
          <button onClick={ this.gotoPast }>go to a date in the past</button>&nbsp;
          (also, click a date/time to add an event)
        </div>
        <div className='demo-app-calendar'>
          <FullCalendar
            defaultView="dayGridMonth"
            header={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            }}
            plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin/*, momentPlugin*/ ]}
            ref={ this.calendarComponentRef }
            weekends={ this.state.calendarWeekends }
            events={ this.state.calendarEvents }
            //dateClick={ this.handleDateClick }
            select={ this.handleSelect }
            selectable="true"
            editable="true"
            />
        </div>
        <Container>
        <Row>
          <Col>
          <button type='button' onClick={() => {console.log('None')}}>QUIT</button>
          </Col>
        </Row>
      </Container>
      </div>
    )
  }

  toggleWeekends = () => {
    this.setState({ // update a property
      calendarWeekends: !this.state.calendarWeekends
    })
  }

  gotoPast = () => {
    let calendarApi = this.calendarComponentRef.current.getApi()
    calendarApi.gotoDate('2000-01-01') // call a method on the Calendar object
  }

  handleDateClick = (arg) => {
    if (window.confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
      this.setState({  // add new event data
        calendarEvents: this.state.calendarEvents.concat({ // creates a new array
          title: 'New Event',
          start: arg.date,
          allDay: arg.allDay
        })
      })
    }
  }

  handleSelect = (arg) => {
    if(arg.startStr == arg.endStr)
      this.handleDateClick();
    else if(window.confirm('Would you like to add an event from ' + arg.startStr + ' to ' + arg.endStr + ' ?' ))
    {
      this.setState({  // add new event data
        calendarEvents: this.state.calendarEvents.concat({ // creates a new array
          title: 'New Event',
          start: arg.start,
          end: arg.end,
          allDay: arg.AllDay
        })
      }) 
    }
    
  }



}