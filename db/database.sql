Create database carrosdb;

use carros;

CREATE TABLE carro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    año INT NOT NULL,
    color VARCHAR(30),
    precio DECIMAL(10, 2)
);


INSERT INTO carro (marca, modelo, año, color, precio) VALUES
('Toyota', 'Corolla', 2020, 'Azul', 25000.00),
('Honda', 'Civic', 2019, 'Gris', 22000.00),
('Ford', 'Mustang', 2022, 'Rojo', 45000.00),
('Chevrolet', 'Camaro', 2021, 'Negro', 42000.00),
('BMW', 'Serie 3', 2018, 'Blanco', 35000.00);

{
   
    "modelo": "F1"
   
  }