class Heroi {
    constructor(nome, idade, tipo) {
        this.nome = nome;
        this.idade = idade;
        this.tipo = tipo;
    }

    atacar() {
        let ataque;

        if (this.tipo === "mago") {
            ataque = "usou magia";
        } else if (this.tipo === "guerreiro") {
            ataque = "usou espada";
        } else if (this.tipo === "monge") {
            ataque = "usou artes marciais";
        } else if (this.tipo === "ninja") {
            ataque = "usou shuriken";
        } else {
            ataque = "realizou um ataque";
        }

        console.log(`O ${this.tipo} atacou usando ${ataque}`);
    }
}

let heroi1 = new Heroi("Arthur", 25, "guerreiro");
heroi1.atacar();

let heroi2 = new Heroi("Merlin", 150, "mago");
heroi2.atacar();

let heroi3 = new Heroi("Lee", 30, "monge");
heroi3.atacar();

let heroi4 = new Heroi("Hanzo", 22, "ninja");
heroi4.atacar();
