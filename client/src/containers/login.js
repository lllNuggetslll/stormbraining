import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import LoginButton from './login_button';

import { muiTheme } from '../components/app.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Idea from 'material-ui/svg-icons/action/lightbulb-outline';
import Subject from 'material-ui/svg-icons/action/subject';
import Group from 'material-ui/svg-icons/social/group';
import './styles/main.scss';

const style = {
  first: {
    paddingTop: '45px',
    paddingBottom: '45px',
    width: '100%',
    textAlign: 'center',
    backgroundColor: muiTheme.palette.primary3Color,
    h1: {
      color: '#fff',
      marginTop: 0,
      fontSize: '48px',
    },
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: '25%',
    overflowY: 'auto',
    marginBottom: '24px',
    textAlign: 'center',
  },
  porthole: {
    borderRadius: '100%',
    width: '75%',
    maxWidth: '200px',
    margin: '15px auto',
    display: 'block',
  },
  logoList: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  logos: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    boxSizing: 'border-box',
    width: '18%',
    maxWidth: '150px',
    margin: '2px 10px',
  },
  instructions: {
    width: '100%',
    maxWidth: '640px',
  },
};

class Login extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
  }

  constructor(props) {
    super(props);

    this.state = {
      finished: false,
      stepIndex: null,
    };
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.renderStepActions = this.renderStepActions.bind(this);
  }

 handleNext = () => {
   const { stepIndex } = this.state;
   this.setState({
     stepIndex: stepIndex + 1,
     finished: stepIndex >= 2,
   });
 };

 handlePrev = () => {
   const { stepIndex } = this.state;
   if (stepIndex > 0) {
     this.setState({ stepIndex: stepIndex - 1 });
   }
 };

 renderStepActions(step) {
   const { stepIndex } = this.state;

   return (
     <div style={{ margin: '12px 0' }}>
       <RaisedButton
         label={stepIndex === 2 ? 'Finish' : 'Next'}
         disableTouchRipple
         disableFocusRipple
         primary
         onTouchTap={this.handleNext}
         style={{ marginRight: 12 }}
       />
       {step > 0 && (
         <FlatButton
           label="Back"
           disabled={stepIndex === 0}
           disableTouchRipple
           disableFocusRipple
           onTouchTap={this.handlePrev}
         />
       )}
     </div>
   );
 }

  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props;
    const { finished, stepIndex } = this.state;

    return (
      <MuiThemeProvider muiTheme={ muiTheme }>
        <div>
          <Paper style={style.first} zDepth={2}>
            <h1 style={style.first.h1}>Stormbraining</h1>
            <img src="brainstorm.gif" style={{ width: '100px' }} alt="Stormbraining"/>
            <h1>Make it brain.</h1>
            <LoginButton
              isAuthenticated={isAuthenticated}
              errorMessage={errorMessage}
              dispatch={dispatch}
            />
          </Paper>
          <Paper zDepth={0} style={{ margin: '36px auto' }}>
            <h2 style={{ textAlign: 'center' }}>Getting started is easy</h2>
            <Stepper
              activeStep={stepIndex}
              orientation="vertical"
              linear={ false }
              style={{ width: '80%', margin: '0px auto' }}
            >
             <Step>
               <StepButton
                 icon={<Subject color={muiTheme.palette.accent1Color} />}
                 onClick={() => this.setState({ stepIndex: 0 })}
               >
                 Create a board
               </StepButton>
               <StepContent>
                 <p>
                   <img src="create-a-board.gif" style={style.instructions} alt=""/> <br />
                   Log in to create a new board.
                 </p>
                 {this.renderStepActions(0)}
               </StepContent>
             </Step>
             <Step>
               <StepButton
                 icon={<Group color={muiTheme.palette.accent1Color} />}
                 onClick={() => this.setState({ stepIndex: 1 })}
               >
                 Invite your team
               </StepButton>
               <StepContent>
                 <p>
                   <img src="invite-your-team.gif" style={style.instructions} alt=""/> <br />
                   Send your team a link to your new board.
                 </p>
                 {this.renderStepActions(1)}
               </StepContent>
             </Step>
             <Step>
               <StepButton
                 icon={<Idea color={muiTheme.palette.accent1Color} />}
                 onClick={() => this.setState({ stepIndex: 2 })}
               >
                 Collaborate in real time
               </StepButton>
               <StepContent>
                 <p>
                   <img src="collaborate.gif" style={style.instructions} alt=""/> <br />
                   Get ideas with your team in real time.  Upvote, sort, comment, and chat to get bring the best ideas to the top.
                 </p>
                 {this.renderStepActions(2)}
               </StepContent>
             </Step>
           </Stepper>
           {finished && (
             <p style={{ margin: '20px 0', textAlign: 'center' }}>
               <a
                 href="#"
                 onClick={(event) => {
                   event.preventDefault();
                   this.setState({ stepIndex: 0, finished: false });
                 }}
               >
                 Get started today!
                 <br />
                 <LoginButton
                   isAuthenticated={isAuthenticated}
                   errorMessage={errorMessage}
                   dispatch={dispatch}
                 />
               </a>
             </p>
           )}
         </Paper>
         <Paper style={style.first}>
          <h2> The team </h2>
          <div style={style.root}>
            <div style={style.gridList}>
              <img src="./src/containers/styles/kevin.jpg" style={style.porthole} alt=""/>
              Kevin Chen <br />
              Product owner <br />
              Full-stack software engineer <br />
            </div>
            <div style={style.gridList}>
              <img src="./src/containers/styles/frances.jpg" style={style.porthole} alt=""/>
              Frances Swiecki-Bernhardt <br />
              Scrum master <br />
              Full-stack software engineer <br />
            </div>
            <div style={style.gridList}>
              <img src="./src/containers/styles/david.jpg" style={style.porthole} alt=""/>
              David Nguyen <br />
              Full-stack software engineer <br />
            </div>
            <div style={style.gridList}>
              <img src="./src/containers/styles/sara.jpg" style={style.porthole} alt=""/>
              Sara Gee <br />
              Full-stack software engineer <br />
            </div>
          </div>
            <h2>The tech</h2>
          <div style={style.logoList}>
            <a style={style.logos} href="https://facebook.github.io/react/"><img src="./images/react-logo.svg"/></a>
            <a style={style.logos} href="http://redux.js.org/"><img src="./images/redux.png"/></a>
            <a style={style.logos} href="https://www.rethinkdb.com/"><img src="./images/rethinkdb.png"/></a>
            <a style={style.logos} href="http://socket.io/"><img src="./images/socketio.gif"/></a>
            <a style={style.logos} href="https://nodejs.org/"><img src="./images/nodejs.png"/></a>
            <a style={style.logos} href="http://expressjs.com/"><img src="./images/express.png"/></a>
            <a style={style.logos} href="https://babeljs.io/"><img src="./images/babel.png"/></a>
            <a style={style.logos} href="https://webpack.github.io/"><img src="./images/webpack.png"/></a>
          </div>
         </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps({ auth }) {
  const { isAuthenticated, errorMessage } = auth;
  return {
    isAuthenticated,
    errorMessage,
  };
}

export default connect(mapStateToProps)(Login);
