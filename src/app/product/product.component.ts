import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../Models/Product';
import { HttpProviderService } from '../services/http-provider.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product: Product;

  constructor(private route: ActivatedRoute, private http: HttpProviderService) 
  {
    let id = this.route.snapshot.paramMap.get('id');
    this.fetchProduct(id);
  }

  async fetchProduct(id: any, page: number = 1)
  {
    if(id === null || id === '') return;

    try {
      let productData: any = await this.http.get(`products/${id}`, {page});

      if(productData.product !== undefined)
      {
        this.product = productData.product;
      }
    } catch(error) {
      console.log(error);
    }
  }

  pharmacyProductPaginate(event: number)
  {
    this.fetchProduct(this.product.id, event);
  }

  ngOnInit(): void {
  }

}
