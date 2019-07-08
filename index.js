import React from "react";
import ReactDOM from "react-dom";
import pq from "pqgrid";
import "./styles.css";
import { saveAs } from 'file-saver';

//import few localization files for this demo.
import "pqgrid/localize/pq-localize-en.js";
import "pqgrid/localize/pq-localize-ja.js";
import "pqgrid/localize/pq-localize-tr.js";

import $ from "jquery";
window.$ = $;

class Pqgrid extends React.Component {
  componentDidMount() {
    this.options = this.props.options;
    pq.grid(this.refs.grid, this.options);
  }
  componentDidUpdate(prevProps) {
    /*var src = this.props.options, dest = this.options;
    for(var key in src){
      if(src[key] != dest[key])
        dest[key] = src[key]
    }*/
    Object.assign(this.options, this.props.options);
  }
  render() {
    return <div ref="grid" />;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
   // https://www.paramquery.com 
this.colM = [
    { title: "ShipCountry", width: 100, dataIndx: "ShipCountry" },
    { title: "Customer Name", width: 130, dataIndx: "ContactName" },
    { title: "Order ID", width: 100, dataIndx: "OrderID", dataType: "integer" },
    { title: "Order Date", width: "100", dataIndx: "OrderDate", dataType: "date" },
    { title: "Required Date", width: 100, dataIndx: "RequiredDate", dataType: "date" },
    { title: "Shipped Date", width: 100, dataIndx: "ShippedDate", dataType: "date" },
    { title: "Shipping Via", width: 100, dataIndx: "ShipVia" },
    { title: "Freight", width: 100, format: '##.00', dataType: "float", dataIndx: "Freight" },
    { title: "Shipping Name", width: 160, dataIndx: "ShipName" },
    { title: "Shipping Address", width: 200, dataIndx: "ShipAddress" },
    { title: "Shipping City", width: 100, dataIndx: "ShipCity" },
    { title: "Shipping Region", width: 130, dataIndx: "ShipRegion" },
    { title: "Shipping Postal Code", width: 130, dataIndx: "ShipPostalCode" }
];
this.dataModel = {
    location: "remote",
    url: "https://www.paramquery.com/Content/orders.json"
}
this.state=({
    dataModel: this.dataModel,
    sortModel: {                
        sorter: [{ dataIndx: 'ShipCountry', dir: 'up' }],
        space: true,
        multiKey: null
    },
    flex: { one: true },
    numberCell: { resizable: true, title: "#", minWidth: 20, width: 30 },
    colModel: this.colM,
    pageModel: { type: 'local', rPP: 100, rPPOptions: [10,100,1000] },
    showTitle: false,
    columnBorders: false,
    resizable: true,
    freezeCols: 2,                        
    hwrap: false,
    wrap: false,
    toolbar: {
        items: [
            {
                type: 'select',
                label: 'Sorting Type:',
                value: 'single', //default value.
                options: [
                    {'single': 'Single without shift key'},
                    {'singlemulti': 'Single with shift key for multiple'},
                    {'multi': 'Multiple columns'}
                ],
                listener: function(evt){                            
                    var val = evt.target.val,
                        single = true,
                        multiKey = null;

                    if(val == 'singlemulti'){                                
                        multiKey = 'shiftKey';
                    }
                    else if(val == 'multi'){
                        single = false;
                    }    

                    this.option("sortModel.single", single);
                    this.option("sortModel.multiKey", multiKey);
                    this.sort(); //refresh sorting.                        
                }
            }
        ]
    }

})
  }

    
  render() {
return (
  <div>
    <div style={{ margin: 20 }}>
    </div>
    <Pqgrid options={this.state} ref="grid"> 
    </Pqgrid>
    </div>
);
}
}
ReactDOM.render(<App />, document.getElementById("root"));

