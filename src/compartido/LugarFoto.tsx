// =============================================================================
// Lugar para una foto (provisorio)
// -----------------------------------------------------------------------------
// Mientras no tengamos las fotos, mostramos un recuadro rayado que dice qué foto
// va ahí. Es como el cartelito "acá va el cuadro" en una pared recién pintada.
// Cuando lleguen las fotos, se reemplaza por la imagen real.
// =============================================================================
import './LugarFoto.css'

interface Props {
  /** Qué foto va acá (ej.: "Foto: perro con pretal Laila"). */
  texto: string
  /** Alto del recuadro en píxeles. */
  alto: number
  /** Esquinas redondeadas en píxeles (0 = rectas, para fotos pegadas al borde de una tarjeta). */
  redondeo?: number
}

export function LugarFoto({ texto, alto, redondeo = 20 }: Props) {
  return (
    <div
      className="lugar-foto"
      role="img"
      aria-label={`Lugar para: ${texto}`}
      style={{ height: alto, borderRadius: redondeo }}
    >
      [{texto}]
    </div>
  )
}
