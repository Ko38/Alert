class User {
    constructor(email){
        this.email = email;
    }
}

class Flight {
    constructor(date, flightID){
        this.date = date;
        this.flightID = flightID;
    }

    printInfo() {
        console.log(`Date:${this.date}`);
        console.log(`FlightID:${this.flightID}`);
    }
}

class Departure {
    constructor(flightID, users) {
        this.flightID = flightID
        this.users = users;
    }

    printInfo(){
        console.log(`FlightID:${this.flightID}`);
        console.log(`Users:`);
        for(let user of this.users){
            console.log(user);
        }
    }
}

class Forecast {
    constructor(date, weather){
        this.date = date;
        this.weather = weather;
    }

    printInfo(){
        console.log(`Date:${this.date}`);
        console.log(`Weather:${this.weather}`);
    }
}

class DepartureService {
    constructor(departures){
        this.departures = departures;
    }

    getDeparture(userEmail){
        let departures = this.departures.filter(departure => {
            return departure.users.filter(user => {
                return user.email = userEmail;
            });
        });
        if (departures.length > 0){
            return departures[0];
        }
    }
}

class TravelService {
    constructor(flights){
        this.flights = flights;
    }

    getFlight(flightID){
        let flights = this.flights.filter(flight => {
            return flight.flightID === flightID;
        });
        if (flights.length > 0){
            return flights[0];
        }
    }
}

class WeatherService {
    constructor(forecasts){
        this.forecasts = forecasts;
    }

    getForecast(date) {
        let forecasts = this.forecasts.filter(forecast => {
            return forecast.date === date;
        });
        if (forecasts.length > 0){
            return forecasts[0];
        }
    }
}

let flight123Users = [new User("abc@xyz.com")];

let departures = [
    new Departure(123, flight123Users)
];

let flights = [
    new Flight("01/01/2019", 123)
];

let forecasts = [
    new Forecast("01/01/2019", "sunny")
];

console.log("get departure:");
let departureService = new DepartureService(departures);
departureService.getDeparture(flight123Users[0].email).printInfo();
console.log("");

console.log("get flight:");
let travelService = new TravelService(flights);
travelService.getFlight(departures[0].flightID).printInfo();
console.log("");

console.log("get forecast:");

let weatherService = new WeatherService(forecasts);
weatherService.getForecast(flights[0].date).printInfo();