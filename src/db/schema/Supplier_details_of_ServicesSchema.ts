import { integer, pgTable, varchar, text, boolean,uuid } from 'drizzle-orm/pg-core'; 

export const registerTable2 = pgTable('supplier_details', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  Vehicle_type: varchar({length:255}).notNull(),
  Vehicle_brand: varchar({length:255}).notNull(), 
  Type_service: varchar({length:255}).notNull(),
  Vehicle_model: varchar({length:255}).notNull(), 
  Doors: varchar({length:255}).notNull(),
  Seats: varchar({length:255}).notNull(),
  Category_space: varchar({length:255}),
  Max_number_pax_accommodate:varchar({length:255}).notNull(),
  Luggage_information: varchar({length:255}).notNull(),
  Max_number_medium_suitcase: varchar({length:255}).notNull(),
  Max_number_carbin_bag: varchar({length:255}).notNull(), 
  Space_available_other_luggage: varchar({length:255}).notNull(), 
  Location_details:varchar({length:255}).notNull(), 
  Transfer_information:varchar({length:255}).notNull(), 
  Service_providing_location:varchar({length:255}).notNull(),   
  Airport: varchar({length:255}).notNull(), 
  Port_cruise: varchar({length:255}).notNull(), 
  Station: varchar({length:255}).notNull(), 
  City_center: varchar({length:255}).notNull(), 
  Vehicle_for: varchar({length:255}).notNull(), 
  Half_day_city_limit_4hrs: varchar({length:255}), 
  Full_day_city_limit_8hrs: varchar({length:255}),   
  Inclusions: varchar({length:255}), 
  Vehicle_rent: varchar({length:255}).notNull(), 
  Fuel: varchar({length:255}).notNull(), 
  Driver: varchar({length:255}).notNull(), 
  Parking_fees: varchar({length:255}).notNull(), 
  Toll_or_taxes: varchar({length:255}).notNull(), 
  Driver_tips: varchar({length:255}).notNull(), 
  Other: varchar({length:255}), 
});

