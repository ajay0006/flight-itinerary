class TripService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newItinerary: {},
            currentItineraries: [],
            cities: [],
            ConfirmationMessage: "",
            showConfirm: { display: "none" },
            showFail: { display: "none" }
        };
    }
    componentDidMount() {
        this.initializations();
    }

    initializations() {
        this.setState({ newItinerary: {} });

        //enter your code here
        //make an Ajax request to the server TripService to get all current itineraries 

        $.ajax({
            url: TripServiceURL,
            type: "GET",
            dataType: "json",
            success: function (currentItineraries) {
                if (currentItineraries != null) {
                    this.setState({ currentItineraries })
                }
            }.bind(this),
            error: function (jsonRequest, status, e) {
                console.log(status);
                console.log(jsonRequest);
                console.log(e);
            }
        });

        //make an Ajax request to the server TripService to get available cities 

        $.ajax({
            url: TripServiceURL + '/cities',
            type: "GET",
            dataType: "json",
            success: function (cities) {
                if (cities != null) {
                    this.setState({ cities });
                }
            }.bind(this),
            error: function (jsonRequest, status, e) {
                console.log(jsonRequest);
                console.log(status);
                console.log(e);
            }
        });

    }

    saveNewItinerary() {
        if (this.validateItinerary(this.state.newItinerary))
        {
            //enter your code here
            //make an Ajax request to the server TripService to save the new itinerary

            var tripItineraryToBeSaved = this.state.newItinerary;

            $.ajax({
                url: TripServiceURL,
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(tripItineraryToBeSaved),
                success: function () {
                    this.setState.ConfirmationMessage = "saved";
                    this.state.ConfirmationMessage = "saved";
                    this.ConfirmationMessage = "saved";

                    this.setState({ showConfirm: { display: "inherit" } });
                }.bind(this),
                error: function (saveRequest, saveEvent, saveSettings) {
                    console.log(saveRequest);
                    console.log(saveEvent);
                    console.log(saveSettings);
                }
            });


            if (this.ConfirmationMessage === "saved") {
                this.initializations();
                document.location.reload(true);
            }


        }
        else

        {
            //enter your code here
            //the new itinerary is not valid, show the error message

            this.setState.ConfirmationMessage = "Your Trip itinerrary was not saved!";
            this.state.ConfirmationMessage = "Your Trip itinerrary was not saved!";
            this.ConfirmationMessage = "Your Trip itinerrary was not saved!";

            this.setState({
                showFail: { display: "inherit" }
            })

        }

        if (this.ConfirmationMessage === "saved") {
            document.location.reload(true);
        }



    }


    render() {

        var handleChange = (itinerary) => {
            this.setState({ newItinerary: itinerary });
        }

        // testing to see if this will work dami you added 2 extra parameters(citiesObject and onChangeInstance) dont forget if it doesnt work

        var makeItineraryList = (x, index, citiesObject, onChangeInstance) => {

            //enter your code here to display one itinerary in a list.
            return <Itinerary key={index} itinerary={x} cities={citiesObject} onItinearyChange={onChangeInstance} />


        }
        return (
            <div>
                <fieldset style={{ height: 400 }}>
                    <legend>Current Itineraries</legend>

                    {this.state.currentItineraries.map((value, index) => makeItineraryList(value, index, this.state.cities, handleChange))}


                </fieldset>
                
                <fieldset>
                    <legend>New Itinerary</legend>
                    <Itinerary itinerary={this.state.newItinerary} cities={this.state.cities} onItinearyChange={handleChange} />

                    <button className="btn btn-primary" type="button" onClick={this.saveNewItinerary.bind(this)}>Save New Itinerary</button> &nbsp;
                    <span className="text-info font-weight-bold">{this.state.ConfirmationMessage}</span>
                </fieldset>
            </div>
        );
    }

    validateItinerary(itinerary) {
        var keys = Object.keys(itinerary);

        var validNewItinerary = true;
        if (keys.length < 4)
            validNewItinerary = false;
        else {
            keys.forEach((k) => { if (this.state.newItinerary[k].trim() === "") validNewItinerary = false; });

            if (itinerary.departureCity === itinerary.arrivingCity)
                validNewItinerary = false;

        }
            

        return validNewItinerary
    }
}

ReactDOM.render((<div><TripService /></div>), document.getElementById("content"));
// also remember dami for the new Itin fieldset you copied wei's code to your notepad so you could test out a different way to see if it works 
// also remember you changed the port numbers in the jsonsettings file under ppts, dont forget to change it back and remove the test comments if your idea code works