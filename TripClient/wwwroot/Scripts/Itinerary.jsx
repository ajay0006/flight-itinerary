class Itinerary extends React.Component {
    render() 
    {
        //get data and event handler from the component's paramenters.
        var cities = this.props.cities;
        var itinerary = this.props.itinerary;
        var onItinearyChange = this.props.onItinearyChange;

        if (Object.keys(itinerary).length === 0) {
            itinerary = { passengerName: "", date: "", departureCity: "", arrivingCity: "" };
        }

        var makeCityOptions = (x, index) => {
            return <option key={index} value={x}>{x}</option>
        }

        var handleChange = (e) => {

            var itin = itinerary;

            if (e.target.id == "drpDeparture")
                itin.departureCity = e.target.value;
            else if (e.target.id == "drpArriving")
                itin.arrivingCity = e.target.value;
            else if (e.target.id == "txtDate")
                itin.date = e.target.value;
            else if (e.target.id == "txtName")
                itin.passengerName = e.target.value;

            onItinearyChange(itin);          
        }

        return (
            <div className="itineraryBlock">
                <div className="row form-group">
                    <div className="col-md-2 label-align"><label htmlFor="txtName">Name:</label> </div>
                    <div className="col-md-4">
                        <input type="text" id="txtName" className="form-control" placeholder="Passenger Name" disabled={this.disabled}
                            onChange={handleChange} value={itinerary.passengerName}  />
                    </div>
                    <div className="col-md-2 label-align"><label>Date:</label> </div>
                    <div className="col-md-4">
                        <input type="date" id="txtDate" className="form-control" placeholder="YYYY-MM-DD" disabled={this.disabled}
                            onChange={handleChange} value={itinerary.date} />
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col-md-2 label-align"><label htmlFor="drpDeparture">Departure:</label> </div>
                    <div className="col-md-4">
                        <select id="drpDeparture" className="form-control" disabled={this.disabled}
                            onChange={handleChange} value={itinerary.departureCity}>
                            <option value="">Select ... </option>
                            {cities.map(makeCityOptions)}
                        </select>
                    </div>
                    <div className="col-md-2 label-align"><label htmlFor="drpArriving">Arriving:</label> </div>
                    <div className="col-md-4">
                        <select id="drpArriving" className="form-control" disabled={this.disabled}
                            onChange={handleChange} value={itinerary.arrivingCity}>
                            <option value="">Select ... </option>
                            {cities.map(makeCityOptions)}
                        </select>
                    </div>
                </div>
            </div>
        );
    }

    constructor(props) {
        super(props);
        this.disabled = Object.keys(this.props.itinerary).length !== 0 ? "disabled" : "";
    }
}