-- Seed data for the admin table
INSERT INTO admin (name, surname, email) VALUES
('Franco', 'Lorenzo', 'franco14lorenzo@gmail.com');

-- Seed data for the wines table
INSERT INTO wines (name, description, winery, year, variety, volume_ml, price, cost_usd_blue, status, created_by, stock) VALUES
('Malbec Reserva', 'Un Malbec intenso y aromático con notas de frutas rojas y especias', 'Bodega del Valle', 2018, 'Malbec', 750, 2500.00, 12.50, 'active', 1, 100),
('Chardonnay Premium', 'Chardonnay fresco y frutado con toques de vainilla y roble', 'Viñas del Sur', 2020, 'Chardonnay', 750, 1800.00, 9.00, 'active', 1, 150),
('Cabernet Sauvignon Gran Reserva', 'Cabernet Sauvignon de gran cuerpo con taninos maduros y final prolongado', 'Altos Andes', 2017, 'Cabernet Sauvignon', 750, 3200.00, 16.00, 'active', 1, 200),
('Torrontés Clásico', 'Torrontés aromático y floral con notas de durazno y jazmín', 'Valles Calchaquíes', 2021, 'Torrontés', 750, 1500.00, 7.50, 'active', 1, 120),
('Blend Reserva', 'Blend elegante de Malbec, Cabernet y Merlot con complejidad y estructura', 'Finca La Esperanza', 2019, 'Blend', 750, 2800.00, 14.00, 'active', 1, 130),
('Pinot Noir Elegance', 'Pinot Noir suave y elegante con aromas a frutos rojos y un toque de tierra', 'Viñedos del Este', 2019, 'Pinot Noir', 750, 2200.00, 11.00, 'active', 1, 140),
('Sauvignon Blanc Fresco', 'Sauvignon Blanc con notas cítricas y herbáceas, fresco y vibrante', 'Bodegas del Litoral', 2021, 'Sauvignon Blanc', 750, 1600.00, 8.00, 'active', 1, 110),
('Merlot Suave', 'Merlot de cuerpo medio y taninos suaves con sabores a ciruela y chocolate', 'Viñas del Oeste', 2018, 'Merlot', 750, 2000.00, 10.00, 'active', 1, 90),
('Bonarda Clásica', 'Bonarda frutada y de cuerpo medio con notas de cereza y especias', 'Bodega Tradicional', 2020, 'Bonarda', 750, 1900.00, 9.50, 'active', 1, 80),
('Syrah Intenso', 'Syrah de gran intensidad y complejidad con notas de pimienta y frutos negros', 'Finca del Norte', 2017, 'Syrah', 750, 2700.00, 13.50, 'active', 1, 70);

-- Seed data for the tastings table
INSERT INTO tastings (name, slug, short_description, long_description, pairings, price, status, created_by, stock) VALUES
('Degustación Malbec', 'degustacion-malbec', 'Experiencia de cata de diferentes Malbecs, explorando la variedad emblemática de Argentina', '', 'Carnes rojas, quesos maduros', 5000.00, 'draft', 1, 10),
('Blancos de Verano', 'blancos-de-verano', 'Cata de vinos blancos refrescantes, perfectos para la temporada estival', '', 'Mariscos, ensaladas', 4500.00, 'draft', 1, 10),
('Tintos Premium', 'tintos-premium', 'Selección de los mejores tintos, una experiencia para paladares exigentes', '', 'Carnes a la parrilla, chocolates', 6000.00, 'draft', 1, 10),
('Standard', 'standard', 'Nuestra degustación Estándar es perfecta para principiantes, con una selección de vinos deliciosos', 'Nuestra cata estándar es perfecta para principiantes, ya que incluye una deliciosa selección de vinos. Con una mezcla de vinos tintos y blancos, esta cata es una excelente introducción al mundo de los vinos de Mendoza. Comenzamos con un Chardonnay ligero y refrescante, seguido de un Merlot rico y suave, y terminamos con un Cabernet Sauvignon audaz y complejo.', 'Variedad de quesos, frutos secos', 3500.00, 'active', 1, 10),
('Premium', 'premium', 'La degustación Premium eleva tu experiencia con cuatro vinos excepcionales, ideal para expandir tu conocimiento enológico', 'La degustación Premium eleva tu experiencia con vinos excepcionales, ideales para ampliar tu conocimiento sobre el vino. Esta degustación incluye un Chardonnay, Merlot, Cabernet Sauvignon y un vino de postre, cada uno cuidadosamente seleccionado para mostrar lo mejor de Mendoza. Deléitate con una variedad de sabores y estilos, desde blancos ligeros y frescos hasta tintos audaces y complejos. Perfecto para los entusiastas del vino y aquellos que buscan explorar nuevos vinos.', 'Tabla de fiambres, panes artesanales', 4500.00, 'active', 1, 10),
('Deluxe', 'deluxe', 'Para la máxima indulgencia, nuestra degustación Deluxe incluye cinco de los mejores vinos, perfecta para conocedores y ocasiones especiales', 'Para disfrutar al máximo, nuestra degustación Deluxe incluye los mejores vinos, perfectos para conocedores y ocasiones especiales. Esta degustación incluye un Chardonnay, Merlot, Cabernet Sauvignon, un vino de postre y un vino de reserva especial, cada uno seleccionado a mano para mostrar lo mejor de Mendoza. Experimente una variedad de sabores y estilos, desde blancos ligeros y frescos hasta tintos audaces y complejos. Regálese una experiencia de degustación inolvidable con nuestra selección de vinos más exclusiva.', 'Selección de carnes, chocolates gourmet', 6500.00, 'active', 1, 10);

-- Seed data for the tasting_wines table
INSERT INTO tasting_wines (tasting_id, wine_id) VALUES
-- de Malbecs
(1, 1), (1, 5), (1, 8), (1, 3),
-- Blancos de Verano
(2, 2), (2, 4), (2, 7), (2, 1),
-- Tintos Premium
(3, 3), (3, 5), (3, 6), (3, 10),
-- Estándar
(4, 1), (4, 2), (4, 3), (4, 4),
-- Premium
(5, 5), (5, 6), (5, 7), (5, 8),
-- Deluxe
(6, 9), (6, 10), (6, 1), (6, 2);

-- Seed data for the accommodations table
INSERT INTO accommodations (id, name, address, qr_code, latitude, longitude, created_by, status) VALUES
('550e8400-e29b-41d4-a716-446655440010', 'Hotel Mendoza', 'Av. San Martín 1234, Mendoza, Argentina', 'https://example.com/hotel-mendoza-qr', -32.889458, -68.845839, 1, 'active'),
('550e8400-e29b-41d4-a716-446655440011', 'Casa de Campo', 'Ruta 40, Km 123, Luján de Cuyo, Mendoza, Argentina', 'https://example.com/casa-de-campo-qr', -33.016667, -68.866667, 1, 'active'),
('550e8400-e29b-41d4-a716-446655440012', 'Hostería del Valle', 'Calle San Juan 567, San Rafael, Mendoza, Argentina', 'https://example.com/hosteria-del-valle-qr', -34.617778, -68.330278, 1, 'active'),
('550e8400-e29b-41d4-a716-446655440013', 'Cabañas del Sur', 'Ruta 143, Km 12, Malargüe, Mendoza, Argentina', 'https://example.com/cabanas-del-sur-qr', -35.483333, -69.583333, 1, 'active'),
('550e8400-e29b-41d4-a716-446655440014', 'Posada de Montaña', 'Ruta 7, Km 1000, Uspallata, Mendoza, Argentina', 'https://example.com/posada-de-montana-qr', -32.593056, -69.344167, 1, 'active');

-- Seed data for the delivery_schedules table
INSERT INTO delivery_schedules (name, start_time, end_time, status, created_by) VALUES
('Mañana (09:00 - 12:00)', '09:00:00', '12:00:00', 'active', 1),
('Tarde (14:00 - 17:00)', '14:00:00', '17:00:00', 'active', 1),
('Noche (19:00 - 22:00)', '19:00:00', '22:00:00', 'active', 1),
('Trasnoche (22:00 - 02:00)', '22:00:00', '02:00:00', 'active', 1);

-- Seed data for the payment_methods table
INSERT INTO payment_methods (name, status, created_by, description, type) VALUES
('Pago contra entrega', 'active', 1, 'Pago en efectivo al recibir el producto', 'cash'),
('Tarjeta de crédito', 'draft', 1, 'Pago con tarjeta de crédito', 'non_cash'),
('Tarjeta de débito', 'draft', 1, 'Pago con tarjeta de débito', 'non_cash'),
('Transferencia bancaria', 'active', 1, 'Pago mediante transferencia bancaria', 'non_cash');

-- Seed data for the customers table
INSERT INTO customers (id, name, surname, email, phone, created_by) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Franco', 'Armani', 'franco.armani@riverplate.com', '123-456-7890', 1),
('550e8400-e29b-41d4-a716-446655440001', 'Enzo', 'Perez', 'enzo.perez@riverplate.com', '345-678-9012', 1),
('550e8400-e29b-41d4-a716-446655440002', 'Julian', 'Alvarez', 'julian.alvarez@riverplate.com', '456-789-0123', 1),
('550e8400-e29b-41d4-a716-446655440003', 'Gonzalo', 'Montiel', 'gonzalo.montiel@riverplate.com', '567-890-1234', 1),
('550e8400-e29b-41d4-a716-446655440004', 'Nicolas', 'De La Cruz', 'nicolas.delacruz@riverplate.com', '678-901-2345', 1);

-- Seed data for the orders table
INSERT INTO orders (id, status, customer_id, delivery_date, delivery_schedule_id, payment_method_id, total_amount, created_by, accommodation_id, customer_note) VALUES
('550e8400-e29b-41d4-a716-446655440005', 'pending', '550e8400-e29b-41d4-a716-446655440000', '2024-10-15', 1, 1, 5000.00, 1, '550e8400-e29b-41d4-a716-446655440010', 'Por favor, entregar entre las 9 AM y las 12 PM'),
('550e8400-e29b-41d4-a716-446655440006', 'pending', '550e8400-e29b-41d4-a716-446655440001', '2024-10-16', 2, 1, 4500.00, 1, '550e8400-e29b-41d4-a716-446655440011', 'Dejar en la recepción'),
('550e8400-e29b-41d4-a716-446655440007', 'pending', '550e8400-e29b-41d4-a716-446655440002', '2024-11-17', 3, 1, 6000.00, 1, '550e8400-e29b-41d4-a716-446655440012', 'Llamar al llegar'),
('550e8400-e29b-41d4-a716-446655440008', 'pending', '550e8400-e29b-41d4-a716-446655440003', '2024-10-18', 4, 1, 3500.00, 1, '550e8400-e29b-41d4-a716-446655440013', 'Tocar el timbre dos veces'),
('550e8400-e29b-41d4-a716-446655440009', 'pending', '550e8400-e29b-41d4-a716-446655440004', '2025-10-19', 1, 1, 4500.00, 1, '550e8400-e29b-41d4-a716-446655440014', 'Dejar el paquete con el vecino');

-- Seed data for the order_tastings table
INSERT INTO order_tastings (order_id, tasting_id, quantity) VALUES
-- Franco Armani
('550e8400-e29b-41d4-a716-446655440005', 1, 2), ('550e8400-e29b-41d4-a716-446655440005', 2, 1), ('550e8400-e29b-41d4-a716-446655440005', 3, 1),
-- Enzo Perez
('550e8400-e29b-41d4-a716-446655440006', 4, 1), ('550e8400-e29b-41d4-a716-446655440006', 5, 2), ('550e8400-e29b-41d4-a716-446655440006', 6, 1),
-- Julian Alvarez
('550e8400-e29b-41d4-a716-446655440007', 4, 1), ('550e8400-e29b-41d4-a716-446655440007', 5, 1), ('550e8400-e29b-41d4-a716-446655440007', 6, 2),
-- Gonzalo Montiel
('550e8400-e29b-41d4-a716-446655440008', 4, 1), ('550e8400-e29b-41d4-a716-446655440008', 5, 1), ('550e8400-e29b-41d4-a716-446655440008', 6, 1),
-- Nicolas De La Cruz
('550e8400-e29b-41d4-a716-446655440009', 4, 2), ('550e8400-e29b-41d4-a716-446655440009', 5, 1), ('550e8400-e29b-41d4-a716-446655440009', 6, 1);