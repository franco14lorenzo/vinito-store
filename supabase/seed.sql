-- Seed data for the admin table (a single admin)
INSERT INTO admin (name, surname, email) VALUES
('Franco', 'Lorenzo', 'franco14lorenzo@gmail.com');

-- Seed data for the wines table (descriptions in Spanish)
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

-- Seed data for the tastings table (short_description in Spanish)
INSERT INTO tastings (name, slug, short_description, pairings, price, status, created_by, stock) VALUES
('Degustación Malbec', 'degustacion-malbec', 'Experiencia de cata de diferentes Malbecs, explorando la variedad emblemática de Argentina', 'Carnes rojas, quesos maduros', 5000.00, 'draft', 1, 10),
('Blancos de Verano', 'blancos-de-verano', 'Cata de vinos blancos refrescantes, perfectos para la temporada estival', 'Mariscos, ensaladas', 4500.00, 'draft', 1, 10),
('Tintos Premium', 'tintos-premium', 'Selección de los mejores tintos, una experiencia para paladares exigentes', 'Carnes a la parrilla, chocolates', 6000.00, 'draft', 1, 10),
('Standard', 'standard', 'Nuestra degustación Estándar es perfecta para principiantes, con una selección de tres vinos deliciosos', 'Variedad de quesos, frutos secos', 3500.00, 'active', 1, 10),
('Premium', 'premium', 'La degustación Premium eleva tu experiencia con cuatro vinos excepcionales, ideal para expandir tu conocimiento enológico', 'Tabla de fiambres, panes artesanales', 4500.00, 'active', 1, 10),
('Deluxe', 'deluxe', 'Para la máxima indulgencia, nuestra degustación Deluxe incluye cinco de los mejores vinos, perfecta para conocedores y ocasiones especiales', 'Selección de carnes, chocolates gourmet', 6500.00, 'active', 1, 10);

-- Seed data for the tasting_wines table (no changes)
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