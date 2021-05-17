--delete from flights

select * from flight_details where flight_number = '2023'
   
select  split_part(flight_number, '_', 2)
--substring(flight_number from '_#%' for '#'  ) as flight_number
--regexp_substr
from flights where flight_number like  '%2023%' --2023

select dpf.flight_number,  
	   split_part(dpf.flight_number, '_', 2) , 
	   dpf.iata flight_iata,
	   dpf.icao flight_icao,
	   dpf.airport_id departure_airport_id,
	   dpa.airport departure_airport,
	   dpa.iata departure_airport_iata,
	   dpa.icao departure_airport_icao,	   
	   dpf.terminal departure_terminal,
	   dpf.gate departure_gate,
	   dpf.delay departure_delay,
	   dpf.scheduled departure_scheduled,
	   dpf.estimated departure_estimated,
	   dpf.actual departure_actual,
	   dpf.estimated_runway departure_estimated_runway,
	   dpf.actual_runway departure_actual_runway,
	   --arrivals
-- 	   arf.flight_number, 
-- 	   arf.iata flight_iata,
-- 	   arf.icao flight_icao,
	   arf.airport_id arrival_airport_id,
	   ara.airport arrival_airport,
	   ara.iata arrival_airport_iata,
	   ara.icao arrival_airport_icao,
	   arf.terminal arrival_terminal,
	   arf.gate arrival_gate,
	   arf.delay arrival_delay,
	   arf.scheduled arrival_scheduled,
	   arf.estimated arrival_estimated,
	   arf.actual arrival_actual,
	   arf.estimated_runway arrival_estimated_runway,
	   arf.actual_runway arrival_actual_runway
  from flights dpf, 
  	   flights arf,
	   airports dpa,
	   airports ara
 where dpf.airport_id = dpa.airport_id
   and dpf.flight_type = 'DEPARTURE'  
   and arf.airport_id = ara.airport_id
   and arf.flight_type = 'ARRIVAL'
   and dpf.flight_number = arf.flight_number 
   and split_part(dpf.flight_number, '_', 2) like  '%2023%'
 