const nomeHeroi = gets();

const experienciaHeroi = parseInt(gets());

let nivelHeroi = "";

if (experienciaHeroi < 1000) {
    nivelHeroi = "Ferro";
} else if (experienciaHeroi <= 2000) {
    nivelHeroi = "Bronze";
} else if (experienciaHeroi <= 5000) {
    nivelHeroi = "Prata";
} else if (experienciaHeroi <= 7000) {
    nivelHeroi = "Ouro";
} else if (experienciaHeroi <= 8000) {
    nivelHeroi = "Platina";
} else if (experienciaHeroi <= 9000) {
    nivelHeroi = "Ascendente";
} else if (experienciaHeroi <= 10000) {
    nivelHeroi = "Imortal";
} else {
    nivelHeroi = "Radiante";
}

print(`O Herói de nome ${nomeHeroi} está no nível de ${nivelHeroi}`);
