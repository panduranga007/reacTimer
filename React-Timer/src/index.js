import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      now: '00:00:00',
      then: '00:00:00',
      startVal: new Date(),
      pausetime:0,
      gapTime:0, 
      ison : false,
      inpause : false
    };
    //this.starter = this.starter.bind(this);
    //this.stopper = this.stopper.bind(this);
    this.handleTimerOff = this.handleTimerOff.bind(this);
    this.handleTimerOn = this.handleTimerOn.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleResume = this.handleResume.bind(this);
  }
 
getGap()
{
  //console.log(new Date().getTime() - this.state.pausetime);
   var gap = new Date().getTime() - this.state.pausetime;
   this.setState({gapTime: this.state.gapTime + gap});
   //this.setState({startVal:  new Date()});
}  

 handleResume()
 {
   this.setState({inpause : false});
   console.log(this.state.gapTime);
   this.getGap();
   //console.log(this.state.gapTime);
    clearInterval(this.timerID);
    //this.timerID = setInterval( () => this.tick ,1000);
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );

 }

 handlePause()
 {
   this.setState({inpause : true});
   this.setState({pausetime:  new Date().getTime()});

   clearInterval(this.timerID);
 }

 handleTimerOff()
 {
   this.setState({ison : false});
   this.setState({now : this.state.then});
   clearInterval(this.timerID);
 }

 handleTimerOn()
 {
   this.setState({ison : true});
   this.setState({startVal : new Date()})


   clearInterval(this.timerID);
    //this.timerID = setInterval( () => this.tick ,1000);
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
 }

 tick()
 {
    var disp = new Date().getTime()
                    -this.state.startVal.getTime();

    var pgap = this.state.gapTime;
    //console.log(pgap);

    var sec = Math.floor((disp-pgap)/1000)%60;
    var min = Math.floor(((disp-pgap)/1000)/60);
    var hr = Math.floor((((disp-pgap)/1000)/60)/60);
    
    
    
    if(sec<10)
    {
      sec = '0'+sec;
    }
    else
    {
      sec = sec.toString();
    }  

    if(min<10)
    {
      min = '0'+min;
    }
    else
    {
      min = min.toString();
    }

    if(hr<10)
    {
      hr = '0'+hr;
    }
    else
    {
      hr = hr.toString();
    }              

    this.setState({now: hr+':'+min+':'+sec});
    
 }

 
 

  render() {
    const ison = this.state.ison;
    const inpause = this.state.inpause;
    let button;
    if(ison && !inpause)
    {
      button = <div> <p>Timer is on and running</p> <button onClick={this.handleTimerOff}>Timer Off</button>&nbsp;
     <button onClick={this.handlePause}>Pause</button>
      </div>;
    }
    else if(ison && inpause)
    {
      button = <div> <p>Timer is on but on pause</p> <button onClick={this.handleTimerOff}>Timer Off</button>&nbsp;
     <button onClick={this.handleResume}>Resume</button>
      </div>;
    }
    else
    {
      button = <div> <p>Timer is off</p><button onClick={this.handleTimerOn}>Timer On</button></div>;
    }
    return (
      <div align='center'>
        <Hello name={this.state.now.toString()}/>
        {button}

      </div>
    );
  }
}


render(<App />, document.getElementById('root'));
