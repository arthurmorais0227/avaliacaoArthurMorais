import dados from "./../models/dados.js";

const { podcasts } = dados;

const getAllPodcasts = (req, res) => {
  const { nome, apresentadores, tema, episodios, duracao, frequencia, ativo } =
    req.query;
};

let resultado = podcasts;

if (tema) {
  resultado = resultado.filter(
    (p) => p.tema.toLowerCase() === tema.toLowerCase()
  );
}

if (plataforma) {
  resultado = resultado.filter(
    (p) => p.plataforma.toLowerCase() === plataforma.toLowerCase()
  );
}

if (frequencia) {
  resultado = resultado.filter(
    (p) => p.frequencia.toLowerCase() === frequencia.toLowerCase()
  );
}

if (duracao > 30 &&) {
    resultado = resultado.filter((p) => p.qtdeVitorias == qtdeVitorias);
  }



