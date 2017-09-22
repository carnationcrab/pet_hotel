CREATE TABLE pet_hotel (
    id SERIAL PRIMARY KEY,
    name VARCHAR (50),
    breed VARCHAR (50),
    color VARCHAR (50)
);

CREATE TABLE visits (
	id SERIAL PRIMARY KEY,
	check_in TIMESTAMP,
	check_out TIMESTAMP, 
	pet_id INT REFERENCES pet_hotel(id) ON DELETE CASCADE
);
	
INSERT INTO pet_hotel (name, breed, color, checkedIn) 
VALUES ('Atom', 'Border Collie', 'Blue', false),
('Yves', 'Poodle', 'Pink', true);

INSERT INTO pet_hotel (name, breed, color)
VALUES ('Cujo', 'Llama', 'White');