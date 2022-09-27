using System;
using System.Collections.Generic;
using System.IO;
using System.Xml.Serialization;
using System.Linq;
using System.Web;
using Microsoft.Extensions.Hosting.Internal;

public static class DataAccessHelper
{
    private static Object fileLock = new Object();

   
    public static List<string> Cities
    {
        get
        {
            return new List<string>() { "Toronto", "Montreal", "Calgary", "Ottawa",
                            "Edmonton", "Winnipeg", "Vancouver", "Quebec City",
                            "New York City", "Dallas", "Chicago", "Los Angeles",
                            "Houston", "Philadelphia", "Washington D.C."};
        }
    }
    public static List<TripItinerary> GetAllItineraries()
    {
        lock (fileLock) { 
            try { 
                itineraries allItinearies = null;
                string xmlFile = Path.GetFullPath("Data/itineraries.xml");

                using (FileStream xs = new FileStream(xmlFile, FileMode.Open))
                {
                    XmlSerializer serializor = new XmlSerializer(typeof(itineraries));
                    allItinearies = (itineraries)serializor.Deserialize(xs);
                }

                List<TripItinerary> itins = allItinearies.itinerary.Select<itinerariesItinerary, TripItinerary>(MapItineray).ToList();
                return itins;
            }
            catch
            {
                return new List<TripItinerary>();
            }
        }

    }

    public static void SaveItinerary(TripItinerary newItinerary)
    {
        if (newItinerary == null) throw new ArgumentNullException("SaveItinerary");
        
        itinerariesItinerary it = new itinerariesItinerary();

        if (string.IsNullOrWhiteSpace(newItinerary.PassengerName))
            throw new Exception( "Passenger name missing!");

        it.passenger = newItinerary.PassengerName;

        if (!Cities.Contains(newItinerary.DepartureCity))
            throw new Exception("Departure city is not valid!");

        if (!Cities.Contains(newItinerary.ArrivingCity))
            throw new Exception("Arriving city is not valid!");

        it.outbound = new itinerariesItineraryOutbound();
        it.outbound.departure = new itinerariesItineraryOutboundDeparture();
        it.outbound.departure.city = newItinerary.DepartureCity;
         
        it.outbound.arriving = new itinerariesItineraryOutboundArriving();
        it.outbound.arriving.city = newItinerary.ArrivingCity; ;

        if (string.IsNullOrWhiteSpace(newItinerary.Date))
            throw new Exception("Trip date missing!");

        try {
            it.outbound.departure.date = DateTime.ParseExact(newItinerary.Date, "yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture);
            it.outbound.arriving.date = it.outbound.departure.date;
        }
        catch
        {
            throw new Exception("Trip date is not a valid date or is in wrong format!");
        }

        string xmlFile = Path.GetFullPath("Data/itineraries.xml"); ;
        lock (fileLock)
        {
            try
            {
                itineraries allItinearies = null;
                using (FileStream xs = new FileStream(xmlFile, FileMode.Open))
                {
                    XmlSerializer serializor = new XmlSerializer(typeof(itineraries));
                    allItinearies = (itineraries)serializor.Deserialize(xs);
                }
                List<itinerariesItinerary> itineraryList = allItinearies.itinerary.ToList();
                itineraryList.Add(it);

                allItinearies.itinerary = itineraryList.ToArray();

                using (FileStream xs = new FileStream(xmlFile, FileMode.Create))
                {
                    XmlSerializer serializor = new XmlSerializer(typeof(itineraries));
                    serializor.Serialize(xs, allItinearies);
                }
            }
            catch (Exception e)
            {
                throw new Exception("Unable to save new itinerary: " + e.Message );
            }
        }
    }

    private static TripItinerary MapItineray(itinerariesItinerary arg)
    {
        TripItinerary itin = new TripItinerary();

        itin.PassengerName = arg.passenger;
        itin.DepartureCity = arg.outbound.departure.city;
        itin.ArrivingCity = arg.outbound.arriving.city;
        itin.Date = arg.outbound.departure.date.ToString("yyyy-MM-dd");
        return itin;
    }
}
