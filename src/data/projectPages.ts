export interface ProjectPageCard {
  variant: string;
  src: string;
  alt: string;
}

export interface ProjectPageScene {
  className: string;
  dataScene: string;
  title?: string;
  subtitle?: string;
  text?: string;
  cards?: ProjectPageCard[];
}

export interface ProjectPageHero {
  src: string;
  backgroundSize: string;
  backgroundPosition: string;
  backgroundRepeat: string;
}

export interface ProjectPage {
  id: string;
  name: string;
  hero: ProjectPageHero;
  scenes: ProjectPageScene[];
  lightboxImages: Array<{ src: string; alt: string }>;
}

export const projectPages: ProjectPage[] = [
  {
    "id": "cedahause",
    "name": "CeDa Hause",
    "hero": {
      "src": "/img/cedahause/cedahause-exterior-hero-oeste.webp",
      "backgroundSize": "cover",
      "backgroundPosition": "center",
      "backgroundRepeat": "no-repeat"
    },
    "scenes": [
      {
        "className": "scene-intro",
        "dataScene": "intro",
        "title": "Habitar la pendiente sin tocarla"
      },
      {
        "className": "scene-divider",
        "dataScene": "hero-copy",
        "subtitle": "Proyecto Cedahause: Una respuesta arquitectonica a la topografia.",
        "text": "El cliente nos planteo un desafio complejo: construir en la ladera sin modificar su naturaleza original. Nuestra respuesta fue despegar la vivienda del suelo. Al elevar la estructura sobre pilotes, garantizamos las mejores vistas del valle y permitimos que el drenaje natural de la sierra siga su curso bajo la casa, logrando que la arquitectura se pose con respeto sobre el paisaje."
      },
      {
        "className": "scene-details",
        "dataScene": "triptico-1-fotos",
        "cards": [
          {
            "variant": "square",
            "src": "/img/cedahause/cedahause-exterior-relacion.webp",
            "alt": "Revestimiento vertical con tonos oxidados en Cedahause"
          },
          {
            "variant": "square",
            "src": "/img/cedahause/cedahause-exterior-voladisos.webp",
            "alt": "Estructura de hormigon visto en Cedahause"
          },
          {
            "variant": "square",
            "src": "/img/cedahause/cedahause-exterior-sur.webp",
            "alt": "Pilotes elevando la vivienda en Cedahause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "triptico-1",
        "subtitle": "Materia que dialoga con el entorno",
        "text": "Para responder al deseo de una casa duradera que se mimetizara con el sitio, seleccionamos una paleta de materiales honestos. Combinamos la crudeza estructural del hormigon armado (seguridad y soporte) con un revestimiento de tonos oxidados que actua como una segunda piel. Esta eleccion tecnica asegura un bajo mantenimiento y permite que la obra envejezca al mismo ritmo visual que la piedra y los pastizales de la sierra."
      },
      {
        "className": "scene-space",
        "dataScene": "panoramica-1-foto",
        "cards": [
          {
            "variant": "wide",
            "src": "/img/cedahause/cedahause-panoramica-frente.webp",
            "alt": "Puente vidriado sobre el terreno en Cedahause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "panoramica-1",
        "subtitle": "Una transicion sensorial",
        "text": "El nexo entre el area social y la privada debia ser mas que un pasillo. Disenamos un puente de cristal que suspende al habitante sobre el terreno. Al cruzarlo, el sonido del agua bajo la estructura y la transparencia total recuerdan constantemente que se esta viviendo inmerso en la naturaleza, cumpliendo el deseo del cliente de conexion total."
      },
      {
        "className": "scene-details",
        "dataScene": "triptico-2-fotos",
        "cards": [
          {
            "variant": "square",
            "src": "/img/cedahause/cedahause-living.webp",
            "alt": "Salon con chimenea en Cedahause"
          },
          {
            "variant": "square",
            "src": "/img/cedahause/cedahause-comedor.webp",
            "alt": "Comedor con gran ventanal en Cedahause"
          },
          {
            "variant": "square",
            "src": "/img/cedahause/cedahause-quincho.webp",
            "alt": "Quincho exterior en Cedahause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "triptico-2",
        "subtitle": "Vida social sin fronteras",
        "text": "El objetivo era borrar los limites entre el \"adentro\" y el \"afuera\". Logramos esto mediante una planta libre que fluye desde la calidez del hogar a lena hacia la apertura total de la galeria. La arquitectura actua aqui como un marco invisible, permitiendo que la vida familiar y las reuniones sociales tengan siempre a la sierra como protagonista de fondo."
      },
      {
        "className": "scene-space",
        "dataScene": "panoramica-2-foto",
        "cards": [
          {
            "variant": "wide",
            "src": "/img/cedahause/cedahause-cocina-1panoramica.webp",
            "alt": "Cocina con ventana horizontal en Cedahause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "panoramica-2",
        "subtitle": "Conectar la rutina con el horizonte",
        "text": "Para evitar el encierro en las tareas domesticas, reemplazamos los muros ciegos tradicionales por una sustraccion horizontal estrategica. Esta \"raja\" visual sobre la mesada integra la luz y el paisaje a la cocina, transformando la funcionalidad diaria en una experiencia contemplativa."
      },
      {
        "className": "scene-details",
        "dataScene": "triptico-3-fotos",
        "cards": [
          {
            "variant": "square",
            "src": "/img/cedahause/cedahause-dormitorio-vestido3.webp",
            "alt": "Dormitorio principal al atardecer en Cedahause"
          },
          {
            "variant": "square",
            "src": "/img/cedahause/cedahause-bano-ducha2.webp",
            "alt": "Bano con ducha tipo spa en Cedahause"
          },
          {
            "variant": "square",
            "src": "/img/cedahause/cedahause-dormitorio-vestido.webp",
            "alt": "Vestidor integrado en Cedahause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "triptico-3",
        "subtitle": "La arquitectura del descanso",
        "text": "En el sector privado, la prioridad del cliente era la desconexion mental y el orden. Respondimos con espacios de lineas puras y texturas suaves. Desde la orientacion de la cama hacia la calma del valle, hasta el diseno tipo spa de los banos y el guardado oculto en los muros, todo esta calculado para reducir el ruido visual y propiciar un descanso profundo."
      }
    ],
    "lightboxImages": [
      {
        "src": "/img/cedahause/cedahause-exterior-hero-oeste.webp",
        "alt": "Hero CeDa Hause"
      },
      {
        "src": "/img/cedahause/cedahause-exterior-relacion.webp",
        "alt": "Revestimiento vertical con tonos oxidados en Cedahause"
      },
      {
        "src": "/img/cedahause/cedahause-exterior-voladisos.webp",
        "alt": "Estructura de hormigon visto en Cedahause"
      },
      {
        "src": "/img/cedahause/cedahause-exterior-sur.webp",
        "alt": "Pilotes elevando la vivienda en Cedahause"
      },
      {
        "src": "/img/cedahause/cedahause-panoramica-frente.webp",
        "alt": "Puente vidriado sobre el terreno en Cedahause"
      },
      {
        "src": "/img/cedahause/cedahause-living.webp",
        "alt": "Salon con chimenea en Cedahause"
      },
      {
        "src": "/img/cedahause/cedahause-comedor.webp",
        "alt": "Comedor con gran ventanal en Cedahause"
      },
      {
        "src": "/img/cedahause/cedahause-quincho.webp",
        "alt": "Quincho exterior en Cedahause"
      },
      {
        "src": "/img/cedahause/cedahause-cocina-1panoramica.webp",
        "alt": "Cocina con ventana horizontal en Cedahause"
      },
      {
        "src": "/img/cedahause/cedahause-dormitorio-vestido3.webp",
        "alt": "Dormitorio principal al atardecer en Cedahause"
      },
      {
        "src": "/img/cedahause/cedahause-bano-ducha2.webp",
        "alt": "Bano con ducha tipo spa en Cedahause"
      },
      {
        "src": "/img/cedahause/cedahause-dormitorio-vestido.webp",
        "alt": "Vestidor integrado en Cedahause"
      }
    ]
  },
  {
    "id": "donahause",
    "name": "DoNa Hause",
    "hero": {
      "src": "/img/donahause/donahause-exterior-hero-este.webp",
      "backgroundSize": "cover",
      "backgroundPosition": "center",
      "backgroundRepeat": "no-repeat"
    },
    "scenes": [
      {
        "className": "scene-intro",
        "dataScene": "intro",
        "title": "Tradición con carácter propio"
      },
      {
        "className": "scene-divider",
        "dataScene": "hero-copy",
        "subtitle": "Proyecto Donahause: Cuando el estilo campo se llena de luz y color.",
        "text": "El cliente buscaba la calidez de una casa tradicional —techo a dos aguas, basamento, galerías y madera— pero con interiores luminosos y actuales. La respuesta fue conservar una silueta reconocible hacia el paisaje y, al mismo tiempo, abrir la casa a la luz: grandes paños vidriados y espacios generosos que hacen que lo clásico se sienta liviano y habitable."
      },
      {
        "className": "scene-details",
        "dataScene": "triptico-1-fotos",
        "cards": [
          {
            "variant": "square",
            "src": "/img/donahause/donahause-exterior-hero-norte.webp",
            "alt": "Basamento de piedra y revoque de tierra en Donahause"
          },
          {
            "variant": "square",
            "src": "/img/donahause/donahause-esterior-galeria.webp",
            "alt": "Galeria blanca techada en Donahause"
          },
          {
            "variant": "square",
            "src": "/img/donahause/donahause-exterior-detalle.webp",
            "alt": "Detalle exterior en Donahause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "triptico-1",
        "subtitle": "Lo que la ancla y lo que la sostiene.",
        "text": "La casa construye su identidad desde tres gestos complementarios: un basamento mineral que la arraiga al terreno, una galería como espacio intermedio que ordena el vivir cotidiano, y una estructura de madera expuesta que aporta ritmo, escala y calidez. Tradición, sí, pero con aire y luz como materia principal."
      },
      {
        "className": "scene-space",
        "dataScene": "panoramica-1-foto",
        "cards": [
          {
            "variant": "wide",
            "src": "/img/donahause/donahause-panoramica-living-pasillo.webp",
            "alt": "Salon rojo con pasillo y doble altura en Donahause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "panoramica-1",
        "subtitle": "Volumen y temperatura",
        "text": "El reto era que la doble altura no se sintiera fría. La solución fue trabajar el “calor” desde el fondo del espacio: un plano protagonista de color rojo terracota y la presencia del hogar, que ordenan la escena y acercan visualmente la escala. La luz entra en abundancia, pero el ambiente se percibe contenido y cálido: un lugar hecho para reunirse."
      },
      {
        "className": "scene-details",
        "dataScene": "triptico-2-fotos",
        "cards": [
          {
            "variant": "square",
            "src": "/img/donahause/donahause-comedor-living.webp",
            "alt": "Comedor y living en Donahause"
          },
          {
            "variant": "square",
            "src": "/img/donahause/donahause-cocina.webp",
            "alt": "Cocina en Donahause"
          },
          {
            "variant": "square",
            "src": "/img/donahause/donahause-ingreso.interior.webp",
            "alt": "Ingreso interior en Donahause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "triptico-2",
        "subtitle": "Identidad sin cortes.",
        "text": "En vez de compartimentar, la casa organiza la convivencia con recursos sutiles: el color zonifica y crea atmósferas propias, el piso actúa como hilo conductor que cose los ambientes, y las aberturas enmarcan el verde para que el paisaje sea parte activa del interior. Un mismo lenguaje, tres intensidades."
      },
      {
        "className": "scene-space",
        "dataScene": "panoramica-2-foto",
        "cards": [
          {
            "variant": "wide",
            "src": "/img/donahause/Donahause-exterior-sur (2).webp",
            "alt": "Exterior sur de Donahause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "panoramica-2",
        "subtitle": "Una silueta clásica, una casa abierta",
        "text": "Desde el exterior, la casa se reconoce por su morfología tradicional y su implantación franca en el terreno. Esa calma es el marco para una vivienda pensada para vivirla con luz, con transiciones cubiertas y con una relación directa con el jardín."
      },
      {
        "className": "scene-details",
        "dataScene": "triptico-3-fotos",
        "cards": [
          {
            "variant": "square",
            "src": "/img/donahause/donahause-bano2-banera.webp",
            "alt": "Bano con banera y ventana en Donahause"
          },
          {
            "variant": "square",
            "src": "/img/donahause/donahause-quincho-b.webp",
            "alt": "Quincho en Donahause"
          },
          {
            "variant": "square",
            "src": "/img/donahause/donahause-bano-principal.webp",
            "alt": "Bano principal en Donahause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "triptico-3",
        "subtitle": "Intimidad luminosa.",
        "text": "Incluso en los espacios más privados, la casa sostiene la misma premisa: luz natural, proporciones amables y materiales que envejecen bien. La bañera se ubica donde el día acompaña, los paños altos llevan la mirada hacia arriba para “ganar cielo”, y las terminaciones robustas aseguran un confort durable, sin estridencias."
      }
    ],
    "lightboxImages": [
      {
        "src": "/img/donahause/donahause-exterior-hero-este.webp",
        "alt": "Hero DoNa Hause"
      },
      {
        "src": "/img/donahause/donahause-exterior-hero-norte.webp",
        "alt": "Basamento de piedra y revoque de tierra en Donahause"
      },
      {
        "src": "/img/donahause/donahause-esterior-galeria.webp",
        "alt": "Galeria blanca techada en Donahause"
      },
      {
        "src": "/img/donahause/donahause-exterior-detalle.webp",
        "alt": "Detalle exterior en Donahause"
      },
      {
        "src": "/img/donahause/donahause-panoramica-living-pasillo.webp",
        "alt": "Salon rojo con pasillo y doble altura en Donahause"
      },
      {
        "src": "/img/donahause/donahause-comedor-living.webp",
        "alt": "Comedor y living en Donahause"
      },
      {
        "src": "/img/donahause/donahause-cocina.webp",
        "alt": "Cocina en Donahause"
      },
      {
        "src": "/img/donahause/donahause-ingreso.interior.webp",
        "alt": "Ingreso interior en Donahause"
      },
      {
        "src": "/img/donahause/Donahause-exterior-sur (2).webp",
        "alt": "Exterior sur de Donahause"
      },
      {
        "src": "/img/donahause/donahause-bano2-banera.webp",
        "alt": "Bano con banera y ventana en Donahause"
      },
      {
        "src": "/img/donahause/donahause-quincho-b.webp",
        "alt": "Quincho en Donahause"
      },
      {
        "src": "/img/donahause/donahause-bano-principal.webp",
        "alt": "Bano principal en Donahause"
      }
    ]
  },
  {
    "id": "gadehause",
    "name": "GaDe Hause",
    "hero": {
      "src": "/img/gadehause/gadehause-exterior-norte.webp",
      "backgroundSize": "100% auto",
      "backgroundPosition": "center",
      "backgroundRepeat": "no-repeat"
    },
    "scenes": [
      {
        "className": "scene-intro",
        "dataScene": "intro",
        "title": "Racionalismo anclado a la tierra"
      },
      {
        "className": "scene-divider",
        "dataScene": "hero-copy",
        "subtitle": "Cuando la geometría pura se encuentra con la topografía.",
        "text": "El terreno en pendiente exigía una base sólida, mientras que el cliente deseaba ligereza visual. Nuestra respuesta fue apoyar los volúmenes blancos y abstractos sobre un zócalo de piedra rústica, logrando que la casa se sienta etérea en su planta noble pero firmemente arraigada al suelo."
      },
      {
        "className": "scene-details",
        "dataScene": "triptico-1-fotos",
        "cards": [
          {
            "variant": "square",
            "src": "/img/gadehause/gadehause-exterior-sur.webp",
            "alt": "Exterior sur de Gadehause"
          },
          {
            "variant": "square",
            "src": "/img/gadehause/gadehause-exterior-este.webp",
            "alt": "Detalle de Gadehause"
          },
          {
            "variant": "square",
            "src": "/img/gadehause/gadehause-exterior-oeste.webp",
            "alt": "Detalle de Gadehause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "triptico-1",
        "subtitle": "La calidez dentro de la abstracción",
        "text": "El desafío del minimalismo es evitar que la obra se sienta fría. Para contrarrestarlo, trabajamos con una tríada de texturas: la piedra que ancla la casa al sitio, la madera en el acceso para dar una bienvenida cálida y los detalles técnicos en negro para subrayar el orden y dibujar ritmo sobre el lienzo blanco."
      },
      {
        "className": "scene-space",
        "dataScene": "panoramica-1-foto",
        "cards": [
          {
            "variant": "wide",
            "src": "/img/gadehause/gadehause-living-comedor.webp",
            "alt": "Estar y comedor integrado en Gadehause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "panoramica-1",
        "subtitle": "Convivencia sin barreras",
        "text": "La premisa fue integrar la vida familiar en un único gran ambiente. Eliminamos tabiques para que estar y comedor compartan un mismo flujo de luz, con la chimenea como pieza de referencia que ordena la escena. Los ventanales de piso a techo amplían la percepción del espacio y conectan directamente con el deck exterior, haciendo que el límite entre adentro y afuera se vuelva continuo."
      },
      {
        "className": "scene-details",
        "dataScene": "triptico-2-fotos",
        "cards": [
          {
            "variant": "square",
            "src": "/img/gadehause/gadehause-living-comedor1.webp",
            "alt": "Living y comedor en Gadehause"
          },
          {
            "variant": "square",
            "src": "/img/gadehause/gadehause-cocina.webp",
            "alt": "Cocina en Gadehause"
          },
          {
            "variant": "square",
            "src": "/img/gadehause/gadehause-escritorio.webp",
            "alt": "Escritorio en Gadehause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "triptico-2",
        "subtitle": "Rincones con propósito",
        "text": "Dentro de la planta abierta, cada función reclama su identidad mediante el diseño. Zonificamos la cocina con un bloque negro audaz, organizamos la verticalidad con la escalera y el vacío de doble altura, y diseñamos espacios de trabajo perimetrales que aprovechan las vistas para fomentar la concentración sin necesidad de encierro."
      },
      {
        "className": "scene-space",
        "dataScene": "panoramica-2-foto",
        "cards": [
          {
            "variant": "wide",
            "src": "/img/gadehause/gadehause-pileta-portal.webp",
            "alt": "Piscina y exterior en Gadehause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "panoramica-2",
        "subtitle": "El agua como espejo",
        "text": "La piscina no se diseñó como un elemento aislado, sino integrada a la arquitectura. Al estar pegada al deck, funciona como un espejo de agua que refleja la casa y aporta frescura a la experiencia de la galería, expandiendo la sensación de relax hacia el interior."
      },
      {
        "className": "scene-details",
        "dataScene": "triptico-3-fotos",
        "cards": [
          {
            "variant": "square",
            "src": "/img/gadehause/gadehause-dormitorio.webp",
            "alt": "Detalle de Gadehause"
          },
          {
            "variant": "square",
            "src": "/img/gadehause/gadehause-bano-principal.webp",
            "alt": "Baño principal en Gadehause"
          },
          {
            "variant": "square",
            "src": "/img/gadehause/gadehause-dormitorio2.webp",
            "alt": "Tocador y detalles en Gadehause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "triptico-3",
        "subtitle": "Limpieza mental",
        "text": "En el sector privado, interpretamos el descanso como la ausencia de ruido visual. Diseñamos espacios donde la luz natural y las vistas enmarcadas son las protagonistas, creando una atmósfera de spa y desconexión absoluta mediante materiales nobles y líneas puras."
      }
    ],
    "lightboxImages": [
      {
        "src": "/img/gadehause/gadehause-exterior-norte.webp",
        "alt": "Hero GaDe Hause"
      },
      {
        "src": "/img/gadehause/gadehause-exterior-sur.webp",
        "alt": "Exterior sur de Gadehause"
      },
      {
        "src": "/img/gadehause/gadehause-exterior-este.webp",
        "alt": "Detalle de Gadehause"
      },
      {
        "src": "/img/gadehause/gadehause-exterior-oeste.webp",
        "alt": "Detalle de Gadehause"
      },
      {
        "src": "/img/gadehause/gadehause-living-comedor.webp",
        "alt": "Estar y comedor integrado en Gadehause"
      },
      {
        "src": "/img/gadehause/gadehause-living-comedor1.webp",
        "alt": "Living y comedor en Gadehause"
      },
      {
        "src": "/img/gadehause/gadehause-cocina.webp",
        "alt": "Cocina en Gadehause"
      },
      {
        "src": "/img/gadehause/gadehause-escritorio.webp",
        "alt": "Escritorio en Gadehause"
      },
      {
        "src": "/img/gadehause/gadehause-pileta-portal.webp",
        "alt": "Piscina y exterior en Gadehause"
      },
      {
        "src": "/img/gadehause/gadehause-dormitorio.webp",
        "alt": "Detalle de Gadehause"
      },
      {
        "src": "/img/gadehause/gadehause-bano-principal.webp",
        "alt": "Baño principal en Gadehause"
      },
      {
        "src": "/img/gadehause/gadehause-dormitorio2.webp",
        "alt": "Tocador y detalles en Gadehause"
      }
    ]
  },
  {
    "id": "jobehause",
    "name": "JoBe Hause",
    "hero": {
      "src": "/img/jobehause/jobehause-exterior-frente-hero (2).webp",
      "backgroundSize": "cover",
      "backgroundPosition": "center",
      "backgroundRepeat": "no-repeat"
    },
    "scenes": [
      {
        "className": "scene-intro",
        "dataScene": "intro",
        "title": "Clasicismo atemporal"
      },
      {
        "className": "scene-divider",
        "dataScene": "hero-copy",
        "subtitle": "Cuando la arquitectura busca pertenecer al paisaje para siempre.",
        "text": "El pedido no era “moderno”: era permanencia. Una casa que se sintiera heredable, con reglas claras de composición y una presencia tranquila. Tradujimos ese deseo en un lenguaje reconocible —proporciones, jerarquía de acceso, cubiertas protectoras— y lo equilibramos con confort actual: luz, ventilación y transiciones generosas entre interior y exterior."
      },
      {
        "className": "scene-details",
        "dataScene": "triptico-1-fotos",
        "cards": [
          {
            "variant": "square",
            "src": "/img/jobehause/jobehause-exterior-norte (2).webp",
            "alt": "Exterior norte de Jobehause"
          },
          {
            "variant": "square",
            "src": "/img/jobehause/jobehause-exterior-entrada1.webp",
            "alt": "Ingreso exterior de Jobehause"
          },
          {
            "variant": "square",
            "src": "/img/jobehause/jobehause-exterior-oeste (2).webp",
            "alt": "Basamento y volumen en Jobehause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "triptico-1",
        "subtitle": "La elegancia de lo formal",
        "text": "Lo “señorial” no se logra agregando ornamento: se logra con orden. Definimos una composición con jerarquía clara (acceso, basamento, cubierta) y repetición controlada de elementos para construir simetría y calma. Las galerías profundas no son un gesto estético: son el dispositivo que hace habitable el borde de la casa, regula el sol y convierte la fachada en un lugar, no en una pared."
      },
      {
        "className": "scene-space",
        "dataScene": "panoramica-1-foto",
        "cards": [
          {
            "variant": "wide",
            "src": "/img/jobehause/jobehause-comedor-comedor.webp",
            "alt": "Gran salón en Jobehause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "panoramica-1",
        "subtitle": "Escala monumental y calidez",
        "text": "El desafío fue que un gran ambiente no se sintiera impersonal. Trabajamos con “escala percibida”: altura donde hace falta aire y ceremonia; materialidad y estructura visibles donde hace falta abrigo. La lógica constructiva se vuelve parte del carácter del espacio: no decora, explica cómo la casa se sostiene y, a la vez, hace que lo grande se sienta cercano."
      },
      {
        "className": "scene-details",
        "dataScene": "triptico-2-fotos",
        "cards": [
          {
            "variant": "square",
            "src": "/img/jobehause/jobehause-living-21.webp",
            "alt": "Living en Jobehause"
          },
          {
            "variant": "square",
            "src": "/img/jobehause/jobehause-cocina (3).webp",
            "alt": "Detalle de cocina en Jobehause"
          },
          {
            "variant": "square",
            "src": "/img/jobehause/jobehause-living1.webp",
            "alt": "Living en Jobehause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "triptico-2",
        "subtitle": "Tradición en los detalles",
        "text": "La identidad interior debía resistir el tiempo, no las tendencias. Elegimos una paleta y un conjunto de materiales que envejecen bien y se pueden mantener sin perder dignidad. Los muebles fijos y las piezas “de casa” (guardado, vajillero, hogar) se diseñaron como arquitectura: proporción, encuentros y textura. Esa decisión le da continuidad al lenguaje clásico sin caer en lo escenográfico."
      },
      {
        "className": "scene-space",
        "dataScene": "panoramica-2-foto",
        "cards": [
          {
            "variant": "wide",
            "src": "/img/jobehause/jobehause-dormitorio-panoramica2-2.webp",
            "alt": "Dormitorio panoramico en Jobehause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "panoramica-2",
        "subtitle": "Enmarcar la naturaleza",
        "text": "El paisaje no se “muestra”: se compone. Ubicamos los grandes paños donde el cuerpo realmente descansa, y diseñamos esos lugares como pausas del recorrido. La casa no compite con el entorno; lo edita. En esos puntos, el interior se vuelve silencioso para que lo protagonista sea la profundidad del verde y el cambio de luz durante el día."
      },
      {
        "className": "scene-details",
        "dataScene": "triptico-3-fotos",
        "cards": [
          {
            "variant": "square",
            "src": "/img/jobehause/jobehause-bano-12.webp",
            "alt": "Baño en Jobehause"
          },
          {
            "variant": "square",
            "src": "/img/jobehause/jobehause-bano-2 (9).webp",
            "alt": "Baño en Jobehause"
          },
          {
            "variant": "square",
            "src": "/img/jobehause/jobehause-bano-11.webp",
            "alt": "Baño en Jobehause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "triptico-3",
        "subtitle": "Sobriedad luminosa",
        "text": "En baños y servicios la consigna fue claridad y control. Materiales claros, superficies legibles, detalles que facilitan mantenimiento y uso cotidiano. Es la parte “hotelera” de la casa: todo funciona, todo se limpia fácil, todo se siente ordenado. Esa sobriedad no contradice el neoclásico/country: lo actualiza, evitando que lo clásico dependa del exceso."
      }
    ],
    "lightboxImages": [
      {
        "src": "/img/jobehause/jobehause-exterior-frente-hero (2).webp",
        "alt": "Hero JoBe Hause"
      },
      {
        "src": "/img/jobehause/jobehause-exterior-norte (2).webp",
        "alt": "Exterior norte de Jobehause"
      },
      {
        "src": "/img/jobehause/jobehause-exterior-entrada1.webp",
        "alt": "Ingreso exterior de Jobehause"
      },
      {
        "src": "/img/jobehause/jobehause-exterior-oeste (2).webp",
        "alt": "Basamento y volumen en Jobehause"
      },
      {
        "src": "/img/jobehause/jobehause-comedor-comedor.webp",
        "alt": "Gran salón en Jobehause"
      },
      {
        "src": "/img/jobehause/jobehause-living-21.webp",
        "alt": "Living en Jobehause"
      },
      {
        "src": "/img/jobehause/jobehause-cocina (3).webp",
        "alt": "Detalle de cocina en Jobehause"
      },
      {
        "src": "/img/jobehause/jobehause-living1.webp",
        "alt": "Living en Jobehause"
      },
      {
        "src": "/img/jobehause/jobehause-dormitorio-panoramica2-2.webp",
        "alt": "Dormitorio panoramico en Jobehause"
      },
      {
        "src": "/img/jobehause/jobehause-bano-12.webp",
        "alt": "Baño en Jobehause"
      },
      {
        "src": "/img/jobehause/jobehause-bano-2 (9).webp",
        "alt": "Baño en Jobehause"
      },
      {
        "src": "/img/jobehause/jobehause-bano-11.webp",
        "alt": "Baño en Jobehause"
      }
    ]
  },
  {
    "id": "jomahause",
    "name": "JoMa Hause",
    "hero": {
      "src": "/img/jomahause/jomahause-exterior-hero.webp",
      "backgroundSize": "cover",
      "backgroundPosition": "center",
      "backgroundRepeat": "no-repeat"
    },
    "scenes": [
      {
        "className": "scene-intro",
        "dataScene": "intro",
        "title": "Arcos que reciben, fuego que reúne"
      },
      {
        "className": "scene-divider",
        "dataScene": "hero-copy",
        "subtitle": "Presencia clásica, vida tranquila.",
        "text": "Una fachada simétrica y contenida que no intenta impresionar por exceso, sino por proporción y carácter. El pórtico con arcos marca el gesto de bienvenida y anticipa un interior cálido, de escala doméstica y tiempos lentos. La identidad del proyecto nace de entender qué debía sentirse “hogar” antes que “casa”."
      },
      {
        "className": "scene-details",
        "dataScene": "triptico-1-fotos",
        "cards": [
          {
            "variant": "square",
            "src": "/img/jomahause/jomahause-exterior-entrada.webp",
            "alt": "Exterior de acceso en Jomahause"
          },
          {
            "variant": "square",
            "src": "/img/jomahause/jomahause-entrada.webp",
            "alt": "Ingreso en Jomahause"
          },
          {
            "variant": "square",
            "src": "/img/jomahause/jomahause-living.webp",
            "alt": "Estar en Jomahause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "triptico-1",
        "subtitle": "Del umbral al estar: una secuencia que baja el ritmo.",
        "text": "El recorrido se diseña como transición: del exterior al pórtico, del pórtico a un interior que abraza. La casa trabaja con capas (sombra, espesor, cambio de luz) para que la llegada no sea un golpe, sino un pasaje."
      },
      {
        "className": "scene-space",
        "dataScene": "panoramica-1-foto",
        "cards": [
          {
            "variant": "wide",
            "src": "/img/jomahause/jomahause-cocina-comedor-panoramica.webp",
            "alt": "Cocina y comedor en Jomahause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "panoramica-1",
        "subtitle": "La casa sucede alrededor de la mesa.",
        "text": "Este proyecto se apoya en lo cotidiano como motor: cocinar, conversar, resolver el día sin solemnidad. El lenguaje clásico no rigidiza; al contrario, sostiene un uso real, repetible y cómodo. Cuando el cliente pide “calidez” y “vida”, la respuesta está en estas decisiones de escala, vínculo y funcionalidad."
      },
      {
        "className": "scene-details",
        "dataScene": "triptico-2-fotos",
        "cards": [
          {
            "variant": "square",
            "src": "/img/jomahause/jomahause-dormitorio.webp",
            "alt": "Dormitorio en Jomahause"
          },
          {
            "variant": "square",
            "src": "/img/jomahause/jomahause-escritorio.webp",
            "alt": "Escritorio en Jomahause"
          },
          {
            "variant": "square",
            "src": "/img/jomahause/jomahause-living-2.webp",
            "alt": "Estar en Jomahause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "triptico-2",
        "subtitle": "Ambientes con carácter, sin perder calma.",
        "text": "La casa equilibra sociabilidad y refugio: espacios para reunirse y espacios para concentrarse o descansar. El proyecto prioriza confort real (luz, privacidad, acústica doméstica) por encima del gesto. Se percibe una arquitectura que acompaña hábitos, no que obliga a vivirla de una sola manera."
      },
      {
        "className": "scene-space",
        "dataScene": "panoramica-2-foto",
        "cards": [
          {
            "variant": "wide",
            "src": "/img/jomahause/jomahause-quincho-comedor-panoramica.webp",
            "alt": "Quincho y comedor en Jomahause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "panoramica-2",
        "subtitle": "La extensión natural de la vida social.",
        "text": "El “afuera” no es decorado: es un ambiente más, pensado para encuentros largos y sin esfuerzo logístico. La clave está en la continuidad entre interior y jardín, y en una atmósfera que sostiene conversación, comida y sobremesa. Esto es diseño orientado a uso: entender cómo se celebra y construirlo."
      },
      {
        "className": "scene-details",
        "dataScene": "triptico-3-fotos",
        "cards": [
          {
            "variant": "square",
            "src": "/img/jomahause/jomahause-bano-bacha.webp",
            "alt": "Baño en Jomahause"
          },
          {
            "variant": "square",
            "src": "/img/jomahause/jomahause-cocina.webp",
            "alt": "Cocina en Jomahause"
          },
          {
            "variant": "square",
            "src": "/img/jomahause/jomahause-bano-banera.webp",
            "alt": "Baño en Jomahause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "triptico-3",
        "subtitle": "Confort discreto y oficio.",
        "text": "La identidad final se construye en lo que se toca y se usa: un rincón de fuego, un baño que se siente cuidado, terminaciones que no gritan pero duran. Son decisiones que vuelven confiable al proyecto y coherente el relato del habitar. La calidad aparece como consecuencia de una lectura precisa del deseo del cliente."
      }
    ],
    "lightboxImages": [
      {
        "src": "/img/jomahause/jomahause-exterior-hero.webp",
        "alt": "Hero JoMa Hause"
      },
      {
        "src": "/img/jomahause/jomahause-exterior-entrada.webp",
        "alt": "Exterior de acceso en Jomahause"
      },
      {
        "src": "/img/jomahause/jomahause-entrada.webp",
        "alt": "Ingreso en Jomahause"
      },
      {
        "src": "/img/jomahause/jomahause-living.webp",
        "alt": "Estar en Jomahause"
      },
      {
        "src": "/img/jomahause/jomahause-cocina-comedor-panoramica.webp",
        "alt": "Cocina y comedor en Jomahause"
      },
      {
        "src": "/img/jomahause/jomahause-dormitorio.webp",
        "alt": "Dormitorio en Jomahause"
      },
      {
        "src": "/img/jomahause/jomahause-escritorio.webp",
        "alt": "Escritorio en Jomahause"
      },
      {
        "src": "/img/jomahause/jomahause-living-2.webp",
        "alt": "Estar en Jomahause"
      },
      {
        "src": "/img/jomahause/jomahause-quincho-comedor-panoramica.webp",
        "alt": "Quincho y comedor en Jomahause"
      },
      {
        "src": "/img/jomahause/jomahause-bano-bacha.webp",
        "alt": "Baño en Jomahause"
      },
      {
        "src": "/img/jomahause/jomahause-cocina.webp",
        "alt": "Cocina en Jomahause"
      },
      {
        "src": "/img/jomahause/jomahause-bano-banera.webp",
        "alt": "Baño en Jomahause"
      }
    ]
  },
  {
    "id": "jonohause",
    "name": "JoNo Hause",
    "hero": {
      "src": "/img/jonohause/jonohause-esterior-hero.webp",
      "backgroundSize": "cover",
      "backgroundPosition": "center",
      "backgroundRepeat": "no-repeat"
    },
    "scenes": [
      {
        "className": "scene-intro",
        "dataScene": "intro",
        "title": "Tradición habitada"
      },
      {
        "className": "scene-divider",
        "dataScene": "hero-copy",
        "subtitle": "Una casa con carácter, hecha para la vida diaria.",
        "text": "Tradujimos un deseo claro —presencia, calidez y pertenencia— en una arquitectura serena y duradera. La forma clásica no es un gesto estético: es una manera de ordenar el habitar. El resultado es un hogar reconocible, luminoso y profundamente vivible."
      },
      {
        "className": "scene-details",
        "dataScene": "triptico-1-fotos",
        "cards": [
          {
            "variant": "square",
            "src": "/img/jonohause/jonohause-exterior-portal.webp",
            "alt": "Detalle de Jonohause"
          },
          {
            "variant": "square",
            "src": "/img/jonohause/jonohause-exterior-oeste.webp",
            "alt": "Detalle de Jonohause"
          },
          {
            "variant": "square",
            "src": "/img/jonohause/jonohause-exterior-este.webp",
            "alt": "Detalle de Jonohause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "triptico-1",
        "subtitle": "El umbral como promesa.",
        "text": "La llegada se diseña como una secuencia de escala, sombra y detalle que prepara el adentro. El pórtico no decora: organiza, jerarquiza y recibe. Una casa que se entiende desde el primer paso."
      },
      {
        "className": "scene-space",
        "dataScene": "panoramica-1-foto",
        "cards": [
          {
            "variant": "wide",
            "src": "/img/jonohause/jonohause-exterior-norte-panoramica.webp",
            "alt": "Detalle de Jonohause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "panoramica-1",
        "subtitle": "Presencia sin exceso.",
        "text": "Proporción, simetría y cubierta construyen una imagen estable y atemporal. La fachada ordena lo público y lo doméstico en una sola lectura. Arquitectura que sostiene identidad sin necesidad de exagerar."
      },
      {
        "className": "scene-details",
        "dataScene": "triptico-2-fotos",
        "cards": [
          {
            "variant": "square",
            "src": "/img/jonohause/jonohause-comedor.webp",
            "alt": "Detalle de Jonohause"
          },
          {
            "variant": "square",
            "src": "/img/jonohause/jonohause-cocina-1.webp",
            "alt": "Detalle de Jonohause"
          },
          {
            "variant": "square",
            "src": "/img/jonohause/jonohause-quincho.webp",
            "alt": "Detalle de Jonohause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "triptico-2",
        "subtitle": "Diseñada desde la rutina.",
        "text": "Cocina, comedor y expansión trabajan como un sistema continuo para el día a día. Cada decisión responde a usos reales: reunirse, cocinar, circular, abrirse al jardín. No buscamos “escenas”, buscamos comodidad, lógica y luz."
      },
      {
        "className": "scene-space",
        "dataScene": "panoramica-2-foto",
        "cards": [
          {
            "variant": "wide",
            "src": "/img/jonohause/jonohause-exterior-sur-panoramica.webp",
            "alt": "Detalle de Jonohause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "panoramica-2",
        "subtitle": "Cuando el verde es parte del proyecto.",
        "text": "La vivienda se abre para sumar aire y horizonte a la vida interior. La expansión no es un agregado: es una forma de habitar. El exterior funciona como una habitación más, sin perder el orden del conjunto."
      },
      {
        "className": "scene-details",
        "dataScene": "triptico-3-fotos",
        "cards": [
          {
            "variant": "square",
            "src": "/img/jonohause/jonohause-estar-1.webp",
            "alt": "Detalle de Jonohause"
          },
          {
            "variant": "square",
            "src": "/img/jonohause/jonohause-bano-1.webp",
            "alt": "Detalle de Jonohause"
          },
          {
            "variant": "square",
            "src": "/img/jonohause/jonohause-dormitorio-2.webp",
            "alt": "Detalle de Jonohause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "triptico-3",
        "subtitle": "Intimidad bien resuelta.",
        "text": "Ambientes serenos donde la luz baja el ritmo y construye calma. El confort aparece en lo esencial: descanso, silencio, rutina. Una casa pensada para sostener lo cotidiano con calidad y equilibrio."
      }
    ],
    "lightboxImages": [
      {
        "src": "/img/jonohause/jonohause-esterior-hero.webp",
        "alt": "Hero JoNo Hause"
      },
      {
        "src": "/img/jonohause/jonohause-exterior-portal.webp",
        "alt": "Detalle de Jonohause"
      },
      {
        "src": "/img/jonohause/jonohause-exterior-oeste.webp",
        "alt": "Detalle de Jonohause"
      },
      {
        "src": "/img/jonohause/jonohause-exterior-este.webp",
        "alt": "Detalle de Jonohause"
      },
      {
        "src": "/img/jonohause/jonohause-exterior-norte-panoramica.webp",
        "alt": "Detalle de Jonohause"
      },
      {
        "src": "/img/jonohause/jonohause-comedor.webp",
        "alt": "Detalle de Jonohause"
      },
      {
        "src": "/img/jonohause/jonohause-cocina-1.webp",
        "alt": "Detalle de Jonohause"
      },
      {
        "src": "/img/jonohause/jonohause-quincho.webp",
        "alt": "Detalle de Jonohause"
      },
      {
        "src": "/img/jonohause/jonohause-exterior-sur-panoramica.webp",
        "alt": "Detalle de Jonohause"
      },
      {
        "src": "/img/jonohause/jonohause-estar-1.webp",
        "alt": "Detalle de Jonohause"
      },
      {
        "src": "/img/jonohause/jonohause-bano-1.webp",
        "alt": "Detalle de Jonohause"
      },
      {
        "src": "/img/jonohause/jonohause-dormitorio-2.webp",
        "alt": "Detalle de Jonohause"
      }
    ]
  },
  {
    "id": "magahause",
    "name": "MaGa Hause",
    "hero": {
      "src": "/img/magahause/magahause-exterior-sur-entrada-hero.webp",
      "backgroundSize": "cover",
      "backgroundPosition": "center",
      "backgroundRepeat": "no-repeat"
    },
    "scenes": [
      {
        "className": "scene-intro",
        "dataScene": "intro",
        "title": "Solidez habitable"
      },
      {
        "className": "scene-divider",
        "dataScene": "hero-copy",
        "subtitle": "Inspiración anglo-normanda, pensada para durar.",
        "text": "Una casa construida por capas: piedra que ancla, ladrillo que abriga y un remate claro que declara identidad. La tradición no es un gesto: es método, proporción y oficio. Presencia estable para una vida cotidiana intensa."
      },
      {
        "className": "scene-details",
        "dataScene": "triptico-1-fotos",
        "cards": [
          {
            "variant": "square",
            "src": "/img/magahause/magahause-exterior-norte-detalle (2).webp",
            "alt": "Detalle exterior en Magahause"
          },
          {
            "variant": "square",
            "src": "/img/magahause/magahause-entrada (2).webp",
            "alt": "Entrada en Magahause"
          },
          {
            "variant": "square",
            "src": "/img/magahause/magahause-exterior-norte-terraza.webp",
            "alt": "Exterior norte terraza en Magahause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "triptico-1",
        "subtitle": "Oficio en la piel",
        "text": "La identidad se prueba en los encuentros: espesores, remates y texturas reales. La estratificación (piedra–ladrillo–revoque) no decora; construye estabilidad. Detalle controlado para que el conjunto se sienta firme y coherente."
      },
      {
        "className": "scene-space",
        "dataScene": "panoramica-1-foto",
        "cards": [
          {
            "variant": "wide",
            "src": "/img/magahause/magahause-exterior-norte(3).webp",
            "alt": "Exterior norte de Magahause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "panoramica-1",
        "subtitle": "Una silueta con presencia",
        "text": "Techos dominantes, frontones y sombra organizan la imagen a distancia. La materialidad refuerza una idea clara: abrigo y permanencia. Una casa clásica, legible y consistente."
      },
      {
        "className": "scene-details",
        "dataScene": "triptico-2-fotos",
        "cards": [
          {
            "variant": "square",
            "src": "/img/magahause/magahause-cocina.webp",
            "alt": "Cocina en Magahause"
          },
          {
            "variant": "square",
            "src": "/img/magahause/magahause-altillo (5).webp",
            "alt": "Altillo en Magahause"
          },
          {
            "variant": "square",
            "src": "/img/magahause/magahause-quincho (2).webp",
            "alt": "Quincho en Magahause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "triptico-2",
        "subtitle": "La casa cuando se usa",
        "text": "Tres escenas reales sostienen la vida diaria: organizar, retirarse y reunirse. El proyecto separa usos para que convivan sin interferirse. Funcionalidad con carácter, sin perder calidez."
      },
      {
        "className": "scene-space",
        "dataScene": "panoramica-2-foto",
        "cards": [
          {
            "variant": "wide",
            "src": "/img/magahause/magahause-living-comedor-panoramica.webp",
            "alt": "Living y comedor en Magahause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "panoramica-2",
        "subtitle": "El corazón social",
        "text": "Un ámbito central amplio, cálido y jerarquizado, pensado para encuentro y permanencia. La arquitectura acompaña con proporción y luz controlada. Un centro que ordena la casa."
      },
      {
        "className": "scene-details",
        "dataScene": "triptico-3-fotos",
        "cards": [
          {
            "variant": "square",
            "src": "/img/magahause/magahause-bano-ducha.webp",
            "alt": "Baño en Magahause"
          },
          {
            "variant": "square",
            "src": "/img/magahause/magahause-dormitorio.webp",
            "alt": "Dormitorio en Magahause"
          },
          {
            "variant": "square",
            "src": "/img/magahause/magahause-bano-bacha-2.webp",
            "alt": "Baño en Magahause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "triptico-3",
        "subtitle": "Rituales de calma",
        "text": "La calidad aparece en los momentos silenciosos: descanso y recomposición. Materiales, escala y luz sostienen intimidad sin exceso. Privacidad resuelta con el mismo criterio de solidez del exterior."
      }
    ],
    "lightboxImages": [
      {
        "src": "/img/magahause/magahause-exterior-sur-entrada-hero.webp",
        "alt": "Hero MaGa Hause"
      },
      {
        "src": "/img/magahause/magahause-exterior-norte-detalle (2).webp",
        "alt": "Detalle exterior en Magahause"
      },
      {
        "src": "/img/magahause/magahause-entrada (2).webp",
        "alt": "Entrada en Magahause"
      },
      {
        "src": "/img/magahause/magahause-exterior-norte-terraza.webp",
        "alt": "Exterior norte terraza en Magahause"
      },
      {
        "src": "/img/magahause/magahause-exterior-norte(3).webp",
        "alt": "Exterior norte de Magahause"
      },
      {
        "src": "/img/magahause/magahause-cocina.webp",
        "alt": "Cocina en Magahause"
      },
      {
        "src": "/img/magahause/magahause-altillo (5).webp",
        "alt": "Altillo en Magahause"
      },
      {
        "src": "/img/magahause/magahause-quincho (2).webp",
        "alt": "Quincho en Magahause"
      },
      {
        "src": "/img/magahause/magahause-living-comedor-panoramica.webp",
        "alt": "Living y comedor en Magahause"
      },
      {
        "src": "/img/magahause/magahause-bano-ducha.webp",
        "alt": "Baño en Magahause"
      },
      {
        "src": "/img/magahause/magahause-dormitorio.webp",
        "alt": "Dormitorio en Magahause"
      },
      {
        "src": "/img/magahause/magahause-bano-bacha-2.webp",
        "alt": "Baño en Magahause"
      }
    ]
  },
  {
    "id": "markhause",
    "name": "Mark Hause",
    "hero": {
      "src": "/img/markhause/markhause-exterior-hero.webp",
      "backgroundSize": "cover",
      "backgroundPosition": "center",
      "backgroundRepeat": "no-repeat"
    },
    "scenes": [
      {
        "className": "scene-intro",
        "dataScene": "intro",
        "title": "Galería y luz: una casa de campo contemporánea"
      },
      {
        "className": "scene-divider",
        "dataScene": "hero-copy",
        "subtitle": "Una arquitectura serena, pensada para habitar el borde entre interior y paisaje.",
        "text": "Un volumen blanco, claro y atemporal, se ordena con una galería que da sombra, escala y uso real. La casa muestra cómo traducimos un deseo de simpleza y calidez en decisiones constructivas precisas."
      },
      {
        "className": "scene-details",
        "dataScene": "triptico-1-fotos",
        "cards": [
          {
            "variant": "square",
            "src": "/img/markhause/markhause-living.webp",
            "alt": "Living en Markhause"
          },
          {
            "variant": "square",
            "src": "/img/markhause/markhause-detalle-ventana.webp",
            "alt": "Detalle de ventana en Markhause"
          },
          {
            "variant": "square",
            "src": "/img/markhause/markhause-cocina.webp",
            "alt": "Cocina en Markhause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "triptico-1",
        "subtitle": "Lo simple, bien resuelto.",
        "text": "La casa se construye desde tres decisiones coherentes: una espacialidad generosa para la vida diaria, una materialidad cálida y durable, y una modulación que ordena la luz y el detalle. El resultado es un interior sobrio, sin artificios, donde cada encuentro está pensado."
      },
      {
        "className": "scene-space",
        "dataScene": "panoramica-1-foto",
        "cards": [
          {
            "variant": "wide",
            "src": "/img/markhause/markhause-living-comedor-panoramica.webp",
            "alt": "Living y comedor en Markhause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "panoramica-1",
        "subtitle": "Un ambiente central para estar, comer y compartir.",
        "text": "La doble altura y las ventanas altas sostienen una luz pareja y tranquila durante el día, mientras la madera aporta abrigo acústico y visual. Es el tipo de espacio que demuestra cómo diseñamos para que la casa funcione con vida adentro, no solo para la foto."
      },
      {
        "className": "scene-details",
        "dataScene": "triptico-2-fotos",
        "cards": [
          {
            "variant": "square",
            "src": "/img/markhause/markhause-bano-bacha-2.webp",
            "alt": "Bano con bacha en Markhause"
          },
          {
            "variant": "square",
            "src": "/img/markhause/markhause-dormitorio.webp",
            "alt": "Dormitorio en Markhause"
          },
          {
            "variant": "square",
            "src": "/img/markhause/markhause-bano-ducha.webp",
            "alt": "Bano con ducha en Markhause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "triptico-2",
        "subtitle": "Confort sin exagerar.",
        "text": "En los espacios privados, el proyecto prioriza calma, mantenimiento sencillo y proporciones correctas: aberturas generosas, terminaciones honestas y detalles que envejecen bien. Así mostramos una capacidad clave: entender el día a día del cliente y convertirlo en arquitectura consistente."
      }
    ],
    "lightboxImages": [
      {
        "src": "/img/markhause/markhause-exterior-hero.webp",
        "alt": "Hero Mark Hause"
      },
      {
        "src": "/img/markhause/markhause-living.webp",
        "alt": "Living en Markhause"
      },
      {
        "src": "/img/markhause/markhause-detalle-ventana.webp",
        "alt": "Detalle de ventana en Markhause"
      },
      {
        "src": "/img/markhause/markhause-cocina.webp",
        "alt": "Cocina en Markhause"
      },
      {
        "src": "/img/markhause/markhause-living-comedor-panoramica.webp",
        "alt": "Living y comedor en Markhause"
      },
      {
        "src": "/img/markhause/markhause-bano-bacha-2.webp",
        "alt": "Bano con bacha en Markhause"
      },
      {
        "src": "/img/markhause/markhause-dormitorio.webp",
        "alt": "Dormitorio en Markhause"
      },
      {
        "src": "/img/markhause/markhause-bano-ducha.webp",
        "alt": "Bano con ducha en Markhause"
      }
    ]
  },
  {
    "id": "scohause",
    "name": "Sco Hause",
    "hero": {
      "src": "/img/scohause/scohause-exterior-hero.webp",
      "backgroundSize": "cover",
      "backgroundPosition": "center",
      "backgroundRepeat": "no-repeat"
    },
    "scenes": [
      {
        "className": "scene-intro",
        "dataScene": "intro",
        "title": "Tradición contemporánea, vivida"
      },
      {
        "className": "scene-divider",
        "dataScene": "hero-copy",
        "subtitle": "Una casa que apuesta por lo atemporal: proporción, abrigo y calidez.",
        "text": "Diseñada desde los rituales cotidianos —llegar, reunirse, cocinar, salir a la galería— para que cada ambiente tenga sentido de uso. Arquitectura que interpreta deseos reales y los convierte en espacio."
      },
      {
        "className": "scene-space",
        "dataScene": "panoramica-1-foto",
        "cards": [
          {
            "variant": "wide",
            "src": "/img/scohause/scohause-galeria-panoramica.webp",
            "alt": "Detalle de Scohause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "panoramica-1",
        "subtitle": "El ‘entre’ como protagonista.",
        "text": "La galería es el lugar donde la casa se vuelve diaria: sombra, conversación, juego, pausa. Una arquitectura que no separa interior y exterior: los integra."
      },
      {
        "className": "scene-details",
        "dataScene": "triptico-2-fotos",
        "cards": [
          {
            "variant": "square",
            "src": "/img/scohause/scolahause-interior-living.webp",
            "alt": "Living interior en Scohause"
          },
          {
            "variant": "square",
            "src": "/img/scohause/scohause-living-comedor.webp",
            "alt": "Living y comedor en Scohause"
          },
          {
            "variant": "square",
            "src": "/img/scohause/scohause-cocina-1.webp",
            "alt": "Cocina en Scohause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "triptico-2",
        "subtitle": "La vida social como programa principal.",
        "text": "Cocinar, sentarse a la mesa y estar no son ambientes aislados: son un mismo sistema. GD diseña para que lo cotidiano fluya sin esfuerzo."
      },
      {
        "className": "scene-space",
        "dataScene": "panoramica-2-foto",
        "cards": [
          {
            "variant": "wide",
            "src": "/img/scohause/scohause-cocina-quincho-panoramica.webp",
            "alt": "Detalle de Scohause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "panoramica-2",
        "subtitle": "Cocina y quincho en continuidad.",
        "text": "Cocinar y reunirse ocurren en un mismo recorrido: superficies prácticas, buena luz y salida directa al exterior. Un espacio social pensado para el uso real, sin fricción."
      },
      {
        "className": "scene-details",
        "dataScene": "triptico-3-fotos",
        "cards": [
          {
            "variant": "square",
            "src": "/img/scohause/scohause-bano-bacha.webp",
            "alt": "Bano con bacha en Scohause"
          },
          {
            "variant": "square",
            "src": "/img/scohause/scohause-bano-3.webp",
            "alt": "Bano en Scohause"
          },
          {
            "variant": "square",
            "src": "/img/scohause/scohause-bano-ducha-2.webp",
            "alt": "Bano con ducha en Scohause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "triptico-3",
        "subtitle": "Agua y calma cotidiana.",
        "text": "En baños, la claridad manda: materiales sobrios, mantenimiento simple y proporciones cómodas. Lo cotidiano se vuelve más fácil cuando el detalle está pensado."
      }
    ],
    "lightboxImages": [
      {
        "src": "/img/scohause/scohause-exterior-hero.webp",
        "alt": "Hero Sco Hause"
      },
      {
        "src": "/img/scohause/scohause-galeria-panoramica.webp",
        "alt": "Detalle de Scohause"
      },
      {
        "src": "/img/scohause/scolahause-interior-living.webp",
        "alt": "Living interior en Scohause"
      },
      {
        "src": "/img/scohause/scohause-living-comedor.webp",
        "alt": "Living y comedor en Scohause"
      },
      {
        "src": "/img/scohause/scohause-cocina-1.webp",
        "alt": "Cocina en Scohause"
      },
      {
        "src": "/img/scohause/scohause-cocina-quincho-panoramica.webp",
        "alt": "Detalle de Scohause"
      },
      {
        "src": "/img/scohause/scohause-bano-bacha.webp",
        "alt": "Bano con bacha en Scohause"
      },
      {
        "src": "/img/scohause/scohause-bano-3.webp",
        "alt": "Bano en Scohause"
      },
      {
        "src": "/img/scohause/scohause-bano-ducha-2.webp",
        "alt": "Bano con ducha en Scohause"
      }
    ]
  },
  {
    "id": "vidahause",
    "name": "ViDa Hause",
    "hero": {
      "src": "/img/vidahause/vidahause-exterior-este.webp",
      "backgroundSize": "cover",
      "backgroundPosition": "center",
      "backgroundRepeat": "no-repeat"
    },
    "scenes": [
      {
        "className": "scene-intro",
        "dataScene": "intro",
        "title": "VidaHause — Una casa que se vive en la galería"
      },
      {
        "className": "scene-divider",
        "dataScene": "hero-copy",
        "subtitle": "Entre el interior y el jardín, la galería se vuelve el verdadero centro de la casa.",
        "text": "Diseñamos un recorrido simple, materialidad sobria y sombra generosa para que el exterior sea parte del día a día. Arquitectura serena, hecha para durar y para usarse."
      },
      {
        "className": "scene-details",
        "dataScene": "triptico-1-fotos",
        "cards": [
          {
            "variant": "square",
            "src": "/img/vidahause/vidahause-exterior-detalle1.webp",
            "alt": "Detalle exterior en Vidahause"
          },
          {
            "variant": "square",
            "src": "/img/vidahause/vidahause-exterior-entrada.webp",
            "alt": "Entrada exterior en Vidahause"
          },
          {
            "variant": "square",
            "src": "/img/vidahause/vidahause-exterior-talle1r.webp",
            "alt": "Detalle exterior en Vidahause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "triptico-1",
        "subtitle": "Llegada + identidad + oficio",
        "text": "El proyecto empieza en el umbral. No diseñamos solo una puerta: diseñamos una transición, una escala y una primera sombra. Lo exterior ya anticipa la calma del interior."
      },
      {
        "className": "scene-details",
        "dataScene": "triptico-2-fotos",
        "cards": [
          {
            "variant": "square",
            "src": "/img/vidahause/vidahause-cocina.webp",
            "alt": "Cocina en Vidahause"
          },
          {
            "variant": "square",
            "src": "/img/vidahause/vidahause-living.webp",
            "alt": "Estar en Vidahause"
          },
          {
            "variant": "square",
            "src": "/img/vidahause/vidahause-cocina (3).webp",
            "alt": "Detalle de cocina en Vidahause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "triptico-2",
        "subtitle": "Vida diaria",
        "text": "La calidad se define en lo cotidiano. Cocina y estar resuelven rutinas con lógica simple: superficies honestas, guardado, luz y una atmósfera cálida. Una casa que acompaña hábitos, no que los impone."
      },
      {
        "className": "scene-space",
        "dataScene": "panoramica-2-foto",
        "cards": [
          {
            "variant": "wide",
            "src": "/img/vidahause/vidahause-vista-sur-patio.webp",
            "alt": "Vista sur patio en Vidahause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "panoramica-2",
        "subtitle": "Exterior vivido",
        "text": "El patio funciona como una habitación más. La galería regula el clima, arma el recorrido y habilita estar afuera sin perder abrigo. El resultado es una casa que se expande según la hora y la estación."
      },
      {
        "className": "scene-details",
        "dataScene": "triptico-3-fotos",
        "cards": [
          {
            "variant": "square",
            "src": "/img/vidahause/vidahause-dormitorio.webp",
            "alt": "Dormitorio en Vidahause"
          },
          {
            "variant": "square",
            "src": "/img/vidahause/vidahause-bano-bacha (3).webp",
            "alt": "Baño con bacha en Vidahause"
          },
          {
            "variant": "square",
            "src": "/img/vidahause/vidahause-bano-detalles-b.webp",
            "alt": "Detalle de baño en Vidahause"
          }
        ]
      },
      {
        "className": "scene-divider",
        "dataScene": "triptico-3",
        "subtitle": "Lo privado",
        "text": "En lo privado, todo baja un cambio. Buscamos silencio visual, materiales sobrios y proporciones cómodas. Dormir y cuidarse también es parte del proyecto."
      }
    ],
    "lightboxImages": [
      {
        "src": "/img/vidahause/vidahause-exterior-este.webp",
        "alt": "Hero ViDa Hause"
      },
      {
        "src": "/img/vidahause/vidahause-exterior-detalle1.webp",
        "alt": "Detalle exterior en Vidahause"
      },
      {
        "src": "/img/vidahause/vidahause-exterior-entrada.webp",
        "alt": "Entrada exterior en Vidahause"
      },
      {
        "src": "/img/vidahause/vidahause-exterior-talle1r.webp",
        "alt": "Detalle exterior en Vidahause"
      },
      {
        "src": "/img/vidahause/vidahause-cocina.webp",
        "alt": "Cocina en Vidahause"
      },
      {
        "src": "/img/vidahause/vidahause-living.webp",
        "alt": "Estar en Vidahause"
      },
      {
        "src": "/img/vidahause/vidahause-cocina (3).webp",
        "alt": "Detalle de cocina en Vidahause"
      },
      {
        "src": "/img/vidahause/vidahause-vista-sur-patio.webp",
        "alt": "Vista sur patio en Vidahause"
      },
      {
        "src": "/img/vidahause/vidahause-dormitorio.webp",
        "alt": "Dormitorio en Vidahause"
      },
      {
        "src": "/img/vidahause/vidahause-bano-bacha (3).webp",
        "alt": "Baño con bacha en Vidahause"
      },
      {
        "src": "/img/vidahause/vidahause-bano-detalles-b.webp",
        "alt": "Detalle de baño en Vidahause"
      }
    ]
  }
];

export const getProjectPageById = (id: string): ProjectPage | undefined => {
  return projectPages.find((page) => page.id === id);
};
