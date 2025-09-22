import dados from "./../models/dados.js";

const { podcasts } = dados;

const getAllPodcasts = (req, res) => {
  let resultado = podcasts;

  const { tema, plataforma, frequencia, duracao } = req.query;

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

  res.status(200).json({
    total: resultado.length,
    podcasts: resultado,
  });
};

const getPodcastsById = (req, res) => {
  const id = parseInt(req.params.id);

  const podcast = podcasts.find((p) => p.id === id);

  if (podcast) {
    res.status(200).json(podcast);
  } else {
    res.status(404).json({
      success: false,
      message: `Podcast com o id: ${id} não encontrado`,
    });
  }
};

export { getAllPodcasts, getPodcastsById };
