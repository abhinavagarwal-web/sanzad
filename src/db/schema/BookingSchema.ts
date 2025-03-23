import { integer, pgTable, varchar,boolean,timestamp, text, PgTable, date,time } from 'drizzle-orm/pg-core'; 
 
export const BookingTable =pgTable('Booking',{ 
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    booking_no: varchar({length:255}),
    pickup:varchar({length:255}),
    dropoff:varchar({length:255}),
    passenger:varchar({length:255}),
    date:date(),
    time:time(),
    return_date:date(),
    return_time:time(),
    estimated_trip_time:time(),
    distance:varchar({length:255}),
    vehicle_name:varchar({length:255}),
    passengers_no:varchar({length:255}),
    medium_bags:varchar({length:255}),
    passenger_name:varchar({length:255}),
    passenger_email:varchar({length:255}),
    passenger_contact_no:varchar({length:255}),
    agentforeign:integer() 
}) 
   