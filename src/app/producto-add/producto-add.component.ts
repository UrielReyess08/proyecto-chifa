import { Component } from '@angular/core';
import { Producto } from './producto.model';
import { ProductoService } from '../service/producto.service';

@Component({
  selector: 'app-producto-add',
  templateUrl: './producto-add.component.html',
  styleUrl: './producto-add.component.css'
})
export class ProductoAddComponent {
  products: Producto[] = [];
  paginaActual: number = 0;
  totalPaginas: number = 0;
  tamañoPagina: number = 10;
  constructor(private productoService: ProductoService){}

  async ngOnInit(): Promise<void> {
    await this.loadProducts();
  }
  async loadProducts(pagina: number = 0): Promise<void> {
    const result = await this.productoService.obtenerProductos(pagina, this.tamañoPagina);
    this.products = result.products;
    this.totalPaginas = result.totalPages;
    this.paginaActual = pagina;
  }

  siguientePagina(): void {
    if (this.paginaActual < this.totalPaginas - 1) {
      this.loadProducts(this.paginaActual + 1);
    }
  }

  async toggleDisponibilidad(product: Producto): Promise<void> {
    const nuevoEstado = !product.disponible;
    console.log(!product.disponible);
    await this.productoService.cambiarDisponibilidad(product.id);
    product.disponible = nuevoEstado;
    await this.loadProducts(); // Actualiza la lista de productos después de cambiar la disponibilidad
  }

  paginaAnterior(): void {
    if (this.paginaActual > 0) {
      this.loadProducts(this.paginaActual - 1);
    }
  }

  trackById(index: number, item: Producto): number {
    return item.id;
  }
}
