import dados from "./../models/dados.js";

const { podcasts } = dados;

const getAllPodcasts = (req, res) => {
  let resultado = podcasts;

  res.status(200).json({
    total: resultado.length,
    podcasts: resultado
  })



  if (resultado.lenght > 0) {
    res.status(200).json({
      total: resultado.length,
      podcasts: resultado,
    });
  } else {
    res.status(400).json({
      success: false,
      message: `Podcasts não encontrados`,
    });
  }
};

export { getAllPodcasts };