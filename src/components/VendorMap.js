import React from "react";
import { connect } from "react-redux";
import { Grid, Row, Col, Panel, Form, FormGroup, FormControl, Glyphicon, Image } from "react-bootstrap";

const layout = {
    "Desktop Protection" : {
        rect: {
            top: 12,
            left: 20,
            width: 100,
            height: 100
        },
        elements: [
            "Antimalware",
            "Desktop Firewall"
        ],
        elementLeft: 60,
        icon: "/sectionIcons/DesktopProtection.jpg"
    }
}
export class VendorMap extends React.Component {

    constructor(...args) {
        super(...args);
        this.state = {
            vendors: {}
        };
    }
 
    componentDidMount() {
        this.ctx = this.canvas.getContext("2d")
        // Object.values(this.props.vendors).map((vendor) => {
        //     this.state[vendor] = dataFromvendorImage?
        // }    
    }

    shouldComponentUpdate(nextProps, nextState){
        // console.log("current props",this.props)
        // console.log("next props",nextProps)

      //  this._draw()
        return false;
    }

    attachImg() {

    }

  render() {
    return (
      <Panel>
          <canvas ref={(c) => this.canvas = c} width={640} height={425} />
          { Object.values(this.props.vendors).map((vendor) => {
              return (
              <img key={vendor.company} src={ "/vendors/" + vendor.logo } style={{height: 50, display: "none"}}
                ref={(c) => {
                    var state = this.state;
                    state.vendors[vendor.logo] = c;
                    console.log(c);
                    this.setState(state);
                }}
              />
            );
        })}
      </Panel>
    );
  }

  _draw() {

    const { vendorMap } = this.props;
    const ctx = this.ctx;

      // draw background
      const canvasRect = this.canvas.getBoundingClientRect();
    ctx.fillRect(0, 0, canvasRect.width, canvasRect.height);
    ctx.save();
    ctx.fillStyle = "#fff";

    // draw a line
    ctx.beginPath();
    ctx.moveTo(20,20);
    ctx.bezierCurveTo(20,100,200,100,200,20);
    ctx.stroke();

    // example of props.vendorMap contents
    // {
    //     "Desktop Protection" : {
    //         "Antimalware" : "splunk.jpg",
    //         "Desktop Firewall" : null
    //     }
    // }

    Object.keys(layout).map( (sectionName) => {
        const section = layout[sectionName];
        ctx.strokeRect(section.left,section.top,section.width,section.height);

        // draw section icon
        ctx.font="20px Georgia";
        ctx.strokeText(sectionName,section.left + 10, section.top + 50);

        // draw red vertical line
        section.elements.map( (feature) => {
            const vendor = vendorMap[section] && vendorMap[section][feature];
            console.log(this.state.vendors);
            ctx.drawImage(this.state.vendors[vendor], 0, 0);
        });
    });
  }
}

// export the connected class
function mapStateToProps(state) {
    return {
        vendorMap: state.vendorMap || {},
        vendors: state.vendors || {}
    };
}

export default connect(mapStateToProps)(VendorMap)
