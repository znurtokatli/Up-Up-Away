create view arrival as
(select dpf.flight_number,
	   dpa.iata departure_airport_iata,
	   dpa.airport departure_airport,
	   dpf.actual departure_actual,
	   ara.iata arrival_airport_iata,
	   ara.airport arrival_airport,
	   arf.actual arrival_actual
  from flights dpf, 
  	   flights arf,
	   airports dpa,
	   airports ara
 where dpf.airport_id = dpa.airport_id
   and dpf.flight_type = 'DEPARTURE'  
   and arf.airport_id = ara.airport_id
   and arf.flight_type = 'ARRIVAL'
   and dpf.flight_number = arf.flight_number) ;
   
 
	
	
