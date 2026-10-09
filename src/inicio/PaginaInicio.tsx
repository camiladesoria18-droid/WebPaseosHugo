// =============================================================================
// Página de inicio (diseño aprobado en Claude Design)
// -----------------------------------------------------------------------------
// Está armada en 5 bloques, de arriba hacia abajo:
//   1) Portada: título, lema, foto y botones.
//   2) "Elegí por categoría": una tarjeta por categoría (lleva a su página).
//   3) "Kits completos".
//   4) Franja violeta de Paseos y acompañamiento.
//   5) "Cómo comprar": 3 pasos + aviso de que todo se hace a pedido.
// Todos los precios salen del catálogo: si cambiás un precio en catalogo.json,
// el inicio se actualiza solo.
// =============================================================================
import { Link } from '@tanstack/react-router'
import { useCatalogo } from '../catalogo/useCatalogo'
import { precioDesde, precioDesdeCategoria } from '../catalogo/precios'
import { formatearPrecio } from '../compartido/formato'
import { IconoReloj, IconoWhatsApp } from '../compartido/Iconos'
import { LugarFoto } from '../compartido/LugarFoto'
import './PaginaInicio.css'

export function PaginaInicio() {
  const { data: catalogo, isPending, isError } = useCatalogo()

  if (isPending) return <p className="aviso">Cargando catálogo…</p>
  if (isError) return <p className="aviso aviso-error">No se pudo cargar el catálogo. Probá recargar la página.</p>

  // Preparamos los datos que usa cada bloque
  const enlaceWhatsApp = `https://wa.me/${catalogo.negocio.whatsapp}`
  // Las categorías de producto (Paseos tiene su propia franja, más abajo)
  const categorias = catalogo.categorias.filter((c) => c.id !== 'paseos')
  const kits = catalogo.productos.filter((p) => p.categoria === 'kits')
  const precioPaseo = precioDesdeCategoria(catalogo.productos, 'paseos')
  const envio = catalogo.entrega.find((e) => e.id === 'envio')

  return (
    <main className="inicio">
      {/* ---------- 1) PORTADA ---------- */}
      <section className="contenedor portada">
        <div className="portada-texto">
          <h1>Paseos cómodos, seguros y con estilo</h1>
          <p className="portada-lema">
            Diseños personalizados para mascotas que merecen paseos cómodos, seguros y con estilo. Pretales,
            collares y correas hechos a medida.
          </p>
          <div className="portada-botones">
            {/* El "#" lleva a una parte de esta misma página (la sección con id="categorias") */}
            <a href="#categorias" className="boton boton-principal">
              Ver el catálogo
            </a>
            <Link to="/$categoriaId" params={{ categoriaId: 'paseos' }} className="boton boton-borde">
              Contratar un paseo
            </Link>
          </div>
        </div>
        <LugarFoto texto="Foto: perro con pretal Laila" alto={420} />
      </section>

      {/* ---------- 2) ELEGÍ POR CATEGORÍA ---------- */}
      <section id="categorias" className="contenedor seccion">
        <h2>Elegí por categoría</h2>
        <ul className="grilla grilla-categorias">
          {categorias.map((categoria) => (
            <li key={categoria.id}>
              <Link to="/$categoriaId" params={{ categoriaId: categoria.id }} className="tarjeta">
                <LugarFoto texto={`Foto ${categoria.nombre}`} alto={150} redondeo={0} />
                <div className="tarjeta-cuerpo">
                  <h3>{categoria.nombre}</h3>
                  {categoria.detalle && <p>{categoria.detalle}</p>}
                  <p className="precio">
                    Desde {formatearPrecio(precioDesdeCategoria(catalogo.productos, categoria.id))}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- 3) KITS COMPLETOS ---------- */}
      <section className="contenedor seccion">
        <h2>Kits completos</h2>
        <p className="seccion-bajada">Collar, pretal y correa en un solo lugar.</p>
        <ul className="grilla grilla-kits">
          {kits.map((kit) => (
            <li key={kit.id}>
              <Link to="/$categoriaId" params={{ categoriaId: 'kits' }} className="tarjeta tarjeta-kit">
                <LugarFoto texto={`Foto ${kit.nombre}`} alto={200} />
                <div className="tarjeta-titulo">
                  <h3>{kit.nombre}</h3>
                  {kit.colores === 'solo-negro' && <span className="etiqueta">Solo en negro</span>}
                </div>
                <p>{kit.descripcion}</p>
                <p className="precio">Desde {formatearPrecio(precioDesde(kit))}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- 4) FRANJA DE PASEOS ---------- */}
      <section className="franja-paseos">
        <div className="contenedor franja-paseos-fila">
          <div className="franja-paseos-texto">
            <h2>Paseos y acompañamiento</h2>
            <p>Paseos, acompañamiento al veterinario o a la peluquería, y paseos personalizados.</p>
            <p className="franja-paseos-precio">
              {formatearPrecio(precioPaseo)} <span>por hora</span>
            </p>
          </div>
          <div className="franja-paseos-contacto">
            <p>¿Querés coordinar un paseo? Contanos día, horario y qué necesita tu perro.</p>
            <a href={enlaceWhatsApp} target="_blank" rel="noreferrer" className="boton boton-claro">
              <IconoWhatsApp tamano={20} />
              Escribinos por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ---------- 5) CÓMO COMPRAR ---------- */}
      <section id="como-comprar" className="contenedor seccion">
        <h2>Cómo comprar</h2>
        <ol className="grilla grilla-pasos">
          <li className="paso">
            <span className="paso-numero">1</span>
            <strong>Elegí y personalizá</strong>
            <span>Talle, tipo y color de cinta. El nombre y el teléfono de tu perro los coordinamos por WhatsApp.</span>
          </li>
          <li className="paso">
            <span className="paso-numero">2</span>
            <strong>Armá tu carrito</strong>
            <span>
              Envío a domicilio en Paraná {envio ? formatearPrecio(envio.precio) : ''}, o retiro / punto de
              encuentro sin cargo.
            </span>
          </li>
          <li className="paso">
            <span className="paso-numero">3</span>
            <strong>Enviá el pedido por WhatsApp</strong>
            <span>Te respondemos para coordinar el pago y la entrega.</span>
          </li>
        </ol>

        {/* Aviso: todo se hace a pedido */}
        <div className="aviso-pedido" role="note">
          <IconoReloj />
          <p>
            <strong>Todos los productos se hacen por encargue.</strong> La demora aproximada es de{' '}
            <strong>2 semanas</strong>. Antes de pagar,{' '}
            <a href={enlaceWhatsApp} target="_blank" rel="noreferrer">
              consultá disponibilidad por WhatsApp
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  )
}
