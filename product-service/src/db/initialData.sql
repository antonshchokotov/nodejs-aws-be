CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description text NOT NULL,
  price INT NOT NULL,
  image text NOT NULL
);

CREATE TABLE IF NOT EXISTS stocks (
  product_id uuid PRIMARY KEY,
  count INT NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

INSERT INTO products (id, title, description, price, image)
SELECT id, title, description, price, image
FROM json_populate_recordset (NULL::products,
'[
  {
    "id": "18536229-9725-4217-b7f7-61119d75a21d",
    "description": "Persevering optimal matrix",
    "price": 4000,
    "title": "Andalax",
    "image": "https://images.unsplash.com/photo-1586222515300-fa1992155ece?w=400"
  },
  {
    "id": "b56572a7-77d3-4de3-a0ec-bddcf412c84d",
    "description": "Switchable 24/7 workforce",
    "price": 3000,
    "title": "Latlux",
    "image": "https://images.unsplash.com/photo-1571333250630-f0230c320b6d?w=400"
  },
  {
    "id": "c6892d8f-153c-48e1-b550-fb778065cbf1",
    "description": "Polarised methodical software",
    "price": 2900,
    "title": "Mat Lam Tam",
    "image": "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400"
  },
  {
    "id": "ef754cdc-7c04-4960-a95d-c856e53ec090",
    "description": "Multi-layered composite emulation",
    "price": 3200,
    "title": "Sub-Ex",
    "image": "https://images.unsplash.com/photo-1549216963-72c1712c1196?w=400"
  },
  {
    "id": "cdcabc88-31ee-43d7-9ad7-f8da8d951937",
    "description": "Devolved directional interface",
    "price": 750,
    "title": "Y-find",
    "image": "https://images.unsplash.com/photo-1591646311346-995bbd417622?w=400"
  },
  {
    "id": "07ec0f2f-2e1a-438c-b7da-4d2d9e3436cd",
    "description": "Integrated mission-critical contingency",
    "price": 600,
    "title": "Solarbreeze",
    "image": "https://images.unsplash.com/photo-1601652290498-0b5f418541a4?w=400"
  },
  {
    "id": "1119ab7d-8595-4921-9c25-52d356d79f75",
    "description": "Seamless context-sensitive core",
    "price": 2300,
    "title": "Flowdesk",
    "image": "https://images.unsplash.com/photo-1597522781074-9a05ab90638e?w=400"
  },
  {
    "id": "d0865649-80ec-4868-abe0-ec427ae4a7e3",
    "description": "Optimized intangible database",
    "price": 3400,
    "title": "Konklux",
    "image": "https://images.unsplash.com/photo-1588530503929-ec9047c086fb?w=400"
  },
  {
    "id": "351c8541-2a99-42e0-86b0-562d803a4c10",
    "description": "Monitored intermediate structure",
    "price": 2200,
    "title": "Stringtough",
    "image": "https://images.unsplash.com/photo-1601651353134-d5b8906b515e?w=400"
  },
  {
    "id": "687496e3-6b39-48bf-9282-8f13f4ad5ceb",
    "description": "Switchable upward-trending attitude",
    "price": 580,
    "title": "Cardguard",
    "image": "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=400"
  }
]');

INSERT INTO stocks (product_id, count)
SELECT *
FROM json_populate_recordset (NULL::stocks,
'[
  {
    "product_id": "18536229-9725-4217-b7f7-61119d75a21d",
    "count": 5
  },
  {
    "product_id": "b56572a7-77d3-4de3-a0ec-bddcf412c84d",
    "count": 4
  },
  {
    "product_id": "c6892d8f-153c-48e1-b550-fb778065cbf1",
    "count": 4
  },
  {
    "product_id": "ef754cdc-7c04-4960-a95d-c856e53ec090",
    "count": 2
  },
  {
    "product_id": "cdcabc88-31ee-43d7-9ad7-f8da8d951937",
    "count": 1
  },
  {
    "product_id": "07ec0f2f-2e1a-438c-b7da-4d2d9e3436cd",
    "count": 4
  },
  {
    "product_id": "1119ab7d-8595-4921-9c25-52d356d79f75",
    "count": 2
  },
  {
    "product_id": "d0865649-80ec-4868-abe0-ec427ae4a7e3",
    "count": 1
  },
  {
    "product_id": "351c8541-2a99-42e0-86b0-562d803a4c10",
    "count": 4
  },
  {
    "product_id": "687496e3-6b39-48bf-9282-8f13f4ad5ceb",
    "count": 3
  }
]');