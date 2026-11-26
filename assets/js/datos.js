const experiencias = [
{ codigo:"QST-001", nombre:"El Archivo 47", categoria:"Escape room / Misterio", fecha:"12 dic 2026 · 6:00 p. m.", modalidad:"Presencial", ubicacion:"San José · Barrio Escalante", cupos:24, precio:12000 },
{ codigo:"QST-002", nombre:"Retro Arena 16-Bit", categoria:"Gaming / Torneo", fecha:"9 ene 2027 · 2:00 p. m.", modalidad:"Presencial", ubicacion:"Heredia · Centro", cupos:32, precio:8000 },
{ codigo:"QST-003", nombre:"Cosplay SOS: de cero a personaje", categoria:"Creatividad / Taller", fecha:"16 ene 2027 · 10:00 a. m.", modalidad:"Presencial", ubicacion:"Cartago · Centro", cupos:20, precio:15000 },
{ codigo:"QST-004", nombre:"Multiverso Geek: Trivia en vivo", categoria:"Trivia", fecha:"23 ene 2027 · 7:00 p. m.", modalidad:"Virtual", ubicacion:"Google Meet", cupos:60, precio:5000 },
{ codigo:"QST-005", nombre:"Primera misión: D&D para principiantes", categoria:"Juego de rol", fecha:"30 ene 2027 · 3:00 p. m.", modalidad:"Presencial", ubicacion:"San José · Los Yoses", cupos:18, precio:10000 },
{ codigo:"QST-006", nombre:"Miniaturas: pintura rápida", categoria:"Hobby / Taller", fecha:"6 feb 2027 · 9:00 a. m.", modalidad:"Presencial", ubicacion:"Cartago · Centro", cupos:16, precio:18000 }
];
// Revisa una estructura razonable; no verifica que el buzón exista.
const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;