import type { Metadata } from "next";
import { CatalogView } from "@/components/CatalogView";
import { Container } from "@/components/Container";
import { tienda } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Todas las prendas de LaraShoping: vestidos ajustados, blusas, faldas, conjuntos y moda para hombre y niños.",
};

export default function CatalogoPage() {
  return (
    <section className='py-8 sm:py-12'>
      <Container>
        <div className='mb-6 max-w-2xl'>
          <div className='flex items-center gap-2'>
            <p className='text-[10px] font-semibold uppercase tracking-[0.22em] text-lc-rosa'>
              {tienda.nombre} · Catálogo
            </p>
          </div>
          <h1 className='mt-1.5 text-2xl font-bold tracking-tight sm:text-3xl'>
            Todas las prendas
          </h1>
          <p className='mt-2 text-xs leading-relaxed text-black/55 sm:text-sm'>
            Vestidos ajustados, blusas, faldas, conjuntos y moda para toda la
            familia. Filtra por categoría y añade tus prendas favoritas.
          </p>
        </div>

        <CatalogView />
      </Container>
    </section>
  );
}
