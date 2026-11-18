import { Helmet } from "react-helmet-async";

const NOMBRE_SITIO = "Petals & Co.";
const DESCRIPCION_POR_DEFECTO =
  "Petals & Co. - Tu florería y regalería ideal. Arreglos florales y regalos únicos con envío a domicilio.";

// Título y meta etiquetas dinámicas por página
export default function Seo({
  titulo,
  descripcion = DESCRIPCION_POR_DEFECTO,
  privada = false,
}) {
  const tituloCompleto = titulo
    ? `${titulo} | ${NOMBRE_SITIO}`
    : `${NOMBRE_SITIO} | Florería y Regalería`;

  return (
    <Helmet>
      <title>{tituloCompleto}</title>
      <meta name="description" content={descripcion} />
      <meta property="og:title" content={tituloCompleto} />
      <meta property="og:description" content={descripcion} />
      <meta property="og:type" content="website" />
      {privada && <meta name="robots" content="noindex, nofollow" />}
    </Helmet>
  );
}
