import { Component, OnInit } from '@angular/core';
import { Pharmacy } from '../Models/Pharmacy';
import { Product } from '../Models/Product';
import { HttpProviderService } from '../services/http-provider.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  search: string = '';
  searchErrorMsg: string = '';
  searchedProducts: Product[];
  searchedProductsPerPage: number;
  searchedProductsCurrentPage: number;
  searchedProductsTotalPages: number;
  products: Product[];
  productsPerPage: number;
  productsCurrentPage: number;
  productsTotalPages: number;
  pharmacies: Pharmacy[];
  pharmaciesPerPage: number;
  pharmaciesCurrentPage: number;
  pharmaciesTotalPages: number;

  constructor(private http: HttpProviderService) { }

  ngOnInit(): void {
    this.fetchProducts();
    this.fetchPharmacies();
  }

  async fetchProducts(page: number = 1)
  {
    try {
      let fetchedProducts: any = await this.http.get('products', {page});
      
      if(fetchedProducts.products.data !== undefined && fetchedProducts.products.data.length > 0)
      {
        this.products = fetchedProducts.products.data;
        this.productsPerPage = fetchedProducts.products.per_page;
        this.productsCurrentPage = fetchedProducts.products.current_page;
        this.productsTotalPages = fetchedProducts.products.total;
      }
    } catch(error)
    {
      console.log(error);
    }
  }

  async fetchPharmacies(page: number = 1)
  {
    try {
      let fetchedPharmacies: any = await this.http.get('pharmacies', {page});
      
      if(fetchedPharmacies.pharmacies.data !== undefined && fetchedPharmacies.pharmacies.data.length > 0)
      {
        this.pharmacies = fetchedPharmacies.pharmacies.data;
        this.pharmaciesPerPage = fetchedPharmacies.pharmacies.per_page;
        this.pharmaciesCurrentPage = fetchedPharmacies.pharmacies.current_page;
        this.pharmaciesTotalPages = fetchedPharmacies.pharmacies.total;
      }
    } catch(error)
    {
      console.log(error);
    }
  }

  async searchProducts(page: number = 1)
  {
    if(this.search === '') return;

    this.searchErrorMsg = '';
    let products: any = await this.http.get('products/search', {search: this.search, page});

    if(products.data !== undefined && products.data.length > 0)
    {
      this.searchedProducts = products.data;
      this.searchedProductsPerPage = products.per_page;
      this.searchedProductsCurrentPage = products.current_page;
      this.searchedProductsTotalPages = products.total;
    } else {
      this.searchErrorMsg = 'No Products Found';
    }
  }

  productsPaginate(event: number)
  {
    this.fetchProducts(event);
  }

  pharmaciesPaginate(event: number)
  {
    this.fetchPharmacies(event);
  }

  searchedProductsPaginate(event: number)
  {
    this.searchProducts(event);
  }
}
